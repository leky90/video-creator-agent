import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_REALWORLD_DURATION } from "../constants";

const STATS = [
  {
    company: "Klarna",
    number: 2.3,
    unit: "M",
    label: "cuộc hội thoại/tháng",
    decimals: 1,
    color: COLORS.accent,
    delay: 30,
  },
  {
    company: "JPMorgan",
    number: 1.5,
    unit: "B$",
    label: "tiết kiệm",
    decimals: 1,
    color: COLORS.success,
    delay: 150,
  },
  {
    company: "GitHub Copilot",
    number: 46,
    unit: "%",
    label: "code do AI viết",
    decimals: 0,
    color: COLORS.secondary,
    delay: 300,
  },
  {
    company: "ROI trung bình",
    number: 200,
    unit: "%+",
    label: "lợi nhuận đầu tư",
    decimals: 0,
    color: COLORS.purple,
    delay: 440,
  },
];

const CompanyBadge: React.FC<{
  name: string;
  color: string;
  scale: number;
}> = ({ name, color, scale }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 16px",
      borderRadius: 20,
      border: `2px solid ${color}60`,
      backgroundColor: `${color}15`,
      transform: `scale(${scale})`,
    }}
  >
    <svg width={20} height={20} viewBox="0 0 20 20">
      <rect x={2} y={2} width={16} height={16} rx={4} fill={color} opacity={0.8} />
      <text
        x={10}
        y={14}
        textAnchor="middle"
        fontFamily="Inter"
        fontSize={10}
        fontWeight={700}
        fill={COLORS.white}
      >
        {name.charAt(0)}
      </text>
    </svg>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 16,
        fontWeight: 600,
        color,
      }}
    >
      {name}
    </span>
  </div>
);

export const RealWorldScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_REALWORLD_DURATION;

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
        background: `radial-gradient(circle at 50% 30%, #0c1e3d, ${COLORS.bgDark})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {Array.from({ length: 16 }).map((_, i) => {
        const px = (i * 137.5 + 50) % 1920;
        const py = (i * 97.3 + frame * 0.22) % 1080;
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
              backgroundColor:
                i % 3 === 0
                  ? COLORS.accent
                  : i % 3 === 1
                    ? COLORS.success
                    : COLORS.secondary,
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
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Kết quả{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ấn tượng
          </span>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
          flexWrap: "wrap",
        }}
      >
        {STATS.map((stat, i) => {
          const cardSpring = spring({
            frame: frame - stat.delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });

          const counterProg = interpolate(
            frame,
            [stat.delay + 20, stat.delay + 140],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const easedCounter = Easing.out(Easing.quad)(counterProg);
          const displayNum = (easedCounter * stat.number).toFixed(
            stat.decimals,
          );

          const circumference = 2 * Math.PI * 70;
          const strokeDashoffset = circumference * (1 - easedCounter);

          const glowIntensity = interpolate(counterProg, [0.8, 1], [0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                transform: `translateY(${(1 - cardSpring) * 60}px)`,
                opacity: cardSpring,
              }}
            >
              <CompanyBadge
                name={stat.company}
                color={stat.color}
                scale={cardSpring}
              />

              <div style={{ position: "relative", width: 170, height: 170 }}>
                <svg width={170} height={170} viewBox="0 0 170 170">
                  <circle
                    cx={85}
                    cy={85}
                    r={70}
                    fill="none"
                    stroke={`${COLORS.bgLight}40`}
                    strokeWidth={6}
                  />
                  <circle
                    cx={85}
                    cy={85}
                    r={70}
                    fill="none"
                    stroke={stat.color}
                    strokeWidth={6}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 85 85)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 36,
                      fontWeight: 800,
                      color: COLORS.white,
                      textShadow: `0 0 ${20 * glowIntensity}px ${stat.color}50`,
                    }}
                  >
                    {displayNum}
                    {stat.unit}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  textAlign: "center",
                  maxWidth: 160,
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
