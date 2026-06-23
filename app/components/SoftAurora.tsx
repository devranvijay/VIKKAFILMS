"use client";

import React from "react";

interface SoftAuroraProps {
  speed?: number;
  scale?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  noiseFrequency?: number;
  noiseAmplitude?: number;
  bandHeight?: number;
  bandSpread?: number;
  octaveDecay?: number;
  layerOffset?: number;
  colorSpeed?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
}

export default function SoftAurora({
  color1 = "#c8b89a",
  color2 = "#6b4c8a",
  brightness = 0.85,
}: SoftAuroraProps) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        className="aurora-band aurora-band-1"
        style={{ "--ac1": color1, opacity: brightness * 0.42 } as React.CSSProperties}
      />
      <div
        className="aurora-band aurora-band-2"
        style={{ "--ac2": color2, opacity: brightness * 0.38 } as React.CSSProperties}
      />
      <style>{`
        .aurora-band {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
        }
        .aurora-band-1 {
          background: radial-gradient(ellipse at 25% 40%, var(--ac1, #c8b89a) 0%, transparent 55%);
          animation: auroraA 13s ease-in-out infinite alternate;
        }
        .aurora-band-2 {
          background: radial-gradient(ellipse at 75% 60%, var(--ac2, #6b4c8a) 0%, transparent 50%);
          animation: auroraB 17s ease-in-out infinite alternate;
        }
        @keyframes auroraA {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(6%, 4%) scale(1.1); }
        }
        @keyframes auroraB {
          from { transform: translate(0, 0) scale(1.05); }
          to   { transform: translate(-5%, -3%) scale(1); }
        }
        @media (max-width: 768px) {
          .aurora-band { animation: none; will-change: auto; filter: blur(60px); }
        }
      `}</style>
    </div>
  );
}
