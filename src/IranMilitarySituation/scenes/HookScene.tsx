import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Globe } from "lucide-react";
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

  const iconScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 200, stiffness: 120 },
  });

  const titleProg = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  const glowPulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.7, 1.2]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          width: 400 * glowPulse,
          height: 400 * glowPulse,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.danger}12, transparent 70%)`,
        }}
      />
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 97 + 30) % 1920,
            top: 1080 - ((i * 61 + frame * 0.4) % 900),
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            borderRadius: "50%",
            backgroundColor: COLORS.danger,
            opacity: 0.06,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${iconScale})`,
          opacity: iconScale,
        }}
      >
        <Globe size={180} color={COLORS.dangerLight} strokeWidth={1.5} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 30}px)`,
          opacity: titleProg,
          textAlign: "center",
          maxWidth: 900,
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
          Tình hình chiến sự Iran —{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.danger}, ${COLORS.dangerLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            bối cảnh và tác động
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
