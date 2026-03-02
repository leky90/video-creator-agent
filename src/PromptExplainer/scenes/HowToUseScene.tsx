import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, HOW_TO_USE_DURATION } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const steps = [
  "Nói rõ: cần gì, cho ai, tone thế nào",
  "Một prompt — một mục tiêu",
  "Thêm ví dụ nếu cần",
  "Chỉnh đi chỉnh lại theo kết quả",
];

export const HowToUseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [Math.max(0, HOW_TO_USE_DURATION - 15), HOW_TO_USE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          opacity: fadeOut,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 560,
        }}
      >
        {steps.map((text, i) => {
          const opacity = interpolate(
            frame,
            [15 + i * 25, 40 + i * 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 24px",
                backgroundColor: "rgba(37, 99, 235, 0.08)",
                borderRadius: 12,
                borderLeft: `4px solid ${COLORS.accent}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.accent,
                  minWidth: 36,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  color: COLORS.body,
                }}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.how_to_use} />
    </AbsoluteFill>
  );
};
