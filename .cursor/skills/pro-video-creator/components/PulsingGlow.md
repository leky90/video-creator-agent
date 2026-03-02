# PulsingGlow → ⚠️ DEPRECATED
Dùng `Animated` từ `remotion-animated` với Scale animation, hoặc `noise2D` từ `@remotion/noise`.

```tsx
import { Animated, Scale } from "remotion-animated";
import { noise2D } from "@remotion/noise";

// Option 1: Animated
<Animated animations={[Scale({ by: 1.05, initial: 0.95 })]} delay={0}>
  <GlowElement />
</Animated>

// Option 2: Organic pulse with noise
const pulse = noise2D("glow", frame * 0.02, 0) * 0.1 + 1;
<div style={{ transform: `scale(${pulse})`, boxShadow: `0 0 40px ${COLORS.accent}60` }}>
  <Content />
</div>
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
