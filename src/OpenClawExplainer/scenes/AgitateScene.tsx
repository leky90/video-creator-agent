import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.88) 100%)",
  pointerEvents: "none",
};

export const AgitateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 25, stiffness: 150 } });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.agitate)}
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
          color: COLORS.title,
          opacity: titleOpacity,
          transform: `translateY(${slideY}px)`,
          marginBottom: 24,
        }}
      >
        Càng nhiều việc, càng mệt
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.agitate} />
    </AbsoluteFill>
  );
};
