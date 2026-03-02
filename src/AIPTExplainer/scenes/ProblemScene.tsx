import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AUDIO_SEGMENTS,
  COLORS,
  FONT_FAMILY,
  PROBLEM_DURATION,
} from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const items = [
  { label: "Email chồng chất", delay: 0 },
  { label: "Lịch họp dày đặc", delay: 15 },
  { label: "Viết báo cáo mất cả buổi", delay: 35 },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [Math.max(0, PROBLEM_DURATION - 15), PROBLEM_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div style={{ opacity: fadeOut, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            color: COLORS.body,
            marginBottom: 48,
          }}
        >
          {items.map((item, i) => {
            const opacity = interpolate(
              frame,
              [item.delay, item.delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div key={i} style={{ marginBottom: 16, opacity }}>
                {item.label}
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            color: COLORS.muted,
            marginTop: 24,
          }}
        >
          Thiếu thời gian cho việc quan trọng
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.problem} />
    </AbsoluteFill>
  );
};
