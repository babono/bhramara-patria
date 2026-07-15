import Link from "next/link";
import Image from "next/image";

const COPYRIGHT = "© 2024 PK‑236 Bhramara Patria · Lembaga Pengelola Dana Pendidikan";

export default function SiteFooter({ variant = "compact" }: { variant?: "full" | "compact" }) {
  if (variant === "full") {
    return (
      <div style={{ background: "#4A1D22" }}>
        <div className="shell" style={{ padding: "56px 56px 34px", color: "rgba(251,239,216,.75)" }}>
          <div className="footer-grid" style={{ gap: 40, paddingBottom: 34, borderBottom: "1px solid rgba(251,239,216,.14)" }}>
            <div>
              <div style={{ marginBottom: 18 }}>
                <Image src="/assets/logo-bhramara-patria-white.png" alt="PK-236 Bhramara Patria" width={2084} height={1250} style={{ height: 88, width: "auto", display: "block" }} />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: 0, fontStyle: "italic", color: "rgba(251,239,216,.7)" }}>
                &ldquo;Lentera Harapan, Menyinari Jalan Pengabdian.&rdquo;
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".16em", color: "#E9A93C", marginBottom: 14 }}>JELAJAHI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                <Link href="/tentang" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Tentang</Link>
                <Link href="/awardee" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Awardee</Link>
                <Link href="/blog" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Blog</Link>
                <Link href="/tools" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Tools</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".16em", color: "#E9A93C", marginBottom: 14 }}>ANGKATAN</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                <Link href="/kontak" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Kontak</Link>
                <span style={{ color: "rgba(251,239,216,.6)" }}>Jakarta, 14&#8211;18 Juli 2024</span>
                <span style={{ color: "rgba(251,239,216,.6)" }}>316 Awardee</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".16em", color: "#E9A93C", marginBottom: 14 }}>LPDP</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
                Gedung Danadyaksa, Jl. Cikini Raya No.91 A&#8209;D, Menteng, Jakarta Pusat 10330<br />Call Center 134
              </p>
            </div>
          </div>
          <div style={{ paddingTop: 22, fontSize: 12.5, color: "rgba(251,239,216,.55)" }}>{COPYRIGHT}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#4A1D22" }}>
      <div className="shell" style={{ padding: "48px 56px 32px", color: "rgba(251,239,216,.72)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18, paddingBottom: 26, borderBottom: "1px solid rgba(251,239,216,.14)" }}>
          <Image src="/assets/logo-bhramara-patria-white.png" alt="PK-236 Bhramara Patria" width={2084} height={1250} style={{ height: 72, width: "auto", display: "block" }} />
          <div style={{ display: "flex", gap: 26, fontSize: 14, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Beranda</Link>
            <Link href="/tentang" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Tentang</Link>
            <Link href="/awardee" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Awardee</Link>
            <Link href="/blog" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Blog</Link>
            <Link href="/tools" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Tools</Link>
            <Link href="/kontak" style={{ color: "rgba(251,239,216,.78)", textDecoration: "none" }}>Kontak</Link>
          </div>
        </div>
        <div style={{ paddingTop: 20, fontSize: 12.5, color: "rgba(251,239,216,.55)" }}>{COPYRIGHT}</div>
      </div>
    </div>
  );
}
