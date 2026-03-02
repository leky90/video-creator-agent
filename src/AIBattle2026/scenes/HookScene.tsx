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

const AILogo: React.FC<{
  color: string;
  label: string;
  x: number;
  delay: number;
}> = ({ color, label, x, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const float = Math.sin((frame - delay) * 0.06) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 180 + float,
        transform: `translate(-50%, 0) scale(${prog})`,
        opacity: prog,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg width={80} height={80} viewBox="0 0 80 80">
        <defs>
          <radialGradient id={`logo-${label}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.5} />
          </radialGradient>
        </defs>
        <circle
          cx={40}
          cy={40}
          r={36}
          fill={`url(#logo-${label})`}
          stroke={color}
          strokeWidth={2}
        />
        <text
          x={40}
          y={46}
          textAnchor="middle"
          fill={COLORS.white}
          fontSize={18}
          fontWeight={700}
          fontFamily={FONT_FAMILY}
        >
          {label}
        </text>
      </svg>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 16,
          fontWeight: 600,
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const HookScene: React.FC = () => {
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

  const counterProgress = interpolate(frame, [40, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = Easing.out(Easing.quad)(counterProgress);
  const displayYear = Math.round(2020 + eased * 6);

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference * (1 - eased);

  const glowIntensity = interpolate(counterProgress, [0.7, 1], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProg = spring({
    frame: frame - 200,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const subtitleOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.8, 1.2]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(ellipse at 50% 60%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 700 * glowPulse,
          height: 700 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}12, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 25 }).map((_, i) => {
        const px = (i * 137.5) % 1920;
        const py = ((i * 97.3 + frame * 0.3) % 1080);
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
              backgroundColor: COLORS.accent,
              opacity: 0.12 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      {/* 3 AI Logos at top */}
      <AILogo color={COLORS.chatgpt} label="GPT-5" x={660} delay={10} />
      <AILogo color={COLORS.claude} label="Claude" x={960} delay={18} />
      <AILogo color={COLORS.gemini} label="Gemini" x={1260} delay={26} />

      {/* Center counter */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ position: "relative" }}>
          <svg width={320} height={320} viewBox="0 0 320 320">
            <circle
              cx={160}
              cy={160}
              r={140}
              fill="none"
              stroke={`${COLORS.bgLight}40`}
              strokeWidth={6}
            />
            <circle
              cx={160}
              cy={160}
              r={140}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={6}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: FONT_FAMILY,
              fontSize: 88,
              fontWeight: 800,
              color: COLORS.white,
              textShadow: `0 0 ${40 * glowIntensity}px ${COLORS.accent}60`,
            }}
          >
            {displayYear}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleProg,
            transform: `translateY(${(1 - titleProg) * 30}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.textPrimary,
            }}
          >
            AI nào{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              thống trị
            </span>
            ?
          </span>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: subtitleOpacity, textAlign: "center" }}>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              color: COLORS.textSecondary,
            }}
          >
            GPT-5 vs Claude 4 vs Gemini 2.5 Pro — Phân tích dữ liệu thực tế
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
