# AmbientGlow → ⚠️ DEPRECATED
Dùng `GradientTransition` từ `remotion-bits` hoặc `noise2D` từ `@remotion/noise` thay thế.

```tsx
import { GradientTransition } from "remotion-bits";

// Animated gradient glow
<GradientTransition
  gradients={[
    `radial-gradient(circle at 30% 50%, ${COLORS.accent}30, transparent 70%)`,
    `radial-gradient(circle at 70% 50%, ${COLORS.secondary}30, transparent 70%)`,
  ]}
  duration={120}
  style={{ position: "absolute", inset: 0 }}
/>
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
