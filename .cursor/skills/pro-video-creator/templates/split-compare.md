# Split Compare Template

**Best for:** Before/After scenes — comparing old vs new, problem vs solution

## Concept

Screen splits vertically (or horizontally) with an animated divider. Left side shows the "before" state (red/dark tones), right side shows "after" state (green/bright tones). The divider slides to reveal the "after" side.

## Key Elements

1. **Split divider** — animated vertical line moving from left to right
2. **Left panel (Before)** — dark/red toned, showing the problem
3. **Right panel (After)** — bright/green toned, showing the solution
4. **Labels** — "Before" and "After" with contrasting colors
5. **Content items** per side — icons + metrics with spring stagger
6. **Divider glow** — bright line on the divider

## Code Pattern

```tsx
const dividerProgress = interpolate(frame, [30, 90], [0.3, 0.55], {
  extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
const dividerX = 1920 * dividerProgress;

const BEFORE_ITEMS = [
  { icon: "⏰", text: "4 hours wasted", metric: "-4h" },
  { icon: "😫", text: "Constant stress", metric: "87%" },
  { icon: "📉", text: "Low output", metric: "32%" },
];

const AFTER_ITEMS = [
  { icon: "⚡", text: "2 hours saved", metric: "+2h" },
  { icon: "😊", text: "Focused work", metric: "95%" },
  { icon: "📈", text: "High output", metric: "89%" },
];

// Background
<AbsoluteFill>
  {/* Before side */}
  <div style={{
    position: "absolute", left: 0, top: 0, width: dividerX, height: "100%",
    background: `linear-gradient(160deg, #1a0a0a, ${COLORS.bgDark})`,
    overflow: "hidden",
  }}>
    <div style={{ padding: "120px 80px" }}>
      <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, fontWeight: 700, color: COLORS.danger, marginBottom: 40 }}>
        Before
      </div>
      {BEFORE_ITEMS.map((item, i) => {
        const itemProg = spring({ frame: frame - 50 - i * 15, fps, config: { damping: 14, stiffness: 80 } });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
            opacity: itemProg, transform: `translateX(${(1 - itemProg) * -40}px)`,
          }}>
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, color: COLORS.textSecondary }}>{item.text}</span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 700, color: COLORS.danger }}>{item.metric}</span>
          </div>
        );
      })}
    </div>
  </div>

  {/* After side */}
  <div style={{
    position: "absolute", left: dividerX, top: 0, width: 1920 - dividerX, height: "100%",
    background: `linear-gradient(160deg, ${COLORS.bgDark}, #0a1a0a)`,
    overflow: "hidden",
  }}>
    <div style={{ padding: "120px 80px" }}>
      <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, fontWeight: 700, color: COLORS.success, marginBottom: 40 }}>
        After
      </div>
      {AFTER_ITEMS.map((item, i) => {
        const itemProg = spring({ frame: frame - 100 - i * 15, fps, config: { damping: 14, stiffness: 80 } });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
            opacity: itemProg, transform: `translateX(${(1 - itemProg) * 40}px)`,
          }}>
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, color: COLORS.textSecondary }}>{item.text}</span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 700, color: COLORS.success }}>{item.metric}</span>
          </div>
        );
      })}
    </div>
  </div>

  {/* Divider line */}
  <div style={{
    position: "absolute", left: dividerX - 2, top: 0, width: 4, height: "100%",
    background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accentLight})`,
    boxShadow: `0 0 20px ${COLORS.accent}60`,
  }} />
</AbsoluteFill>
```

## Customization

- Replace before/after items with topic-relevant comparisons
- Adjust divider animation speed and final position
- Use horizontal split for different compositions
- Add animated icons (spinning gear for "before", checkmark for "after")
