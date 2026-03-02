import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY } from "../constants";

const container: React.CSSProperties = {
  background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.background} 100%)`,
  justifyContent: "center",
  alignItems: "center",
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineScale = interpolate(frame, [0, 20], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={container}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.title,
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            marginBottom: 24,
          }}
        >
          Thử ngay một công cụ
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            color: COLORS.body,
            opacity: taglineOpacity,
          }}
        >
          Tương lai bạn sẽ cảm ơn bạn
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.cta} />
    </AbsoluteFill>
  );
};
