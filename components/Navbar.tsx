"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Philosophy", href: "#philosophy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 200,
        height: 2, background: "var(--acc)",
        width: progress + "%", transition: "width .1s linear",
      }} />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "10px 40px" : "22px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(7,9,11,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all .35s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg,var(--acc) 0%,var(--accv) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--fm)", fontSize: 13, fontWeight: 700, color: "#fff",
          }}>A</div>
          <div>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12.5, color: "var(--txt)", letterSpacing: ".04em", lineHeight: 1 }}>amith_ms</div>
            <div style={{ fontFamily: "var(--fm)", fontSize: 9.5, color: "var(--txt3)", letterSpacing: ".06em", lineHeight: 1, marginTop: 2 }}>backend · ai · systems</div>
          </div>
        </Link>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV.map((n) => (
            <a key={n.label} href={n.href} style={{
              padding: "6px 14px", fontFamily: "var(--fm)", fontSize: 11.5,
              color: "var(--txt2)", textDecoration: "none", letterSpacing: ".05em",
              borderRadius: 6, transition: "all .18s ease",
            }}>
              {n.label}
            </a>
          ))}
          <a href="mailto:amith6567@gmail.com" style={{
            marginLeft: 14, padding: "7px 18px",
            background: "rgba(91,156,246,0.1)",
            border: "1px solid rgba(91,156,246,0.24)",
            borderRadius: 7, fontFamily: "var(--fm)", fontSize: 11.5,
            color: "var(--acc)", textDecoration: "none", letterSpacing: ".05em",
          }}>Hire me</a>
        </div>

        <button
          className="mobile-menu-btn"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setMobileOpen(false)}>{n.label}</a>
          ))}
          <a href="mailto:amith6567@gmail.com" onClick={() => setMobileOpen(false)}>Contact</a>
        </div>
      )}
    </>
  );
}
