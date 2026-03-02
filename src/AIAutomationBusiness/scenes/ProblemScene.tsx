import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const TASK_BADGES = [
  { label: "Nhập liệu", icon: "M4 6h16M4 12h16M4 18h8", x: -360, y: -160, delay: 20 },
  { label: "Gửi email", icon: "M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8", x: 340, y: -120, delay: 28 },
  { label: "Tổng hợp báo cáo", icon: "M9 17v-6h6v6M9 3v4h6V3M5 11h14", x: -320, y: 140, delay: 36 },
  { label: "Copy dữ liệu", icon: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6", x: 360, y: 170, delay: 44 },
  { label: "Xử lý hóa đơn", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2", x: -140, y: -260, delay: 52 },
  { label: "Lặp lại mỗi ngày", icon: "M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z", x: 160, y: 250, delay: 60 },
];

const TypingCursor: React.FC<{ frame: number }> = ({ frame }) => {
  const blink = Math.sin(frame * 0.2) > 0 ? 1 : 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: 24,
        backgroundColor: COLORS.secondary,
        opacity: blink,
        marginLeft: 4,
        verticalAlign: "middle",
      }}
    />
  );
};

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

  const titleProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const percentText = "60%";
  const typingProgress = interpolate(frame, [80, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const charsToShow = Math.floor(typingProgress * percentText.length);

  const clockRotation = interpolate(frame, [0, duration], [0, 720]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #130d24)`,
      }}
    >
      {/* Particles */}
      {Array.from({ length: 22 }).map((_, i) => {
        const px = (i * 137.5 + 80) % 1920;
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
              backgroundColor: COLORS.secondary,
              opacity: 0.08 + (i % 4) * 0.03,
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
          width: 550,
          height: 550,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondary}0e, transparent 70%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
          textAlign: "center",
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
          Nhân viên dành{" "}
          <span style={{ color: COLORS.secondary, fontFamily: FONT_FAMILY }}>
            {percentText.slice(0, charsToShow)}
            {charsToShow < percentText.length && <TypingCursor frame={frame} />}
          </span>{" "}
          cho việc lặp lại
        </span>
      </div>

      {/* Central person at desk SVG */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width={200} height={200} viewBox="0 0 200 200">
          <defs>
            <linearGradient id="desk-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.bgLight} />
              <stop offset="100%" stopColor={COLORS.bgMid} />
            </linearGradient>
          </defs>
          {/* Desk */}
          <rect x={30} y={130} width={140} height={8} rx={4} fill={COLORS.bgLight} />
          <rect x={50} y={138} width={8} height={40} fill={COLORS.bgLight} />
          <rect x={142} y={138} width={8} height={40} fill={COLORS.bgLight} />
          {/* Monitor */}
          <rect x={60} y={80} width={80} height={50} rx={4} fill={COLORS.bgLight} stroke={COLORS.textSecondary} strokeWidth={1.5} />
          <rect x={92} y={130} width={16} height={8} fill={COLORS.textSecondary} />
          {/* Screen glow */}
          <rect x={65} y={85} width={70} height={40} rx={2} fill={COLORS.accent} opacity={0.15} />
          {/* Person */}
          <circle cx={100} cy={50} r={22} fill="url(#desk-grad)" stroke={COLORS.textSecondary} strokeWidth={1} />
          <rect x={78} y={72} width={44} height={55} rx={12} fill="url(#desk-grad)" stroke={COLORS.textSecondary} strokeWidth={1} />
          {/* Clock on screen */}
          <circle cx={100} cy={105} r={12} fill="none" stroke={COLORS.secondary} strokeWidth={1.5} />
          <line
            x1={100}
            y1={105}
            x2={100 + 7 * Math.cos((clockRotation * Math.PI) / 180 - Math.PI / 2)}
            y2={105 + 7 * Math.sin((clockRotation * Math.PI) / 180 - Math.PI / 2)}
            stroke={COLORS.secondary}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Task badges orbiting */}
      {TASK_BADGES.map((item, i) => {
        const prog = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 12, stiffness: 80 },
        });
        const floatY = Math.sin((frame - item.delay) * 0.05) * 6;
        const glowPulse = Math.sin((frame - item.delay) * 0.12) * 0.3 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `calc(50% + ${item.y + floatY}px)`,
              left: `calc(50% + ${item.x}px)`,
              transform: `translate(-50%, -50%) scale(${interpolate(prog, [0, 1], [0.3, 1])})`,
              opacity: prog,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(135deg, ${COLORS.bgLight}cc, ${COLORS.bgMid}cc)`,
                border: `1px solid ${COLORS.secondary}40`,
                borderRadius: 14,
                padding: "10px 18px",
                boxShadow: `0 0 ${16 * glowPulse}px ${COLORS.secondary}30`,
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={COLORS.secondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 15,
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
