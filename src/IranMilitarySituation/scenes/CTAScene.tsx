import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ThumbsUp, Bell } from "lucide-react";
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

  const titleProg = spring({
    frame: frame - 40,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  const buttonProg = spring({
    frame: frame - 120,
    fps,
    config: { damping: 200, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `radial-gradient(circle at 50% 40%, ${COLORS.bgMid}, ${COLORS.bgDark})`,
      }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 137 + 20) % 1920,
            top: (i * 83 + frame * 0.3) % 1080,
            width: 3,
            height: 3,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? COLORS.accent : COLORS.success,
            opacity: 0.1,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 30}px)`,
          opacity: titleProg,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Hiểu bối cảnh — theo dõi tin tức có chiều sâu
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: `translateX(-50%) scale(${buttonProg})`,
          opacity: buttonProg,
          display: "flex",
          gap: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 50,
            background: `${COLORS.accent}22`,
            border: `2px solid ${COLORS.accent}60`,
          }}
        >
          <ThumbsUp size={28} color={COLORS.accentLight} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>Like</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 50,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.success})`,
            boxShadow: `0 0 24px ${COLORS.accent}40`,
          }}
        >
          <Bell size={28} color={COLORS.white} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 600, color: COLORS.white }}>Subscribe</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          color: COLORS.textSecondary,
        }}
      >
        Hẹn gặp lại
      </div>
    </AbsoluteFill>
  );
};
