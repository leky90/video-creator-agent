# Counter Reveal Template

**Best for:** Hook/stats scenes — dramatic number counting with impact reveal

## Concept

A large animated counter counts up to a striking number, accompanied by a label and context. A ring or bar fills as the number increases. The reveal creates a "wow" moment to hook the viewer.

## Key Elements

1. **Animated counter** — number counting up with easing
2. **Progress ring** — SVG circle that fills as counter increases
3. **Context label** — appears after number settles
4. **Impact text** — dramatic statement about the number
5. **Background glow** — intensifies as number approaches target

## Code Pattern

```tsx
const TARGET_NUMBER = 73;
const UNIT = "%";
const LABEL = "of workers feel overwhelmed";

// Counter animation
const counterProgress = interpolate(frame, [30, 150], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
const easedProgress = Easing.out(Easing.quad)(counterProgress);
const displayNumber = Math.round(easedProgress * TARGET_NUMBER);

// Ring fill
const circumference = 2 * Math.PI * 120;
const strokeDashoffset = circumference * (1 - easedProgress);

// Glow intensity
const glowIntensity = interpolate(counterProgress, [0.8, 1], [0.3, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// Label appears after counter settles
const labelOpacity = interpolate(frame, [160, 190], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// Layout
<div style={{
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
}}>
  {/* Progress ring */}
  <div style={{ position: "relative" }}>
    <svg width={280} height={280} viewBox="0 0 280 280">
      <circle cx={140} cy={140} r={120} fill="none"
              stroke={`${COLORS.bgLight}40`} strokeWidth={8} />
      <circle cx={140} cy={140} r={120} fill="none"
              stroke={COLORS.accent} strokeWidth={8}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 140 140)" />
    </svg>
    {/* Number overlay */}
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      fontFamily: FONT_FAMILY, fontSize: 72, fontWeight: 800,
      color: COLORS.white,
      textShadow: `0 0 ${30 * glowIntensity}px ${COLORS.accent}60`,
    }}>
      {displayNumber}{UNIT}
    </div>
  </div>

  {/* Label */}
  <div style={{ opacity: labelOpacity, textAlign: "center" }}>
    <span style={{ fontFamily: FONT_FAMILY, fontSize: 28, color: COLORS.textSecondary }}>
      {LABEL}
    </span>
  </div>
</div>
```

## SVG: Progress Ring Variants

### Bar variant (horizontal)
```tsx
<div style={{ width: 600, height: 24, backgroundColor: `${COLORS.bgLight}40`, borderRadius: 12 }}>
  <div style={{
    width: `${easedProgress * 100}%`, height: "100%",
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.danger})`,
    borderRadius: 12,
    boxShadow: `0 0 20px ${COLORS.accent}40`,
  }} />
</div>
```

### Multiple counters variant
```tsx
const STATS = [
  { number: 73, unit: "%", label: "Feel overwhelmed" },
  { number: 4.2, unit: "hrs", label: "Lost daily" },
  { number: 12, unit: "tools", label: "Average stack" },
];
// Render each with staggered delays
```

## Customization

- Change target number, unit, and label
- Use progress ring or horizontal bar or multiple counters
- Adjust counting speed via interpolation range
- Add shake/zoom pulse when number reaches target
