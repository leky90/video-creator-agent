# Visual Variety Rules

These rules MUST be enforced when creating any video. The goal is to ensure every scene feels distinct and professionally crafted.

## Rule 1: Scene Layout Diversity Matrix

Before coding scenes, create a layout plan. Map each scene to a different layout archetype:

| Layout Archetype | Description | Example |
|---|---|---|
| Center-focus | Single prominent element centered, items orbit/surround | Solution with AI chip |
| Left-right split | Two contrasting halves | Before vs After |
| Multi-column | 2-4 equal columns | Feature comparison |
| Full-bleed visual | Large SVG/graphic fills the canvas | Hero moment |
| Timeline/flow | Horizontal or vertical sequential flow | Process steps |
| Scattered/organic | Items placed at irregular positions | Floating cards |
| Data dashboard | Charts, counters, metrics | Stats/impact |
| Terminal/code | Dark code editor aesthetic | Tech demo |

**Rule: No two adjacent scenes can use the same archetype.**

## Rule 2: Background Diversity

Each scene must have a visually different background. Rotate through:

1. `linear-gradient(160deg, dark, mid)` — standard
2. `linear-gradient(160deg, dark, #0c1e3d)` — deep blue
3. `linear-gradient(160deg, #1a0a0a, dark)` — dark red tint
4. `linear-gradient(160deg, dark, #0a1a0a)` — dark green tint
5. `radial-gradient(circle at 30% 40%, accent15, dark)` — spotlight

**Rule: Change at least the gradient angle OR one stop color between every scene.**

## Rule 3: Animation Technique Diversity

Track which animation techniques are used per scene. Ensure variety:

| Technique | Use In Max |
|---|---|
| Spring entrance (slide up) | 2 scenes |
| Spring entrance (scale) | 2 scenes |
| Orbit/rotation | 1 scene |
| Typing effect | 1 scene |
| Counter/number | 1 scene |
| Progress fill (bar/ring) | 1 scene |
| Shake/vibrate | 1 scene |
| Fragmentation/split | 1 scene |
| Stagger reveal | 2 scenes |
| Float/drift | 2 scenes |

**Rule: If a technique is already used in 2 scenes, pick a different one.**

## Rule 4: SVG Illustration Uniqueness

Every scene needs at least one custom SVG. These SVGs must be:

1. **Topic-relevant** — not generic shapes
2. **Animated** — at least one property changes with frame
3. **Multi-layered** — use gradients, multiple paths, not just one shape
4. **Unique per scene** — no two scenes share the same SVG

Examples of good SVGs:
- Person figure with shaking head (ProblemScene)
- Brain splitting apart (AgitateScene)
- AI chip with circuit lines (SolutionScene)
- Custom icons: pencil, calendar, gear (HowItWorksScene)

## Rule 5: Color Accent Rotation

While maintaining a consistent palette, vary the **dominant accent** per scene:

- Scene 1: `danger` (red) — for urgency/problem
- Scene 2: `danger` + `secondary` (red + orange) — escalation
- Scene 3: `accent` (blue) — solution/tech
- Scene 4: Rotate `accent`, `success`, `secondary` per column
- Scene 5: `accent` + `success` — positive ending

## Rule 6: Content Density Variation

Alternate between:
- **Dense scenes** (many elements: multi-column, notification swarm)
- **Sparse scenes** (1-2 focal elements: counter reveal, orbital hub)

This creates visual rhythm and prevents fatigue.

## Rule 7: Text Treatment Diversity

Vary how text is presented:
1. **Gradient text** (`WebkitBackgroundClip`) — for headlines
2. **Monospace** — for code/data
3. **Large bold** — for impact numbers
4. **Small secondary** — for labels/context
5. **Animated reveal** — for dramatic moments

## Pre-Production Checklist

Before writing any scene code, fill out this checklist:

```
Scene Plan:
| # | Scene | Template | Layout | Background | Main SVG | Primary Animation | Accent Color |
|---|-------|----------|--------|------------|----------|-------------------|--------------|
| 1 | Hook  | Counter  | Center | gradient-1 | Ring SVG | Counter + ring    | danger       |
| 2 | Problem | Swarm | Center-scatter | gradient-2 | Person | Spring badges | danger |
| 3 | Agitate | Fragment | Left-right | gradient-3+red | Brain | Fragmentation | danger+secondary |
| 4 | Solution | Orbital | Center-orbit | gradient-4 | Chip | Orbit + spring | accent |
| 5 | HowItWorks | MultiCol | Multi-column | gradient-5 | Icons | Stagger + micro | mixed |
| 6 | CTA | Particle | Center-focus | deep-dark | Button | Particles + spring | accent+success |
```

Verify:
- [ ] No adjacent scenes share template
- [ ] No adjacent scenes share background
- [ ] Animation techniques are distributed
- [ ] Each scene has unique SVG
- [ ] Accent colors rotate
