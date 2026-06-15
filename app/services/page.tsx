"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Cloudinary URL helper (inline, no import needed) ─────────────────────────
const CLD = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto`;
const img = (id: string) => `${CLD}/${id}`;

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    label: "Photography",
    title: "Still Work",
    tagline: "Every frame, a statement.",
    description:
      "Commercial campaigns, automotive stills, product photography, editorial portraits, and brand identity — captured on full-frame sensors with cinema glass.",
    features: [
      "Automotive & Commercial",
      "Brand & Product Stills",
      "Corporate & Editorial",
    ],
    cta: "Book a Shoot",
    src: img("DSC01488_qx6a1n"),
    accent: "rgba(200,184,154,0.18)",
    accentLine: "#c8b89a",
  },
  {
    num: "02",
    label: "Cinematography",
    title: "Film Work",
    tagline: "Motion with intention.",
    description:
      "Narrative brand films, product cinematics, wedding films, and documentary storytelling — colour graded and delivered in 4K with cinema lenses.",
    features: [
      "Brand & Product Films",
      "Wedding Cinematics",
      "Colour Graded Delivery",
    ],
    cta: "Commission a Film",
    src: img("DSC09380_aonznj"),
    accent: "rgba(160,180,200,0.18)",
    accentLine: "#a0b4c8",
  },
  {
    num: "03",
    label: "Video",
    title: "Reels & Social",
    tagline: "Built for every screen.",
    description:
      "Social reels, product demos, testimonials, event highlights, and platform-optimised content — from Instagram to broadcast, we cut for attention.",
    features: [
      "Social Media Reels",
      "Product Demo & Testimonial",
      "Event & Live Coverage",
    ],
    cta: "Start a Project",
    src: img("DSC01456_ygk3gp"),
    accent: "rgba(160,180,140,0.14)",
    accentLine: "#a8b898",
  },
];

// ─── Process steps ─────────────────────────────────────────────────────────────
const PROCESS = [
  {
    num: "01",
    title: "Discovery & Brief",
    body: "We start by understanding your brand, audience, and objectives. Every project begins with a detailed creative brief — no assumptions, no guesswork.",
  },
  {
    num: "02",
    title: "Production Day",
    body: "Full-frame cameras, cinema glass, professional lighting, and a focused crew. We execute with precision — on location or in studio, always on time.",
  },
  {
    num: "03",
    title: "Edit & Delivery",
    body: "DaVinci Resolve colour grading, sound design, and motion graphics. Files delivered optimised for every platform, every format, every deadline.",
  },
];

// ─── ServiceCard component ─────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="cinema-reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "3/4",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "scale(1.018)" : "scale(1)",
        transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "100%",
          background: `linear-gradient(to bottom, transparent 0%, ${service.accentLine}44 40%, transparent 100%)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Background image */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0f0f11",
            borderRadius: "20px",
          }}
        />
      )}
      <Image
        src={service.src}
        alt={service.title}
        fill
        sizes="(max-width:768px) 90vw, 33vw"
        style={{
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1), opacity 0.6s ease",
        }}
        onLoad={() => setLoaded(true)}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.28) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 42%, rgba(0,0,0,0.18) 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Ambient radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: service.accent,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.6s ease",
          mixBlendMode: "screen",
        }}
      />

      {/* Top: number + label */}
      <div
        style={{
          position: "absolute",
          top: "clamp(20px, 2.5vw, 32px)",
          left: "clamp(20px, 2.5vw, 32px)",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: service.accentLine,
            opacity: 0.8,
          }}
        >
          {service.num}
        </span>
        <span
          style={{
            width: "20px",
            height: "1px",
            background: `${service.accentLine}66`,
            display: "block",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {service.label}
        </span>
      </div>

      {/* Bottom: content */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(22px, 2.8vw, 36px)",
          left: "clamp(20px, 2.5vw, 32px)",
          right: "clamp(20px, 2.5vw, 32px)",
          zIndex: 4,
        }}
      >
        {/* Tagline — always visible */}
        <div
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "10px",
            opacity: hovered ? 0 : 1,
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "all 0.3s ease",
          }}
        >
          {service.tagline}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(30px, 3.5vw, 52px)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#fff",
            marginBottom: hovered ? "18px" : "0",
            transition: "margin 0.45s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {service.title}
        </h3>

        {/* Description — hover reveal */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? "200px" : "0",
            opacity: hovered ? 1 : 0,
            transition:
              "max-height 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease 0.1s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "clamp(12px, 1.1vw, 14px)",
              lineHeight: 1.72,
              color: "rgba(196,199,200,0.58)",
              marginBottom: "16px",
            }}
          >
            {service.description}
          </p>

          <ul style={{ marginBottom: "20px", listStyle: "none", padding: 0 }}>
            {service.features.map((f) => (
              <li
                key={f}
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "8.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "1px",
                    background: `${service.accentLine}88`,
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              borderBottom: `1px solid ${service.accentLine}66`,
              paddingBottom: "3px",
              transition: "border-color 0.2s",
            }}
          >
            {service.cta}
            <span style={{ fontSize: "12px" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".cinema-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#060606",
        color: "#e2e2e2",
        overflowX: "hidden",
      }}
    >
      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 8vw clamp(60px, 9vh, 110px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Film grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />

        {/* VF watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-1vw",
            transform: `translateY(calc(-50% + ${scrollY * 0.04}px))`,
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(180px, 32vw, 480px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.016)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          VF
        </div>

        {/* Top-right year tag */}
        <div
          style={{
            position: "absolute",
            top: "clamp(100px, 14vw, 140px)",
            right: "8vw",
            textAlign: "right",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.7s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            2026 · Studio Services
          </span>
        </div>

        {/* Overline */}
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "10px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            display: "block",
            marginBottom: "28px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(18px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          What We Do
        </span>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(48px, 8vw, 120px)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "clamp(28px, 4vw, 52px)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 1.3s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          Full-Service
          <br />
          Visual{" "}
          <em style={{ fontStyle: "italic", color: "rgba(226,226,226,0.32)" }}>
            Production.
          </em>
        </h1>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.55s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "clamp(13px, 1.4vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(196,199,200,0.42)",
              maxWidth: "380px",
              margin: 0,
            }}
          >
            From a single product shot to a complete cinematic brand film — everything your brand needs, under one roof.
          </p>

          {/* Scroll cue */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Scroll to explore
            </span>
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "linear-gradient(to right, rgba(255,255,255,0.35), transparent)",
                animation: "svcScrollCue 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══ SERVICES CARDS ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 130px) 8vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "#080808",
        }}
      >
        {/* Header */}
        <div
          className="cinema-reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(28px, 3.5vw, 44px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Three Disciplines
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(34px, 5vw, 68px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: 0,
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.28)" }}>
                Services.
              </em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "clamp(13px, 1.3vw, 16px)",
              lineHeight: 1.72,
              color: "rgba(196,199,200,0.38)",
              maxWidth: "320px",
              margin: 0,
              textAlign: "right",
            }}
          >
            Hover any service to explore what&apos;s included.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(10px, 1.5vw, 18px)",
          }}
          className="services-grid"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 130px) 8vw",
          backgroundColor: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Header */}
        <div
          className="cinema-reveal"
          style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              display: "block",
              marginBottom: "14px",
            }}
          >
            How We Work
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(34px, 5vw, 68px)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: 0,
            }}
          >
            The{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.28)" }}>
              Process.
            </em>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PROCESS.map((step, i) => (
            <div
              key={step.num}
              className="cinema-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(32px, 5vw, 80px)",
                alignItems: "center",
                padding: "clamp(40px, 5vw, 64px) 0",
                borderBottom:
                  i < PROCESS.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Left: number + title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(24px, 3vw, 48px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(72px, 10vw, 140px)",
                    fontWeight: 700,
                    lineHeight: 0.85,
                    color: "rgba(255,255,255,0.04)",
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </span>
                <div style={{ paddingTop: "clamp(10px, 1.5vw, 18px)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist), monospace",
                      fontSize: "8px",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.18)",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    Step {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(24px, 2.8vw, 38px)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Right: description */}
              <p
                style={{
                  fontFamily: "var(--font-hanken), sans-serif",
                  fontSize: "clamp(14px, 1.4vw, 17px)",
                  lineHeight: 1.75,
                  color: "rgba(196,199,200,0.48)",
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ IMAGE SHOWCASE ════════════════════════════════════════════════════ */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
        className="showcase-grid"
      >
        {/* Large: BMW */}
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={img("DSC01346-Enhanced-NR_lf6bof")}
            alt="BMW Z4 commercial shoot"
            fill
            sizes="(max-width:768px) 100vw, 66vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "clamp(20px, 3vw, 36px)", left: "clamp(20px, 3vw, 36px)" }}>
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "8px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Commercial · Automotive · 2026
            </span>
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(20px, 2.5vw, 34px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              BMW Z4
            </span>
          </div>
        </div>

        {/* Small: DJI */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={img("DSC09376_lygk5q")}
            alt="DJI Gimbal product shoot"
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "clamp(20px, 3vw, 36px)", left: "clamp(20px, 3vw, 36px)" }}>
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "8px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Commercial · Product · 2026
            </span>
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(20px, 2.5vw, 34px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              DJI Gimbal
            </span>
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES STRIP ════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#070707",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "clamp(48px, 6vw, 80px) 8vw",
        }}
      >
        <div
          className="cinema-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
            gap: "clamp(32px, 4vw, 56px)",
            textAlign: "center",
          }}
        >
          {[
            { value: "8K", label: "Full-Frame Sensors" },
            { value: "4K", label: "Cinema Glass" },
            { value: "DaVinci", label: "Colour Grading" },
            { value: "Arri", label: "Lighting Arrays" },
          ].map((c, i) => (
            <div key={c.label} style={{ transitionDelay: `${i * 70}ms` }}>
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.3) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "10px",
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "8.5px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(196,199,200,0.28)",
                }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 140px) 8vw",
          textAlign: "center",
          backgroundColor: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="cinema-reveal">
          <p
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(196,199,200,0.28)",
              marginBottom: "20px",
            }}
          >
            Ready to start?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(34px, 5vw, 70px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "clamp(32px, 4vw, 52px)",
            }}
          >
            Let&apos;s create your
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.32)" }}>
              next visual story.
            </em>
          </h2>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0a0a",
                padding: "14px 44px",
                borderRadius: "9999px",
                fontFamily: "var(--font-geist), monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 32px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Book A Shoot
            </Link>
            <Link
              href="/portfolio"
              style={{
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.55)",
                padding: "14px 44px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.14)",
                fontFamily: "var(--font-geist), monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.55)";
              }}
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Page-scoped CSS ── */}
      <style>{`
        @keyframes svcScrollCue {
          0%, 100% { width: 48px; opacity: 0.6; }
          50%       { width: 72px; opacity: 1; }
        }
        .cinema-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .cinema-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .showcase-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
