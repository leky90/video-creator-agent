# Scene Blueprints — Concrete TSX Examples

5 production-ready scene examples. **Copy, adapt, and customize** — đừng viết từ đầu.

Mỗi blueprint dùng đúng library components + `LottieAsset` + timing từ `AUDIO_SEGMENTS`.

---

## Blueprint 1: Hook Scene (Center-focus layout)

**Khi dùng**: Opening scene, gây tò mò, đặt câu hỏi lớn.
**Template gốc**: Counter Reveal.
**Focal**: LottieAsset centered + AnimatedCounter + AnimatedText.

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, AnimatedCounter, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { noise2D } from "@remotion/noise";
import { Sparkles } from "lucide-react";
import { LottieAsset } from "@shared/LottieAsset";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const segments = AUDIO_SEGMENTS.hook;
  const startFrame = segments[0].startFrame;

  return (
    <AbsoluteFill>
      {/* WHY: Animated gradient creates subtle movement without distracting */}
      <GradientTransition
        gradient={[
          `radial-gradient(ellipse at 50% 50%, ${COLORS.bgMid} 0%, ${COLORS.bgDark} 70%)`,
          `radial-gradient(ellipse at 40% 60%, ${COLORS.accent}22 0%, ${COLORS.bgDark} 70%)`,
        ]}
        duration={SCENES.hook.duration}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* WHY: Particles ambient — very subtle (opacity 0.12) to not compete with content */}
      <Particles style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        <Spawner rate={0.06} max={25} lifespan={100} velocity={{ x: 3, y: -6 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.accentLight }} />
        </Spawner>
        <Behavior opacity={[0.15, 0]} />
      </Particles>

      {/* WHY: Center layout — single focal point draws all attention */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>

        {/* WHY: Lottie appears WITH narration start, not before */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.5 })]}
          delay={startFrame + 5}
        >
          <LottieAsset name="ai-brain" style={{ width: 300, height: 300 }} />
        </Animated>

        {/* WHY: Title reveals word-by-word synced to narration pace */}
        <div style={{ marginTop: 30 }}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [30, 0], blur: [6, 0], splitStagger: 4, duration: 25, delay: startFrame + 15 }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 52, fontWeight: 800, color: COLORS.white, textAlign: "center", lineHeight: 1.3 }}
          >
            Các AI hiện nay có thể làm gì?
          </AnimatedText>
        </div>

        {/* WHY: Counter appears after title holds — viewer reads title first, then sees number */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: 20 })]}
          delay={startFrame + 80}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 24 }}>
            <AnimatedCounter
              transition={{ values: [0, 5], duration: 120, delay: startFrame + 90, easing: "easeOut" }}
              style={{ fontFamily: FONT_FAMILY, fontSize: 80, fontWeight: 800, color: COLORS.accent }}
            />
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 600, color: COLORS.textSecondary }}>
              nhóm năng lực chính
            </span>
          </div>
        </Animated>
      </div>
    </AbsoluteFill>
  );
};
```

---

## Blueprint 2: Information Cards (Multi-column layout)

**Khi dùng**: Features, capabilities, list of items.
**Template gốc**: Multi-Column Showcase / Floating Cards.
**Focal**: StaggeredMotion cards + Lucide icons.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move } from "remotion-animated";
import { AnimatedText, StaggeredMotion, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { noise2D } from "@remotion/noise";
import { MessageSquare, Languages, FileText, HelpCircle } from "lucide-react";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

const CARDS = [
  { Icon: MessageSquare, title: "Trò chuyện", desc: "Đối thoại tự nhiên", color: COLORS.accent },
  { Icon: Languages, title: "Dịch thuật", desc: "100+ ngôn ngữ", color: COLORS.secondary },
  { Icon: FileText, title: "Tóm tắt", desc: "Rút gọn nội dung", color: COLORS.success },
  { Icon: HelpCircle, title: "Trả lời", desc: "Giải đáp thắc mắc", color: COLORS.accentLight },
];

export const InfoScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.text;
  const startFrame = segments[0].startFrame;

  return (
    <AbsoluteFill>
      {/* WHY: Different gradient angle from HookScene — visual variety */}
      <GradientTransition
        gradient={[
          `linear-gradient(160deg, ${COLORS.bgDark} 0%, #0c1e3d 100%)`,
          `linear-gradient(160deg, #0c1e3d 0%, ${COLORS.bgMid} 100%)`,
        ]}
        duration={SCENES.text.duration}
        style={{ position: "absolute", inset: 0 }}
      />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <Spawner rate={0.04} max={20} lifespan={80} velocity={{ x: -2, y: -3 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.accent }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* WHY: Top-left title — different position from center-focus Hook */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: -20 })]}
        delay={startFrame}
        style={{ position: "absolute", top: 80, left: 80, zIndex: 2 }}
      >
        <AnimatedText
          transition={{ split: "word", opacity: [0, 1], y: [20, 0], splitStagger: 4, duration: 20 }}
          style={{ fontFamily: FONT_FAMILY, fontSize: 42, fontWeight: 700, color: COLORS.white }}
        >
          Xử lý ngôn ngữ tự nhiên
        </AnimatedText>
      </Animated>

      {/* WHY: StaggeredMotion — cards appear one-by-one matching narration rhythm */}
      <div style={{
        position: "absolute", top: 220, left: 80, right: 80,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        zIndex: 2,
      }}>
        <StaggeredMotion
          transition={{ stagger: 8, staggerDirection: "forward", opacity: [0, 1], y: [40, 0], scale: [0.9, 1], duration: 25 }}
        >
          {CARDS.map(({ Icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                padding: 32, borderRadius: 20,
                background: `linear-gradient(135deg, ${COLORS.bgMid}ee, ${COLORS.bgLight}44)`,
                border: `1px solid ${color}33`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                textAlign: "center",
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `${color}22`, border: `1px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={32} color={color} strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 700, color: COLORS.white }}>{title}</span>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 16, color: COLORS.textSecondary }}>{desc}</span>
            </div>
          ))}
        </StaggeredMotion>
      </div>
    </AbsoluteFill>
  );
};
```

---

## Blueprint 3: Data / Stats Scene (Left-right split layout)

**Khi dùng**: Numbers, statistics, metrics, comparisons.
**Template gốc**: Split Compare / Counter Reveal.
**Focal**: LottieAsset (chart) + AnimatedCounter + Pie.

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, AnimatedCounter, Particles, Spawner, Behavior } from "remotion-bits";
import { Pie } from "@remotion/shapes";
import { BarChart3, Clock, TrendingUp } from "lucide-react";
import { LottieAsset } from "@shared/LottieAsset";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

const STATS = [
  { icon: Clock, value: 10, suffix: "+ giờ", label: "tiết kiệm mỗi tuần", color: COLORS.accent },
  { icon: TrendingUp, value: 3, suffix: "x", label: "năng suất tăng", color: COLORS.success },
  { icon: BarChart3, value: 95, suffix: "%", label: "chính xác", color: COLORS.secondary },
];

export const DataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segments = AUDIO_SEGMENTS.data;
  const startFrame = segments[0].startFrame;

  const pieProgress = spring({ frame: frame - (startFrame + 60), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.bgDark} 0%, #0a1a2e 100%)` }}>

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <Spawner rate={0.05} max={20} lifespan={90} velocity={{ x: 1, y: -2 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.success }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* WHY: Left side — Lottie chart animation as visual anchor */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ x: 0, initialX: -60 })]}
        delay={startFrame + 10}
        style={{ position: "absolute", top: 120, left: 80, zIndex: 2 }}
      >
        <LottieAsset name="chart-bar" style={{ width: 500, height: 400 }} />
      </Animated>

      {/* WHY: Right side — stats with AnimatedCounters, staggered to match narration */}
      <div style={{ position: "absolute", top: 120, right: 80, width: 550, zIndex: 2 }}>
        <Animated animations={[Fade({ to: 1, initial: 0 })]} delay={startFrame}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [20, 0], splitStagger: 4, duration: 20 }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 38, fontWeight: 700, color: COLORS.white, marginBottom: 40 }}
          >
            Phân tích và xử lý dữ liệu
          </AnimatedText>
        </Animated>

        {STATS.map(({ icon: Icon, value, suffix, label, color }, i) => (
          <Animated
            key={label}
            animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: 30 })]}
            delay={startFrame + 40 + i * 20}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: 20, borderRadius: 16, background: `${color}11`, border: `1px solid ${color}22` }}>
              <Icon size={32} color={color} strokeWidth={1.8} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <AnimatedCounter
                  transition={{ values: [0, value], duration: 90, delay: startFrame + 50 + i * 20, easing: "easeOut" }}
                  style={{ fontFamily: FONT_FAMILY, fontSize: 48, fontWeight: 800, color }}
                />
                <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 600, color }}>{suffix}</span>
              </div>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>{label}</span>
            </div>
          </Animated>
        ))}

        {/* WHY: Pie chart appears last as summary visual */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.7 })]}
          delay={startFrame + 100}
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Pie radius={60} progress={pieProgress * 0.95} fill={COLORS.success} closePath rotation={-90} />
        </Animated>
      </div>
    </AbsoluteFill>
  );
};
```

---

## Blueprint 4: Code / Tech Scene (Terminal layout)

**Khi dùng**: Programming, technical demo, code examples.
**Template gốc**: Code Terminal.
**Focal**: CodeBlock + TypeWriter + LottieAsset accent.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move } from "remotion-animated";
import { AnimatedText, CodeBlock, TypeWriter, Particles, Spawner, Behavior, MatrixRain } from "remotion-bits";
import { Code2, Cpu } from "lucide-react";
import { LottieAsset } from "@shared/LottieAsset";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

const CODE_SAMPLE = `const result = await ai.complete({
  model: "gpt-4",
  prompt: "Refactor this function...",
});
console.log(result.code); // Clean, tested code`;

export const CodeScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.coding;
  const startFrame = segments[0].startFrame;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0a0f1a 0%, ${COLORS.bgDark} 100%)` }}>

      {/* WHY: MatrixRain bg — tech aesthetic, very low opacity to not distract */}
      <MatrixRain color={COLORS.success} style={{ position: "absolute", inset: 0, opacity: 0.06 }} />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
        <Spawner rate={0.04} max={15} lifespan={80} velocity={{ x: -3, y: 4 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: COLORS.success }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* WHY: Header with icon — establishes scene context immediately */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: -20 })]}
        delay={startFrame}
        style={{ position: "absolute", top: 60, left: 80, display: "flex", alignItems: "center", gap: 16, zIndex: 2 }}
      >
        <Code2 size={40} color={COLORS.success} strokeWidth={1.8} />
        <AnimatedText
          transition={{ split: "word", opacity: [0, 1], y: [15, 0], splitStagger: 3, duration: 20 }}
          style={{ fontFamily: FONT_FAMILY, fontSize: 40, fontWeight: 700, color: COLORS.white }}
        >
          Lập trình & viết mã
        </AnimatedText>
      </Animated>

      {/* WHY: Left — code block as main visual, fills 55% width */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ x: 0, initialX: -40 })]}
        delay={startFrame + 20}
        style={{ position: "absolute", top: 180, left: 80, width: "55%", zIndex: 2 }}
      >
        <CodeBlock
          code={CODE_SAMPLE}
          language="typescript"
          theme="dark"
          transition={{ opacity: [0, 1], duration: 30 }}
          style={{ borderRadius: 16, overflow: "hidden" }}
        />
      </Animated>

      {/* WHY: Right — Lottie accent + TypeWriter output, creates visual balance */}
      <div style={{ position: "absolute", top: 180, right: 80, width: 400, zIndex: 2 }}>
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.8 })]}
          delay={startFrame + 30}
        >
          <LottieAsset name="coding" style={{ width: 300, height: 240 }} />
        </Animated>

        <Animated
          animations={[Fade({ to: 1, initial: 0 })]}
          delay={startFrame + 60}
          style={{ marginTop: 24 }}
        >
          <TypeWriter
            text="Viết mã · Sửa lỗi · Refactor · Giải thích code"
            typeSpeed={3}
            blinkSpeed={20}
            style={{ fontFamily: "monospace", fontSize: 20, color: COLORS.accentLight }}
          />
        </Animated>
      </div>
    </AbsoluteFill>
  );
};
```

---

## Blueprint 5: CTA Scene (Center-focus, energetic)

**Khi dùng**: Call to action, closing scene.
**Template gốc**: Particle CTA.
**Focal**: LottieAsset + AnimatedText headline + Particles burst.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { Rocket, ArrowRight } from "lucide-react";
import { LottieAsset } from "@shared/LottieAsset";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

export const CTAScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.cta;
  const startFrame = segments[0].startFrame;

  return (
    <AbsoluteFill>
      {/* WHY: Brighter gradient — CTA is the emotional peak, feels hopeful */}
      <GradientTransition
        gradient={[
          `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.accent}15 100%)`,
          `linear-gradient(135deg, ${COLORS.accent}20 0%, ${COLORS.success}15 100%)`,
        ]}
        duration={SCENES.cta.duration}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* WHY: Burst particles — celebratory, CTA energy */}
      <Particles style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
        <Spawner rate={0.1} max={40} lifespan={120} velocity={{ x: 0, y: -8 }} area={{ width: 1920, height: 1080 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.accentLight }} />
        </Spawner>
        <Behavior opacity={[0.2, 0]} />
      </Particles>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>

        {/* WHY: Rocket Lottie — universal "launch/start" symbol */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.3 }), Move({ y: 0, initialY: 50 })]}
          delay={startFrame + 5}
        >
          <LottieAsset name="rocket" style={{ width: 250, height: 250 }} />
        </Animated>

        {/* WHY: Headline — large, bold, clear action message */}
        <div style={{ marginTop: 20 }}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [30, 0], blur: [4, 0], splitStagger: 5, duration: 25, delay: startFrame + 20 }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 48, fontWeight: 800, color: COLORS.white, textAlign: "center", lineHeight: 1.3 }}
          >
            Bắt đầu ngay hôm nay
          </AnimatedText>
        </div>

        {/* WHY: CTA button — visual anchor, appears after headline holds */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.8 })]}
          delay={startFrame + 80}
        >
          <div style={{
            marginTop: 40, padding: "18px 48px", borderRadius: 40,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: `0 8px 32px ${COLORS.accent}44`,
          }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 700, color: COLORS.white }}>
              Thử ngay
            </span>
            <ArrowRight size={24} color={COLORS.white} />
          </div>
        </Animated>

        {/* WHY: Subtext — lower priority info, subtle */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 })]}
          delay={startFrame + 100}
        >
          <span style={{ marginTop: 24, fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>
            ChatGPT · Cursor · Claude · Gemini
          </span>
        </Animated>
      </div>
    </AbsoluteFill>
  );
};
```

---

## Checklist khi adapt blueprint

Sau khi copy blueprint, kiểm tra:

- [ ] Thay nội dung text cho đúng kịch bản
- [ ] Chọn đúng `LottieAsset name` từ `public/lottie/manifest.json`
- [ ] Thay Lucide icons cho phù hợp chủ đề
- [ ] Update AUDIO_SEGMENTS key (`hook`, `text`, `data`, `coding`, `cta`)
- [ ] Background gradient khác scene trước/sau
- [ ] Colors dùng từ `COLORS.*`, accent color khác scene trước
- [ ] Particles velocity/color khác scene trước
