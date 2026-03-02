import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const BrainSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.accent} />
        <stop offset="100%" stopColor={COLORS.purple} />
      </linearGradient>
      <filter id="brainGlow">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#brainGlow)">
      <path
        d="M60 15c-8 0-15 3-20 8-3-2-7-3-10-3-12 0-18 10-18 20 0 6 2 11 5 15-3 4-5 9-5 15 0 12 8 20 18 20 3 0 7-1 10-3 5 5 12 8 20 8s15-3 20-8c3 2 7 3 10 3 12 0 18-8 18-20 0-6-2-11-5-15 3-4 5-9 5-15 0-10-6-20-18-20-3 0-7 1-10 3-5-5-12-8-20-8z"
        fill="url(#brainGrad)"
        opacity={0.9}
      />
      <path
        d="M60 25v70M40 40c10 5 30 5 40 0M38 60c12 6 32 6 44 0M42 80c8-4 28-4 36 0"
        stroke={COLORS.white}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
      />
      <circle cx={50} cy={45} r={4} fill={COLORS.white} opacity={0.7} />
      <circle cx={70} cy={45} r={4} fill={COLORS.white} opacity={0.7} />
      <circle cx={45} cy={65} r={3} fill={COLORS.accentLight} opacity={0.8} />
      <circle cx={75} cy={65} r={3} fill={COLORS.accentLight} opacity={0.8} />
      <circle cx={60} cy={55} r={5} fill={COLORS.white} opacity={0.9} />
    </g>
  </svg>
);

const GearSVG: React.FC<{
  size: number;
  x: number;
  y: number;
  color: string;
  rotation?: number;
}> = ({ size, x, y, color, rotation = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <path
      d="M24 8l2.5 4.5 5-1 1 5 5 1-1 5L41 24l-4.5 2.5 1 5-5 1-1 5-5-1L24 41l-2.5-4.5-5 1-1-5-5-1 1-5L7 24l4.5-2.5-1-5 5-1 1-5 5 1L24 8z"
      fill={color}
      opacity={0.85}
    />
    <circle cx={24} cy={24} r={7} fill={COLORS.bgDark} opacity={0.6} />
  </svg>
);

export const AIAutomationBusinessThumbnail: React.FC = () => {
  const orbitNodes = [
    { angle: 30, dist: 260, icon: "📊", label: "Data" },
    { angle: 100, dist: 240, icon: "⚡", label: "Speed" },
    { angle: 170, dist: 260, icon: "🔄", label: "Auto" },
    { angle: 240, dist: 240, icon: "💰", label: "ROI" },
    { angle: 310, dist: 260, icon: "🎯", label: "Target" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 35% 45%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
        overflow: "hidden",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}20, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purple}18, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}10, transparent 60%)`,
        }}
      />

      {/* Grid lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            top: i * 100,
            left: 0,
            width: "100%",
            height: 1,
            background: `${COLORS.accent}08`,
          }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: i * 100,
            width: 1,
            height: "100%",
            background: `${COLORS.accent}08`,
          }}
        />
      ))}

      {/* Gears */}
      <GearSVG size={80} x={120} y={180} color={`${COLORS.accent}40`} rotation={15} />
      <GearSVG size={60} x={170} y={240} color={`${COLORS.purple}35`} rotation={-30} />
      <GearSVG size={50} x={1650} y={650} color={`${COLORS.success}35`} rotation={45} />
      <GearSVG size={70} x={1700} y={720} color={`${COLORS.accent}30`} rotation={-15} />

      {/* Central brain icon */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "28%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Orbit ring */}
        <svg
          width={600}
          height={600}
          viewBox="0 0 600 600"
          style={{ position: "absolute", top: -150, left: -150 }}
        >
          <circle
            cx={300}
            cy={300}
            r={250}
            fill="none"
            stroke={`${COLORS.accent}20`}
            strokeWidth={2}
            strokeDasharray="12 8"
          />
          <circle
            cx={300}
            cy={300}
            r={190}
            fill="none"
            stroke={`${COLORS.purple}15`}
            strokeWidth={1.5}
            strokeDasharray="8 12"
          />
        </svg>

        <BrainSVG size={300} />

        {/* Orbit nodes */}
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = Math.cos(rad) * node.dist;
          const ny = Math.sin(rad) * node.dist;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 150 + nx - 30,
                top: 150 + ny - 30,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.bgLight}, ${COLORS.bgMid})`,
                border: `2px solid ${COLORS.accent}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                boxShadow: `0 0 20px ${COLORS.accent}25`,
              }}
            >
              {node.icon}
            </div>
          );
        })}
      </div>

      {/* Title block — right side */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 100,
          transform: "translateY(-50%)",
          width: 850,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 30,
              background: `linear-gradient(90deg, ${COLORS.accent}30, ${COLORS.purple}30)`,
              border: `1px solid ${COLORS.accent}50`,
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.accentLight,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            2026 Guide
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            color: COLORS.white,
          }}
        >
          <span>AI Automation</span>
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            cho Doanh Nghiệp
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.5,
          }}
        >
          Tăng 171% ROI · Tiết kiệm 40h/tuần · Scale không giới hạn
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
          {[
            { value: "88%", label: "DN dùng AI", color: COLORS.accent },
            { value: "171%", label: "ROI trung bình", color: COLORS.success },
            { value: "40h", label: "tiết kiệm/tuần", color: COLORS.secondary },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "16px 28px",
                borderRadius: 16,
                background: `${COLORS.bgLight}80`,
                border: `1px solid ${stat.color}30`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 800,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 14,
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 6,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.purple}, ${COLORS.success}, ${COLORS.secondary})`,
        }}
      />
    </AbsoluteFill>
  );
};
