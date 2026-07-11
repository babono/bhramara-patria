import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AwardeeCardBody from "@/components/AwardeeCardBody";
import { getAwardees, getBlogPosts } from "@/lib/notion";

const STATS = [
  { value: "316", label: "Awardee Angkatan" },
  { value: "33", label: "Provinsi Asal" },
  { value: "12", label: "Negara Tujuan Studi" },
  { value: "5", label: "Nilai LPDP" },
];

const LPDP_VALUES = ["Integritas", "Profesionalisme", "Sinergi", "Pelayanan", "Kesempurnaan"];

const TOOL_TEASERS = [
  { tag: "Unduh Jurnal", title: "Akses Jurnal Akademik", desc: "Cari & unduh paper dari basis data jurnal internasional." },
  { tag: "Panduan", title: "Panduan LPDP", desc: "Kewajiban awardee, pencairan dana, hingga pelaporan studi." },
  { tag: "Template", title: "Template Dokumen", desc: "LoA, surat pernyataan, CV, dan berkas penting lainnya." },
  { tag: "Tautan", title: "Tautan Penting", desc: "Visa, akomodasi, komunitas, dan info pra-keberangkatan." },
];

export default async function Beranda() {
  const [awardees, posts] = await Promise.all([getAwardees(), getBlogPosts()]);
  const teaserAwardees = awardees.slice(0, 4);
  const teaserPosts = posts.slice(0, 3);

  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* HERO + NAV */}
      <div style={{ position: "relative", background: "radial-gradient(120% 140% at 78% 26%, #9A3E40 0%, #7E2F35 46%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" style={{ backgroundSize: 320 }} />
        <SiteHeader active="/" />

        <div className="shell" style={{ position: "relative", paddingTop: 62, paddingBottom: 88 }}>
          <div style={{ position: "absolute", right: 6, top: 0, width: 360, height: 360, background: "radial-gradient(circle, rgba(233,169,60,.28), rgba(233,169,60,0) 70%)", borderRadius: "50%" }} />
          <div className="hero-grid" style={{ position: "relative", gap: 30 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 15px", border: "1px solid rgba(233,169,60,.55)", borderRadius: 100, marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E9A93C", display: "block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", color: "#F2C879" }}>PERSIAPAN KEBERANGKATAN · JAKARTA 2024</span>
              </div>
              <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(38px, 5vw, 62px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 22px" }}>
                Lentera Harapan,<br />Menyinari Jalan <span style={{ color: "#E9A93C" }}>Pengabdian</span>
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(251,239,216,.82)", maxWidth: 480, margin: "0 0 32px" }}>
                Tiga ratus enam belas jiwa <b style={{ color: "#FBEFD8" }}>Bhramara Patria</b> — terbang dari seluruh penjuru dunia, bergandengan tangan menyalakan pengabdian untuk Indonesia.
              </p>
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/awardee" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#E9A93C", color: "#5E2329", fontWeight: 700, fontSize: 15, padding: "15px 26px", borderRadius: 100, textDecoration: "none", boxShadow: "0 10px 26px rgba(233,169,60,.32)" }}>
                  Jelajahi Awardee <span style={{ fontSize: 17 }}>&rarr;</span>
                </Link>
                <Link href="/tentang" style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "#FBEFD8", fontWeight: 700, fontSize: 15, padding: "15px 24px", borderRadius: 100, textDecoration: "none", border: "1.5px solid rgba(251,239,216,.4)" }}>
                  Tentang Angkatan
                </Link>
              </div>
            </div>
            <div style={{ position: "relative", height: 440 }}>
              <Image src="/assets/glow.png" alt="" width={1447} height={1447} style={{ position: "absolute", top: "50%", left: "54%", width: 560, height: "auto", mixBlendMode: "screen", animation: "glowPulse 5s ease-in-out infinite" }} />
              <Image src="/assets/ara-lantern.png" alt="Maskot Ara" width={433} height={663} preload style={{ position: "absolute", top: "50%", left: "52%", transform: "translate(-50%,-50%)", height: 430, width: "auto", filter: "drop-shadow(0 24px 40px rgba(40,15,18,.4))", animation: "araFloat 6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* STAT RIBBON */}
      <div className="shell grid-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ padding: "36px 30px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(74,29,34,.10)" : "none" }}>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 48, color: "#8E343A", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6B5A50", marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABOUT STRIP */}
      <div style={{ background: "#F4E9D7" }}>
        <div className="shell split-grid" style={{ paddingTop: 80, paddingBottom: 80, gridTemplateColumns: "1.05fr .95fr", gap: 56 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 16 }}>TENTANG ANGKATAN</div>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.1, letterSpacing: "-.01em", color: "#2A211E", margin: "0 0 20px" }}>
              Sang lebah pengembara, <span style={{ color: "#8E343A" }}>pencinta tanah air</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.68, color: "#5C4A42", margin: "0 0 16px" }}>
              <b>Bhramara</b> berasal dari bahasa Sansekerta — lebah hitam besar sang pengembara. <b>Patria</b> berakar dari patriotisme: kesediaan berkorban demi kejayaan tanah air.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.68, color: "#5C4A42", margin: "0 0 26px" }}>
              Maka lahirlah <b>&ldquo;Ara&rdquo;</b>, maskot kami — personifikasi keteguhan hati, keberanian, dan pengabdian yang nyalanya tak pernah padam.
            </p>
            <Link href="/tentang" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8E343A", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Selengkapnya tentang Bhramara Patria <span style={{ fontSize: 17 }}>&rarr;</span>
            </Link>
          </div>
          <div style={{ position: "relative", background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 20, padding: "32px 34px", boxShadow: "0 14px 40px rgba(74,29,34,.08)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".18em", color: "#8a6a3a", marginBottom: 18 }}>LIMA NILAI LPDP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {LPDP_VALUES.map((value) => (
                <div key={value} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Image src="/assets/flower-gold.png" alt="" width={230} height={215} style={{ width: 22, height: "auto" }} />
                  <span style={{ fontSize: 17, fontWeight: 700, color: "#2A211E" }}>{value}</span>
                </div>
              ))}
            </div>
            <Image src="/assets/ara-stand.png" alt="" width={250} height={379} style={{ position: "absolute", right: 18, bottom: -6, height: 152, width: "auto", filter: "drop-shadow(0 10px 18px rgba(40,15,18,.18))" }} />
          </div>
        </div>
      </div>

      {/* AWARDEES TEASER */}
      <div style={{ background: "#FBF5EA" }}>
        <div className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 14 }}>PARA AWARDEE</div>
              <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.08, letterSpacing: "-.01em", color: "#2A211E", margin: 0 }}>316 wajah, satu cahaya</h2>
            </div>
            <Link href="/awardee" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8E343A", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Lihat semua awardee <span style={{ fontSize: 17 }}>&rarr;</span>
            </Link>
          </div>
          <div className="grid-4" style={{ gap: 22 }}>
            {teaserAwardees.map((a) => (
              <Link key={a.id} href="/awardee" className="card-lift" style={{ textDecoration: "none", background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 30px rgba(74,29,34,.07)", display: "block" }}>
                <AwardeeCardBody awardee={a} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG TEASER */}
      <div style={{ background: "#FFFFFF" }}>
        <div className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 14 }}>BLOG &amp; CERITA</div>
              <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.08, letterSpacing: "-.01em", color: "#2A211E", margin: 0 }}>Suara para Bhramara</h2>
            </div>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8E343A", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Semua cerita <span style={{ fontSize: 17 }}>&rarr;</span>
            </Link>
          </div>
          <div className="grid-3" style={{ gap: 24 }}>
            {teaserPosts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ position: "relative", height: 200, borderRadius: 18, overflow: "hidden", background: ["linear-gradient(150deg,#9A3E40,#5E2329)", "linear-gradient(150deg,#C0501A,#8E343A)", "linear-gradient(150deg,#7E2F35,#4A1D22)"][i % 3], marginBottom: 18 }}>
                  <div className="batik" style={{ backgroundSize: 160, opacity: 0.06 }} />
                  <Image src={["/assets/icon-flower-gold.png", "/assets/icon-sprout-gold.png", "/assets/flower-gold.png"][i % 3]} alt="" width={202} height={135} style={{ position: "absolute", right: 18, bottom: 16, height: 46, width: "auto", opacity: 0.9 }} />
                  <span style={{ position: "absolute", top: 16, left: 16, fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "#5E2329", background: "#E9A93C", padding: "5px 11px", borderRadius: 100, textTransform: "uppercase" }}>{post.category}</span>
                </div>
                <h3 className="font-display" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.22, color: "#2A211E", margin: "0 0 8px" }}>{post.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5C4A42", margin: "0 0 12px" }}>{post.excerpt}</p>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#6B5A50" }}>
                  {post.author}
                  {post.authorInfo ? ` · ${post.authorInfo}` : ""}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* TOOLS BAND */}
      <div style={{ background: "#5E2329", position: "relative", overflow: "hidden" }}>
        <div className="batik" style={{ backgroundSize: 300, opacity: 0.045 }} />
        <div className="shell" style={{ position: "relative", paddingTop: 78, paddingBottom: 78 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 34, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 14 }}>TOOLS &amp; RESOURCES</div>
              <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.08, letterSpacing: "-.01em", color: "#FBEFD8", margin: 0 }}>Bekal untuk perjalananmu</h2>
            </div>
            <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#E9A93C", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Buka semua tools <span style={{ fontSize: 17 }}>&rarr;</span>
            </Link>
          </div>
          <div className="grid-4" style={{ gap: 18 }}>
            {TOOL_TEASERS.map((t) => (
              <Link key={t.title} href="/tools" style={{ textDecoration: "none", background: "rgba(251,239,216,.06)", border: "1px solid rgba(251,239,216,.14)", borderRadius: 16, padding: 24, display: "block" }}>
                <div className="font-display" style={{ fontWeight: 800, fontSize: 15, color: "#E9A93C", marginBottom: 10 }}>{t.tag}</div>
                <div className="font-display" style={{ fontWeight: 700, fontSize: 18, color: "#FBEFD8", marginBottom: 8 }}>{t.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(251,239,216,.7)", margin: 0 }}>{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter variant="full" />
    </div>
  );
}
