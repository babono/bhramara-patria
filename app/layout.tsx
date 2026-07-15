import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WelcomeGate from "@/components/WelcomeGate";

// Display face — Dream Orphans (titles, headings)
const dreamOrphans = localFont({
  variable: "--font-display-face",
  display: "swap",
  src: [
    { path: "../public/fonts/Dream Orphans.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Dream Orphans It.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/Dream Orphans Bd.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Dream Orphans Bd It.otf", weight: "700", style: "italic" },
  ],
});

// Body face — Futura (content text)
const futura = localFont({
  variable: "--font-body-face",
  display: "swap",
  src: [
    { path: "../public/fonts/Futura Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Futura Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Bhramara Patria · Angkatan PK-236",
    template: "%s · Bhramara Patria PK-236",
  },
  description:
    "Lentera Harapan, Menyinari Jalan Pengabdian. Situs angkatan PK-236 LPDP Bhramara Patria — direktori awardee, blog, dan tools untuk keluarga angkatan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${dreamOrphans.variable} ${futura.variable}`}>
      <body>
        <WelcomeGate />
        {children}
      </body>
    </html>
  );
}
