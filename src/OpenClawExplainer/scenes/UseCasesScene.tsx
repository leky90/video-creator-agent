import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import { AUDIO_SEGMENTS, COLORS, FONT_FAMILY, SCENE_IMAGES } from "../constants";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.9) 100%)",
  pointerEvents: "none",
};

const cardStyle: React.CSSProperties = {
  padding: "24px 28px",
  borderRadius: 16,
  backgroundColor: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  minWidth: 220,
  textAlign: "center",
  fontFamily: FONT_FAMILY,
};

export const UseCasesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const stagger = (i: number) =>
    interpolate(frame, [10 + i * 12, 40 + i * 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(SCENE_IMAGES.use_cases)}
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          maxWidth: 900,
        }}
      >
        <div style={{ opacity: stagger(0), ...cardStyle }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📧</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.title }}>Triage email</div>
          <div style={{ fontSize: 16, color: COLORS.muted, marginTop: 4 }}>Hàng ngàn thư / vài ngày</div>
        </div>
        <div style={{ opacity: stagger(1), ...cardStyle }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌅</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.title }}>Briefing 7h</div>
          <div style={{ fontSize: 16, color: COLORS.muted, marginTop: 4 }}>Thời tiết, lịch, tin tức</div>
        </div>
        <div style={{ opacity: stagger(2), ...cardStyle }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚙️</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.title }}>Tự động task</div>
          <div style={{ fontSize: 16, color: COLORS.muted, marginTop: 4 }}>Đa kênh Telegram, Discord, WhatsApp</div>
        </div>
        <div style={{ opacity: stagger(3), ...cardStyle }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👥</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.title }}>4 agent = 1 team</div>
          <div style={{ fontSize: 16, color: COLORS.muted, marginTop: 4 }}>Solo founder thay cả team</div>
        </div>
      </div>
      <SubtitleSequence segments={AUDIO_SEGMENTS.use_cases} />
    </AbsoluteFill>
  );
};
