import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY } from "../constants";

const container: React.CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.accent}18 0%, ${COLORS.background} 50%)`,
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const keywords = ["Rõ ràng", "Ngữ cảnh", "Định dạng"];

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={container}>
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {keywords.map((word, i) => {
            const wordOpacity = interpolate(
              frame,
              [15 + i * 8, 35 + i * 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={word}
                style={{
                  opacity: wordOpacity,
                  fontFamily: FONT_FAMILY,
                  fontSize: 42,
                  fontWeight: 700,
                  color: COLORS.accent,
                  padding: "16px 28px",
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 12,
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            color: COLORS.body,
          }}
        >
          Thử ngay với lần hỏi AI tiếp theo
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.cta} />
    </AbsoluteFill>
  );
};
