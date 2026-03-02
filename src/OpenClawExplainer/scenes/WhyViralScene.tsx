import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY } from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const itemStyle: React.CSSProperties = {
  padding: "20px 28px",
  borderRadius: 14,
  backgroundColor: "white",
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  minWidth: 200,
  textAlign: "center",
  fontFamily: FONT_FAMILY,
};

export const WhyViralScene: React.FC = () => {
  const frame = useCurrentFrame();
  const o1 = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const o2 = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const o3 = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={container}>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ opacity: o1, ...itemStyle }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📂</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.accent }}>Mã nguồn mở</div>
        </div>
        <div style={{ opacity: o2, ...itemStyle }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🧩</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.accent }}>100+ skills</div>
          <div style={{ fontSize: 16, color: COLORS.muted }}>cộng đồng</div>
        </div>
        <div style={{ opacity: o3, ...itemStyle }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔒</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.accent }}>Dữ liệu của bạn</div>
          <div style={{ fontSize: 16, color: COLORS.muted }}>chạy local</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 220,
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          color: COLORS.body,
        }}
      >
        Không phải chỉ hype — làm được thật
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.why_viral} />
    </AbsoluteFill>
  );
};
