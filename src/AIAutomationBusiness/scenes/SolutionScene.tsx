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

const ORBIT_NODES = [
  { label: "Quy trình", angle: 0, color: COLORS.accent },
  { label: "Dữ liệu", angle: 72, color: COLORS.purple },
  { label: "Khách hàng", angle: 144, color: COLORS.teal },
  { label: "Quyết định", angle: 216, color: COLORS.secondary },
  { label: "Tối ưu", angle: 288, color: COLORS.success },
];

export const SolutionScene: React.FC = () => {
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

  const centralScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const orbitRadius = 240;
  const orbitSpeed = frame * 0.3;
  const glowPulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.6, 1.2]);

  const roiProgress = interpolate(frame, [200, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const roiEased = Easing.out(Easing.cubic)(roiProgress);
  const roiValue = Math.round(171 * roiEased);

  const hoursProg = interpolate(frame, [240, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hoursEased = Easing.out(Easing.cubic)(hoursProg);
  const hoursValue = Math.round(40 * hoursEased);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(ellipse at 50% 45%, #0d2818, ${COLORS.bgDark})`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 700 * glowPulse,
          height: 700 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.success}15, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {Array.from({ length: 25 }).map((_, i) => {
        const px = (i * 137.5 + 40) % 1920;
        const py = 1080 - ((i * 83.1 + frame * 0.4) % 1200);
        const size = 2 + (i % 3);
        const color = i % 2 === 0 ? COLORS.success : COLORS.teal;
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
              backgroundColor: color,
              opacity: 0.06 + (i % 4) * 0.03,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Giải pháp:{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.teal})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Automation
          </span>
        </span>
      </div>

      {/* Central AI brain hub */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${centralScale})`,
        }}
      >
        <svg width={140} height={140} viewBox="0 0 140 140">
          <defs>
            <radialGradient id="brain-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={COLORS.success} stopOpacity={0.4} />
              <stop offset="100%" stopColor={COLORS.success} stopOpacity={0} />
            </radialGradient>
            <linearGradient id="brain-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={COLORS.success} />
              <stop offset="100%" stopColor={COLORS.teal} />
            </linearGradient>
          </defs>
          <circle cx={70} cy={70} r={68} fill="url(#brain-glow)" />
          <circle cx={70} cy={70} r={50} fill={COLORS.bgDark} stroke="url(#brain-fill)" strokeWidth={3} />
          {/* Brain paths */}
          <path
            d="M50 70 Q55 50 70 48 Q85 50 90 70 Q85 85 70 90 Q55 85 50 70Z"
            fill="none"
            stroke={COLORS.success}
            strokeWidth={2}
            opacity={0.8}
          />
          <path
            d="M60 55 Q70 45 80 55"
            fill="none"
            stroke={COLORS.successLight}
            strokeWidth={1.5}
          />
          <path
            d="M55 70 Q70 60 85 70"
            fill="none"
            stroke={COLORS.successLight}
            strokeWidth={1.5}
          />
          <path
            d="M60 82 Q70 75 80 82"
            fill="none"
            stroke={COLORS.successLight}
            strokeWidth={1.5}
          />
          {/* Center dot */}
          <circle cx={70} cy={68} r={4} fill={COLORS.success} />
        </svg>
      </div>

      {/* Orbit ring */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width={orbitRadius * 2 + 80} height={orbitRadius * 2 + 80} viewBox={`0 0 ${orbitRadius * 2 + 80} ${orbitRadius * 2 + 80}`}>
          <circle
            cx={orbitRadius + 40}
            cy={orbitRadius + 40}
            r={orbitRadius}
            fill="none"
            stroke={`${COLORS.success}20`}
            strokeWidth={1}
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* Orbiting nodes */}
      {ORBIT_NODES.map((node, i) => {
        const nodeProg = spring({
          frame: frame - 60 - i * 15,
          fps,
          config: { damping: 14, stiffness: 80 },
        });
        const angleRad = ((node.angle + orbitSpeed) * Math.PI) / 180;
        const cx = 960 + orbitRadius * Math.cos(angleRad);
        const cy = 1080 * 0.42 + orbitRadius * Math.sin(angleRad) * 0.6;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              transform: `translate(-50%, -50%) scale(${nodeProg})`,
              opacity: nodeProg,
            }}
          >
            <div
              style={{
                backgroundColor: `${node.color}22`,
                border: `2px solid ${node.color}80`,
                borderRadius: 16,
                padding: "10px 20px",
                boxShadow: `0 0 16px ${node.color}30`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  fontWeight: 600,
                  color: node.color,
                }}
              >
                {node.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Connection lines from center to nodes */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          pointerEvents: "none",
        }}
      >
        {ORBIT_NODES.map((node, i) => {
          const nodeProg = spring({
            frame: frame - 60 - i * 15,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const angleRad = ((node.angle + orbitSpeed) * Math.PI) / 180;
          const cx = 960 + orbitRadius * Math.cos(angleRad);
          const cy = 1080 * 0.42 + orbitRadius * Math.sin(angleRad) * 0.6;

          return (
            <line
              key={i}
              x1={960}
              y1={1080 * 0.42}
              x2={cx}
              y2={cy}
              stroke={node.color}
              strokeWidth={1}
              opacity={nodeProg * 0.3}
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Bottom stat cards */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
        }}
      >
        {/* ROI card */}
        <div
          style={{
            opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.success,
              textShadow: `0 0 20px ${COLORS.success}40`,
            }}
          >
            {roiValue}%
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              color: COLORS.textSecondary,
              fontWeight: 500,
            }}
          >
            ROI trung bình
          </div>
        </div>

        {/* Hours saved card */}
        <div
          style={{
            opacity: interpolate(frame, [240, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.accent,
              textShadow: `0 0 20px ${COLORS.accent}40`,
            }}
          >
            {hoursValue}h
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              color: COLORS.textSecondary,
              fontWeight: 500,
            }}
          >
            tiết kiệm/tuần/phòng ban
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
