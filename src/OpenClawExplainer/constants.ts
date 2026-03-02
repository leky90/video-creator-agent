// OpenClaw Explainer video — timings and styling (30fps)

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
export const AGITATE_START = SCENES.agitate.start;
export const AGITATE_DURATION = SCENES.agitate.duration;
export const SOLUTION_START = SCENES.solution.start;
export const SOLUTION_DURATION = SCENES.solution.duration;
export const HOW_IT_WORKS_START = SCENES.how_it_works.start;
export const HOW_IT_WORKS_DURATION = SCENES.how_it_works.duration;
export const USE_CASES_START = SCENES.use_cases.start;
export const USE_CASES_DURATION = SCENES.use_cases.duration;
export const CTA_START = SCENES.cta.start;
export const CTA_DURATION = SCENES.cta.duration;

export const NARRATION: Record<string, string[]> = {
  hook: [
    "OpenClaw đạt hơn một trăm nghìn stars trên GitHub chỉ trong khoảng hai ngày — repo nhanh nhất trong lịch sử GitHub chạm mốc một trăm K stars. Đây không phải chatbot. Đây là agent AI tự hành chạy ngay trên máy bạn, và nó thực sự làm việc.",
  ],
  problem: [
    "Chatbot mà bạn quen dùng chỉ nhận prompt và trả text. Muốn gửi email, chạy lệnh, mở file — bạn vẫn phải copy, paste, đổi tab, tự bấm. AI thông minh nhưng tay bạn vẫn không rảnh. Và mỗi lần hỏi là dữ liệu lại gửi lên cloud của nhà cung cấp.",
  ],
  agitate: [
    "Càng muốn tự động hóa email, lịch, research, CRM — càng phải nhảy qua nhiều app, nhiều API. Bảo mật và quyền riêng tư cũng là nỗi lo: ai đọc được data của bạn khi mọi thứ đều gửi lên server?",
  ],
  solution: [
    "OpenClaw là autonomous AI agent mã nguồn mở, miễn phí, chạy local trên laptop, VPS hay Raspberry Pi của bạn. Nó kết nối LLM — Claude, GPT, Grok hoặc model local — với file, shell, browser và hơn năm chục dịch vụ. Tất cả data nằm trên máy bạn. Nó không chỉ trả lời; nó hành động.",
  ],
  how_it_works: [
    "Bạn dùng OpenClaw qua app nhắn tin quen thuộc: WhatsApp, Telegram, Discord, Slack, Signal, iMessage. Gửi tin nhắn là ra lệnh. Hệ thống heartbeat mỗi ba mươi phút kiểm tra task chờ và thực hiện mà không cần bạn gõ prompt liên tục. Hơn một trăm skills mở rộng trên ClawHub — từ email, calendar đến GitHub, Gmail — và bộ nhớ persistent lưu local dạng Markdown.",
  ],
  use_cases: [
    "Use case thực tế: quản lý và phân loại email, morning briefing gộp thời tiết lịch tin tức, research tóm tắt, CRM và pipeline, đồng bộ dữ liệu sức khỏe từ WHOOP hay Oura. Ưu điểm là privacy, kiểm soát data, không lock-in. Nhược: OpenClaw có quyền truy cập hệ thống mạnh, từng có CVE và skill độc hại — nên đọc kỹ Security Guide, và best practice là human-in-the-loop: agent soạn, người duyệt.",
  ],
  cta: [
    "Muốn thử OpenClaw, hãy vào docs và GitHub — link trong mô tả. Nhớ đọc Security Guide trước khi cài, và bắt đầu với quyền read-only. Một agent thực sự làm việc, ngay trên máy bạn.",
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
  /** Nền gradient tối (dùng với BACKGROUND_GRADIENT) */
  background: "#0f172a",
  backgroundEnd: "#1e293b",
  title: "#f8fafc",
  body: "#e2e8f0",
  accent: "#38bdf8",
  muted: "#94a3b8",
};

/** Gradient cho AbsoluteFill (nền tối) */
export const BACKGROUND_GRADIENT = `linear-gradient(160deg, ${COLORS.background} 0%, ${COLORS.backgroundEnd} 50%, #0f172a 100%)`;

export const FONT_FAMILY =
  "'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/** Ảnh minh họa theo scene (public/images/open-claw-explainer/) */
export const SCENE_IMAGES: Record<string, string> = {
  hook: "images/open-claw-explainer/scene-01.jpg",
  problem: "images/open-claw-explainer/scene-02.jpg",
  agitate: "images/open-claw-explainer/scene-03.jpg",
  solution: "images/open-claw-explainer/scene-04.jpg",
  how_it_works: "images/open-claw-explainer/scene-05.jpg",
  use_cases: "images/open-claw-explainer/scene-06.jpg",
  cta: "images/open-claw-explainer/scene-07.jpg",
};
