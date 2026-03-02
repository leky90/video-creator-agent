# Notification Swarm Template

**Best for:** Problem/pain point scenes — overwhelming the viewer with visual noise

## Concept

A central figure (person SVG) is surrounded by notification badges that spring-animate in from different positions. Each badge has a pulsing glow. Optional: the central figure shakes progressively.

## Key Elements

1. **Central SVG figure** — person, computer, phone, or relevant object
2. **6-8 notification badges** — spring in with staggered delays
3. **Pulsing glow** on each badge (`Math.sin(frame * 0.15) * 0.5 + 0.5`)
4. **Shake effect** on central figure (`Math.sin(frame * 0.8) * amplitude`)
5. **Background particles** — slow-drifting dots
6. **Optional clock/timer SVG** — spinning hands showing time pressure

## Code Pattern

```tsx
const NOTIF_ITEMS = [
  { icon: "✉", label: "47 emails", x: -320, y: -180, delay: 0 },
  { icon: "📅", label: "5 meetings", x: 300, y: -140, delay: 5 },
  { icon: "📄", label: "12 docs", x: -280, y: 120, delay: 10 },
  { icon: "💬", label: "83 messages", x: 340, y: 160, delay: 15 },
  { icon: "📋", label: "9 follow-ups", x: -100, y: -260, delay: 20 },
  { icon: "🔔", label: "Overdue!", x: 140, y: 240, delay: 25 },
];

// Central figure with shake
const shake = frame > 90
  ? Math.sin(frame * 0.8) * interpolate(frame, [90, 200], [0, 4], { extrapolateRight: "clamp" })
  : 0;

// Each badge
const NotifBadge: React.FC<{ icon: string; label: string; progress: number; pulse: number }> = 
  ({ icon, label, progress, pulse }) => {
    const scale = interpolate(progress, [0, 1], [0.3, 1]);
    const opacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
    const glowOpacity = interpolate(pulse, [0, 1], [0.3, 0.8]);

    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: `linear-gradient(135deg, ${COLORS.danger}dd, ${COLORS.danger}99)`,
        borderRadius: 16, padding: "10px 18px",
        transform: `scale(${scale})`, opacity,
        boxShadow: `0 0 ${20 * glowOpacity}px ${COLORS.danger}80`,
      }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 18, color: COLORS.white, fontWeight: 600 }}>{label}</span>
      </div>
    );
  };

// In scene render:
{NOTIF_ITEMS.map((item, i) => {
  const prog = spring({ frame: frame - item.delay - 15, fps, config: { damping: 12, stiffness: 80 } });
  const pulse = Math.sin((frame - item.delay) * 0.15) * 0.5 + 0.5;
  return (
    <div key={i} style={{
      position: "absolute",
      top: `calc(50% + ${item.y}px)`,
      left: `calc(50% + ${item.x}px)`,
      transform: "translate(-50%, -50%)",
    }}>
      <NotifBadge icon={item.icon} label={item.label} progress={prog} pulse={pulse} />
    </div>
  );
})}
```

## SVG: Custom Person Figure

```tsx
const PersonSVG: React.FC<{ shake: number }> = ({ shake }) => (
  <svg width={200} height={240} viewBox="0 0 200 240"
    style={{ transform: `translateX(${shake}px)` }}>
    <circle cx={100} cy={50} r={35} fill={COLORS.textSecondary} />
    <rect x={55} y={90} width={90} height={110} rx={20} fill={COLORS.textSecondary} />
    <rect x={75} y={200} width={20} height={40} rx={6} fill={COLORS.bgLight} />
    <rect x={105} y={200} width={20} height={40} rx={6} fill={COLORS.bgLight} />
    <rect x={40} y={160} width={120} height={12} rx={4} fill={COLORS.bgMid} />
  </svg>
);
```

## SVG: Clock with Spinning Hands

```tsx
const clockRotation = interpolate(frame, [0, duration], [0, 720]);

<svg width={80} height={80} viewBox="0 0 80 80">
  <circle cx={40} cy={40} r={35} fill="none" stroke={COLORS.textSecondary} strokeWidth={3} />
  <line x1={40} y1={40} x2={40} y2={15} stroke={COLORS.danger} strokeWidth={3}
    strokeLinecap="round" transform={`rotate(${clockRotation}, 40, 40)`} />
  <line x1={40} y1={40} x2={55} y2={40} stroke={COLORS.textSecondary} strokeWidth={2}
    strokeLinecap="round" transform={`rotate(${clockRotation * 0.08}, 40, 40)`} />
  <circle cx={40} cy={40} r={4} fill={COLORS.danger} />
</svg>
```

## Customization

- Replace notification items with topic-specific pain points
- Replace PersonSVG with topic-relevant illustration (developer at desk, student, manager, etc.)
- Adjust badge colors: danger for urgent, secondary for warning, accent for neutral
