"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SoftAurora from "./components/SoftAurora";
import ImageSlider3D from "./components/ImageSlider3D";

export default function HomePage() {
  const filmmakerRef = useRef<HTMLElement>(null);
  const [filmProgress, setFilmProgress] = useState(0);

  useEffect(() => {
    const onFilmScroll = () => {
      const el = filmmakerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrollable = height - viewH;
      if (scrollable <= 0) return;
      setFilmProgress(Math.max(0, Math.min(1, -top / scrollable)));
    };
    window.addEventListener("scroll", onFilmScroll, { passive: true });
    return () => window.removeEventListener("scroll", onFilmScroll);
  }, []);

  // Scroll-phase helper — maps filmProgress into a 0→1 ramp for a given range
  const fp = (start: number, end: number) =>
    Math.max(0, Math.min(1, (filmProgress - start) / (end - start)));

  useEffect(() => {
    // Reveal observer for sections
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".home-reveal").forEach((el) => revealObserver.observe(el));

    return () => { revealObserver.disconnect(); };
  }, []);

  return (
    <>
    <div
      className={`text-[#e2e2e2]`}
      style={{ fontFamily: "var(--font-sans), sans-serif" }}
    >
      {/* ══ HERO — full-screen video ═══════════════════════════════════ */}
      {/* PLACEHOLDER VIDEO — replace src with your Cloudinary video URL  */}
      {/* Upload a cinematic video to Cloudinary → use cldVideo() helper  */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#060606",
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-drone-flight-through-jungle-with-a-waterfall-49333-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark cinematic overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Film grain */}
        <div
          className="film-grain"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.045,
            backgroundImage:
              "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Content — bottom-center */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(60px, 10vh, 110px)",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(20px, 3.5vh, 36px)",
          }}
        >
          {/* "Vika Films" in Playfair italic */}
          <h1
            style={{
              fontFamily: "var(--font-monsieur), cursive",
              fontSize: "clamp(52px, 8vw, 130px)",
              fontWeight: 400,
              fontStyle: "normal",
              color: "#ffffff",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              margin: 0,
              textAlign: "center",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            }}
          >
            Vika Films
          </h1>

          {/* CTA pill */}
          <Link href="/contact" className="hero-cta">
            Let&apos;s Create ↗
          </Link>
        </div>
      </section>

      {/* ── 3D Image Slider ── */}
      <section style={{ backgroundColor: "#060606", padding: "clamp(48px,6vw,80px) 0" }}>
        <ImageSlider3D
          images={[
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01488_qx6a1n`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC09380_aonznj`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01346-Enhanced-NR_lf6bof`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01456_ygk3gp`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC09376_lygk5q`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01488_qx6a1n`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC09380_aonznj`,
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/DSC01346-Enhanced-NR_lf6bof`,
          ]}
          duration={36}
          cardWidth="17em"
          cardAspectRatio="7/10"
          perspective="38em"
          rotationDirection="left"
          withMask
        />
      </section>

        {/* ── Selected Work ────────────────────────────────────── */}
        <section
          className="relative z-20"
          style={{
            backgroundColor: "#0e0e0e",
            padding: "clamp(80px,12vw,160px) 5vw",
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "20px",
                marginBottom: "clamp(40px,6vw,72px)",
              }}
            >
              <div>
                {/* Eyebrow label — fades in first */}
                <span
                  className="home-reveal"
                  style={{
                    fontFamily: "var(--font-sans), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(196,199,200,0.45)",
                    display: "block",
                    marginBottom: "20px",
                    opacity: 0,
                    transform: "translateY(16px)",
                    transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  Selected Work
                </span>

                {/* ── Mixed-font animated headline ── */}
                <h2 style={{ margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                  {/* Line 1: "Campaigns That" — Playfair bold */}
                  <span
                    className="home-reveal"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(36px,4.5vw,64px)",
                      fontWeight: 700,
                      color: "#ffffff",
                      opacity: 0,
                      transform: "translateY(32px)",
                      transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
                    }}
                  >
                    Campaigns That
                  </span>

                  {/* Line 2: "Moved" Playfair + "Markets." Monsieur script */}
                  <span
                    className="home-reveal"
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.18em",
                      flexWrap: "wrap",
                      opacity: 0,
                      transform: "translateY(40px)",
                      transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0.28s, transform 0.95s cubic-bezier(0.16,1,0.3,1) 0.28s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(36px,4.5vw,64px)",
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      Moved
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-monsieur), cursive",
                        fontSize: "clamp(44px,5.5vw,80px)",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.01em",
                        lineHeight: 0.85,
                      }}
                    >
                      Markets.
                    </span>
                  </span>
                </h2>
              </div>

              <Link
                className="home-reveal"
                href="/portfolio"
                style={{
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8e9192",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, color 0.2s",
                  paddingBottom: "4px",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  whiteSpace: "nowrap",
                  opacity: 0,
                  transform: "translateY(20px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8e9192")}
              >
                View All Work <span style={{ fontSize: "16px" }}>→</span>
              </Link>
            </div>

            {/* 3-card grid — staggered in after headline */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px),1fr))",
                gap: "clamp(16px,2vw,28px)",
              }}
            >
              {[
                {
                  src: "https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC01488_qx6a1n",
                  category: "Commercial",
                  title: "BMW Series",
                  delay: "0.55s",
                },
                {
                  src: "https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC09380_aonznj",
                  category: "Commercial",
                  title: "DJI Gimbal",
                  delay: "0.72s",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href="/portfolio"
                  className="home-reveal"
                  style={{
                    display: "block",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    opacity: 0,
                    transform: "translateY(48px)",
                    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}, transform 1s cubic-bezier(0.16,1,0.3,1) ${item.delay}`,
                    textDecoration: "none",
                    position: "relative",
                    aspectRatio: "4/5",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                    if (img) img.style.transform = "scale(1.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                    if (img) img.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)",
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(196,199,200,0.6)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "#ffffff",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Filmmaker — Cinematic Scroll Intro ────────────── */}
        <section
          ref={filmmakerRef}
          id="the-filmmaker"
          className="filmmaker-desktop"
          style={{ position: "relative", height: "550vh", zIndex: 20 }}
        >
          {/* ── Sticky cinematic viewport ───────────────────────── */}
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            {/* Aurora background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
              }}
            >
              <SoftAurora
                speed={0.4}
                scale={1.2}
                brightness={0.85}
                color1="#c8b89a"
                color2="#6b4c8a"
                noiseFrequency={2.0}
                noiseAmplitude={0.8}
                bandHeight={0.5}
                bandSpread={1.2}
                octaveDecay={0.1}
                layerOffset={0.8}
                colorSpeed={0.6}
                enableMouseInteraction={true}
                mouseInfluence={0.2}
              />
            </div>

            {/* Right-anchored photo — full person visible, subtle parallax */}
            <div
              className="filmmaker-photo"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "60vw",
                zIndex: 2,
                transform: `translateY(${filmProgress * -3}%)`,
                willChange: "transform",
              }}
            >
              <Image
                src="/vivek-kamble.png"
                alt="Vivek Kamble — Founder & Cinematographer, VIKA FILMS"
                fill
                sizes="60vw"
                priority
                style={{
                  objectFit: "contain",
                  objectPosition: "right center",
                  clipPath: `inset(${(1 - fp(0.24, 0.90)) * 100}% 0 0 0)`,
                }}
              />
            </div>

            {/* Cinematic side gradient — darkens left for text legibility */}
            <div
              className="filmmaker-gradient"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.08) 70%, transparent 100%)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Radial vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.65) 100%)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />

            {/* Film grain texture */}
            <div
              className="film-grain"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.055,
                backgroundImage:
                  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                pointerEvents: "none",
                zIndex: 4,
                mixBlendMode: "overlay",
              }}
            />

            {/* Letterbox bars — slide in on entry */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "8vh",
                background: "#000",
                zIndex: 9,
                transform: `translateY(${fp(0, 0.08) < 1 ? -100 + fp(0, 0.08) * 100 : 0}%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "8vh",
                background: "#000",
                zIndex: 9,
                transform: `translateY(${fp(0, 0.08) < 1 ? 100 - fp(0, 0.08) * 100 : 0}%)`,
              }}
            />

            {/* ── Text layer — phases accumulate, fade out together at end ── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 clamp(20px, 7vw, 80px)",
                maxWidth: "860px",
                opacity: filmProgress > 0.90 ? Math.max(0, 1 - (filmProgress - 0.90) / 0.10) : 1,
              }}
            >
              {/* THE FILMMAKER label */}
              <span
                style={{
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  display: "block",
                  marginBottom: "18px",
                  opacity: fp(0.14, 0.28),
                  transform: `translateY(${(1 - fp(0.14, 0.28)) * 18}px)`,
                }}
              >
                The Filmmaker
              </span>

              {/* NAME */}
              <h2
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "clamp(52px, 9vw, 110px)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  marginBottom: "14px",
                  opacity: fp(0.24, 0.40),
                  transform: `translateX(${(1 - fp(0.24, 0.40)) * -36}px)`,
                }}
              >
                Vivek Kamble
              </h2>

              {/* Animated rule */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.18)",
                  marginBottom: "20px",
                  transformOrigin: "left center",
                  transform: `scaleX(${fp(0.38, 0.50)})`,
                  opacity: fp(0.38, 0.50),
                }}
              />

              {/* SUBTITLE */}
              <span
                style={{
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.48)",
                  display: "block",
                  marginBottom: "30px",
                  opacity: fp(0.44, 0.57),
                  transform: `translateY(${(1 - fp(0.44, 0.57)) * 14}px)`,
                }}
              >
                Founder &amp; Cinematographer, VIKA FILMS
              </span>

              {/* BIO LINE 1 */}
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.68)",
                  marginBottom: "12px",
                  maxWidth: "520px",
                  opacity: fp(0.54, 0.67),
                  transform: `translateY(${(1 - fp(0.54, 0.67)) * 18}px)`,
                }}
              >
                I create cinematic content for luxury hospitality brands,
                premium products, healthcare companies, and businesses
                looking to elevate their visual identity.
              </p>

              {/* BIO LINE 2 */}
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.68)",
                  marginBottom: "32px",
                  maxWidth: "520px",
                  opacity: fp(0.64, 0.76),
                  transform: `translateY(${(1 - fp(0.64, 0.76)) * 18}px)`,
                }}
              >
                My work focuses on combining storytelling, aesthetics,
                and commercial strategy to create films that leave a
                lasting impression.
              </p>

              {/* Availability badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 22px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  width: "fit-content",
                  opacity: fp(0.76, 0.88),
                  transform: `translateY(${(1 - fp(0.76, 0.88)) * 14}px)`,
                }}
              >
                <div
                  className="availability-pulse"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                    boxShadow: "0 0 12px rgba(74,222,128,0.5)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Available across India &amp; International
                </span>
              </div>
            </div>

            {/* Scroll cue — fades out after first phase */}
            <div
              style={{
                position: "absolute",
                bottom: "11vh",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                opacity: Math.max(0, 1 - fp(0.08, 0.22) * 5),
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.28)",
                  textTransform: "uppercase",
                }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: "1px",
                  height: "44px",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
                  animation: "filmScrollCue 1.6s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Mobile Filmmaker Section ──────────────────────────────── */}
        {/* Shown only on mobile via CSS .filmmaker-mobile class          */}
        <section
          className="filmmaker-mobile"
          style={{ position: "relative", backgroundColor: "#000", overflow: "hidden", zIndex: 20 }}
        >
          {/* Aurora gradient */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <SoftAurora color1="#c8b89a" color2="#6b4c8a" brightness={0.85} />
          </div>
          {/* Radial vignette */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          {/* Photo */}
          <div
            style={{ position: "relative", height: "62vw", maxHeight: "300px", overflow: "hidden", zIndex: 3 }}
          >
            <Image
              src="/vivek-kamble.png"
              alt="Vivek Kamble — Founder & Cinematographer, VIKA FILMS"
              fill
              sizes="100vw"
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />
            <div
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 38%, transparent 65%)",
              }}
            />
          </div>
          {/* Text */}
          <div
            style={{
              position: "relative", zIndex: 4,
              padding: "clamp(18px,5vw,32px) clamp(24px,7vw,40px) clamp(52px,9vw,72px)",
            }}
          >
            <span
              className="home-reveal"
              style={{
                fontFamily: "var(--font-sans), monospace", fontSize: "10px",
                letterSpacing: "0.45em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "14px",
                opacity: 0, transform: "translateY(16px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
              }}
            >
              The Filmmaker
            </span>
            <h2
              className="home-reveal"
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(42px,11vw,62px)", fontWeight: 700,
                lineHeight: 0.95, letterSpacing: "-0.03em", color: "#ffffff",
                margin: "0 0 12px",
                opacity: 0, transform: "translateY(20px)",
                transition: "opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s",
              }}
            >
              Vivek Kamble
            </h2>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.18)", margin: "12px 0 14px", maxWidth: "100px" }} />
            <span
              className="home-reveal"
              style={{
                fontFamily: "var(--font-sans), monospace", fontSize: "10px",
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "20px",
                opacity: 0, transform: "translateY(16px)",
                transition: "opacity 0.55s ease 0.14s, transform 0.55s ease 0.14s",
              }}
            >
              Founder &amp; Cinematographer, VIKA FILMS
            </span>
            <p
              className="home-reveal"
              style={{
                fontFamily: "var(--font-sans), sans-serif", fontSize: "15px",
                lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "12px",
                opacity: 0, transform: "translateY(16px)",
                transition: "opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s",
              }}
            >
              I create cinematic content for luxury hospitality brands, premium products,
              healthcare companies, and businesses looking to elevate their visual identity.
            </p>
            <p
              className="home-reveal"
              style={{
                fontFamily: "var(--font-sans), sans-serif", fontSize: "15px",
                lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "28px",
                opacity: 0, transform: "translateY(16px)",
                transition: "opacity 0.55s ease 0.26s, transform 0.55s ease 0.26s",
              }}
            >
              My work focuses on combining storytelling, aesthetics, and commercial
              strategy to create films that leave a lasting impression.
            </p>
            <div
              className="home-reveal"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "10px 18px", borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
                opacity: 0, transform: "translateY(16px)",
                transition: "opacity 0.55s ease 0.32s, transform 0.55s ease 0.32s",
              }}
            >
              <div
                style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  backgroundColor: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.5)", flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans), monospace", fontSize: "10px",
                  letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
                }}
              >
                Available across India &amp; International
              </span>
            </div>
          </div>
        </section>

        {/* ── CTA Strip ─────────────────────────────────────────── */}
        <section
          className="relative z-20"
          style={{
            backgroundColor: "#111111",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "clamp(80px,10vw,140px) 5vw",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="home-reveal"
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              opacity: 0,
              transform: "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans), monospace",
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(196,199,200,0.4)",
                display: "block",
                marginBottom: "28px",
              }}
            >
              Start A Project
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(40px,5vw,68px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Let&apos;s Build Something
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(226,226,226,0.7)" }}>Iconic.</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(196,199,200,0.6)",
                marginBottom: "48px",
                maxWidth: "36rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Premium commercial photography for brands that refuse to be ignored.
              Every frame is a strategic decision.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                className="magnetic-btn"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#131313",
                  padding: "14px 36px",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Book A Shoot
              </Link>
              <Link
                href="/portfolio"
                className="magnetic-btn"
                style={{
                  backgroundColor: "transparent",
                  color: "#e2e2e2",
                  padding: "14px 36px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#e2e2e2";
                }}
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="w-full flex flex-col items-center gap-8 border-t relative z-20"
          style={{
            padding: "clamp(64px, 10vw, 160px) 5vw",
            backgroundColor: "#0e0e0e",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              lineHeight: "1.2",
              fontWeight: 500,
              color: "#ffffff",
            }}
          >
            VikaFilms
          </div>
          <div
            className="flex flex-wrap justify-center gap-8"
            style={{
              fontFamily: "var(--font-sans), monospace",
              fontSize: "12px",
              lineHeight: "1",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {["Privacy", "Terms", "Legal"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: "#656464",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#656464")
                }
              >
                {link}
              </a>
            ))}
          </div>
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "16px",
              lineHeight: "1.6",
              fontWeight: 400,
              color: "#e5e2e1",
              opacity: 0.5,
            }}
          >
            &copy; 2024 VikaFilms. All Rights Reserved.
          </p>
        </footer>
    </div>

    <style>{`
      .hero-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-dm-sans), sans-serif;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #fff;
        text-decoration: none;
        border: 1.5px solid rgba(255,255,255,0.55);
        border-radius: 9999px;
        padding: 13px 34px;
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        transition: background 0.28s ease, border-color 0.28s ease, color 0.28s ease, transform 0.18s cubic-bezier(0.34,1.4,0.64,1);
        will-change: transform;
      }
      .hero-cta:hover {
        background: #ffffff;
        border-color: #ffffff;
        color: #0a0a0a;
        transform: scale(1.04);
      }
      .hero-cta:active {
        background: #e8e8e8;
        border-color: #e8e8e8;
        color: #0a0a0a;
        transform: scale(0.97);
        transition-duration: 0.08s;
      }
      /* ── Mobile: simplify hero CTA ── */
      @media (max-width: 768px) {
        .hero-cta {
          font-size: 12px;
          padding: 12px 28px;
          letter-spacing: 0.14em;
        }
        /* Work cards: full width on small phones */
        .home-work-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
    </>
  );
}


