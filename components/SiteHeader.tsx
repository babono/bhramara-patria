"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/awardee", label: "Awardee" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/kontak", label: "Kontak" },
] as const;

export default function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell" style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
        <Link href="/" aria-label="Bhramara Patria — Beranda" style={{ display: "inline-flex", textDecoration: "none" }}>
          <span style={{ display: "inline-flex", background: "#FFFFFF", padding: "9px 22px", borderRadius: 999, border: "1px solid rgba(233,169,60,.3)", boxShadow: "0 8px 20px rgba(0,0,0,.18)" }}>
            <Image src="/assets/logo-bhramara.png" alt="PK-236 Bhramara Patria" width={556} height={215} style={{ height: 44, width: "auto", display: "block" }} />
          </span>
        </Link>
        <nav className="site-nav" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {NAV.map((item) =>
            item.href === active ? (
              <Link key={item.href} href={item.href} style={{ fontSize: 14.5, fontWeight: 700, color: "#FBEFD8", textDecoration: "none", paddingBottom: 3, borderBottom: "2px solid #E9A93C" }}>
                {item.label}
              </Link>
            ) : (
              <Link key={item.href} href={item.href} style={{ fontSize: 14.5, fontWeight: 600, color: "rgba(251,239,216,.78)", textDecoration: "none" }}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <button
          className="site-nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
          style={{ background: "none", border: "1px solid rgba(251,239,216,.4)", borderRadius: 10, color: "#FBEFD8", fontSize: 18, padding: "6px 12px", cursor: "pointer" }}
        >
          ☰
        </button>
      </div>
      <nav
        className={`mobile-nav${open ? " open" : ""}`}
        style={{ flexDirection: "column", gap: 4, paddingBottom: 18 }}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              fontSize: 15,
              fontWeight: item.href === active ? 700 : 600,
              color: item.href === active ? "#FBEFD8" : "rgba(251,239,216,.78)",
              textDecoration: "none",
              padding: "10px 4px",
              borderBottom: "1px solid rgba(251,239,216,.1)",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
