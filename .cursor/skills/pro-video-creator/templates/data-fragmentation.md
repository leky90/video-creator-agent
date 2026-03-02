# Data Fragmentation Template

**Best for:** Agitate scenes — things falling apart, getting worse, fragmentation

## Concept

Visualize deterioration through: a brain/object splitting apart, a growing bar chart showing a problem metric, and a shrinking progress bar showing real output. Optional red overlay that intensifies.

## Key Elements

1. **Fragmenting SVG** — object that splits into pieces over time
2. **Growing bar chart** — metric getting worse (inbox, errors, costs)
3. **Shrinking progress bar** — real output declining
4. **Red warning overlay** — opacity increases over time
5. **Break lines** — dashed lines appearing on the fragmenting object
6. **Counter** — animated number showing the metric

## Code Pattern

```tsx
// Fragmentation progress (0 → 1 over scene)
const fragmentation = interpolate(frame, [60, 200], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// Growing bar
const inboxHeight = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 40 } });
const barH = interpolate(inboxHeight, [0, 1], [40, 320]);

// Shrinking progress
const progressWidth = interpolate(frame, [100, duration], [80, 20], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// Red overlay
const redOverlay = interpolate(frame, [100, duration], [0, 0.15], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// Warning overlay
<AbsoluteFill style={{ backgroundColor: COLORS.danger, opacity: redOverlay }} />
```

## SVG: Fragmenting Brain

```tsx
const BrainSVG: React.FC<{ fragmentation: number }> = ({ fragmentation }) => {
  const offset = fragmentation * 30;
  return (
    <svg width={260} height={260} viewBox="0 0 260 260">
      <defs>
        <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.accent} />
          <stop offset="100%" stopColor={COLORS.accentLight} />
        </linearGradient>
      </defs>
      <g transform={`translate(${-offset}, ${-offset * 0.5}) rotate(${-fragmentation * 8}, 100, 130)`}
         opacity={1 - fragmentation * 0.2}>
        <path d="M130 60 C90 20, 30 40, 40 100 C30 140, 50 180, 90 200 C100 205, 120 200, 130 190 Z"
              fill="url(#brainGrad)" opacity={0.9} />
      </g>
      <g transform={`translate(${offset}, ${-offset * 0.3}) rotate(${fragmentation * 8}, 160, 130)`}
         opacity={1 - fragmentation * 0.2}>
        <path d="M130 60 C170 20, 230 40, 220 100 C230 140, 210 180, 170 200 C160 205, 140 200, 130 190 Z"
              fill="url(#brainGrad)" opacity={0.9} />
      </g>
      {fragmentation > 0.3 && (
        <line x1={130} y1={60} x2={130} y2={200} stroke={COLORS.danger}
              strokeWidth={2} strokeDasharray="6,4" opacity={fragmentation} />
      )}
    </svg>
  );
};
```

## Bar Chart Pattern

```tsx
<div style={{
  width: 120, height: 360,
  backgroundColor: `${COLORS.bgLight}40`,
  borderRadius: 12, position: "relative", overflow: "hidden",
}}>
  <div style={{
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: barH,
    background: `linear-gradient(0deg, ${COLORS.danger}, ${COLORS.secondary})`,
    borderRadius: 12,
  }} />
  <div style={{
    position: "absolute", bottom: barH - 30, left: "50%",
    transform: "translateX(-50%)",
    fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.white,
  }}>
    {Math.round(interpolate(inboxHeight, [0, 1], [12, 247]))}
  </div>
</div>
```

## Customization

- Replace brain with topic-relevant object (server, database, budget pie, etc.)
- Replace bar chart metric with relevant data
- Adjust fragmentation speed and red overlay intensity
