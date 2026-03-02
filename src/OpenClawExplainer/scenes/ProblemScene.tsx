import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.9) 100%)",
  pointerEvents: "none",
};

const crossedStyle: React.CSSProperties = {
  color: COLORS.muted,
  opacity: 0.9,
  textDecoration: "line-through",
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bubbleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideX = interpolate(frame, [0, 25], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icon1 = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icon2 = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icon3 = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.problem)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
        }}
      />
      <div style={overlayStyle} />
      <div style={{ position: "relative", opacity: bubbleOpacity, transform: `translateX(${slideX}px)` }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.body,
            marginBottom: 12,
            padding: "12px 20px",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            borderRadius: 12,
            maxWidth: 400,
          }}
        >
          Gửi email cho anh X đi, check lịch ngày mai.
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.muted,
            padding: "12px 20px",
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            borderRadius: 12,
            maxWidth: 400,
            marginLeft: 40,
          }}
        >
          Được ạ. Bạn cần làm thủ công từng bước.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 220,
          display: "flex",
          gap: 48,
          opacity: icon1 * 0.9 + icon2 * 0.9 + icon3 * 0.9,
        }}
      >
        <div style={{ opacity: icon1, ...crossedStyle }}>
          <span style={{ fontSize: 40 }}>📧</span>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 18 }}>Email</div>
        </div>
        <div style={{ opacity: icon2, ...crossedStyle }}>
          <span style={{ fontSize: 40 }}>📅</span>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 18 }}>Lịch</div>
        </div>
        <div style={{ opacity: icon3, ...crossedStyle }}>
          <span style={{ fontSize: 40 }}>🧠</span>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 18 }}>Nhớ</div>
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.problem} />
    </AbsoluteFill>
  );
};
