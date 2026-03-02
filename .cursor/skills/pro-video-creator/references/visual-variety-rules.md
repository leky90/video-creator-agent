# Visual Variety Rules

These rules MUST be enforced when creating any video. The goal is to ensure every scene feels distinct and professionally crafted.

## Rule 1: Scene Layout Diversity Matrix

Before coding scenes, create a layout plan. Map each scene to a different layout archetype:

| Layout Archetype | Description | Focal Point Example |
|---|---|---|
| Center-focus | Single prominent element centered | LottieAsset("ai-brain") + AnimatedCounter |
| Left-right split | Two contrasting halves | Left: LottieAsset("chart-bar") / Right: Stats with AnimatedCounter |
| Multi-column | 2-4 equal columns | StaggeredMotion cards with Lucide icons |
| Full-bleed visual | Large Lottie fills the canvas | LottieAsset("ai-network") full-width |
| Timeline/flow | Horizontal or vertical sequential flow | evolvePath + ordered items |
| Scattered/organic | Items placed at irregular positions, noise2D floating | Floating cards with noise2D offsets |
| Data dashboard | Charts, counters, metrics | AnimatedCounter + Pie + stat rows |
| Terminal/code | Dark code editor aesthetic | CodeBlock + TypeWriter + MatrixRain |

**Rule: No two adjacent scenes can use the same archetype.**

## Rule 2: Background Diversity

Each scene must have a visually different background. Rotate through these patterns:

| # | Background | Implementation |
|---|-----------|---------------|
| 1 | Radial spotlight | `radial-gradient(ellipse at 50% 50%, ${COLORS.bgMid}, ${COLORS.bgDark} 70%)` |
| 2 | Deep blue angle | `linear-gradient(160deg, ${COLORS.bgDark}, #0c1e3d)` |
| 3 | Dark warm tint | `linear-gradient(160deg, #1a0a0a, ${COLORS.bgDark})` |
| 4 | Dark cool tint | `linear-gradient(180deg, #0a0f1a, ${COLORS.bgDark})` |
| 5 | Accent glow | `radial-gradient(circle at 30% 40%, ${COLORS.accent}15, ${COLORS.bgDark})` |
| 6 | GradientTransition | `<GradientTransition gradient={[grad1, grad2]} />` |

**Rule: Change at least the gradient angle OR one stop color between every scene.**

## Rule 3: Animation Technique Diversity

Track which animation techniques are used per scene. Ensure variety:

| Technique | Library Component | Use In Max |
|---|---|---|
| Word-by-word text reveal | `AnimatedText` (split: "word") | Every scene (title) |
| Stagger reveal (cards) | `StaggeredMotion` | 2 scenes |
| Scale entrance | `Animated` + `Scale` | 2 scenes |
| Slide entrance | `Animated` + `Move` | 2 scenes |
| Counter/number | `AnimatedCounter` | 2 scenes |
| Progress fill (pie/ring) | `Pie` from @remotion/shapes | 1 scene |
| Code typing | `CodeBlock` or `TypeWriter` | 1 scene |
| Path draw | `evolvePath` from @remotion/paths | 1 scene |
| Particle burst | `Particles` (burst mode) | 1 scene |
| Matrix rain bg | `MatrixRain` | 1 scene |

**Rule: If a technique is already used in 2 scenes, pick a different one.**

## Rule 4: Visual Focal Point Uniqueness

Every scene needs a **distinct focal point**. These must be:

1. **Topic-relevant** — matches the narration content
2. **Animated** — entrance animation via `Animated` or `Particles`
3. **Unique per scene** — no two scenes share the same focal type

Types of focal points (rotate through these):

| Focal Type | Implementation | Best For |
|-----------|---------------|---------|
| Lottie animation | `<LottieAsset name="ai-brain" />` | Hook, Solution, CTA |
| Icon composition | StaggeredMotion + 3-5 Lucide icons | Info, Features |
| Data visualization | AnimatedCounter + Pie + stat rows | Data, Stats |
| Code block | CodeBlock + TypeWriter | Tech, Code |
| Icon grid/mosaic | Grid of animated icon badges | Overview, Capabilities |
| Path/flowchart | evolvePath + positioned items | Process, Steps |

**Rule: No two adjacent scenes share the same focal type. Vary LottieAsset names — don't reuse.**

## Rule 5: Color Accent Rotation

While maintaining a consistent palette, vary the **dominant accent** per scene:

| Scene Position | Accent | Use Case |
|---|---|---|
| Scene 1 (Hook) | `accent` (blue) | Neutral, inviting |
| Scene 2 (Info) | `accentLight` (light blue) | Informative |
| Scene 3 (Data) | `success` (green) | Positive metrics |
| Scene 4 (Code) | `success` (green) | Tech/code |
| Scene 5 (More info) | `secondary` (orange) | Energy, warmth |
| Scene 6 (CTA) | `accent` + `success` | Positive action |

Accent shows in: icon backgrounds, counter colors, border highlights, particle colors.

## Rule 6: Content Density Variation

Alternate between:
- **Dense scenes** (many elements: multi-column cards, stat dashboards, icon grids)
- **Sparse scenes** (1-2 focal elements: LottieAsset centered, single counter)

This creates visual rhythm and prevents fatigue.

## Rule 7: Text Treatment Diversity

Vary how text is presented:

| Treatment | Component | When |
|-----------|-----------|------|
| Word-by-word reveal | `AnimatedText` (split: "word") | Headlines |
| Character-by-character | `AnimatedText` (split: "character") | Impact words |
| Typewriter | `TypeWriter` | Code/tech scenes |
| Fade in block | `Animated` + `Fade` | Subtitles, descriptions |
| Counter + suffix | `AnimatedCounter` + static text | Statistics |

## Pre-Production Checklist

Before writing any scene code, fill out this checklist:

```
Scene Plan:
| # | Scene | Template | Layout | Background | Focal Point | Focal Type | Animation Technique | Accent |
|---|-------|----------|--------|------------|-------------|-----------|-------------------|--------|
| 1 | Hook  | Counter  | Center | radial-spotlight | LottieAsset("ai-brain") | Lottie animation | Scale + Counter | accent |
| 2 | Info  | MultiCol | 3-column | deep-blue | StaggeredMotion cards | Icon composition | Stagger reveal | accentLight |
| 3 | Data  | Split    | Left-right | dark-cool | LottieAsset("chart-bar") + Pie | Data viz | Counter + Pie fill | success |
| 4 | Code  | Terminal | Terminal | dark-warm + MatrixRain | CodeBlock + TypeWriter | Code block | Code typing | success |
| 5 | Auto  | Timeline | Horizontal | accent-glow | evolvePath + items | Path/flow | Path draw + stagger | secondary |
| 6 | CTA   | Particle | Center | GradientTransition | LottieAsset("rocket") | Lottie animation | Scale + burst | accent+success |
```

Verify:
- [ ] No adjacent scenes share template
- [ ] No adjacent scenes share layout archetype
- [ ] No adjacent scenes share background
- [ ] No adjacent scenes share focal type
- [ ] Animation techniques are distributed (max 2 each)
- [ ] Accent colors rotate
- [ ] Dense/sparse alternation
