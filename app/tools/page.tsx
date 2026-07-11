import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getToolSections, type ToolLink } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Tools",
  description: "Satu pintu untuk kebutuhan studi keluarga Bhramara Patria — jurnal akademik, panduan LPDP, template dokumen, dan tautan penting.",
};

const ARROWS: Record<ToolLink["linkType"], string> = {
  download: "↓",
  internal: "→",
  external: "↗",
};

const SECTION_ICONS = ["/assets/icon-sprout-gold.png", "/assets/icon-flower-gold.png"];

const JOURNAL_SOURCES = [
  { label: "Google Scholar", url: "https://scholar.google.com" },
  { label: "DOAJ", url: "https://doaj.org" },
  { label: "Garuda", url: "https://garuda.kemdikbud.go.id" },
  { label: "e-Resources Perpusnas", url: "https://www.perpusnas.go.id" },
];

function ToolRow({ link, dark }: { link: ToolLink; dark?: boolean }) {
  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 0",
    borderTop: dark ? "1px solid rgba(251,239,216,.14)" : "1px solid rgba(74,29,34,.08)",
    textDecoration: "none",
  };
  const labelStyle: React.CSSProperties = { fontSize: 14.5, fontWeight: 600, color: dark ? "#FBEFD8" : "#2A211E" };
  const arrowStyle: React.CSSProperties = { color: dark ? "#E9A93C" : "#C06A2A", fontWeight: 700 };
  const content = (
    <>
      <span style={labelStyle}>{link.title}</span>
      <span style={arrowStyle}>{ARROWS[link.linkType]}</span>
    </>
  );
  if (link.url.startsWith("/")) {
    return <Link href={link.url} style={rowStyle}>{content}</Link>;
  }
  return (
    <a href={link.url} target={link.url === "#" ? undefined : "_blank"} rel="noopener" style={rowStyle}>
      {content}
    </a>
  );
}

export default async function ToolsPage() {
  const sections = await getToolSections();

  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* MAROON HEADER */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 84% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" />
        <SiteHeader active="/tools" />
        <div className="shell" style={{ position: "relative", paddingTop: 54, paddingBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 14 }}>TOOLS &amp; RESOURCES</div>
          <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 14px" }}>
            Bekal untuk perjalananmu
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(251,239,216,.8)", maxWidth: 560, margin: 0 }}>
            Satu pintu untuk kebutuhan studi keluarga Bhramara Patria — dari jurnal akademik, panduan LPDP, template dokumen, hingga tautan penting.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 46, paddingBottom: 80 }}>
        {/* FEATURED: JOURNAL ACCESS */}
        <div style={{ position: "relative", background: "linear-gradient(150deg,#FFFDF8,#F6E8CF)", border: "1px solid rgba(74,29,34,.10)", borderRadius: 24, padding: "42px 46px", boxShadow: "0 16px 44px rgba(74,29,34,.10)", overflow: "hidden", marginBottom: 46 }}>
          <Image src="/assets/icon-flower-gold.png" alt="" width={202} height={135} style={{ position: "absolute", right: 34, top: 34, height: 52, width: "auto", opacity: 0.7 }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#8E343A", color: "#FBEFD8", fontSize: 11, fontWeight: 800, letterSpacing: ".12em", padding: "6px 13px", borderRadius: 100, marginBottom: 18 }}>
            ALAT UNGGULAN
          </div>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 30px)", lineHeight: 1.12, color: "#2A211E", margin: "0 0 10px", maxWidth: 600 }}>
            Akses &amp; unduh jurnal akademik
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#5C4A42", margin: "0 0 26px", maxWidth: 620 }}>
            Cari paper, artikel, dan jurnal dari basis data terpercaya. Telusuri sekali, lalu lanjutkan ke sumber resmi untuk mengunduh secara legal.
          </p>
          <form action="https://scholar.google.com/scholar" method="get" target="_blank" style={{ display: "flex", gap: 12, maxWidth: 680, marginBottom: 22, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: 12, background: "#FFFDF8", border: "1px solid rgba(74,29,34,.16)", borderRadius: 12, padding: "14px 18px" }}>
              <span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid #C7A", borderRadius: "50%", position: "relative", flex: "none" }}>
                <span style={{ position: "absolute", width: 2.5, height: 8, background: "#C7A", transform: "rotate(-45deg)", right: -4, bottom: -5, borderRadius: 2 }} />
              </span>
              <input name="q" type="text" placeholder="Cari judul, DOI, atau nama penulis…" style={{ border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 15, color: "#2A211E", width: "100%" }} />
            </div>
            <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#E2641F", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Cari &amp; Unduh
            </button>
          </form>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8a6a3a" }}>Sumber resmi:</span>
            {JOURNAL_SOURCES.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener" style={{ fontSize: 13, fontWeight: 600, color: "#8E343A", background: "#fff", border: "1px solid rgba(74,29,34,.14)", padding: "8px 15px", borderRadius: 100, textDecoration: "none" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* RESOURCE SECTIONS */}
        <div className="grid-2" style={{ gap: 24 }}>
          {sections.map((section, i) => {
            const dark = section.title.toLowerCase().includes("komunitas");
            if (dark) {
              return (
                <div key={section.title} style={{ background: "#5E2329", borderRadius: 22, padding: "34px 36px", color: "#FBEFD8", position: "relative", overflow: "hidden" }}>
                  <div className="batik" style={{ backgroundSize: 200 }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                      <Image src="/assets/flower-white.png" alt="" width={230} height={215} style={{ height: 34, width: "auto" }} />
                      <h3 className="font-display" style={{ fontWeight: 800, fontSize: 23, color: "#FBEFD8", margin: 0 }}>{section.title}</h3>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(251,239,216,.78)", margin: "0 0 20px" }}>{section.description}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {section.links.map((link) => (
                        <ToolRow key={link.id} link={link} dark />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={section.title} style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 22, padding: "34px 36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                  <Image src={SECTION_ICONS[i % SECTION_ICONS.length]} alt="" width={202} height={135} style={{ height: 38, width: "auto" }} />
                  <h3 className="font-display" style={{ fontWeight: 800, fontSize: 23, color: "#8E343A", margin: 0 }}>{section.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5C4A42", margin: "0 0 20px" }}>{section.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {section.links.map((link) => (
                    <ToolRow key={link.id} link={link} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
