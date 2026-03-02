# Scene Blueprints — Concrete TSX Examples

5 production-ready scene examples. **Copy, adapt, and customize** — đừng viết từ đầu.

Mỗi blueprint dùng:
- `segments[N].startFrame` để timing khớp từng câu narration
- `LAYOUT`/`ZONES`/`Z_INDEX` constants để layout nhất quán
- Max 4 visual elements per scene

---

## Blueprint 1: Hook Scene (Center-focus layout)

**Khi dùng**: Opening scene, gây tò mò, đặt câu hỏi lớn.
**Focal**: LottieAsset centered + AnimatedCounter + AnimatedText.

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, AnimatedCounter, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { LottieAsset } from "~shared/LottieAsset";
import { LAYOUT, ZONES, Z_INDEX } from "~shared/layout";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

export const HookScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.hook;
  // segments[0] = "Trí tuệ nhân tạo hiện nay có thể làm những gì?"
  // segments[1] = "Câu trả lời sẽ khiến bạn bất ngờ."
  // segments[2] = "Các AI đang hỗ trợ con người trong năm nhóm năng lực chính."
  const seg0 = segments[0];
  const seg1 = segments[1] ?? segments[0];
  const seg2 = segments[2] ?? segments[1] ?? segments[0];

  return (
    <AbsoluteFill>
      <GradientTransition
        gradient={[
          `radial-gradient(ellipse at 50% 50%, ${COLORS.bgMid} 0%, ${COLORS.bgDark} 70%)`,
          `radial-gradient(ellipse at 40% 60%, ${COLORS.accent}22 0%, ${COLORS.bgDark} 70%)`,
        ]}
        duration={SCENES.hook.duration}
        style={{ position: "absolute", inset: 0, zIndex: Z_INDEX.background }}
      />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.12, zIndex: Z_INDEX.ambient }}>
        <Spawner rate={0.06} max={25} lifespan={100} velocity={{ x: 3, y: -6 }}
          area={{ width: LAYOUT.WIDTH, height: LAYOUT.HEIGHT }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.accentLight }} />
        </Spawner>
        <Behavior opacity={[0.15, 0]} />
      </Particles>

      {/* Center-focus: all content in one column */}
      <div style={{ ...ZONES.center, position: "absolute", zIndex: Z_INDEX.content }}>

        {/* Lottie appears with first sentence */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.5 })]}
          delay={seg0.startFrame}
        >
          <LottieAsset name="ai-brain" style={{ width: 300, height: 300 }} />
        </Animated>

        {/* Title reveals with second sentence */}
        <div style={{ marginTop: LAYOUT.ROW_GAP }}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [30, 0], blur: [6, 0],
              splitStagger: 4, duration: 25, delay: seg1.startFrame }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 52, fontWeight: 800,
              color: COLORS.white, textAlign: "center", lineHeight: 1.3 }}
          >
            Các AI hiện nay có thể làm gì?
          </AnimatedText>
        </div>

        {/* Counter appears with third sentence mentioning "5 nhóm" */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: 20 })]}
          delay={seg2.startFrame}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: LAYOUT.ROW_GAP }}>
            <AnimatedCounter
              transition={{ values: [0, 5], duration: 90, delay: seg2.startFrame + 10, easing: "easeOut" }}
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

## Blueprint 2: Information Cards (Top-banner + grid layout)

**Khi dùng**: Features, capabilities, list of items.
**Focal**: StaggeredMotion cards + Lucide icons.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move } from "remotion-animated";
import { AnimatedText, StaggeredMotion, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { MessageSquare, Languages, FileText, HelpCircle } from "lucide-react";
import { LAYOUT, ZONES, Z_INDEX } from "~shared/layout";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

const CARDS = [
  { Icon: MessageSquare, title: "Trò chuyện", desc: "Đối thoại tự nhiên", color: COLORS.accent },
  { Icon: Languages, title: "Dịch thuật", desc: "100+ ngôn ngữ", color: COLORS.secondary },
  { Icon: FileText, title: "Tóm tắt", desc: "Rút gọn nội dung", color: COLORS.success },
  { Icon: HelpCircle, title: "Trả lời", desc: "Giải đáp thắc mắc", color: COLORS.accentLight },
];

export const InfoScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.text;
  // segments[0] = intro sentence → title appears
  // segments[1] = detail sentence → cards appear
  const seg0 = segments[0];
  const seg1 = segments[1] ?? segments[0];

  return (
    <AbsoluteFill>
      <GradientTransition
        gradient={[
          `linear-gradient(160deg, ${COLORS.bgDark} 0%, #0c1e3d 100%)`,
          `linear-gradient(160deg, #0c1e3d 0%, ${COLORS.bgMid} 100%)`,
        ]}
        duration={SCENES.text.duration}
        style={{ position: "absolute", inset: 0, zIndex: Z_INDEX.background }}
      />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.1, zIndex: Z_INDEX.ambient }}>
        <Spawner rate={0.04} max={20} lifespan={80} velocity={{ x: -2, y: -3 }}
          area={{ width: LAYOUT.WIDTH, height: LAYOUT.HEIGHT }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.accent }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* Title in top banner zone — timed to segments[0] */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: -20 })]}
        delay={seg0.startFrame}
        style={{ ...ZONES.topBanner, zIndex: Z_INDEX.text }}
      >
        <AnimatedText
          transition={{ split: "word", opacity: [0, 1], y: [20, 0], splitStagger: 4, duration: 20 }}
          style={{ fontFamily: FONT_FAMILY, fontSize: 42, fontWeight: 700, color: COLORS.white }}
        >
          Xử lý ngôn ngữ tự nhiên
        </AnimatedText>
      </Animated>

      {/* Cards in content-below zone — timed to segments[1] */}
      <div style={{
        ...ZONES.contentBelow, zIndex: Z_INDEX.content,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: LAYOUT.COLUMN_GAP,
        alignContent: "start", paddingTop: LAYOUT.ROW_GAP,
      }}>
        <StaggeredMotion
          transition={{ stagger: 8, staggerDirection: "forward",
            opacity: [0, 1], y: [40, 0], scale: [0.9, 1], duration: 25 }}
        >
          {CARDS.map(({ Icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                padding: LAYOUT.PADDING, borderRadius: 20,
                background: `linear-gradient(135deg, ${COLORS.bgMid}ee, ${COLORS.bgLight}44)`,
                border: `1px solid ${color}33`,
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 16, textAlign: "center",
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
**Focal**: LottieAsset (chart) + AnimatedCounter + Pie.

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, AnimatedCounter, Particles, Spawner, Behavior } from "remotion-bits";
import { Pie } from "@remotion/shapes";
import { BarChart3, Clock, TrendingUp } from "lucide-react";
import { LottieAsset } from "~shared/LottieAsset";
import { LAYOUT, ZONES, Z_INDEX } from "~shared/layout";
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
  // segments[0] = intro sentence → title + chart Lottie
  // segments[1] = detail sentence → stat counters
  // segments[2] = summary sentence → pie chart
  const seg0 = segments[0];
  const seg1 = segments[1] ?? segments[0];
  const seg2 = segments[2] ?? segments[1] ?? segments[0];

  const pieProgress = spring({ frame: frame - seg2.startFrame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.bgDark} 0%, #0a1a2e 100%)` }}>

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.1, zIndex: Z_INDEX.ambient }}>
        <Spawner rate={0.05} max={20} lifespan={90} velocity={{ x: 1, y: -2 }}
          area={{ width: LAYOUT.WIDTH, height: LAYOUT.HEIGHT }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.success }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* Left — Lottie chart, timed to segments[0] */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ x: 0, initialX: -60 })]}
        delay={seg0.startFrame}
        style={{ ...ZONES.leftThird, zIndex: Z_INDEX.focal }}
      >
        <LottieAsset name="chart-bar" style={{ width: LAYOUT.FOCAL_MAX_WIDTH, height: 400 }} />
      </Animated>

      {/* Right — title + stats, timed to segments */}
      <div style={{ ...ZONES.rightTwoThirds, zIndex: Z_INDEX.content }}>

        {/* Title — timed to segments[0] */}
        <Animated animations={[Fade({ to: 1, initial: 0 })]} delay={seg0.startFrame}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [20, 0], splitStagger: 4, duration: 20 }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 38, fontWeight: 700, color: COLORS.white, marginBottom: 40 }}
          >
            Phân tích và xử lý dữ liệu
          </AnimatedText>
        </Animated>

        {/* Stats — timed to segments[1], staggered within */}
        {STATS.map(({ icon: Icon, value, suffix, label, color }, i) => (
          <Animated
            key={label}
            animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: 30 })]}
            delay={seg1.startFrame + i * 15}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 20, marginBottom: LAYOUT.ROW_GAP,
              padding: 20, borderRadius: 16, background: `${color}11`, border: `1px solid ${color}22`,
            }}>
              <Icon size={32} color={color} strokeWidth={1.8} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <AnimatedCounter
                  transition={{ values: [0, value], duration: 90, delay: seg1.startFrame + 10 + i * 15, easing: "easeOut" }}
                  style={{ fontFamily: FONT_FAMILY, fontSize: 48, fontWeight: 800, color }}
                />
                <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 600, color }}>{suffix}</span>
              </div>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.textSecondary }}>{label}</span>
            </div>
          </Animated>
        ))}

        {/* Pie chart — timed to segments[2] */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.7 })]}
          delay={seg2.startFrame}
          style={{ display: "flex", justifyContent: "center", marginTop: LAYOUT.ROW_GAP }}
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
**Focal**: CodeBlock + TypeWriter + LottieAsset accent.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move } from "remotion-animated";
import { AnimatedText, CodeBlock, TypeWriter, Particles, Spawner, Behavior, MatrixRain } from "remotion-bits";
import { Code2 } from "lucide-react";
import { LottieAsset } from "~shared/LottieAsset";
import { LAYOUT, ZONES, Z_INDEX } from "~shared/layout";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

const CODE_SAMPLE = `const result = await ai.complete({
  model: "gpt-4",
  prompt: "Refactor this function...",
});
console.log(result.code);`;

export const CodeScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.coding;
  // segments[0] = intro → header + code block
  // segments[1] = detail → Lottie + TypeWriter
  const seg0 = segments[0];
  const seg1 = segments[1] ?? segments[0];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0a0f1a 0%, ${COLORS.bgDark} 100%)` }}>

      <MatrixRain color={COLORS.success}
        style={{ position: "absolute", inset: 0, opacity: 0.06, zIndex: Z_INDEX.background }} />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.08, zIndex: Z_INDEX.ambient }}>
        <Spawner rate={0.04} max={15} lifespan={80} velocity={{ x: -3, y: 4 }}
          area={{ width: LAYOUT.WIDTH, height: LAYOUT.HEIGHT }}>
          <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: COLORS.success }} />
        </Spawner>
        <Behavior opacity={[0.1, 0]} />
      </Particles>

      {/* Header — timed to segments[0] */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ y: 0, initialY: -20 })]}
        delay={seg0.startFrame}
        style={{
          position: "absolute", top: LAYOUT.CONTENT_TOP, left: LAYOUT.CONTENT_LEFT,
          display: "flex", alignItems: "center", gap: 16, zIndex: Z_INDEX.text,
        }}
      >
        <Code2 size={40} color={COLORS.success} strokeWidth={1.8} />
        <AnimatedText
          transition={{ split: "word", opacity: [0, 1], y: [15, 0], splitStagger: 3, duration: 20 }}
          style={{ fontFamily: FONT_FAMILY, fontSize: 40, fontWeight: 700, color: COLORS.white }}
        >
          Lập trình & viết mã
        </AnimatedText>
      </Animated>

      {/* Left — code block, timed to segments[0] */}
      <Animated
        animations={[Fade({ to: 1, initial: 0 }), Move({ x: 0, initialX: -40 })]}
        delay={seg0.startFrame + 10}
        style={{
          position: "absolute", top: LAYOUT.CONTENT_TOP + 100,
          left: LAYOUT.CONTENT_LEFT, width: "55%", zIndex: Z_INDEX.content,
        }}
      >
        <CodeBlock
          code={CODE_SAMPLE}
          language="typescript"
          theme="dark"
          transition={{ opacity: [0, 1], duration: 30 }}
          style={{ borderRadius: 16, overflow: "hidden" }}
        />
      </Animated>

      {/* Right — Lottie + TypeWriter, timed to segments[1] */}
      <div style={{
        position: "absolute", top: LAYOUT.CONTENT_TOP + 100,
        right: LAYOUT.CONTENT_RIGHT, width: 400, zIndex: Z_INDEX.content,
      }}>
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.8 })]}
          delay={seg1.startFrame}
        >
          <LottieAsset name="coding" style={{ width: 300, height: 240 }} />
        </Animated>

        <Animated
          animations={[Fade({ to: 1, initial: 0 })]}
          delay={seg1.startFrame + 15}
          style={{ marginTop: LAYOUT.ROW_GAP }}
        >
          <TypeWriter
            text="Viết mã · Sửa lỗi · Refactor"
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
**Focal**: LottieAsset + AnimatedText headline + CTA button.

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Animated, Fade, Move, Scale } from "remotion-animated";
import { AnimatedText, Particles, Spawner, Behavior, GradientTransition } from "remotion-bits";
import { ArrowRight } from "lucide-react";
import { LottieAsset } from "~shared/LottieAsset";
import { LAYOUT, ZONES, Z_INDEX } from "~shared/layout";
import { COLORS, FONT_FAMILY, AUDIO_SEGMENTS, SCENES } from "../constants";

export const CTAScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS.cta;
  // segments[0] = "Bạn muốn tận dụng AI đúng cách?"
  // segments[1] = "Hãy chọn một công cụ phù hợp..."
  // segments[2] = "Bắt đầu ngay hôm nay."
  const seg0 = segments[0];
  const seg1 = segments[1] ?? segments[0];
  const seg2 = segments[2] ?? segments[1] ?? segments[0];

  return (
    <AbsoluteFill>
      <GradientTransition
        gradient={[
          `linear-gradient(135deg, ${COLORS.bgDark} 0%, ${COLORS.accent}15 100%)`,
          `linear-gradient(135deg, ${COLORS.accent}20 0%, ${COLORS.success}15 100%)`,
        ]}
        duration={SCENES.cta.duration}
        style={{ position: "absolute", inset: 0, zIndex: Z_INDEX.background }}
      />

      <Particles style={{ position: "absolute", inset: 0, opacity: 0.15, zIndex: Z_INDEX.ambient }}>
        <Spawner rate={0.1} max={40} lifespan={120} velocity={{ x: 0, y: -8 }}
          area={{ width: LAYOUT.WIDTH, height: LAYOUT.HEIGHT }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.accentLight }} />
        </Spawner>
        <Behavior opacity={[0.2, 0]} />
      </Particles>

      <div style={{ ...ZONES.center, position: "absolute", zIndex: Z_INDEX.content }}>

        {/* Rocket — timed to segments[0] */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.3 }), Move({ y: 0, initialY: 50 })]}
          delay={seg0.startFrame}
        >
          <LottieAsset name="rocket" style={{ width: 250, height: 250 }} />
        </Animated>

        {/* Headline — timed to segments[1] */}
        <div style={{ marginTop: LAYOUT.ROW_GAP }}>
          <AnimatedText
            transition={{ split: "word", opacity: [0, 1], y: [30, 0], blur: [4, 0],
              splitStagger: 5, duration: 25, delay: seg1.startFrame }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 48, fontWeight: 800,
              color: COLORS.white, textAlign: "center", lineHeight: 1.3 }}
          >
            Bắt đầu ngay hôm nay
          </AnimatedText>
        </div>

        {/* CTA button — timed to segments[2] */}
        <Animated
          animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.8 })]}
          delay={seg2.startFrame}
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
      </div>
    </AbsoluteFill>
  );
};
```

---

## Checklist khi adapt blueprint

Sau khi copy blueprint, kiểm tra:

- [ ] Map từng câu narration → segment index (`seg0`, `seg1`, `seg2`)
- [ ] Dùng `LAYOUT`/`ZONES`/`Z_INDEX` — không magic pixel numbers
- [ ] Max 4 visual elements (focal + title + 1-2 supporting)
- [ ] Chọn đúng `LottieAsset name` từ `public/lottie/manifest.json`
- [ ] Thay Lucide icons cho phù hợp chủ đề
- [ ] Update AUDIO_SEGMENTS key cho đúng scene
- [ ] Background gradient khác scene trước/sau
- [ ] Colors dùng từ `COLORS.*`, accent color khác scene trước
- [ ] Không dùng noise2D cho content elements (cards, text)
