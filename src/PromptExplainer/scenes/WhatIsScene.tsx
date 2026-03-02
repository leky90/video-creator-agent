import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, WHAT_IS_DURATION } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const items = [
  { label: "Vai trò", sub: "Role" },
  { label: "Nhiệm vụ", sub: "Task" },
  { label: "Ngữ cảnh", sub: "Context" },
  { label: "Định dạng", sub: "Format" },
  { label: "Giới hạn", sub: "Constraint" },
];

export const WhatIsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [Math.max(0, WHAT_IS_DURATION - 15), WHAT_IS_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          opacity: fadeOut,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 1000,
        }}
      >
        {items.map((item, i) => {
          const opacity = interpolate(
            frame,
            [10 + i * 12, 30 + i * 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={item.sub}
              style={{
                opacity,
                padding: "20px 28px",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                borderRadius: 14,
                border: `2px solid ${COLORS.accent}40`,
                minWidth: 140,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.accent,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: COLORS.muted,
                  marginTop: 4,
                }}
              >
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeOut * interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 28, color: COLORS.body }}>
          Prompt tốt có 5 yếu tố
        </span>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.what_is} />
    </AbsoluteFill>
  );
};
