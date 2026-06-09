"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, CATEGORIES, CATEGORY_META, REELS, type Category, type Reel } from "../data/portfolio";

type Filter = "All" | Category;

/* ── Bento Reel Card — minimal, image-first ─────────────────────────── */
function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);

  if (playing && reel.videoUrl) {
    return (
      <div style={{ position: "relative", height: "100%", borderRadius: "8px", overflow: "hidden", backgroundColor: "#000" }}>
        <iframe
          src={`${reel.videoUrl}?autoplay=1&rel=0`}
          title={reel.title}
          allow="autoplay; fullscreen"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  return (
    <div
      className="reel-card"
      onClick={() => reel.videoUrl && setPlaying(true)}
      style={{
        position: "relative",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        cursor: reel.videoUrl ? "pointer" : "default",
      }}
    >
      {/* Thumbnail — scales on hover via CSS */}
      <Image
        src={reel.thumbnail}
        alt={reel.title}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="reel-thumbnail"
        style={{ objectFit: "cover" }}
      />

      {/* Permanent bottom scrim */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 50%)",
      }} />

      {/* Hover overlay — text reveal */}
      <div className="reel-hover-content" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.04) 60%)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px 18px" }}>
          <span style={{
            display: "block",
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px", letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.38)",
            marginBottom: "5px",
          }}>
            {reel.category}
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-playfair), serif",
            fontSize: "15px", fontWeight: 500,
            color: "#ffffff", lineHeight: 1.25,
          }}>
            {reel.title}
          </span>
        </div>
      </div>

      {/* Play button */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div className="reel-play-circle" style={{
          width: "50px", height: "50px", borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.30)",
          backgroundColor: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: "3px" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Duration — always on, very faint */}
      <div style={{
        position: "absolute", top: "12px", right: "12px", zIndex: 4,
        fontFamily: "var(--font-geist), monospace",
        fontSize: "9px", letterSpacing: "0.1em",
        color: "rgba(255,255,255,0.28)",
      }}>
        {reel.duration}
      </div>
    </div>
  );
}

/* ── Bento layout spec: col × row spans for each index ─────────────── */
const BENTO_SPANS = [
  { col: 2, row: 2 }, // 0 — big feature (top-left)
  { col: 1, row: 1 }, // 1
  { col: 1, row: 1 }, // 2
  { col: 1, row: 1 }, // 3
  { col: 1, row: 1 }, // 4
  { col: 1, row: 1 }, // 5
  { col: 2, row: 1 }, // 6 — wide
  { col: 1, row: 2 }, // 7 — tall
  { col: 2, row: 1 }, // 8 — wide
  { col: 1, row: 1 }, // 9
  { col: 1, row: 1 }, // 10
  { col: 1, row: 1 }, // 11
];
const INITIAL_REEL_COUNT = 6;

const FILTER_TABS: Filter[] = ["All", ...CATEGORIES];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [mounted, setMounted] = useState(false);
  const [showAllReels, setShowAllReels] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    setMounted(true);

    // Scroll reveal for metric numbers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".metric-item").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "#0e0e0e", color: "#e2e2e2", minHeight: "100vh" }}>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "clamp(120px,14vw,160px)",
          paddingBottom: "clamp(48px,6vw,72px)",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(196,199,200,0.4)",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Our Work
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Heading changes with the active filter */}
          <h1
            key={activeFilter}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(42px,6vw,80px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
              animation: "headingSwap 0.35s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {CATEGORY_META[activeFilter].heading.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h1>
          <p
            key={activeFilter + "-sub"}
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(196,199,200,0.6)",
              maxWidth: "28rem",
              margin: 0,
              animation: "headingSwap 0.45s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {CATEGORY_META[activeFilter].sub}
          </p>
        </div>
      </section>

      {/* ── Category Filter Tabs ─────────────────────────────────── */}
      <div
        style={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "clamp(40px,5vw,64px)",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
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
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "8px 20px",
                  borderRadius: "9999px",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.9)"
                    : "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: isActive
                    ? "#ffffff"
                    : "transparent",
                  color: isActive ? "#131313" : "rgba(196,199,200,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.color = "#e2e2e2";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(196,199,200,0.6)";
                  }
                }}
              >
                {tab}
                {count > 0 && (
                  <span
                    style={{
                      fontSize: "9px",
                      opacity: isActive ? 0.5 : 0.4,
                      fontWeight: 400,
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      <section
        style={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "clamp(80px,10vw,140px)",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        {filtered.length === 0 ? (
          /* Empty state for categories with no images yet */
          <div
            style={{
              minHeight: "40vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "40px", opacity: 0.2 }}>◻</span>
            <p
              style={{
                fontFamily: "var(--font-geist), monospace",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(196,199,200,0.35)",
                margin: 0,
              }}
            >
              Coming Soon
            </p>
            <p
              style={{
                fontFamily: "var(--font-hanken), sans-serif",
                fontSize: "14px",
                color: "rgba(196,199,200,0.3)",
                margin: 0,
                maxWidth: "280px",
                lineHeight: 1.6,
              }}
            >
              Drop images in{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "12px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                public/portfolio/{activeFilter.toLowerCase()}/
              </code>{" "}
              and register them in{" "}
              <code
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "12px",
                  backgroundColor: "rgba(255,255,255,0.05)",
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
              columns: "3 320px",
              columnGap: "20px",
            }}
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                style={{
                  breakInside: "avoid",
                  marginBottom: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative",
                  cursor: "pointer",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  const overlay = e.currentTarget.querySelector(".card-overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  const overlay = e.currentTarget.querySelector(".card-overlay") as HTMLElement | null;
                  if (overlay) overlay.style.opacity = "0";
                }}
              >
                {/* Aspect ratio varies to create masonry feel */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: i % 3 === 1 ? "4/5" : i % 5 === 0 ? "1/1" : "4/3",
                    overflow: "hidden",
                    backgroundColor: "#1a1a1a",
                  }}
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="card-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)",
                      opacity: 0,
                      transition: "opacity 0.35s ease",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(196,199,200,0.6)",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#ffffff",
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </span>
                    {project.description && (
                      <span
                        style={{
                          fontFamily: "var(--font-hanken), sans-serif",
                          fontSize: "12px",
                          color: "rgba(196,199,200,0.5)",
                          marginTop: "4px",
                        }}
                      >
                        {project.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Heading swap keyframe (injected once) */}
      <style>{`
        @keyframes headingSwap {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Cinematic Reels Section ──────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(64px,10vw,120px) 5vw",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "56px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(196,199,200,0.35)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Motion Work
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(32px,4vw,56px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
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
                fontSize: "11px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "#8e9192",
                textDecoration: "none",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8e9192")}
            >
              Commission a Film →
            </Link>
          </div>

          {/* Bento reel grid */}
          {(() => {
            const visibleReels = showAllReels ? REELS : REELS.slice(0, INITIAL_REEL_COUNT);
            return (
              <>
                <div
                  className="bento-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridAutoRows: "260px",
                    gridAutoFlow: "dense",
                    gap: "10px",
                  }}
                >
                  {visibleReels.map((reel, i) => {
                    const span = BENTO_SPANS[i] ?? { col: 1, row: 1 };
                    return (
                      <div
                        key={reel.id}
                        className="bento-item"
                        style={{
                          gridColumn: `span ${span.col}`,
                          gridRow: `span ${span.row}`,
                        }}
                      >
                        <ReelCard reel={reel} />
                      </div>
                    );
                  })}
                </div>

                {/* Show More */}
                {!showAllReels && REELS.length > INITIAL_REEL_COUNT && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <button
                      onClick={() => setShowAllReels(true)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      }}
                      style={{
                        padding: "13px 44px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "9999px",
                        background: "transparent",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                    >
                      Show More &mdash; {REELS.length - INITIAL_REEL_COUNT} more reels
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* ── Metrics ─────────────────────────────────────────────── */}
      <section
        ref={metricsRef}
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "clamp(60px,8vw,120px) 5vw",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "48px",
          }}
        >
          {[
            { value: "100+", label: "Completed Projects" },
            { value: "50+", label: "Brand Partners" },
            { value: "5", label: "Categories" },
            { value: "5+", label: "Years of Work" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="metric-item"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.8s ease ${i * 100}ms, transform 0.8s ease ${i * 100}ms`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(48px,6vw,80px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  background: "linear-gradient(180deg,#ffffff 0%,#8e9192 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "12px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(196,199,200,0.4)",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 5vw",
          textAlign: "center",
          backgroundColor: "#0e0e0e",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(196,199,200,0.35)",
            marginBottom: "24px",
          }}
        >
          Ready to collaborate?
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "36px",
          }}
        >
          Your next campaign
          <br />
          starts here.
        </h2>
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
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 28px rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Book A Shoot
        </Link>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "clamp(40px,6vw,80px) 5vw",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#0e0e0e",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          VikaFilms
        </span>
        <span
          style={{
            fontFamily: "var(--font-hanken), sans-serif",
            fontSize: "13px",
            color: "rgba(196,199,200,0.3)",
          }}
        >
          © 2024 VikaFilms. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
