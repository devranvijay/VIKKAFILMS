"use client";

import { useState } from "react";

const EMAIL = "vikafilms15@gmail.com";
const WHATSAPP = "919309906722";
const WA_PREFILL = encodeURIComponent(
  "Hi VikaFilms! 👋 I'd like to inquire about a shoot. Could you share more details about your packages and availability?"
);

export default function FloatingContact() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "clamp(20px, 3vw, 32px)",
        right: "clamp(16px, 2.5vw, 28px)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end",
      }}
    >
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${WA_PREFILL}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setWaHovered(true)}
        onMouseLeave={() => setWaHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: waHovered ? "#25D366" : "rgba(19,19,19,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(37,211,102,0.35)",
          borderRadius: "9999px",
          padding: "11px",
          color: waHovered ? "#fff" : "#25D366",
          textDecoration: "none",
          boxShadow: waHovered
            ? "0 0 24px rgba(37,211,102,0.45), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
          transform: waHovered ? "scale(1.08)" : "scale(1)",
          overflow: "hidden",
          maxWidth: waHovered ? "200px" : "44px",
        }}
      >
        {/* WhatsApp SVG */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ flexShrink: 0 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        {/* Label — only visible on hover */}
        <span
          style={{
            fontFamily: "var(--font-sans), monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            opacity: waHovered ? 1 : 0,
            maxWidth: waHovered ? "140px" : "0",
            overflow: "hidden",
            transition: "opacity 0.2s ease, max-width 0.25s cubic-bezier(0.23,1,0.32,1)",
            paddingRight: waHovered ? "2px" : "0",
          }}
        >
          WhatsApp Us
        </span>
      </a>

      {/* Email */}
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Send us an email"
        onMouseEnter={() => setEmailHovered(true)}
        onMouseLeave={() => setEmailHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: emailHovered ? "#ffffff" : "rgba(19,19,19,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "9999px",
          padding: "11px",
          color: emailHovered ? "#131313" : "#e2e2e2",
          textDecoration: "none",
          boxShadow: emailHovered
            ? "0 0 24px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
          transform: emailHovered ? "scale(1.08)" : "scale(1)",
          overflow: "hidden",
          maxWidth: emailHovered ? "200px" : "44px",
        }}
      >
        {/* Mail SVG */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-sans), monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            opacity: emailHovered ? 1 : 0,
            maxWidth: emailHovered ? "140px" : "0",
            overflow: "hidden",
            transition: "opacity 0.2s ease, max-width 0.25s cubic-bezier(0.23,1,0.32,1)",
            paddingRight: emailHovered ? "2px" : "0",
          }}
        >
          Email Us
        </span>
      </a>
    </div>
  );
}
