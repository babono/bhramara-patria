import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Filosofi nama Bhramara Patria, maskot Ara, semboyan, nilai LPDP, dan demografi angkatan PK-236.",
};

const NILAI = [
  { no: "01", title: "Integritas", desc: "Berpikir, berkata, dan bertindak dengan baik dan benar serta memegang teguh kode etik dan prinsip moral." },
  { no: "02", title: "Profesionalisme", desc: "Bekerja tuntas dan akurat atas dasar kompetensi terbaik dengan penuh tanggung jawab dan komitmen tinggi." },
  { no: "03", title: "Sinergi", desc: "Membangun hubungan kerja sama internal yang produktif serta kemitraan yang harmonis dengan para pemangku kepentingan." },
  { no: "04", title: "Pelayanan", desc: "Pelayanan yang memenuhi kepuasan pemangku kepentingan: sepenuh hati, transparan, cepat, akurat, dan aman." },
  { no: "05", title: "Kesempurnaan", desc: "Senantiasa melakukan upaya perbaikan di segala bidang untuk menjadi dan memberikan yang terbaik." },
];

const JENJANG_BARS = [
  { label: "Magister · Dalam Negeri", value: 189, width: "100%", color: "#8E343A" },
  { label: "Magister · Luar Negeri", value: 76, width: "40%", color: "#C0501A" },
  { label: "Doktor · Dalam Negeri", value: 46, width: "24%", color: "#E0922B" },
  { label: "Doktor · Luar Negeri", value: 5, width: "6%", color: "#E9A93C" },
];

export default function TentangPage() {
  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* MAROON HEADER */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 82% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" />
        <SiteHeader active="/tentang" />
        <div className="shell split-grid" style={{ position: "relative", paddingTop: 60, paddingBottom: 76, gridTemplateColumns: "1.2fr .8fr", gap: 30 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 18 }}>TENTANG ANGKATAN PK&#8209;236</div>
            <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(38px, 5vw, 58px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 20px" }}>
              Bhramara Patria
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(251,239,216,.82)", maxWidth: 560, margin: 0 }}>
              Sebuah angkatan yang lahir dari pertemuan 316 jiwa di Jakarta, 14&#8211;18 Juli 2024 — mosaik mimpi dan perjuangan anak bangsa yang siap berkontribusi untuk negeri.
            </p>
          </div>
          <div style={{ position: "relative", height: 300 }}>
            <Image src="/assets/glow.png" alt="" width={1447} height={1447} style={{ position: "absolute", top: "50%", left: "54%", width: 420, height: "auto", mixBlendMode: "screen", animation: "glowPulse 5s ease-in-out infinite" }} />
            <Image src="/assets/ara-lantern.png" alt="Maskot Ara" width={433} height={663} preload style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", height: 300, width: "auto", filter: "drop-shadow(0 18px 30px rgba(40,15,18,.4))", animation: "araFloat 6s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* FILOSOFI NAMA */}
      <div className="shell" style={{ paddingTop: 84, paddingBottom: 30 }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 14 }}>FILOSOFI NAMA</div>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.1, color: "#2A211E", margin: "0 0 16px" }}>
            Pengembara yang mencintai tanah air
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#5C4A42", margin: 0 }}>
            Nama <b>Bhramara Patria</b> terangkai untuk memproyeksikan simbol keteguhan hati, keberanian, pengabdian, dan rasa cinta tanah air.
          </p>
        </div>
        <div className="grid-2" style={{ gap: 24 }}>
          <div style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 22, padding: "38px 36px", boxShadow: "0 12px 34px rgba(74,29,34,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Image src="/assets/icon-flower-gold.png" alt="" width={202} height={135} style={{ height: 46, width: "auto" }} />
              <span className="font-display" style={{ fontSize: 30, color: "#C9A24B" }}>भ्रमर</span>
            </div>
            <h3 className="font-display" style={{ fontWeight: 800, fontSize: 26, color: "#8E343A", margin: "0 0 12px" }}>Bhramara</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.66, color: "#5C4A42", margin: 0 }}>
              Berasal dari bahasa Sansekerta yang bermakna <b>pengembara — lebah hitam besar</b>. Lebah hadir membawa banyak kebermanfaatan: pekerja keras, kolaboratif, dan menjaga siklus keberlanjutan.
            </p>
          </div>
          <div style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 22, padding: "38px 36px", boxShadow: "0 12px 34px rgba(74,29,34,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Image src="/assets/icon-sprout-gold.png" alt="" width={162} height={155} style={{ height: 46, width: "auto" }} />
              <span className="font-display" style={{ fontSize: 24, color: "#C9A24B", letterSpacing: ".04em" }}>PATRIA</span>
            </div>
            <h3 className="font-display" style={{ fontWeight: 800, fontSize: 26, color: "#8E343A", margin: "0 0 12px" }}>Patria</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.66, color: "#5C4A42", margin: 0 }}>
              Kata asal dari <b>patriotisme</b> — tanah air. Dalam KBBI bermakna sikap seseorang yang bersedia mengorbankan segalanya demi kejayaan dan kemakmuran tanah airnya.
            </p>
          </div>
        </div>
      </div>

      {/* MASKOT ARA */}
      <div style={{ background: "#F4E9D7", marginTop: 60 }}>
        <div className="shell split-grid" style={{ paddingTop: 78, paddingBottom: 78, gridTemplateColumns: ".8fr 1.2fr", gap: 50 }}>
          <div style={{ position: "relative", textAlign: "center" }}>
            <Image src="/assets/glow.png" alt="" width={1447} height={1447} style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%,-50%)", width: 440, height: "auto", mixBlendMode: "multiply", opacity: 0.5 }} />
            <Image src="/assets/ara-stand.png" alt="Maskot Ara" width={250} height={379} style={{ position: "relative", height: 340, width: "auto", filter: "drop-shadow(0 16px 26px rgba(40,15,18,.22))" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 16 }}>FILOSOFI MASKOT</div>
            <div style={{ display: "inline-block", position: "relative", background: "#FFFDF8", border: "1px solid rgba(74,29,34,.12)", borderRadius: "18px 18px 18px 4px", padding: "14px 20px", marginBottom: 22, boxShadow: "0 8px 20px rgba(74,29,34,.08)" }}>
              <span className="font-display" style={{ fontWeight: 700, fontSize: 18, color: "#8E343A" }}>
                Halo! Perkenalkan, sang Patria &mdash; <span style={{ color: "#E0922B" }}>&ldquo;Ara&rdquo;</span>
              </span>
            </div>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 36px)", lineHeight: 1.12, color: "#2A211E", margin: "0 0 16px" }}>
              Si lebah yang nyalanya tak pernah padam
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.68, color: "#5C4A42", margin: "0 0 14px" }}>
              Diambil dari nama angkatan, <b>&ldquo;Ara&rdquo;</b> adalah personifikasi nilai keteguhan hati, keberanian, dan pengabdian. Ia membawa lentera — lambang harapan yang terus menyala.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.68, color: "#5C4A42", margin: 0 }}>
              Seperti simbiosis lebah dan bunga cempaka, ia mengajarkan kerja keras, kerja sama, dan keberlanjutan pengabdian untuk Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* SEMBOYAN BAND */}
      <div style={{ position: "relative", background: "radial-gradient(120% 140% at 50% 0%, #9A3E40, #5E2329 70%)", overflow: "hidden" }}>
        <div className="batik" />
        <Image src="/assets/glow.png" alt="" width={1447} height={1447} style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%,-40%)", width: 680, height: "auto", mixBlendMode: "screen", opacity: 0.7 }} />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", padding: "84px 56px", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".24em", color: "#E9A93C", marginBottom: 22 }}>SEMBOYAN ANGKATAN</div>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 48px)", lineHeight: 1.12, letterSpacing: "-.01em", color: "#FBEFD8", margin: "0 0 24px" }}>
            &ldquo;Lentera Harapan,<br />Menyinari Jalan Pengabdian&rdquo;
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.66, color: "rgba(251,239,216,.82)", maxWidth: 640, margin: "0 auto" }}>
            Melalui nyala lentera, bersama-sama kita pijakkan kaki dan bergandengan tangan melantunkan gema pengabdian. Seperti kepakan sayap kecil si lebah &ldquo;Ara&rdquo;, kami siap menaklukkan tantangan dalam kebersamaan.
          </p>
        </div>
      </div>

      {/* NILAI LPDP */}
      <div className="shell" style={{ paddingTop: 84, paddingBottom: 84 }}>
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 14 }}>NILAI LPDP</div>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.1, color: "#2A211E", margin: 0 }}>Lima nilai yang kami pegang</h2>
        </div>
        <div className="grid-5" style={{ gap: 16 }}>
          {NILAI.map((n) => (
            <div key={n.no} style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, padding: "26px 22px" }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 15, color: "#E0922B", marginBottom: 14 }}>{n.no}</div>
              <h3 className="font-display" style={{ fontWeight: 700, fontSize: 19, color: "#8E343A", margin: "0 0 10px" }}>{n.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.58, color: "#5C4A42", margin: 0 }}>{n.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DEMOGRAFI */}
      <div style={{ background: "#FFFFFF" }}>
        <div className="shell" style={{ paddingTop: 84, paddingBottom: 84 }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 50px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#C06A2A", marginBottom: 14 }}>DEMOGRAFI ANGKATAN</div>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.1, color: "#2A211E", margin: 0 }}>316 jiwa dari seluruh nusantara</h2>
          </div>

          {/* big stats */}
          <div className="grid-4" style={{ gap: 18, marginBottom: 30 }}>
            <div style={{ background: "#5E2329", borderRadius: 18, padding: "30px 26px", color: "#FBEFD8" }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 46, lineHeight: 1, color: "#E9A93C" }}>316</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 8, color: "rgba(251,239,216,.82)" }}>Total Peserta</div>
            </div>
            {[
              { value: "33", label: "Provinsi Asal" },
              { value: "12", label: "Negara Tujuan" },
              { value: "80+", label: "Universitas Tujuan" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#F4E9D7", borderRadius: 18, padding: "30px 26px" }}>
                <div className="font-display" style={{ fontWeight: 800, fontSize: 46, lineHeight: 1, color: "#8E343A" }}>{s.value}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 8, color: "#6B5A50" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid-2" style={{ gap: 18 }}>
            {/* gender + univ */}
            <div style={{ background: "#FBF5EA", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, padding: "30px 32px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".14em", color: "#8a6a3a", marginBottom: 20 }}>JENIS KELAMIN</div>
              <div style={{ display: "flex", height: 46, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ width: "53%", background: "#8E343A", display: "flex", alignItems: "center", paddingLeft: 16, color: "#FBEFD8", fontWeight: 700, fontSize: 15 }}>53%</div>
                <div style={{ width: "47%", background: "#E0922B", display: "flex", alignItems: "center", paddingLeft: 16, color: "#5E2329", fontWeight: 700, fontSize: 15 }}>47%</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#5C4A42", marginBottom: 30 }}>
                <span><b style={{ color: "#8E343A" }}>&#9679;</b> Perempuan · 167</span>
                <span><b style={{ color: "#E0922B" }}>&#9679;</b> Laki-laki · 149</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".14em", color: "#8a6a3a", marginBottom: 20 }}>ASAL UNIVERSITAS TUJUAN</div>
              <div style={{ display: "flex", height: 46, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ width: "74%", background: "#8E343A", display: "flex", alignItems: "center", paddingLeft: 16, color: "#FBEFD8", fontWeight: 700, fontSize: 15 }}>74% Dalam Negeri</div>
                <div style={{ width: "26%", background: "#E9A93C", display: "flex", alignItems: "center", paddingLeft: 14, color: "#5E2329", fontWeight: 700, fontSize: 14 }}>26%</div>
              </div>
              <div style={{ fontSize: 13, color: "#6B5A50" }}>Sebanyak 81 awardee melanjutkan studi ke luar negeri.</div>
            </div>

            {/* jenjang */}
            <div style={{ background: "#FBF5EA", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, padding: "30px 32px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".14em", color: "#8a6a3a", marginBottom: 22 }}>JENJANG STUDI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {JENJANG_BARS.map((bar) => (
                  <div key={bar.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, fontWeight: 600, color: "#2A211E", marginBottom: 7 }}>
                      <span>{bar.label}</span><b>{bar.value}</b>
                    </div>
                    <div style={{ height: 12, background: "rgba(142,52,58,.12)", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{ width: bar.width, height: "100%", background: bar.color, borderRadius: 8 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(74,29,34,.10)", fontSize: 13, color: "#6B5A50" }}>
                Provinsi terbanyak: Jawa Barat (45), Jawa Timur (39), DKI Jakarta (38), Jawa Tengah (38).
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
