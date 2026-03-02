import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_PROBLEM_DURATION } from "../constants";

const NOTIF_ITEMS = [
  { label: "47 emails chưa đọc", x: -340, y: -180, delay: 8, color: COLORS.danger },
  { label: "5 cuộc họp hôm nay", x: 320, y: -140, delay: 14, color: COLORS.secondary },
  { label: "12 báo cáo đang chờ", x: -300, y: 130, delay: 20, color: COLORS.danger },
  { label: "83 tin nhắn mới", x: 360, y: 150, delay: 26, color: COLORS.secondary },
  { label: "9 task quá hạn", x: -120, y: -270, delay: 32, color: COLORS.danger },
  { label: "Deadline ngày mai!", x: 160, y: 260, delay: 38, color: COLORS.danger },
];

const PersonAtDeskSVG: React.FC<{ shake: number }> = ({ shake }) => (
  <svg
    width={220}
    height={260}
    viewBox="0 0 220 260"
    style={{ transform: `translateX(${shake}px)` }}
  >
    <defs>
      <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLORS.bgLight} />
        <stop offset="100%" stopColor={COLORS.bgMid} />
      </linearGradient>
    </defs>
    <rect x={20} y={160} width={180} height={12} rx={4} fill="url(#deskGrad)" />
    <rect x={40} y={172} width={8} height={60} rx={2} fill={COLORS.bgLight} />
    <rect x={172} y={172} width={8} height={60} rx={2} fill={COLORS.bgLight} />
    <rect x={60} y={100} width={100} height={65} rx={8} fill={COLORS.bgLight} />
    <rect x={65} y={105} width={90} height={50} rx={4} fill={COLORS.accent} opacity={0.3} />
    <rect x={90} y={165} width={40} height={8} rx={2} fill={COLORS.bgLight} />
    <circle cx={110} cy={55} r={30} fill={COLORS.textSecondary} />
    <circle cx={100} cy={50} r={3} fill={COLORS.bgDark} />
    <circle cx={120} cy={50} r={3} fill={COLORS.bgDark} />
    <path d="M105 62 Q110 68 115 62" fill="none" stroke={COLORS.bgDark} strokeWidth={2} />
    <rect x={80} y={80} width={60} height={75} rx={12} fill={COLORS.textSecondary} />
  </svg>
);

const ClockSVG: React.FC<{ frame: number; duration: number }> = ({
  frame,
  duration,
}) => {
  const rotation = interpolate(frame, [0, duration], [0, 720]);
  return (
    <svg width={70} height={70} viewBox="0 0 70 70">
      <circle
        cx={35}
        cy={35}
        r={30}
        fill="none"
        stroke={COLORS.textSecondary}
        strokeWidth={2.5}
      />
      <line
        x1={35}
        y1={35}
        x2={35}
        y2={12}
        stroke={COLORS.danger}
        strokeWidth={2.5}
        strokeLinecap="round"
        transform={`rotate(${rotation}, 35, 35)`}
      />
      <line
        x1={35}
        y1={35}
        x2={50}
        y2={35}
        stroke={COLORS.textSecondary}
        strokeWidth={2}
        strokeLinecap="round"
        transform={`rotate(${rotation * 0.08}, 35, 35)`}
      />
      <circle cx={35} cy={35} r={3} fill={COLORS.danger} />
    </svg>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_PROBLEM_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shake =
    frame > 90
      ? Math.sin(frame * 0.8) *
        interpolate(frame, [90, 250], [0, 5], {
          extrapolateRight: "clamp",
        })
      : 0;

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => {
        const px = (i * 137.5) % 1920;
        const py = (i * 97.3 + frame * 0.3) % 1080;
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
              backgroundColor: COLORS.danger,
              opacity: 0.12 + (i % 4) * 0.04,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PersonAtDeskSVG shake={shake} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 80,
          right: 100,
          opacity: interpolate(frame, [5, 25], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ClockSVG frame={frame} duration={duration} />
      </div>

      {NOTIF_ITEMS.map((item, i) => {
        const prog = spring({
          frame: frame - item.delay - 15,
          fps,
          config: { damping: 12, stiffness: 80 },
        });
        const pulse = Math.sin((frame - item.delay) * 0.15) * 0.5 + 0.5;
        const scale = interpolate(prog, [0, 1], [0.3, 1]);
        const opacity = interpolate(prog, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });
        const glowOpacity = interpolate(pulse, [0, 1], [0.3, 0.8]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `calc(50% + ${item.y}px)`,
              left: `calc(50% + ${item.x}px)`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(135deg, ${item.color}dd, ${item.color}99)`,
                borderRadius: 16,
                padding: "10px 20px",
                boxShadow: `0 0 ${20 * glowOpacity}px ${item.color}80`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 18,
                  color: COLORS.white,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 50,
          left: 80,
          transform: `translateY(${(1 - titleSpring) * 40}px)`,
          opacity: titleSpring,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Công việc{" "}
          <span style={{ color: COLORS.danger }}>nhàm chán</span>
          {" "}lặp lại mỗi ngày?
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          opacity: interpolate(frame, [180, 210], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            color: COLORS.textSecondary,
          }}
        >
          Chatbot chỉ trả lời câu hỏi — không hành động thay bạn.
        </span>
      </div>
    </AbsoluteFill>
  );
};
