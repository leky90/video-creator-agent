# Code Terminal Template

**Best for:** Tech demo scenes — showing code, commands, or terminal output

## Concept

A terminal/code editor window with typing animation, syntax highlighting, and output. Creates a tech-authentic feel. The terminal can show commands being typed and results appearing.

## Key Elements

1. **Terminal window frame** — dark background with title bar + traffic lights
2. **Typing animation** — code appears character by character
3. **Syntax highlighting** — different colors for keywords, strings, comments
4. **Output area** — results appear after command "completes"
5. **Blinking cursor** — at the typing position
6. **Optional glow** — green/blue glow around terminal

## Code Pattern

```tsx
const LINES = [
  { text: "$ npm install ai-toolkit", type: "command", delay: 0 },
  { text: "✓ Installed 3 packages", type: "success", delay: 60 },
  { text: "", type: "empty", delay: 70 },
  { text: "$ ai-toolkit init --project my-app", type: "command", delay: 80 },
  { text: "→ Analyzing codebase...", type: "info", delay: 140 },
  { text: "→ Generating config...", type: "info", delay: 160 },
  { text: "✓ Ready! Run 'ai-toolkit start'", type: "success", delay: 190 },
];

const CHAR_SPEED = 2; // frames per character

const TerminalWindow: React.FC = () => {
  return (
    <div style={{
      width: 900, borderRadius: 16, overflow: "hidden",
      boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${COLORS.accent}15`,
      border: `1px solid ${COLORS.bgLight}60`,
    }}>
      {/* Title bar */}
      <div style={{
        height: 44, backgroundColor: COLORS.bgLight,
        display: "flex", alignItems: "center", paddingLeft: 16, gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        <span style={{ fontFamily: "monospace", fontSize: 13, color: COLORS.textSecondary, marginLeft: 12 }}>
          Terminal
        </span>
      </div>

      {/* Terminal body */}
      <div style={{
        backgroundColor: "#0d1117", padding: "20px 24px", minHeight: 300,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 16, lineHeight: 1.7,
      }}>
        {LINES.map((line, i) => {
          if (frame < line.delay) return null;

          const lineFrame = frame - line.delay;
          let displayText = line.text;
          let color = COLORS.textSecondary;

          if (line.type === "command") {
            const visibleChars = Math.min(line.text.length, Math.floor(lineFrame / CHAR_SPEED));
            displayText = line.text.substring(0, visibleChars);
            color = "#e6edf3";
          } else if (line.type === "success") {
            color = COLORS.success;
          } else if (line.type === "info") {
            color = COLORS.accentLight;
          }

          const lineOpacity = line.type !== "command"
            ? interpolate(lineFrame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            : 1;

          return (
            <div key={i} style={{ color, opacity: lineOpacity, whiteSpace: "pre" }}>
              {displayText}
              {line.type === "command" && lineFrame < line.text.length * CHAR_SPEED && (
                <span style={{ opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0 }}>▎</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

## Code Editor Variant

```tsx
// For showing code with syntax highlighting
const CODE_LINES = [
  { text: "import { AI } from ", color: COLORS.accentLight },
  { text: "'ai-toolkit'", color: COLORS.success },
  { text: ";", color: COLORS.textSecondary },
  // ...
];
```

## Customization

- Replace terminal commands with relevant examples
- Add syntax highlighting colors per token type
- Adjust typing speed
- Use code editor variant for source code demos
- Add animated output (charts, tables) below command output
