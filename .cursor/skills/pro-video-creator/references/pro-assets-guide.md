# Professional Assets & Animation Guide

**NGUYÊN TẮC: TẢI TRƯỚC, VẼ SAU. KHÔNG TỰ VẼ SVG KHI CÓ NGUỒN CHUYÊN NGHIỆP.**

AI tự vẽ SVG chỉ ra được mức icon thô sơ. Để video đạt chất lượng chuyên nghiệp, **phải dùng hình ảnh/illustration thật** từ các nguồn miễn phí.

---

## 0. Hình minh họa từ Pixabay/Pexels (ƯU TIÊN SỐ 1)

**Đây là nguồn quan trọng nhất.** Chạy script fetch trước khi code:

```bash
# Tải illustrations cho từng scene (từ segments.json)
python scripts/fetch-illustrations.py --scenes remotion_video/[tên-video]/segments.json --outdir public/images/[tên-video]

# Hoặc tải theo keyword cụ thể
python scripts/fetch-illustrations.py --queries "artificial intelligence,robot,data analytics,automation,future technology" --outdir public/images/[tên-video] --count 3
```

**Cần API key miễn phí** (đăng ký 30 giây):
- Pixabay: https://pixabay.com/api/docs/#api_key → thêm `PIXABAY_API_KEY=...` vào `.env`
- Pexels: https://www.pexels.com/api/ → thêm `PEXELS_API_KEY=...` vào `.env`

**Dùng trong Remotion** với image treatments (xem [components/ImageTreatments.md](../components/ImageTreatments.md)):

```tsx
import { Img, staticFile } from "remotion";

// Ảnh với duotone overlay
<DuotoneImage src="images/my-video/scene-01-pixabay-12345.jpg" dark={COLORS.bgDark} light={COLORS.accent} />

// Ảnh làm background với color overlay
<ColorOverlayImage src="images/my-video/scene-02.jpg" color={COLORS.bgDark} overlayOpacity={0.7} blur={3} />

// Ken Burns effect cho ảnh tĩnh
<KenBurns src="images/my-video/scene-03.jpg" zoomTo={1.12} />
```

---

## 1. Lottie Animations (ƯU TIÊN SỐ 2)

**Lottie = JSON-based animations do motion designer chuyên nghiệp tạo.** Remotion hỗ trợ native.

### Nguồn miễn phí

| Nguồn | URL | Ghi chú |
|---|---|---|
| LottieFiles | https://lottiefiles.com/free-animations | Lớn nhất, 100k+ animations miễn phí |
| IconScout Lottie | https://iconscout.com/lottie-animations/free | Nhiều icon animated |
| LordIcon | https://lordicon.com/ | 1500+ animated icons miễn phí |

### Cách dùng trong Remotion

```bash
npm install @remotion/lottie lottie-web
```

```tsx
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

// Cách 1: Load từ file JSON trong public/
const MyLottie: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading Lottie"));
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(staticFile("lottie/ai-robot.json"))
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
  }, [handle]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      style={{ width: 400, height: 400 }}
    />
  );
};

// Cách 2: Import trực tiếp (nhỏ hơn 500KB)
import animationData from "../../public/lottie/loading.json";

const InlineLottie: React.FC = () => (
  <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />
);
```

### Tìm Lottie theo chủ đề

Khi tạo video, search LottieFiles theo keyword:
- AI/Tech: "robot", "artificial intelligence", "neural network", "coding", "data"
- Business: "growth", "chart", "money", "team", "success"
- Education: "book", "light bulb", "brain", "graduation"
- General: "loading", "check", "error", "notification", "rocket"

### Quy trình

1. Search trên LottieFiles theo keyword
2. Download file `.json`
3. Lưu vào `public/lottie/[tên-video]/`
4. Import và dùng `<Lottie>` component

---

## 2. Light Leaks (Hiệu ứng cinematic)

**Light leaks = ánh sáng rò rỉ qua ống kính, tạo cảm giác cinematic.** Remotion có package chuyên dụng.

```bash
npm install @remotion/light-leaks
```

```tsx
import { LightLeaks } from "@remotion/light-leaks";

// Overlay lên scene
<AbsoluteFill>
  <MySceneContent />
  <LightLeaks
    seed={42}
    style={{ opacity: 0.3 }}
  />
</AbsoluteFill>
```

Dùng cho:
- Scene chuyển cảnh (transition moments)
- CTA scenes (tạo cảm giác epic)
- Highlight moments (khi reveal thông tin quan trọng)

---

## 3. SVG Icon Libraries (thay thế emoji)

Thay emoji bằng SVG icons chất lượng:

| Library | Style | Cách dùng |
|---|---|---|
| Lucide | Clean, consistent stroke | `npm install lucide-react` → `<Mail size={48} />` |
| Phosphor | Flexible weights | `npm install @phosphor-icons/react` → `<Robot size={48} />` |
| Heroicons | Tailwind-style | `npm install @heroicons/react` → `<ChartBarIcon />` |
| Tabler Icons | 4900+ icons | `npm install @tabler/icons-react` → `<IconBrain size={48} />` |

```tsx
import { Brain, Rocket, Mail, BarChart3, Zap, Shield } from "lucide-react";

// Trong scene
<Brain size={96} color={COLORS.accent} strokeWidth={1.5} />
```

**Ưu điểm so với emoji:**
- Consistent style xuyên suốt video
- Có thể animate (color, size, rotation, strokeDasharray)
- Render sắc nét ở mọi kích thước
- Chuyên nghiệp hơn nhiều

---

## 4. Illustration Libraries (thay SVG tự vẽ)

| Nguồn | URL | Style |
|---|---|---|
| unDraw | https://undraw.co/ | Flat, customizable color |
| Storyset | https://storyset.com/ | Animated illustrations (Freepik) |
| Open Peeps | https://openpeeps.com/ | Hand-drawn people |
| Humaaans | https://humaaans.com/ | Mix-and-match people |
| Blush | https://blush.design/ | Multiple artist styles |

### Cách dùng

1. Download SVG từ nguồn
2. Lưu vào `public/illustrations/[tên-video]/`
3. Dùng `<Img src={staticFile("illustrations/...")} />` hoặc inline SVG

---

## 5. Background Patterns & Textures

| Nguồn | URL | Mô tả |
|---|---|---|
| Hero Patterns | https://heropatterns.com/ | SVG background patterns |
| SVG Backgrounds | https://svgbackgrounds.com/ | Customizable SVG bgs |
| Haikei | https://haikei.app/ | Generate blob, wave, gradient mesh |

### Gradient Mesh trong code

```tsx
// Nhiều radial gradients chồng lên nhau
<AbsoluteFill style={{
  background: `
    radial-gradient(ellipse at 20% 30%, ${COLORS.accent}15 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, ${COLORS.secondary}10 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, ${COLORS.success}08 0%, transparent 60%),
    linear-gradient(160deg, ${COLORS.bgDark}, #0c1e3d)
  `,
}} />
```

---

## 6. Animated Backgrounds (code-based)

### Gradient Orb Animation
```tsx
const GradientOrbs: React.FC = () => {
  const frame = useCurrentFrame();
  const orbs = [
    { x: 20, y: 30, size: 500, color: COLORS.accent, speed: 0.02 },
    { x: 70, y: 60, size: 400, color: COLORS.secondary, speed: 0.03 },
    { x: 50, y: 80, size: 350, color: COLORS.success, speed: 0.015 },
  ];

  return (
    <AbsoluteFill>
      {orbs.map((orb, i) => {
        const offsetX = Math.sin(frame * orb.speed + i) * 50;
        const offsetY = Math.cos(frame * orb.speed + i * 2) * 30;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${orb.x}%`, top: `${orb.y}%`,
            width: orb.size, height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}20, transparent 70%)`,
            transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
            filter: "blur(40px)",
          }} />
        );
      })}
    </AbsoluteFill>
  );
};
```

### Grid Lines Animation
```tsx
const AnimatedGrid: React.FC<{ color?: string }> = ({ color = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const offset = frame * 0.5;

  return (
    <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.08 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h-${i}`}
          x1={0} y1={i * 60 + offset % 60}
          x2={1920} y2={i * 60 + offset % 60}
          stroke={color} strokeWidth={1}
        />
      ))}
      {Array.from({ length: 35 }).map((_, i) => (
        <line key={`v-${i}`}
          x1={i * 60 + offset % 60} y1={0}
          x2={i * 60 + offset % 60} y2={1080}
          stroke={color} strokeWidth={1}
        />
      ))}
    </svg>
  );
};
```

---

## Thứ tự ưu tiên khi chọn visual cho mỗi scene

1. **Ảnh minh họa từ Pixabay/Pexels** + image treatment (duotone/overlay/KenBurns) — LUÔN chạy `fetch-illustrations.py` trước
2. **Lottie animation** — nếu tìm được animation phù hợp trên LottieFiles
3. **SVG icon library** (Lucide/Phosphor) — cho icons nhỏ, labels, thay thế emoji
4. **Code-based animation** — particles, gradient orbs, grid lines, progress rings (ambient layer)
5. **Custom SVG** — CHỈ KHI không có nguồn nào ở trên phù hợp, và chỉ cho diagram/flowchart đơn giản

**TUYỆT ĐỐI KHÔNG:**
- Tự vẽ SVG phức tạp (người, vật thể, cảnh) — sẽ ra thô sơ
- Dùng emoji làm minh họa chính
- Bỏ qua bước fetch-illustrations — đây là bước BẮT BUỘC

Nguyên tắc: **Tải trước, vẽ sau. Ảnh thật + treatment > SVG tự vẽ.**
