import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

export const CTAScene: React.FC = () => {
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

  const rocketScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const rocketFloat = Math.sin(frame * 0.04) * 8;

  const titleProg = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const buttonProg = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const buttonPulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const glowIntensity = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(ellipse at 50% 40%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
      }}
    >
      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2 + frame * 0.008;
        const radius = 200 + (i * 17) % 500;
        const px = 960 + radius * Math.cos(angle);
        const py = 400 + radius * Math.sin(angle) * 0.7;
        const size = 2 + (i % 4);
        const color = i % 4 === 0 ? COLORS.accent : i % 4 === 1 ? COLORS.success : i % 4 === 2 ? COLORS.purple : COLORS.teal;
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
              opacity: 0.08 + (i % 5) * 0.03,
            }}
          />
        );
      })}

      {/* Large ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}12, transparent 70%)`,
        }}
      />

      {/* Rocket SVG */}
      <div
        style={{
          position: "absolute",
          top: `calc(22% + ${rocketFloat}px)`,
          left: "50%",
          transform: `translate(-50%, 0) scale(${rocketScale})`,
          opacity: rocketScale,
        }}
      >
        <svg width={160} height={200} viewBox="0 0 160 200">
          <defs>
            <linearGradient id="cta-rocket-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.accent} />
              <stop offset="100%" stopColor={COLORS.accentLight} />
            </linearGradient>
            <radialGradient id="cta-window-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={COLORS.white} stopOpacity={0.9} />
              <stop offset="100%" stopColor={COLORS.accentLight} stopOpacity={0.3} />
            </radialGradient>
          </defs>

          {/* Flame */}
          <path
            d={`M60 155 Q80 ${195 + Math.sin(frame * 0.3) * 8} 100 155`}
            fill={COLORS.secondary}
            opacity={0.9}
          />
          <path
            d={`M65 155 Q80 ${185 + Math.sin(frame * 0.4) * 5} 95 155`}
            fill={COLORS.danger}
            opacity={0.7}
          />
          <path
            d={`M70 155 Q80 ${175 + Math.sin(frame * 0.5) * 3} 90 155`}
            fill={COLORS.secondary}
            opacity={0.5}
          />

          {/* Body */}
          <path
            d="M80 10 C55 30 50 80 50 130 L60 155 L100 155 L110 130 C110 80 105 30 80 10Z"
            fill="url(#cta-rocket-body)"
            stroke={COLORS.accentLight}
            strokeWidth={1}
          />

          {/* Fins */}
          <path d="M50 120 L30 155 L55 145 Z" fill={COLORS.accent} opacity={0.8} />
          <path d="M110 120 L130 155 L105 145 Z" fill={COLORS.accent} opacity={0.8} />

          {/* Window */}
          <circle cx={80} cy={65} r={18} fill="url(#cta-window-glow)" stroke={COLORS.white} strokeWidth={1.5} opacity={0.9} />

          {/* Detail lines */}
          <line x1={55} y1={110} x2={105} y2={110} stroke={COLORS.accentLight} strokeWidth={1} opacity={0.5} />
          <line x1={58} y1={120} x2={102} y2={120} stroke={COLORS.accentLight} strokeWidth={1} opacity={0.3} />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.textPrimary,
            marginBottom: 16,
          }}
        >
          Bắt đầu với{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.success})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Automation
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.textSecondary,
          }}
        >
          Đừng để doanh nghiệp tụt lại phía sau
        </div>
      </div>

      {/* CTA button */}
      <div
        style={{
          position: "absolute",
          top: "74%",
          left: "50%",
          transform: `translateX(-50%) scale(${buttonProg * buttonPulse})`,
          opacity: buttonProg,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.success})`,
            borderRadius: 50,
            padding: "18px 60px",
            boxShadow: `0 0 ${30 * glowIntensity}px ${COLORS.accent}50, 0 4px 20px rgba(0,0,0,0.3)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.white,
              letterSpacing: 1,
            }}
          >
            Like & Subscribe
          </span>
        </div>
      </div>

      {/* Social icons row */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
        }}
      >
        {[
          { label: "Like", iconPath: "M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3", delay: 180 },
          { label: "Subscribe", iconPath: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", delay: 210 },
          { label: "Share", iconPath: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13", delay: 240 },
        ].map((item, i) => {
          const iconProg = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: iconProg,
                transform: `translateY(${(1 - iconProg) * 20}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  backgroundColor: `${COLORS.bgLight}80`,
                  border: `1px solid ${COLORS.accent}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={COLORS.accentLight} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.iconPath} />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 13,
                  color: COLORS.textSecondary,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
