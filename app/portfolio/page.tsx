"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PROJECTS,
  CATEGORIES,
  REELS,
  type Category,
  type Reel,
} from "../data/portfolio";

// ─── Types ────────────────────────────────────────────────────────────────────
type Filter = "All" | Category;
const FILTER_TABS: Filter[] = ["All", ...CATEGORIES];

interface CinemaProject {
  id: number;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  description: string;
  src: string;
  accentColor: string;
  tags: string[];
}

// ─── Featured project data (richer metadata for scenes + modal) ───────────────
const CINEMA_PROJECTS: CinemaProject[] = [
  {
    id: 1,
    num: "01",
    category: "Automotive · Commercial",
    title: "BMW Series",
    subtitle: "The Art of Motion",
    year: "2024",
    client: "BMW India",
    description:
      "A cinematic exploration of speed, precision, and engineering excellence. Shot on full-frame 8K sensors with anamorphic glass to capture the raw soul of the machine in every frame.",
    src: "/portfolio/commercial/BMW-01.jpg",
    accentColor: "#c8b89a",
    tags: ["8K Full-Frame", "Anamorphic Glass", "Studio Lighting"],
  },
  {
    id: 2,
    num: "02",
    category: "Healthcare · Brand",
    title: "Dental Studio",
    subtitle: "Clinical Elegance",
    year: "2024",
    client: "Dental Studio Clinic",
    description:
      "Where clinical precision meets visual storytelling. A comprehensive brand identity campaign that transforms a modern healthcare space into an architectural and human narrative.",
    src: "/portfolio/commercial/DentalChair-01.jpeg",
    accentColor: "#7eb8c9",
    tags: ["Brand Identity", "Architecture", "Healthcare"],
  },
];

// ─── HScrollCard ─────────────────────────────────────────────────────────────
function HScrollCard({
  reel,
  onSelect,
  onHoverChange,
}: {
  reel: Reel;
  onSelect: () => void;
  onHoverChange: (h: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    onHoverChange(true);
  };
  const leave = () => {
    setHovered(false);
    onHoverChange(false);
  };

  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(240px, 22vw, 360px)",
        height: "clamp(320px, 40vh, 500px)",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        cursor: "none",
        transform: hovered ? "scale(1.025)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onSelect}
    >
      <Image
        src={reel.thumbnail}
        alt={reel.title}
        fill
        sizes="(max-width:768px) 80vw, 22vw"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Base scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
          transition: "opacity 0.35s",
          opacity: hovered ? 1 : 0.7,
        }}
      />

      {/* Hover glow border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.18)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s",
          pointerEvents: "none",
          boxShadow: "inset 0 0 40px rgba(255,255,255,0.04)",
        }}
      />

      {/* Play button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.75})`,
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="#fff"
          style={{ marginLeft: "2px" }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Duration badge */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          fontFamily: "var(--font-geist), monospace",
          fontSize: "9px",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.45)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "4px 10px",
          borderRadius: "9999px",
        }}
      >
        {reel.duration}
      </div>

      {/* Info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "22px",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "6px",
          }}
        >
          {reel.category}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(15px, 1.8vw, 20px)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {reel.title}
        </span>
      </div>
    </div>
  );
}

// ─── ProjectModal ─────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: CinemaProject;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "#050505",
        overflowY: "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.03)",
        transition:
          "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Back button */}
      <button
        onClick={close}
        style={{
          position: "fixed",
          top: "28px",
          left: "5vw",
          zIndex: 10,
          backgroundColor: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "9999px",
          padding: "10px 22px",
          color: "#c4c7c8",
          fontFamily: "var(--font-geist), monospace",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.35)";
          (e.currentTarget as HTMLElement).style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLElement).style.color = "#c4c7c8";
        }}
      >
        ← Back to Work
      </button>

      {/* Hero image */}
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <Image
          src={project.src}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
          }}
        />

        {/* Title */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(56px, 8vh, 100px)",
            left: "8vw",
            right: "8vw",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "10px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: project.accentColor,
              display: "block",
              marginBottom: "18px",
              opacity: 0.9,
            }}
          >
            {project.category} · {project.year}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(48px, 7.5vw, 108px)",
              fontWeight: 700,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
              color: "#fff",
            }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Story + metadata */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          padding: "clamp(56px, 7vw, 110px) 8vw",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
          className="modal-story-grid"
        >
          {/* Left: narrative */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                display: "block",
                marginBottom: "22px",
              }}
            >
              The Story
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(24px, 2.8vw, 38px)",
                fontWeight: 500,
                lineHeight: 1.25,
                color: "#fff",
                marginBottom: "20px",
              }}
            >
              {project.subtitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-hanken), sans-serif",
                fontSize: "clamp(14px, 1.4vw, 17px)",
                lineHeight: 1.85,
                color: "rgba(196,199,200,0.6)",
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "9999px",
                    padding: "5px 14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: metadata */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              paddingTop: "8px",
            }}
          >
            {[
              { label: "Client", value: project.client },
              { label: "Category", value: project.category },
              { label: "Year", value: project.year },
              { label: "Format", value: "Full-Frame 8K · Anamorphic Glass" },
              { label: "Delivery", value: "RAW + Colour Graded" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "8px",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-hanken), sans-serif",
                    fontSize: "15px",
                    color: "#c4c7c8",
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          padding: "0 5vw clamp(56px, 7vw, 100px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
          className="modal-gallery-grid"
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              gridColumn: "span 2",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              sizes="65vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "relative",
              gridRow: "span 2",
              borderRadius: "8px",
              overflow: "hidden",
              minHeight: "300px",
            }}
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              sizes="35vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              sizes="35vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Results strip */}
      <div
        style={{
          backgroundColor: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(56px, 7vw, 100px) 8vw",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "48px",
            textAlign: "center",
          }}
        >
          {[
            { value: "8K", label: "Resolution" },
            { value: "16+", label: "Dynamic Range (Stops)" },
            { value: "RAW", label: "File Format" },
            { value: "48h", label: "First Delivery" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(36px, 4.5vw, 60px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  background:
                    "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "10px",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA inside modal */}
      <div
        style={{
          backgroundColor: "#050505",
          padding: "clamp(56px, 7vw, 100px) 8vw",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "20px",
          }}
        >
          Inspired?
        </p>
        <h3
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          Let&apos;s create your
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>
            next visual story.
          </em>
        </h3>
        <Link
          href="/contact"
          onClick={close}
          style={{
            backgroundColor: "#ffffff",
            color: "#131313",
            padding: "14px 40px",
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
            (e.currentTarget as HTMLAnchorElement).style.transform =
              "scale(1.05)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 28px rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Book A Shoot
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] =
    useState<CinemaProject | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorExpanded, setCursorExpanded] = useState(false);

  const hScrollSectionRef = useRef<HTMLDivElement>(null);
  const hScrollTrackRef = useRef<HTMLDivElement>(null);

  // ── Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // ── Scroll listener
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Horizontal scroll section height
  useEffect(() => {
    const section = hScrollSectionRef.current;
    const track = hScrollTrackRef.current;
    if (!section || !track) return;

    const recalc = () => {
      const extra = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + extra}px`;
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // ── Drive horizontal scroll from vertical scroll
  useEffect(() => {
    const section = hScrollSectionRef.current;
    const track = hScrollTrackRef.current;
    if (!section || !track) return;

    const sectionTop = section.offsetTop;
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;
    const scrollable = sectionH - viewH;
    if (scrollable <= 0) return;

    if (scrollY >= sectionTop && scrollY <= sectionTop + scrollable) {
      const progress = (scrollY - sectionTop) / scrollable;
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-maxX * progress}px)`;
    }
  }, [scrollY]);

  // ── Scroll reveal observer
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
  }, [activeFilter]);

  // ── Body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Custom cursor ───────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: cursorPos.y,
          left: cursorPos.x,
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          width: cursorExpanded ? "60px" : "7px",
          height: cursorExpanded ? "60px" : "7px",
          borderRadius: "50%",
          backgroundColor: cursorExpanded
            ? "rgba(255,255,255,0.09)"
            : "#ffffff",
          border: cursorExpanded
            ? "1px solid rgba(255,255,255,0.25)"
            : "none",
          backdropFilter: cursorExpanded ? "blur(10px)" : "none",
          transition:
            "width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cursorExpanded && (
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "7px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}
          >
            View
          </span>
        )}
      </div>

      {/* ── Project Modal ────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div
        style={{
          backgroundColor: "#0a0a0a",
          color: "#e2e2e2",
          overflowX: "hidden",
        }}
      >
        {/* ══ HERO ══════════════════════════════════════════════════════ */}
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
              opacity: 0.045,
              backgroundImage:
                "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          />

          {/* Giant watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-1vw",
              transform: `translateY(calc(-50% + ${scrollY * 0.04}px))`,
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(180px, 32vw, 480px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.018)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            VF
          </div>

          {/* Top-right meta */}
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
              2024 · Studio Collection
            </span>
          </div>

          {/* "Our Work" label */}
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
            Our Work
          </span>

          {/* Hero headline */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(50px, 8.5vw, 124px)",
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
            We don&apos;t
            <br />
            capture moments.
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(226,226,226,0.38)",
              }}
            >
              We create
              <br />
              visual stories.
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
                maxWidth: "360px",
                margin: 0,
              }}
            >
              Premium commercial photography and cinematics for brands that
              refuse to be ignored.
            </p>

            {/* Scroll cue */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexShrink: 0,
              }}
            >
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
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.35), transparent)",
                  animation: "filmScrollCue 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* ══ FEATURED SCENES ══════════════════════════════════════════ */}
        {CINEMA_PROJECTS.map((project, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={project.id}
              style={{
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                cursor: "none",
              }}
              onMouseEnter={() => setCursorExpanded(true)}
              onMouseLeave={() => setCursorExpanded(false)}
              onClick={() => setSelectedProject(project)}
            >
              {/* Parallax image */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12%",
                  transform: `translateY(${scrollY * 0.04}px)`,
                  willChange: "transform",
                }}
              >
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Directional gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isEven
                    ? "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)"
                    : "linear-gradient(to left, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                }}
              />

              {/* Scene counter */}
              <div
                style={{
                  position: "absolute",
                  top: "clamp(80px, 10vh, 120px)",
                  [isEven ? "left" : "right"]: "8vw",
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                {project.num} / {String(CINEMA_PROJECTS.length).padStart(2, "0")}
              </div>

              {/* Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  [isEven ? "left" : "right"]: 0,
                  width: "1px",
                  height: "100%",
                  background: `linear-gradient(to bottom, transparent 0%, ${project.accentColor}33 40%, ${project.accentColor}22 60%, transparent 100%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Project info */}
              <div
                className="cinema-reveal"
                style={{
                  position: "absolute",
                  bottom: "clamp(48px, 7vh, 100px)",
                  [isEven ? "left" : "right"]: "8vw",
                  maxWidth: "clamp(300px, 42vw, 560px)",
                  textAlign: isEven ? "left" : "right",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: project.accentColor,
                    opacity: 0.85,
                    display: "block",
                    marginBottom: "14px",
                  }}
                >
                  {project.category} · {project.year}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(38px, 5.5vw, 78px)",
                    fontWeight: 700,
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    marginBottom: "14px",
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-hanken), sans-serif",
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    color: "rgba(196,199,200,0.58)",
                    lineHeight: 1.72,
                    marginBottom: "22px",
                  }}
                >
                  {project.description}
                </p>

                {/* Tag pills */}
                <div
                  style={{
                    display: "flex",
                    gap: "7px",
                    flexWrap: "wrap",
                    justifyContent: isEven ? "flex-start" : "flex-end",
                    marginBottom: "24px",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "8px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "9999px",
                        padding: "4px 12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 26px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(20px)",
                    background: "rgba(255,255,255,0.05)",
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#fff",
                    cursor: "none",
                    transition: "background 0.25s, border-color 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.38)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.2)";
                  }}
                >
                  View Project
                  <span style={{ fontSize: "14px", opacity: 0.7 }}>→</span>
                </div>
              </div>
            </section>
          );
        })}

        {/* ══ HORIZONTAL SCROLL SHOWCASE ═══════════════════════════════ */}
        <div ref={hScrollSectionRef} style={{ position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "#070707",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {/* Header */}
            <div
              className="cinema-reveal"
              style={{
                position: "absolute",
                top: "clamp(80px, 11vh, 120px)",
                left: "8vw",
                right: "8vw",
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pointerEvents: "none",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.22)",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Motion Work
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(26px, 3.5vw, 48px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Cinematic Reels.
                </h2>
              </div>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8e9192",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  paddingBottom: "2px",
                  transition: "color 0.2s",
                  pointerEvents: "auto",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#8e9192")
                }
              >
                Commission a Film →
              </Link>
            </div>

            {/* Horizontal track */}
            <div
              ref={hScrollTrackRef}
              style={{
                display: "flex",
                gap: "clamp(14px, 2vw, 22px)",
                paddingLeft: "8vw",
                paddingRight: "8vw",
                willChange: "transform",
                height: "100%",
                alignItems: "center",
                paddingTop: "clamp(160px, 20vh, 200px)",
              }}
            >
              {REELS.map((reel) => (
                <HScrollCard
                  key={reel.id}
                  reel={reel}
                  onHoverChange={(h) => setCursorExpanded(h)}
                  onSelect={() => {
                    // if videoUrl exists could open a player; for now noop
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ══ NETFLIX-STYLE CATEGORY FILTER + GRID ═════════════════════ */}
        <section
          style={{
            backgroundColor: "#0e0e0e",
            padding: "clamp(72px, 9vw, 130px) 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Section heading */}
          <div
            className="cinema-reveal"
            style={{
              paddingLeft: "8vw",
              paddingRight: "8vw",
              marginBottom: "clamp(32px, 4vw, 56px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Browse by Category
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: 0,
              }}
            >
              The Collection.
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              paddingLeft: "8vw",
              paddingRight: "8vw",
              paddingBottom: "clamp(36px, 4vw, 56px)",
              overflowX: "auto",
              gap: 0,
            }}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              const count =
                tab === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    position: "relative",
                    padding: "10px 0",
                    marginRight: "clamp(20px, 3.5vw, 44px)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: isActive ? "13px" : "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "#ffffff"
                      : "rgba(255,255,255,0.28)",
                    transition: "color 0.3s ease, font-size 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.62)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.28)";
                  }}
                >
                  {tab}
                  {count > 0 && (
                    <sup
                      style={{
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "7px",
                        opacity: 0.45,
                        marginLeft: "3px",
                      }}
                    >
                      {count}
                    </sup>
                  )}
                  {/* Active underline indicator */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      backgroundColor: "#ffffff",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center",
                      transition:
                        "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div
            style={{ paddingLeft: "8vw", paddingRight: "8vw" }}
          >
            {filtered.length === 0 ? (
              /* Empty state */
              <div
                style={{
                  minHeight: "52vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  border: "1px dashed rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "80px 40px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    color: "rgba(255,255,255,0.05)",
                  }}
                >
                  Coming Soon
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(196,199,200,0.18)",
                    maxWidth: "300px",
                    lineHeight: 1.8,
                  }}
                >
                  Drop images in{" "}
                  <code
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    public/portfolio/{activeFilter.toLowerCase()}/
                  </code>
                  {" "}and register them in{" "}
                  <code
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    app/data/portfolio.ts
                  </code>
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                  gap: "clamp(10px, 1.8vw, 20px)",
                }}
              >
                {filtered.map((project, i) => {
                  const cinema = CINEMA_PROJECTS.find(
                    (c) => c.title === project.title
                  );
                  return (
                    <div
                      key={project.id}
                      className="cinema-reveal"
                      style={{
                        position: "relative",
                        aspectRatio: i % 3 === 1 ? "3/4" : "4/3",
                        borderRadius: "10px",
                        overflow: "hidden",
                        cursor: cinema ? "none" : "default",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector(
                          ".ci-img"
                        ) as HTMLElement | null;
                        if (img) img.style.transform = "scale(1.06)";
                        const ov = e.currentTarget.querySelector(
                          ".ci-ov"
                        ) as HTMLElement | null;
                        if (ov) ov.style.opacity = "1";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.16)";
                        if (cinema) setCursorExpanded(true);
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector(
                          ".ci-img"
                        ) as HTMLElement | null;
                        if (img) img.style.transform = "scale(1)";
                        const ov = e.currentTarget.querySelector(
                          ".ci-ov"
                        ) as HTMLElement | null;
                        if (ov) ov.style.opacity = "0";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.06)";
                        setCursorExpanded(false);
                      }}
                      onClick={() => cinema && setSelectedProject(cinema)}
                    >
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="ci-img"
                        style={{
                          objectFit: "cover",
                          transition:
                            "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                        }}
                      />
                      {/* Overlay */}
                      <div
                        className="ci-ov"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                          padding: "22px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-geist), monospace",
                            fontSize: "8px",
                            letterSpacing: "0.32em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)",
                            display: "block",
                            marginBottom: "5px",
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "clamp(17px, 2.2vw, 22px)",
                            fontWeight: 500,
                            color: "#fff",
                            lineHeight: 1.2,
                          }}
                        >
                          {project.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══ METRICS ═══════════════════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: "#080808",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: "clamp(64px, 8vw, 110px) 8vw",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
              gap: "48px",
              textAlign: "center",
            }}
          >
            {[
              { value: "100+", label: "Completed Projects" },
              { value: "50+", label: "Brand Partners" },
              { value: "5+", label: "Years of Work" },
              { value: "6", label: "Specialisations" },
            ].map((m, i) => (
              <div
                key={m.label}
                className="cinema-reveal"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(44px, 6vw, 76px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "10px",
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(196,199,200,0.3)",
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(72px, 9vw, 130px) 8vw",
            textAlign: "center",
            backgroundColor: "#0e0e0e",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
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
            Ready to collaborate?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "36px",
            }}
          >
            Your next campaign
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.38)" }}>
              starts here.
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
                color: "#131313",
                padding: "14px 40px",
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
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "scale(1.05)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 28px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "scale(1)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Book A Shoot
            </Link>
            <Link
              href="/services"
              style={{
                backgroundColor: "transparent",
                color: "#e2e2e2",
                padding: "14px 40px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "var(--font-geist), monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.38)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#e2e2e2";
              }}
            >
              Our Services
            </Link>
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════════════ */}
        <footer
          style={{
            padding: "clamp(36px, 5vw, 64px) 8vw",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            backgroundColor: "#070707",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            VikaFilms
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "10px",
              color: "rgba(196,199,200,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © 2024 VikaFilms. All Rights Reserved.
          </span>
        </footer>

        {/* Keyframe injection */}
        <style>{`
          @keyframes headingSwap {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .modal-story-grid { grid-template-columns: 1fr !important; }
            .modal-gallery-grid { grid-template-columns: 1fr !important; }
            .modal-gallery-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
        `}</style>
      </div>
    </>
  );
}
