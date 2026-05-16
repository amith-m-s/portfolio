import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amithms.dev"),
  title: { default: "Amith M S — Backend Engineer & AI Systems", template: "%s · Amith M S" },
  description: "Backend-focused engineer building AI-powered platforms, scalable infrastructure, and production systems. Specializing in NLP pipelines, distributed architecture, and blockchain.",
  keywords: ["backend engineer","AI systems","NLP","FastAPI","Node.js","Docker","Sui Move","React","PostgreSQL","software engineer Kerala"],
  authors: [{ name: "Amith M S", url: "https://github.com/amith-m-s" }],
  openGraph: {
    type: "website", url: "https://amithms.dev",
    title: "Amith M S — Backend Engineer & AI Systems",
    description: "Building production-grade backend architectures, intelligent systems, and high-performance platforms.",
    siteName: "Amith M S",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amith M S — Backend Engineer",
    description: "Backend + AI infrastructure engineer. Systems that survive production.",
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
