import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const AgentBrainSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.accent} />
        <stop offset="50%" stopColor={COLORS.purple} />
        <stop offset="100%" stopColor={COLORS.cyan} />
      </linearGradient>
      <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.6} />
        <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
      </radialGradient>
      <filter id="chipGlow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx={100} cy={100} r={90} fill="url(#coreGlow)" />
    <g filter="url(#chipGlow)">
      <rect x={55} y={55} width={90} height={90} rx={18} fill="url(#agentGrad)" opacity={0.95} />
      <circle cx={80} cy={85} r={8} fill={COLORS.white} opacity={0.9} />
      <circle cx={120} cy={85} r={8} fill={COLORS.white} opacity={0.9} />
      <circle cx={80} cy={85} r={3} fill={COLORS.bgDark} />
      <circle cx={120} cy={85} r={3} fill={COLORS.bgDark} />
      <path d="M85 115 Q100 128 115 115" stroke={COLORS.white} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
      {/* Circuit traces from chip */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 48;
        const y1 = 100 + Math.sin(rad) * 48;
        const x2 = 100 + Math.cos(rad) * 78;
        const y2 = 100 + Math.sin(rad) * 78;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.5} />
        );
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 78;
        const cy = 100 + Math.sin(rad) * 78;
        return <circle key={`d${i}`} cx={cx} cy={cy} r={3} fill={COLORS.accentLight} opacity={0.7} />;
      })}
    </g>
  </svg>
);

const capabilityNodes = [
  { angle: 30, label: "Perceive", icon: "👁", color: COLORS.accent },
  { angle: 100, label: "Plan", icon: "🧠", color: COLORS.purple },
  { angle: 170, label: "Act", icon: "⚡", color: COLORS.secondary },
  { angle: 240, label: "Learn", icon: "📚", color: COLORS.success },
  { angle: 310, label: "Tools", icon: "🔧", color: COLORS.cyan },
];

export const AIAgentExplainerThumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 40%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}18, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          right: -80,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purple}15, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "25%",
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}08, transparent 55%)`,
        }}
      />

      {/* Grid overlay */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            top: i * 100,
            left: 0,
            width: "100%",
            height: 1,
            background: `${COLORS.accent}06`,
          }}
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: i * 100,
            width: 1,
            height: "100%",
            background: `${COLORS.accent}06`,
          }}
        />
      ))}

      {/* Central AI Agent illustration */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "26%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Orbit rings */}
        <svg
          width={560}
          height={560}
          viewBox="0 0 560 560"
          style={{ position: "absolute", top: -140, left: -140 }}
        >
          <circle cx={280} cy={280} r={220} fill="none" stroke={`${COLORS.accent}18`} strokeWidth={1.5} strokeDasharray="10 8" />
          <circle cx={280} cy={280} r={170} fill="none" stroke={`${COLORS.purple}12`} strokeWidth={1} strokeDasharray="6 10" />
          <circle cx={280} cy={280} r={120} fill="none" stroke={`${COLORS.cyan}10`} strokeWidth={1} strokeDasharray="4 12" />
        </svg>

        <AgentBrainSVG size={280} />

        {/* Capability nodes */}
        {capabilityNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const dist = 210;
          const nx = Math.cos(rad) * dist;
          const ny = Math.sin(rad) * dist;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 140 + nx - 32,
                top: 140 + ny - 32,
                width: 64,
                height: 64,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.bgLight}, ${COLORS.bgMid})`,
                border: `2px solid ${node.color}50`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 24px ${node.color}20`,
              }}
            >
              <span style={{ fontSize: 24 }}>{node.icon}</span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 9,
                  fontWeight: 600,
                  color: node.color,
                  marginTop: 2,
                  letterSpacing: 0.5,
                }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Title block — right side */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 60,
          transform: "translateY(-50%)",
          width: 600,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", alignSelf: "flex-start" }}>
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 24,
              background: `linear-gradient(90deg, ${COLORS.accent}30, ${COLORS.purple}30)`,
              border: `1px solid ${COLORS.accent}50`,
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.accentLight,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Giải thích A-Z
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            color: COLORS.white,
          }}
        >
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight}, ${COLORS.cyan})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Agent
          </span>
          <br />
          <span>là gì?</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.5,
          }}
        >
          Cách hoạt động từ A đến Z
        </div>

        {/* Process flow pills */}
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {["Perceive", "Plan", "Act", "Observe"].map((step, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: `${COLORS.bgLight}90`,
                  border: `1px solid ${COLORS.accent}30`,
                  fontFamily: FONT_FAMILY,
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.accentLight,
                }}
              >
                {step}
              </div>
              {i < 3 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: COLORS.textSecondary,
                    fontSize: 16,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
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
          height: 5,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.purple}, ${COLORS.cyan}, ${COLORS.success})`,
        }}
      />
    </AbsoluteFill>
  );
};
