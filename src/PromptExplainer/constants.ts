// Prompt Explainer video — timings and styling (30fps)

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

import {
  GENERATED_AUDIO_SEGMENTS as _GEN_SEGMENTS,
  GENERATED_TOTAL_FRAMES,
  GENERATED_SCENES,
} from "./timeline.generated";

export const TOTAL_FRAMES = GENERATED_TOTAL_FRAMES;
export const SCENES: Record<string, { start: number; duration: number }> = GENERATED_SCENES;

export const HOOK_START = SCENES.hook.start;
export const HOOK_DURATION = SCENES.hook.duration;
export const PROBLEM_START = SCENES.problem.start;
export const PROBLEM_DURATION = SCENES.problem.duration;
export const WHAT_IS_START = SCENES.what_is.start;
export const WHAT_IS_DURATION = SCENES.what_is.duration;
export const HOW_TO_USE_START = SCENES.how_to_use.start;
export const HOW_TO_USE_DURATION = SCENES.how_to_use.duration;
export const CTA_START = SCENES.cta.start;
export const CTA_DURATION = SCENES.cta.duration;

export const NARRATION: Record<string, string[]> = {
  hook: [
    "AI trả lời sai ý? Lỗi có thể nằm ở prompt. Prompt là gì và dùng thế nào cho đúng?",
  ],
  problem: [
    "Nhiều người viết prompt mơ hồ, thiếu ngữ cảnh, không chỉ định dạng. Kết quả: AI trả lời chung chung hoặc không dùng được.",
  ],
  what_is: [
    "Prompt là đầu vào bạn đưa cho AI — câu hỏi hoặc chỉ dẫn. Prompt tốt có năm yếu tố: vai trò cho AI, nhiệm vụ cụ thể, ngữ cảnh, định dạng đầu ra và giới hạn rõ ràng.",
  ],
  how_to_use: [
    "Cách dùng đúng: nói rõ bạn cần gì, cho ai, tone thế nào. Một prompt một mục tiêu. Thêm ví dụ nếu cần. Chỉnh đi chỉnh lại theo kết quả. Chỉ cần vài bước là AI trả lời đúng ý.",
  ],
  cta: [
    "Nhớ: rõ ràng, đủ ngữ cảnh, chỉ rõ định dạng. Thử ngay với lần hỏi AI tiếp theo.",
  ],
};

export type AudioSegment = { startFrame: number; endFrame: number; text: string; file: string };

function mergeWithNarration(
  gen: Record<string, AudioSegment[]>,
  narration: Record<string, string[]>
): Record<string, AudioSegment[]> {
  return Object.fromEntries(
    Object.entries(gen).map(([key, segs]) => [
      key,
      segs.map((seg, i) => ({ ...seg, text: narration[key]?.[i] ?? seg.text })),
    ])
  );
}

export const AUDIO_SEGMENTS = mergeWithNarration(_GEN_SEGMENTS, NARRATION);

export const COLORS = {
  background: "#f8fafc",
  title: "#1a1a1a",
  body: "#333333",
  accent: "#2563eb",
  muted: "#64748b",
};

export const FONT_FAMILY = "SF Pro Text, Helvetica, Arial, sans-serif";
