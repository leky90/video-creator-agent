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
  const questionOpacity = interpolate(frame, [25, 50], [0, 1], {
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
      <div style={{ opacity: opacity * fadeOut, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.accent,
            marginBottom: 16,
          }}
        >
          AI trả lời sai ý?
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            color: COLORS.muted,
            marginBottom: 32,
          }}
        >
          Lỗi có thể nằm ở prompt
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.title,
            opacity: questionOpacity,
          }}
        >
          Prompt là gì — dùng thế nào cho đúng?
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.hook} />
    </AbsoluteFill>
  );
};
