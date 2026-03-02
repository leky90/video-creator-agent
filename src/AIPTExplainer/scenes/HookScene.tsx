import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, HOOK_DURATION } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, HOOK_DURATION - 15), HOOK_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          opacity: opacity * fadeOut,
          textAlign: "center",
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 96,
            fontWeight: 700,
            color: COLORS.accent,
          }}
        >
          7,5 giờ
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            color: COLORS.muted,
            marginTop: 8,
          }}
        >
          mỗi tuần tiết kiệm nhờ AI
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            color: COLORS.accentLight,
            marginTop: 32,
            opacity: taglineOpacity,
          }}
        >
          Bí quyết là gì?
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.hook} />
    </AbsoluteFill>
  );
};
