# Image Treatments

Biến ảnh stock thành phong cách Kurzgesagt / explainer video bằng các kỹ thuật xử lý hình ảnh.

**Nguyên tắc: Ảnh thật + color treatment = professional 2D look.**

---

## 1. Duotone Overlay (phổ biến nhất)

Biến ảnh thành 2 tông màu — giống filter Kurzgesagt:

```tsx
const DuotoneImage: React.FC<{
  src: string;
  dark?: string;
  light?: string;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ src, dark = COLORS.bgDark, light = COLORS.accent, opacity = 0.85, style = {} }) => (
  <div style={{ position: "relative", overflow: "hidden", ...style }}>
    <Img src={staticFile(src)} style={{
      width: "100%", height: "100%", objectFit: "cover",
      filter: "grayscale(100%) contrast(1.2)",
    }} />
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg, ${dark}, ${light})`,
      mixBlendMode: "multiply",
      opacity,
    }} />
  </div>
);

// Dùng:
<DuotoneImage
  src="images/my-video/scene-01-pixabay-12345.jpg"
  dark={COLORS.bgDark}
  light={COLORS.accent}
  style={{ width: 600, height: 400, borderRadius: 20 }}
/>
```

## 2. Color Overlay (đơn giản, hiệu quả)

Ảnh làm nền + lớp màu phủ tạo mood:

```tsx
const ColorOverlayImage: React.FC<{
  src: string;
  color?: string;
  overlayOpacity?: number;
  blur?: number;
}> = ({ src, color = COLORS.bgDark, overlayOpacity = 0.6, blur = 0 }) => (
  <AbsoluteFill>
    <Img src={staticFile(src)} style={{
      width: "100%", height: "100%", objectFit: "cover",
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
    }} />
    <div style={{
      position: "absolute", inset: 0,
      backgroundColor: color,
      opacity: overlayOpacity,
    }} />
  </AbsoluteFill>
);

// Dùng làm scene background:
<AbsoluteFill>
  <ColorOverlayImage
    src="images/my-video/scene-02-city.jpg"
    color={COLORS.bgDark}
    overlayOpacity={0.7}
    blur={3}
  />
  {/* Content on top */}
  <div style={{ position: "relative", zIndex: 1 }}>
    ...content...
  </div>
</AbsoluteFill>
```

## 3. Vignette Frame

Tối dần từ tâm ra viền — tập trung chú ý vào giữa:

```tsx
const Vignette: React.FC<{ intensity?: number }> = ({ intensity = 0.6 }) => (
  <div style={{
    position: "absolute", inset: 0,
    background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${intensity}) 100%)`,
    pointerEvents: "none",
  }} />
);

// Dùng:
<AbsoluteFill>
  <Img src={...} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  <Vignette intensity={0.7} />
</AbsoluteFill>
```

## 4. Floating Image Card

Ảnh hiển thị trong card với shadow + border, spring animation:

```tsx
const FloatingImageCard: React.FC<{
  src: string;
  width?: number;
  delay?: number;
  rotation?: number;
}> = ({ src, width = 400, delay = 0, rotation = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 200 } });

  return (
    <div style={{
      width,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
      border: `2px solid ${COLORS.accent}30`,
      opacity: appear,
      transform: `scale(${appear}) rotate(${rotation}deg)`,
    }}>
      <Img src={staticFile(src)} style={{
        width: "100%", height: "auto",
        display: "block",
      }} />
    </div>
  );
};
```

## 5. Ken Burns (Slow zoom/pan on still image)

Tạo chuyển động nhẹ cho ảnh tĩnh:

```tsx
const KenBurns: React.FC<{
  src: string;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
}> = ({ src, zoomFrom = 1, zoomTo = 1.15, panX = 0, panY = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [zoomFrom, zoomTo]);
  const x = interpolate(progress, [0, 1], [0, panX]);
  const y = interpolate(progress, [0, 1], [0, panY]);

  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <Img src={staticFile(src)} style={{
        width: "100%", height: "100%", objectFit: "cover",
        transform: `scale(${scale}) translate(${x}px, ${y}px)`,
      }} />
    </div>
  );
};

// Dùng: zoom nhẹ từ 1x → 1.15x suốt scene
<KenBurns src="images/my-video/scene-03.jpg" zoomTo={1.12} panX={-20} />
```

## 6. Split Image + Content Layout

Nửa trái = ảnh, nửa phải = text content:

```tsx
<div style={{ display: "flex", width: "100%", height: "100%" }}>
  <div style={{ flex: 1, overflow: "hidden" }}>
    <DuotoneImage src="images/scene.jpg" style={{ width: "100%", height: "100%" }} />
  </div>
  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
    <h1 style={{ fontFamily: FONT_FAMILY, fontSize: 42, color: COLORS.white }}>Title</h1>
    <p style={{ fontFamily: FONT_FAMILY, fontSize: 22, color: COLORS.textSecondary }}>Description</p>
  </div>
</div>
```

---

## Chọn treatment nào cho scene nào?

| Scene type | Treatment gợi ý |
|---|---|
| Hook | KenBurns + Vignette (dramatic) |
| Problem | ColorOverlay dark + red tint |
| Agitate | DuotoneImage (danger colors) |
| Solution | DuotoneImage (accent colors) hoặc FloatingImageCard |
| How it works | Split Image + Content |
| CTA | ColorOverlay blur background + content on top |

## Import cần thiết

```tsx
import { Img, staticFile } from "remotion";
```
