"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CLD = "https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto";

// ─── 9 cards: 8 photos + 1 CTA — CTA in centre-back so it's never adjacent to slot 0 ──
const CARDS = [
  { id: 1, type: "image" as const, src: `${CLD}/DSC01488_qx6a1n`,           alt: "BMW Commercial Shoot",    label: "Commercial" },
  { id: 2, type: "image" as const, src: `${CLD}/DSC09380_aonznj`,           alt: "DJI Gimbal Product",      label: "Product"    },
  { id: 3, type: "image" as const, src: `${CLD}/DSC01346-Enhanced-NR_lf6bof`, alt: "Portrait Session",     label: "Portrait"   },
  { id: 4, type: "image" as const, src: `${CLD}/DSC01456_ygk3gp`,           alt: "Commercial Photography",  label: "Commercial" },
  { id: 5, type: "cta"   as const, src: "",                                 alt: "",                        label: ""           },
  { id: 6, type: "image" as const, src: `${CLD}/DSC09376_lygk5q`,           alt: "Product Campaign",        label: "Campaign"   },
  { id: 7, type: "image" as const, src: "/portfolio/commercial/BMW-01.jpg", alt: "BMW Series",              label: "Automotive" },
  { id: 8, type: "image" as const, src: "/lens-photo.jpg",                  alt: "Behind the Lens",         label: "BTS"        },
  { id: 9, type: "image" as const, src: "/portfolio/commercial/DentalChair-01.jpeg", alt: "Healthcare", label: "Healthcare" },
];

// Mobile grid: show first 6 images only (2 rows × 3 cols — clean, not overwhelming)
const MOBILE_CARDS = CARDS.filter(c => c.type === "image").slice(0, 6);

const N          = CARDS.length;           // 9
const BW         = 340;                    // wider cards for a full panoramic spread
const BH         = 260;                    // taller cards to fill the viewport vertically
const RADIUS     = 560;                    // radius gives sweeping arc at this card size
const ANGLE_STEP = 360 / N;               // 40° per slot

// ─── Physics ──────────────────────────────────────────────────────────────────
const AUTO_DEG   = 0.22;   // auto-play: degrees per rAF frame (≈ 7.9°/s at 36fps avg)
const DRAG_DEG   = 0.40;   // degrees per pixel dragged
const DAMP       = 0.90;   // per-frame momentum decay after drag/scroll release

export default function CylinderScroll() {
  const wrapperRef    = useRef<HTMLDivElement>(null);

  // Ring rotation in degrees — unbounded, auto-play moves it forward
  const ringRef       = useRef(0);
  const velRef        = useRef(-AUTO_DEG); // negative = forward (next card)
  const lastDragVRef  = useRef(0);
  const isDragRef     = useRef(false);
  const lastXRef      = useRef(0);
  const prevScrollRef = useRef(0);
  const isVisRef      = useRef(false);
  const animRef       = useRef<number>(0);

  const [ring,    setRing]    = useState(0);
  const [isDrag,  setIsDrag]  = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // ── IntersectionObserver — pause rAF when off-screen ─────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { isVisRef.current = e.isIntersecting; },
      { threshold: 0.05 }
    );
    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Scroll nudges the ring velocity ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const { top }   = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const st    = Math.max(0, Math.min(1, -top / scrollable));
      const delta = st - prevScrollRef.current;
      prevScrollRef.current = st;
      if (Math.abs(delta) > 0.0001) {
        // Convert scroll fraction change → degrees (N full slots across full scroll)
        velRef.current = -delta * N * ANGLE_STEP * 0.6;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── rAF loop: physics tick ────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      if (isVisRef.current && !isDragRef.current) {
        ringRef.current += velRef.current;
        // Decay toward auto-play velocity
        velRef.current = velRef.current * DAMP + (-AUTO_DEG) * (1 - DAMP);
        setRing(ringRef.current);
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ── Pointer / drag ────────────────────────────────────────────────────────
  const onPtrDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragRef.current     = true;
    lastXRef.current      = e.clientX;
    lastDragVRef.current  = 0;
    setIsDrag(true);
  };

  const onPtrMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragRef.current) return;
    const dx  = e.clientX - lastXRef.current;
    const dv  = dx * DRAG_DEG;            // drag right → positive ring rotation
    ringRef.current += dv;
    if (Math.abs(dx) > 0.3) lastDragVRef.current = dv; // track for momentum
    lastXRef.current = e.clientX;
    setRing(ringRef.current);
  };

  const onPtrUp = () => {
    isDragRef.current = false;
    // Hand last drag velocity to physics loop; it will decay toward auto-play
    velRef.current = lastDragVRef.current;
    setIsDrag(false);
  };

  // ── Derived display values ────────────────────────────────────────────────
  // Which slot is currently at the front?
  const activeIndex = (((Math.round(-ring / ANGLE_STEP)) % N) + N) % N;

  return (
    <>
      {/* ── Desktop: 3D ring carousel ── */}
      <div className="helix-desktop">
      <div
        ref={wrapperRef}
        style={{
          height:     `${(N - 1) * 65 + 100}vh`,
          position:   "relative",
          background: "#050505",
        }}
      >
        {/* Sticky frame — drag surface */}
        <div
          style={{
            position:   "sticky",
            top:        0,
            height:     "100vh",
            overflow:   "hidden",
            cursor:     isDrag ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onPointerDown={onPtrDown}
          onPointerMove={onPtrMove}
          onPointerUp={onPtrUp}
          onPointerCancel={onPtrUp}
        >
          {/* ── Perspective container (centred) ── */}
          <div
            style={{
              position: "absolute",
              left:     "50%",
              top:      "50%",
              transform: "translate(-50%, -50%)",
              perspective:       "1800px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {CARDS.map((card, i) => {
              // Card's world angle = its slot + current ring rotation
              const angle = i * ANGLE_STEP + ring;
              const rad   = angle * Math.PI / 180;
              const cosA  = Math.cos(rad);

              // Gentle falloff — side cards stay visible for the panoramic arc
              const opacity  = cosA < 0 ? 0 : 0.12 + 0.88 * Math.pow(cosA, 0.22);
              // No DoF blur — panoramic style keeps all cards sharp
              const zIdx     = cosA > 0 ? Math.round(cosA * 100) : 0;
              const isActive = cosA > 0.95;
              const isHov    = hovered === i;
              // Uniform card size — panoramic sliders look cleaner without per-card scaling
              const cardW    = BW;
              const cardH    = BH;

              // Cylinder: spin card to its slot → push to surface → centre on anchor
              const transform = [
                `rotateY(${angle.toFixed(2)}deg)`,
                `translateZ(${RADIUS}px)`,
                `translate(-50%, -50%)`,
              ].join(" ");

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position:   "absolute",
                    top:        0,
                    left:       0,
                    width:      `${cardW}px`,
                    height:     `${cardH}px`,
                    transform,
                    opacity,
                    willChange: "transform, opacity",
                    zIndex:     zIdx,
                    borderRadius: "14px",
                    overflow:   "hidden",
                    boxShadow:  isActive
                      ? "0 24px 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.10)"
                      : "0 6px 20px rgba(0,0,0,0.5)",
                    cursor:     "inherit",
                    transition: "box-shadow 0.35s",
                  }}
                >
                  {/* Inner hover-scale shell */}
                  <div style={{
                    width:  "100%",
                    height: "100%",
                    transform:  isHov ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    position: "relative",
                  }}>
                    {/* CTA card */}
                    {card.type === "cta" && (
                      <div style={{
                        width: "100%", height: "100%",
                        background: "rgba(255,255,255,0.022)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "18px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "24px",
                      }}>
                        <div style={{ width: "38px", height: "1px", background: "rgba(255,255,255,0.18)" }} />
                        <span style={{
                          fontFamily: "var(--font-geist), monospace",
                          fontSize: "9px", fontWeight: 600,
                          letterSpacing: "0.45em", textTransform: "uppercase",
                          color: "rgba(255,255,255,0.24)", textAlign: "center",
                        }}>
                          View All Projects
                        </span>
                        <Link href="/portfolio" className="dna-cta">
                          Explore More ↗
                        </Link>
                        <div style={{ width: "38px", height: "1px", background: "rgba(255,255,255,0.18)" }} />
                      </div>
                    )}

                    {/* Image card */}
                    {card.type === "image" && (
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="440px"
                        style={{ objectFit: "cover" }}
                        priority={card.id <= 2}
                      />
                    )}

                    {isHov && card.type !== "cta" && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(255,255,255,0.045)",
                        pointerEvents: "none", borderRadius: "18px",
                      }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Atmospheric fog — wide vignette blends edges into background ── */}
          <div style={{
            position:      "absolute",
            inset:         0,
            background:    "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.55) 8%, transparent 18%, transparent 82%, rgba(5,5,5,0.55) 92%, #050505 100%)",
            pointerEvents: "none",
            zIndex:        50,
          }} />

          {/* ── Top-right: + SELECTED WORKS ── */}
          <div style={{
            position: "absolute",
            top:   "clamp(88px, 13vh, 116px)",
            right: "clamp(28px, 5vw, 72px)",
            display: "flex", alignItems: "center", gap: "10px",
            zIndex: 200, pointerEvents: "none",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            </svg>
            <span style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.32)",
            }}>
              SELECTED&nbsp;<span style={{ color: "rgba(255,255,255,0.70)" }}>WORKS</span>
            </span>
          </div>

          {/* ── Counter — top-left ── */}
          <div style={{
            position: "absolute",
            top:  "clamp(88px, 13vh, 116px)",
            left: "clamp(28px, 5vw, 72px)",
            zIndex: 200, pointerEvents: "none",
          }}>
            <span style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "10px", letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.18)",
            }}>
              {String(Math.min(activeIndex + 1, N - 1)).padStart(2, "0")} /{" "}
              {String(N - 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── Progress pills ── */}
          <div style={{
            position:  "absolute",
            bottom:    "clamp(28px, 5vh, 44px)",
            left:      "50%",
            transform: "translateX(-50%)",
            display:   "flex", gap: "6px", alignItems: "center",
            zIndex:    200,
          }}>
            {Array.from({ length: N - 1 }, (_, i) => (
              <div key={i} style={{
                width:  i === activeIndex ? "20px" : "5px",
                height: "5px",
                borderRadius: "9999px",
                background: i === activeIndex
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.14)",
                transition: "width 0.4s cubic-bezier(0.34,1.4,0.64,1), background 0.4s",
              }} />
            ))}
          </div>

          {/* ── Drag hint ── */}
          <div style={{
            position:   "absolute",
            bottom:     "clamp(28px, 5vh, 44px)",
            right:      "clamp(28px, 5vw, 72px)",
            display:    "flex", alignItems: "center", gap: "8px",
            opacity:    Math.abs(ring) < 8 && !isDrag ? 0.36 : 0,
            transition: "opacity 0.6s",
            pointerEvents: "none", zIndex: 200,
          }}>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M1 7h20M16 2l5 5-5 5M6 2L1 7l5 5"
                stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              fontFamily: "var(--font-geist), monospace",
              fontSize: "9px", letterSpacing: "0.38em",
              textTransform: "uppercase", color: "#fff",
            }}>
              Drag
            </span>
          </div>
        </div>
      </div>
      </div>

      {/* ── Mobile / small-screen: static video-only grid ── */}
      <div className="helix-mobile" style={{ background: "#050505" }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "clamp(72px, 14vw, 104px) clamp(16px, 5vw, 28px) 24px",
          gap: "8px",
        }}>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          </svg>
          <span style={{
            fontFamily: "var(--font-geist), monospace",
            fontSize: "8px", fontWeight: 600,
            letterSpacing: "0.30em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
          }}>
            SELECTED&nbsp;<span style={{ color: "rgba(255,255,255,0.68)" }}>WORKS</span>
          </span>
        </div>

        <div className="mobile-grid">
          {MOBILE_CARDS.map(card => (
            <div key={card.id} className="mobile-card">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 480px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .helix-desktop { display: block; }
        .helix-mobile  { display: none;  }

        @media (max-width: 1099px) {
          .helix-desktop { display: none;  }
          .helix-mobile  { display: block; }
        }

        /* ── Responsive photo grid ────────────────────────────────── */
        .mobile-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 0 clamp(10px, 3vw, 20px) clamp(48px, 10vw, 80px);
        }
        .mobile-card {
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          position: relative;
          background: rgba(255,255,255,0.03);
        }

        /* ≤ 600px — switch to 2 columns */
        @media (max-width: 600px) {
          .mobile-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }
          .mobile-card {
            border-radius: 8px;
          }
        }

        /* ≤ 360px — single column */
        @media (max-width: 360px) {
          .mobile-grid {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }

        .dna-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.45);
          border-radius: 9999px;
          padding: 14px 36px;
          background: rgba(255,255,255,0.04);
          transition: background 0.28s ease, border-color 0.28s ease,
            color 0.28s ease, transform 0.18s cubic-bezier(0.34,1.4,0.64,1);
        }
        .dna-cta:hover {
          background: #fff;
          border-color: #fff;
          color: #0a0a0a;
          transform: scale(1.05);
        }
        .dna-cta:active {
          background: #e8e8e8;
          border-color: #e8e8e8;
          color: #0a0a0a;
          transform: scale(0.96);
          transition-duration: 0.08s;
        }
        .dna-cta-sm {
          font-size: 11px;
          padding: 10px 20px;
          letter-spacing: 0.12em;
        }
      `}</style>
    </>
  );
}
