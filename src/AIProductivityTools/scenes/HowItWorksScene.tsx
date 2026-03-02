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
  HOW_IT_WORKS_DURATION,
} from "../constants";

interface ColumnData {
  icon: React.ReactNode;
  title: string;
  desc: string;
  activateStart: number;
  color: string;
}

const PencilIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <rect x={16} y={8} width={32} height={44} rx={4} fill={COLORS.bgMid} stroke={COLORS.accent} strokeWidth={2} />
    {[18, 26, 34].map((y) => (
      <line key={y} x1={22} y1={y} x2={42} y2={y} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
    ))}
    <path d="M44 38 L52 30 L56 34 L48 42 Z" fill={COLORS.accent} />
    <path d="M48 42 L44 44 L44 38" fill={COLORS.accentLight} />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <rect x={8} y={14} width={48} height={42} rx={6} fill={COLORS.bgMid} stroke={COLORS.success} strokeWidth={2} />
    <rect x={8} y={14} width={48} height={14} rx={6} fill={COLORS.success} opacity={0.3} />
    <line x1={22} y1={8} x2={22} y2={20} stroke={COLORS.success} strokeWidth={3} strokeLinecap="round" />
    <line x1={42} y1={8} x2={42} y2={20} stroke={COLORS.success} strokeWidth={3} strokeLinecap="round" />
    {/* Time blocks */}
    <rect x={14} y={34} width={16} height={8} rx={2} fill={COLORS.success} opacity={0.6} />
    <rect x={34} y={34} width={16} height={8} rx={2} fill={COLORS.success} opacity={0.4} />
    <rect x={14} y={46} width={36} height={6} rx={2} fill={COLORS.accent} opacity={0.3} />
  </svg>
);

const GearIcon: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <circle cx={32} cy={32} r={12} fill="none" stroke={COLORS.secondary} strokeWidth={3} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={angle}
          x1={32 + Math.cos(rad) * 14}
          y1={32 + Math.sin(rad) * 14}
          x2={32 + Math.cos(rad) * 22}
          y2={32 + Math.sin(rad) * 22}
          stroke={COLORS.secondary}
          strokeWidth={4}
          strokeLinecap="round"
        />
      );
    })}
    <circle cx={32} cy={32} r={5} fill={COLORS.secondary} />
    {/* Flow arrows */}
    <path d="M8 50 L20 50" stroke={COLORS.secondary} strokeWidth={2} opacity={0.5} markerEnd="url(#arrowOrange)" />
    <path d="M44 50 L56 50" stroke={COLORS.secondary} strokeWidth={2} opacity={0.5} />
    <defs>
      <marker id="arrowOrange" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
        <path d="M0,0 L6,3 L0,6" fill={COLORS.secondary} />
      </marker>
    </defs>
  </svg>
);

const COLUMNS: ColumnData[] = [
  {
    icon: <PencilIcon />,
    title: "AI Writers",
    desc: "Draft emails & reports\nin seconds",
    activateStart: 60,
    color: COLORS.accent,
  },
  {
    icon: <CalendarIcon />,
    title: "Smart Schedulers",
    desc: "Protect focus time\nautomatically",
    activateStart: 200,
    color: COLORS.success,
  },
  {
    icon: <GearIcon />,
    title: "Automation",
    desc: "Connect apps\nend to end",
    activateStart: 350,
    color: COLORS.secondary,
  },
];

const TypingEffect: React.FC<{ progress: number }> = ({ progress }) => {
  const lines = ["Subject: Q3 Report", "Hi team, here's the...", "Revenue grew 32%..."];
  const totalChars = lines.join("").length;
  const shown = Math.floor(progress * totalChars);
  let charCount = 0;

  return (
    <div style={{ padding: "8px 12px", textAlign: "left" }}>
      {lines.map((line, i) => {
        const lineStart = charCount;
        charCount += line.length;
        const visibleChars = Math.max(0, Math.min(line.length, shown - lineStart));
        if (visibleChars === 0) return null;
        return (
          <div
            key={i}
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: COLORS.textSecondary,
              lineHeight: 1.5,
            }}
          >
            {line.substring(0, visibleChars)}
            {visibleChars < line.length && (
              <span style={{ opacity: Math.sin(Date.now() * 0.01) > 0 ? 1 : 0 }}>|</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const TimeBlocks: React.FC<{ progress: number }> = ({ progress }) => {
  const blocks = [
    { label: "Focus", w: 60, color: COLORS.success },
    { label: "Meeting", w: 30, color: COLORS.textSecondary },
    { label: "Focus", w: 70, color: COLORS.success },
    { label: "Break", w: 20, color: COLORS.accentLight },
  ];
  return (
    <div style={{ display: "flex", gap: 3, padding: "8px 12px" }}>
      {blocks.map((b, i) => {
        const blockProgress = interpolate(progress, [i * 0.25, (i + 1) * 0.25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              width: b.w * blockProgress,
              height: 28,
              backgroundColor: b.color,
              borderRadius: 4,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {blockProgress > 0.5 && (
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 10, color: COLORS.white }}>
                {b.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const FlowArrows: React.FC<{ progress: number }> = ({ progress }) => {
  const apps = ["📧", "📊", "📁", "✅"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 8px" }}>
      {apps.map((app, i) => {
        const appProg = interpolate(progress, [i * 0.25, (i + 1) * 0.25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <React.Fragment key={i}>
            <div
              style={{
                fontSize: 20,
                opacity: appProg,
                transform: `scale(${appProg})`,
              }}
            >
              {app}
            </div>
            {i < apps.length - 1 && (
              <span
                style={{
                  color: COLORS.secondary,
                  fontSize: 14,
                  opacity: appProg > 0.8 ? 1 : 0,
                }}
              >
                →
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [HOW_IT_WORKS_DURATION - 15, HOW_IT_WORKS_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statOpacity = interpolate(frame, [480, 520], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #0c1e3d)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          Three Categories That{" "}
          <span style={{ color: COLORS.accent }}>Deliver</span>
        </span>
      </div>

      {/* Three columns */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {COLUMNS.map((col, i) => {
          const slideUp = spring({
            frame: frame - 15 - i * 12,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const isActive = frame >= col.activateStart;
          const activeProg = interpolate(
            frame,
            [col.activateStart, col.activateStart + 120],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const borderColor = isActive ? col.color : `${COLORS.bgLight}80`;

          return (
            <div
              key={i}
              style={{
                width: 340,
                transform: `translateY(${(1 - slideUp) * 80}px)`,
                opacity: slideUp,
              }}
            >
              <div
                style={{
                  backgroundColor: `${COLORS.bgMid}cc`,
                  borderRadius: 20,
                  padding: "32px 24px",
                  border: `2px solid ${borderColor}`,
                  boxShadow: isActive ? `0 0 30px ${col.color}20` : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  minHeight: 380,
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: isActive ? col.color : COLORS.bgLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_FAMILY,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.white,
                  }}
                >
                  {i + 1}
                </div>

                {col.icon}

                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 22,
                    fontWeight: 700,
                    color: isActive ? col.color : COLORS.textPrimary,
                  }}
                >
                  {col.title}
                </span>

                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 16,
                    color: COLORS.textSecondary,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                  }}
                >
                  {col.desc}
                </span>

                {/* Animated demo area */}
                <div
                  style={{
                    width: "100%",
                    minHeight: 60,
                    backgroundColor: `${COLORS.bgDark}80`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {i === 0 && <TypingEffect progress={activeProg} />}
                  {i === 1 && <TimeBlocks progress={activeProg} />}
                  {i === 2 && <FlowArrows progress={activeProg} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stat badge */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: statOpacity,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.success}20)`,
            borderRadius: 16,
            padding: "12px 32px",
            border: `1px solid ${COLORS.accent}40`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: COLORS.white,
            }}
          >
            📊 Average savings:{" "}
            <span style={{ color: COLORS.success, fontWeight: 700 }}>
              3.6 hours/week
            </span>
          </span>
        </div>
      </div>

      <SubtitleSequence segments={AUDIO_SEGMENTS.how_it_works} />
    </AbsoluteFill>
  );
};
