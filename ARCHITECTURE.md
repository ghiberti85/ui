# Architecture

This document describes the technical architecture of the `ghiberti85/ui` monorepo for engineers and AI agents working on the project.

---

## Monorepo Structure

```
ui/
├── packages/
│   ├── tokens/                    # @ghiberti85/tokens — Design token package
│   │   ├── src/
│   │   │   ├── ds-minimal/        # Clean, minimal design system tokens
│   │   │   ├── ds-editorial/      # Elegant, editorial design system tokens
│   │   │   └── ds-brutalist/      # Bold, high-contrast design system tokens
│   │   ├── dist/                  # Built CSS files (git-ignored, generated)
│   │   └── sd.config.mjs          # Style Dictionary v4 build config
│   │
│   └── ui/                        # @ghiberti85/ui — React component library
│       ├── src/
│       │   ├── components/        # 30 components (one folder each)
│       │   ├── utils/             # cn() and other shared utilities
│       │   └── index.ts           # Public API — all exports
│       └── package.json
│
├── apps/
│   ├── docs/                      # Next.js 15 documentation site
│   │   ├── src/app/[locale]/      # App Router with EN/PT-BR i18n
│   │   ├── messages/              # en.json and pt-BR.json translation files
│   │   └── public/                # Static assets, PWA manifest
│   │
│   └── storybook/                 # Storybook 8 component workshop
│       ├── .storybook/            # Config: main.ts, preview.ts
│       └── src/stories/           # *.stories.tsx files
│
├── .github/workflows/             # CI/CD pipelines
├── CLAUDE.md                      # AI agent instructions (non-negotiable rules)
├── ARCHITECTURE.md                # This file
├── CONTRIBUTING.md                # How to add components, design systems, i18n
└── TESTING.md                     # Testing standards and patterns
```

### Package Dependency Graph

```
@ghiberti85/tokens
        │
        ▼
@ghiberti85/ui  ←──────────────────────────────┐
        │                                       │
        ▼                                       │
apps/docs (Next.js)              apps/storybook (Storybook 8)
```

**Build order is strict**: tokens must be built before ui, ui before docs/storybook.

```bash
pnpm --filter @ghiberti85/tokens build   # Step 1 — always first
pnpm --filter @ghiberti85/ui build       # Step 2
pnpm --filter docs build                 # Step 3 (or pnpm build from root)
```

---

## Design Token System

### W3C DTCG Format

All token files use the W3C Design Token Community Group format:

```json
{
  "color-primary": {
    "$value": "#6750A4",
    "$type": "color"
  },
  "border-radius-md": {
    "$value": "8px",
    "$type": "dimension"
  }
}
```

The `$value` key holds the token value; `$type` declares the token category. Style Dictionary v4 reads this format and outputs CSS custom properties.

### Three Design Systems

| Design System | Character | Audience |
|---------------|-----------|----------|
| `ds-minimal` | Clean, neutral, high whitespace | SaaS, dashboards |
| `ds-editorial` | Elegant, serif-influenced, refined | Publishing, content |
| `ds-brutalist` | Bold, high-contrast, expressive | Portfolio, creative |

Each design system lives in `packages/tokens/src/ds-{name}/` and provides these token files:

```
ds-minimal/
├── color.json          # Color palette
├── typography.json     # Font family, size, weight, line-height
├── spacing.json        # Spacing scale
├── border-radius.json  # Border radius values
├── shadow.json         # Box shadow / elevation
├── states.json         # State colors: success, warning, error, info
└── motion.json         # Transition durations and easing curves
```

### Semantic Bridge Layer

Components never reference design-system-specific variables. Instead, every design system maps a set of unprefixed semantic variables to its own prefixed tokens:

```css
/* ds-minimal/dist/semantic.css */
[data-theme="ds-minimal"] {
  --color-semantic-primary: var(--ds-minimal-color-primary);
  --color-semantic-background: var(--ds-minimal-color-background);
  --color-semantic-foreground: var(--ds-minimal-color-foreground);
  --color-semantic-border: var(--ds-minimal-color-border);
  /* … */
}

/* ds-brutalist/dist/semantic.css */
[data-theme="ds-brutalist"] {
  --color-semantic-primary: var(--ds-brutalist-color-primary);
  /* … */
}
```

Components reference only `var(--color-semantic-*)`. Changing the `data-theme` attribute on any ancestor swaps the entire design system without touching component code.

### Dark Mode

Dark mode is layered on top of the active design system:

```css
[data-theme="ds-minimal"][data-mode="dark"] {
  --color-semantic-background: var(--ds-minimal-color-background-dark);
  --color-semantic-foreground: var(--ds-minimal-color-foreground-dark);
  /* … */
}
```

Apply dark mode with `data-mode="dark"` on the `<html>` element (or any ancestor). The docs app uses an inline script in `<head>` to read `localStorage` and set `data-mode` before first paint, preventing flash.

### Token Categories

All components consume tokens through these CSS custom property namespaces:

```css
var(--color-semantic-*)      /* Colors: primary, background, foreground, border, muted… */
var(--font-family-*)         /* Font families: sans, serif, mono */
var(--font-size-*)           /* Type scale: xs, sm, md, lg, xl, 2xl… */
var(--font-weight-*)         /* Weights: normal, medium, semibold, bold */
var(--spacing-*)             /* Spacing scale: 1, 2, 3, 4, 6, 8… */
var(--border-radius-*)       /* Radii: none, sm, md, lg, full */
var(--shadow-*)              /* Elevation: sm, md, lg */
var(--transition-*)          /* Durations + easings for animations */
```

---

## Component Architecture

### File Structure

Every component lives in its own folder with exactly five files:

```
packages/ui/src/components/ComponentName/
├── ComponentName.tsx          # Component + TypeScript types + JSDoc
├── ComponentName.module.css   # CSS Modules — consumes CSS vars only
├── ComponentName.test.tsx     # Vitest + Testing Library + vitest-axe
├── ComponentName.stories.tsx  # Storybook stories with autodocs
└── index.ts                   # Re-exports (named exports only)
```

### Styling: CSS Modules + CSS Custom Properties

CSS Modules provide local scope (no class name collisions). CSS custom properties provide theming:

```css
/* Button.module.css */
.button {
  background-color: var(--color-semantic-primary);
  color: var(--color-semantic-primary-foreground);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-sans);
  transition: opacity var(--transition-fast);
}
```

**Rule**: Never hardcode colors, spacing, or sizes. Always use `var(--*)`.

### Accessibility: Radix UI Primitives

Components that need complex ARIA semantics (focus traps, roving tabindex, portal management) are built on Radix UI:

- Dialog, AlertDialog → `@radix-ui/react-dialog`
- Tooltip, Popover → `@radix-ui/react-tooltip`, `@radix-ui/react-popover`
- Select, Combobox → `@radix-ui/react-select` / custom Popover
- Tabs → `@radix-ui/react-tabs`
- Accordion → `@radix-ui/react-accordion`
- DropdownMenu → `@radix-ui/react-dropdown-menu`
- Switch → `@radix-ui/react-switch`
- Toast → `@radix-ui/react-toast`
- Checkbox → `@radix-ui/react-checkbox`
- Separator → `@radix-ui/react-separator`

Simpler components (Button, Badge, Input, Progress, etc.) use semantic HTML directly.

### `'use client'` Policy

Default: **Server Component**. Add `'use client'` only when the component requires:
- React event handlers (`onClick`, `onChange`)
- Browser-only APIs (`window`, `localStorage`, `matchMedia`)
- React hooks that use the above (`useState`, `useEffect`, `useRef` with DOM ops)

Radix UI components are always client components. Pure layout/display components (Container, Stack, Separator, Typography) do not need `'use client'`.

### The `asChild` Pattern

Components that wrap interactive elements expose an `asChild` prop powered by Radix UI `Slot`. This lets consumers render the component's styles on a different element:

```tsx
// Renders an <a> with all Button styles
<Button asChild>
  <a href="/dashboard">Go to dashboard</a>
</Button>
```

### `cn()` Utility

The `cn` utility (from `packages/ui/src/utils/cn.ts`) merges CSS Module class names and user-provided `className` props correctly:

```tsx
className={cn(styles.button, styles[`variant-${variant}`], className)}
```

---

## Data Flow

```
Token build (Style Dictionary)
        │
        ▼
dist/*.css  (CSS custom properties per DS + dark mode)
        │
        ├── imported by apps/storybook/.storybook/preview.ts
        └── imported by apps/docs (global CSS)
                │
                ▼
        <html data-theme="ds-minimal" data-mode="dark">
                │
                ▼
        Component reads var(--color-semantic-primary)
                │
                ▼
        Browser resolves → ds-minimal dark primary color
```

---

## Key Architectural Decisions

### CSS Modules over Tailwind / Styled Components

- **Scoped by default** — no global class collisions
- **Zero runtime** — plain CSS, no JS overhead
- **SSR safe** — works with Next.js server components without configuration
- **Explicit** — styles live next to components, easy to audit

### Radix UI over custom ARIA implementation

- ARIA compliance is notoriously hard to get right (focus traps, screen reader announcements, keyboard navigation)
- Radix UI handles this for each component type and is tested by thousands of projects
- We apply our own styles on top via CSS Modules — best of both worlds

### Style Dictionary v4 over manual CSS

- W3C DTCG is the emerging standard — future-proof
- Multi-format output: CSS vars, JS ES6, JSON
- Extensible transforms and formats for Figma Tokens export (planned)

### Turborepo

- Parallel builds with dependency-aware ordering
- Build cache — only rebuilds what changed
- Single `pnpm test` / `pnpm build` from root runs everything in the right order
