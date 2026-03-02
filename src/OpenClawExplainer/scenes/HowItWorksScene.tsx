import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.88) 100%)",
  pointerEvents: "none",
};

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideX = interpolate(frame, [0, 30], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.how_it_works)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
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
          transform: `translateX(${slideX}px)`,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Heartbeat, messaging, ClawHub
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.how_it_works} />
    </AbsoluteFill>
  );
};
