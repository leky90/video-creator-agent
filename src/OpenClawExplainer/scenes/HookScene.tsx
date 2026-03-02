import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, HOOK_DURATION, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.85) 100%)",
  pointerEvents: "none",
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count = Math.min(
    145000,
    Math.floor(interpolate(frame, [0, 45], [0, 145000], { extrapolateRight: "clamp" }))
  );
  const logoOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(0, HOOK_DURATION - 15), HOOK_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.hook)}
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
          opacity: opacity * fadeOut,
          transform: `scale(${0.95 + scale * 0.05})`,
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 72, fontWeight: 700, color: COLORS.accent }}>
          {count.toLocaleString("vi-VN")}
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, color: COLORS.muted, marginTop: 8 }}>
          sao GitHub · 2 tháng
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.accent,
            marginTop: 24,
            opacity: logoOpacity,
          }}
        >
          OpenClaw
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            color: COLORS.muted,
            marginTop: 8,
            opacity: logoOpacity,
          }}
        >
          Tại sao AI agent này viral đến vậy?
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.hook} />
    </AbsoluteFill>
  );
};
