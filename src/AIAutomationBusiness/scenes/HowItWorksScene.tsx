import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

const PILLARS = [
  {
    title: "Tự động hóa quy trình",
    subtitle: "Email, hóa đơn, hợp đồng",
    color: COLORS.accent,
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    progressLabel: "Xử lý tự động",
    progressValue: 0.95,
  },
  {
    title: "Phân tích dữ liệu",
    subtitle: "Insight hành động trong giây",
    color: COLORS.purple,
    iconPath: "M18 20V10M12 20V4M6 20v-6",
    progressLabel: "Tốc độ phân tích",
    progressValue: 0.88,
  },
  {
    title: "Dịch vụ khách hàng AI",
    subtitle: "Giải quyết 90% yêu cầu 24/7",
    color: COLORS.teal,
    iconPath: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    progressLabel: "Tỷ lệ tự giải quyết",
    progressValue: 0.9,
  },
];

export const HowItWorksScene: React.FC = () => {
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
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        background: `linear-gradient(135deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
      }}
    >
      {/* Grid lines background */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          opacity: 0.04,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 100 + (frame * 0.2) % 100}
            y1={0}
            x2={i * 100 + (frame * 0.2) % 100}
            y2={1080}
            stroke={COLORS.accent}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 100 + (frame * 0.15) % 100}
            x2={1920}
            y2={i * 100 + (frame * 0.15) % 100}
            stroke={COLORS.accent}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const px = (i * 137.5 + 70) % 1920;
        const py = 1080 - ((i * 91.7 + frame * 0.35) % 1200);
        const size = 2 + (i % 3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: COLORS.accent,
              opacity: 0.06 + (i % 4) * 0.02,
            }}
          />
        );
      })}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - titleProg) * 40}px)`,
          opacity: titleProg,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          Ba trụ cột{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Automation
          </span>
        </span>
      </div>

      {/* Three columns */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {PILLARS.map((pillar, i) => {
          const colProg = spring({
            frame: frame - 40 - i * 40,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const progressBarProg = interpolate(frame, [180 + i * 50, 340 + i * 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const progressEased = Easing.out(Easing.cubic)(progressBarProg);

          const counterValue = Math.round(progressEased * pillar.progressValue * 100);

          const pulseGlow = Math.sin((frame - i * 20) * 0.06) * 0.3 + 0.6;

          return (
            <div
              key={i}
              style={{
                opacity: colProg,
                transform: `translateY(${(1 - colProg) * 80}px)`,
                flex: 1,
                maxWidth: 520,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: `${pillar.color}15`,
                  border: `2px solid ${pillar.color}60`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 ${24 * pulseGlow}px ${pillar.color}30`,
                }}
              >
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={pillar.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={pillar.iconPath} />
                </svg>
              </div>

              {/* Number label */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 20,
                  fontWeight: 700,
                  color: pillar.color,
                  opacity: 0.6,
                }}
              >
                0{i + 1}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  textAlign: "center",
                }}
              >
                {pillar.title}
              </div>

              {/* Subtitle */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 17,
                  color: COLORS.textSecondary,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {pillar.subtitle}
              </div>

              {/* Progress bar */}
              <div style={{ width: "100%", marginTop: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 13,
                      color: COLORS.textSecondary,
                    }}
                  >
                    {pillar.progressLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 13,
                      color: pillar.color,
                      fontWeight: 700,
                    }}
                  >
                    {counterValue}%
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${COLORS.bgLight}80`,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progressEased * pillar.progressValue * 100}%`,
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${pillar.color}aa, ${pillar.color})`,
                      boxShadow: `0 0 8px ${pillar.color}40`,
                    }}
                  />
                </div>
              </div>

              {/* Micro-demo animation specific to each pillar */}
              <div style={{ marginTop: 12, height: 80, width: "100%", position: "relative" }}>
                {i === 0 && (
                  /* Document processing animation */
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    {["Email", "PDF", "Hợp đồng"].map((doc, j) => {
                      const docProg = spring({
                        frame: frame - 250 - j * 25,
                        fps,
                        config: { damping: 12, stiffness: 100 },
                      });
                      return (
                        <div
                          key={j}
                          style={{
                            opacity: docProg,
                            transform: `translateY(${(1 - docProg) * 20}px) scale(${0.8 + docProg * 0.2})`,
                            padding: "8px 14px",
                            borderRadius: 8,
                            backgroundColor: `${COLORS.accent}18`,
                            border: `1px solid ${COLORS.accent}40`,
                          }}
                        >
                          <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.accentLight }}>{doc}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {i === 1 && (
                  /* Mini bar chart animation */
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: "center", height: 60 }}>
                    {[0.4, 0.7, 0.55, 0.85, 0.65].map((val, j) => {
                      const barHeight = interpolate(frame, [260 + j * 15, 360 + j * 15], [0, val * 60], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      });
                      return (
                        <div
                          key={j}
                          style={{
                            width: 20,
                            height: barHeight,
                            borderRadius: 4,
                            background: `linear-gradient(180deg, ${COLORS.purple}, ${COLORS.purple}80)`,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
                {i === 2 && (
                  /* Chat bubble animation */
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    {["Xin chào!", "Tôi cần hỗ trợ", "Đã giải quyết xong!"].map((msg, j) => {
                      const msgProg = spring({
                        frame: frame - 270 - j * 30,
                        fps,
                        config: { damping: 14, stiffness: 90 },
                      });
                      return (
                        <div
                          key={j}
                          style={{
                            opacity: msgProg,
                            transform: `scale(${msgProg})`,
                            padding: "4px 12px",
                            borderRadius: 10,
                            backgroundColor: j === 2 ? `${COLORS.teal}30` : `${COLORS.bgLight}80`,
                            border: j === 2 ? `1px solid ${COLORS.teal}50` : "none",
                          }}
                        >
                          <span style={{ fontFamily: FONT_FAMILY, fontSize: 11, color: j === 2 ? COLORS.teal : COLORS.textSecondary }}>{msg}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
