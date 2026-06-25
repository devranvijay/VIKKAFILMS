"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const loadedCount = useRef(0);
  const [ready, setReady] = useState(false);

  const onImgSettle = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= n) {
      setReady(true);
      window.dispatchEvent(new CustomEvent("slider-ready"));
    }
  };

  // Fallback: reveal after 4 s even if a Cloudinary image times out
  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
      window.dispatchEvent(new CustomEvent("slider-ready"));
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const maskStyles = withMask
    ? {
        WebkitMask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
      }
    : {};

  if (n === 0) return null;

  const marqueeImages = [...images, ...images];
  const marqueeDuration = duration * 1.8 + "s";
  const rotDir = rotationDirection === "right" ? "reverse" : "normal";

  return (
    <>
      {/* ── Desktop: pure-CSS 3D rotating carousel (GPU-composited) ── */}
      <div
        className={`slider-3d-wrap ${containerClassName}`}
        style={{
          perspective,
          ...maskStyles,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <div
          className="slider-3d-inner"
          style={{ animationDuration: `${duration}s`, animationDirection: rotDir }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              loading="eager"
              decoding="async"
              onLoad={onImgSettle}
              onError={onImgSettle}
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
        </div>
      </div>

      {/* ── Mobile: CSS marquee (no 3D, smooth on all devices) ── */}
      <div
        className="slider-mob-wrap"
        style={{
          ...maskStyles,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <div
          className="slider-mob-track"
          style={{
            animationDuration: marqueeDuration,
            animationDirection: rotDir,
          }}
        >
          {marqueeImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${(i % n) + 1}`}
              loading="eager"
              decoding="async"
              className="slider-mob-img"
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop wrapper */
        .slider-3d-wrap {
          display: grid;
          width: 100%;
          min-height: 500px;
          overflow: hidden;
          place-items: center;
        }

        /* Rotating ring — pure CSS, runs on compositor thread */
        .slider-3d-inner {
          display: grid;
          place-self: center;
          transform-style: preserve-3d;
          will-change: transform;
          animation: slider3dRotate linear infinite;
          pointer-events: none;
        }
        @keyframes slider3dRotate {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }

        /* Hide mobile marquee on desktop */
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
            will-change: transform;
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
