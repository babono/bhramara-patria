import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/notion";

// Gradient / icon rotation reproducing the card art of the original design
const GRADIENTS = [
  "linear-gradient(150deg,#C0501A,#8E343A)",
  "linear-gradient(150deg,#7E2F35,#4A1D22)",
  "linear-gradient(150deg,#9A3E40,#5E2329)",
  "linear-gradient(150deg,#B5471D,#7E2F35)",
  "linear-gradient(150deg,#8E343A,#5E2329)",
  "linear-gradient(150deg,#C0501A,#7E2F35)",
];

const ICONS = [
  { src: "/assets/icon-sprout-gold.png", w: 162, h: 155, height: 48 },
  { src: "/assets/flower-gold.png", w: 230, h: 215, height: 44 },
  { src: "/assets/icon-flower-gold.png", w: 202, h: 135, height: 46 },
];

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const icon = ICONS[index % ICONS.length];
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{ position: "relative", height: 200, borderRadius: 18, overflow: "hidden", background: gradient, marginBottom: 18 }}>
        <div className="batik" style={{ backgroundSize: 150 }} />
        <Image src={icon.src} alt="" width={icon.w} height={icon.h} style={{ position: "absolute", right: 18, bottom: 16, height: icon.height, width: "auto", opacity: 0.92 }} />
        <span style={{ position: "absolute", top: 16, left: 16, fontSize: 10.5, fontWeight: 800, letterSpacing: ".1em", color: "#5E2329", background: "#E9A93C", padding: "5px 11px", borderRadius: 100, textTransform: "uppercase" }}>
          {post.category}
        </span>
      </div>
      <h3 className="font-display" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.22, color: "#2A211E", margin: "0 0 8px" }}>{post.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5C4A42", margin: "0 0 14px" }}>{post.excerpt}</p>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#6B5A50" }}>
        {post.author}
        {post.authorInfo ? ` · ${post.authorInfo}` : ""} · {post.readingMinutes} mnt
      </div>
    </Link>
  );
}
