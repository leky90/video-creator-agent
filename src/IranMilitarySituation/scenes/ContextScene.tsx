import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { MapPin, Waves, Shield } from "lucide-react";
import { COLORS, FONT_FAMILY } from "../constants";

const PINS = [
  { label: "Iran · Hormuz", x: 0.52, y: 0.42, delay: 0 },
  { label: "Lebanon", x: 0.44, y: 0.38, delay: 25 },
  { label: "Iraq", x: 0.48, y: 0.4, delay: 50 },
  { label: "Syria", x: 0.46, y: 0.38, delay: 75 },
  { label: "Yemen", x: 0.48, y: 0.62, delay: 100 },
];

export const ContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: duration } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProg = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #0c1e3d)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondary}08, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 20}px)`,
          opacity: titleProg,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Trung Đông · Eo biển Hormuz ·{" "}
          <span
            style={{
              color: COLORS.secondary,
            }}
          >
            Trục Kháng chiến
          </span>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
          opacity: titleProg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Waves size={28} color={COLORS.secondary} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>Dầu mỏ</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={28} color={COLORS.secondary} />
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>Vệ binh Cách mạng</span>
        </div>
      </div>
      {PINS.map((pin, i) => {
        const prog = spring({
          frame: frame - 140 - pin.delay,
          fps,
          config: { damping: 200, stiffness: 100 },
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${pin.x * 100}%`,
              top: `${pin.y * 100}%`,
              transform: `translate(-50%, -50%) scale(${prog})`,
              opacity: prog,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MapPin size={36} color={COLORS.secondary} strokeWidth={2} />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              {pin.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
