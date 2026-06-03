# DESIGN.md — ghiberti85/ui Visual System

> Auto-generated documentation of the design token system.  
> Source of truth: `packages/tokens/src/*/`

---

## Architecture

The design system uses a **semantic bridge pattern**: components consume unprefixed CSS custom properties (`--color-semantic-primary`, `--border-radius-md`, etc.), and each theme maps those to its own prefixed values. Switching themes is a single `data-theme` attribute change on `<html>`.

```
[data-theme="ds-clean"]    → --color-semantic-primary = #a3e635
[data-theme="ds-onyx"]     → --color-semantic-primary = #22d3ee
[data-theme="ds-velvet"]   → --color-semantic-primary = #14b8a6
```

Dark mode adds `data-mode="dark"` alongside `data-theme`.

---

## Themes

| ID | Name | Style | Mode | Primary use |
|---|---|---|---|---|
| `ds-clean` | Clean | Technical authority | Light + Dark | Dev study platform *(default)* |
| `ds-velvet` | Velvet | Warm, approachable | Light + Dark | Finance PWA, daily use |
| `ds-brutalist` | Brutalist | High-contrast, bold | Light + Dark | Statements, portfolios |
| `ds-editorial` | Editorial | Warm, typographic | Light + Dark | Content-heavy sites |
| `ds-onyx` | Onyx | Dark-first, clinical | Dark-first | Productivity tool, dense UI |

---

## Semantic Tokens (consumed by all components)

### Color

| Token | Description |
|---|---|
| `--color-semantic-background` | Page/surface background |
| `--color-semantic-background-subtle` | Subtle surface, cards, sidebars |
| `--color-semantic-foreground` | Primary text |
| `--color-semantic-foreground-muted` | Secondary/hint text |
| `--color-semantic-border` | Dividers, input borders |
| `--color-semantic-primary` | Brand accent, interactive |
| `--color-semantic-primary-hover` | Hover state of primary |
| `--color-semantic-primary-foreground` | Text on primary bg |

### State Colors

| Token | Light | Dark |
|---|---|---|
| `--color-state-success` | Green | Bright green |
| `--color-state-warning` | Amber | Yellow |
| `--color-state-error` | Red | Soft red |
| `--color-state-info` | Blue | Cyan/blue |

Each state also has `-subtle` (background) and `-foreground` (text on state bg) variants.

### Typography

| Token | Description |
|---|---|
| `--font-family-sans` | UI font |
| `--typography-font-family-mono` | Code/data font |
| `--typography-font-size-{xs,sm,md,lg,xl,2xl,3xl,4xl}` | Size scale |
| `--typography-font-weight-{regular,medium,semibold,bold}` | Weight scale |
| `--typography-line-height-{tight,normal,relaxed}` | Line height scale |

### Spacing

4px base unit. Scale: `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`.  
Token: `--spacing-{0,1,2,3,4,5,6,8,10,12,16,20,24}`

### Border Radius

| Token | ds-clean | ds-velvet | ds-brutalist |
|---|---|---|---|
| `--border-radius-sm` | 4px | 6px | 0px |
| `--border-radius-md` | 6px | 10px | 0px |
| `--border-radius-lg` | 8px | 14px | 0px |
| `--border-radius-full` | 9999px | 9999px | 9999px |

### Motion

| Token | Description |
|---|---|
| `--transition-fast` | Micro-interactions (80–120ms) |
| `--transition-base` | Standard transitions (150–220ms) |
| `--transition-slow` | Page-level transitions (250–380ms) |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` — standard |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot |

---

## Theme Details

### ds-editorial
- **Palette:** Warm grays + terracotta primary (#B45309), gold highlight
- **Typography:** Playfair Display (headings), DM Sans (body)
- **Radius:** Moderate (4–8px)
- **Shadow:** Warm-tinted
- **Personality:** Refined, print-inspired

### ds-brutalist
- **Palette:** Pure black + electric yellow (#FFE600) + red accent
- **Typography:** Bebas Neue (display), JetBrains Mono (body)
- **Radius:** Zero — no rounding
- **Shadow:** None or harsh
- **Personality:** Confrontational, high-contrast

### ds-onyx — Onyx
- **Palette:** Slate-950 base + cyan-400 accent (#22d3ee). Dark-first.
- **Typography:** Inter (UI, data-dense), JetBrains Mono (everywhere code appears)
- **Radius:** Sharp (3–6px) — clinical, structured
- **Shadow:** Dark with subtle cyan glow on md/lg
- **Motion:** Fast (80–150ms) — snappy, no animation fat
- **Personality:** Focus mode. No decoration, no warmth. Every pixel earns its place.
- **Use case:** Job search dashboard, interview tracker, application pipeline

### ds-clean — Clean
- **Palette:** Deep navy (#0a0f1e) + lime-400 accent (#a3e635). Dark-first, light variant available.
- **Typography:** Inter (UI), JetBrains Mono (code samples, Q&A)
- **Radius:** Standard (4–8px)
- **Shadow:** Dark with subtle lime glow
- **Motion:** Balanced (100–300ms)
- **Personality:** Technical authority. Calm confidence. Clear Q&A hierarchy.
- **Use case:** Study platform, Groq AI features, interview practice

### ds-velvet — Velvet
- **Palette:** Warm stone (#1c1917 dark / #ffffff light) + teal-500 accent (#14b8a6)
- **Typography:** DM Sans / Nunito (humanist, warm) — approachable, not corporate
- **Radius:** Rounded (6–14px) — friendly without being bubbly
- **Shadow:** Soft, low-contrast
- **Motion:** Gentle (120–380ms) — unhurried, trustworthy
- **Personality:** Warm, trustworthy, approachable. Like talking to a knowledgeable friend.
- **Use case:** Couples finance PWA, daily money tracking, mobile-first

---

## Token File Structure

```
packages/tokens/src/
├── ds-{name}/
│   ├── color.json          W3C DTCG — base palette + semantic aliases
│   ├── typography.json     Font family, size, weight, line-height
│   ├── border-radius.json  Radius scale
│   ├── shadow.json         Box shadow scale
│   ├── spacing.json        4px-base spacing scale
│   ├── states.json         Success/warning/error/info colors
│   └── motion.json         Transition durations + easing curves
```

Build output: `dist/{ds}/variables.css` + `dist/{ds}/tokens.js`

---

## Usage

```tsx
// 1. Import a theme CSS
import '@ghiberti85/tokens/ds-onyx'

// 2. Apply theme attribute
<html data-theme="ds-onyx">
  {/* Optional dark mode */}
  <html data-theme="ds-onyx" data-mode="dark">

// 3. Components consume semantic tokens automatically
<Button variant="primary">Focused</Button>
```

---

## Anti-patterns (what this system avoids)

- No gradient text (webkit-background-clip tricks)
- No hardcoded colors in components — CSS vars only
- No generic shadcn/Tailwind defaults copied verbatim
- No `backdrop-filter: blur` decorative effects
- No rounded-everything (`border-radius: 9999px` on everything)
- No `box-shadow` stacks with 5+ values for decoration
- No `color-mix` in component styles — mix belongs in tokens only
