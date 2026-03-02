import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const ORBIT_ITEMS = [
  { label: "2M Tokens", angle: 0, radius: 260, delay: 25, color: COLORS.gemini },
  { label: "14x Rẻ hơn", angle: 60, radius: 280, delay: 35, color: COLORS.success },
  { label: "Google Search", angle: 120, radius: 250, delay: 45, color: COLORS.gemini },
  { label: "Android", angle: 180, radius: 270, delay: 55, color: "#34a853" },
  { label: "Chrome", angle: 240, radius: 260, delay: 65, color: "#fbbc04" },
  { label: "25% Market", angle: 300, radius: 275, delay: 75, color: COLORS.secondary },
];

export const GeminiScene: React.FC = () => {
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
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const orbitAngle = interpolate(frame, [0, duration], [0, 45]);

  const glowPulse = interpolate(
    Math.sin(frame * 0.045),
    [-1, 1],
    [0.85, 1.2]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(200deg, ${COLORS.bgDark}, #0a0e22)`,
      }}
    >
      {/* Gradient mesh */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "45%",
          width: 800 * glowPulse,
          height: 800 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gemini}0c, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "60%",
          width: 400,
          height: 400,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, #34a85308, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const px = (i * 137.5 + 45) % 1920;
        const py = ((i * 97.3 + frame * 0.3) % 1080);
        const size = 2 + (i % 3);
        const colors = [COLORS.gemini, "#34a853", "#fbbc04", COLORS.secondary];
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
              opacity: 0.1 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 100,
          opacity: logoProg,
          transform: `translateY(${(1 - logoProg) * 30}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          <span style={{ color: COLORS.gemini }}>Gemini 2.5 Pro</span> — Ngựa
          ô thực sự
        </span>
      </div>

      {/* Central Gemini logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "45%",
          transform: `translate(-50%, -50%) scale(${logoProg})`,
          opacity: logoProg,
        }}
      >
        <svg width={120} height={120} viewBox="0 0 120 120">
          <defs>
            <linearGradient id="gem-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.gemini} />
              <stop offset="33%" stopColor="#34a853" />
              <stop offset="66%" stopColor="#fbbc04" />
              <stop offset="100%" stopColor={COLORS.secondary} />
            </linearGradient>
          </defs>
          <circle
            cx={60}
            cy={60}
            r={55}
            fill="none"
            stroke="url(#gem-grad)"
            strokeWidth={4}
          />
          {/* 4-point star */}
          <path
            d="M60 20 L68 50 L100 60 L68 70 L60 100 L52 70 L20 60 L52 50 Z"
            fill="url(#gem-grad)"
            opacity={0.9}
          />
        </svg>
      </div>

      {/* Orbit ring */}
      <svg
        width={700}
        height={700}
        viewBox="0 0 700 700"
        style={{
          position: "absolute",
          top: "50%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          opacity: logoProg * 0.3,
        }}
      >
        <circle
          cx={350}
          cy={350}
          r={260}
          fill="none"
          stroke={COLORS.gemini}
          strokeWidth={1}
          strokeDasharray="8 12"
        />
      </svg>

      {/* Orbiting items */}
      {ORBIT_ITEMS.map((item, i) => {
        const itemProg = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 12, stiffness: 60 },
        });
        const angleRad =
          ((item.angle + orbitAngle) * Math.PI) / 180;
        const cx = 0.45 * 1920 + Math.cos(angleRad) * item.radius;
        const cy = 0.5 * 1080 + Math.sin(angleRad) * item.radius * 0.65;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              transform: `translate(-50%, -50%) scale(${itemProg})`,
              opacity: itemProg,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${item.color}22, ${COLORS.bgMid}ee)`,
                borderRadius: 16,
                padding: "12px 22px",
                border: `1px solid ${item.color}40`,
                boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${item.color}20`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 17,
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Growth stat */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 180,
          opacity: interpolate(frame, [150, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.textSecondary,
            }}
          >
            Thị phần tăng trưởng
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                color: COLORS.textSecondary,
                textDecoration: "line-through",
              }}
            >
              15%
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 48,
                fontWeight: 800,
                color: COLORS.success,
                textShadow: `0 0 20px ${COLORS.success}40`,
              }}
            >
              25%
            </span>
          </div>
        </div>
      </div>

      {/* Weakness */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 110,
          opacity: interpolate(frame, [220, 250], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: `${COLORS.danger}10`,
          borderRadius: 10,
          padding: "8px 16px",
          border: `1px solid ${COLORS.danger}20`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: COLORS.danger,
            fontWeight: 500,
          }}
        >
          ⚠ Coding yếu hơn Claude · Bỏ sót edge cases
        </span>
      </div>
    </AbsoluteFill>
  );
};
