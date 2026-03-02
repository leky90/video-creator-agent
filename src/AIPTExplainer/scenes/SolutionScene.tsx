import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AUDIO_SEGMENTS,
  COLORS,
  FONT_FAMILY,
  SOLUTION_DURATION,
} from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const checklist = ["Email", "Sắp lịch", "Ghi chú cuộc họp", "Tự động hóa"];

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, SOLUTION_DURATION - 15), SOLUTION_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div style={{ opacity: fadeOut, textAlign: "center", maxWidth: 800 }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.accent,
            opacity: headlineOpacity,
            marginBottom: 40,
          }}
        >
          Công cụ năng suất AI
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {checklist.map((item, i) => {
            const opacity = interpolate(
              frame,
              [25 + i * 8, 25 + i * 8 + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 28,
                  color: COLORS.body,
                  padding: "12px 24px",
                  backgroundColor: COLORS.bgMid,
                  borderRadius: 8,
                  opacity,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            color: COLORS.accentLight,
            marginTop: 40,
          }}
        >
          Tập trung vào công việc đáng giá
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.solution} />
    </AbsoluteFill>
  );
};
