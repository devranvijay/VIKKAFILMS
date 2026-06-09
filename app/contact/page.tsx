"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);

  // Magnetic button effect
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-btn");
    const cleanup: Array<() => void> = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
      };
      const leave = () => {
        btn.style.transform = "translate(0px,0px) scale(1)";
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      cleanup.push(() => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(false);
    const btn = submitBtnRef.current;
    if (btn) {
      btn.textContent = "SENDING…";
      btn.style.opacity = "0.7";
      btn.disabled = true;
    }

    const form = e.currentTarget;
    const data = {
      name: (form.querySelector("#name") as HTMLInputElement)?.value,
      company: (form.querySelector("#company") as HTMLInputElement)?.value,
      email: (form.querySelector("#email") as HTMLInputElement)?.value,
      phone: (form.querySelector("#phone") as HTMLInputElement)?.value,
      shootType: (form.querySelector("#shoot-type") as HTMLSelectElement)?.value,
      budget: (form.querySelector("#budget") as HTMLInputElement)?.value,
      details: (form.querySelector("#details") as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
      if (btn) {
        btn.textContent = "TRY AGAIN";
        btn.style.opacity = "1";
        btn.disabled = false;
      }
    }
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-hanken), sans-serif",
        color: "#e2e2e2",
        backgroundColor: "#0e0e0e",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Decorative iris background — purely visual, no scroll gate */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: 0.04,
        }}
      >
        <svg viewBox="0 0 1000 1000" style={{ width: "100vw", height: "100vw", maxWidth: "none", fill: "#ffffff" }}>
          {[0, 60, 120, 180, 240, 300].map((rot, i) => (
            <path
              key={i}
              d="M500,0 L1000,0 L1000,500 C1000,500 700,400 500,500 Z"
              style={{ transform: `rotate(${rot}deg)`, transformOrigin: "center" }}
            />
          ))}
        </svg>
      </div>

      <main style={{ position: "relative", zIndex: 10 }}>
        {/* ── Page Header ───────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: "clamp(100px, 14vw, 140px)",
            paddingBottom: "clamp(40px, 6vw, 64px)",
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
              fontWeight: 600,
              color: "#8e9192",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            VikaFilms Studio — 05 / Contact
          </span>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(42px, 6vw, 84px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "24px",
            }}
          >
            Initiate<br />Production
          </h1>
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "18px",
              lineHeight: 1.65,
              color: "#8e9192",
              maxWidth: "480px",
            }}
          >
            Tell us about your vision. We respond within 24 hours to every serious inquiry.
          </p>
        </section>

        {/* ── Two-column layout: Info + Form ────────────────────────── */}
        <section
          style={{
            paddingBottom: "120px",
            paddingLeft: "5vw",
            paddingRight: "5vw",
            maxWidth: "80rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* ── Left: Studio Info ───────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                {
                  icon: "mail",
                  label: "EMAIL",
                  value: "vikafilms15@gmail.com",
                  href: "mailto:vikafilms15@gmail.com",
                },
                {
                  icon: "call",
                  label: "WHATSAPP",
                  value: "+91 93099 06722",
                  href: "https://wa.me/919309906722",
                },
                {
                  icon: "location_on",
                  label: "STUDIO",
                  value: "Mumbai, India",
                  href: "#",
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      fontWeight: 600,
                      color: "#444748",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      {icon}
                    </span>
                    {label}
                  </span>
                  <a
                    href={href}
                    style={{
                      fontFamily: "var(--font-hanken), sans-serif",
                      fontSize: "16px",
                      color: "#c4c7c8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#c4c7c8")}
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  fontWeight: 600,
                  color: "#444748",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Follow
              </span>
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/vikafilms.in?igsh=MWkyc2hoMTBiM3VhMA%3D%3D&utm_source=qr",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/vivek-kamble-65a39b238?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
                },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "#8e9192",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8e9192")}
                >
                  {label} ↗
                </a>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* Quick nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  fontWeight: 600,
                  color: "#444748",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Also Explore
              </span>
              {[
                { label: "Our Work", href: "/portfolio" },
                { label: "Services", href: "/services" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-geist), monospace",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: "#8e9192",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8e9192")}
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Contact Form ─────────────────────────────────── */}
          <div
            className="glass-card"
            style={{
              padding: "clamp(24px, 4vw, 56px) clamp(20px, 3.5vw, 48px)",
              borderRadius: "8px",
            }}
          >
            {submitted ? (
              /* Success state */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "24px",
                  minHeight: "400px",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "64px", color: "#ffffff", opacity: 0.4 }}
                >
                  check_circle
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "36px",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  Received
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-hanken), sans-serif",
                    fontSize: "16px",
                    color: "#8e9192",
                    maxWidth: "360px",
                    lineHeight: 1.6,
                  }}
                >
                  Your inquiry has been transmitted. Our studio will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "40px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.4em",
                      fontWeight: 600,
                      color: "#8e9192",
                      display: "block",
                      marginBottom: "12px",
                      textTransform: "uppercase",
                    }}
                  >
                    Booking Request
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "32px",
                      lineHeight: 1.2,
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    Tell us about your project
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "28px" }}
                >
                  {/* Row 1: Name + Company */}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
                    className="form-grid"
                  >
                    <Field id="name" label="Full Name" type="text" required />
                    <Field id="company" label="Company" type="text" />
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
                    className="form-grid"
                  >
                    <Field id="email" label="Email Address" type="email" required />
                    <Field id="phone" label="Phone (optional)" type="tel" />
                  </div>

                  {/* Row 3: Shoot Type + Budget */}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
                    className="form-grid"
                  >
                    {/* Shoot Type select */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label
                        htmlFor="shoot-type"
                        style={{
                          fontFamily: "var(--font-geist), monospace",
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          fontWeight: 600,
                          color: "#8e9192",
                          textTransform: "uppercase",
                        }}
                      >
                        Shoot Type
                      </label>
                      <select
                        id="shoot-type"
                        required
                        defaultValue=""
                        style={{
                          width: "100%",
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.15)",
                          paddingTop: "8px",
                          paddingBottom: "12px",
                          color: "#e2e2e2",
                          fontFamily: "var(--font-hanken), sans-serif",
                          fontSize: "15px",
                          outline: "none",
                          appearance: "none",
                          WebkitAppearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled style={{ backgroundColor: "#1f1f1f" }}>
                          Select…
                        </option>
                        <option value="commercial" style={{ backgroundColor: "#1f1f1f" }}>
                          Commercial Campaign
                        </option>
                        <option value="product" style={{ backgroundColor: "#1f1f1f" }}>
                          3D Product Story
                        </option>
                        <option value="editorial" style={{ backgroundColor: "#1f1f1f" }}>
                          Editorial Narrative
                        </option>
                        <option value="event" style={{ backgroundColor: "#1f1f1f" }}>
                          Event Coverage
                        </option>
                        <option value="other" style={{ backgroundColor: "#1f1f1f" }}>
                          Other
                        </option>
                      </select>
                    </div>

                    <Field id="budget" label="Approx. Budget" type="text" placeholder="e.g. ₹25,000 – ₹50,000" />
                  </div>

                  {/* Project Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                      htmlFor="details"
                      style={{
                        fontFamily: "var(--font-geist), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                        color: "#8e9192",
                        textTransform: "uppercase",
                      }}
                    >
                      Project Details
                    </label>
                    <textarea
                      id="details"
                      required
                      rows={4}
                      placeholder="Describe your vision, timeline, and any references…"
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                        paddingTop: "8px",
                        paddingBottom: "12px",
                        paddingLeft: 0,
                        paddingRight: 0,
                        color: "#e2e2e2",
                        fontFamily: "var(--font-hanken), sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        outline: "none",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#ffffff")}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)")}
                    />
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <p style={{
                      fontFamily: "var(--font-geist), monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "#ffb4ab",
                      textAlign: "center",
                    }}>
                      Something went wrong. Please try again or WhatsApp us directly.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    className="magnetic-btn"
                    style={{
                      width: "100%",
                      marginTop: "8px",
                      backgroundColor: "#ffffff",
                      color: "#131313",
                      fontFamily: "var(--font-geist), monospace",
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      fontWeight: 700,
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      border: "none",
                      borderRadius: "2px",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.2)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    Start Your Project
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "48px",
            paddingBottom: "48px",
            paddingLeft: "5vw",
            paddingRight: "5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            position: "relative",
            zIndex: 10,
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
              fontFamily: "var(--font-geist), monospace",
              fontSize: "11px",
              color: "#444748",
              letterSpacing: "0.1em",
            }}
          >
            © 2024 VikaFilms. All Rights Reserved.
          </span>
        </footer>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Reusable floating-label field ─────────────────────────────────── */
function Field({
  id,
  label,
  type,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-geist), monospace",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: 600,
          color: "#8e9192",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: "#ffffff", marginLeft: "4px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder ?? ""}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          paddingTop: "8px",
          paddingBottom: "12px",
          paddingLeft: 0,
          paddingRight: 0,
          color: "#e2e2e2",
          fontFamily: "var(--font-hanken), sans-serif",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#ffffff")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)")}
      />
    </div>
  );
}
