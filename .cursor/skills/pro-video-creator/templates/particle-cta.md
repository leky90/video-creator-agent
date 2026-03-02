# Particle CTA Template

**Best for:** CTA / closing scenes — uplifting, energetic feel with clear call to action

## Concept

Upward-floating particles create an energetic atmosphere. A bold headline with gradient text, a glowing pulsing CTA button that springs in, and a soft subtext below.

## Key Elements

1. **Upward-floating particles** — 20-30 colored dots rising at different speeds
2. **Gradient headline** — large text with accent-colored keyword using `WebkitBackgroundClip`
3. **CTA button** — spring scale entrance + pulsing glow shadow
4. **Subtext** — fades in late
5. **Dark gradient background** — deeper than other scenes for contrast

## Code Pattern

```tsx
// Floating particles
{Array.from({ length: 30 }).map((_, i) => {
  const px = ((i * 137.5 + 50) % 1920);
  const speed = 0.5 + (i % 5) * 0.3;
  const py = 1080 - ((frame * speed + i * 80) % 1200);
  const size = 2 + (i % 3);
  const particleOpacity = interpolate(py, [0, 200, 800, 1080], [0, 0.4, 0.4, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div key={i} style={{
      position: "absolute", left: px, top: py,
      width: size, height: size, borderRadius: "50%",
      backgroundColor: i % 3 === 0 ? COLORS.accent : COLORS.success,
      opacity: particleOpacity,
    }} />
  );
})}

// Headline with gradient text
const textReveal = interpolate(frame, [10, 40], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

<div style={{ opacity: textReveal }}>
  <div style={{ fontFamily: FONT_FAMILY, fontSize: 56, fontWeight: 800, color: COLORS.white, lineHeight: 1.3 }}>
    Start with{" "}
    <span style={{
      background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}>ONE</span>{" "}tool.
  </div>
</div>

// CTA Button
const buttonScale = spring({ frame: frame - 35, fps, config: { damping: 8, stiffness: 100 } });
const buttonGlow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.4, 1]);

<div style={{ transform: `scale(${buttonScale})` }}>
  <div style={{
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
    borderRadius: 60, padding: "20px 52px",
    boxShadow: `0 0 ${40 * buttonGlow}px ${COLORS.accent}60`,
    display: "flex", alignItems: "center", gap: 12,
  }}>
    <span style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.white }}>
      Automate Today
    </span>
    <span style={{ fontSize: 28 }}>→</span>
  </div>
</div>

// Subtext
<div style={{ opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
  <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, color: COLORS.textSecondary }}>
    Your future self will thank you.
  </span>
</div>
```

## Customization

- Change particle colors to match accent theme
- Replace headline and button text to match the CTA
- Adjust particle count (more = more energetic)
- Add confetti pattern for celebratory endings
