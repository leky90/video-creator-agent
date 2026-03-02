import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_HOWITWORKS_DURATION } from "../constants";

const STEPS = [
  {
    title: "Perceive",
    desc: "Đọc mục tiêu & thu thập thông tin",
    color: COLORS.accent,
    activateFrame: 60,
  },
  {
    title: "Plan",
    desc: "LLM suy luận & lập kế hoạch",
    color: COLORS.success,
    activateFrame: 200,
  },
  {
    title: "Act",
    desc: "Gọi API, database, trình duyệt",
    color: COLORS.secondary,
    activateFrame: 380,
  },
  {
    title: "Observe",
    desc: "Đánh giá kết quả & lặp lại",
    color: COLORS.purple,
    activateFrame: 550,
  },
];

const EyeSVG: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={36} height={36} viewBox="0 0 36 36">
    <ellipse cx={18} cy={18} rx={16} ry={10} fill="none" stroke={active ? COLORS.accent : COLORS.bgLight} strokeWidth={2} />
    <circle cx={18} cy={18} r={6} fill={active ? COLORS.accent : COLORS.bgLight} />
    <circle cx={18} cy={18} r={2.5} fill={COLORS.white} />
  </svg>
);

const BrainSVG: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={36} height={36} viewBox="0 0 36 36">
    <path d="M18 6 C12 4, 4 8, 6 16 C4 20, 8 28, 14 30 C15 31, 17 30, 18 28 C19 30, 21 31, 22 30 C28 28, 32 20, 30 16 C32 8, 24 4, 18 6 Z"
      fill={active ? COLORS.success : COLORS.bgLight} opacity={0.85} />
    <line x1={18} y1={8} x2={18} y2={28} stroke={COLORS.white} strokeWidth={1} opacity={0.5} />
  </svg>
);

const WrenchSVG: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={36} height={36} viewBox="0 0 36 36">
    <path d="M8 28 L22 14 C24 10, 30 10, 32 14 C30 12, 26 12, 24 16 L10 30 Z"
      fill={active ? COLORS.secondary : COLORS.bgLight} />
    <circle cx={28} cy={12} r={5} fill="none" stroke={active ? COLORS.secondary : COLORS.bgLight} strokeWidth={2} />
  </svg>
);

const MagnifierSVG: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width={36} height={36} viewBox="0 0 36 36">
    <circle cx={16} cy={16} r={10} fill="none" stroke={active ? COLORS.purple : COLORS.bgLight} strokeWidth={2.5} />
    <line x1={23} y1={23} x2={32} y2={32} stroke={active ? COLORS.purple : COLORS.bgLight} strokeWidth={2.5} strokeLinecap="round" />
    <circle cx={16} cy={16} r={4} fill={active ? COLORS.purple : COLORS.bgLight} opacity={0.3} />
  </svg>
);

const ICONS = [EyeSVG, BrainSVG, WrenchSVG, MagnifierSVG];

const TIMELINE_Y = 450;
const START_X = 240;
const STEP_GAP = 440;

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_HOWITWORKS_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineProgress = interpolate(
    frame,
    [40, duration - 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const loopArrowOpacity = interpolate(frame, [650, 700], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, #0c1e3d)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {Array.from({ length: 16 }).map((_, i) => {
        const px = (i * 137.5 + 60) % 1920;
        const py = (i * 97.3 + frame * 0.15) % 1080;
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
              opacity: 0.08 + (i % 4) * 0.03,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `translateY(${(1 - titleSpring) * 40}px)`,
          opacity: titleSpring,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Vòng lặp{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.success})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            4 bước
          </span>
        </span>
      </div>

      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <line
          x1={START_X}
          y1={TIMELINE_Y}
          x2={START_X + STEP_GAP * 3}
          y2={TIMELINE_Y}
          stroke={`${COLORS.bgLight}50`}
          strokeWidth={4}
        />
        <line
          x1={START_X}
          y1={TIMELINE_Y}
          x2={START_X + lineProgress * STEP_GAP * 3}
          y2={TIMELINE_Y}
          stroke={COLORS.accent}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path
          d={`M${START_X + STEP_GAP * 3 + 30},${TIMELINE_Y - 40} C${START_X + STEP_GAP * 3 + 120},${TIMELINE_Y - 180} ${START_X - 120},${TIMELINE_Y - 180} ${START_X - 30},${TIMELINE_Y - 40}`}
          fill="none"
          stroke={COLORS.accentLight}
          strokeWidth={2}
          strokeDasharray="8,4"
          opacity={loopArrowOpacity}
        />
        <polygon
          points={`${START_X - 30},${TIMELINE_Y - 50} ${START_X - 20},${TIMELINE_Y - 35} ${START_X - 40},${TIMELINE_Y - 35}`}
          fill={COLORS.accentLight}
          opacity={loopArrowOpacity}
        />
      </svg>

      {STEPS.map((step, i) => {
        const isActive = frame >= step.activateFrame;
        const nodeScale = spring({
          frame: frame - step.activateFrame,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const cardSlide = spring({
          frame: frame - step.activateFrame - 10,
          fps,
          config: { damping: 14, stiffness: 80 },
        });
        const x = START_X + i * STEP_GAP;
        const pulse = isActive
          ? interpolate(
              Math.sin((frame - step.activateFrame) * 0.1),
              [-1, 1],
              [0.6, 1],
            )
          : 0;

        const IconComp = ICONS[i];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: TIMELINE_Y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: isActive
                  ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                  : COLORS.bgLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${isActive ? nodeScale : 0.8})`,
                boxShadow: isActive
                  ? `0 0 ${20 * pulse}px ${step.color}50`
                  : "none",
                border: `3px solid ${isActive ? step.color : COLORS.bgLight}`,
              }}
            >
              <IconComp active={isActive} />
            </div>

            <div
              style={{
                marginTop: 24,
                width: 220,
                textAlign: "center",
                opacity: cardSlide,
                transform: `translateX(-50%) translateX(36px) translateY(${(1 - cardSlide) * 30}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 700,
                  color: isActive ? step.color : COLORS.textSecondary,
                }}
              >
                {i + 1}. {step.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                {step.desc}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
