import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

export const CTAScene: React.FC = () => {
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

  const textReveal = interpolate(frame, [10, 45], [0, 1], {
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
    [0.4, 1]
  );

  const subtextOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questionProg = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(180deg, #06081a, ${COLORS.bgDark})`,
      }}
    >
      {/* Rising particles */}
      {Array.from({ length: 35 }).map((_, i) => {
        const px = ((i * 137.5 + 50) % 1920);
        const speed = 0.5 + (i % 5) * 0.3;
        const py = 1080 - ((frame * speed + i * 80) % 1300);
        const size = 2 + (i % 3);
        const colors = [COLORS.accent, COLORS.chatgpt, COLORS.claude, COLORS.gemini, COLORS.success];
        const particleOpacity = interpolate(
          py,
          [0, 200, 800, 1080],
          [0, 0.4, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
              backgroundColor: colors[i % colors.length],
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}0a, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        {/* Headline */}
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
            Bạn chọn{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.chatgpt}, ${COLORS.claude}, ${COLORS.gemini})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI nào
            </span>
            ?
          </div>
        </div>

        {/* 3 AI buttons row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            opacity: textReveal,
          }}
        >
          {[
            { name: "ChatGPT", color: COLORS.chatgpt },
            { name: "Claude", color: COLORS.claude },
            { name: "Gemini", color: COLORS.gemini },
          ].map((ai, i) => {
            const aiProg = spring({
              frame: frame - 30 - i * 10,
              fps,
              config: { damping: 10, stiffness: 80 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: aiProg,
                  transform: `scale(${aiProg}) translateY(${(1 - aiProg) * 20}px)`,
                  background: `linear-gradient(135deg, ${ai.color}30, ${ai.color}15)`,
                  borderRadius: 16,
                  padding: "14px 28px",
                  border: `2px solid ${ai.color}50`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 22,
                    fontWeight: 700,
                    color: ai.color,
                  }}
                >
                  {ai.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subscribe CTA button */}
        <div style={{ transform: `scale(${buttonScale})` }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              borderRadius: 60,
              padding: "22px 56px",
              boxShadow: `0 0 ${40 * buttonGlow}px ${COLORS.accent}50`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Play/subscribe SVG */}
            <svg width={28} height={28} viewBox="0 0 28 28">
              <rect
                x={2}
                y={2}
                width={24}
                height={24}
                rx={6}
                fill="none"
                stroke={COLORS.white}
                strokeWidth={2}
              />
              <polygon
                points="11,8 22,14 11,20"
                fill={COLORS.white}
              />
            </svg>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              Subscribe
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div style={{ opacity: subtextOpacity, textAlign: "center" }}>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              color: COLORS.textSecondary,
            }}
          >
            Like & comment "bạn chọn AI nào?" bên dưới
          </span>
        </div>

        {/* Question prompt */}
        <div
          style={{
            opacity: questionProg,
            transform: `translateY(${(1 - questionProg) * 20}px)`,
            background: `${COLORS.bgMid}cc`,
            borderRadius: 16,
            padding: "14px 32px",
            border: `1px solid ${COLORS.accent}30`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.accentLight,
              fontWeight: 500,
            }}
          >
            Hẹn gặp lại ở video tiếp theo! 🎬
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
