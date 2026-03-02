import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const NOTIF_ITEMS = [
  { label: '"GPT-5 tốt nhất!"', x: -340, y: -180, delay: 15, color: COLORS.chatgpt },
  { label: '"Claude vô đối!"', x: 320, y: -140, delay: 22, color: COLORS.claude },
  { label: "Benchmark mới!", x: -300, y: 130, delay: 30, color: COLORS.secondary },
  { label: '"Gemini rẻ nhất"', x: 360, y: 160, delay: 38, color: COLORS.gemini },
  { label: "So sánh sai lệch", x: -120, y: -270, delay: 45, color: COLORS.danger },
  { label: '"AI nào cho coding?"', x: 160, y: 260, delay: 52, color: COLORS.accent },
  { label: "Quá nhiều lựa chọn!", x: -380, y: -20, delay: 60, color: COLORS.secondary },
];

export const ProblemScene: React.FC = () => {
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

  const shake =
    frame > 100
      ? Math.sin(frame * 0.8) *
        interpolate(frame, [100, 250], [0, 5], {
          extrapolateRight: "clamp",
        })
      : 0;

  const titleProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(180deg, ${COLORS.bgDark}, #110a1a)`,
      }}
    >
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const px = (i * 137.5 + 30) % 1920;
        const py = ((i * 97.3 + frame * 0.25) % 1080);
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
              backgroundColor: COLORS.secondary,
              opacity: 0.1 + (i % 4) * 0.03,
            }}
          />
        );
      })}

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondary}10, transparent 70%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Quá nhiều lựa chọn,{" "}
          <span style={{ color: COLORS.secondary }}>quá nhiều nhiễu</span>
        </span>
      </div>

      {/* Central confused person SVG */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateX(${shake}px)`,
        }}
      >
        <svg width={180} height={220} viewBox="0 0 180 220">
          <defs>
            <linearGradient id="person-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.textSecondary} />
              <stop offset="100%" stopColor={COLORS.bgLight} />
            </linearGradient>
          </defs>
          <circle cx={90} cy={45} r={32} fill="url(#person-grad)" />
          <rect
            x={50}
            y={82}
            width={80}
            height={95}
            rx={18}
            fill="url(#person-grad)"
          />
          {/* Question marks */}
          <text
            x={30}
            y={35}
            fill={COLORS.secondary}
            fontSize={28}
            fontWeight={700}
            fontFamily={FONT_FAMILY}
          >
            ?
          </text>
          <text
            x={140}
            y={50}
            fill={COLORS.accent}
            fontSize={22}
            fontWeight={700}
            fontFamily={FONT_FAMILY}
          >
            ?
          </text>
          <text
            x={85}
            y={210}
            fill={COLORS.danger}
            fontSize={18}
            fontWeight={700}
            fontFamily={FONT_FAMILY}
          >
            ?
          </text>
        </svg>
      </div>

      {/* Notification badges */}
      {NOTIF_ITEMS.map((item, i) => {
        const prog = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 12, stiffness: 80 },
        });
        const pulse = Math.sin((frame - item.delay) * 0.15) * 0.5 + 0.5;
        const scale = interpolate(prog, [0, 1], [0.3, 1]);
        const opacity = interpolate(prog, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });
        const glowOpacity = interpolate(pulse, [0, 1], [0.2, 0.6]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `calc(50% + ${item.y}px)`,
              left: `calc(50% + ${item.x}px)`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${item.color}dd, ${item.color}88)`,
                borderRadius: 14,
                padding: "10px 20px",
                boxShadow: `0 0 ${18 * glowOpacity}px ${item.color}70`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 17,
                  color: COLORS.white,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
