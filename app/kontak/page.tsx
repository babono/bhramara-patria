import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import KontakForm from "@/components/KontakForm";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Punya pertanyaan, ajakan kolaborasi, atau ingin menyapa keluarga Bhramara Patria? Kami senang mendengar dari Anda.",
};

const CONTACT_ITEMS = [
  { label: "ALAMAT", value: "Gedung Danadyaksa, Jl. Cikini Raya No.91 A‑D, Menteng, Kota Jakarta Pusat, DKI Jakarta 10330" },
  { label: "CALL CENTER", value: "134" },
  { label: "ANGKATAN PK‑236", value: "bhramarapatria.pk236@gmail.com" },
];

export default function KontakPage() {
  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* MAROON HEADER */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 84% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" />
        <SiteHeader active="/kontak" />
        <div className="shell" style={{ position: "relative", paddingTop: 54, paddingBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 14 }}>KONTAK</div>
          <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 14px" }}>
            Mari terhubung
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(251,239,216,.8)", maxWidth: 540, margin: 0 }}>
            Punya pertanyaan, ajakan kolaborasi, atau ingin menyapa keluarga Bhramara Patria? Kami senang mendengar dari Anda.
          </p>
        </div>
      </div>

      <div className="shell split-grid" style={{ paddingTop: 60, paddingBottom: 80, gridTemplateColumns: "1.05fr .95fr", gap: 40, alignItems: "start" }}>
        {/* FORM */}
        <div style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 24, padding: "40px 42px", boxShadow: "0 16px 44px rgba(74,29,34,.08)" }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 26, color: "#2A211E", margin: "0 0 24px" }}>Kirim pesan</h2>
          <KontakForm />
        </div>

        {/* CONTACT INFO */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ position: "relative", background: "radial-gradient(120% 120% at 80% 0%, #9A3E40, #5E2329)", borderRadius: 24, padding: "36px 38px", color: "#FBEFD8", overflow: "hidden" }}>
            <div className="batik" style={{ backgroundSize: 200 }} />
            <div style={{ position: "relative" }}>
              <h3 className="font-display" style={{ fontWeight: 800, fontSize: 22, color: "#FBEFD8", margin: "0 0 24px" }}>Lembaga Pengelola Dana Pendidikan</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 15 }}>
                    <Image src="/assets/flower-gold.png" alt="" width={230} height={215} style={{ width: 22, height: 22, flex: "none", marginTop: 2, objectFit: "contain" }} />
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".12em", color: "#E9A93C", marginBottom: 5 }}>{item.label}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(251,239,216,.86)" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: 200, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(74,29,34,.12)", background: "repeating-linear-gradient(45deg,#F1E6D2,#F1E6D2 12px,#EBDDC4 12px,#EBDDC4 24px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: ".08em", color: "#9b8a80", marginBottom: 10 }}>[ PETA LOKASI · MENTENG, JAKARTA PUSAT ]</div>
              <a href="https://maps.google.com/?q=Gedung+Danadyaksa+Cikini" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#8E343A", color: "#FBEFD8", fontWeight: 700, fontSize: 13.5, padding: "11px 20px", borderRadius: 100, textDecoration: "none" }}>
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
