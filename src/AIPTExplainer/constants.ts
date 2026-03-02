// AIPT Explainer — timings and styling (30fps)

import {
  GENERATED_AUDIO_SEGMENTS as _GEN_SEGMENTS,
  GENERATED_TOTAL_FRAMES,
  GENERATED_SCENES,
} from "./timeline.generated";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TOTAL_FRAMES = GENERATED_TOTAL_FRAMES;
export const SCENES: Record<string, { start: number; duration: number }> =
  GENERATED_SCENES;

export const HOOK_START = SCENES.hook.start;
export const HOOK_DURATION = SCENES.hook.duration;
export const PROBLEM_START = SCENES.problem.start;
export const PROBLEM_DURATION = SCENES.problem.duration;
export const SOLUTION_START = SCENES.solution.start;
export const SOLUTION_DURATION = SCENES.solution.duration;
export const HOW_IT_WORKS_START = SCENES.how_it_works.start;
export const HOW_IT_WORKS_DURATION = SCENES.how_it_works.duration;
export const CTA_START = SCENES.cta.start;
export const CTA_DURATION = SCENES.cta.duration;

export const NARRATION: Record<string, string[]> = {
  hook: [
    "Bảy phẩy năm giờ mỗi tuần — đó là thời gian nhiều người tiết kiệm được nhờ AI. Bí quyết là gì?",
  ],
  problem: [
    "Email chồng chất, lịch họp dày đặc, viết báo cáo mất cả buổi. Bạn luôn thiếu thời gian cho việc thực sự quan trọng.",
  ],
  solution: [
    "Công cụ năng suất AI thay đổi cuộc chơi. Chúng xử lý email, sắp lịch, ghi chú cuộc họp và tự động hóa quy trình — để bạn tập trung vào công việc đáng giá.",
  ],
  how_it_works: [
    "Ba nhóm chính. Một — AI viết: soạn email, báo cáo trong vài giây. Hai — Lịch thông minh: tối ưu lịch, bảo vệ thời gian tập trung. Ba — Tự động hóa: kết nối app, để AI xử lý task từ đầu đến cuối. Bắt đầu một công cụ, tự động hóa một việc hôm nay.",
  ],
  cta: [
    "Thử ngay một công cụ. Tương lai bạn sẽ cảm ơn bạn.",
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
  narration: Record<string, string[]>
): Record<string, AudioSegment[]> {
  return Object.fromEntries(
    Object.entries(gen).map(([key, segs]) => [
      key,
      segs.map((seg, i) => ({
        ...seg,
        text: narration[key]?.[i] ?? seg.text,
      })),
    ])
  );
}

export const AUDIO_SEGMENTS = mergeWithNarration(_GEN_SEGMENTS, NARRATION);

export const COLORS = {
  background: "#0f172a",
  bgMid: "#1e293b",
  title: "#f1f5f9",
  body: "#e2e8f0",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
  muted: "#94a3b8",
  danger: "#ef4444",
};

export const FONT_FAMILY = "'Inter', Helvetica, Arial, sans-serif";
