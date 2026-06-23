"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";

const CLD = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto`;
const img = (id: string) => `${CLD}/${id}`;

const SERVICES = [
  {
    num: "01",
    label: "Photography",
    title: "Commercial & Product Stills",
    desc: "Full-frame photography for automotive campaigns, product launches, editorial portraits, and brand identity.",
    tags: ["Automotive", "Product", "Editorial", "E-Commerce"],
    src: img("DSC01488_qx6a1n"),
    cta: "Book a Shoot",
  },
  {
    num: "02",
    label: "Cinematography",
    title: "Brand & Narrative Films",
    desc: "Cinematic brand stories and product films — shot on cinema glass, graded in DaVinci Resolve, delivered in 4K.",
    tags: ["Brand Films", "Product Cinematics", "Weddings", "Documentary"],
    src: img("DSC09380_aonznj"),
    cta: "Commission a Film",
  },
  {
    num: "03",
    label: "Social Content",
    title: "Reels & Platform Video",
    desc: "Short-form content optimised for Instagram, YouTube, and broadcast — reels, demos, testimonials.",
    tags: ["Instagram Reels", "YouTube", "Product Demo", "Events"],
    src: img("DSC01456_ygk3gp"),
    cta: "Start a Project",
  },
  {
    num: "04",
    label: "Aerial & BTS",
    title: "Drone & Behind-the-Scenes",
    desc: "Licensed drone cinematography for aerial establishing shots, event coverage, and authentic BTS content.",
    tags: ["Licensed Drone Ops", "Aerial", "Event Coverage", "BTS"],
    src: img("DSC01346-Enhanced-NR_lf6bof"),
    cta: "Enquire Now",
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[0] }) {
  return (
    <div className="svc-card-inner">
      <div className="svc-card-img">
        <Image
          src={s.src}
          alt={s.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="svc-card-img-overlay" />
      </div>
      <div className="svc-card-content">
        <div className="svc-card-top">
          <span className="svc-card-num">{s.num}</span>
          <span className="svc-card-label">{s.label}</span>
        </div>
        <h3 className="svc-card-title">{s.title}</h3>
        <p className="svc-card-desc">{s.desc}</p>
        <div className="svc-card-tags">
          {s.tags.map(t => <span key={t} className="svc-card-tag">{t}</span>)}
        </div>
        <Link href="/contact" className="svc-card-cta">{s.cta} →</Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <main style={{ background: "#080808", color: "#e2e2e2", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="s-hero">
        <div className="s-hero-top">
          <span className="s-eyebrow">Vikka Films · Services</span>
          <span className="s-eyebrow">Est. 2022</span>
        </div>
        <h1
          className="s-hero-h1"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(48px)",
            transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          What We
          <br />
          <em>Do.</em>
        </h1>
        <div
          className="s-hero-foot"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          <p className="s-hero-sub">One studio. Every visual discipline.</p>
          <Link href="/contact" className="s-cta-pill">Start a project →</Link>
        </div>
      </section>

      {/* ── SERVICES SCROLL STACK ────────────────────────────── */}
      <section className="s-stack-section">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={200}
          itemScale={0.04}
          itemStackDistance={30}
          stackPosition="15%"
          scaleEndPosition="5%"
          baseScale={0.88}
          onStackComplete={undefined}
        >
          {SERVICES.map(s => (
            <ScrollStackItem key={s.num} itemClassName="svc-stack-item">
              <ServiceCard s={s} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="s-process">
        <div className="s-process-head">
          <span className="s-eyebrow">How it works</span>
          <h2 className="s-process-title">The<br /><em>Process.</em></h2>
        </div>
        <div className="s-steps">
          {[
            { n: "01", t: "Brief & Discovery", b: "We map your objectives, deliverables, and vision — no guesswork, just clarity before a single frame is shot." },
            { n: "02", t: "Production Day",    b: "Cinema glass, professional lighting, a focused crew. Every detail is locked before we call action." },
            { n: "03", t: "Edit & Delivery",   b: "DaVinci grading, motion graphics, colour-correct masters — optimised and delivered for every platform." },
          ].map((step) => (
            <div key={step.n} className="s-step">
              <div className="s-step-bg-num">{step.n}</div>
              <div className="s-step-content">
                <span className="s-step-index">{step.n}</span>
                <p className="s-step-title">{step.t}</p>
                <p className="s-step-body">{step.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="s-cta-section">
        <h2 className="s-cta-h2">
          Let&apos;s build your<br />
          <em>visual story.</em>
        </h2>
        <div className="s-cta-row">
          <Link href="/contact" className="s-btn-white">Book a Shoot</Link>
          <Link href="/portfolio" className="s-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <style>{`
        /* ─ Base ─ */
        .s-eyebrow {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }

        /* ─ Hero ─ */
        .s-hero {
          padding: clamp(120px,14vw,180px) clamp(24px,6vw,80px) clamp(64px,8vw,100px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: clamp(40px,6vw,72px);
        }
        .s-hero-top {
          display: flex;
          justify-content: space-between;
        }
        .s-hero-h1 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(64px,11vw,160px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .s-hero-h1 em {
          font-family: var(--font-monsieur), cursive;
          font-style: normal;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          font-size: 1.05em;
        }
        .s-hero-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: clamp(24px,3vw,40px);
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .s-hero-sub {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(14px,1.4vw,17px);
          color: rgba(255,255,255,0.38);
          margin: 0;
        }
        .s-cta-pill {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 9999px;
          padding: 10px 24px;
          transition: color 0.2s, border-color 0.2s;
        }
        .s-cta-pill:hover { color: #fff; border-color: rgba(255,255,255,0.4); }

        /* ─ Scroll Stack section ─ */
        .s-stack-section {
          padding: 0 clamp(24px,6vw,80px);
        }

        /* Override default card height/shape for our service cards */
        .svc-stack-item {
          height: auto !important;
          min-height: 520px;
          border-radius: 24px !important;
          padding: 0 !important;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .svc-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          min-height: 520px;
        }

        .svc-card-img {
          position: relative;
          overflow: hidden;
        }
        .svc-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 60%, #111 100%);
          z-index: 1;
        }

        .svc-card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          padding: clamp(36px,4vw,60px);
        }

        .svc-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .svc-card-num {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.2);
        }
        .svc-card-label {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 4px 14px;
        }

        .svc-card-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px,5vw,80px);
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #fff;
          margin: 0;
          line-height: 1;
          text-transform: uppercase;
        }

        .svc-card-desc {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(13px,1.3vw,16px);
          line-height: 1.75;
          color: rgba(196,199,200,0.52);
          margin: 0;
          max-width: 38ch;
        }

        .svc-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .svc-card-tag {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
          padding: 4px 10px;
        }

        .svc-card-cta {
          align-self: flex-start;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.16);
          padding-bottom: 4px;
          transition: color 0.2s, border-color 0.2s;
        }
        .svc-card-cta:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

        /* Window-scroll mode: let window drive, not the inner div */
        .s-stack-section .scroll-stack-scroller {
          overflow: visible;
          height: auto;
        }
        .s-stack-section .scroll-stack-inner {
          padding: 6vh 0 50rem;
        }

        /* ─ Process ─ */
        .s-process {
          padding: clamp(80px,10vw,130px) clamp(24px,6vw,80px);
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .s-process-head {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: clamp(48px,6vw,80px);
        }
        .s-process-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(44px,7vw,100px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .s-process-title em {
          font-family: var(--font-monsieur), cursive;
          font-style: normal;
          font-weight: 400;
          color: rgba(255,255,255,0.28);
          font-size: 1.05em;
        }

        .s-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
        }

        .s-step {
          position: relative;
          padding: clamp(28px,3.5vw,52px) clamp(24px,3vw,44px);
          background: #0d0d0d;
          overflow: hidden;
          transition: background 0.3s;
        }
        .s-step:hover { background: #131313; }

        .s-step-bg-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(100px,14vw,180px);
          font-weight: 400;
          line-height: 1;
          color: rgba(255,255,255,0.03);
          position: absolute;
          bottom: -12px;
          right: 16px;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.02em;
        }

        .s-step-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
        }

        .s-step-index {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.2);
        }
        .s-step-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(24px,2.8vw,40px);
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.9);
          margin: 0;
          text-transform: uppercase;
          line-height: 1;
        }
        .s-step-body {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: clamp(12px,1.1vw,14px);
          color: rgba(196,199,200,0.42);
          margin: 0;
          line-height: 1.75;
          max-width: 28ch;
        }

        /* ─ Final CTA ─ */
        .s-cta-section {
          padding: clamp(80px,10vw,140px) clamp(24px,6vw,80px);
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: clamp(32px,4vw,52px);
        }
        .s-cta-h2 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(44px,7.5vw,110px);
          font-weight: 700;
          line-height: 0.93;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .s-cta-h2 em {
          font-family: var(--font-monsieur), cursive;
          font-style: normal;
          font-weight: 400;
          color: rgba(255,255,255,0.28);
          font-size: 1.05em;
        }
        .s-cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .s-btn-white {
          background: #fff;
          color: #080808;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 9999px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .s-btn-white:hover { transform: scale(1.03); box-shadow: 0 0 28px rgba(255,255,255,0.16); }
        .s-btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.14);
          transition: color 0.2s, border-color 0.2s;
        }
        .s-btn-outline:hover { color: #fff; border-color: rgba(255,255,255,0.4); }

        /* ─ Responsive ─ */
        @media (max-width: 768px) {
          .svc-card-inner {
            grid-template-columns: 1fr;
          }
          .svc-card-img {
            aspect-ratio: 16/9;
            min-height: 0;
          }
          .svc-card-img-overlay {
            background: linear-gradient(to bottom, transparent 60%, #111 100%);
          }
          .svc-stack-item {
            min-height: auto !important;
          }
          .s-steps {
            grid-template-columns: 1fr;
          }
          .s-step-bg-num {
            font-size: 120px;
          }
        }
      `}</style>
    </main>
  );
}
