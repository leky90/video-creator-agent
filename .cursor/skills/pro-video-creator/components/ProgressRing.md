# ProgressRing → ⚠️ DEPRECATED
Dùng `Pie` từ `@remotion/shapes` với animated progress thay thế.

```tsx
import { Pie } from "@remotion/shapes";

const progress = spring({ frame, fps, config: { damping: 200 } });

<Pie radius={80} progress={progress * 0.75} fill={COLORS.success} closePath rotation={-90}
  stroke={COLORS.accent} strokeWidth={3} />
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
