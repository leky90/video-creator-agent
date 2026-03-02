---
name: pro-video-creator
description: "Professional-quality Remotion video creator with production libraries (remotion-bits, remotion-animated, @remotion/transitions, @remotion/shapes, @remotion/noise, @remotion/motion-blur, @remotion/paths) and pre-bundled Lottie assets. Produces visually rich Animated Explainer Videos — Kurzgesagt / The School of Life style. Use for any video creation request. Triggers: create video, make video, explainer video, video about, tạo video, làm video."
---

# Pro Video Creator

Tạo **Animated Explainer Video** chất lượng chuyên nghiệp với Remotion — phong cách Kurzgesagt / The School of Life.

**ĐỌC THEO THỨ TỰ:**
1. [references/narrative-pacing.md](references/narrative-pacing.md) — triết lý nhịp kể chuyện
2. [references/remotion-libraries.md](references/remotion-libraries.md) — **LIBRARY REFERENCE (BẮT BUỘC)** — luôn dùng library thay vì tự viết
3. [references/scene-blueprints.md](references/scene-blueprints.md) — **SCENE BLUEPRINTS** — concrete TSX examples cho mỗi loại scene
4. [references/pro-assets-guide.md](references/pro-assets-guide.md) — Lottie assets, icons, shapes

## Triết lý cốt lõi

> **Motion phục vụ narration, không phải ngược lại.**
>
> Video explainer là giao điểm giữa giáo dục, điện ảnh tối giản và khoa học truyền đạt.
> Nội dung quan trọng hơn hiệu ứng. Nhịp kể chuyện quan trọng hơn visual đẹp.

**Thứ tự ưu tiên khi thiết kế:**
1. Narration nói gì? (nền tảng)
2. Cảm xúc nào cần truyền tải? (emotional arc)
3. Hình ảnh nào giúp hiểu nhanh hơn? (minh họa, không trang trí)
4. Motion nào hướng dẫn mắt? (dẫn dắt chú ý, không gây xao nhãng)

## Golden Rules

> **If a scene could be a PowerPoint slide, it's not good enough.**
> **If motion doesn't help understanding, remove it.**
> **LUÔN dùng library component thay vì tự viết interpolate/spring thủ công.**
> **LUÔN dùng pre-bundled Lottie assets thay vì tự vẽ SVG phức tạp.**

Every scene MUST have:
1. A **unique layout** different from other scenes in the same video
2. A **visual focal point** — `LottieAsset` animation, Lucide icon composition, `@remotion/shapes`, or library component
3. **Purposeful animation** via `remotion-animated` hoặc `remotion-bits`
4. An **ambient layer** via `Particles` từ remotion-bits (opacity < 0.15)
5. **Hold frames** — elements stay still 2-3s after appearing for viewer to read
6. **Scene transitions** via `@remotion/transitions` (fade/slide/wipe)
7. **Timing derived from AUDIO_SEGMENTS** — no hardcoded frame numbers

## Visual Assets — Thứ tự ưu tiên

| Priority | Asset Type | Component/Source | Khi nào dùng |
|----------|-----------|-----------------|-------------|
| 1 | **Pre-bundled Lottie** | `<LottieAsset name="..." />` từ `public/lottie/` | Focal point chính — AI, data, tech, business animations |
| 2 | **Lucide icons** | `<Brain />`, `<Rocket />`, etc. từ `lucide-react` | Icons nhỏ, labels, badges, category indicators |
| 3 | **@remotion/shapes** | `<Pie />`, `<Circle />`, `<Star />` | Data visualization, progress, accents |
| 4 | **Library components** | `Particles`, `MatrixRain`, `CodeBlock`, `GradientTransition` | Ambient layers, specialized effects |
| 5 | **Simple inline SVG** | Custom `<svg>` | CHỈ cho diagram/flowchart đơn giản |
| 6 | *(Optional)* Stock images | `<Img src={staticFile("images/...")} />` + treatment | Background textures khi thực sự cần |

### Dùng `LottieAsset` component:

```tsx
import { LottieAsset } from "@shared/LottieAsset";

// Focal animation — chỉ cần 1 dòng
<LottieAsset name="ai-brain" style={{ width: 400, height: 400 }} />

// Với custom options
<LottieAsset name="chart-bar" playbackRate={0.5} loop={true} style={{ width: 500 }} />
```

Đọc `public/lottie/manifest.json` để xem danh sách assets theo `category` và `tags`.

## Libraries — LUÔN DÙNG (không tự viết)

**Đọc chi tiết tại [references/remotion-libraries.md](references/remotion-libraries.md).**

| Mục đích | Library | Component/API |
|---|---|---|
| Text animations | `remotion-bits` | `AnimatedText` (word/char/line split, blur, stagger) |
| Số đếm | `remotion-bits` | `AnimatedCounter` |
| Particle effects | `remotion-bits` | `Particles` + `Spawner` + `Behavior` |
| Stagger nhóm elements | `remotion-bits` | `StaggeredMotion` |
| Gradient backgrounds | `remotion-bits` | `GradientTransition` |
| Typewriter | `remotion-bits` | `TypeWriter` |
| Code blocks | `remotion-bits` | `CodeBlock` |
| Matrix rain | `remotion-bits` | `MatrixRain` |
| Scrolling columns | `remotion-bits` | `ScrollingColumns` |
| 3D scenes | `remotion-bits` | `Scene3D` + `Element3D` |
| Declarative animation | `remotion-animated` | `Animated` + `Move` + `Scale` + `Fade` |
| Scene transitions | `@remotion/transitions` | `TransitionSeries` + `fade`/`slide`/`wipe`/`clockWipe`/`flip` |
| SVG shapes | `@remotion/shapes` | `Circle`, `Star`, `Pie`, `Triangle`, `Polygon` |
| Organic motion | `@remotion/noise` | `noise2D`, `noise3D` |
| Motion blur | `@remotion/motion-blur` | `Trail`, `CameraMotionBlur` |
| Path draw | `@remotion/paths` | `evolvePath`, `getPointAtLength` |
| Animated emoji | `@remotion/animated-emoji` | `AnimatedEmoji` |
| Lottie animations | `@remotion/lottie` via `LottieAsset` | `<LottieAsset name="..." />` |
| Light leaks | `@remotion/light-leaks` | `LightLeaks` |
| Icons | `lucide-react` | `Brain`, `Rocket`, `Zap`, etc. |

## Library Usage per Scene Type

Bảng này xác định PHẢI dùng gì cho mỗi loại scene — model CHỈ CẦN FOLLOW:

| Scene Type | MUST use | SHOULD use | OPTIONAL |
|-----------|----------|------------|----------|
| Hook / Intro | `AnimatedText`, `LottieAsset` or `Animated` | `Particles`, `noise2D`, `AnimatedCounter` | `CameraMotionBlur` |
| Info / Cards | `StaggeredMotion`, `AnimatedText` | `LottieAsset`, `Particles`, Lucide icons | `evolvePath` |
| Data / Stats | `AnimatedCounter`, `Pie` | `LottieAsset`, `Particles`, `AnimatedText` | `GradientTransition` |
| Code / Tech | `CodeBlock` or `TypeWriter`, `Animated` | `MatrixRain`, `Particles` | `Trail`, `LottieAsset` |
| CTA | `AnimatedText`, `Particles` (burst mode) | `LottieAsset`, `GradientTransition` | `LightLeaks` |

## Motion Style: Simple > Complex

Giống Kurzgesagt, chỉ dùng **5 loại motion cơ bản** — implement bằng LIBRARY:

| Motion | Implementation |
|---|---|
| Fade in | `<Animated animations={[Fade({ to: 1, initial: 0 })]}> ` |
| Scale in | `<Animated animations={[Scale({ by: 1, initial: 0.8 })]}> ` |
| Slide | `<Animated animations={[Move({ y: 0, initialY: 40 })]}> ` |
| Draw | `evolvePath(progress, path)` từ `@remotion/paths` |
| Pulse | `noise2D("pulse", frame * 0.01, 0)` cho organic pulse |

**Kết hợp nhiều animations:**
```tsx
<Animated animations={[
  Fade({ to: 1, initial: 0 }),
  Move({ y: 0, initialY: 50 }),
  Scale({ by: 1, initial: 0.8 }),
]} delay={15}>
  <Content />
</Animated>
```

## Minimum Viable Scene

Mỗi scene TỐI THIỂU phải có (bất kể model nào cũng PHẢI đạt):

1. **Background**: `GradientTransition` hoặc gradient (khác scene trước/sau)
2. **Title**: `AnimatedText` với split word animation
3. **Focal visual**: `LottieAsset` HOẶC Lucide icon + `Animated` HOẶC `@remotion/shapes`
4. **Ambient**: `Particles` (opacity < 0.15)
5. **Timing**: Derived từ `AUDIO_SEGMENTS` — KHÔNG hardcode delay numbers

```tsx
// MINIMUM VIABLE SCENE — mọi scene ít nhất phải đạt mức này
export const MinimumScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const segments = AUDIO_SEGMENTS[sceneKey];
  const startFrame = segments[0].startFrame;

  return (
    <AbsoluteFill>
      {/* 1. Background */}
      <GradientTransition gradient={[gradient1, gradient2]} duration={sceneDuration} style={{ position: "absolute", inset: 0 }} />

      {/* 2. Ambient */}
      <Particles style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        <Spawner rate={0.05} max={25} lifespan={90} velocity={{ x: 2, y: -4 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.accentLight }} />
        </Spawner>
        <Behavior opacity={[0.12, 0]} />
      </Particles>

      {/* 3. Focal visual — derive timing from AUDIO_SEGMENTS */}
      <Animated animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.7 })]} delay={startFrame + 10}>
        <LottieAsset name="ai-brain" style={{ width: 350, height: 350 }} />
      </Animated>

      {/* 4. Title text */}
      <AnimatedText
        transition={{ split: "word", opacity: [0, 1], y: [30, 0], splitStagger: 4, duration: 25, delay: startFrame }}
        style={{ fontFamily: FONT_FAMILY, fontSize: 48, fontWeight: 700, color: COLORS.white }}
      >
        Scene title here
      </AnimatedText>
    </AbsoluteFill>
  );
};
```

## Anti-Patterns (FORBIDDEN)

- **Tự viết `interpolate()` chains** khi `remotion-animated` hoặc `remotion-bits` có sẵn
- **Tự viết particle system** — dùng `Particles` từ `remotion-bits`
- **Tự viết typing effect** — dùng `AnimatedText`/`TypeWriter` từ `remotion-bits`
- **Tự viết counter** — dùng `AnimatedCounter` từ `remotion-bits`
- **Tự vẽ SVG phức tạp** (người, vật thể, cảnh) — dùng `LottieAsset` từ kho có sẵn
- **Manual fade in/out giữa scenes** — dùng `TransitionSeries` + `fade()`
- **`Math.sin` cho floating** — dùng `noise2D` từ `@remotion/noise`
- **Hardcoded frame delays** (`delay={40}`, `delay={55}`) — derive từ `AUDIO_SEGMENTS`
- Visual xuất hiện trước/không liên quan narration
- Animation liên tục không dừng — phải có hold frames
- Ambient layer nổi bật hơn content (particles opacity > 0.15)
- Same layout reused across scenes
- Emoji as visual element — dùng `lucide-react` icons hoặc `AnimatedEmoji`
- `useState` or CSS transitions for animation

## Project Structure

```
src/projects/[VideoName]/
├── [VideoName].tsx          # Main composition (dùng TransitionSeries)
├── constants.ts             # COLORS, FONT_FAMILY, AUDIO_SEGMENTS
├── timeline.generated.ts    # Auto-generated by rebuild-timeline
├── components/
│   ├── AudioLayer.tsx       # Narration + BGM playback
│   └── SubtitleSequence.tsx # Subtitle overlay
└── scenes/
    ├── Scene01_Hook.tsx     # Mỗi scene dùng library components + LottieAsset
    ├── Scene02_Problem.tsx
    └── ...

src/shared/
└── LottieAsset.tsx          # Shared Lottie wrapper — dùng cho mọi video

public/lottie/
├── manifest.json            # Asset catalog
├── ai/                      # AI/ML animations
├── tech/                    # Tech/coding animations
├── data/                    # Charts/analytics animations
├── business/                # Business animations
├── general/                 # General purpose animations
└── abstract/                # Abstract/ambient animations
```

## Design System

### Color Palette

```ts
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
```

### Typography

```ts
export const FONT_FAMILY = "'Inter', sans-serif";
```

- Headline: 42-56px, weight 700-800
- Body: 20-28px, weight 400-600
- Label: 14-18px, weight 500-600

### Spacing

- Scene padding: 60-120px from edges
- Content should fill 60%+ of the 1920×1080 canvas

## Main Composition Pattern (TransitionSeries)

**BẮT BUỘC dùng `TransitionSeries`** thay vì `<Sequence>` thủ công:

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

export const MyVideo: React.FC = () => (
  <AbsoluteFill>
    <AudioLayer />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENES.hook.duration}>
        <Scene01_Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={{ type: "linear", durationInFrames: 20 }}
      />
      <TransitionSeries.Sequence durationInFrames={SCENES.problem.duration}>
        <Scene02_Problem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={{ type: "linear", durationInFrames: 25 }}
      />
      {/* ... more scenes ... */}
    </TransitionSeries>
    <SubtitleSequence />
  </AbsoluteFill>
);
```

### Transition Selection Guide

| Chuyển cảnh | Transition | Lý do |
|---|---|---|
| Hook → Problem | `fade()` | Mượt, tự nhiên |
| Problem → Agitate | `slide({ direction: "from-right" })` | Tạo cảm giác cấp bách |
| Agitate → Solution | `wipe({ direction: "from-left" })` | Dramatic reveal |
| Solution → How it works | `fade()` | Tiếp nối |
| How it works → CTA | `clockWipe()` | Kết thúc ấn tượng |

## Scene Template Library

Read templates in `templates/` for layout patterns:

| Template | File | Best For |
|----------|------|----------|
| Notification Swarm | [templates/notification-swarm.md](templates/notification-swarm.md) | Problem/pain scenes |
| Data Fragmentation | [templates/data-fragmentation.md](templates/data-fragmentation.md) | Agitate scenes |
| Orbital Hub | [templates/orbital-hub.md](templates/orbital-hub.md) | Solution scenes |
| Multi-Column Showcase | [templates/multi-column-showcase.md](templates/multi-column-showcase.md) | How-it-works |
| Particle CTA | [templates/particle-cta.md](templates/particle-cta.md) | CTA scenes |
| Counter Reveal | [templates/counter-reveal.md](templates/counter-reveal.md) | Hook/stats |
| Timeline Flow | [templates/timeline-flow.md](templates/timeline-flow.md) | Process/steps |
| Split Compare | [templates/split-compare.md](templates/split-compare.md) | Before/After |
| Floating Cards | [templates/floating-cards.md](templates/floating-cards.md) | Features/benefits |
| Code Terminal | [templates/code-terminal.md](templates/code-terminal.md) | Tech demos |

## Background Standards

Mỗi scene cần background **unique**. Dùng library:

| Background | Implementation |
|---|---|
| Gradient animated | `<GradientTransition gradient={[...]} />` |
| Particle ambient | `<Particles spawner={Spawner.continuous(...)} />` |
| Noise-based | `noise2D` + dynamic gradient |
| Matrix rain | `<MatrixRain color={COLORS.accent} style={{ opacity: 0.08 }} />` |
| Light leaks | `<LightLeaks seed={42} style={{ opacity: 0.2 }} />` |

## Thumbnail Design

Create `src/projects/[VideoName]/Thumbnail.tsx` as a `<Still>` (1280×720):

```tsx
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{
    background: `linear-gradient(135deg, ${COLORS.bgDark}, ${COLORS.accent}30)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 80,
  }}>
    {/* Large visual — LottieAsset or icon, ≥40% of area */}
    {/* Big bold title — ≥60px, max 6-8 words */}
  </AbsoluteFill>
);
```

## Quality Checklist

- [ ] **Library components** được dùng (AnimatedText, Particles, TransitionSeries, StaggeredMotion...)
- [ ] **LottieAsset** hoặc icon composition cho focal point mỗi scene
- [ ] **Không có manual interpolate/spring** khi library có sẵn
- [ ] **Không có hardcoded frame delays** — all timing from AUDIO_SEGMENTS
- [ ] Every scene has unique layout
- [ ] `TransitionSeries` dùng cho chuyển cảnh (fade/slide/wipe)
- [ ] Ambient layer via `Particles` từ remotion-bits
- [ ] `noise2D` cho organic motion (thay Math.sin)
- [ ] No hardcoded colors — all from `COLORS.*`
- [ ] Subtitles sync with narration audio
- [ ] Content fills 60%+ of canvas
- [ ] No two adjacent scenes use same template
- [ ] Accent colors rotate between scenes
- [ ] Thumbnail generated
