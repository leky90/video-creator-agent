import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";

const BrandLogo: React.FC<{
  color: string;
  label: string;
  icon: React.ReactNode;
}> = ({ color, label, icon }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
    }}
  >
    <div
      style={{
        width: 160,
        height: 160,
        borderRadius: 40,
        background: `linear-gradient(135deg, ${color}30, ${color}10)`,
        border: `3px solid ${color}80`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 40px ${color}40, 0 0 80px ${color}15`,
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        fontWeight: 700,
        color,
        letterSpacing: 1,
      }}
    >
      {label}
    </span>
  </div>
);

const VsBadge: React.FC = () => (
  <div
    style={{
      width: 72,
      height: 72,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.secondary}, #ff6b6b)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 30px ${COLORS.secondary}60`,
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 26,
        fontWeight: 900,
        color: COLORS.white,
      }}
    >
      VS
    </span>
  </div>
);

const ChatGPTIcon: React.FC = () => (
  <svg width={90} height={90} viewBox="0 0 90 90">
    <circle cx={45} cy={45} r={38} fill={COLORS.chatgpt} opacity={0.15} />
    <path
      d="M45 15 C60 15 72 27 72 42 C72 57 60 69 45 69 C30 69 18 57 18 42 C18 27 30 15 45 15Z"
      fill="none"
      stroke={COLORS.chatgpt}
      strokeWidth={3}
    />
    <circle cx={45} cy={42} r={14} fill={COLORS.chatgpt} />
    <path
      d="M38 42 L43 47 L52 37"
      fill="none"
      stroke={COLORS.white}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1={45} y1={56} x2={45} y2={75} stroke={COLORS.chatgpt} strokeWidth={2.5} opacity={0.6} />
  </svg>
);

const ClaudeIcon: React.FC = () => (
  <svg width={90} height={90} viewBox="0 0 90 90">
    <circle cx={45} cy={42} r={34} fill={COLORS.claude} opacity={0.15} />
    <rect x={20} y={18} width={50} height={50} rx={16} fill="none" stroke={COLORS.claude} strokeWidth={3} />
    <circle cx={45} cy={38} r={12} fill={COLORS.claude} />
    <text
      x={45}
      y={43}
      textAnchor="middle"
      fill={COLORS.white}
      fontSize={16}
      fontWeight={800}
      fontFamily={FONT_FAMILY}
    >
      C
    </text>
    <path d="M32 58 Q45 72 58 58" fill="none" stroke={COLORS.claude} strokeWidth={2.5} opacity={0.6} />
  </svg>
);

const GeminiIcon: React.FC = () => (
  <svg width={90} height={90} viewBox="0 0 90 90">
    <circle cx={45} cy={45} r={36} fill={COLORS.gemini} opacity={0.1} />
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 45 + Math.cos(rad) * 16;
      const y1 = 45 + Math.sin(rad) * 16;
      const x2 = 45 + Math.cos(rad) * 34;
      const y2 = 45 + Math.sin(rad) * 34;
      const colors = [COLORS.gemini, "#ea4335", "#fbbc05", "#34a853", COLORS.gemini];
      return (
        <React.Fragment key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors[i]} strokeWidth={4} strokeLinecap="round" />
          <circle cx={x2} cy={y2} r={5} fill={colors[i]} />
        </React.Fragment>
      );
    })}
    <circle cx={45} cy={45} r={12} fill={COLORS.gemini} />
    <text
      x={45}
      y={50}
      textAnchor="middle"
      fill={COLORS.white}
      fontSize={14}
      fontWeight={800}
      fontFamily={FONT_FAMILY}
    >
      G
    </text>
  </svg>
);

export const AIBattle2026Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 70%, ${COLORS.accent}18, ${COLORS.bgDark})`,
      }}
    >
      {/* Gradient mesh spots */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.chatgpt}12, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gemini}10, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.claude}08, transparent 70%)`,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          So sánh toàn diện
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 62,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.15,
          }}
        >
          <span style={{ color: COLORS.chatgpt }}>ChatGPT</span>
          {" vs "}
          <span style={{ color: COLORS.claude }}>Claude</span>
          {" vs "}
          <span style={{ color: COLORS.gemini }}>Gemini</span>
        </span>
      </div>

      {/* 3 logos row */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        <BrandLogo
          color={COLORS.chatgpt}
          label="GPT-5"
          icon={<ChatGPTIcon />}
        />
        <VsBadge />
        <BrandLogo
          color={COLORS.claude}
          label="Claude 4"
          icon={<ClaudeIcon />}
        />
        <VsBadge />
        <BrandLogo
          color={COLORS.gemini}
          label="Gemini 2.5"
          icon={<GeminiIcon />}
        />
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            background: `linear-gradient(90deg, ${COLORS.accent}20, ${COLORS.secondary}20, ${COLORS.accent}20)`,
            borderRadius: 16,
            padding: "14px 40px",
            border: `1px solid ${COLORS.accent}30`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 32,
              fontWeight: 800,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary}, ${COLORS.accentLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Đâu là AI tốt nhất 2026?
          </span>
          <span style={{ fontSize: 32 }}>🤖</span>
        </div>
      </div>

      {/* Corner badge */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          background: `linear-gradient(135deg, ${COLORS.secondary}, #ff6b6b)`,
          borderRadius: 12,
          padding: "8px 20px",
          boxShadow: `0 4px 20px ${COLORS.secondary}40`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          2026
        </span>
      </div>
    </AbsoluteFill>
  );
};
