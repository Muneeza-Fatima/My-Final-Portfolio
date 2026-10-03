import { ImageResponse } from "next/og";

// Shared preview image for links posted on WhatsApp, LinkedIn, X, etc.
export const alt = "Muneeza Fatima — Frontend Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, #2a2350 0%, #0e0f12 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#b69cff", letterSpacing: 6 }}>
          <div style={{ width: 44, height: 2, background: "#b69cff" }} />
          FRONTEND DEVELOPER · UI/UX DESIGNER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Muneeza Fatima<span style={{ color: "#b69cff" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "rgba(255,255,255,0.72)", maxWidth: 900 }}>
            Premium websites, SaaS front ends and AI chatbots — built with React & Next.js.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>
          <span>Lahore, Pakistan · Working with international clients</span>
          <span style={{ color: "#c9bcff" }}>React · Next.js · Tailwind</span>
        </div>
      </div>
    ),
    size,
  );
}
