# SpringBadge → ⚠️ DEPRECATED
Dùng `StaggeredMotion` từ `remotion-bits` hoặc `Animated` từ `remotion-animated` thay thế.

```tsx
import { StaggeredMotion } from "remotion-bits";

<StaggeredMotion stagger={5} transition={{ opacity: [0, 1], y: [30, 0], scale: [0.8, 1], duration: 25 }}>
  <Badge icon={Zap} label="Tốc độ" />
  <Badge icon={Target} label="Chính xác" />
  <Badge icon={DollarSign} label="Chi phí thấp" />
</StaggeredMotion>
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
