# Bhramara Patria · PK-236

Situs angkatan PK-236 LPDP "Bhramara Patria" — Next.js (App Router) dengan Notion sebagai CMS.

Halaman: **Beranda** (`/`), **Tentang** (`/tentang`), **Awardee** (`/awardee`, direktori dengan pencarian & filter), **Blog** (`/blog` + `/blog/[slug]`), **Tools** (`/tools`), **Kontak** (`/kontak`).

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Tanpa konfigurasi apa pun, situs berjalan dengan **data contoh bawaan** (dari desain asli). Setelah Notion dikonfigurasi, konten diambil dari Notion dan di-cache 5 menit (ISR).

## Setup Notion

### 1. Buat integration

1. Buka [notion.so/my-integrations](https://www.notion.so/my-integrations) → **New integration** (Internal).
2. Salin **Internal Integration Secret** → ini `NOTION_TOKEN`.

### 2. Buat 3 database

Buat database (full-page) dengan properti berikut. Nama properti fleksibel terhadap kapitalisasi; alternatif bahasa Indonesia di kolom kanan juga dikenali.

**Awardees** (`NOTION_AWARDEES_DB_ID`)

| Properti     | Tipe      | Nilai / alternatif                              |
| ------------ | --------- | ----------------------------------------------- |
| `Name`       | Title     | Nama lengkap                                    |
| `Nickname`   | Rich text | alt: `Panggilan`                                |
| `University` | Rich text | alt: `Universitas`, `Kampus`                    |
| `Program`    | Rich text | alt: `Program Studi`, `Prodi`                   |
| `Jenjang`    | Select    | `S2` / `S3` (alt: `Degree`)                     |
| `Lokasi`     | Select    | `Dalam Negeri` / `Luar Negeri` (alt: `Location`) |
| `Kelompok`   | Select    | mis. `Cendana`, `Arum Dalu` (alt: `Group`)      |

**Blog** (`NOTION_BLOG_DB_ID`) — isi artikel ditulis langsung di body halaman Notion (paragraf, heading, list, quote, gambar, kode — semuanya dirender).

| Properti      | Tipe      | Keterangan                                        |
| ------------- | --------- | ------------------------------------------------- |
| `Title`       | Title     | Judul artikel                                     |
| `Slug`        | Rich text | Opsional — dibuat otomatis dari judul jika kosong |
| `Excerpt`     | Rich text | Ringkasan singkat (alt: `Ringkasan`)              |
| `Category`    | Select    | mis. `Refleksi`, `Tips Beasiswa` (alt: `Kategori`) |
| `Author`      | Rich text | Nama penulis (alt: `Penulis`)                     |
| `AuthorInfo`  | Rich text | mis. kampus penulis (alt: `Kampus`)               |
| `Date`        | Date      | Tanggal terbit (alt: `Tanggal`)                   |
| `ReadingTime` | Number    | Menit baca (default 5)                            |
| `Featured`    | Checkbox  | Tampil sebagai "Cerita Utama" (alt: `Unggulan`)   |
| `Published`   | Checkbox  | Hanya yang tercentang yang tampil (alt: `Terbit`) |

**Tools** (`NOTION_TOOLS_DB_ID`)

| Properti   | Tipe      | Keterangan                                                                              |
| ---------- | --------- | ---------------------------------------------------------------------------------------- |
| `Name`     | Title     | Judul tautan                                                                              |
| `Section`  | Select    | `Panduan LPDP` / `Template Dokumen` / `Tautan Penting` / `Komunitas Angkatan`             |
| `URL`      | URL       | Tautan tujuan (path internal seperti `/awardee` juga bisa)                                |
| `LinkType` | Select    | `download` (↓) / `internal` (→) / `external` (↗)                                          |
| `Order`    | Number    | Urutan tampil dalam seksi                                                                 |

### 3. Hubungkan database ke integration

Di setiap database: menu `···` → **Connections** → pilih integration kamu. (Tanpa langkah ini API akan menjawab 404.)

### 4. Isi environment variables

```bash
cp .env.example .env.local
```

```env
NOTION_TOKEN=secret_xxx
NOTION_AWARDEES_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_BLOG_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_TOOLS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Database ID = 32 karakter hex pada URL database (`notion.so/workspace/<ID>?v=...`). Saat deploy (mis. Vercel), set keempat variabel yang sama di dashboard environment variables.

## Catatan

- Konten Notion di-cache 5 menit (`REVALIDATE_SECONDS` di `lib/notion.ts`).
- Jika Notion tidak terkonfigurasi/error, situs otomatis memakai data contoh (lihat `FALLBACK_*` di `lib/notion.ts`) — tidak pernah blank.
- Aset desain (maskot Ara, batik, dsb.) ada di `public/assets/`; sumber desain asli di folder `Yearbook Website Conversion/`.
