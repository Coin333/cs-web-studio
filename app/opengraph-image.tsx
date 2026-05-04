import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} — fast, modern websites for local businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(ellipse at top, rgba(99,102,241,0.35), transparent 55%), radial-gradient(ellipse at bottom right, rgba(167,139,250,0.20), transparent 60%), #0a0a0a",
        padding: "80px 80px 64px 80px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "white",
      }}
    >
      {/* Top: logo + tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: -0.5,
              boxShadow: "0 12px 32px rgba(99,102,241,0.4)",
            }}
          >
            CS
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: -0.3,
            }}
          >
            CS Web<span style={{ color: "#71717a" }}> Studio</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 14,
            color: "#d4d4d8",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          Now booking
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.02,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "white" }}>Modern websites for</span>
          <span
            style={{
              background: "linear-gradient(135deg, #a5b4fc, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            local businesses.
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Built in 2 to 5 days. Free homepage preview. $200 to $500.
        </div>
      </div>

      {/* Bottom badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {[
          "Next.js",
          "Tailwind",
          "Vercel",
          "Mobile-first",
          "Built to convert",
        ].map((tag) => (
          <div
            key={tag}
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 16,
              color: "#e4e4e7",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
