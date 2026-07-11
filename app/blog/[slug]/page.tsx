import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NotionBlocks from "@/components/NotionBlocks";
import { initials } from "@/components/AwardeeCardBody";
import { getBlogPost, getPageBlocks } from "@/lib/notion";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Cerita tidak ditemukan" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const blocks = post.fromNotion ? await getPageBlocks(post.id) : [];

  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      {/* MAROON HEADER */}
      <div style={{ position: "relative", background: "radial-gradient(120% 150% at 84% 0%, #9A3E40 0%, #7E2F35 50%, #5E2329 100%)", overflow: "hidden" }}>
        <div className="batik" />
        <SiteHeader active="/blog" />
        <div className="shell" style={{ position: "relative", paddingTop: 48, paddingBottom: 56, maxWidth: 900 }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#E9A93C", fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 22 }}>
            <span style={{ fontSize: 16 }}>&larr;</span> Semua cerita
          </Link>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: "#5E2329", background: "#E9A93C", padding: "6px 13px", borderRadius: 100, textTransform: "uppercase" }}>{post.category}</span>
          </div>
          <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 22px" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div className="font-display" style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(251,239,216,.14)", border: "1px solid rgba(251,239,216,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#FBEFD8", fontSize: 16 }}>
              {initials(post.author)}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#FBEFD8" }}>{post.author}</div>
              <div style={{ fontSize: 12.5, color: "rgba(251,239,216,.7)" }}>
                {[post.authorInfo, formatDate(post.date), `${post.readingMinutes} mnt baca`].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE */}
      <div className="shell" style={{ maxWidth: 900, paddingTop: 52, paddingBottom: 60 }}>
        {post.excerpt && (
          <p style={{ fontSize: 19, lineHeight: 1.66, color: "#2A211E", fontWeight: 600, margin: "0 0 26px" }}>{post.excerpt}</p>
        )}
        {blocks.length > 0 ? (
          <NotionBlocks blocks={blocks} />
        ) : (
          <div style={{ background: "#F4E9D7", border: "1px solid rgba(74,29,34,.10)", borderRadius: 18, padding: "26px 30px", display: "flex", alignItems: "center", gap: 20 }}>
            <Image src="/assets/ara-stand.png" alt="" width={250} height={379} style={{ height: 90, width: "auto" }} />
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5C4A42", margin: 0 }}>
              Isi cerita ini belum tersedia. Tulis konten artikelnya di halaman Notion terkait, dan ia akan tampil di sini secara otomatis.
            </p>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
