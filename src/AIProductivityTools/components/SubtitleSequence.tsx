import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { AudioSegment } from "../constants";
import { COLORS, FONT_FAMILY } from "../constants";

export const SubtitleSequence: React.FC<{ segments: AudioSegment[] }> = ({
  segments,
}) => {
  const frame = useCurrentFrame();

  for (const seg of segments) {
    if (frame < seg.startFrame || frame >= seg.endFrame) continue;

    const opacity = interpolate(
      frame,
      [seg.startFrame, seg.startFrame + 8],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const endOpacity = interpolate(
      frame,
      [seg.endFrame - 10, seg.endFrame],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return (
      <AbsoluteFill
        style={{ justifyContent: "flex-end", pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "0 120px",
            opacity: opacity * endOpacity,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              color: COLORS.white,
              backgroundColor: COLORS.subtitleBg,
              padding: "10px 24px",
              borderRadius: 8,
              lineHeight: 1.6,
            }}
          >
            {seg.text}
          </span>
        </div>
      </AbsoluteFill>
    );
  }
  return null;
};
