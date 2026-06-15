"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/portfolio" },
  { label: "Studio", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      const current = window.scrollY;

      // Compact on scroll
      if (current > 80) {
        nav.style.paddingTop = "6px";
        nav.style.paddingBottom = "6px";
        nav.style.marginTop = "12px";
        nav.style.backdropFilter = "blur(40px) saturate(200%)";
      } else {
        nav.style.paddingTop = "10px";
        nav.style.paddingBottom = "10px";
        nav.style.marginTop = "20px";
        nav.style.backdropFilter = "blur(20px) saturate(150%)";
      }

      // Hide on scroll down, reveal on scroll up
      if (current > lastScrollY.current + 6 && current > 120) {
        nav.classList.add("nav-hidden");
      } else if (current < lastScrollY.current - 6) {
        nav.classList.remove("nav-hidden");
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(19,19,19,0.4)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "9999px",
          padding: "10px 28px",
          marginTop: "20px",
          width: "90%",
          maxWidth: "80rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
          transition: "padding 0.3s ease, margin 0.3s ease, backdrop-filter 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
          aria-label="VikaFilms — Home"
        >
          <div
            style={{
              position: "relative",
              width: "52px",
              height: "52px",
              flexShrink: 0,
            }}
          >
            <Image
              src="/vikafilms-logo.png"
              alt="VikaFilms"
              fill
              sizes="52px"
              priority
              style={{
                objectFit: "contain",
                /* Makes the solid-black logo background invisible against
                   the dark navbar — only the gold ring + script remain. */
                mixBlendMode: "screen",
              }}
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: isActive ? "#ffffff" : "#8e9192",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  borderBottom: isActive ? "1px solid #ffffff" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive ? "#ffffff" : "#8e9192")
                }
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Mobile hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            style={{
              backgroundColor: "#ffffff",
              color: "#131313",
              padding: "8px 24px",
              borderRadius: "9999px",
              fontFamily: "var(--font-geist), monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Inquire
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s, opacity 0.2s",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(4px, 4px)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            left: "5%",
            right: "5%",
            zIndex: 99,
            background: "rgba(14,14,14,0.97)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: pathname === href ? "#ffffff" : "#8e9192",
                fontFamily: "var(--font-geist), monospace",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "8px",
              backgroundColor: "#ffffff",
              color: "#131313",
              padding: "12px 24px",
              borderRadius: "9999px",
              fontFamily: "var(--font-geist), monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Inquire
          </Link>
        </div>
      )}
    </>
  );
}
