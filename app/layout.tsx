import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-beryl-five-zezv4gffmv.vercel.app"),
  title: { default: "Amith M S — Backend Engineer & AI Systems", template: "%s · Amith M S" },
  description: "Backend engineer building APIs, NLP systems, cloud reference architectures, and reliability-focused software.",
  keywords: ["backend engineer","AI systems","NLP","FastAPI","Node.js","Docker","Sui Move","React","PostgreSQL","software engineer Kerala"],
  authors: [{ name: "Amith M S", url: "https://github.com/amith-m-s" }],
  openGraph: {
    type: "website", url: "https://portfolio-beryl-five-zezv4gffmv.vercel.app/",
    title: "Amith M S — Backend Engineer & AI Systems",
    description: "Backend engineering, AI/NLP systems, cloud architecture, and reliability-focused projects.",
    siteName: "Amith M S",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amith M S — Backend Engineer",
    description: "Backend engineering, AI/NLP systems, cloud architecture, and reliability.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
