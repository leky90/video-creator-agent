# Remotion Libraries Reference

Danh sách đầy đủ các library đã cài đặt. **LUÔN dùng library thay vì tự viết.**

---

## 1. `remotion-bits` — Production Components (ƯU TIÊN SỐ 1)

Thư viện component chuyên nghiệp, thay thế hầu hết component tự viết.

### AnimatedText — Thay thế TypingEffect, GradientText

```tsx
import { AnimatedText } from "remotion-bits";

// Word-by-word fade + slide (thay TypingEffect)
<AnimatedText
  transition={{
    split: "word",        // "word" | "character" | "line"
    opacity: [0, 1],
    y: [40, 0],
    blur: [8, 0],         // blur effect khi xuất hiện
    stagger: 3,           // frames giữa mỗi word
    duration: 30,
  }}
  style={{ fontSize: 48, color: COLORS.white, fontWeight: 700 }}
>
  Tiêu đề xuất hiện từng chữ
</AnimatedText>

// Character-by-character với rotation
<AnimatedText
  transition={{
    split: "character",
    opacity: [0, 1],
    rotate: [15, 0],
    scale: [0.5, 1],
    stagger: 1,
    duration: 20,
  }}
  style={{ fontSize: 64, color: COLORS.accent }}
>
  BIG NUMBER
</AnimatedText>
```

### AnimatedCounter — Thay thế AnimatedCounter tự viết

```tsx
import { AnimatedCounter } from "remotion-bits";

<AnimatedCounter
  from={0}
  to={10000}
  duration={60}
  style={{ fontSize: 72, fontWeight: 800, color: COLORS.accent }}
/>
```

### Particles — Thay thế ParticleField tự viết (physics-based, đẹp hơn nhiều)

```tsx
import { Particles, Spawner, Behavior } from "remotion-bits";

// Confetti celebration
<Particles
  spawner={Spawner.burst({ count: 100 })}
  behaviors={[
    Behavior.gravity(0.3),
    Behavior.drag(0.01),
    Behavior.wiggle({ amplitude: 2, frequency: 0.1 }),
    Behavior.fadeOut(),
  ]}
  style={{ position: "absolute", inset: 0 }}
/>

// Drifting ambient particles (thay ParticleField)
<Particles
  spawner={Spawner.continuous({ rate: 2, maxParticles: 30 })}
  behaviors={[
    Behavior.linearVelocity({ vx: 0.5, vy: -0.3 }),
    Behavior.fadeIn(15),
    Behavior.fadeOut(),
  ]}
  style={{ position: "absolute", inset: 0, opacity: 0.15 }}
/>

// Snow effect
<Particles
  spawner={Spawner.continuous({ rate: 5, maxParticles: 60 })}
  behaviors={[
    Behavior.gravity(0.1),
    Behavior.wiggle({ amplitude: 1 }),
    Behavior.drag(0.02),
  ]}
  style={{ position: "absolute", inset: 0 }}
/>
```

### StaggeredMotion — Thay thế manual stagger với spring()

```tsx
import { StaggeredMotion } from "remotion-bits";

<StaggeredMotion
  stagger={5}           // frames giữa mỗi child
  direction="forward"   // "forward" | "reverse" | "center"
  transition={{
    opacity: [0, 1],
    y: [30, 0],
    scale: [0.8, 1],
    duration: 25,
  }}
>
  <FeatureCard title="Tốc độ" icon={Zap} />
  <FeatureCard title="Chính xác" icon={Target} />
  <FeatureCard title="Chi phí thấp" icon={DollarSign} />
</StaggeredMotion>
```

### GradientTransition — Chuyển gradient mượt

```tsx
import { GradientTransition } from "remotion-bits";

<GradientTransition
  gradients={[
    "linear-gradient(135deg, #0f172a, #1e293b)",
    "linear-gradient(135deg, #1e293b, #3b82f6)",
    "linear-gradient(135deg, #3b82f6, #22c55e)",
  ]}
  duration={90}
  style={{ position: "absolute", inset: 0 }}
/>
```

### TypeWriter — Typewriter với cursor

```tsx
import { TypeWriter } from "remotion-bits";

<TypeWriter
  text="Hello World"
  speed={3}             // frames per character
  cursor="|"
  cursorBlinkSpeed={15}
  style={{ fontSize: 24, fontFamily: "monospace", color: COLORS.accent }}
/>
```

### CodeBlock — Code với syntax highlighting

```tsx
import { CodeBlock } from "remotion-bits";

<CodeBlock
  code={`const result = await ai.generate("Hello");`}
  language="typescript"
  theme="dark"
  animateIn={true}
  style={{ width: 800 }}
/>
```

### MatrixRain — Matrix-style background

```tsx
import { MatrixRain } from "remotion-bits";

<MatrixRain
  color={COLORS.accent}
  style={{ position: "absolute", inset: 0, opacity: 0.1 }}
/>
```

### Scene3D + Element3D — 3D scenes (dùng cho special scenes)

```tsx
import { Scene3D, Step, Element3D } from "remotion-bits";

<Scene3D camera={{ position: [0, 0, 5] }}>
  <Step from={0} duration={60}>
    <Element3D position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <div style={{ fontSize: 48, color: "white" }}>3D Text</div>
    </Element3D>
  </Step>
</Scene3D>
```

### ScrollingColumns — Scrolling column layout

```tsx
import { ScrollingColumns } from "remotion-bits";

<ScrollingColumns
  columns={3}
  speed={1}
  direction="up"
  items={imageUrls.map(url => <Img src={url} />)}
/>
```

---

## 2. `remotion-animated` — Declarative Animations

Viết animation ngay trong JSX thay vì hàng loạt `interpolate()`.

```tsx
import { Animated, Move, Scale, Fade } from "remotion-animated";

// Fade + Move + Scale kết hợp
<Animated
  animations={[
    Move({ y: 0, initialY: 50 }),
    Scale({ by: 1, initial: 0.8 }),
    Fade({ to: 1, initial: 0 }),
  ]}
  delay={15}
>
  <div style={{ fontSize: 42, color: COLORS.white }}>
    Element xuất hiện mượt
  </div>
</Animated>

// Với spring
<Animated
  animations={[
    Move({ y: 0, initialY: -100, start: 10, duration: 30 }),
    Fade({ to: 1, initial: 0, start: 0, duration: 15 }),
  ]}
>
  <FloatingImageCard src="images/scene-01.jpg" />
</Animated>
```

**Khi nào dùng:** Bất kỳ khi nào cần kết hợp nhiều animation (fade + move + scale) cho 1 element — gọn hơn nhiều so với manual `interpolate()`.

---

## 3. `@remotion/transitions` — Scene Transitions (QUAN TRỌNG)

Chuyển cảnh giữa các scene thay vì fade in/out thủ công.

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";

// Trong main composition
export const MyVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={300}>
      <Scene01_Hook />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={fade()}
      timing={{ type: "linear", durationInFrames: 20 }}
    />

    <TransitionSeries.Sequence durationInFrames={400}>
      <Scene02_Problem />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={slide({ direction: "from-left" })}
      timing={{ type: "linear", durationInFrames: 25 }}
    />

    <TransitionSeries.Sequence durationInFrames={350}>
      <Scene03_Solution />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={{ type: "linear", durationInFrames: 20 }}
    />

    <TransitionSeries.Sequence durationInFrames={250}>
      <Scene04_CTA />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
```

**Transition styles phù hợp từng loại chuyển cảnh:**

| Chuyển cảnh | Transition gợi ý |
|---|---|
| Hook → Problem | `fade()` (mượt, tự nhiên) |
| Problem → Agitate | `slide({ direction: "from-right" })` (cấp bách) |
| Agitate → Solution | `wipe({ direction: "from-left" })` (dramatic reveal) |
| Solution → How it works | `fade()` |
| How it works → CTA | `clockWipe()` (kết thúc ấn tượng) |

---

## 4. `@remotion/shapes` — SVG Shapes

```tsx
import { Circle, Rect, Star, Triangle, Pie, Ellipse, Polygon } from "@remotion/shapes";

<Star
  points={5}
  innerRadius={30}
  outerRadius={60}
  fill={COLORS.accent}
  stroke={COLORS.white}
  strokeWidth={2}
/>

<Circle
  radius={40}
  fill={`${COLORS.accent}40`}
  stroke={COLORS.accent}
  strokeWidth={2}
/>

<Pie
  radius={80}
  progress={0.75}
  fill={COLORS.success}
  closePath
  rotation={-90}
/>
```

**Thay thế:** ProgressRing tự viết → dùng `Pie` với `progress` animated.

---

## 5. `@remotion/noise` — Organic Motion

```tsx
import { noise2D, noise3D } from "@remotion/noise";

// Organic floating motion cho elements
const x = noise2D("seed-x", frame * 0.01, 0) * 20;
const y = noise2D("seed-y", 0, frame * 0.01) * 15;

<div style={{ transform: `translate(${x}px, ${y}px)` }}>
  <FloatingImageCard src="images/scene.jpg" />
</div>

// Noise-based background
const bgNoise = noise2D("bg", frame * 0.005, 0);
const hue = interpolate(bgNoise, [-1, 1], [200, 260]);
```

**Dùng cho:** Floating motion tự nhiên (thay Math.sin), organic backgrounds.

---

## 6. `@remotion/motion-blur` — Cinematic Blur

```tsx
import { Trail } from "@remotion/motion-blur";
import { CameraMotionBlur } from "@remotion/motion-blur";

// Trail effect cho element di chuyển
<Trail layers={5} lagInFrames={0.5} trailOpacity="decreasing">
  <AbsoluteFill>
    <MovingElement />
  </AbsoluteFill>
</Trail>

// Camera motion blur cho toàn scene (cinematic feel)
<CameraMotionBlur shutterAngle={180} samples={8}>
  <AbsoluteFill>
    <SceneContent />
  </AbsoluteFill>
</CameraMotionBlur>
```

**Dùng cho:** Hook scenes (dramatic), transition moments.

---

## 7. `@remotion/paths` — SVG Path Animations

```tsx
import { getLength, getPointAtLength, evolvePath } from "@remotion/paths";

const path = "M 0 0 C 100 0 100 100 200 100";
const pathLength = getLength(path);

// Draw path animation
const strokeDasharray = pathLength;
const strokeDashoffset = interpolate(progress, [0, 1], [pathLength, 0]);

<svg>
  <path d={path} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
</svg>

// Hoặc dùng evolvePath (đơn giản hơn)
const evolved = evolvePath(progress, path);
<svg>
  <path d={path} strokeDasharray={evolved.strokeDasharray} strokeDashoffset={evolved.strokeDashoffset} />
</svg>

// Di chuyển element dọc path
const point = getPointAtLength(path, progress * pathLength);
<div style={{ position: "absolute", left: point.x, top: point.y }}>●</div>
```

**Dùng cho:** Draw arrow/line animations, flowcharts, connection lines.

---

## 8. `@remotion/captions` — Subtitles

```tsx
import { createTikTokStyleCaptions } from "@remotion/captions";

// Tạo TikTok-style captions từ transcript
const { pages } = createTikTokStyleCaptions({
  captions: transcriptData,
  combineTokensWithinMilliseconds: 800,
});
```

---

## 9. `@remotion/animated-emoji` — Animated Emoji (thay static emoji)

```tsx
import { AnimatedEmoji } from "@remotion/animated-emoji";

<AnimatedEmoji emoji="🚀" style={{ width: 96, height: 96 }} />
<AnimatedEmoji emoji="✨" style={{ width: 64, height: 64 }} />
<AnimatedEmoji emoji="🔥" style={{ width: 80, height: 80 }} />
```

**Lưu ý:** Nếu cần emoji, dùng AnimatedEmoji thay vì text emoji. Tuy nhiên vẫn ưu tiên Lucide icons.

---

## Bảng thay thế: Tự viết → Library

| Component tự viết | Thay bằng | Library |
|---|---|---|
| `ParticleField` | `Particles` + `Spawner` + `Behavior` | remotion-bits |
| `TypingEffect` | `AnimatedText` (split: "character") hoặc `TypeWriter` | remotion-bits |
| `AnimatedCounter` | `AnimatedCounter` | remotion-bits |
| `GradientText` | `AnimatedText` với gradient style | remotion-bits |
| `SpringBadge` | `StaggeredMotion` + `Animated` | remotion-bits + remotion-animated |
| `ProgressRing` | `Pie` từ `@remotion/shapes` + animated progress | @remotion/shapes |
| `PulsingGlow` | `Animated` với Scale animation loop | remotion-animated |
| `AmbientGlow` | `GradientTransition` | remotion-bits |
| Manual fade in/out | `TransitionSeries` + `fade()`/`slide()`/`wipe()` | @remotion/transitions |
| Manual `interpolate()` chains | `Animated` component | remotion-animated |
| Manual `Math.sin` floating | `noise2D` | @remotion/noise |
| Custom SVG shapes | `Circle`, `Star`, `Pie`, `Triangle` | @remotion/shapes |
| Custom path draw | `evolvePath` | @remotion/paths |

---

## Import cheat sheet

```tsx
// remotion-bits (production components)
import { AnimatedText, AnimatedCounter, Particles, Spawner, Behavior, StaggeredMotion, GradientTransition, TypeWriter, CodeBlock, MatrixRain, ScrollingColumns, Scene3D, Step, Element3D } from "remotion-bits";

// remotion-animated (declarative animations)
import { Animated, Move, Scale, Fade } from "remotion-animated";

// @remotion/transitions (scene transitions)
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";

// @remotion/shapes (SVG shapes)
import { Circle, Star, Pie, Rect, Triangle, Polygon, Ellipse } from "@remotion/shapes";

// @remotion/noise (organic motion)
import { noise2D, noise3D } from "@remotion/noise";

// @remotion/motion-blur (cinematic)
import { Trail, CameraMotionBlur } from "@remotion/motion-blur";

// @remotion/paths (path animations)
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";

// @remotion/animated-emoji
import { AnimatedEmoji } from "@remotion/animated-emoji";

// Existing
import { Img, staticFile, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { LightLeaks } from "@remotion/light-leaks";
```
