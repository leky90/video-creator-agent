import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, staticFile } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AUDIO_SEGMENTS,
  COLORS,
  FONT_FAMILY,
} from "../constants";

type SceneFrameProps = {
  sceneKey: keyof typeof AUDIO_SEGMENTS;
  imageName: string;
  durationInFrames: number;
  title?: string;
};

export const SceneFrame: React.FC<SceneFrameProps> = ({
  sceneKey,
  imageName,
  durationInFrames,
  title,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 20], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationInFrames - 15), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      <Img
        src={staticFile(`images/ai-productivity/${imageName}.jpg`)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to bottom, ${COLORS.background}99 0%, ${COLORS.background}ee 100%)`,
        }}
      />
      {title && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
            textAlign: "center",
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.title,
            padding: "0 120px",
          }}
        >
          {title}
        </div>
      )}
      <SubtitleSequence segments={AUDIO_SEGMENTS[sceneKey]} />
    </AbsoluteFill>
  );
};
