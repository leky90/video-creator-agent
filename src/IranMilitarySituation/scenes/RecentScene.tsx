import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Zap, Ship, Atom } from "lucide-react";
import { COLORS, FONT_FAMILY } from "../constants";

export const RecentScene: React.FC = () => {
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

  const leftProg = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200, stiffness: 100 },
  });
  const rightProg = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200, stiffness: 100 },
  });

  const pulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.95, 1.05]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #1a0a0a)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "25%",
          width: 400,
          height: 400,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.danger}10, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.textPrimary,
        }}
      >
        Diễn biến gần đây
      </div>
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "28%",
          transform: `translate(-50%, -50%) scale(${leftProg * pulse})`,
          opacity: leftProg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `${COLORS.danger}20`,
            border: `2px solid ${COLORS.danger}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={48} color={COLORS.danger} strokeWidth={2} />
        </div>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary, textAlign: "center" }}>
          Không kích qua lại · Tập trận Hormuz
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "72%",
          transform: `translate(-50%, -50%) scale(${rightProg})`,
          opacity: rightProg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `${COLORS.secondary}20`,
            border: `2px solid ${COLORS.secondary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ship size={40} color={COLORS.secondary} strokeWidth={2} />
        </div>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary, textAlign: "center" }}>
          Vũ khí Nga, Trung Quốc
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Atom size={28} color={COLORS.accent} strokeWidth={2} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 16, color: COLORS.textSecondary }}>Hạt nhân bị làm chậm</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
