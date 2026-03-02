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
export const SCENE_PROBLEM_START = SCENES.problem.start;
export const SCENE_PROBLEM_DURATION = SCENES.problem.duration;
export const SCENE_CHATGPT_START = SCENES.chatgpt.start;
export const SCENE_CHATGPT_DURATION = SCENES.chatgpt.duration;
export const SCENE_CLAUDE_START = SCENES.claude.start;
export const SCENE_CLAUDE_DURATION = SCENES.claude.duration;
export const SCENE_GEMINI_START = SCENES.gemini.start;
export const SCENE_GEMINI_DURATION = SCENES.gemini.duration;
export const SCENE_COMPARISON_START = SCENES.comparison.start;
export const SCENE_COMPARISON_DURATION = SCENES.comparison.duration;
export const SCENE_CTA_START = SCENES.cta.start;
export const SCENE_CTA_DURATION = SCENES.cta.duration;

export const AUDIO_SEGMENTS: Record<string, AudioSegment[]> = _GEN_SEGMENTS;

export const COLORS = {
  bgDark: "#0a0e1a",
  bgMid: "#141b2d",
  bgLight: "#1e2a42",
  accent: "#6366f1",
  accentLight: "#818cf8",
  chatgpt: "#10a37f",
  claude: "#d97706",
  gemini: "#4285f4",
  secondary: "#f43f5e",
  success: "#22c55e",
  danger: "#ef4444",
  white: "#f8fafc",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  subtitleBg: "rgba(0, 0, 0, 0.65)",
};

export const FONT_FAMILY = "'Inter', sans-serif";
