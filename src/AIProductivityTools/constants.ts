import {
  GENERATED_AUDIO_SEGMENTS as _GEN_SEGMENTS,
  GENERATED_TOTAL_FRAMES,
  GENERATED_SCENES,
} from "./timeline.generated";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const SCENE_PAD = 15;

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
};

export const FONT_FAMILY = "'Inter', sans-serif";

export const TOTAL_FRAMES = GENERATED_TOTAL_FRAMES;
export const SCENES: Record<string, { start: number; duration: number }> =
  GENERATED_SCENES;

export const PROBLEM_START = SCENES.problem.start;
export const PROBLEM_DURATION = SCENES.problem.duration;
export const AGITATE_START = SCENES.agitate.start;
export const AGITATE_DURATION = SCENES.agitate.duration;
export const SOLUTION_START = SCENES.solution.start;
export const SOLUTION_DURATION = SCENES.solution.duration;
export const HOW_IT_WORKS_START = SCENES.how_it_works.start;
export const HOW_IT_WORKS_DURATION = SCENES.how_it_works.duration;
export const CTA_START = SCENES.cta.start;
export const CTA_DURATION = SCENES.cta.duration;

export const NARRATION: Record<string, string[]> = {
  problem: [
    "You're drowning in tasks — emails, meetings, docs, follow-ups. Every day you lose hours to work that doesn't need a human brain.",
  ],
  agitate: [
    "It's getting worse. Your inbox grows faster than you clear it. Context-switching kills your focus. And you still have real work to do.",
  ],
  solution: [
    "AI productivity tools change the game. They handle your email, schedule your day, take meeting notes, and automate repetitive workflows — so you can focus on work that actually matters.",
  ],
  how_it_works: [
    "Three categories that deliver real results. One — AI writers draft emails and reports in seconds. Two — Smart schedulers protect your focus time automatically. Three — Workflow automation connects your apps and lets AI handle tasks end to end.",
  ],
  cta: [
    "Start with one tool. Automate one task today. Your future self will thank you.",
  ],
};

export type AudioSegment = {
  startFrame: number;
  endFrame: number;
  text: string;
  file: string;
};

function mergeWithNarration(
  gen: Record<string, AudioSegment[]>,
  narration: Record<string, string[]>,
): Record<string, AudioSegment[]> {
  return Object.fromEntries(
    Object.entries(gen).map(([key, segs]) => [
      key,
      segs.map((seg, i) => ({
        ...seg,
        text: narration[key]?.[i] ?? seg.text,
      })),
    ]),
  );
}

export const AUDIO_SEGMENTS = mergeWithNarration(_GEN_SEGMENTS, NARRATION);
