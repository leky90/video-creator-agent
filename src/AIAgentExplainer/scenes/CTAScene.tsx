import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_CTA_DURATION } from "../constants";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_CTA_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textReveal = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const buttonGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.4, 1],
  );

  const subtextOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #050d1a, ${COLORS.bgDark})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {Array.from({ length: 30 }).map((_, i) => {
        const px = ((i * 137.5 + 50) % 1920);
        const speed = 0.5 + (i % 5) * 0.3;
        const py = 1080 - ((frame * speed + i * 80) % 1200);
        const size = 2 + (i % 3);
        const particleOpacity = interpolate(
          py,
          [0, 200, 800, 1080],
          [0, 0.4, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
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
              backgroundColor:
                i % 3 === 0
                  ? COLORS.accent
                  : i % 3 === 1
                    ? COLORS.success
                    : COLORS.accentLight,
              opacity: particleOpacity,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ opacity: textReveal, textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.3,
            }}
          >
            AI Agent — Cuộc{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              cách mạng
            </span>
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.3,
            }}
          >
            trong cách làm việc
          </div>
        </div>

        <div style={{ transform: `scale(${buttonScale})` }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              borderRadius: 60,
              padding: "22px 56px",
              boxShadow: `0 0 ${40 * buttonGlow}px ${COLORS.accent}60`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              Thử nghiệm ngay
            </span>
            <span style={{ fontSize: 28, color: COLORS.white }}>→</span>
          </div>
        </div>

        <div style={{ opacity: subtextOpacity, textAlign: "center" }}>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              color: COLORS.textSecondary,
            }}
          >
            Like, Subscribe & Chia sẻ nếu bạn thấy hữu ích!
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}10, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
