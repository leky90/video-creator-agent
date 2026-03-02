import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AUDIO_SEGMENTS,
  COLORS,
  FONT_FAMILY,
  HOW_IT_WORKS_DURATION,
} from "../constants";

const container: React.CSSProperties = {
  backgroundColor: COLORS.background,
  justifyContent: "center",
  alignItems: "center",
};

const columns = [
  {
    title: "AI viết",
    desc: "Soạn email, báo cáo · vài giây",
    delay: 0,
  },
  {
    title: "Lịch thông minh",
    desc: "Tối ưu lịch · Thời gian tập trung",
    delay: 8,
  },
  {
    title: "Tự động hóa",
    desc: "Kết nối app · AI xử lý task",
    delay: 16,
  },
];

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [Math.max(0, HOW_IT_WORKS_DURATION - 15), HOW_IT_WORKS_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          opacity: fadeOut,
          display: "flex",
          gap: 48,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {columns.map((col, i) => {
          const opacity = interpolate(
            frame,
            [col.delay, col.delay + 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const scale = interpolate(
            frame,
            [col.delay, col.delay + 20],
            [0.9, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                width: 280,
                padding: 32,
                backgroundColor: COLORS.bgMid,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.accent,
                  marginBottom: 12,
                }}
              >
                {col.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 20,
                  color: COLORS.body,
                }}
              >
                {col.desc}
              </div>
            </div>
          );
        })}
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.how_it_works} />
    </AbsoluteFill>
  );
};
