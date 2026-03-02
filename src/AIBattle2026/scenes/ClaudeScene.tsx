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

const STATS = [
  { label: "SWE-bench", value: 80.9, max: 100, delay: 30 },
  { label: "GPQA Diamond", value: 89, max: 100, delay: 45 },
  { label: "Context Window", value: 1000, max: 2000, suffix: "K", delay: 60 },
  { label: "Output Capacity", value: 64, max: 128, suffix: "K", delay: 75 },
];

const HIGHLIGHTS = [
  { text: "Vua Coding", delay: 100 },
  { text: "8/10 Fortune 10", delay: 115 },
  { text: "300K+ doanh nghiệp", delay: 130 },
];

export const ClaudeScene: React.FC = () => {
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

  const logoProg = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.85, 1.15]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, #1a130a, ${COLORS.bgDark})`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "70%",
          width: 650 * glowPulse,
          height: 650 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.claude}10, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 22 }).map((_, i) => {
        const px = (i * 137.5 + 90) % 1920;
        const py = ((i * 97.3 + frame * 0.28) % 1080);
        const size = 2 + (i % 3);
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
              backgroundColor: COLORS.claude,
              opacity: 0.08 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      {/* Right side: Logo */}
      <div
        style={{
          position: "absolute",
          right: 140,
          top: "50%",
          transform: `translateY(-50%) scale(${logoProg})`,
          opacity: logoProg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <svg width={150} height={150} viewBox="0 0 150 150">
          <defs>
            <linearGradient id="claude-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.claude} />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="claude-glow" cx="50%" cy="50%">
              <stop
                offset="0%"
                stopColor={COLORS.claude}
                stopOpacity={0.3}
              />
              <stop offset="100%" stopColor={COLORS.claude} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={75} cy={75} r={72} fill="url(#claude-glow)" />
          <circle
            cx={75}
            cy={75}
            r={55}
            fill="none"
            stroke="url(#claude-grad)"
            strokeWidth={4}
          />
          <circle cx={75} cy={50} r={8} fill={COLORS.claude} />
          <circle cx={55} cy={85} r={6} fill={COLORS.claude} opacity={0.7} />
          <circle cx={95} cy={85} r={6} fill={COLORS.claude} opacity={0.7} />
          <circle cx={75} cy={100} r={5} fill={COLORS.claude} opacity={0.5} />
          <path
            d="M58 65 Q75 55 92 65"
            fill="none"
            stroke={COLORS.claude}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 800,
            color: COLORS.claude,
          }}
        >
          Claude 4
        </span>

        {/* Highlight badges */}
        {HIGHLIGHTS.map((h, i) => {
          const hProg = spring({
            frame: frame - h.delay,
            fps,
            config: { damping: 10, stiffness: 80 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: hProg,
                transform: `scale(${hProg})`,
                background: `linear-gradient(135deg, ${COLORS.claude}25, ${COLORS.claude}10)`,
                borderRadius: 20,
                padding: "8px 20px",
                border: `1px solid ${COLORS.claude}40`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.claude,
                }}
              >
                {h.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Left side: Horizontal bar stats */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          width: 700,
        }}
      >
        <div
          style={{
            opacity: logoProg,
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.textPrimary,
            marginBottom: 8,
          }}
        >
          <span style={{ color: COLORS.claude }}>Reasoning</span> & Coding
          King
        </div>

        {STATS.map((stat, i) => {
          const barProgress = interpolate(
            frame,
            [stat.delay, stat.delay + 60],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const eased = Easing.out(Easing.quad)(barProgress);
          const barWidth = (stat.value / stat.max) * 100 * eased;
          const displayVal = Math.round(stat.value * eased);

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 18,
                    fontWeight: 600,
                    color: COLORS.textSecondary,
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 24,
                    fontWeight: 800,
                    color: COLORS.white,
                  }}
                >
                  {displayVal}
                  {stat.suffix || "%"}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 18,
                  backgroundColor: `${COLORS.bgLight}50`,
                  borderRadius: 9,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${COLORS.claude}, #fbbf24)`,
                    borderRadius: 9,
                    boxShadow: `0 0 12px ${COLORS.claude}40`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Weakness note */}
        <div
          style={{
            opacity: interpolate(frame, [200, 230], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background: `${COLORS.danger}12`,
            borderRadius: 12,
            padding: "10px 18px",
            border: `1px solid ${COLORS.danger}25`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 15,
              color: COLORS.danger,
              fontWeight: 500,
            }}
          >
            ⚠ Giá cao nhất ($15/$75 per 1M tokens) · Safety filter đôi khi quá
            thận trọng
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
