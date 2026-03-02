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
  FONT_FAMILY,
  PROBLEM_DURATION,
} from "../constants";

const NOTIF_ITEMS = [
  { icon: "✉", label: "47 emails", x: -320, y: -180, delay: 0 },
  { icon: "📅", label: "5 meetings", x: 300, y: -140, delay: 5 },
  { icon: "📄", label: "12 docs", x: -280, y: 120, delay: 10 },
  { icon: "💬", label: "83 messages", x: 340, y: 160, delay: 15 },
  { icon: "📋", label: "9 follow-ups", x: -100, y: -260, delay: 20 },
  { icon: "🔔", label: "Overdue!", x: 140, y: 240, delay: 25 },
];

const PersonSVG: React.FC<{ shake: number }> = ({ shake }) => (
  <svg
    width={200}
    height={240}
    viewBox="0 0 200 240"
    style={{ transform: `translateX(${shake}px)` }}
  >
    <circle cx={100} cy={50} r={35} fill={COLORS.textSecondary} />
    <rect
      x={55}
      y={90}
      width={90}
      height={110}
      rx={20}
      fill={COLORS.textSecondary}
    />
    <rect x={75} y={200} width={20} height={40} rx={6} fill={COLORS.bgLight} />
    <rect
      x={105}
      y={200}
      width={20}
      height={40}
      rx={6}
      fill={COLORS.bgLight}
    />
    <rect x={40} y={160} width={120} height={12} rx={4} fill={COLORS.bgMid} />
    <rect x={55} y={176} width={90} height={8} rx={3} fill={COLORS.bgMid} />
  </svg>
);

const NotifBadge: React.FC<{
  icon: string;
  label: string;
  progress: number;
  pulse: number;
}> = ({ icon, label, progress, pulse }) => {
  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glowOpacity = interpolate(pulse, [0, 1], [0.3, 0.8]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: `linear-gradient(135deg, ${COLORS.danger}dd, ${COLORS.danger}99)`,
        borderRadius: 16,
        padding: "10px 18px",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 ${20 * glowOpacity}px ${COLORS.danger}80`,
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 18,
          color: COLORS.white,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [PROBLEM_DURATION - 15, PROBLEM_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const shake =
    frame > 90
      ? Math.sin(frame * 0.8) * interpolate(frame, [90, 200], [0, 4], {
          extrapolateRight: "clamp",
        })
      : 0;

  const clockRotation = interpolate(frame, [0, PROBLEM_DURATION], [0, 720]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Background particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const px = ((i * 137.5) % 1920);
        const py = ((i * 97.3 + frame * 0.3) % 1080);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: 3,
              height: 3,
              borderRadius: "50%",
              backgroundColor: `${COLORS.accent}20`,
            }}
          />
        );
      })}

      {/* Clock icon */}
      <div style={{ position: "absolute", top: 60, right: 80 }}>
        <svg width={80} height={80} viewBox="0 0 80 80">
          <circle
            cx={40}
            cy={40}
            r={35}
            fill="none"
            stroke={COLORS.textSecondary}
            strokeWidth={3}
          />
          <line
            x1={40}
            y1={40}
            x2={40}
            y2={15}
            stroke={COLORS.danger}
            strokeWidth={3}
            strokeLinecap="round"
            transform={`rotate(${clockRotation}, 40, 40)`}
          />
          <line
            x1={40}
            y1={40}
            x2={55}
            y2={40}
            stroke={COLORS.textSecondary}
            strokeWidth={2}
            strokeLinecap="round"
            transform={`rotate(${clockRotation * 0.08}, 40, 40)`}
          />
          <circle cx={40} cy={40} r={4} fill={COLORS.danger} />
        </svg>
      </div>

      {/* Center person */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      >
        <PersonSVG shake={shake} />
      </div>

      {/* Notification badges */}
      {NOTIF_ITEMS.map((item, i) => {
        const prog = spring({
          frame: frame - item.delay - 15,
          fps,
          config: { damping: 12, stiffness: 80 },
        });
        const pulse = Math.sin((frame - item.delay) * 0.15) * 0.5 + 0.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `calc(50% + ${item.y}px)`,
              left: `calc(50% + ${item.x}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <NotifBadge
              icon={item.icon}
              label={item.label}
              progress={prog}
              pulse={pulse}
            />
          </div>
        );
      })}

      <SubtitleSequence segments={AUDIO_SEGMENTS.problem} />
    </AbsoluteFill>
  );
};
