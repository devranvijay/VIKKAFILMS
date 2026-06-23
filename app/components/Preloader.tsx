"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function Preloader() {
  const [display, setDisplay] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  const displayRef  = useRef(0);
  const targetRef   = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const exitStarted = useRef(false);
  const startTime   = useRef(0);

  const triggerExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;

    // Ensure the counter visually reaches 100 before sliding away
    setDisplay(100);
    displayRef.current = 100;

    setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = "";
    }, 250);

    setTimeout(() => setGone(true), 1300);
  }, []);

  useEffect(() => {
    startTime.current = Date.now();
    document.body.style.overflow = "hidden";

    const setTarget = (v: number) => {
      if (v > targetRef.current) {
        targetRef.current = Math.min(v, 100);
      }
    };

    // Smooth easing animation — display chases target at 7% per frame
    const tick = () => {
      const diff = targetRef.current - displayRef.current;
      if (diff > 0.04) {
        displayRef.current += diff * 0.07;
        setDisplay(Math.floor(displayRef.current));
        rafRef.current = requestAnimationFrame(tick);
      } else if (targetRef.current >= 100) {
        triggerExit();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    // Phase 1 — fake crawl 0→28 over first ~1.1s (avoids stalling at 0)
    let crawl = 0;
    const crawlTimer = setInterval(() => {
      crawl = Math.min(crawl + 1, 28);
      setTarget(crawl);
      if (crawl >= 28) clearInterval(crawlTimer);
    }, 40);

    // Phase 2 — DOM parsed → 58
    if (document.readyState !== "loading") {
      setTarget(58);
    } else {
      document.addEventListener("DOMContentLoaded", () => setTarget(58), { once: true });
    }

    // Phase 3 — fonts ready → 82
    document.fonts.ready.then(() => setTarget(82));

    // Phase 4 — all resources loaded → ramp to 100
    // Minimum display time of 900ms so fast caches don't just flash
    const onLoad = () => {
      setTarget(95);
      const elapsed = Date.now() - startTime.current;
      const delay = Math.max(0, 900 - elapsed);
      setTimeout(() => setTarget(100), delay + 400);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Hard safety net — never stall beyond 6s
    const safety = setTimeout(() => setTarget(100), 6000);

    return () => {
      clearInterval(crawlTimer);
      clearTimeout(safety);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [triggerExit]);

  if (gone) return null;

  return (
    <>
      <div className={`prl${exiting ? " prl--exit" : ""}`} aria-hidden="true">

        {/* Logo — absolute centre of screen */}
        <div className="prl-logo">
          <Image
            src="/vikafilms-logo.png"
            alt="VikaFilms"
            width={140}
            height={140}
            priority
          />
        </div>

        {/* Desktop: huge percentage bottom-left */}
        <div className="prl-desk">
          <span className="prl-loading-label">Loading</span>
          <span className="prl-big-num">
            {display}<em>%</em>
          </span>
        </div>

        {/* Desktop: studio name bottom-right */}
        <div className="prl-desk-right">
          <span className="prl-studio">Vikka Films</span>
          <span className="prl-est">Est. 2022</span>
        </div>

        {/* Mobile: centred percentage */}
        <div className="prl-mob">
          <span className="prl-mob-num">{display}<em>%</em></span>
          <span className="prl-mob-label">Loading</span>
        </div>

        {/* Progress bar — full width bottom edge */}
        <div className="prl-track">
          <div
            className="prl-fill"
            style={{ transform: `scaleX(${display / 100})` }}
          />
        </div>

      </div>

      <style>{`
        /* ─── Shell ─────────────────────────────────────────────── */
        .prl {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #080808;
          overflow: hidden;
        }

        /* ─── Desktop exit — slide up ────────────────────────────── */
        @media (min-width: 769px) {
          .prl {
            will-change: transform;
            transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1),
                        opacity  0.9s cubic-bezier(0.76, 0, 0.24, 1);
          }
          .prl--exit {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        /* ─── Mobile exit — fade ─────────────────────────────────── */
        @media (max-width: 768px) {
          .prl {
            transition: opacity 0.5s ease;
          }
          .prl--exit { opacity: 0; }
        }

        /* ─── Logo — dead centre ─────────────────────────────────── */
        .prl-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
        }

        /* ─── Desktop counter (bottom-left) ─────────────────────── */
        .prl-desk {
          display: none;
        }
        @media (min-width: 769px) {
          .prl-desk {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: absolute;
            bottom: 52px;
            left: 56px;
          }
          .prl-loading-label {
            font-family: var(--font-dm-sans), sans-serif;
            font-size: 9px;
            letter-spacing: 0.38em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.2);
            margin-bottom: 2px;
          }
          .prl-big-num {
            font-family: var(--font-bebas), sans-serif;
            font-size: clamp(80px, 13vw, 172px);
            line-height: 0.9;
            color: #fff;
            letter-spacing: -0.01em;
          }
          .prl-big-num em {
            font-style: normal;
            font-size: 0.38em;
            opacity: 0.28;
            margin-left: 2px;
          }
        }

        /* ─── Desktop studio name (bottom-right) ────────────────── */
        .prl-desk-right {
          display: none;
        }
        @media (min-width: 769px) {
          .prl-desk-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            position: absolute;
            bottom: 52px;
            right: 56px;
            gap: 4px;
          }
          .prl-studio {
            font-family: var(--font-bebas), sans-serif;
            font-size: 22px;
            letter-spacing: 0.18em;
            color: rgba(255,255,255,0.18);
            text-transform: uppercase;
          }
          .prl-est {
            font-family: var(--font-dm-sans), sans-serif;
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.1);
          }
        }

        /* ─── Mobile counter (centred) ───────────────────────────── */
        .prl-mob {
          display: none;
        }
        @media (max-width: 768px) {
          .prl-mob {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 8px;
          }
          .prl-mob-num {
            font-family: var(--font-bebas), sans-serif;
            font-size: 72px;
            line-height: 1;
            color: rgba(255,255,255,0.88);
            letter-spacing: 0.04em;
          }
          .prl-mob-num em {
            font-style: normal;
            font-size: 0.5em;
            opacity: 0.4;
          }
          .prl-mob-label {
            font-family: var(--font-dm-sans), sans-serif;
            font-size: 9px;
            letter-spacing: 0.38em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.2);
          }
        }

        /* ─── Progress bar ───────────────────────────────────────── */
        .prl-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,0.05);
        }
        .prl-fill {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.5);
          transform-origin: left center;
          transition: transform 0.1s linear;
          will-change: transform;
        }
      `}</style>
    </>
  );
}
