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

const BAR_DATA = [
  { label: "Chi phí", value: 0.85, color: COLORS.danger },
  { label: "Sai sót", value: 0.72, color: COLORS.dangerLight },
  { label: "Kiệt sức", value: 0.68, color: COLORS.secondary },
];

const COMPETITOR_ITEMS = [
  { label: "Phản hồi nhanh x10", delay: 120, x: 1300 },
  { label: "Chi phí thấp hơn 40%", delay: 150, x: 1320 },
  { label: "Tự động 24/7", delay: 180, x: 1280 },
];

export const AgitateScene: React.FC = () => {
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

  const redOverlay = interpolate(frame, [80, 250], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shake = frame > 200
    ? Math.sin(frame * 0.6) * interpolate(frame, [200, 350], [0, 3], { extrapolateRight: "clamp" })
    : 0;

  const titleProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const dividerProg = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(200deg, ${COLORS.bgDark}, #1a0a0a)`,
        transform: `translateX(${shake}px)`,
      }}
    >
      {/* Red warning overlay */}
      <AbsoluteFill style={{ backgroundColor: COLORS.danger, opacity: redOverlay }} />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const px = (i * 137.5 + 60) % 1920;
        const py = ((i * 89.3 + frame * 0.35) % 1080);
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
              backgroundColor: COLORS.danger,
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
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Hậu quả của{" "}
          <span style={{ color: COLORS.danger }}>không hành động</span>
        </span>
      </div>

      {/* LEFT SIDE — Your business: rising bars */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 80,
          width: 700,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.textSecondary,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Doanh nghiệp của bạn
        </div>

        {BAR_DATA.map((bar, i) => {
          const barProg = interpolate(frame, [40 + i * 30, 140 + i * 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const easedBar = Easing.out(Easing.cubic)(barProg);
          const width = easedBar * bar.value * 550;

          return (
            <div key={i} style={{ marginBottom: 32, position: "relative" }}>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {/* Warning triangle icon */}
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={bar.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
                </svg>
                {bar.label}
              </div>
              <div
                style={{
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: `${COLORS.bgLight}60`,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width,
                    borderRadius: 14,
                    background: `linear-gradient(90deg, ${bar.color}cc, ${bar.color})`,
                    boxShadow: `0 0 12px ${bar.color}40`,
                    position: "relative",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: FONT_FAMILY,
                    fontSize: 14,
                    fontWeight: 700,
                    color: COLORS.white,
                  }}
                >
                  {Math.round(easedBar * bar.value * 100)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CENTER DIVIDER */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: "50%",
          transform: "translateX(-50%)",
          height: interpolate(dividerProg, [0, 1], [0, 500]),
          width: 2,
          background: `linear-gradient(180deg, ${COLORS.danger}80, transparent)`,
        }}
      />

      {/* RIGHT SIDE — Competitor */}
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 80,
          width: 700,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.success,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Đối thủ của bạn
        </div>

        {/* Competitor SVG illustration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            <defs>
              <linearGradient id="rocket-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.success} />
                <stop offset="100%" stopColor={COLORS.teal} />
              </linearGradient>
            </defs>
            {/* Rocket body */}
            <path
              d="M60 15 L72 55 L60 75 L48 55 Z"
              fill="url(#rocket-grad)"
              stroke={COLORS.successLight}
              strokeWidth={1}
            />
            {/* Fins */}
            <path d="M48 55 L35 70 L48 65 Z" fill={COLORS.teal} />
            <path d="M72 55 L85 70 L72 65 Z" fill={COLORS.teal} />
            {/* Window */}
            <circle cx={60} cy={40} r={8} fill={COLORS.bgDark} stroke={COLORS.successLight} strokeWidth={1} />
            {/* Flame */}
            <path
              d={`M52 75 Q60 ${95 + Math.sin(frame * 0.3) * 5} 68 75`}
              fill={COLORS.secondary}
              opacity={0.8}
            />
            <path
              d={`M55 75 Q60 ${88 + Math.sin(frame * 0.4) * 3} 65 75`}
              fill={COLORS.danger}
              opacity={0.6}
            />
          </svg>
        </div>

        {COMPETITOR_ITEMS.map((item, i) => {
          const prog = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: prog,
                transform: `translateX(${(1 - prog) * 60}px)`,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 20,
                  fontWeight: 600,
                  color: COLORS.successLight,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom warning */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [300, 340], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.danger,
            textAlign: "center",
            textShadow: `0 0 20px ${COLORS.danger}40`,
          }}
        >
          Khoảng cách sẽ chỉ ngày càng lớn hơn
        </div>
      </div>
    </AbsoluteFill>
  );
};
