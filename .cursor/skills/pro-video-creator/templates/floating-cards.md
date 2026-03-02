# Floating Cards Template

**Best for:** Features/benefits — showcasing multiple items with spring physics

## Concept

Cards float in from different directions with spring animations, each at a slight angle/offset. Cards can have icons, titles, descriptions, and subtle hover-like effects (glow, border). Creates a dynamic, non-grid layout.

## Key Elements

1. **4-6 cards** — spring-animate from different directions
2. **Slight rotation** per card — creates organic feel
3. **Glow on entry** — box-shadow pulses when card appears
4. **Icon + title + description** per card
5. **Background particles** or ambient glow
6. **Staggered timing** — cards don't all appear at once

## Code Pattern

```tsx
const CARDS = [
  { icon: "🚀", title: "Fast Setup", desc: "Start in under 2 minutes", fromX: -400, fromY: -200, rotation: -3, delay: 20 },
  { icon: "🔒", title: "Secure", desc: "End-to-end encrypted", fromX: 400, fromY: -100, rotation: 2, delay: 35 },
  { icon: "📊", title: "Analytics", desc: "Real-time insights", fromX: -300, fromY: 200, rotation: -2, delay: 50 },
  { icon: "🌐", title: "Global", desc: "Works everywhere", fromX: 350, fromY: 150, rotation: 3, delay: 65 },
  { icon: "⚡", title: "Lightning Fast", desc: "Sub-50ms response", fromX: 0, fromY: -300, rotation: 0, delay: 80 },
];

const CARD_POSITIONS = [
  { x: 300, y: 250 },
  { x: 900, y: 200 },
  { x: 1500, y: 280 },
  { x: 500, y: 600 },
  { x: 1200, y: 620 },
];

// Render cards
{CARDS.map((card, i) => {
  const pos = CARD_POSITIONS[i];
  const prog = spring({ frame: frame - card.delay, fps, config: { damping: 12, stiffness: 60 } });

  const currentX = interpolate(prog, [0, 1], [card.fromX, 0]);
  const currentY = interpolate(prog, [0, 1], [card.fromY, 0]);
  const currentRotation = interpolate(prog, [0, 1], [card.rotation * 3, card.rotation]);
  const glowPulse = prog > 0.8 ? interpolate(Math.sin((frame - card.delay) * 0.08), [-1, 1], [0.3, 0.8]) : 0;

  return (
    <div key={i} style={{
      position: "absolute",
      left: pos.x, top: pos.y,
      transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`,
      opacity: prog,
    }}>
      <div style={{
        width: 280, padding: "28px 24px",
        background: `linear-gradient(145deg, ${COLORS.bgMid}ee, ${COLORS.bgLight}88)`,
        borderRadius: 20,
        border: `1px solid ${COLORS.accent}30`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 ${20 * glowPulse}px ${COLORS.accent}30`,
        backdropFilter: "blur(10px)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent}40)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
        }}>
          {card.icon}
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 700, color: COLORS.white }}>
          {card.title}
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.4 }}>
          {card.desc}
        </div>
      </div>
    </div>
  );
})}
```

## Variants

### Grid variant
Place cards in a 2×3 or 3×2 grid with staggered spring entrances.

### Stack variant
Cards stack on top of each other, each sliding slightly to reveal the one below.

## Customization

- Adjust card positions for different arrangements
- Replace icons with custom SVGs
- Change card sizes for emphasis (hero card larger)
- Add subtle float animation after landing (`Math.sin(frame * 0.05) * 3`)
