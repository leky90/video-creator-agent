# Timeline Flow Template

**Best for:** Process/step scenes — sequential steps along a horizontal or vertical timeline

## Concept

A horizontal timeline with numbered nodes. Each node activates sequentially as narration progresses. Connection lines animate between nodes. Each activated node reveals its content with a spring animation.

## Key Elements

1. **Timeline line** — horizontal or vertical with animated progress
2. **3-5 step nodes** — circles/squares that activate sequentially
3. **Connection segments** — line segments that "draw" between nodes
4. **Content cards** — spring-reveal below each node when activated
5. **SVG icons** per step — custom per topic
6. **Active indicator** — glow/pulse on current step

## Code Pattern

```tsx
const STEPS = [
  { icon: "📝", title: "Research", desc: "Gather sources", activateFrame: 30, color: COLORS.accent },
  { icon: "✏️", title: "Script", desc: "Write narration", activateFrame: 120, color: COLORS.success },
  { icon: "🎨", title: "Design", desc: "Create visuals", activateFrame: 210, color: COLORS.secondary },
  { icon: "🎬", title: "Animate", desc: "Build scenes", activateFrame: 300, color: COLORS.accentLight },
  { icon: "📤", title: "Export", desc: "Final render", activateFrame: 390, color: COLORS.danger },
];

const TIMELINE_Y = 400;
const START_X = 200;
const STEP_GAP = 380;

// Timeline progress line
const lineProgress = interpolate(frame, [20, 420], [0, 1], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

<svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
  {/* Background line */}
  <line x1={START_X} y1={TIMELINE_Y} x2={START_X + STEP_GAP * (STEPS.length - 1)} y2={TIMELINE_Y}
        stroke={`${COLORS.bgLight}60`} strokeWidth={4} />
  {/* Progress line */}
  <line x1={START_X} y1={TIMELINE_Y}
        x2={START_X + lineProgress * STEP_GAP * (STEPS.length - 1)} y2={TIMELINE_Y}
        stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" />
</svg>

// Step nodes
{STEPS.map((step, i) => {
  const isActive = frame >= step.activateFrame;
  const nodeScale = spring({
    frame: frame - step.activateFrame, fps,
    config: { damping: 12, stiffness: 100 },
  });
  const cardSlide = spring({
    frame: frame - step.activateFrame - 10, fps,
    config: { damping: 14, stiffness: 80 },
  });
  const x = START_X + i * STEP_GAP;
  const pulse = isActive ? interpolate(Math.sin((frame - step.activateFrame) * 0.1), [-1, 1], [0.6, 1]) : 0;

  return (
    <div key={i} style={{ position: "absolute", left: x, top: TIMELINE_Y, transform: "translate(-50%, -50%)" }}>
      {/* Node circle */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: isActive
          ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
          : COLORS.bgLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28,
        transform: `scale(${isActive ? nodeScale : 0.8})`,
        boxShadow: isActive ? `0 0 ${20 * pulse}px ${step.color}50` : "none",
        border: `3px solid ${isActive ? step.color : COLORS.bgLight}`,
      }}>
        {step.icon}
      </div>

      {/* Content card below */}
      <div style={{
        marginTop: 24, width: 200, textAlign: "center",
        opacity: cardSlide,
        transform: `translateY(${(1 - cardSlide) * 30}px)`,
      }}>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 700, color: isActive ? step.color : COLORS.textSecondary }}>
          {step.title}
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 14, color: COLORS.textSecondary, marginTop: 4 }}>
          {step.desc}
        </div>
      </div>
    </div>
  );
})}
```

## Vertical Variant

Flip the axis: nodes go top-to-bottom, content cards appear to the right. Use for more content per step.

## Customization

- Adjust number of steps and their activation frames
- Replace icons with custom SVGs for each step
- Change to vertical layout for longer processes
- Add animated arrows between nodes
