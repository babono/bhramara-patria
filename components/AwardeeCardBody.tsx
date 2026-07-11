import Image from "next/image";
import type { Awardee } from "@/lib/notion";

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

export function badgeLabel(a: Awardee): string {
  return `${a.jenjang} · ${a.lokasi === "DN" ? "DALAM NEGERI" : "LUAR NEGERI"}`;
}

export default function AwardeeCardBody({ awardee, showKelompok = false }: { awardee: Awardee; showKelompok?: boolean }) {
  return (
    <>
      <div style={{ position: "relative", height: 188, background: "radial-gradient(120% 120% at 50% 16%, #9A3E40, #6E2A30)", overflow: "hidden" }}>
        <Image src="/assets/flower-white.png" alt="" width={230} height={215} style={{ position: "absolute", top: 14, right: 14, width: 28, height: "auto", opacity: 0.5 }} />
        <span className="font-display" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-54%)", fontWeight: 800, fontSize: 60, color: "rgba(251,239,216,.92)" }}>
          {initials(awardee.name)}
        </span>
        <span style={{ position: "absolute", bottom: 12, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#F2C879", background: "rgba(40,15,18,.36)", padding: "4px 9px", borderRadius: 100 }}>
          {badgeLabel(awardee)}
        </span>
      </div>
      <div style={{ padding: "18px 18px 20px" }}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: 17.5, color: "#2A211E", lineHeight: 1.18 }}>{awardee.name}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#C06A2A", margin: "2px 0 12px" }}>&ldquo;{awardee.nickname}&rdquo;</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2A211E", lineHeight: 1.3 }}>{awardee.university}</div>
        <div style={{ fontSize: 12.5, color: "#6B5A50", marginTop: 3, lineHeight: 1.4 }}>{awardee.program}</div>
        {showKelompok && (
          <div style={{ marginTop: 13, paddingTop: 12, borderTop: "1px solid rgba(74,29,34,.08)", display: "flex", alignItems: "center", gap: 7 }}>
            <Image src="/assets/flower-gold.png" alt="" width={230} height={215} style={{ width: 14, height: "auto" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#8E343A" }}>Kelompok {awardee.kelompok}</span>
          </div>
        )}
      </div>
    </>
  );
}
