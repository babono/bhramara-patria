"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import type { Awardee } from "@/lib/notion";
import AwardeeCardBody, { initials } from "@/components/AwardeeCardBody";

type Filters = {
  q: string;
  jenjang: "all" | "S2" | "S3";
  loc: "all" | "DN" | "LN";
  kelompok: string;
};

const INITIAL: Filters = { q: "", jenjang: "all", loc: "all", kelompok: "all" };

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 13,
        fontWeight: 700,
        padding: "8px 16px",
        borderRadius: 100,
        border: `1px solid ${active ? "#E9A93C" : "rgba(251,239,216,.22)"}`,
        background: active ? "#E9A93C" : "rgba(251,239,216,.08)",
        color: active ? "#5E2329" : "rgba(251,239,216,.85)",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

export default function AwardeeDirectory({ awardees, hero }: { awardees: Awardee[]; hero: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(INITIAL);
  const [selected, setSelected] = useState<Awardee | null>(null);

  const kelompokNames = useMemo(
    () => [...new Set(awardees.map((a) => a.kelompok).filter(Boolean))].sort(),
    [awardees],
  );

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = awardees;
    if (q) list = list.filter((a) => `${a.name} ${a.nickname} ${a.university} ${a.program} ${a.kelompok}`.toLowerCase().includes(q));
    if (filters.jenjang !== "all") list = list.filter((a) => a.jenjang === filters.jenjang);
    if (filters.loc !== "all") list = list.filter((a) => a.lokasi === filters.loc);
    if (filters.kelompok !== "all") list = list.filter((a) => a.kelompok === filters.kelompok);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [awardees, filters]);

  return (
    <>
      {/* MAROON HEADER + SEARCH + FILTERS */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 84% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        {hero}
        <div className="shell" style={{ position: "relative", paddingBottom: 48 }}>
          {/* SEARCH */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFDF8", borderRadius: 14, padding: "14px 18px", boxShadow: "0 12px 30px rgba(40,15,18,.22)", maxWidth: 560 }}>
            <span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid #C7A", borderRadius: "50%", position: "relative", flex: "none" }}>
              <span style={{ position: "absolute", width: 2.5, height: 8, background: "#C7A", transform: "rotate(-45deg)", right: -4, bottom: -5, borderRadius: 2 }} />
            </span>
            <input
              type="text"
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              placeholder="Cari nama, panggilan, kampus, atau kelompok…"
              style={{ border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 15, color: "#2A211E", width: "100%" }}
            />
          </div>

          {/* FILTERS */}
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", color: "rgba(251,239,216,.55)", width: 74 }}>JENJANG</span>
              <Chip label="Semua" active={filters.jenjang === "all"} onClick={() => setFilters((f) => ({ ...f, jenjang: "all" }))} />
              <Chip label="Magister (S2)" active={filters.jenjang === "S2"} onClick={() => setFilters((f) => ({ ...f, jenjang: "S2" }))} />
              <Chip label="Doktoral (S3)" active={filters.jenjang === "S3"} onClick={() => setFilters((f) => ({ ...f, jenjang: "S3" }))} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", color: "rgba(251,239,216,.55)", width: 74 }}>LOKASI</span>
              <Chip label="Semua" active={filters.loc === "all"} onClick={() => setFilters((f) => ({ ...f, loc: "all" }))} />
              <Chip label="Dalam Negeri" active={filters.loc === "DN"} onClick={() => setFilters((f) => ({ ...f, loc: "DN" }))} />
              <Chip label="Luar Negeri" active={filters.loc === "LN"} onClick={() => setFilters((f) => ({ ...f, loc: "LN" }))} />
            </div>
            {kelompokNames.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", color: "rgba(251,239,216,.55)", width: 74 }}>KELOMPOK</span>
                <Chip label="Semua" active={filters.kelompok === "all"} onClick={() => setFilters((f) => ({ ...f, kelompok: "all" }))} />
                {kelompokNames.map((g) => (
                  <Chip key={g} label={g} active={filters.kelompok === g} onClick={() => setFilters((f) => ({ ...f, kelompok: g }))} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="shell" style={{ paddingTop: 34, paddingBottom: 80 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 14.5, color: "#6B5A50" }}>
            Menampilkan <b style={{ color: "#2A211E" }}>{filtered.length}</b> awardee
          </div>
          <button
            onClick={() => setFilters(INITIAL)}
            style={{ fontSize: 13.5, fontWeight: 700, color: "#8E343A", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Atur ulang filter
          </button>
        </div>

        <div className="grid-4" style={{ gap: 22 }}>
          {filtered.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className="card-lift"
              style={{ background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 30px rgba(74,29,34,.06)", cursor: "pointer" }}
            >
              <AwardeeCardBody awardee={a} showKelompok />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 20px", color: "#6B5A50" }}>
            <Image src="/assets/ara-stand.png" alt="" width={250} height={379} style={{ height: 120, width: "auto", opacity: 0.5, marginBottom: 18 }} />
            <div className="font-display" style={{ fontWeight: 700, fontSize: 22, color: "#2A211E", marginBottom: 8 }}>Belum ada yang cocok</div>
            <div style={{ fontSize: 15 }}>Coba kata kunci lain atau atur ulang filter.</div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(40,15,18,.66)", display: "flex", alignItems: "center", justifyContent: "center", padding: 30, zIndex: 50, animation: "fadeIn .18s ease" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: 640, maxWidth: "100%", background: "#FFFDF8", borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 90px rgba(40,15,18,.5)", animation: "modalIn .22s ease" }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Tutup"
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2, width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(251,239,216,.22)", color: "#FBEFD8", fontSize: 18, cursor: "pointer", lineHeight: 1 }}
            >
              &times;
            </button>
            <div className="modal-grid">
              <div style={{ position: "relative", background: "radial-gradient(130% 120% at 50% 14%, #9A3E40, #5E2329)", minHeight: 300, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="batik" style={{ backgroundSize: 170, opacity: 0.07 }} />
                <Image src="/assets/flower-white.png" alt="" width={230} height={215} style={{ position: "absolute", top: 18, left: 18, width: 30, height: "auto", opacity: 0.55 }} />
                <span className="font-display" style={{ fontWeight: 800, fontSize: 86, color: "rgba(251,239,216,.94)" }}>{initials(selected.name)}</span>
              </div>
              <div style={{ padding: "34px 34px 36px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".16em", color: "#C06A2A", marginBottom: 10 }}>AWARDEE PK&#8209;236</div>
                <h2 className="font-display" style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.12, color: "#2A211E", margin: "0 0 4px" }}>{selected.name}</h2>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#C06A2A", marginBottom: 20 }}>&ldquo;{selected.nickname}&rdquo;</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "#9b8a80", marginBottom: 4 }}>UNIVERSITAS</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#2A211E" }}>{selected.university}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "#9b8a80", marginBottom: 4 }}>PROGRAM STUDI</div>
                    <div style={{ fontSize: 15, color: "#2A211E", lineHeight: 1.4 }}>{selected.program}</div>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8E343A", background: "#F4E3C6", padding: "7px 14px", borderRadius: 100 }}>
                      {selected.jenjang === "S2" ? "Magister (S2)" : "Doktoral (S3)"}
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8E343A", background: "#F4E3C6", padding: "7px 14px", borderRadius: 100 }}>
                      {selected.lokasi === "DN" ? "Dalam Negeri" : "Luar Negeri"}
                    </span>
                    {selected.kelompok && (
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "#FBEFD8", background: "#8E343A", padding: "7px 14px", borderRadius: 100 }}>
                        Kelompok {selected.kelompok}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
