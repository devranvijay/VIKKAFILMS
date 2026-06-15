"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SoftAurora from "./components/SoftAurora";

export default function HomePage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const tunnelStageRef = useRef<HTMLDivElement>(null);
  const lensReflectionRef = useRef<HTMLDivElement>(null);
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
    // Intro animation
    const timer = setTimeout(() => {
      heroTitleRef.current?.classList.remove("opacity-0", "translate-y-10");
      heroSubRef.current?.classList.remove("opacity-0", "translate-y-5");
      heroBtnsRef.current?.classList.remove("opacity-0", "translate-y-5");
    }, 500);

    // Create dust particles
    const dustField = dustFieldRef.current;
    if (dustField) {
      for (let i = 0; i < 100; i++) {
        const particle = document.createElement("div");
        particle.className = "dust-particle";
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
        dustField.appendChild(particle);
      }
    }

    // Magnetic Buttons logic
    const mButtons = document.querySelectorAll<HTMLElement>(".magnetic-btn");
    const mouseMoveHandlers: Array<(e: MouseEvent) => void> = [];
    const mouseLeaveHandlers: Array<() => void> = [];

    mButtons.forEach((btn, idx) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      };
      const handleMouseLeave = () => {
        btn.style.transform = `translate(0px, 0px) scale(1)`;
      };
      mouseMoveHandlers[idx] = handleMouseMove;
      mouseLeaveHandlers[idx] = handleMouseLeave;
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    });

    // Scroll Handling
    const labels = document.querySelectorAll<HTMLElement>(".tunnel-label");

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercent =
        scrollPos / (document.documentElement.scrollHeight - windowHeight);

      const camera = cameraRef.current;
      const viewport = viewportRef.current;
      const tunnelStage = tunnelStageRef.current;
      const lensReflection = lensReflectionRef.current;

      if (!camera || !viewport || !tunnelStage || !lensReflection) return;

      if (scrollPercent < 0.2) {
        const rotation = 15 - scrollPercent * 5 * 15;
        const tilt = 10 - scrollPercent * 5 * 10;
        const scale = 1 + scrollPercent * 2;
        camera.style.transform = `rotateY(${rotation}deg) rotateX(${tilt}deg)`;
        viewport.style.transform = `scale(${scale})`;
        viewport.style.opacity = "1";
        tunnelStage.style.opacity = "0";
      } else if (scrollPercent >= 0.2 && scrollPercent < 0.8) {
        const localProgress = (scrollPercent - 0.2) / 0.6;
        const zoomScale = 3 + localProgress * 20;
        viewport.style.transform = `scale(${zoomScale})`;
        viewport.style.opacity = String(1 - localProgress * 1.5);
        tunnelStage.style.opacity = String(localProgress);
        lensReflection.style.transform = `scale(${1.5 - localProgress})`;
        lensReflection.style.opacity = String(0.4 + localProgress * 0.6);
      } else {
        viewport.style.opacity = "0";
        tunnelStage.style.opacity = "1";
      }

      labels.forEach((label) => {
        const threshold = parseFloat(label.dataset.threshold || "0");
        const diff = Math.abs(scrollPercent - threshold);
        if (diff < 0.1) {
          label.style.opacity = String(1 - diff * 10);
          label.style.transform = `translateX(${diff * 100}px)`;
        } else {
          label.style.opacity = "0";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Reveal observer for sections below the tunnel
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

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      mButtons.forEach((btn, idx) => {
        btn.removeEventListener("mousemove", mouseMoveHandlers[idx]);
        btn.removeEventListener("mouseleave", mouseLeaveHandlers[idx]);
      });
    };
  }, []);

  return (
    <div
      className={`text-[#e2e2e2]`}
      style={{ fontFamily: "var(--font-sans), sans-serif" }}
    >
      {/* 3D Scene Layer (Fixed) */}
      <div
        className="fixed-canvas overflow-hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Floating Dust Container */}
        <div
          ref={dustFieldRef}
          className="absolute inset-0 z-0"
          id="dust-field"
        />

        {/* Camera Container */}
        <div
          ref={viewportRef}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: "scale(1)",
            opacity: 1,
          }}
        >
          <div
            ref={cameraRef}
            className="camera-body relative"
            style={{
              width: "clamp(240px, 80vw, 600px)",
              height: "clamp(160px, 53vw, 400px)",
              perspective: "1000px",
            }}
          >
            {/* Base Body */}
            <div
              className="absolute inset-0 shadow-2xl specular-highlight camera-layer"
              style={{
                backgroundColor: "#353535",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.05)",
                transform: "rotateY(15deg) rotateX(10deg)",
                transition: "transform 0.1s ease-out",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%), #353535",
              }}
            >
              {/* Lens Mount */}
              <div
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "clamp(80px, 27vw, 200px)",
                  height: "clamp(80px, 27vw, 200px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#050505",
                  /* Outer ring stack */
                  boxShadow:
                    "0 0 0 3px rgba(80,82,82,0.5), 0 0 0 7px rgba(30,30,30,0.8), 0 0 0 10px rgba(60,62,62,0.3), 0 8px 32px rgba(0,0,0,0.8)",
                }}
              >
                {/* Photo — full quality, no scale upscale, no bad blend mode */}
                <div
                  ref={lensReflectionRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transition: "opacity 0.5s",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/lens-photo.jpg"
                    alt="VikaFilms shoot"
                    fill
                    sizes="400px"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Vignette — dark edges for depth */}
                <div
                  style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 50% 50%, transparent 42%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Glass specular — top-left light catch */}
                <div
                  style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 35%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Inner aperture ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: "10px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.08)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "24px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.05)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Technical Decals */}
              <div
                className="absolute"
                style={{
                  bottom: "clamp(10px, 3vw, 24px)",
                  left: "clamp(12px, 4vw, 32px)",
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "clamp(7px, 1.2vw, 10px)",
                  color: "rgba(196, 199, 200, 0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                Sensor: Full Frame 8K
                <br />
                Dynamic Range: 16 Stops
              </div>
            </div>
          </div>
        </div>

        {/* Tunnel Experience (Initially Hidden/Transparent) */}
        <div
          ref={tunnelStageRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <div
            className="relative overflow-hidden"
            style={{ width: "100vw", height: "100vh" }}
          >
            {/* Dynamically generated rings of imagery via JS */}
          </div>
        </div>
      </div>

      {/* Scrollable content wrapper */}
      <main
        className="interactive-content"
        style={{ position: "relative", zIndex: 10, height: "500vh" }}
      >
        {/* Hero Section */}
        <section
          className="w-full flex flex-col items-center justify-center relative"
          style={{
            height: "100vh",
            padding: "0 5vw",
          }}
        >
          <div className="text-center z-20" style={{ maxWidth: "64rem" }}>
            <h1
              ref={heroTitleRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(48px, 6vw, 84px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "24px",
              }}
            >
              Photography That
              <br />
              Sells Stories
            </h1>
            <p
              ref={heroSubRef}
              className="opacity-0 translate-y-5 transition-all duration-1000 ease-out"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "18px",
                lineHeight: "1.6",
                letterSpacing: "0.01em",
                fontWeight: 400,
                color: "rgba(196, 199, 200, 0.8)",
                marginBottom: "48px",
                maxWidth: "42rem",
                marginLeft: "auto",
                marginRight: "auto",
                transitionDelay: "300ms",
              }}
            >
              Commercial Visuals For Brands That Want Attention. We blend
              cinematic precision with narrative depth.
            </p>
            <div
              ref={heroBtnsRef}
              className="flex flex-wrap gap-4 justify-center opacity-0 translate-y-5 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "500ms" }}
            >
              <Link
                href="/portfolio"
                className="magnetic-btn group relative overflow-hidden glass-panel"
                style={{
                  padding: "16px 32px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: 10,
                    fontFamily: "var(--font-sans), monospace",
                    fontSize: "12px",
                    lineHeight: "1",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  View Work
                </span>
              </Link>
              <Link
                href="/contact"
                className="magnetic-btn"
                style={{
                  padding: "16px 32px",
                  backgroundColor: "#ffffff",
                  color: "#2f3131",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-sans), monospace",
                  fontSize: "12px",
                  lineHeight: "1",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "none")
                }
              >
                Book A Shoot
              </Link>
            </div>
          </div>

          {/* Bottom Indicator */}
          <div
            className="absolute flex flex-col items-center gap-2"
            style={{
              bottom: "48px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(196, 199, 200, 0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans), monospace",
                fontSize: "10px",
                letterSpacing: "0.4em",
              }}
            >
              SCROLL TO ENTER
            </span>
            <div
              style={{
                width: "1px",
                height: "48px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              }}
            />
          </div>
        </section>

        {/* Tunnel Transition Trigger Area */}
        <section
          className="w-full relative"
          style={{ height: "3072px" }}
        >
          {/* Labels floating in space during scroll */}
          <div
            className="sticky flex flex-col gap-32"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: "80rem",
              width: "100%",
              margin: "0 auto",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              boxSizing: "border-box",
            }}
          >
            {[
              {
                num: "01",
                label: "RESOLUTION",
                headline: "Infinite Detail.",
                threshold: "0.2",
              },
              {
                num: "02",
                label: "DEPTH",
                headline: "Immersive Depth.",
                threshold: "0.5",
              },
              {
                num: "03",
                label: "STORY",
                headline: "Beyond Capture.",
                threshold: "0.8",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="tunnel-label"
                data-threshold={item.threshold}
                style={{ opacity: 0 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans), monospace",
                    fontSize: "12px",
                    lineHeight: "1",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "rgba(196, 199, 200, 0.4)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  {item.num} / {item.label}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "clamp(24px, 5vw, 42px)",
                    lineHeight: "1.2",
                    fontWeight: 500,
                    color: "#e2e2e2",
                  }}
                >
                  {item.headline}
                </h3>
              </div>
            ))}
          </div>
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
              className="home-reveal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "20px",
                marginBottom: "clamp(40px,6vw,72px)",
                opacity: 0,
                transform: "translateY(32px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-sans), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(196,199,200,0.45)",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  Selected Work
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "clamp(36px,4vw,56px)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Campaigns That
                  <br />
                  Moved Markets.
                </h2>
              </div>
              <Link
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
                  transition: "color 0.2s",
                  paddingBottom: "4px",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8e9192")}
              >
                View All Work <span style={{ fontSize: "16px" }}>→</span>
              </Link>
            </div>

            {/* 3-card grid */}
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
                  delay: "0ms",
                },
                {
                  src: "https://res.cloudinary.com/deheutmgd/image/upload/q_auto,f_auto/DSC09380_aonznj",
                  category: "Commercial",
                  title: "DJI Gimbal",
                  delay: "120ms",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href="/portfolio"
                  className="home-reveal"
                  style={{
                    display: "block",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    opacity: 0,
                    transform: "translateY(40px)",
                    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}`,
                    textDecoration: "none",
                    position: "relative",
                    aspectRatio: "4/5",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                    if (img) img.style.transform = "scale(1.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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
                      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans), monospace",
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
                        fontFamily: "var(--font-display), serif",
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
      </main>
    </div>
  );
}


