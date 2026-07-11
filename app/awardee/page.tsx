import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AwardeeDirectory from "@/components/AwardeeDirectory";
import { getAwardees } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Awardee",
  description: "Direktori awardee PK-236 Bhramara Patria — telusuri berdasarkan nama, kampus, jenjang, hingga kelompok angkatan.",
};

export default async function AwardeePage() {
  const awardees = await getAwardees();

  const hero = (
    <>
      <div className="batik" />
      <SiteHeader active="/awardee" />
      <div className="shell" style={{ position: "relative", paddingTop: 40 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 30, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".2em", color: "#E9A93C", marginBottom: 14 }}>DIREKTORI AWARDEE</div>
            <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(34px, 4.5vw, 50px)", lineHeight: 1.04, letterSpacing: "-.015em", color: "#FBEFD8", margin: "0 0 14px" }}>
              Kenali 316 Bhramara
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "rgba(251,239,216,.8)", maxWidth: 540, margin: 0 }}>
              Pencari ilmu dari seluruh penjuru dunia. Telusuri berdasarkan nama, kampus, jenjang, hingga kelompok angkatan.
            </p>
          </div>
          <Image src="/assets/ara-fly.png" alt="" width={738} height={687} style={{ height: 130, width: "auto", filter: "drop-shadow(0 14px 22px rgba(40,15,18,.34))", flex: "none" }} />
        </div>
      </div>
    </>
  );

  return (
    <div style={{ background: "#FBF5EA", color: "#2A211E", minHeight: "100vh" }}>
      <AwardeeDirectory awardees={awardees} hero={hero} />
      <SiteFooter />
    </div>
  );
}
