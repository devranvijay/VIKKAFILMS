"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LEFT_LINKS = [
  { label: "Work",     href: "/portfolio" },
  { label: "Services", href: "/services"  },
];

const MENU_LINKS = [
  { label: "About",    href: "/"          },
  { label: "Work",     href: "/portfolio" },
  { label: "Services", href: "/services"  },
  { label: "Contact",  href: "/contact"   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible,  setVisible]  = useState(false);

  // Stagger link entrance after overlay fades in
  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [menuOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Transparent bar ──────────────────────────────────────── */}
      <nav className="vf-nav">
        {/* Left links — hidden below 768 px */}
        <div className="vf-nav-left">
          {LEFT_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="vf-nav-link">
              {label}
            </Link>
          ))}
        </div>

        {/* Centre logo */}
        <Link href="/" aria-label="VikaFilms — Home" className="vf-logo-wrap">
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

        {/* Right: hamburger that morphs to × */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="vf-ham"
          >
            <span className={`vf-ham-top${menuOpen ? " is-open" : ""}`} />
            <span className={`vf-ham-bot${menuOpen ? " is-open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ──────────────────────────────────── */}
      <div className={`vf-overlay${menuOpen ? " is-open" : ""}`}>

        {/* Left / main panel */}
        <div className="vf-overlay-left">
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(36px, 7vh, 68px)" }}>
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

          {/* Nav links with staggered entrance */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(2px, 1vh, 10px)" }}>
            {MENU_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="vf-ol-link"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateX(0)" : "translateX(-28px)",
                  transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${.05 + i * .07}s,
                               transform .55s cubic-bezier(.16,1,.3,1) ${.05 + i * .07}s,
                               color .2s`,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA pill */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="vf-ol-cta"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .5s ease .36s, transform .5s ease .36s",
            }}
          >
            Let&apos;s Create ↗
          </Link>
        </div>

        {/* Right panel: cinematic image — hidden on mobile */}
        <div className="vf-overlay-right">
          <Image
            src="https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC01346-Enhanced-NR_lf6bof"
            alt="VikaFilms cinematic frame"
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
              transform:  visible ? "scale(1)"    : "scale(1.06)",
              transition: "transform .8s cubic-bezier(.16,1,.3,1) .1s",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.18)" }} />
        </div>

        {/* Close × */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="vf-ol-close"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity .4s ease .22s, color .2s",
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────── */}
      <style>{`
        /* Nav bar */
        .vf-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: clamp(18px,3vw,36px) clamp(20px,5vw,64px);
        }
        .vf-logo-wrap { display: flex; justify-content: center; }

        /* Desktop left links */
        .vf-nav-left {
          display: flex;
          gap: clamp(20px, 3vw, 44px);
          align-items: center;
        }
        .vf-nav-link {
          font-family: var(--font-geist), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,.65);
          text-decoration: none;
          transition: color .2s;
        }
        .vf-nav-link:hover { color: #fff; }

        /* Hide left links on small screens — visibility keeps grid slot so logo stays centred */
        @media (max-width: 768px) {
          .vf-nav-left { visibility: hidden; pointer-events: none; }
        }

        /* ── Hamburger icon ── */
        .vf-ham {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 300;         /* always above overlay */
          position: relative;
        }
        .vf-ham-top,
        .vf-ham-bot {
          display: block;
          height: 1.5px;
          background: #fff;
          transform-origin: center;
          transition:
            width   .38s cubic-bezier(.16,1,.3,1),
            transform .38s cubic-bezier(.16,1,.3,1),
            opacity .22s;
        }
        .vf-ham-top          { width: 24px; }
        .vf-ham-bot          { width: 16px; }
        /* morphed → × */
        .vf-ham-top.is-open  { width: 24px; transform: translateY(3.75px)  rotate(45deg);  }
        .vf-ham-bot.is-open  { width: 24px; transform: translateY(-3.75px) rotate(-45deg); }

        /* ── Overlay ── */
        .vf-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          grid-template-columns: 1fr 1fr;
          opacity: 0;
          pointer-events: none;
          transition: opacity .42s cubic-bezier(.16,1,.3,1);
        }
        .vf-overlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .vf-overlay-left {
          background: #000;
          display: flex;
          flex-direction: column;
          padding: clamp(28px,4vw,52px) clamp(28px,5vw,64px);
          position: relative;
          overflow: hidden;
        }
        .vf-overlay-right {
          position: relative;
          overflow: hidden;
        }

        .vf-ol-link {
          font-family: var(--font-geist), system-ui, sans-serif;
          font-size: clamp(38px, 6.5vw, 88px);
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          line-height: 1.05;
          display: block;
        }
        .vf-ol-link:hover { color: rgba(255,255,255,.42); }

        .vf-ol-cta {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid rgba(255,255,255,.5);
          border-radius: 9999px;
          padding: 12px 30px;
          font-family: var(--font-geist), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .vf-ol-cta:hover {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.8);
        }

        .vf-ol-close {
          position: absolute;
          top: clamp(18px,3vw,36px);
          right: clamp(20px,5vw,64px);
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 22px;
          line-height: 1;
          font-weight: 300;
          z-index: 10;
        }
        .vf-ol-close:hover { color: rgba(255,255,255,.55); }

        /* ── Mobile: full-width overlay, no image panel ── */
        @media (max-width: 768px) {
          .vf-overlay {
            grid-template-columns: 1fr;
          }
          .vf-overlay-right {
            display: none;
          }
          .vf-ol-link {
            font-size: clamp(36px, 11vw, 54px);
          }
          .vf-ol-close {
            right: clamp(16px, 5vw, 28px);
          }
        }
      `}</style>
    </>
  );
}
