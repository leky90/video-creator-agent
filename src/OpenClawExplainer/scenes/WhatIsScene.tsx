import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const blockStyle: React.CSSProperties = {
  padding: "20px 32px",
  borderRadius: 16,
  fontFamily: FONT_FAMILY,
  fontSize: 20,
  fontWeight: 600,
  minWidth: 200,
  textAlign: "center",
};

export const WhatIsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const brainOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const soulOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow1 = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2 = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={container}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
        <div
          style={{
            ...blockStyle,
            backgroundColor: "rgba(37, 99, 235, 0.15)",
            color: COLORS.accent,
            opacity: brainOpacity,
          }}
        >
          🧠 Brain · LLM suy nghĩ
        </div>
        <div style={{ opacity: arrow1, fontSize: 28, color: COLORS.muted }}>↓</div>
        <div
          style={{
            ...blockStyle,
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            color: COLORS.accent,
            opacity: bodyOpacity,
          }}
        >
          ⚙️ Body · Gateway hành động
        </div>
        <div style={{ opacity: arrow2, fontSize: 28, color: COLORS.muted }}>↓</div>
        <div
          style={{
            ...blockStyle,
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            color: COLORS.accent,
            opacity: soulOpacity,
          }}
        >
          💾 Soul · Memory nhớ mọi thứ
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          color: COLORS.body,
        }}
      >
        OpenClaw = AI agent mã nguồn mở · chạy trên máy bạn
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.what_is} />
    </AbsoluteFill>
  );
};
