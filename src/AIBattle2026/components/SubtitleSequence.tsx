import React from "react";
import { useCurrentFrame } from "remotion";
import { AUDIO_SEGMENTS, SCENES, COLORS, FONT_FAMILY } from "../constants";

export const SubtitleSequence: React.FC = () => {
  const frame = useCurrentFrame();

  let activeText = "";
  for (const [sceneKey, scene] of Object.entries(SCENES)) {
    const segments = AUDIO_SEGMENTS[sceneKey];
    if (!segments) continue;
    for (const seg of segments) {
      const absStart = scene.start + seg.startFrame;
      const absEnd = scene.start + seg.endFrame;
      if (frame >= absStart && frame < absEnd) {
        activeText = seg.text;
        break;
      }
    }
    if (activeText) break;
  }

  if (!activeText) return null;

  const words = activeText.split(" ");
  const maxWordsPerLine = 12;
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(" "));
  }
  const displayText = lines.slice(-2).join("\n");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: COLORS.subtitleBg,
        borderRadius: 12,
        padding: "12px 32px",
        maxWidth: 1400,
        textAlign: "center",
        zIndex: 100,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          color: COLORS.white,
          lineHeight: 1.4,
          whiteSpace: "pre-line",
        }}
      >
        {displayText}
      </span>
    </div>
  );
};
