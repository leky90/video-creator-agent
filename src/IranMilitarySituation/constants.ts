import {
  GENERATED_AUDIO_SEGMENTS as _GEN_SEGMENTS,
  GENERATED_TOTAL_FRAMES,
  GENERATED_SCENES,
  type AudioSegment,
} from "./timeline.generated";

export type { AudioSegment };

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TOTAL_FRAMES = GENERATED_TOTAL_FRAMES;
export const SCENES: Record<string, { start: number; duration: number }> =
  GENERATED_SCENES;

export const SCENE_HOOK_START = SCENES.hook.start;
export const SCENE_HOOK_DURATION = SCENES.hook.duration;
export const SCENE_CONTEXT_START = SCENES.context.start;
export const SCENE_CONTEXT_DURATION = SCENES.context.duration;
export const SCENE_ACTORS_START = SCENES.actors.start;
export const SCENE_ACTORS_DURATION = SCENES.actors.duration;
export const SCENE_RECENT_START = SCENES.recent.start;
export const SCENE_RECENT_DURATION = SCENES.recent.duration;
export const SCENE_IMPACT_START = SCENES.impact.start;
export const SCENE_IMPACT_DURATION = SCENES.impact.duration;
export const SCENE_CTA_START = SCENES.cta.start;
export const SCENE_CTA_DURATION = SCENES.cta.duration;

export const AUDIO_SEGMENTS: Record<string, AudioSegment[]> = _GEN_SEGMENTS;

export const COLORS = {
  bgDark: "#0b1120",
  bgMid: "#162033",
  bgLight: "#1e3048",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
  secondary: "#f59e0b",
  success: "#10b981",
  successLight: "#34d399",
  danger: "#ef4444",
  dangerLight: "#f87171",
  purple: "#8b5cf6",
  teal: "#14b8a6",
  white: "#f8fafc",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  subtitleBg: "rgba(0, 0, 0, 0.65)",
};

export const FONT_FAMILY = "'Inter', sans-serif";
