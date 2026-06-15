import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "VikaFilms – Commercial Photography & Brand Films, Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CLOUD = "deheutmgd";
const BMW_BG = `https://res.cloudinary.com/${CLOUD}/image/upload/w_1200,h_630,c_fill,g_auto,q_70/DSC01488_qx6a1n`;

export default async function Image() {
  // Read logo from public folder and encode as base64 data URL
  const logoBuffer = readFileSync(join(process.cwd(), "public/vikafilms-logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: 1200,
          height: 630,
          position: "relative",
          background: "#080808",
          fontFamily: "serif",
        }}
      >
        {/* BMW background image */}
        <img
          src={BMW_BG}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            opacity: 0.22,
          }}
        />

        {/* Gradient overlay — strong left, fade right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.45) 100%)",
            display: "flex",
          }}
        />

        {/* Subtle gold radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 480,
            height: 480,
            background:
              "radial-gradient(ellipse at 100% 0%, rgba(200,184,154,0.09) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* ── Content ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          {/* Top row: logo + site URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <img
              src={logoSrc}
              width={72}
              height={72}
              style={{ objectFit: "contain" }}
            />

            {/* URL chip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9999,
                padding: "8px 22px",
                fontSize: 15,
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
              }}
            >
              vikafilms.com
            </div>
          </div>

          {/* Bottom block: category · title · tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Category overline */}
            <div
              style={{
                display: "flex",
                fontSize: 14,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(200,184,154,0.75)",
                marginBottom: 20,
                fontFamily: "monospace",
              }}
            >
              Commercial Photography · Brand Films · Product Shoots
            </div>

            {/* Brand name */}
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 0.9,
                letterSpacing: "-3px",
                marginBottom: 28,
              }}
            >
              VikaFilms
            </div>

            {/* Tagline */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 22,
                color: "rgba(196,199,200,0.5)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  display: "flex",
                  width: 40,
                  height: 1,
                  background: "rgba(200,184,154,0.5)",
                }}
              />
              Crafting visual stories that move people.
            </div>
          </div>
        </div>

        {/* Bottom-right: Mumbai label */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 72,
            display: "flex",
            fontSize: 12,
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.14)",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Mumbai, India
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
