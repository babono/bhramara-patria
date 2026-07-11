import Image from "next/image";
import type { NotionBlock } from "@/lib/notion";

type RichText = {
  plain_text: string;
  href?: string | null;
  annotations?: { bold?: boolean; italic?: boolean; strikethrough?: boolean; underline?: boolean; code?: boolean };
};

function Rich({ rich }: { rich: RichText[] }) {
  return (
    <>
      {rich.map((t, i) => {
        let node: React.ReactNode = t.plain_text;
        const a = t.annotations ?? {};
        if (a.code) node = <code style={{ background: "#F4E9D7", padding: "2px 6px", borderRadius: 6, fontSize: "0.92em" }}>{node}</code>;
        if (a.bold) node = <b>{node}</b>;
        if (a.italic) node = <i>{node}</i>;
        if (a.strikethrough) node = <s>{node}</s>;
        if (a.underline) node = <u>{node}</u>;
        if (t.href) node = <a href={t.href} target="_blank" rel="noopener" style={{ color: "#8E343A", fontWeight: 600 }}>{node}</a>;
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function blockRich(block: NotionBlock): RichText[] {
  const data = block[block.type] as { rich_text?: RichText[] } | undefined;
  return data?.rich_text ?? [];
}

const P_STYLE: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.75, color: "#5C4A42", margin: "0 0 18px" };
const H_STYLE: React.CSSProperties = { fontWeight: 800, color: "#2A211E", lineHeight: 1.2 };

export default function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  const out: React.ReactNode[] = [];
  let listBuffer: { type: string; items: NotionBlock[] } | null = null;

  const flushList = () => {
    if (!listBuffer) return;
    const items = listBuffer.items.map((b) => (
      <li key={b.id} style={{ ...P_STYLE, margin: "0 0 8px" }}>
        <Rich rich={blockRich(b)} />
      </li>
    ));
    out.push(
      listBuffer.type === "numbered_list_item" ? (
        <ol key={listBuffer.items[0].id + "-list"} style={{ margin: "0 0 18px", paddingLeft: 26 }}>{items}</ol>
      ) : (
        <ul key={listBuffer.items[0].id + "-list"} style={{ margin: "0 0 18px", paddingLeft: 26 }}>{items}</ul>
      ),
    );
    listBuffer = null;
  };

  for (const block of blocks) {
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      if (listBuffer && listBuffer.type !== block.type) flushList();
      listBuffer = listBuffer ?? { type: block.type, items: [] };
      listBuffer.items.push(block);
      continue;
    }
    flushList();

    switch (block.type) {
      case "paragraph":
        out.push(
          <p key={block.id} style={P_STYLE}>
            <Rich rich={blockRich(block)} />
          </p>,
        );
        break;
      case "heading_1":
        out.push(
          <h2 key={block.id} className="font-display" style={{ ...H_STYLE, fontSize: 30, margin: "36px 0 14px" }}>
            <Rich rich={blockRich(block)} />
          </h2>,
        );
        break;
      case "heading_2":
        out.push(
          <h3 key={block.id} className="font-display" style={{ ...H_STYLE, fontSize: 25, margin: "32px 0 12px" }}>
            <Rich rich={blockRich(block)} />
          </h3>,
        );
        break;
      case "heading_3":
        out.push(
          <h4 key={block.id} className="font-display" style={{ ...H_STYLE, fontSize: 20, margin: "26px 0 10px" }}>
            <Rich rich={blockRich(block)} />
          </h4>,
        );
        break;
      case "quote":
        out.push(
          <blockquote key={block.id} style={{ margin: "0 0 18px", padding: "14px 22px", borderLeft: "4px solid #E9A93C", background: "#F4E9D7", borderRadius: "0 12px 12px 0", fontStyle: "italic", ...P_STYLE, marginBottom: 18 }}>
            <Rich rich={blockRich(block)} />
          </blockquote>,
        );
        break;
      case "callout": {
        out.push(
          <div key={block.id} style={{ margin: "0 0 18px", padding: "16px 22px", background: "#F4E9D7", border: "1px solid rgba(74,29,34,.10)", borderRadius: 14, ...P_STYLE, marginBottom: 18 }}>
            <Rich rich={blockRich(block)} />
          </div>,
        );
        break;
      }
      case "divider":
        out.push(<hr key={block.id} style={{ border: "none", borderTop: "1px solid rgba(74,29,34,.14)", margin: "30px 0" }} />);
        break;
      case "code": {
        const rich = blockRich(block);
        out.push(
          <pre key={block.id} style={{ background: "#2A211E", color: "#FBEFD8", padding: "18px 22px", borderRadius: 14, overflowX: "auto", fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>
            <code>{rich.map((t) => t.plain_text).join("")}</code>
          </pre>,
        );
        break;
      }
      case "image": {
        const data = block.image as { type: "external" | "file"; external?: { url: string }; file?: { url: string }; caption?: RichText[] };
        const url = data.type === "external" ? data.external?.url : data.file?.url;
        if (url) {
          out.push(
            <figure key={block.id} style={{ margin: "0 0 22px" }}>
              {/* Notion file URLs are signed & expire, so keep them unoptimized */}
              <Image src={url} alt={data.caption?.map((c) => c.plain_text).join("") || ""} width={1200} height={700} unoptimized style={{ width: "100%", height: "auto", borderRadius: 16 }} />
              {data.caption && data.caption.length > 0 && (
                <figcaption style={{ fontSize: 13, color: "#6B5A50", marginTop: 8, textAlign: "center" }}>
                  <Rich rich={data.caption} />
                </figcaption>
              )}
            </figure>,
          );
        }
        break;
      }
      default:
        // Unsupported block types (tables, embeds, …) are skipped silently.
        break;
    }
  }
  flushList();

  return <>{out}</>;
}
