---
name: pro-video-creator
description: "Professional-quality Remotion video creator with production libraries (remotion-bits, remotion-animated, @remotion/transitions, @remotion/shapes, @remotion/noise, @remotion/motion-blur, @remotion/paths). Produces visually rich Animated Explainer Videos — Kurzgesagt / The School of Life style. Use for any video creation request. Triggers: create video, make video, explainer video, video about, tạo video, làm video."
---

# Pro Video Creator

Tạo **Animated Explainer Video** chất lượng chuyên nghiệp với Remotion — phong cách Kurzgesagt / The School of Life.

**ĐỌC THEO THỨ TỰ:**
1. [references/narrative-pacing.md](references/narrative-pacing.md) — triết lý nhịp kể chuyện
2. [references/remotion-libraries.md](references/remotion-libraries.md) — **LIBRARY REFERENCE (BẮT BUỘC)** — luôn dùng library thay vì tự viết

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

Every scene MUST have:
1. A **unique layout** different from other scenes in the same video
2. At least one **ảnh minh họa thật** (Pixabay/Pexels) + image treatment
3. **Purposeful animation** via `remotion-animated` hoặc `remotion-bits`
4. An **ambient layer** via `Particles` từ remotion-bits (opacity < 0.15)
5. **Hold frames** — elements stay still 2-3s after appearing for viewer to read
6. **Scene transitions** via `@remotion/transitions` (fade/slide/wipe)

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
| Image treatments | [components/ImageTreatments.md](components/ImageTreatments.md) | DuotoneImage, ColorOverlay, KenBurns, Vignette |
| Lottie | `@remotion/lottie` | `Lottie` |
| Light leaks | `@remotion/light-leaks` | `LightLeaks` |
| Icons | `lucide-react` | `Brain`, `Rocket`, `Zap`, etc. |

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

## Anti-Patterns (FORBIDDEN)

- ❌ **Tự viết `interpolate()` chains** khi `remotion-animated` hoặc `remotion-bits` có sẵn
- ❌ **Tự viết particle system** — dùng `Particles` từ `remotion-bits`
- ❌ **Tự viết typing effect** — dùng `AnimatedText`/`TypeWriter` từ `remotion-bits`
- ❌ **Tự viết counter** — dùng `AnimatedCounter` từ `remotion-bits`
- ❌ **Manual fade in/out giữa scenes** — dùng `TransitionSeries` + `fade()`
- ❌ **`Math.sin` cho floating** — dùng `noise2D` từ `@remotion/noise`
- ❌ **Tự vẽ SVG phức tạp** (người, vật thể, cảnh) — dùng ảnh Pixabay/Pexels
- ❌ Visual xuất hiện trước/không liên quan narration
- ❌ Animation liên tục không dừng — phải có hold frames
- ❌ Ambient layer nổi bật hơn content (particles opacity > 0.15)
- ❌ Same layout reused across scenes
- ❌ Emoji as visual element — dùng `lucide-react` icons hoặc `AnimatedEmoji`
- ❌ `useState` or CSS transitions for animation
- ❌ Hardcoded frame numbers — derive from `AUDIO_SEGMENTS`
- ❌ Bỏ qua bước fetch-illustrations

## Project Structure

```
src/[VideoName]/
├── [VideoName].tsx          # Main composition (dùng TransitionSeries)
├── constants.ts             # COLORS, FONT_FAMILY, AUDIO_SEGMENTS
├── timeline.generated.ts    # Auto-generated by rebuild-timeline
├── components/
│   ├── AudioLayer.tsx       # Narration + BGM playback
│   └── SubtitleSequence.tsx # Subtitle overlay
└── scenes/
    ├── Scene01_Hook.tsx     # Mỗi scene dùng library components
    ├── Scene02_Problem.tsx
    └── ...
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

## Scene Implementation Pattern

Mỗi scene nên follow pattern này, sử dụng library components:

```tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Animated, Move, Scale, Fade } from "remotion-animated";
import { AnimatedText, Particles, Spawner, Behavior } from "remotion-bits";
import { noise2D } from "@remotion/noise";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS } from "../constants";

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${COLORS.bgDark}, ${COLORS.bgMid})`,
    }}>
      {/* 1. Background: ảnh minh họa + treatment */}
      <Img src={staticFile("images/my-video/scene-01.jpg")} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", filter: "grayscale(80%) contrast(1.1)", opacity: 0.15,
      }} />

      {/* 2. Ambient: Particles (library) */}
      <Particles
        spawner={Spawner.continuous({ rate: 2, maxParticles: 25 })}
        behaviors={[Behavior.linearVelocity({ vy: -0.3 }), Behavior.fadeOut()]}
        style={{ position: "absolute", inset: 0, opacity: 0.12 }}
      />

      {/* 3. Content: dùng Animated + AnimatedText */}
      <div style={{ position: "relative", zIndex: 1, padding: 80 }}>
        <Animated animations={[
          Fade({ to: 1, initial: 0 }),
          Move({ y: 0, initialY: 40 }),
        ]} delay={10}>
          <Img src={staticFile("images/my-video/scene-01-main.jpg")} style={{
            width: 500, borderRadius: 20,
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          }} />
        </Animated>

        <AnimatedText
          transition={{
            split: "word", opacity: [0, 1], y: [30, 0],
            blur: [6, 0], stagger: 3, duration: 25,
          }}
          style={{ fontSize: 48, fontWeight: 700, color: COLORS.white, marginTop: 40 }}
        >
          Tiêu đề scene
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
```

## Visual Assets (Thứ tự ưu tiên)

Đọc [references/pro-assets-guide.md](references/pro-assets-guide.md) cho hướng dẫn chi tiết.

**TẢI TRƯỚC, VẼ SAU:**

1. **Ảnh Pixabay/Pexels** + image treatment — BẮT BUỘC chạy `fetch-illustrations.py`
2. **Lottie animation** (`@remotion/lottie`)
3. **Lucide icons** (cho icons nhỏ, labels)
4. **Library components** (`Particles`, `GradientTransition`, `MatrixRain`)
5. **`@remotion/shapes`** (`Circle`, `Star`, `Pie`) cho simple shapes
6. **Custom SVG** — CHỈ cho diagram/flowchart đơn giản

## Background Standards

Mỗi scene cần background **unique**. Dùng library:

| Background | Implementation |
|---|---|
| Gradient animated | `<GradientTransition gradients={[...]} />` |
| Particle ambient | `<Particles spawner={Spawner.continuous(...)} />` |
| Noise-based | `noise2D` + dynamic gradient |
| Photo background | `<ColorOverlayImage src="..." blur={5} overlayOpacity={0.7} />` |
| Matrix rain | `<MatrixRain color={COLORS.accent} style={{ opacity: 0.08 }} />` |
| Light leaks | `<LightLeaks seed={42} style={{ opacity: 0.2 }} />` |

## Animation Standards

### Declarative approach (ƯU TIÊN)

```tsx
// ✅ Dùng remotion-animated
<Animated animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: 40 })]} delay={15}>
  <Content />
</Animated>

// ✅ Dùng remotion-bits cho text
<AnimatedText transition={{ split: "word", opacity: [0, 1], y: [30, 0], stagger: 3, duration: 25 }}>
  Title text
</AnimatedText>

// ✅ Dùng StaggeredMotion cho lists
<StaggeredMotion stagger={5} transition={{ opacity: [0, 1], y: [30, 0], duration: 25 }}>
  <Item1 /><Item2 /><Item3 />
</StaggeredMotion>
```

### Spring chỉ khi cần manual control

```ts
const entrance = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
```

### Organic motion (thay Math.sin)

```ts
const floatX = noise2D("float-x", frame * 0.01, 0) * 15;
const floatY = noise2D("float-y", 0, frame * 0.01) * 10;
```

### Path draw animation

```tsx
import { evolvePath } from "@remotion/paths";

const pathStr = "M 100 200 C 200 100 400 300 500 200";
const progress = spring({ frame, fps, config: { damping: 200 } });
const evolved = evolvePath(progress, pathStr);

<svg><path d={pathStr} stroke={COLORS.accent} strokeWidth={3} fill="none"
  strokeDasharray={evolved.strokeDasharray}
  strokeDashoffset={evolved.strokeDashoffset}
/></svg>
```

### Motion blur cho dramatic moments

```tsx
import { CameraMotionBlur } from "@remotion/motion-blur";

<CameraMotionBlur shutterAngle={180} samples={8}>
  <SceneContent />
</CameraMotionBlur>
```

## Workflow

1. Đọc [references/remotion-libraries.md](references/remotion-libraries.md) — nắm library API
2. Đọc `templates/` và `components/` — nắm layout patterns
3. **BẮT BUỘC: Chạy `python scripts/fetch-illustrations.py`** để tải hình minh họa
4. For each scene, pick **different template** + ảnh đã tải + image treatment
5. Implement bằng library components (`Animated`, `AnimatedText`, `Particles`, etc.)
6. Dùng `TransitionSeries` cho main composition
7. Wire up `AUDIO_SEGMENTS` cho subtitle sync
8. Test in `npx remotion studio`

## Thumbnail Design

Create `src/[VideoName]/Thumbnail.tsx` as a `<Still>` (1280×720):

```tsx
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{
    background: `linear-gradient(135deg, ${COLORS.bgDark}, ${COLORS.accent}30)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 80,
  }}>
    {/* Large visual — ảnh/Lottie/icon, ≥40% of area */}
    {/* Big bold title — ≥60px, max 6-8 words */}
  </AbsoluteFill>
);
```

## Quality Checklist

- [ ] `fetch-illustrations.py` đã chạy, ảnh tải về `public/images/[tên-video]/`
- [ ] **Library components** được dùng (AnimatedText, Particles, TransitionSeries...)
- [ ] **Không có manual interpolate/spring** khi library có sẵn
- [ ] Every scene has unique layout
- [ ] Every scene has ảnh minh họa thật + image treatment
- [ ] `TransitionSeries` dùng cho chuyển cảnh (fade/slide/wipe)
- [ ] Ambient layer via `Particles` từ remotion-bits
- [ ] `noise2D` cho organic motion (thay Math.sin)
- [ ] No hardcoded colors — all from `COLORS.*`
- [ ] Subtitles sync with narration audio
- [ ] Content fills 60%+ of canvas
- [ ] No two adjacent scenes use same template
- [ ] Thumbnail generated
