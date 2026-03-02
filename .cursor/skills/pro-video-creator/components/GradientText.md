# GradientText → ⚠️ DEPRECATED
Dùng `AnimatedText` từ `remotion-bits` với gradient style thay thế.

```tsx
import { AnimatedText } from "remotion-bits";

<AnimatedText
  transition={{ split: "word", opacity: [0, 1], stagger: 2, duration: 20 }}
  style={{
    fontSize: 56, fontWeight: 800,
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary})`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  }}>
  Gradient Title
</AnimatedText>
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
