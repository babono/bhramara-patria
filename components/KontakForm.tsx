"use client";

import { useState } from "react";

const CONTACT_EMAIL = "bhramarapatria.pk236@gmail.com";

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid rgba(74,29,34,.16)",
  borderRadius: 11,
  padding: "13px 15px",
  fontSize: 14.5,
  color: "#2A211E",
  outline: "none",
  background: "#FBF5EA",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 700,
  color: "#6B5A50",
  marginBottom: 8,
};

export default function KontakForm() {
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `${form.pesan}\n\n—\n${form.nama}${form.email ? ` (${form.email})` : ""}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subjek || "Pesan dari situs Bhramara Patria")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="grid-2" style={{ gap: 16 }}>
        <div>
          <label style={labelStyle}>Nama Lengkap</label>
          <input type="text" required value={form.nama} onChange={set("nama")} placeholder="Nama Anda" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="nama@email.com" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Subjek</label>
        <input type="text" value={form.subjek} onChange={set("subjek")} placeholder="Topik pesan Anda" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Pesan</label>
        <textarea rows={5} required value={form.pesan} onChange={set("pesan")} placeholder="Tuliskan pesan Anda di sini…" style={{ ...inputStyle, resize: "vertical" }} />
      </div>
      <button
        type="submit"
        style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 9, background: "#E2641F", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 30px", border: "none", borderRadius: 100, cursor: "pointer", boxShadow: "0 10px 24px rgba(226,100,31,.28)", fontFamily: "inherit" }}
      >
        Kirim Pesan <span style={{ fontSize: 17 }}>&rarr;</span>
      </button>
    </form>
  );
}
