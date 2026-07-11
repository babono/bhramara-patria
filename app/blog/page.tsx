import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/notion";
import { initials } from "@/components/AwardeeCardBody";

export const metadata: Metadata = {
  title: "Blog",
  description: "Refleksi, tips beasiswa, dan kisah pengabdian yang ditulis langsung oleh keluarga PK-236.",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* MAROON HEADER */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 84% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" />
        <SiteHeader active="/blog" />
        <div className="shell" style={{ position: "relative", paddingTop: 54, paddingBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 14 }}>BLOG &amp; CERITA</div>
          <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 14px" }}>
            Suara para Bhramara
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(251,239,216,.8)", maxWidth: 560, margin: 0 }}>
            Refleksi, tips beasiswa, dan kisah pengabdian yang ditulis langsung oleh keluarga PK&#8209;236 dari berbagai penjuru dunia.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {/* category chips */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 34 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FBEFD8", background: "#8E343A", padding: "9px 18px", borderRadius: 100 }}>Semua</span>
          {categories.map((c) => (
            <span key={c} style={{ fontSize: 13, fontWeight: 600, color: "#6B5A50", background: "#fff", border: "1px solid rgba(74,29,34,.14)", padding: "9px 18px", borderRadius: 100 }}>
              {c}
            </span>
          ))}
        </div>

        {/* FEATURED */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="split-grid"
            style={{ textDecoration: "none", gridTemplateColumns: "1.05fr .95fr", gap: 0, background: "#FFFDF8", border: "1px solid rgba(74,29,34,.10)", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 44px rgba(74,29,34,.10)", marginBottom: 46, alignItems: "stretch" }}
          >
            <div style={{ position: "relative", minHeight: 340, background: "linear-gradient(150deg,#9A3E40,#5E2329)", overflow: "hidden" }}>
              <div className="batik" style={{ backgroundSize: 180, opacity: 0.06 }} />
              <Image src="/assets/glow.png" alt="" width={1447} height={1447} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: "auto", mixBlendMode: "screen", opacity: 0.7 }} />
              <Image src="/assets/ara-lantern.png" alt="" width={433} height={663} style={{ position: "absolute", bottom: -6, right: 24, height: 230, width: "auto", filter: "drop-shadow(0 14px 24px rgba(40,15,18,.34))" }} />
              <span style={{ position: "absolute", top: 24, left: 24, fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "#5E2329", background: "#E9A93C", padding: "6px 13px", borderRadius: 100, textTransform: "uppercase" }}>
                CERITA UTAMA · {featured.category}
              </span>
            </div>
            <div style={{ padding: "44px 46px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.16, color: "#2A211E", margin: "0 0 16px" }}>{featured.title}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.66, color: "#5C4A42", margin: "0 0 26px" }}>{featured.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <div className="font-display" style={{ width: 46, height: 46, borderRadius: "50%", background: "radial-gradient(120% 120% at 50% 20%, #9A3E40, #6E2A30)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#FBEFD8", fontSize: 16 }}>
                  {initials(featured.author)}
                </div>
                <div style={{ lineHeight: 1.3 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#2A211E" }}>{featured.author}</div>
                  <div style={{ fontSize: 12.5, color: "#6B5A50" }}>
                    {[featured.authorInfo, formatDate(featured.date), `${featured.readingMinutes} mnt baca`].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        <div className="grid-3" style={{ gap: 26 }}>
          {rest.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
