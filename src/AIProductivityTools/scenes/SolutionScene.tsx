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
  SOLUTION_DURATION,
} from "../constants";

const NODE_ITEMS = [
  { icon: "✉", label: "Email", angle: 0 },
  { icon: "📅", label: "Schedule", angle: 90 },
  { icon: "🎙", label: "Notes", angle: 180 },
  { icon: "⚡", label: "Automate", angle: 270 },
];

const AIChipSVG: React.FC<{ glow: number }> = ({ glow }) => (
  <svg width={160} height={160} viewBox="0 0 160 160">
    <defs>
      <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.8 * glow} />
        <stop
          offset="100%"
          stopColor={COLORS.accentLight}
          stopOpacity={0.1 * glow}
        />
      </radialGradient>
      <linearGradient id="chipBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={COLORS.accent} />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <circle cx={80} cy={80} r={75} fill="url(#chipGlow)" />
    <rect x={30} y={30} width={100} height={100} rx={20} fill="url(#chipBody)" />
    {/* Circuit lines */}
    {[40, 60, 80, 100, 120].map((pos) => (
      <React.Fragment key={pos}>
        <line
          x1={pos}
          y1={30}
          x2={pos}
          y2={10}
          stroke={COLORS.accentLight}
          strokeWidth={2}
          opacity={0.6}
        />
        <line
          x1={pos}
          y1={130}
          x2={pos}
          y2={150}
          stroke={COLORS.accentLight}
          strokeWidth={2}
          opacity={0.6}
        />
      </React.Fragment>
    ))}
    {[40, 60, 80, 100, 120].map((pos) => (
      <React.Fragment key={`h-${pos}`}>
        <line
          x1={30}
          y1={pos}
          x2={10}
          y2={pos}
          stroke={COLORS.accentLight}
          strokeWidth={2}
          opacity={0.6}
        />
        <line
          x1={130}
          y1={pos}
          x2={150}
          y2={pos}
          stroke={COLORS.accentLight}
          strokeWidth={2}
          opacity={0.6}
        />
      </React.Fragment>
    ))}
    {/* AI text */}
    <text
      x={80}
      y={90}
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontSize={36}
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

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [SOLUTION_DURATION - 15, SOLUTION_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bgShift = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColor = bgShift < 0.5 ? COLORS.bgDark : COLORS.bgDark;

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

  const orbitRadius = 220;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${bgColor}, #0c1e3d)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}15, transparent 70%)`,
        }}
      />

      {/* Center AI chip */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chipScale})`,
        }}
      >
        <AIChipSVG glow={glow} />
      </div>

      {/* Orbiting nodes */}
      {NODE_ITEMS.map((node, i) => {
        const nodeAppear = spring({
          frame: frame - 60 - i * 30,
          fps,
          config: { damping: 14, stiffness: 80 },
        });
        const angleRad =
          ((node.angle + frame * 0.3) * Math.PI) / 180;
        const x = Math.cos(angleRad) * orbitRadius * nodeAppear;
        const y = Math.sin(angleRad) * orbitRadius * 0.6 * nodeAppear;

        const lineOpacity = interpolate(nodeAppear, [0.5, 1], [0, 0.6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <React.Fragment key={i}>
            {/* Connection line */}
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
                y1="40%"
                x2={960 + x}
                y2={432 + y}
                stroke={COLORS.accentLight}
                strokeWidth={2}
                opacity={lineOpacity}
                strokeDasharray="8,4"
              />
            </svg>
            {/* Node */}
            <div
              style={{
                position: "absolute",
                top: `calc(40% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: `translate(-50%, -50%) scale(${nodeAppear})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${COLORS.bgMid}, ${COLORS.bgLight})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    boxShadow: `0 4px 20px ${COLORS.accent}30`,
                    border: `2px solid ${COLORS.accent}40`,
                  }}
                >
                  {node.icon}
                </div>
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 16,
                    color: COLORS.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [200, 240], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            color: COLORS.textSecondary,
          }}
        >
          Focus on work that{" "}
          <span style={{ color: COLORS.accent, fontWeight: 700 }}>
            actually matters
          </span>
        </span>
      </div>

      <SubtitleSequence segments={AUDIO_SEGMENTS.solution} />
    </AbsoluteFill>
  );
};
