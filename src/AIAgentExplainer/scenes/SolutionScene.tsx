import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_SOLUTION_DURATION } from "../constants";

const ORBIT_NODES = [
  { label: "Suy luận", angle: 0, color: COLORS.accent },
  { label: "Lập kế hoạch", angle: 72, color: COLORS.success },
  { label: "Hành động", angle: 144, color: COLORS.secondary },
  { label: "Học hỏi", angle: 216, color: COLORS.purple },
  { label: "Tự động", angle: 288, color: COLORS.cyan },
];

const AgentBrainSVG: React.FC<{ glow: number; scale: number }> = ({
  glow,
  scale,
}) => (
  <svg
    width={180}
    height={180}
    viewBox="0 0 180 180"
    style={{ transform: `scale(${scale})` }}
  >
    <defs>
      <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.7 * glow} />
        <stop
          offset="100%"
          stopColor={COLORS.accentLight}
          stopOpacity={0.1 * glow}
        />
      </radialGradient>
      <linearGradient id="brainBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={COLORS.accent} />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <circle cx={90} cy={90} r={85} fill="url(#brainGlow)" />
    <rect x={30} y={30} width={120} height={120} rx={24} fill="url(#brainBody)" />
    {[45, 65, 85, 105, 125].map((pos) => (
      <React.Fragment key={pos}>
        <line x1={pos} y1={30} x2={pos} y2={12} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
        <line x1={pos} y1={150} x2={pos} y2={168} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
        <line x1={30} y1={pos} x2={12} y2={pos} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
        <line x1={150} y1={pos} x2={168} y2={pos} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
      </React.Fragment>
    ))}
    <text
      x={90}
      y={100}
      textAnchor="middle"
      fontFamily="Inter"
      fontSize={32}
      fontWeight={700}
      fill={COLORS.white}
    >
      AI
    </text>
  </svg>
);

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_SOLUTION_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chipScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 60 },
  });
  const glow = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.5, 1],
  );
  const orbitRadius = 240;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const taglineOpacity = interpolate(frame, [280, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 40% 40%, ${COLORS.accent}15, ${COLORS.bgDark})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}12, transparent 70%)`,
        }}
      />

      {Array.from({ length: 20 }).map((_, i) => {
        const px = (i * 137.5 + 20) % 1920;
        const py = (i * 97.3 + frame * 0.2) % 1080;
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
              backgroundColor: COLORS.accentLight,
              opacity: 0.1 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 50,
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
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Giải pháp:{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Agent
          </span>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chipScale})`,
        }}
      >
        <AgentBrainSVG glow={glow} scale={1} />
      </div>

      {ORBIT_NODES.map((node, i) => {
        const nodeAppear = spring({
          frame: frame - 70 - i * 25,
          fps,
          config: { damping: 14, stiffness: 80 },
        });
        const angleRad =
          ((node.angle + frame * 0.25) * Math.PI) / 180;
        const x = Math.cos(angleRad) * orbitRadius * nodeAppear;
        const y = Math.sin(angleRad) * orbitRadius * 0.55 * nodeAppear;

        const connectionOpacity = interpolate(
          nodeAppear,
          [0.5, 1],
          [0, 0.5],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <React.Fragment key={i}>
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <line
                x1="50%"
                y1="42%"
                x2={960 + x}
                y2={453 + y}
                stroke={node.color}
                strokeWidth={1.5}
                opacity={connectionOpacity}
                strokeDasharray="8,4"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: `calc(42% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: `translate(-50%, -50%) scale(${nodeAppear})`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: `linear-gradient(135deg, ${COLORS.bgMid}, ${COLORS.bgLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 20px ${node.color}30`,
                  border: `2px solid ${node.color}60`,
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 13,
                    color: COLORS.white,
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: taglineOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 26,
            color: COLORS.textSecondary,
          }}
        >
          Thị trường{" "}
          <span style={{ color: COLORS.accent, fontWeight: 700 }}>$12 tỷ</span>
          {" "}→ dự kiến{" "}
          <span style={{ color: COLORS.success, fontWeight: 700 }}>
            $47 tỷ
          </span>{" "}
          vào 2030
        </span>
      </div>
    </AbsoluteFill>
  );
};
