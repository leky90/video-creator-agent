// AIProductivity Explainer — timings and styling (30fps)

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

export const SCENE01_START = SCENES.scene01.start;
export const SCENE01_DURATION = SCENES.scene01.duration;
export const SCENE02_START = SCENES.scene02.start;
export const SCENE02_DURATION = SCENES.scene02.duration;
export const SCENE03_START = SCENES.scene03.start;
export const SCENE03_DURATION = SCENES.scene03.duration;
export const SCENE04_START = SCENES.scene04.start;
export const SCENE04_DURATION = SCENES.scene04.duration;
export const SCENE05_START = SCENES.scene05.start;
export const SCENE05_DURATION = SCENES.scene05.duration;
export const SCENE06_START = SCENES.scene06.start;
export const SCENE06_DURATION = SCENES.scene06.duration;

export const NARRATION: Record<string, string[]> = {
  scene01: [
    "Bạn có bao giờ cảm thấy ngập trong email, họp triền miên và báo cáo chưa kịp viết? Công việc tri thức ngày càng chiếm nhiều thời gian nhưng kết quả lại không tương xứng.",
  ],
  scene02: [
    "Mỗi tuần chúng ta dành hàng giờ chỉ để ghi chú họp, soạn email và lặp lại những việc mà máy móc có thể hỗ trợ. Nghiên cứu cho thấy nhân viên văn phòng có thể tiết kiệm từ hai đến hơn bốn giờ mỗi tuần nếu biết tận dụng đúng công cụ.",
  ],
  scene03: [
    "Giải pháp nằm ở trí tuệ nhân tạo. AI không thay thế con người mà bổ trợ: tăng năng suất trung bình khoảng mười bốn phần trăm ở doanh nghiệp và tiết kiệm đáng kể thời gian cho từng cá nhân.",
  ],
  scene04: [
    "AI giúp gì cụ thể? Tự động ghi chú và tóm tắt cuộc họp, soạn thảo và chỉnh sửa văn bản, tóm tắt email, quản lý công việc và ưu tiên nhiệm vụ. Một công cụ, nhiều use case hàng ngày.",
  ],
  scene05: [
    "Các công cụ phổ biến gồm Microsoft Copilot tích hợp Word, Excel, Teams; ChatGPT và các trợ lý AI khác; phần mềm ghi chú họp như Otter. Bạn có thể bắt đầu với một nhu cầu cụ thể: ví dụ ghi chú họp hoặc soạn email nhanh.",
  ],
  scene06: [
    "Hãy chọn một công cụ AI phù hợp và dùng thử trong một tuần. Chỉ cần một use case nhỏ, bạn sẽ thấy rõ sự khác biệt. Bắt đầu ngay hôm nay.",
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

// Nền gradient tối, text trắng
export const COLORS = {
  background: "#0f172a",
  bgGradientEnd: "#1e293b",
  title: "#f8fafc",
  body: "#e2e8f0",
  accent: "#38bdf8",
  muted: "#94a3b8",
};

export const FONT_FAMILY = "'Inter', Helvetica, Arial, sans-serif";
