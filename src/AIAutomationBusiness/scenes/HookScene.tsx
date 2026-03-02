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

export const HookScene: React.FC = () => {
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

  const counterProgress = interpolate(frame, [30, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = Easing.out(Easing.cubic)(counterProgress);
  const displayPercent = Math.round(88 * eased);

  const secondCounterProgress = interpolate(frame, [180, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const secondEased = Easing.out(Easing.cubic)(secondCounterProgress);
  const displaySmall = Math.round(7 * secondEased);

  const ringCircumference = 2 * Math.PI * 130;
  const ringOffset = ringCircumference * (1 - eased);

  const smallRingCircumference = 2 * Math.PI * 70;
  const smallRingOffset = smallRingCircumference * (1 - secondEased * 0.07);

  const titleProg = spring({
    frame: frame - 300,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const subtitleOpacity = interpolate(frame, [340, 370], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.7, 1.3]);

  const vsScale = spring({
    frame: frame - 200,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(ellipse at 40% 50%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
      }}
    >
      {/* Ambient glow behind main counter */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "30%",
          width: 500 * glowPulse,
          height: 500 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}18, transparent 70%)`,
        }}
      />

      {/* Secondary glow for small counter */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "18%",
          width: 300 * glowPulse,
          height: 300 * glowPulse,
          transform: "translate(50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.danger}14, transparent 70%)`,
        }}
      />

      {/* Particles drifting upward */}
      {Array.from({ length: 30 }).map((_, i) => {
        const px = (i * 137.5 + 50) % 1920;
        const py = 1080 - ((i * 73.7 + frame * 0.5) % 1200);
        const size = 2 + (i % 4);
        const color = i % 3 === 0 ? COLORS.accent : i % 3 === 1 ? COLORS.success : COLORS.purple;
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

      {/* Main 88% counter — left side */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "30%",
          transform: "translate(-50%, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ position: "relative" }}>
          <svg width={300} height={300} viewBox="0 0 300 300">
            <circle
              cx={150}
              cy={150}
              r={130}
              fill="none"
              stroke={`${COLORS.bgLight}50`}
              strokeWidth={8}
            />
            <circle
              cx={150}
              cy={150}
              r={130}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={8}
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
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
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 80,
                fontWeight: 800,
                color: COLORS.white,
                textShadow: `0 0 30px ${COLORS.accent}50`,
                lineHeight: 1,
              }}
            >
              {displayPercent}%
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 16,
                fontWeight: 500,
                color: COLORS.textSecondary,
                marginTop: 4,
              }}
            >
              đã dùng AI
            </div>
          </div>
        </div>
      </div>

      {/* VS divider */}
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: `translate(-50%, 0) scale(${vsScale})`,
          opacity: vsScale,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.secondary,
            textShadow: `0 0 20px ${COLORS.secondary}40`,
          }}
        >
          nhưng chỉ
        </div>
      </div>

      {/* Small 7% counter — right side */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          right: "18%",
          transform: "translate(50%, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ position: "relative" }}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            <circle
              cx={100}
              cy={100}
              r={70}
              fill="none"
              stroke={`${COLORS.bgLight}50`}
              strokeWidth={6}
            />
            <circle
              cx={100}
              cy={100}
              r={70}
              fill="none"
              stroke={COLORS.danger}
              strokeWidth={6}
              strokeDasharray={smallRingCircumference}
              strokeDashoffset={smallRingOffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
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
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 56,
                fontWeight: 800,
                color: COLORS.dangerLight,
                textShadow: `0 0 20px ${COLORS.danger}40`,
                lineHeight: 1,
              }}
            >
              {displaySmall}%
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
              mở rộng thành công
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Sự khác biệt?{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Automation
          </span>
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.textSecondary,
          }}
        >
          Tại sao nó đang thay đổi cuộc chơi cho doanh nghiệp
        </span>
      </div>
    </AbsoluteFill>
  );
};
