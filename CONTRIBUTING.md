# Contributing

Step-by-step guide for adding components, design systems, and i18n keys to this monorepo.

---

## Development Environment

```bash
# Install all dependencies
pnpm install

# Build tokens first (required before starting dev)
pnpm --filter @ghiberti85/tokens build

# Start all apps in dev mode (docs + storybook)
pnpm dev

# Run all tests
pnpm test

# Lint everything
pnpm lint
```

The `apps/docs` site runs on `http://localhost:3000` and `apps/storybook` on `http://localhost:6006`.

---

## Adding a New Component

This walkthrough uses `Spinner` as a concrete reference. Follow these steps in order.

### Step 1 — Create the component folder

```bash
mkdir packages/ui/src/components/MyComponent
```

### Step 2 — Create `MyComponent.tsx`

```tsx
// packages/ui/src/components/Spinner/Spinner.tsx
import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Spinner.module.css'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerVariant = 'default' | 'secondary' | 'outline' | 'ghost'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Color variant */
  variant?: SpinnerVariant
  /** Accessible label announced by screen readers */
  label?: string
}

/**
 * Spinner — CSS-only indeterminate loading indicator.
 *
 * @example
 * <Spinner size="md" />
 * <Spinner variant="secondary" label="Saving…" />
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', variant = 'default', label = 'Loading…', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(styles.spinner, styles[`size-${size}`], styles[`variant-${variant}`], className)}
        {...props}
      >
        <span className={styles.srOnly}>{label}</span>
      </span>
    )
  }
)

Spinner.displayName = 'Spinner'
```

Rules:
- Use `React.forwardRef` — all components must forward refs.
- Spread `...props` onto the root element — never block HTML attribute forwarding.
- Use `cn()` for class merging.
- All CSS values come from `var(--*)` — never hardcode.

### Step 3 — Create `MyComponent.module.css`

```css
/* packages/ui/src/components/Spinner/Spinner.module.css */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  border-style: solid;
  border-radius: 50%;
  animation: spin var(--animation-spin, 0.6s) linear infinite;
  flex-shrink: 0;
}

.size-sm { width: 14px; height: 14px; border-width: 2px; }
.size-md { width: 20px; height: 20px; border-width: 2px; }
.size-lg { width: 28px; height: 28px; border-width: 3px; }
.size-xl { width: 40px; height: 40px; border-width: 3px; }

.variant-default {
  border-color: var(--color-semantic-primary);
  border-top-color: transparent;
}

.variant-secondary {
  border-color: var(--color-semantic-foreground);
  border-top-color: transparent;
  opacity: 0.6;
}

.srOnly {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Rules:
- Never use hardcoded color values, pixel sizes for spacing, or font stacks.
- Always use `var(--color-semantic-*)`, `var(--spacing-*)`, `var(--font-family-*)`, etc.

### Step 4 — Create `MyComponent.test.tsx`

See [TESTING.md](./TESTING.md) for full patterns. Minimum required:

```tsx
// packages/ui/src/components/Spinner/Spinner.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with default accessible label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading…')
  })

  it('accepts a custom label', () => {
    render(<Spinner label="Saving…" />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving…')
  })

  it('forwards className', () => {
    const { container } = render(<Spinner className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Spinner ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})

describe('Spinner accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

### Step 5 — Create `MyComponent.stories.tsx`

```tsx
// packages/ui/src/components/Spinner/Spinner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost'] },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: { size: 'md', variant: 'default' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
      <Spinner size="xl" label="Extra Large" />
    </div>
  ),
}
```

Rules:
- Always include `tags: ['autodocs']` — this generates the Storybook docs tab.
- Export a `Default` story with `args` — this drives the interactive controls panel.
- Export one story per meaningful variant group.

### Step 6 — Create `index.ts`

```ts
// packages/ui/src/components/Spinner/index.ts
export * from './Spinner'
```

### Step 7 — Export from the package

Add to `packages/ui/src/index.ts`:

```ts
export * from './components/Spinner'
```

Keep alphabetical order by convention.

### Step 8 — Add to the docs sidebar

In `apps/docs/src/components/ComponentsLayout.tsx`:

```ts
// Add to COMPONENT_SLUGS array (keep alphabetical order)
const COMPONENT_SLUGS = [
  // ...
  'spinner',
  // ...
]

// Add to COMPONENT_LABELS map
const COMPONENT_LABELS: Record<string, string> = {
  // ...
  spinner: 'Spinner',
  // ...
}
```

### Step 9 — Create the docs page

Create `apps/docs/src/app/[locale]/components/spinner/page.tsx`.

Use an existing page as a template (e.g. `apps/docs/src/app/[locale]/components/spinner/page.tsx`). Every docs page must have:
1. **Demo section** — live rendered component
2. **Props table** — using `<PropsTable>` component
3. **Usage code** — copy-pasteable example via `<CodeBlock>`
4. **Storybook link** — linking to the relevant Storybook story

### Step 10 — Add i18n keys

In `apps/docs/messages/en.json`, add under the `"components"` key:

```json
"spinner_desc": "CSS-only loading spinner. 4 sizes, 4 variants, accessible label."
```

Add the identical key in `apps/docs/messages/pt-BR.json` with a Portuguese translation:

```json
"spinner_desc": "Spinner CSS puro. 4 tamanhos, 4 variantes, rótulo acessível."
```

See the i18n section below for the full JSON structure.

### Step 11 — Add demo to the components overview page

In `apps/docs/src/app/[locale]/components/ComponentsPageClient.tsx`, add a live demo entry for the component in the appropriate category section.

### Step 12 — Verify

```bash
pnpm test     # must pass — zero failures
pnpm lint     # must be clean — zero errors
pnpm build    # must succeed
```

---

## Adding a New Design System

### Step 1 — Create the token folder

```bash
mkdir packages/tokens/src/ds-myname
```

### Step 2 — Add token files

Create these files in the new folder (copy from `ds-minimal` and adapt values):

```
ds-myname/
├── color.json          # Color palette
├── typography.json     # Font family, size, weight, line-height
├── spacing.json        # Spacing scale
├── border-radius.json  # Border radius values
├── shadow.json         # Box shadow / elevation
├── states.json         # success, warning, error, info colors
└── motion.json         # Transition durations and easing
```

Each token file uses the W3C DTCG format:

```json
{
  "color-primary": {
    "$value": "#your-color",
    "$type": "color"
  }
}
```

The Style Dictionary build in `sd.config.mjs` automatically discovers new folders and builds them. No config change is needed.

### Step 3 — Add to the Storybook toolbar

In `apps/storybook/.storybook/preview.ts`, import the new CSS and register the theme:

```ts
import '@ghiberti85/tokens/ds-myname/index.css'

// In globalTypes.theme.toolbar.items, add:
{ value: 'ds-myname', title: 'My Name' }
```

### Step 4 — Document in ARCHITECTURE.md

Add a row to the design systems table in `/ARCHITECTURE.md`.

---

## Adding i18n Keys

All user-facing strings in `apps/docs` must exist in both locale files.

### File locations

```
apps/docs/messages/en.json       # English (default locale)
apps/docs/messages/pt-BR.json    # Brazilian Portuguese
```

### JSON structure

Keys are nested under a namespace that matches the page/component:

```json
{
  "components": {
    "title": "Components",
    "spinner_desc": "CSS-only loading spinner.",
    "mycomponent_desc": "One-line description of the component."
  },
  "componentPages": {
    "section_demo": "Demo",
    "section_props": "Props",
    "section_usage": "Usage",
    "table_prop": "Prop",
    "table_type": "Type",
    "table_default": "Default",
    "table_description": "Description"
  }
}
```

### Using keys in a Server Component

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyPage() {
  const t = await getTranslations('components')
  return <p>{t('mycomponent_desc')}</p>
}
```

### Using keys in a Client Component

```tsx
'use client'
import { useTranslations } from 'next-intl'

export function MyClientComponent() {
  const t = useTranslations('components')
  return <p>{t('mycomponent_desc')}</p>
}
```

### Rules

- Always add keys to **both** `en.json` and `pt-BR.json` in the same commit.
- Never render a string literal in a docs page — always go through the translation function.
- When removing a component, remove all its i18n keys from both files.

---

## Before Every Commit

Run this sequence from the repo root:

```bash
pnpm test    # zero failures required
pnpm lint    # zero errors required
```

If adding new dependencies:

```bash
pnpm audit   # check for high/critical vulnerabilities before committing
```

---

## Commit Message Format

Use a short imperative prefix:

```
feat: add Spinner component
fix: correct Dialog focus trap on iOS
docs: update Button page with new variants
refactor: extract cn() utility to shared utils
chore: upgrade Radix UI packages
```

---

## Branch and PR Flow

1. Work on a feature branch (e.g. `feat/my-component` or `claude/session-id`).
2. Open a PR targeting `main`.
3. Fill in the PR template checklist completely.
4. Merge with **squash** to keep `main` history clean.
5. Verify the Vercel deploy succeeds after merge.
