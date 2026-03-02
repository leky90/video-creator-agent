# Orbital Hub Template

**Best for:** Solution scenes — a central element surrounded by orbiting feature nodes

## Concept

A glowing central element (AI chip, logo, product) with feature nodes orbiting around it. Connection lines link nodes to center. Nodes spring-animate in with staggered timing and slowly rotate.

## Key Elements

1. **Central SVG** — chip, logo, core concept (with pulsing glow)
2. **4-6 orbiting nodes** — spring in + slow rotation
3. **Connection lines** — dashed SVG lines from center to nodes
4. **Ambient glow** — radial gradient behind center
5. **Bottom tagline** — appears late with accent-colored keyword

## Code Pattern

```tsx
const NODE_ITEMS = [
  { icon: "✉", label: "Email", angle: 0 },
  { icon: "📅", label: "Schedule", angle: 90 },
  { icon: "🎙", label: "Notes", angle: 180 },
  { icon: "⚡", label: "Automate", angle: 270 },
];

const orbitRadius = 220;
const glow = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.5, 1]);

// Central chip with spring scale
const chipScale = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 60 } });

// Orbiting nodes
{NODE_ITEMS.map((node, i) => {
  const nodeAppear = spring({
    frame: frame - 60 - i * 30, fps,
    config: { damping: 14, stiffness: 80 },
  });
  const angleRad = ((node.angle + frame * 0.3) * Math.PI) / 180;
  const x = Math.cos(angleRad) * orbitRadius * nodeAppear;
  const y = Math.sin(angleRad) * orbitRadius * 0.6 * nodeAppear;

  return (
    <React.Fragment key={i}>
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <line x1="50%" y1="40%" x2={960 + x} y2={432 + y}
              stroke={COLORS.accentLight} strokeWidth={2}
              opacity={interpolate(nodeAppear, [0.5, 1], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              strokeDasharray="8,4" />
      </svg>
      <div style={{
        position: "absolute",
        top: `calc(40% + ${y}px)`, left: `calc(50% + ${x}px)`,
        transform: `translate(-50%, -50%) scale(${nodeAppear})`,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: `linear-gradient(135deg, ${COLORS.bgMid}, ${COLORS.bgLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32,
          boxShadow: `0 4px 20px ${COLORS.accent}30`,
          border: `2px solid ${COLORS.accent}40`,
        }}>{node.icon}</div>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 16, color: COLORS.textSecondary }}>{node.label}</span>
      </div>
    </React.Fragment>
  );
})}
```

## SVG: AI Chip

```tsx
const AIChipSVG: React.FC<{ glow: number }> = ({ glow }) => (
  <svg width={160} height={160} viewBox="0 0 160 160">
    <defs>
      <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.8 * glow} />
        <stop offset="100%" stopColor={COLORS.accentLight} stopOpacity={0.1 * glow} />
      </radialGradient>
      <linearGradient id="chipBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={COLORS.accent} />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <circle cx={80} cy={80} r={75} fill="url(#chipGlow)" />
    <rect x={30} y={30} width={100} height={100} rx={20} fill="url(#chipBody)" />
    {[40, 60, 80, 100, 120].map((pos) => (
      <React.Fragment key={pos}>
        <line x1={pos} y1={30} x2={pos} y2={10} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.6} />
        <line x1={pos} y1={130} x2={pos} y2={150} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.6} />
        <line x1={30} y1={pos} x2={10} y2={pos} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.6} />
        <line x1={130} y1={pos} x2={150} y2={pos} stroke={COLORS.accentLight} strokeWidth={2} opacity={0.6} />
      </React.Fragment>
    ))}
    <text x={80} y={90} textAnchor="middle" fontFamily="Inter" fontSize={36} fontWeight={700} fill={COLORS.white}>AI</text>
  </svg>
);
```

## Customization

- Replace AI chip with topic-relevant central SVG
- Replace orbiting node items to match features/capabilities
- Adjust orbit radius and rotation speed
- Add or remove connection lines for visual density
