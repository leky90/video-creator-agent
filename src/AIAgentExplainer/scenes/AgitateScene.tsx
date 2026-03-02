import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { COLORS, FONT_FAMILY, SCENE_AGITATE_DURATION } from "../constants";

const BrokenGearSVG: React.FC<{ frag: number }> = ({ frag }) => {
  const offset = frag * 25;
  return (
    <svg width={240} height={240} viewBox="0 0 240 240">
      <defs>
        <linearGradient id="gearGradA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.accent} />
          <stop offset="100%" stopColor={COLORS.accentLight} />
        </linearGradient>
      </defs>
      <g
        transform={`translate(${-offset}, ${-offset * 0.4}) rotate(${-frag * 10}, 80, 120)`}
        opacity={1 - frag * 0.25}
      >
        <path
          d="M120 40 L135 70 L125 75 L140 110 L115 100 L110 120 L90 120 L85 100 L60 110 L75 75 L65 70 L80 40 Z"
          fill="url(#gearGradA)"
        />
        <circle cx={100} cy={80} r={20} fill={COLORS.bgDark} />
      </g>
      <g
        transform={`translate(${offset}, ${offset * 0.3}) rotate(${frag * 10}, 160, 120)`}
        opacity={1 - frag * 0.25}
      >
        <path
          d="M160 80 L175 110 L165 115 L180 150 L155 140 L150 160 L130 160 L125 140 L100 150 L115 115 L105 110 L120 80 Z"
          fill="url(#gearGradA)"
        />
        <circle cx={140} cy={120} r={18} fill={COLORS.bgDark} />
      </g>
      {frag > 0.3 && (
        <>
          <line
            x1={120}
            y1={30}
            x2={120}
            y2={210}
            stroke={COLORS.danger}
            strokeWidth={2}
            strokeDasharray="6,4"
            opacity={frag}
          />
          <line
            x1={40}
            y1={120}
            x2={200}
            y2={120}
            stroke={COLORS.danger}
            strokeWidth={1.5}
            strokeDasharray="4,6"
            opacity={frag * 0.7}
          />
        </>
      )}
    </svg>
  );
};

export const AgitateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_AGITATE_DURATION;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fragmentation = interpolate(frame, [60, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const redOverlay = interpolate(frame, [100, duration], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 40 },
  });
  const barH = interpolate(barSpring, [0, 1], [40, 300]);

  const progressWidth = interpolate(frame, [100, duration - 30], [80, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterProgress = interpolate(frame, [30, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedCounter = Easing.out(Easing.quad)(counterProgress);
  const displayPercent = Math.round(easedCounter * 60);

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #1a0a0a, ${COLORS.bgDark})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      <AbsoluteFill
        style={{ backgroundColor: COLORS.danger, opacity: redOverlay }}
      />

      {Array.from({ length: 15 }).map((_, i) => {
        const px = (i * 137.5 + 30) % 1920;
        const py = (i * 97.3 + frame * 0.25) % 1080;
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
              backgroundColor: COLORS.secondary,
              opacity: 0.1 + (i % 3) * 0.04,
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
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.white,
          }}
        >
          Vấn đề{" "}
          <span style={{ color: COLORS.danger }}>nghiêm trọng</span> hơn bạn
          nghĩ
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "15%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BrokenGearSVG frag={fragmentation} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "28%",
          right: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 16,
            color: COLORS.textSecondary,
            fontWeight: 600,
          }}
        >
          Thời gian lãng phí
        </span>
        <div
          style={{
            width: 100,
            height: 320,
            backgroundColor: `${COLORS.bgLight}40`,
            borderRadius: 12,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: barH,
              background: `linear-gradient(0deg, ${COLORS.danger}, ${COLORS.secondary})`,
              borderRadius: 12,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: Math.max(barH - 35, 5),
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.white,
            }}
          >
            {displayPercent}%
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          width: 600,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 16,
            color: COLORS.textSecondary,
            fontWeight: 600,
          }}
        >
          Hiệu quả thực sự của Chatbot
        </span>
        <div
          style={{
            width: "100%",
            height: 24,
            backgroundColor: `${COLORS.bgLight}40`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.accent})`,
              borderRadius: 12,
              transition: "none",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: COLORS.textSecondary,
          }}
        >
          Chỉ giải quyết &lt;40% yêu cầu
        </span>
      </div>
    </AbsoluteFill>
  );
};
