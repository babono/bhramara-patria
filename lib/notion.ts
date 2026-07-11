import "server-only";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
export const REVALIDATE_SECONDS = 300;

// ---------- Types ----------

export type Awardee = {
  id: string;
  name: string;
  nickname: string;
  university: string;
  program: string;
  jenjang: "S2" | "S3";
  lokasi: "DN" | "LN";
  kelompok: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorInfo: string;
  date: string;
  readingMinutes: number;
  featured: boolean;
  fromNotion: boolean;
};

export type ToolLink = {
  id: string;
  title: string;
  url: string;
  linkType: "download" | "internal" | "external";
};

export type ToolSection = {
  title: string;
  description: string;
  links: ToolLink[];
};

// ---------- Notion REST helpers ----------

function notionHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

type NotionPage = { id: string; properties: Record<string, NotionProperty> };
type NotionProperty = {
  type: string;
  title?: { plain_text: string }[];
  rich_text?: { plain_text: string }[];
  select?: { name: string } | null;
  number?: number | null;
  checkbox?: boolean;
  url?: string | null;
  date?: { start: string } | null;
};

async function queryDatabaseAll(databaseId: string): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Notion query failed (${res.status}): ${await res.text()}`);
    const data = await res.json();
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

export type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  if (!process.env.NOTION_TOKEN) return [];
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  try {
    do {
      const url = new URL(`${NOTION_API}/blocks/${pageId}/children`);
      url.searchParams.set("page_size", "100");
      if (cursor) url.searchParams.set("start_cursor", cursor);
      const res = await fetch(url, {
        headers: notionHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) throw new Error(`Notion blocks failed (${res.status})`);
      const data = await res.json();
      blocks.push(...data.results);
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
  } catch (err) {
    console.warn("[notion] getPageBlocks:", err);
  }
  return blocks;
}

// Tolerant property readers: works whatever the exact property naming ends up
// being in the user's Notion database (first matching name wins).
function prop(page: NotionPage, ...names: string[]): NotionProperty | undefined {
  const keys = Object.keys(page.properties);
  for (const name of names) {
    const key = keys.find((k) => k.toLowerCase() === name.toLowerCase());
    if (key) return page.properties[key];
  }
  return undefined;
}

function text(p?: NotionProperty): string {
  if (!p) return "";
  if (p.type === "title") return (p.title ?? []).map((t) => t.plain_text).join("");
  if (p.type === "rich_text") return (p.rich_text ?? []).map((t) => t.plain_text).join("");
  if (p.type === "select") return p.select?.name ?? "";
  if (p.type === "url") return p.url ?? "";
  return "";
}

function titleOf(page: NotionPage): string {
  const p = Object.values(page.properties).find((v) => v.type === "title");
  return text(p);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");
}

// ---------- Awardees ----------

export async function getAwardees(): Promise<Awardee[]> {
  const dbId = process.env.NOTION_AWARDEES_DB_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return FALLBACK_AWARDEES;
  try {
    const pages = await queryDatabaseAll(dbId);
    const awardees = pages
      .map((page): Awardee => {
        const lokasiRaw = text(prop(page, "Lokasi", "Location")).toLowerCase();
        const jenjangRaw = text(prop(page, "Jenjang", "Degree")).toUpperCase();
        return {
          id: page.id,
          name: titleOf(page),
          nickname: text(prop(page, "Nickname", "Panggilan")),
          university: text(prop(page, "University", "Universitas", "Kampus")),
          program: text(prop(page, "Program", "Program Studi", "Prodi")),
          jenjang: jenjangRaw.includes("S3") || jenjangRaw.includes("DOKTOR") ? "S3" : "S2",
          lokasi: lokasiRaw.includes("luar") || lokasiRaw === "ln" ? "LN" : "DN",
          kelompok: text(prop(page, "Kelompok", "Group")),
        };
      })
      .filter((a) => a.name);
    if (awardees.length === 0) return FALLBACK_AWARDEES;
    return awardees.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn("[notion] getAwardees, using fallback data:", err);
    return FALLBACK_AWARDEES;
  }
}

// ---------- Blog ----------

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return FALLBACK_POSTS;
  try {
    const pages = await queryDatabaseAll(dbId);
    const posts = pages
      .filter((page) => prop(page, "Published", "Publish", "Terbit")?.checkbox ?? true)
      .map((page): BlogPost => {
        const title = titleOf(page);
        return {
          id: page.id,
          slug: text(prop(page, "Slug")) || slugify(title),
          title,
          excerpt: text(prop(page, "Excerpt", "Ringkasan")),
          category: text(prop(page, "Category", "Kategori")) || "Cerita",
          author: text(prop(page, "Author", "Penulis")),
          authorInfo: text(prop(page, "AuthorInfo", "Author Info", "Kampus")),
          date: prop(page, "Date", "Tanggal")?.date?.start ?? "",
          readingMinutes: prop(page, "ReadingTime", "Reading Time", "Menit")?.number ?? 5,
          featured: prop(page, "Featured", "Unggulan")?.checkbox ?? false,
          fromNotion: true,
        };
      })
      .filter((p) => p.title);
    if (posts.length === 0) return FALLBACK_POSTS;
    return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch (err) {
    console.warn("[notion] getBlogPosts, using fallback data:", err);
    return FALLBACK_POSTS;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

// ---------- Tools ----------

export async function getToolSections(): Promise<ToolSection[]> {
  const dbId = process.env.NOTION_TOOLS_DB_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return FALLBACK_TOOLS;
  try {
    const pages = await queryDatabaseAll(dbId);
    const rows = pages
      .map((page) => ({
        id: page.id,
        title: titleOf(page),
        section: text(prop(page, "Section", "Seksi", "Kategori")),
        url: text(prop(page, "URL", "Link", "Tautan")) || "#",
        linkType: (text(prop(page, "LinkType", "Link Type", "Tipe")).toLowerCase() || "external") as ToolLink["linkType"],
        order: prop(page, "Order", "Urutan")?.number ?? 0,
      }))
      .filter((r) => r.title && r.section)
      .sort((a, b) => a.order - b.order);
    if (rows.length === 0) return FALLBACK_TOOLS;
    // Preserve the design's section order & descriptions when names match.
    const sections = new Map<string, ToolSection>();
    for (const fallback of FALLBACK_TOOLS) {
      sections.set(fallback.title.toLowerCase(), { ...fallback, links: [] });
    }
    for (const row of rows) {
      const key = row.section.toLowerCase();
      if (!sections.has(key)) sections.set(key, { title: row.section, description: "", links: [] });
      sections.get(key)!.links.push({ id: row.id, title: row.title, url: row.url, linkType: row.linkType });
    }
    return [...sections.values()].filter((s) => s.links.length > 0);
  } catch (err) {
    console.warn("[notion] getToolSections, using fallback data:", err);
    return FALLBACK_TOOLS;
  }
}

// ---------- Fallback data (sample content from the original design) ----------
// Used automatically while the Notion env vars are not configured yet,
// so the site always renders.

const FA = (
  n: string, k: string, u: string, p: string, j: "S2" | "S3", l: "DN" | "LN", g: string,
): Awardee => ({ id: slugify(n), name: n, nickname: k, university: u, program: p, jenjang: j, lokasi: l, kelompok: g });

export const FALLBACK_AWARDEES: Awardee[] = [
  FA("Ghulam Zaky", "Zaky", "Yale University", "Master of Business Administration", "S2", "LN", "Edelweiss Jawa"),
  FA("Glory Lamria", "Glory", "Columbia University", "Master of Technology Management", "S2", "LN", "Edelweiss Jawa"),
  FA("Giovanni Arneldi Sumampouw", "Gio", "McGill University", "Doctor in Food Science & Agricultural Chemistry", "S3", "LN", "Edelweiss Jawa"),
  FA("Gita Citra Puspita", "Gita", "Universitas Indonesia", "Magister Teknologi Informasi", "S2", "DN", "Cendana"),
  FA("Gilang Alfian Rizki", "Gilang", "Universitas Gadjah Mada", "Magister Pembangunan Sosial & Kesejahteraan", "S2", "DN", "Cendana"),
  FA("Ghaffari Naufal", "Naufal", "Universitas Gadjah Mada", "Magister Perencanaan Wilayah & Kota", "S2", "DN", "Cendana"),
  FA("Angela Merici Lembanga", "Angela", "University of Michigan–Ann Arbor", "MSc Environment and Sustainability", "S2", "LN", "Bhramara Cempaka"),
  FA("Angelina Putri Tamba", "Angel", "Institut Pertanian Bogor", "Magister Ekonomi Kelautan Tropika", "S2", "DN", "Bhramara Cempaka"),
  FA("Angeline Louisabethania", "Angeline", "Universitas Gadjah Mada", "Magister Kajian Pariwisata", "S2", "DN", "Bhramara Cempaka"),
  FA("Angga Puja Asiandu", "Angga", "Universitas Gadjah Mada", "Doktor Biologi", "S3", "DN", "Bhramara Cempaka"),
  FA("Anggi Mayulina Daulay", "Anggi", "Institut Pertanian Bogor", "Magister Ilmu Kelautan", "S2", "DN", "Arum Dalu"),
  FA("Dayat Hidayat", "Dayat", "Purdue University", "PhD in Mathematics Education", "S3", "LN", "Arum Dalu"),
  FA("Dennaya Nadhifa", "Denna", "Imperial College London", "MSc Climate Change, Management & Finance", "S2", "LN", "Arum Dalu"),
  FA("Devy Permata Putri", "Devy", "National University of Singapore", "Master in Sustainable & Green Finance", "S2", "LN", "Arum Dalu"),
  FA("Defri Bayu Zolefudin Afif", "Defri", "Universitas Gadjah Mada", "Magister Manajemen & Kebijakan Publik", "S2", "DN", "Cendana"),
  FA("Denny Iswara", "Denny", "Universitas Gadjah Mada", "Magister Ilmu Kesehatan Masyarakat", "S2", "DN", "Cendana"),
  FA("Konradus Silvester Jenahut", "Silvester", "Universitas Negeri Yogyakarta", "Doktoral Ilmu Pendidikan Bahasa", "S3", "DN", "Edelweiss Jawa"),
  FA("Lamtiar Ferawaty Siregar", "Tiar", "Universitas Negeri Malang", "Doktoral Pendidikan Kimia", "S3", "DN", "Edelweiss Jawa"),
  FA("Larasati Gumilang K.", "Laras", "New York University", "Master of Urban Planning", "S2", "LN", "Bhramara Cempaka"),
  FA("Langgam Swara Novena G.", "Lang", "Imperial College London", "Master in Strategic Marketing", "S2", "LN", "Bhramara Cempaka"),
  FA("Ni Luh De Siska Sari Dewi", "Siska", "Institut Teknologi Sepuluh Nopember", "Magister Matematika", "S2", "DN", "Arum Dalu"),
  FA("Ni Made Wesi Sinta Wrdhi W.", "Wesi", "Universitas Gadjah Mada", "Magister Ilmu & Teknologi Pangan", "S2", "DN", "Arum Dalu"),
  FA("Rivaldy Armando Kamal", "Rival", "Universitas Indonesia", "Magister Kajian Ketahanan Nasional", "S2", "DN", "Cendana"),
  FA("Riza Kamelia", "Riza", "Institut Teknologi Sepuluh Nopember", "Doktor Teknik Elektro", "S3", "DN", "Cendana"),
  FA("Ronald Gozali", "Ronald", "Universitas Gadjah Mada", "Magister Hukum Bisnis & Kenegaraan", "S2", "DN", "Edelweiss Jawa"),
].sort((a, b) => a.name.localeCompare(b.name));

const FP = (
  title: string, excerpt: string, category: string, author: string, authorInfo: string,
  date: string, readingMinutes: number, featured = false,
): BlogPost => ({
  id: slugify(title), slug: slugify(title), title, excerpt, category, author,
  authorInfo, date, readingMinutes, featured, fromNotion: false,
});

export const FALLBACK_POSTS: BlogPost[] = [
  FP("Menyalakan lentera dari ruang kelas di negeri orang", "Tentang rindu yang dikelola, adaptasi yang menempa, dan janji untuk pulang membawa manfaat. Sepenggal catatan perjalanan menempuh studi ribuan kilometer dari rumah.", "Refleksi", "Glory Lamria", "Columbia University", "2024-08-20", 6, true),
  FP("Lima hal yang saya pelajari selama PK-236", "Dari ikrar hingga kelompok — bekal berharga sebelum benar-benar berangkat menempuh studi.", "Tips Beasiswa", "Ghulam Zaky", "Yale University", "2024-08-12", 5),
  FP("Pulang untuk mengabdi: rencana setelah studi", "Menerjemahkan ilmu menjadi dampak nyata bagi daerah dan masyarakat yang menanti.", "Pengabdian", "Gita Citra Puspita", "Universitas Indonesia", "2024-08-08", 4),
  FP("Membawa riset pangan untuk ketahanan negeri", "Mengapa keamanan pangan adalah salah satu kunci masa depan Indonesia yang berdaulat.", "Studi", "Giovanni A. S.", "McGill University", "2024-08-04", 7),
  FP("Bertahan, bertumbuh: catatan adaptasi di London", "Musim dingin pertama, perbedaan budaya, dan menemukan rumah kedua di antara sesama perantau.", "Refleksi", "Dennaya Nadhifa", "Imperial College", "2024-07-30", 5),
  FP("Dari Kelompok Cendana untuk Indonesia", "Bagaimana ikatan kecil dalam kelompok tumbuh menjadi jaringan pengabdian lintas bidang.", "Komunitas", "Gilang Alfian Rizki", "Univ. Gadjah Mada", "2024-07-26", 4),
  FP("Menjaga akar budaya di perantauan", "Membawa Indonesia ke panggung dunia lewat hal-hal kecil yang menyatukan komunitas.", "Budaya", "Larasati Gumilang", "New York University", "2024-07-22", 6),
];

const FL = (title: string, linkType: ToolLink["linkType"], url = "#"): ToolLink => ({
  id: slugify(title), title, url, linkType,
});

export const FALLBACK_TOOLS: ToolSection[] = [
  {
    title: "Panduan LPDP",
    description: "Semua yang perlu kamu tahu sebagai awardee, dari berangkat hingga pelaporan.",
    links: [
      FL("Buku Panduan Persiapan Keberangkatan", "download"),
      FL("Hak & Kewajiban Awardee", "internal"),
      FL("Panduan Pencairan Dana Studi", "internal"),
      FL("Format Laporan Perkembangan Studi", "internal"),
    ],
  },
  {
    title: "Template Dokumen",
    description: "Berkas siap pakai untuk mempercepat urusan administrasi studimu.",
    links: [
      FL("Template Letter of Acceptance (LoA)", "download"),
      FL("Surat Pernyataan & Komitmen", "download"),
      FL("Template CV Akademik", "download"),
      FL("Rencana Studi & Esai", "download"),
    ],
  },
  {
    title: "Tautan Penting",
    description: "Pranala pra-keberangkatan yang sering dicari, dikurasi untuk angkatan.",
    links: [
      FL("Visa & Imigrasi per Negara", "external"),
      FL("Akomodasi & Tempat Tinggal", "external"),
      FL("Keuangan & Living Allowance", "external"),
      FL("Asuransi Kesehatan Studi", "external"),
    ],
  },
  {
    title: "Komunitas Angkatan",
    description: "Tetap terhubung dengan keluarga Bhramara Patria di mana pun berada.",
    links: [
      FL("Direktori Awardee PK-236", "internal", "/awardee"),
      FL("Grup WhatsApp Angkatan", "external"),
      FL("Kalender Kegiatan & Reuni", "external"),
      FL("Kanal Media Sosial Resmi", "external"),
    ],
  },
];
