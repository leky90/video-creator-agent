import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SubtitleSequence } from "../components/SubtitleSequence";
import {
  AGITATE_DURATION,
  AUDIO_SEGMENTS,
  COLORS,
  FONT_FAMILY,
} from "../constants";

const BrainSVG: React.FC<{ fragmentation: number }> = ({ fragmentation }) => {
  const offset = fragmentation * 30;
  return (
    <svg width={260} height={260} viewBox="0 0 260 260">
      <defs>
        <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.accent} />
          <stop offset="100%" stopColor={COLORS.accentLight} />
        </linearGradient>
      </defs>
      {/* Left hemisphere */}
      <g
        transform={`translate(${-offset}, ${-offset * 0.5}) rotate(${-fragmentation * 8}, 100, 130)`}
        opacity={1 - fragmentation * 0.2}
      >
        <path
          d="M130 60 C90 20, 30 40, 40 100 C30 140, 50 180, 90 200 C100 205, 120 200, 130 190 Z"
          fill="url(#brainGrad)"
          opacity={0.9}
        />
        <path
          d="M80 80 C70 100, 75 130, 90 150"
          fill="none"
          stroke={COLORS.bgDark}
          strokeWidth={3}
          opacity={0.5}
        />
      </g>
      {/* Right hemisphere */}
      <g
        transform={`translate(${offset}, ${-offset * 0.3}) rotate(${fragmentation * 8}, 160, 130)`}
        opacity={1 - fragmentation * 0.2}
      >
        <path
          d="M130 60 C170 20, 230 40, 220 100 C230 140, 210 180, 170 200 C160 205, 140 200, 130 190 Z"
          fill="url(#brainGrad)"
          opacity={0.9}
        />
        <path
          d="M180 80 C190 100, 185 130, 170 150"
          fill="none"
          stroke={COLORS.bgDark}
          strokeWidth={3}
          opacity={0.5}
        />
      </g>
      {/* Break lines */}
      {fragmentation > 0.3 && (
        <>
          <line
            x1={130}
            y1={60}
            x2={130}
            y2={200}
            stroke={COLORS.danger}
            strokeWidth={2}
            strokeDasharray="6,4"
            opacity={fragmentation}
          />
          <line
            x1={70}
            y1={130}
            x2={190}
            y2={130}
            stroke={COLORS.danger}
            strokeWidth={1.5}
            strokeDasharray="4,6"
            opacity={fragmentation * 0.7}
          />
        </>
      )}
    </svg>
  );
};

export const AgitateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [AGITATE_DURATION - 15, AGITATE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const inboxHeight = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 40 },
  });
  const inboxBarH = interpolate(inboxHeight, [0, 1], [40, 320]);

  const fragmentation = interpolate(frame, [60, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressWidth = interpolate(frame, [100, AGITATE_DURATION], [20, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const redOverlay = interpolate(frame, [100, AGITATE_DURATION], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Red warning overlay */}
      <AbsoluteFill
        style={{ backgroundColor: COLORS.danger, opacity: redOverlay }}
      />

      {/* Inbox bar chart - left side */}
      <div
        style={{
          position: "absolute",
          left: 200,
          bottom: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: COLORS.textSecondary,
            fontWeight: 600,
          }}
        >
          INBOX
        </span>
        <div
          style={{
            width: 120,
            height: 360,
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
              height: inboxBarH,
              background: `linear-gradient(0deg, ${COLORS.danger}, ${COLORS.secondary})`,
              borderRadius: 12,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: inboxBarH - 30,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.white,
            }}
          >
            {Math.round(interpolate(inboxHeight, [0, 1], [12, 247]))}
          </div>
        </div>
      </div>

      {/* Brain fragmentation - right side */}
      <div
        style={{
          position: "absolute",
          right: 200,
          top: "50%",
          transform: "translateY(-60%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            color: COLORS.textSecondary,
            letterSpacing: 2,
          }}
        >
          YOUR FOCUS
        </span>
        <BrainSVG fragmentation={fragmentation} />
      </div>

      {/* Real Work progress bar - bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 16,
            color: COLORS.textSecondary,
            marginBottom: 8,
          }}
        >
          Real Work Done
        </div>
        <div
          style={{
            width: "100%",
            height: 16,
            backgroundColor: `${COLORS.bgLight}60`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${COLORS.success}80, ${COLORS.success}40)`,
              borderRadius: 8,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: COLORS.danger,
            marginTop: 6,
          }}
        >
          {Math.round(progressWidth)}% — barely moving
        </div>
      </div>

      <SubtitleSequence segments={AUDIO_SEGMENTS.agitate} />
    </AbsoluteFill>
  );
};
