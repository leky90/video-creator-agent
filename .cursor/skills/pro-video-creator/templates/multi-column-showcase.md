# Multi-Column Showcase Template

**Best for:** How-it-works scenes — showing 2-4 categories/features side by side

## Concept

Columns that slide up with spring stagger, each containing an icon, title, description, and a unique micro-animation that activates when the narration reaches that column. A number badge shows the order.

## Key Elements

1. **Title** at top — with accent-colored keyword
2. **2-4 columns** — spring slide-up with stagger
3. **Number badges** — circles showing order (1, 2, 3)
4. **Custom SVG icons** per column — not emoji
5. **Micro-demo area** per column — unique animation per category:
   - Typing effect (email/writing)
   - Time blocks (scheduling)
   - Flow arrows (automation/pipeline)
   - Data chart (analytics)
6. **Active state** — border/glow changes when narration reaches that column
7. **Stat badge** at bottom — appears late with a key metric

## Code Pattern

```tsx
interface ColumnData {
  icon: React.ReactNode;
  title: string;
  desc: string;
  activateStart: number;
  color: string;
}

const COLUMNS: ColumnData[] = [
  { icon: <PencilIcon />, title: "AI Writers", desc: "Draft in seconds", activateStart: 60, color: COLORS.accent },
  { icon: <CalendarIcon />, title: "Schedulers", desc: "Protect focus", activateStart: 200, color: COLORS.success },
  { icon: <GearIcon />, title: "Automation", desc: "Connect apps", activateStart: 350, color: COLORS.secondary },
];

// Columns with stagger
{COLUMNS.map((col, i) => {
  const slideUp = spring({ frame: frame - 15 - i * 12, fps, config: { damping: 14, stiffness: 80 } });
  const isActive = frame >= col.activateStart;
  const activeProg = interpolate(frame, [col.activateStart, col.activateStart + 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div key={i} style={{
      width: 340,
      transform: `translateY(${(1 - slideUp) * 80}px)`,
      opacity: slideUp,
    }}>
      <div style={{
        backgroundColor: `${COLORS.bgMid}cc`, borderRadius: 20,
        padding: "32px 24px",
        border: `2px solid ${isActive ? col.color : COLORS.bgLight + "80"}`,
        boxShadow: isActive ? `0 0 30px ${col.color}20` : "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        minHeight: 380,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          backgroundColor: isActive ? col.color : COLORS.bgLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FONT_FAMILY, fontSize: 18, fontWeight: 700, color: COLORS.white,
        }}>{i + 1}</div>
        {col.icon}
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 700, color: isActive ? col.color : COLORS.textPrimary }}>
          {col.title}
        </span>
        {/* Micro-demo area */}
        <div style={{ width: "100%", minHeight: 60, backgroundColor: `${COLORS.bgDark}80`, borderRadius: 10, overflow: "hidden" }}>
          {i === 0 && <TypingEffect progress={activeProg} />}
          {i === 1 && <TimeBlocks progress={activeProg} />}
          {i === 2 && <FlowArrows progress={activeProg} />}
        </div>
      </div>
    </div>
  );
})}
```

## Micro-Demo: Typing Effect

```tsx
const TypingEffect: React.FC<{ progress: number }> = ({ progress }) => {
  const lines = ["Subject: Q3 Report", "Hi team, here's the...", "Revenue grew 32%..."];
  const totalChars = lines.join("").length;
  const shown = Math.floor(progress * totalChars);
  let charCount = 0;
  return (
    <div style={{ padding: "8px 12px", textAlign: "left" }}>
      {lines.map((line, i) => {
        const lineStart = charCount;
        charCount += line.length;
        const visibleChars = Math.max(0, Math.min(line.length, shown - lineStart));
        if (visibleChars === 0) return null;
        return (
          <div key={i} style={{ fontFamily: "monospace", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>
            {line.substring(0, visibleChars)}
          </div>
        );
      })}
    </div>
  );
};
```

## Micro-Demo: Time Blocks

```tsx
const TimeBlocks: React.FC<{ progress: number }> = ({ progress }) => {
  const blocks = [
    { label: "Focus", w: 60, color: COLORS.success },
    { label: "Meeting", w: 30, color: COLORS.textSecondary },
    { label: "Focus", w: 70, color: COLORS.success },
    { label: "Break", w: 20, color: COLORS.accentLight },
  ];
  return (
    <div style={{ display: "flex", gap: 3, padding: "8px 12px" }}>
      {blocks.map((b, i) => {
        const blockProgress = interpolate(progress, [i * 0.25, (i + 1) * 0.25], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{
            width: b.w * blockProgress, height: 28,
            backgroundColor: b.color, borderRadius: 4, opacity: 0.7,
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          }}>
            {blockProgress > 0.5 && (
              <span style={{ fontFamily: FONT_FAMILY, fontSize: 10, color: COLORS.white }}>{b.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

## Micro-Demo: Flow Arrows

```tsx
const FlowArrows: React.FC<{ progress: number }> = ({ progress }) => {
  const apps = ["📧", "📊", "📁", "✅"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 8px" }}>
      {apps.map((app, i) => {
        const appProg = interpolate(progress, [i * 0.25, (i + 1) * 0.25], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <React.Fragment key={i}>
            <div style={{ fontSize: 20, opacity: appProg, transform: `scale(${appProg})` }}>{app}</div>
            {i < apps.length - 1 && (
              <span style={{ color: COLORS.secondary, fontSize: 14, opacity: appProg > 0.8 ? 1 : 0 }}>→</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
```

## Custom SVG Icons

Each column should have a distinct SVG icon (see examples in orbital-hub.md for SVG patterns). Use `PencilIcon`, `CalendarIcon`, `GearIcon` etc. with topic-relevant designs.
