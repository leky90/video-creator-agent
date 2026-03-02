import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_ARCHITECTURE_DURATION } from "../constants";

const LLMIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={48} height={48} viewBox="0 0 48 48">
    <rect x={4} y={4} width={40} height={40} rx={10} fill={active ? COLORS.accent : COLORS.bgLight} />
    <text x={24} y={30} textAnchor="middle" fontFamily="Inter" fontSize={16} fontWeight={700} fill={COLORS.white}>LLM</text>
  </svg>
);

const ToolsIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={48} height={48} viewBox="0 0 48 48">
    <rect x={6} y={20} width={36} height={22} rx={4} fill={active ? COLORS.success : COLORS.bgLight} />
    <circle cx={16} cy={14} r={6} fill={active ? COLORS.success : COLORS.bgLight} opacity={0.7} />
    <circle cx={32} cy={14} r={6} fill={active ? COLORS.success : COLORS.bgLight} opacity={0.7} />
    <line x1={16} y1={20} x2={16} y2={14} stroke={COLORS.white} strokeWidth={1.5} opacity={0.5} />
    <line x1={32} y1={20} x2={32} y2={14} stroke={COLORS.white} strokeWidth={1.5} opacity={0.5} />
    <text x={24} y={36} textAnchor="middle" fontFamily="Inter" fontSize={10} fontWeight={600} fill={COLORS.white}>API</text>
  </svg>
);

const MemoryIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={48} height={48} viewBox="0 0 48 48">
    <rect x={8} y={6} width={32} height={36} rx={4} fill={active ? COLORS.secondary : COLORS.bgLight} />
    {[14, 22, 30].map((y) => (
      <line key={y} x1={14} y1={y} x2={34} y2={y} stroke={COLORS.white} strokeWidth={1.5} opacity={0.5} />
    ))}
    <circle cx={38} cy={38} r={8} fill={active ? COLORS.secondary : COLORS.bgLight} />
    <text x={38} y={42} textAnchor="middle" fontFamily="Inter" fontSize={10} fontWeight={700} fill={COLORS.white}>M</text>
  </svg>
);

const PlanningIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={48} height={48} viewBox="0 0 48 48">
    <circle cx={24} cy={12} r={6} fill={active ? COLORS.purple : COLORS.bgLight} />
    <circle cx={12} cy={36} r={6} fill={active ? COLORS.purple : COLORS.bgLight} />
    <circle cx={36} cy={36} r={6} fill={active ? COLORS.purple : COLORS.bgLight} />
    <line x1={24} y1={18} x2={12} y2={30} stroke={active ? COLORS.purple : COLORS.bgLight} strokeWidth={2} />
    <line x1={24} y1={18} x2={36} y2={30} stroke={active ? COLORS.purple : COLORS.bgLight} strokeWidth={2} />
    <line x1={12} y1={36} x2={36} y2={36} stroke={active ? COLORS.purple : COLORS.bgLight} strokeWidth={1.5} strokeDasharray="4,3" />
  </svg>
);

const OrchIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={48} height={48} viewBox="0 0 48 48">
    <circle cx={24} cy={24} r={8} fill={active ? COLORS.cyan : COLORS.bgLight} />
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 24 + Math.cos(rad) * 18;
      const y = 24 + Math.sin(rad) * 18;
      return (
        <React.Fragment key={i}>
          <circle cx={x} cy={y} r={4} fill={active ? COLORS.cyan : COLORS.bgLight} opacity={0.7} />
          <line x1={24} y1={24} x2={x} y2={y} stroke={active ? COLORS.cyan : COLORS.bgLight} strokeWidth={1.5} opacity={0.5} />
        </React.Fragment>
      );
    })}
  </svg>
);

const COLUMNS = [
  {
    Icon: LLMIcon,
    title: "LLM",
    desc: "Bộ não suy luận",
    color: COLORS.accent,
    activateStart: 40,
  },
  {
    Icon: ToolsIcon,
    title: "Tools",
    desc: "API & Database",
    color: COLORS.success,
    activateStart: 160,
  },
  {
    Icon: MemoryIcon,
    title: "Memory",
    desc: "Ngắn hạn & dài hạn",
    color: COLORS.secondary,
    activateStart: 300,
  },
  {
    Icon: PlanningIcon,
    title: "Planning",
    desc: "Chia nhỏ mục tiêu",
    color: COLORS.purple,
    activateStart: 440,
  },
  {
    Icon: OrchIcon,
    title: "Orchestration",
    desc: "Điều phối workflow",
    color: COLORS.cyan,
    activateStart: 560,
  },
];

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_ARCHITECTURE_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0a1a2a, ${COLORS.bgMid})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const px = (i * 137.5 + 40) % 1920;
        const py = (i * 97.3 + frame * 0.18) % 1080;
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
              backgroundColor: COLORS.cyan,
              opacity: 0.08 + (i % 4) * 0.03,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 700,
          height: 500,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}08, transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `translateY(${(1 - titleSpring) * 40}px)`,
          opacity: titleSpring,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Kiến trúc{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.cyan})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            5 thành phần
          </span>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          padding: "0 60px",
        }}
      >
        {COLUMNS.map((col, i) => {
          const slideUp = spring({
            frame: frame - 15 - i * 10,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const isActive = frame >= col.activateStart;
          const activeProg = interpolate(
            frame,
            [col.activateStart, col.activateStart + 100],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const pulse = isActive
            ? Math.sin((frame - col.activateStart) * 0.08) * 0.4 + 0.6
            : 0;

          return (
            <div
              key={i}
              style={{
                width: 310,
                transform: `translateY(${(1 - slideUp) * 80}px)`,
                opacity: slideUp,
              }}
            >
              <div
                style={{
                  backgroundColor: `${COLORS.bgDark}dd`,
                  borderRadius: 20,
                  padding: "28px 20px",
                  border: `2px solid ${isActive ? col.color : COLORS.bgLight + "60"}`,
                  boxShadow: isActive
                    ? `0 0 ${24 * pulse}px ${col.color}25`
                    : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  minHeight: 340,
                }}
              >
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

                <col.Icon active={isActive} />

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

                <div
                  style={{
                    width: "100%",
                    minHeight: 50,
                    backgroundColor: `${COLORS.bgDark}80`,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 12px",
                    overflow: "hidden",
                  }}
                >
                  <MicroDemo index={i} progress={activeProg} />
                </div>

                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 15,
                    color: COLORS.textSecondary,
                    textAlign: "center",
                  }}
                >
                  {col.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const MicroDemo: React.FC<{ index: number; progress: number }> = ({
  index,
  progress,
}) => {
  if (index === 0) {
    const lines = ["Input → Reasoning", "Output → Decision"];
    const totalChars = lines.join("").length;
    const shown = Math.floor(progress * totalChars);
    let charCount = 0;
    return (
      <div style={{ textAlign: "left", width: "100%" }}>
        {lines.map((line, i) => {
          const lineStart = charCount;
          charCount += line.length;
          const visible = Math.max(0, Math.min(line.length, shown - lineStart));
          if (visible === 0) return null;
          return (
            <div
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: COLORS.accent,
                lineHeight: 1.6,
              }}
            >
              {line.substring(0, visible)}
            </div>
          );
        })}
      </div>
    );
  }
  if (index === 1) {
    const items = ["API", "DB", "Web"];
    return (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {items.map((item, i) => {
          const p = interpolate(progress, [i * 0.33, (i + 1) * 0.33], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: COLORS.success,
                  opacity: p,
                  transform: `scale(${p})`,
                  fontFamily: FONT_FAMILY,
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
              {i < items.length - 1 && (
                <span
                  style={{
                    color: COLORS.success,
                    fontSize: 14,
                    opacity: p > 0.8 ? 1 : 0,
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
  }
  if (index === 2) {
    const barW = interpolate(progress, [0, 1], [0, 100]);
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: 10,
            backgroundColor: `${COLORS.bgLight}40`,
            borderRadius: 5,
          }}
        >
          <div
            style={{
              width: `${barW}%`,
              height: "100%",
              backgroundColor: COLORS.secondary,
              borderRadius: 5,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: COLORS.textSecondary,
            marginTop: 4,
          }}
        >
          Context stored: {Math.round(barW)}%
        </div>
      </div>
    );
  }
  if (index === 3) {
    const steps = ["Goal", "Sub-1", "Sub-2"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        {steps.map((s, i) => {
          const p = interpolate(progress, [i * 0.33, (i + 1) * 0.33], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: p,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: p > 0.7 ? COLORS.purple : COLORS.bgLight,
                  border: `2px solid ${COLORS.purple}`,
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: COLORS.textSecondary,
                }}
              >
                {i === 0 ? "" : "├─ "}
                {s}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  const nodes = [1, 2, 3];
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {nodes.map((_, i) => {
        const p = interpolate(progress, [i * 0.33, (i + 1) * 0.33], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <React.Fragment key={i}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: COLORS.cyan,
                opacity: p,
                transform: `scale(${p})`,
              }}
            />
            {i < nodes.length - 1 && (
              <div
                style={{
                  width: 20,
                  height: 2,
                  backgroundColor: COLORS.cyan,
                  opacity: p > 0.8 ? 0.6 : 0,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
