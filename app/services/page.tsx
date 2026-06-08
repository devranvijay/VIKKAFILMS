"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function ServicesPage() {
  useEffect(() => {
    // Scroll Animation Logic
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.classList.contains("studio-object")) {
            const dots =
              entry.target.parentElement?.querySelectorAll(".timeline-dot");
            if (dots) {
              const index = Array.from(
                entry.target.parentElement?.children ?? []
              ).indexOf(entry.target as Element);
              if (dots[index]) {
                dots[index].classList.remove("bg-white/20");
                dots[index].classList.add(
                  "bg-primary",
                  "shadow-[0_0_10px_#fff]"
                );
              }
            }
          }
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".studio-object, .studio-reveal")
      .forEach((el) => {
        observer.observe(el);
      });

    // Magnetic Button Micro-interaction
    const magneticBtns = document.querySelectorAll<HTMLElement>(".magnetic-btn");
    const mouseMoveHandlers: Array<(e: MouseEvent) => void> = [];
    const mouseLeaveHandlers: Array<() => void> = [];

    magneticBtns.forEach((btn, i) => {
      const moveHandler = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      };
      const leaveHandler = () => {
        btn.style.transform = "translate(0px, 0px) scale(1)";
      };
      mouseMoveHandlers[i] = moveHandler;
      mouseLeaveHandlers[i] = leaveHandler;
      btn.addEventListener("mousemove", moveHandler);
      btn.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      observer.disconnect();
      magneticBtns.forEach((btn, i) => {
        btn.removeEventListener("mousemove", mouseMoveHandlers[i]);
        btn.removeEventListener("mouseleave", mouseLeaveHandlers[i]);
      });
    };
  }, []);

  return (
    <div
      className={`text-on-surface font-body-md selection:bg-primary selection:text-surface`}
    >
      <main>
        {/* Services Section: Floating Glass Cards */}
        <section className="min-h-screen py-[160px] px-[5vw] relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 space-y-4">
              <span className="font-mono-ui text-label-caps text-on-surface-variant uppercase">
                Photography · Cinematics · Video
              </span>
              <h2 className="font-display-lg text-[48px] md:text-[84px] leading-none font-bold">
                Full-Service <br />
                Production.
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-xl pt-2">
                From a single product shot to a full cinematic brand film — VikaFilms delivers across every visual medium your brand demands.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card: Photography */}
              <div className="group relative aspect-[4/5] glass-edge rounded-lg overflow-hidden glass-shine p-[40px] flex flex-col justify-end high-blur transition-all duration-700 hover:-translate-y-4">
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-60 group-hover:opacity-80"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 20%, rgba(80,100,140,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(40,60,100,0.3) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <span className="font-mono-ui text-mono-ui text-primary-muted">
                    01 / PHOTOGRAPHY
                  </span>
                  <h3 className="font-display-lg text-[42px] leading-[1.2] font-medium">
                    Photo Shoots
                  </h3>
                  <p className="font-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    Commercial campaigns, product stills, editorial portraits, weddings, and corporate — captured on full-frame sensors with anamorphic glass.
                  </p>
                  <ul className="font-mono-ui text-[10px] tracking-widest text-on-surface-variant space-y-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <li>→ Brand &amp; Commercial</li>
                    <li>→ Wedding &amp; Events</li>
                    <li>→ Corporate &amp; Healthcare</li>
                  </ul>
                  <div className="pt-4 flex items-center gap-2 font-mono-ui text-label-caps group-hover:gap-4 transition-all">
                    <span>BOOK A SHOOT</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>

              {/* Card: Cinematics */}
              <div className="group relative aspect-[4/5] glass-edge rounded-lg overflow-hidden glass-shine p-[40px] flex flex-col justify-end high-blur transition-all duration-700 hover:-translate-y-4 lg:mt-24">
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-60 group-hover:opacity-80"
                  style={{
                    background:
                      "radial-gradient(ellipse at 70% 10%, rgba(120,80,140,0.35) 0%, transparent 60%), radial-gradient(ellipse at 20% 90%, rgba(60,40,100,0.25) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <span className="font-mono-ui text-mono-ui text-primary-muted">
                    02 / CINEMATOGRAPHY
                  </span>
                  <h3 className="font-display-lg text-[42px] leading-[1.2] font-medium">
                    Cinematics
                  </h3>
                  <p className="font-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    Narrative-driven cinematic production — brand films, wedding cinematics, and documentary stories shot in 4K with cinema glass.
                  </p>
                  <ul className="font-mono-ui text-[10px] tracking-widest text-on-surface-variant space-y-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <li>→ Brand &amp; Product Films</li>
                    <li>→ Wedding Cinematics</li>
                    <li>→ Colour Graded Delivery</li>
                  </ul>
                  <div className="pt-4 flex items-center gap-2 font-mono-ui text-label-caps group-hover:gap-4 transition-all">
                    <span>COMMISSION A FILM</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>

              {/* Card: Video Shoots */}
              <div className="group relative aspect-[4/5] glass-edge rounded-lg overflow-hidden glass-shine p-[40px] flex flex-col justify-end high-blur transition-all duration-700 hover:-translate-y-4">
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-60 group-hover:opacity-80"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(160,140,80,0.3) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(80,100,60,0.2) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 space-y-4">
                  <span className="font-mono-ui text-mono-ui text-primary-muted">
                    03 / VIDEO
                  </span>
                  <h3 className="font-display-lg text-[42px] leading-[1.2] font-medium">
                    Video Shoots
                  </h3>
                  <p className="font-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    Social reels, product demos, event coverage, and testimonial videos — platform-optimised from Instagram to broadcast.
                  </p>
                  <ul className="font-mono-ui text-[10px] tracking-widest text-on-surface-variant space-y-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <li>→ Social Media Reels</li>
                    <li>→ Product Demo &amp; Testimonial</li>
                    <li>→ Event &amp; Live Coverage</li>
                  </ul>
                  <div className="pt-4 flex items-center gap-2 font-mono-ui text-label-caps group-hover:gap-4 transition-all">
                    <span>START A PROJECT</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Studio Section: Behind The Lens */}
        <section className="min-h-screen py-[160px] bg-[#0e0e0e] relative">
          <div className="px-[5vw] max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Left: Documentary Timeline */}
            <div className="w-full md:w-1/3 relative">
              <div className="sticky top-40 space-y-12">
                <div className="space-y-2">
                  <h2 className="font-display-lg text-[42px] leading-[1.2] font-medium">
                    Behind The <br />
                    Lens
                  </h2>
                  <p className="font-mono-ui text-mono-ui text-on-surface-variant">
                    PHOTO · CINEMATICS · VIDEO
                  </p>
                </div>
                <div className="relative h-[400px]">
                  <div className="timeline-line absolute left-4 top-0" />
                  <div className="space-y-16 pl-12">
                    <div className="relative studio-object" data-index="1">
                      <div className="timeline-dot absolute -left-12 top-2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#fff]" />
                      <h4 className="font-mono-ui text-[12px] leading-none tracking-[0.2em] font-semibold mb-1">
                        OPTICS
                      </h4>
                      <p className="font-body-md text-on-surface-variant text-sm">
                        Full-frame 8K sensors, anamorphic &amp; cinema glass for both photo and film — every frame at its highest resolution.
                      </p>
                    </div>
                    <div className="relative studio-object" data-index="2">
                      <div className="timeline-dot absolute -left-12 top-2 w-3 h-3 bg-white/20 rounded-full" />
                      <h4 className="font-mono-ui text-[12px] leading-none tracking-[0.2em] font-semibold mb-1">
                        LUMINESCENCE
                      </h4>
                      <p className="font-body-md text-on-surface-variant text-sm">
                        Arri lighting arrays for stills; portable rigs and natural-light mastery for location video shoots and weddings.
                      </p>
                    </div>
                    <div className="relative studio-object" data-index="3">
                      <div className="timeline-dot absolute -left-12 top-2 w-3 h-3 bg-white/20 rounded-full" />
                      <h4 className="font-mono-ui text-[12px] leading-none tracking-[0.2em] font-semibold mb-1">
                        POST-PRODUCTION
                      </h4>
                      <p className="font-body-md text-on-surface-variant text-sm">
                        DaVinci Resolve colour grading, sound design, and motion graphics — complete end-to-end delivery for every format.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Cinematic Reveal */}
            <div className="w-full md:w-2/3 space-y-8">
              <div className="relative aspect-video glass-edge rounded-lg overflow-hidden studio-reveal group">
                <Image
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src="/portfolio/commercial/BMW-01.jpg"
                  alt="BMW luxury automotive campaign shoot"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div className="space-y-1">
                    <span className="font-mono-ui text-[10px] tracking-widest text-primary/50">
                      COMMERCIAL // BMW
                    </span>
                    <p className="font-mono-ui text-sm">
                      FOCAL LENGTH: 35MM / APERTURE: F/1.4
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="relative aspect-[3/4] glass-edge rounded-lg overflow-hidden studio-reveal group">
                  <Image
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-all duration-1000"
                    src="/portfolio/commercial/DentalChair-01.jpeg"
                    alt="Dental studio commercial shoot"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 font-mono-ui text-[10px] glass-edge px-3 py-1 rounded-full high-blur">
                    CLINICAL PRECISION
                  </div>
                </div>
                <div className="relative aspect-[3/4] glass-edge rounded-lg overflow-hidden studio-reveal group flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)" }}
                >
                  <div className="text-center p-8">
                    <span className="font-mono-ui text-[10px] tracking-widest text-white/20 block mb-3">
                      YOUR SHOOT HERE
                    </span>
                    <span className="font-mono-ui text-[9px] tracking-widest text-white/10 block">
                      Add images to<br />public/portfolio/
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 font-mono-ui text-[10px] glass-edge px-3 py-1 rounded-full high-blur text-white/30">
                    COMING SOON
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[160px] px-[5vw] text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="font-mono-ui text-label-caps text-on-surface-variant uppercase tracking-widest">
              Photography · Cinematics · Video
            </span>
            <h2 className="font-display-lg text-[48px] md:text-[84px] leading-tight font-bold">
              Let's Create <br />
              Something Real.
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">
              Whether it's a brand photoshoot, a cinematic film, or a social reel — we handle it all from concept to final cut.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="px-12 py-5 bg-primary text-on-primary rounded-full font-mono-ui tracking-widest uppercase hover:scale-105 transition-transform magnetic-btn">
                Book a Session
              </button>
              <button className="px-12 py-5 glass-edge text-primary rounded-full font-mono-ui tracking-widest uppercase hover:bg-white/5 transition-colors magnetic-btn">
                View Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-[160px] px-[5vw] flex flex-col items-center gap-8 bg-[#0e0e0e] border-t border-white/5">
        <div className="font-display-lg text-[42px] leading-[1.2] font-medium text-primary tracking-tighter">
          VikaFilms
        </div>
        <div className="flex gap-12 font-body-md text-on-tertiary-container">
          <a className="hover:text-primary transition-all" href="#">
            Privacy
          </a>
          <a className="hover:text-primary transition-all" href="#">
            Terms
          </a>
          <a className="hover:text-primary transition-all" href="#">
            Legal
          </a>
        </div>
        <div className="mt-8 font-body-md text-[16px] leading-[1.6] text-[#e5e2e1] opacity-40">
          &copy; 2024 VikaFilms. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}


