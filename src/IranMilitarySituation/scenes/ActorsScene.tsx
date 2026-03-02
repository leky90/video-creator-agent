import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Shield, Flag, Building2 } from "lucide-react";
import { COLORS, FONT_FAMILY } from "../constants";

const ACTORS = [
  {
    title: "Iran",
    desc: "Bảo vệ chế độ, mở rộng ảnh hưởng",
    icon: Shield,
    color: COLORS.danger,
    delay: 0,
  },
  {
    title: "Israel",
    desc: "Ngăn vũ khí hạt nhân, đối phó proxy",
    icon: Flag,
    color: COLORS.accent,
    delay: 30,
  },
  {
    title: "Mỹ",
    desc: "Trừng phạt, hiện diện quân sự, đồng minh",
    icon: Building2,
    color: COLORS.secondary,
    delay: 60,
  },
];

export const ActorsScene: React.FC = () => {
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

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, #1a0a0a, ${COLORS.bgDark})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 45,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 20}px)`,
          opacity: titleProg,
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.textPrimary,
        }}
      >
        Ba bên chính
      </div>
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 80,
        }}
      >
        {ACTORS.map((a, i) => {
          const Icon = a.icon;
          const prog = spring({
            frame: frame - 80 - a.delay,
            fps,
            config: { damping: 200, stiffness: 100 },
          });
          return (
            <div
              key={i}
              style={{
                width: 320,
                opacity: prog,
                transform: `translateY(${(1 - prog) * 40}px)`,
                background: `${COLORS.bgLight}88`,
                borderRadius: 24,
                border: `2px solid ${a.color}40`,
                padding: 36,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: `${a.color}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={36} color={a.color} strokeWidth={2} />
              </div>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                }}
              >
                {a.title}
              </span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {a.desc}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
