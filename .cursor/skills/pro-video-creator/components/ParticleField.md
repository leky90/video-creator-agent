# ParticleField → ⚠️ DEPRECATED
Dùng `Particles` từ `remotion-bits` thay thế.

```tsx
import { Particles, Spawner, Behavior } from "remotion-bits";

<Particles
  spawner={Spawner.continuous({ rate: 2, maxParticles: 25 })}
  behaviors={[Behavior.linearVelocity({ vy: -0.3 }), Behavior.fadeOut()]}
  style={{ position: "absolute", inset: 0, opacity: 0.12 }}
/>
```

Xem thêm: [../references/remotion-libraries.md](../references/remotion-libraries.md)
