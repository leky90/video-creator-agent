import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { TrendingUp, ShieldAlert, Scale } from "lucide-react";
import { COLORS, FONT_FAMILY } from "../constants";

export const ImpactScene: React.FC = () => {
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
    frame: frame - 15,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  const barProgress = interpolate(frame, [80, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barEased = Easing.out(Easing.cubic)(barProgress);

  const itemsProg = spring({
    frame: frame - 100,
    fps,
    config: { damping: 200, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #0a1a0a)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 20}px)`,
          opacity: titleProg,
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.textPrimary,
        }}
      >
        Tác động lan rộng
      </div>
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          opacity: itemsProg,
        }}
      >
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: COLORS.bgLight,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barEased * 100}%`,
              borderRadius: 4,
              background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.danger})`,
              transition: "width 0.1s",
            }}
          />
        </div>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 16, color: COLORS.textSecondary }}>
          Căng thẳng ↑ → bất ổn thị trường
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
          opacity: itemsProg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <TrendingUp size={32} color={COLORS.secondary} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>Giá dầu, thị trường</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ShieldAlert size={32} color={COLORS.danger} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>An ninh Vịnh, Lebanon</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Scale size={32} color={COLORS.accent} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>Đàm phán bế tắc</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
