import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const CATEGORIES = [
  {
    label: "Coding",
    scores: [
      { name: "ChatGPT", value: 75, color: COLORS.chatgpt },
      { name: "Claude", value: 81, color: COLORS.claude },
      { name: "Gemini", value: 70, color: COLORS.gemini },
    ],
    delay: 30,
  },
  {
    label: "Reasoning",
    scores: [
      { name: "ChatGPT", value: 85, color: COLORS.chatgpt },
      { name: "Claude", value: 89, color: COLORS.claude },
      { name: "Gemini", value: 87, color: COLORS.gemini },
    ],
    delay: 60,
  },
  {
    label: "Multimodal",
    scores: [
      { name: "ChatGPT", value: 84, color: COLORS.chatgpt },
      { name: "Claude", value: 72, color: COLORS.claude },
      { name: "Gemini", value: 78, color: COLORS.gemini },
    ],
    delay: 90,
  },
  {
    label: "Giá (rẻ = cao)",
    scores: [
      { name: "ChatGPT", value: 40, color: COLORS.chatgpt },
      { name: "Claude", value: 30, color: COLORS.claude },
      { name: "Gemini", value: 95, color: COLORS.gemini },
    ],
    delay: 120,
  },
  {
    label: "Context",
    scores: [
      { name: "ChatGPT", value: 32, color: COLORS.chatgpt },
      { name: "Claude", value: 50, color: COLORS.claude },
      { name: "Gemini", value: 100, color: COLORS.gemini },
    ],
    delay: 150,
  },
];

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: duration } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const verdictOpacity = interpolate(frame, [350, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const verdictProg = spring({
    frame: frame - 350,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(145deg, ${COLORS.bgDark}, #0e0a1a)`,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}08, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const px = (i * 137.5 + 20) % 1920;
        const py = ((i * 97.3 + frame * 0.2) % 1080);
        const size = 2 + (i % 2);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: COLORS.accent,
              opacity: 0.08 + (i % 3) * 0.03,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 30}px)`,
          opacity: titleProg,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          So sánh{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.chatgpt}, ${COLORS.claude}, ${COLORS.gemini})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            trực tiếp
          </span>
        </span>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
          opacity: titleProg,
        }}
      >
        {[
          { name: "ChatGPT", color: COLORS.chatgpt },
          { name: "Claude", color: COLORS.claude },
          { name: "Gemini", color: COLORS.gemini },
        ].map((item) => (
          <div
            key={item.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                backgroundColor: item.color,
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 16,
                color: COLORS.textSecondary,
                fontWeight: 600,
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart rows */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 120,
          right: 120,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {CATEGORIES.map((cat, ci) => {
          const catProgress = interpolate(
            frame,
            [cat.delay, cat.delay + 50],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const eased = Easing.out(Easing.quad)(catProgress);

          return (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  opacity: catProgress,
                }}
              >
                {cat.label}
              </span>
              <div style={{ display: "flex", gap: 12 }}>
                {cat.scores.map((s, si) => (
                  <div
                    key={si}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        height: 28,
                        backgroundColor: `${COLORS.bgLight}40`,
                        borderRadius: 8,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: `${s.value * eased}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${s.color}cc, ${s.color})`,
                          borderRadius: 8,
                          boxShadow:
                            eased > 0.5
                              ? `0 0 10px ${s.color}30`
                              : "none",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontFamily: FONT_FAMILY,
                          fontSize: 13,
                          fontWeight: 700,
                          color: COLORS.white,
                          opacity: eased,
                        }}
                      >
                        {Math.round(s.value * eased)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: `translateX(-50%) scale(${verdictProg})`,
          opacity: verdictOpacity,
          textAlign: "center",
          background: `linear-gradient(135deg, ${COLORS.bgMid}ee, ${COLORS.bgLight}88)`,
          borderRadius: 20,
          padding: "20px 48px",
          border: `1px solid ${COLORS.accent}30`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.textPrimary,
          }}
        >
          Không có AI hoàn hảo —{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            lựa chọn tốt nhất phụ thuộc nhu cầu
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
