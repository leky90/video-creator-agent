# TypingEffect → ⚠️ DEPRECATED
Dùng `AnimatedText` hoặc `TypeWriter` từ `remotion-bits` thay thế.

```tsx
import { AnimatedText, TypeWriter } from "remotion-bits";

// Word-by-word reveal
<AnimatedText transition={{ split: "word", opacity: [0, 1], y: [30, 0], blur: [6, 0], stagger: 3, duration: 25 }}
  style={{ fontSize: 48, color: COLORS.white }}>
  Text xuất hiện từng chữ
</AnimatedText>

// Classic typewriter
<TypeWriter text="Hello World" speed={3} cursor="|" cursorBlinkSpeed={15}
  style={{ fontSize: 24, fontFamily: "monospace", color: COLORS.accent }} />
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
