import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AUDIO_SEGMENTS,
  COLORS,
  CTA_DURATION,
  FONT_FAMILY,
} from "../constants";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [CTA_DURATION - 10, CTA_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const textReveal = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const buttonGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.4, 1],
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #0a1628)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Upward floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const px = ((i * 137.5 + 50) % 1920);
        const speed = 0.5 + (i % 5) * 0.3;
        const py = 1080 - ((frame * speed + i * 80) % 1200);
        const size = 2 + (i % 3);
        const particleOpacity = interpolate(py, [0, 200, 800, 1080], [0, 0.4, 0.4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
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
              backgroundColor: i % 3 === 0 ? COLORS.accent : COLORS.success,
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* Main CTA content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Headline */}
        <div style={{ opacity: textReveal }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 56,
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.3,
            }}
          >
            Start with{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ONE
            </span>{" "}
            tool.
          </div>
        </div>

        {/* CTA button */}
        <div
          style={{
            transform: `scale(${buttonScale})`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              borderRadius: 60,
              padding: "20px 52px",
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
              Automate Today
            </span>
            <span style={{ fontSize: 28 }}>→</span>
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: interpolate(frame, [50, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: COLORS.textSecondary,
            }}
          >
            Your future self will thank you.
          </span>
        </div>
      </div>

      <SubtitleSequence segments={AUDIO_SEGMENTS.cta} />
    </AbsoluteFill>
  );
};
