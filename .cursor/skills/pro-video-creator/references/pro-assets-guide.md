# Professional Assets Guide

**NGUYÊN TẮC: Dùng kho assets có sẵn. KHÔNG tự vẽ SVG phức tạp. KHÔNG dùng ảnh stock.**

Chất lượng visual KHÔNG phụ thuộc vào khả năng vẽ của model. Thay vào đó, dùng:
1. Pre-bundled Lottie animations (chuyên nghiệp, nhất quán)
2. Lucide icons (clean, consistent stroke style)
3. @remotion/shapes (data viz, geometric accents)
4. Library components (particles, code blocks, gradients)

---

## 0. Pre-bundled Lottie Assets (ƯU TIÊN SỐ 1)

**34 Lottie animations có sẵn** trong `public/lottie/`, phân loại theo chủ đề. Dùng `LottieAsset` component:

```tsx
import { LottieAsset } from "@shared/LottieAsset";

<LottieAsset name="ai-brain" style={{ width: 400, height: 400 }} />
<LottieAsset name="chart-bar" playbackRate={0.5} />
<LottieAsset name="rocket" style={{ width: 250 }} />
```

### Danh mục theo chủ đề

Đọc `public/lottie/manifest.json` cho danh sách đầy đủ. Tóm tắt:

| Category | Assets | Dùng cho |
|----------|--------|---------|
| `ai/` | ai-brain, ai-robot, ai-chip, ai-network, ai-learning | AI/ML scenes, hook, solution |
| `tech/` | coding, terminal, cloud, server, api, security | Code, tech demos, infrastructure |
| `data/` | chart-bar, chart-pie, chart-line, database, analytics | Data, statistics, dashboards |
| `business/` | growth, team, money, target, success | Business, marketing, CTA |
| `general/` | rocket, loading, checkmark, notification, search, globe, lightbulb, clock, star | Hook, CTA, general purpose |
| `abstract/` | particles, wave, gradient-orb, geometric | Backgrounds, ambient, transitions |

### Topic → Lottie + Lucide Icon mapping

Khi tạo video cho một chủ đề, dùng bảng này để nhanh chóng chọn assets:

| Chủ đề | Lottie Assets | Lucide Icons |
|--------|--------------|-------------|
| AI / Machine Learning | ai-brain, ai-robot, ai-network, ai-chip | Brain, Sparkles, Bot, Cpu, Zap |
| Lập trình / Code | coding, terminal, api | Code2, Terminal, FileCode, GitBranch |
| Dữ liệu / Analytics | chart-bar, chart-pie, chart-line, analytics, database | BarChart3, Database, TrendingUp, PieChart |
| Cloud / Infrastructure | cloud, server, security | Cloud, Server, Shield, Lock |
| Business / Marketing | growth, team, money, target, success | Target, Rocket, TrendingUp, Users, DollarSign |
| Education / Learning | ai-learning, lightbulb | BookOpen, GraduationCap, Lightbulb |
| General / Productivity | rocket, clock, checkmark, search, globe | Rocket, Clock, CheckCircle, Search, Globe |
| Security / Privacy | security | Shield, Lock, ShieldCheck, Eye |

### Mở rộng kho Lottie

Nếu cần thêm animation không có trong kho:

1. Search trên [LottieFiles](https://lottiefiles.com/free-animations) theo keyword
2. Download file `.json`
3. Lưu vào `public/lottie/[category]/[name].json`
4. Chạy `python3 scripts/fetch-lottie-assets.py` để rebuild manifest
5. Dùng `<LottieAsset name="[name]" />`

---

## 1. Lucide Icons (ƯU TIÊN SỐ 2)

**1500+ icons clean, consistent stroke style.** Đã cài sẵn: `lucide-react`.

```tsx
import { Brain, Rocket, Mail, BarChart3, Zap, Shield, Code2, Eye } from "lucide-react";

<Brain size={64} color={COLORS.accent} strokeWidth={1.5} />
```

**Ưu điểm so với emoji/tự vẽ:**
- Consistent style xuyên suốt video
- Có thể animate (color, size, rotation) via `Animated`
- Render sắc nét ở mọi kích thước
- Không phụ thuộc khả năng vẽ của model

**Pattern phổ biến — Icon + Animated:**
```tsx
<Animated animations={[Fade({ to: 1, initial: 0 }), Scale({ by: 1, initial: 0.5 })]} delay={20}>
  <div style={{ width: 80, height: 80, borderRadius: 20, background: `${COLORS.accent}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Brain size={40} color={COLORS.accent} strokeWidth={1.5} />
  </div>
</Animated>
```

---

## 2. @remotion/shapes (ƯU TIÊN SỐ 3)

Cho data visualization, progress indicators, geometric accents.

```tsx
import { Pie, Circle, Star, Triangle } from "@remotion/shapes";

// Animated progress pie
const progress = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
<Pie radius={80} progress={progress * 0.95} fill={COLORS.success} closePath rotation={-90} />

// Decorative circle
<Circle radius={40} fill={`${COLORS.accent}20`} stroke={COLORS.accent} strokeWidth={2} />
```

---

## 3. Library Components (ƯU TIÊN SỐ 4)

Specialized visual components từ các library đã cài:

| Component | Library | Dùng cho |
|-----------|---------|---------|
| `Particles` + `Spawner` + `Behavior` | remotion-bits | Ambient layer (mỗi scene) |
| `MatrixRain` | remotion-bits | Code/tech scene background |
| `CodeBlock` | remotion-bits | Code display với syntax highlighting |
| `GradientTransition` | remotion-bits | Animated gradient backgrounds |
| `ScrollingColumns` | remotion-bits | Showcase scrolling content |
| `LightLeaks` | @remotion/light-leaks | Cinematic overlay cho CTA |

---

## 4. Simple Inline SVG (ƯU TIÊN SỐ 5)

**CHỈ dùng cho diagram/flowchart đơn giản** — không tự vẽ người, vật thể, cảnh.

```tsx
// Đường nối giữa 2 elements — OK
<svg><line x1={100} y1={200} x2={400} y2={200} stroke={COLORS.accent} strokeWidth={2} /></svg>

// Arrow path — OK
<svg><path d="M 100 200 L 400 200" stroke={COLORS.accent} strokeWidth={2} markerEnd="url(#arrow)" /></svg>

// KHÔNG OK — tự vẽ robot, người, máy tính → dùng LottieAsset thay thế
```

---

## Thứ tự ưu tiên tổng hợp

| # | Asset Type | Component | Khi nào |
|---|-----------|-----------|---------|
| 1 | Pre-bundled Lottie | `<LottieAsset name="..." />` | Focal point chính mỗi scene |
| 2 | Lucide icons | `<Brain />`, `<Rocket />` | Labels, badges, category indicators |
| 3 | @remotion/shapes | `<Pie />`, `<Circle />` | Data viz, progress, accents |
| 4 | Library components | `Particles`, `MatrixRain`, `CodeBlock` | Ambient, specialized |
| 5 | Simple inline SVG | `<svg><line .../></svg>` | Flowcharts, connectors |

**TUYỆT ĐỐI KHÔNG:**
- Tự vẽ SVG phức tạp (người, vật thể, cảnh) — dùng `LottieAsset`
- Dùng emoji làm minh họa chính — dùng Lucide icons hoặc `AnimatedEmoji`
