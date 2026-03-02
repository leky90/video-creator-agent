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

const FEATURES = [
  {
    title: "800M+ users/tuần",
    desc: "Hệ sinh thái lớn nhất",
    fromX: 400,
    fromY: -200,
    delay: 30,
  },
  {
    title: "Multimodal 84%",
    desc: "MMMU benchmark",
    fromX: 400,
    fromY: -80,
    delay: 45,
  },
  {
    title: "-45% Hallucination",
    desc: "So với GPT-4",
    fromX: 400,
    fromY: 40,
    delay: 60,
  },
  {
    title: "Plugin ecosystem",
    desc: "Custom GPTs, API",
    fromX: 400,
    fromY: 160,
    delay: 75,
  },
];

const WEAKNESSES = [
  { text: "Context: 128K (nhỏ nhất)", delay: 180 },
  { text: "Chi phí API cao", delay: 195 },
];

export const ChatGPTScene: React.FC = () => {
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
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.8, 1.3]
  );

  const counterProgress = interpolate(frame, [100, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const userCount = Math.round(
    Easing.out(Easing.quad)(counterProgress) * 800
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(135deg, ${COLORS.bgDark}, #0a1a15)`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "25%",
          width: 600 * glowPulse,
          height: 600 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.chatgpt}12, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const px = (i * 137.5 + 60) % 1920;
        const py = ((i * 97.3 + frame * 0.35) % 1080);
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
              backgroundColor: COLORS.chatgpt,
              opacity: 0.1 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      {/* Left side: Logo + Stats */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: `translateY(-50%) scale(${logoProg})`,
          opacity: logoProg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* OpenAI-style logo */}
        <svg width={160} height={160} viewBox="0 0 160 160">
          <defs>
            <radialGradient id="gpt-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={COLORS.chatgpt} stopOpacity={0.4} />
              <stop offset="100%" stopColor={COLORS.chatgpt} stopOpacity={0} />
            </radialGradient>
            <linearGradient id="gpt-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.chatgpt} />
              <stop offset="100%" stopColor="#0d8c6b" />
            </linearGradient>
          </defs>
          <circle cx={80} cy={80} r={78} fill="url(#gpt-glow)" />
          <circle
            cx={80}
            cy={80}
            r={60}
            fill="none"
            stroke="url(#gpt-grad)"
            strokeWidth={4}
          />
          <path
            d="M80 35 L80 65 M80 95 L80 125 M35 80 L65 80 M95 80 L125 80 M55 55 L70 70 M90 90 L105 105 M105 55 L90 70 M70 90 L55 105"
            stroke={COLORS.chatgpt}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={80} cy={80} r={12} fill={COLORS.chatgpt} />
        </svg>

        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.chatgpt,
          }}
        >
          ChatGPT
        </span>

        {/* User counter */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.white,
              textShadow: `0 0 20px ${COLORS.chatgpt}50`,
            }}
          >
            {userCount}M+
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.textSecondary,
            }}
          >
            users/tuần
          </span>
        </div>
      </div>

      {/* Right side: Feature cards */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 520,
        }}
      >
        {FEATURES.map((feat, i) => {
          const prog = spring({
            frame: frame - feat.delay,
            fps,
            config: { damping: 12, stiffness: 60 },
          });
          const currentX = interpolate(prog, [0, 1], [feat.fromX, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: prog,
                transform: `translateX(${currentX}px)`,
                background: `linear-gradient(145deg, ${COLORS.bgMid}ee, ${COLORS.bgLight}88)`,
                borderRadius: 16,
                padding: "18px 24px",
                border: `1px solid ${COLORS.chatgpt}30`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                {feat.title}
              </span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 15,
                  color: COLORS.textSecondary,
                }}
              >
                {feat.desc}
              </span>
            </div>
          );
        })}

        {/* Weaknesses */}
        {WEAKNESSES.map((w, i) => {
          const wProg = spring({
            frame: frame - w.delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          return (
            <div
              key={`w-${i}`}
              style={{
                opacity: wProg,
                transform: `translateX(${(1 - wProg) * 60}px)`,
                background: `linear-gradient(145deg, ${COLORS.danger}15, ${COLORS.bgMid}ee)`,
                borderRadius: 12,
                padding: "12px 20px",
                border: `1px solid ${COLORS.danger}30`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: COLORS.danger,
                  fontWeight: 600,
                }}
              >
                ⚠ {w.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
