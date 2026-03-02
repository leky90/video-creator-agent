import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, PROBLEM_DURATION } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const crossedStyle: React.CSSProperties = {
  color: COLORS.muted,
  opacity: 0.9,
  textDecoration: "line-through",
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const boxOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label1 = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label2 = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label3 = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, PROBLEM_DURATION - 15), PROBLEM_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div style={{ opacity: boxOpacity * fadeOut, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.muted,
            padding: "14px 24px",
            backgroundColor: "rgba(100, 116, 139, 0.12)",
            borderRadius: 12,
            maxWidth: 420,
            marginBottom: 20,
          }}
        >
          "Viết về marketing đi"
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: COLORS.body,
            padding: "12px 20px",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            borderRadius: 12,
            maxWidth: 400,
            marginLeft: 60,
          }}
        >
          → Kết quả chung chung, không dùng được
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 220,
          display: "flex",
          gap: 56,
          opacity: fadeOut,
        }}
      >
        <div style={{ opacity: label1, ...crossedStyle }}>
          <span style={{ fontSize: 36 }}>Mơ hồ</span>
        </div>
        <div style={{ opacity: label2, ...crossedStyle }}>
          <span style={{ fontSize: 36 }}>Thiếu ngữ cảnh</span>
        </div>
        <div style={{ opacity: label3, ...crossedStyle }}>
          <span style={{ fontSize: 36 }}>Không định dạng</span>
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.problem} />
    </AbsoluteFill>
  );
};
