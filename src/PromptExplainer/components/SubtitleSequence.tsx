import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { AudioSegment } from "../constants";
import { COLORS, FONT_FAMILY } from "../constants";

const subtitleStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 120,
  left: 0,
  right: 0,
  textAlign: "center",
  fontFamily: FONT_FAMILY,
  fontSize: 32,
  color: COLORS.title,
  padding: "0 80px",
  textShadow: "0 1px 2px rgba(255,255,255,0.9)",
};

export const SubtitleSequence: React.FC<{ segments: AudioSegment[] }> = ({
  segments,
}) => {
  const frame = useCurrentFrame();
  for (const seg of segments) {
    if (frame < seg.startFrame) return null;
    const opacity = interpolate(
      frame,
      [seg.startFrame, seg.startFrame + 8],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const endOpacity = interpolate(
      frame,
      [seg.endFrame - 10, seg.endFrame],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    if (frame >= seg.endFrame) continue;
    return (
      <AbsoluteFill style={{ justifyContent: "flex-end", pointerEvents: "none" }}>
        <div
          style={{
            ...subtitleStyle,
            opacity: opacity * endOpacity,
          }}
        >
          {seg.text}
        </div>
      </AbsoluteFill>
    );
  }
  return null;
};
