import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WelcomeGate from "@/components/WelcomeGate";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
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
    <html lang="id" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>
        <WelcomeGate />
        {children}
      </body>
    </html>
  );
}
