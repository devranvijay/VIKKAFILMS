"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Slider3DProps {
  images?: string[];
  duration?: number;
  cardWidth?: string;
  cardAspectRatio?: string;
  perspective?: string;
  containerClassName?: string;
  imageClassName?: string;
  rotationDirection?: "left" | "right";
  withMask?: boolean;
}

export default function ImageSlider3D({
  images = [],
  duration = 32,
  cardWidth = "17.5em",
  cardAspectRatio = "7/10",
  perspective = "35em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
}: Slider3DProps) {
  const n = images.length;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
        WebkitMask:
          "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
      }
    : {};

  if (n === 0) return null;

  // Duplicate images for seamless CSS marquee loop on mobile
  const marqueeImages = [...images, ...images];
  const marqueeDuration = (prefersReducedMotion ? animationDuration * 3 : animationDuration * 1.8) + "s";

  return (
    <>
      {/* ── Desktop: 3D rotating carousel ── */}
      <div
        className={`slider-3d-wrap ${containerClassName}`}
        style={{ perspective: perspective, ...maskStyles }}
      >
        <motion.div
          className="grid place-self-center pointer-events-auto"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: rotationValues }}
          transition={{ duration: animationDuration, ease: "linear", repeat: Infinity }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className={`col-start-1 row-start-1 object-cover rounded-[1.5em] ${imageClassName}`}
              style={{
                width: cardWidth,
                aspectRatio: cardAspectRatio,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Mobile: 2D CSS marquee (no JS, no 3D, smooth on all devices) ── */}
      <div className="slider-mob-wrap" style={maskStyles}>
        <div
          className="slider-mob-track"
          style={{
            animationDuration: marqueeDuration,
            animationDirection: rotationDirection === "right" ? "reverse" : "normal",
          }}
        >
          {marqueeImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i % n}`}
              className="slider-mob-img"
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop carousel wrapper */
        .slider-3d-wrap {
          display: grid;
          width: 100%;
          min-height: 500px;
          overflow: hidden;
          place-items: center;
        }
        /* Mobile marquee hidden on desktop */
        .slider-mob-wrap { display: none; }

        @media (max-width: 768px) {
          .slider-3d-wrap  { display: none; }
          .slider-mob-wrap {
            display: block;
            overflow: hidden;
            width: 100%;
          }
          .slider-mob-track {
            display: flex;
            gap: 10px;
            width: max-content;
            animation: mobMarquee linear infinite;
            padding: 8px 0;
          }
          .slider-mob-img {
            width: 180px;
            aspect-ratio: 7 / 10;
            object-fit: cover;
            border-radius: 12px;
            flex-shrink: 0;
          }
          @keyframes mobMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        }
      `}</style>
    </>
  );
}
