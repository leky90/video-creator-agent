import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.88) 100%)",
  pointerEvents: "none",
};

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.solution)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
        }}
      />
      <div style={overlayStyle} />
      <div
        style={{
          position: "relative",
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.accent,
          opacity: titleOpacity,
          transform: `scale(${0.92 + scale * 0.08})`,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        OpenClaw — agent thực sự làm việc
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.solution} />
    </AbsoluteFill>
  );
};
