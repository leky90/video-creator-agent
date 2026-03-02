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

const STAT_CARDS = [
  {
    value: 68,
    suffix: "%",
    label: "Giảm chi phí vận hành",
    color: COLORS.success,
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
  {
    value: 89,
    suffix: "%",
    label: "Fortune 500 đã triển khai",
    color: COLORS.accent,
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    value: 74,
    suffix: "%",
    label: "Giảm chi phí triển khai",
    color: COLORS.purple,
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    value: 40,
    suffix: "%",
    label: "Apps tích hợp AI agent 2026",
    color: COLORS.teal,
    iconPath: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 4v6l4 2",
  },
];

export const ResultsScene: React.FC = () => {
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

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(ellipse at 50% 80%, #0f1f15, ${COLORS.bgDark})`,
      }}
    >
      {/* Gradient orbs */}
      {[
        { x: "20%", y: "30%", size: 400, color: COLORS.success },
        { x: "75%", y: "60%", size: 350, color: COLORS.accent },
        { x: "50%", y: "85%", size: 300, color: COLORS.purple },
      ].map((orb, i) => {
        const drift = Math.sin(frame * 0.02 + i * 2) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              transform: `translate(-50%, -50%) translateY(${drift}px)`,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}0c, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}

      {/* Particles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const px = (i * 137.5 + 90) % 1920;
        const py = 1080 - ((i * 79.3 + frame * 0.45) % 1200);
        const size = 2 + (i % 4);
        const color = i % 3 === 0 ? COLORS.success : i % 3 === 1 ? COLORS.accent : COLORS.purple;
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
              backgroundColor: color,
              opacity: 0.06 + (i % 4) * 0.02,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
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
          Kết quả{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.successLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ấn tượng
          </span>
        </span>
      </div>

      {/* Stat cards — 2x2 grid with spring float-in */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
          maxWidth: 1200,
        }}
      >
        {STAT_CARDS.map((card, i) => {
          const cardProg = spring({
            frame: frame - 30 - i * 25,
            fps,
            config: { damping: 12, stiffness: 80 },
          });

          const counterProg = interpolate(frame, [80 + i * 30, 260 + i * 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const counterEased = Easing.out(Easing.cubic)(counterProg);
          const displayValue = Math.round(card.value * counterEased);

          const floatY = Math.sin((frame - i * 15) * 0.04) * 4;
          const glowPulse = Math.sin((frame - i * 10) * 0.06) * 0.3 + 0.6;

          const ringCircumference = 2 * Math.PI * 55;
          const ringOffset = ringCircumference * (1 - counterEased * (card.value / 100));

          return (
            <div
              key={i}
              style={{
                opacity: cardProg,
                transform: `translateY(${(1 - cardProg) * 60 + floatY}px) scale(${0.85 + cardProg * 0.15})`,
                width: 500,
                padding: "36px 40px",
                borderRadius: 20,
                backgroundColor: `${COLORS.bgLight}40`,
                border: `1px solid ${card.color}30`,
                boxShadow: `0 0 ${20 * glowPulse}px ${card.color}15, 0 8px 32px rgba(0,0,0,0.3)`,
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: 30,
              }}
            >
              {/* Progress ring */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <svg width={130} height={130} viewBox="0 0 130 130">
                  <circle cx={65} cy={65} r={55} fill="none" stroke={`${COLORS.bgLight}60`} strokeWidth={6} />
                  <circle
                    cx={65}
                    cy={65}
                    r={55}
                    fill="none"
                    stroke={card.color}
                    strokeWidth={6}
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 65 65)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.iconPath} />
                  </svg>
                </div>
              </div>

              {/* Text content */}
              <div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 50,
                    fontWeight: 800,
                    color: card.color,
                    textShadow: `0 0 16px ${card.color}30`,
                    lineHeight: 1.1,
                  }}
                >
                  {displayValue}{card.suffix}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 18,
                    color: COLORS.textSecondary,
                    fontWeight: 500,
                    marginTop: 6,
                  }}
                >
                  {card.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gartner source tag */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          right: 80,
          opacity: interpolate(frame, [400, 440], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: COLORS.textSecondary,
            fontStyle: "italic",
          }}
        >
          Nguồn: McKinsey, Gartner 2025-2026
        </span>
      </div>
    </AbsoluteFill>
  );
};
