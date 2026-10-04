import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-beryl-five-zezv4gffmv.vercel.app"),
  title: { default: "Amith M S — Backend Engineer & AI Systems", template: "%s · Amith M S" },
  description: "Backend engineer building APIs, NLP systems, cloud reference architectures, and reliability-focused software."
  keywords: ["backend engineer","AI systems","NLP","FastAPI","Node.js","Docker","Sui Move","React","PostgreSQL","software engineer Kerala"],
  authors: [{ name: "Amith M S", url: "https://github.com/amith-m-s" }],
  openGraph: {
    type: "website", url: "https://amithms.dev",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
