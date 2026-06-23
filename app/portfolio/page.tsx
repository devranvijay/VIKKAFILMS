"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DomeGallery from "../components/DomeGallery";
import {
  PROJECTS,
  CATEGORIES,
  REELS,
  type Category,
  type Reel,
  type Project,
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
  /** If set, "View Project" opens the gallery of all PROJECTS with this title */
  galleryTitle?: string;
}

// ─── Featured project data (richer metadata for scenes + modal) ───────────────
const CINEMA_PROJECTS: CinemaProject[] = [
  {
    id: 1,
    num: "01",
    category: "Commercial · Cars",
    title: "BMW Series",
    subtitle: "The Art of Motion",
    year: "2024",
    client: "BMW India",
    description:
      "A cinematic exploration of speed, precision, and engineering excellence. Shot on full-frame 8K sensors with anamorphic glass to capture the raw soul of the machine in every frame.",
    src: "/portfolio/commercial/BMW-01.jpg",
    accentColor: "#c8b89a",
    tags: ["8K Full-Frame", "Anamorphic Glass", "Studio Lighting"],
    galleryTitle: "BMW Z4",
  },
  {
    id: 2,
    num: "02",
    category: "Commercial · Products",
    title: "DJI Gimbal",
    subtitle: "Engineering in Frame",
    year: "2024",
    client: "DJI India",
    description:
      "Precision meets artistry. A product cinematics campaign built around DJI's stabilisation technology — every angle crafted to reveal the engineering detail and tactile quality of the hardware.",
    src: "https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC09380_aonznj",
    accentColor: "#a0b4c8",
    tags: ["Product Cinema", "Macro Detail", "Studio Light"],
    galleryTitle: "DJI Gimbal",
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
        cursor: "pointer",
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

// ─── MarqueeCard ─────────────────────────────────────────────────────────────
function MarqueeCard({
  reel,
  variant,
  index,
}: {
  reel: Reel;
  variant: "portrait" | "landscape";
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const isPortrait = variant === "portrait";
  const w = isPortrait
    ? "clamp(190px, 16vw, 270px)"
    : "clamp(300px, 26vw, 440px)";
  const h = isPortrait
    ? "clamp(280px, 24vw, 380px)"
    : "clamp(180px, 15vw, 250px)";

  return (
    <div
      style={{
        flexShrink: 0,
        width: w,
        height: h,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        marginRight: "clamp(12px, 1.4vw, 18px)",
        border: "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition:
          "transform 0.6s cubic-bezier(0.23,1,0.32,1), border-color 0.3s",
        borderColor: hovered
          ? "rgba(255,255,255,0.18)"
          : "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={reel.thumbnail}
        alt={reel.title}
        fill
        sizes="440px"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Base scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.68,
          transition: "opacity 0.45s",
        }}
      />

      {/* Top badges */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(10px)",
            padding: "4px 10px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {reel.category}
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.35)",
            background: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(10px)",
            padding: "4px 10px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {reel.duration}
        </span>
      </div>

      {/* Bottom info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "18px 18px 18px",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          opacity: hovered ? 1 : 0.72,
          transition:
            "transform 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.45s",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "5px",
          }}
        >
          {String((index % 12) + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(13px, 1.4vw, 17px)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {reel.title}
        </span>
      </div>

      {/* Play ring on hover */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.7})`,
          opacity: hovered ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.28)",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#fff"
          style={{ marginLeft: "2px" }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Aspect ratio per index — creates editorial masonry rhythm ───────────────
function cardAspectRatio(i: number): string {
  const cycle = ["4/3", "3/4", "4/3", "16/9", "3/4", "4/3", "1/1"];
  return cycle[i % cycle.length];
}

// ─── CollectionCard (Apple Photos-style grid card) ───────────────────────────
function CollectionCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const shots = PROJECTS.filter((p) => p.title === project.title);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "4/3",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: 0,
        transform: "scale(0.95) translateY(12px)",
        animation: `collectionReveal 0.55s cubic-bezier(0.34,1.2,0.64,1) ${0.08 + index * 0.07}s forwards`,
      }}
    >
      {/* Skeleton */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#1c1c1e",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div className="sk-shimmer" />
        </div>
      )}

      {/* Photo */}
      <Image
        src={project.src}
        alt={project.title}
        fill
        sizes="(max-width:640px) calc(100vw - 48px),(max-width:900px) calc(50vw - 32px),calc(33vw - 28px)"
        style={{
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease",
        }}
        onLoad={() => setLoaded(true)}
      />

      {/* Permanent gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.04) 42%, rgba(0,0,0,0.6) 100%)",
          transition: "opacity 0.4s",
          opacity: hovered ? 0.9 : 1,
        }}
      />

      {/* Top-left label — Apple Photos title style */}
      <div
        style={{
          position: "absolute",
          top: "clamp(12px, 1.4vw, 18px)",
          left: "clamp(12px, 1.4vw, 18px)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "clamp(13px, 1.3vw, 16px)",
            fontWeight: 700,
            color: "#fff",
            textShadow: "0 1px 8px rgba(0,0,0,0.55)",
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "9px",
            color: "rgba(255,255,255,0.48)",
            letterSpacing: "0.1em",
            marginTop: "3px",
          }}
        >
          {project.subcategory ?? project.category}
        </div>
      </div>

      {/* Bottom-right frame count badge */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(10px, 1.2vw, 14px)",
          right: "clamp(10px, 1.2vw, 14px)",
          backgroundColor: "rgba(0,0,0,0.52)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "9999px",
          padding: "4px 11px",
          fontFamily: "var(--font-geist), monospace",
          fontSize: "8.5px",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.65)",
          zIndex: 2,
          transition: "opacity 0.3s",
          opacity: hovered ? 0.5 : 1,
        }}
      >
        {shots.length} frames
      </div>

      {/* Hover CTA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 3,
        }}
      >
        <span
          style={{
            backgroundColor: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: "9999px",
            padding: "10px 28px",
            fontFamily: "var(--font-geist), monospace",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#fff",
            transform: hovered ? "scale(1)" : "scale(0.88)",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          View Gallery
        </span>
      </div>
    </div>
  );
}

// ─── ProjectGalleryModal ──────────────────────────────────────────────────────
function ProjectGalleryModal({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const shots = PROJECTS.filter((p) => p.title === title);
  const hero = shots.find((p) => p.featured) ?? shots[0];

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 480);
  };

  if (!hero || shots.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "#050505",
        overflowY: "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.04)",
        transition:
          "opacity 0.48s cubic-bezier(0.16,1,0.3,1), transform 0.48s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* ── Back button ── */}
      <button
        onClick={close}
        style={{
          position: "fixed",
          top: "28px",
          left: "5vw",
          zIndex: 10,
          backgroundColor: "rgba(5,5,5,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "9999px",
          padding: "10px 24px",
          color: "#c4c7c8",
          fontFamily: "var(--font-geist), monospace",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "border-color 0.22s, color 0.22s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.4)";
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLElement).style.color = "#c4c7c8";
        }}
      >
        ← Back to Work
      </button>

      {/* ── Full-viewport hero ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Image
          src={hero.src}
          alt={title}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            transform: visible ? "scale(1)" : "scale(1.1)",
            transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.08s",
          }}
        />

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.28) 52%, rgba(0,0,0,0.18) 100%)",
          }}
        />
        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }}
        />

        {/* ── Title block ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(56px, 8vh, 100px)",
            left: "8vw",
            right: "8vw",
          }}
        >
          {/* Overline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "18px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {hero.category} · {hero.subcategory} · 2026
            </span>
            <span
              style={{
                width: "32px",
                height: "1px",
                background: "rgba(255,255,255,0.2)",
                display: "block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.22)",
              }}
            >
              {shots.length} shots
            </span>
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(60px, 10vw, 140px)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 clamp(24px, 3.5vh, 44px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(44px)",
              transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {title}
          </h1>

          {/* Scroll cue */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.62s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "8px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Scroll to explore all shots
            </span>
            <div
              style={{
                width: "44px",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.28), transparent)",
                animation: "filmScrollCue 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Big shot counter watermark */}
        <div
          style={{
            position: "absolute",
            top: "clamp(80px, 11vh, 130px)",
            right: "8vw",
            textAlign: "right",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(64px, 10vw, 130px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(shots.length).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "8px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            frames
          </span>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          padding: "clamp(56px, 7vw, 96px) 8vw",
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "clamp(24px, 3vw, 36px)",
            marginBottom: "clamp(24px, 3vw, 36px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            All Frames
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.1)",
            }}
          >
            {shots.length} images
          </span>
        </div>

        {/* Grid */}
        <div className="gallery-modal-grid">
          {shots.map((shot, i) => (
            <div
              key={shot.id}
              className="gallery-modal-card"
              style={{
                position: "relative",
                aspectRatio: cardAspectRatio(i),
                borderRadius: "8px",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s ease ${0.3 + i * 0.07}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}
            >
              <Image
                src={shot.src}
                alt={title}
                fill
                sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "scale(1.06)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div
        style={{
          backgroundColor: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "clamp(56px, 7vw, 96px) 8vw",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "18px",
          }}
        >
          Want a similar shoot?
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
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>
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

// ─── MarqueeShowcase ──────────────────────────────────────────────────────────
function MarqueeShowcase() {
  // Duplicate for seamless loop — -50% translateX returns to origin
  const row1 = [...REELS, ...REELS];
  // Row 2: offset starting point for visual variety
  const row2src = [...REELS.slice(4), ...REELS.slice(0, 4)];
  const row2 = [...row2src, ...row2src];

  const MASK =
    "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)";

  return (
    <section
      style={{
        backgroundColor: "#070707",
        padding: "clamp(72px, 9vw, 120px) 0",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        className="cinema-reveal"
        style={{
          paddingLeft: "8vw",
          paddingRight: "8vw",
          marginBottom: "clamp(44px, 5.5vw, 76px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "20px",
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
            Project Reel
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(28px, 3.8vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fff",
              margin: 0,
            }}
          >
            Every frame,{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              intentional.
            </em>
          </h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-hanken), sans-serif",
            fontSize: "clamp(13px, 1.3vw, 15px)",
            lineHeight: 1.75,
            color: "rgba(196,199,200,0.38)",
            maxWidth: "320px",
            margin: 0,
          }}
        >
          A continuous reel of commercial shoots, brand films, and cinematic
          narratives — in motion.
        </p>
      </div>

      {/* Row 1 — portrait cards scrolling left */}
      <div
        style={{
          maskImage: MASK,
          WebkitMaskImage: MASK,
          overflow: "hidden",
          marginBottom: "clamp(12px, 1.4vw, 18px)",
        }}
      >
        <div
          className="marquee-left"
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "max-content",
            animation: "marqueeLeft 38s linear infinite",
            willChange: "transform",
          }}
        >
          {row1.map((reel, i) => (
            <MarqueeCard
              key={`r1-${i}`}
              reel={reel}
              variant="portrait"
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Row 2 — landscape cards scrolling right */}
      <div
        style={{
          maskImage: MASK,
          WebkitMaskImage: MASK,
          overflow: "hidden",
        }}
      >
        <div
          className="marquee-right"
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "max-content",
            animation: "marqueeRight 28s linear infinite",
            willChange: "transform",
          }}
        >
          {row2.map((reel, i) => (
            <MarqueeCard
              key={`r2-${i}`}
              reel={reel}
              variant="landscape"
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
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
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
    document.body.style.overflow =
      selectedProject || selectedTitle ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, selectedTitle]);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>

      {/* ── Project Modal ────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {selectedTitle && (
        <ProjectGalleryModal
          title={selectedTitle}
          onClose={() => setSelectedTitle(null)}
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
                cursor: "pointer",
              }}
              onClick={() =>
                project.galleryTitle
                  ? setSelectedTitle(project.galleryTitle)
                  : setSelectedProject(project)
              }
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
                    cursor: "pointer",
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

        {/* ══ INFINITE MARQUEE SHOWCASE ════════════════════════════════ */}
        {REELS.length > 0 && <MarqueeShowcase />}

        {/* ══ HORIZONTAL SCROLL SHOWCASE ═══════════════════════════════ */}
        {REELS.length > 0 && <div ref={hScrollSectionRef} style={{ position: "relative" }}>
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
                  onHoverChange={() => {}}
                  onSelect={() => {
                    // if videoUrl exists could open a player; for now noop
                  }}
                />
              ))}
            </div>
          </div>
        </div>}

        {/* ══ COLLECTION — Apple Photos-style ═══════════════════════════ */}
        <section
          style={{
            padding: "clamp(80px, 10vw, 130px) 0 clamp(90px, 11vw, 150px)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            position: "relative",
            background:
              "radial-gradient(ellipse 90% 60% at 28% 55%, rgba(55,55,80,0.06) 0%, transparent 65%), #080808",
          }}
        >
          {/* ── Section header ── */}
          <div
            className="cinema-reveal"
            style={{
              padding: "0 8vw",
              marginBottom: "clamp(32px, 4vw, 52px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "clamp(10px, 1.5vw, 16px)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Selected Work
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.1)",
                }}
              >
                {Array.from(new Map(filtered.map((p) => [p.title, p])).values()).length} collections
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(34px, 5vw, 72px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: 0,
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.28)" }}>
                Collection.
              </em>
            </h2>
          </div>

          {/* ── Floating macOS-style panel ── */}
          <div style={{ padding: "0 8vw" }}>
            <div
              style={{
                backgroundColor: "rgba(16,16,18,0.95)",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow:
                  "0 60px 180px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.4) inset",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Inner padding + grid */}
              <div
                style={{
                  padding: "clamp(10px, 1.2vw, 16px)",
                  paddingBottom: "clamp(68px, 8vw, 84px)",
                }}
              >
                {/* Empty state */}
                {filtered.length === 0 ? (
                  <div
                    style={{
                      minHeight: "320px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(56px, 9vw, 110px)",
                        color: "rgba(255,255,255,0.025)",
                        lineHeight: 1,
                      }}
                    >
                      Soon
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: "rgba(196,199,200,0.14)",
                      }}
                    >
                      Coming Soon · Upload to Cloudinary
                    </p>
                  </div>
                ) : (
                  <div className="photos-grid">
                    {Array.from(
                      new Map(filtered.map((p) => [p.title, p])).values()
                    ).map((project, i) => (
                      <CollectionCard
                        key={project.id}
                        project={project}
                        index={i}
                        onOpen={() => setSelectedTitle(project.title)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Bottom floating pill nav (Apple Photos-style) ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(14px, 2vw, 20px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  backgroundColor: "rgba(36,36,38,0.97)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                  borderRadius: "9999px",
                  padding: "4px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  gap: "2px",
                  zIndex: 4,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      style={{
                        padding: "9px clamp(14px, 2vw, 26px)",
                        borderRadius: "9999px",
                        border: "none",
                        background: isActive
                          ? "#ffffff"
                          : "transparent",
                        color: isActive
                          ? "#000000"
                          : "rgba(255,255,255,0.42)",
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "clamp(10px, 1vw, 12px)",
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                        transition:
                          "background 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                        transform: isActive ? "scale(1.03)" : "scale(1)",
                        boxShadow: isActive
                          ? "0 2px 12px rgba(255,255,255,0.18)"
                          : "none",
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
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

        {/* ── Dome Gallery ──────────────────────────────────────────────── */}
        <section
          className="relative z-20"
          style={{
            backgroundColor: "#0a0a0a",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "clamp(64px,8vw,110px) 0 0",
          }}
        >
          <div
            style={{
              padding: "0 clamp(28px,6vw,80px)",
              marginBottom: "clamp(40px,5vw,64px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Explore
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(34px,5vw,68px)",
                  fontWeight: 700,
                  lineHeight: 0.93,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                The Sphere.
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "clamp(11px,1.1vw,13px)",
                lineHeight: 1.72,
                color: "rgba(196,199,200,0.35)",
                maxWidth: "280px",
                margin: 0,
                textAlign: "right",
                letterSpacing: "0.02em",
              }}
            >
              Drag to explore. Click any image to open it.
            </p>
          </div>

          <div style={{ width: "100%", height: "clamp(500px, 65vh, 800px)", position: "relative" }}>
            <DomeGallery
              images={[
                { src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01488_qx6a1n`, alt: "BMW Commercial" },
                { src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC09380_aonznj`, alt: "DJI Gimbal" },
                { src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01346-Enhanced-NR_lf6bof`, alt: "Portrait" },
                { src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01456_ygk3gp`, alt: "Commercial" },
                { src: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC09376_lygk5q`, alt: "Campaign" },
              ]}
              overlayBlurColor="#0a0a0a"
              grayscale={false}
              fit={0.52}
              openedImageWidth="380px"
              openedImageHeight="500px"
              imageBorderRadius="12px"
              openedImageBorderRadius="18px"
            />
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
          /* ── Skeleton shimmer ── */
          @keyframes skShimmer {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .sk-shimmer {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.055) 50%,
              transparent 100%
            );
            animation: skShimmer 1.6s ease-in-out infinite;
          }

          /* ── Masonry grid ── */
          .masonry-grid {
            column-count: 3;
            column-gap: clamp(8px, 1.2vw, 14px);
          }
          .masonry-card {
            display: block;
            break-inside: avoid;
            margin-bottom: clamp(8px, 1.2vw, 14px);
          }
          @media (max-width: 900px) {
            .masonry-grid { column-count: 2; }
          }
          @media (max-width: 540px) {
            .masonry-grid { column-count: 1; }
          }

          /* ── Apple Photos collection grid ── */
          .photos-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          @media (max-width: 900px) {
            .photos-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          }
          @media (max-width: 540px) {
            .photos-grid { grid-template-columns: 1fr; gap: 8px; }
          }
          @keyframes collectionReveal {
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          /* ── Gallery modal grid ── */
          .gallery-modal-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          @media (max-width: 900px) {
            .gallery-modal-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          }
          @media (max-width: 540px) {
            .gallery-modal-grid { grid-template-columns: 1fr; gap: 8px; }
          }
          .gallery-modal-card img {
            transition: transform 0.8s cubic-bezier(0.23,1,0.32,1) !important;
          }
          .gallery-modal-card:hover img {
            transform: scale(1.06) !important;
          }

          @keyframes filmScrollCue {
            0%, 100% { width: 44px; opacity: 0.6; }
            50%       { width: 70px; opacity: 1;   }
          }

          @keyframes marqueeLeft {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          .marquee-left:hover,
          .marquee-right:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-left, .marquee-right { animation: none; }
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
