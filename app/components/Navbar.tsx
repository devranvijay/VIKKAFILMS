"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LEFT_LINKS = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
];

const MENU_LINKS = [
  { label: "About", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Stagger menu link entrance
  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Transparent bar ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "clamp(20px, 3vw, 36px) clamp(28px, 5vw, 64px)",
        }}
      >
        {/* Left links */}
        <div style={{ display: "flex", gap: "clamp(20px, 3vw, 44px)", alignItems: "center" }}>
          {LEFT_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Center: logo */}
        <Link href="/" aria-label="VikaFilms — Home" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "52px", height: "52px" }}>
            <Image
              src="/vikafilms-logo.png"
              alt="VikaFilms"
              fill
              sizes="52px"
              priority
              style={{ objectFit: "contain", mixBlendMode: "screen" }}
            />
          </div>
        </Link>

        {/* Right: hamburger */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <span style={{ display: "block", width: "24px", height: "1.5px", background: "#fff", transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: "18px", height: "1.5px", background: "#fff", transition: "opacity 0.2s" }} />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay menu ────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            background: "#000",
            display: "flex",
            flexDirection: "column",
            padding: "clamp(28px, 4vw, 52px) clamp(32px, 5vw, 64px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo top-center */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(40px, 7vh, 72px)" }}>
            <div style={{ position: "relative", width: "56px", height: "56px" }}>
              <Image
                src="/vikafilms-logo.png"
                alt="VikaFilms"
                fill
                sizes="56px"
                style={{ objectFit: "contain", mixBlendMode: "screen" }}
              />
            </div>
          </div>

          {/* Nav links */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(4px, 1.5vh, 12px)" }}>
            {MENU_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(40px, 6.5vw, 88px)",
                  fontWeight: 700,
                  color: "#fff",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  display: "block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-32px)",
                  transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${0.06 + i * 0.07}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.06 + i * 0.07}s, color 0.2s`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA bottom */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1.5px solid rgba(255,255,255,0.5)",
              borderRadius: "9999px",
              padding: "12px 30px",
              fontFamily: "var(--font-geist), monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.38s, transform 0.5s ease 0.38s, background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
            }}
          >
            Let&apos;s Create ↗
          </Link>
        </div>

        {/* Right panel: cinematic image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC01346-Enhanced-NR_lf6bof"
            alt="VikaFilms — BMW Z4 commercial"
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
              transform: visible ? "scale(1)" : "scale(1.06)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "clamp(20px, 3vw, 36px)",
            right: "clamp(28px, 5vw, 64px)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontSize: "22px",
            lineHeight: 1,
            fontWeight: 300,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.4s ease 0.2s",
            zIndex: 10,
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .nav-hidden { transform: translateY(-100%) !important; }
      `}</style>
    </>
  );
}
