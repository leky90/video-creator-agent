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

export const SCENE_PROBLEM_START = SCENES.problem.start;
export const SCENE_PROBLEM_DURATION = SCENES.problem.duration;
export const SCENE_AGITATE_START = SCENES.agitate.start;
export const SCENE_AGITATE_DURATION = SCENES.agitate.duration;
export const SCENE_SOLUTION_START = SCENES.solution.start;
export const SCENE_SOLUTION_DURATION = SCENES.solution.duration;
export const SCENE_HOWITWORKS_START = SCENES.howItWorks.start;
export const SCENE_HOWITWORKS_DURATION = SCENES.howItWorks.duration;
export const SCENE_ARCHITECTURE_START = SCENES.architecture.start;
export const SCENE_ARCHITECTURE_DURATION = SCENES.architecture.duration;
export const SCENE_REALWORLD_START = SCENES.realWorld.start;
export const SCENE_REALWORLD_DURATION = SCENES.realWorld.duration;
export const SCENE_CTA_START = SCENES.cta.start;
export const SCENE_CTA_DURATION = SCENES.cta.duration;

export const AUDIO_SEGMENTS: Record<string, AudioSegment[]> = _GEN_SEGMENTS;

export const COLORS = {
  bgDark: "#0f172a",
  bgMid: "#1e293b",
  bgLight: "#334155",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
  secondary: "#f97316",
  success: "#22c55e",
  danger: "#ef4444",
  white: "#f8fafc",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  subtitleBg: "rgba(0, 0, 0, 0.65)",
  purple: "#a855f7",
  cyan: "#06b6d4",
};

export const FONT_FAMILY = "'Inter', sans-serif";
