# CLAUDE.md — AI Context for ghiberti85/ui

This file provides context for AI assistants (Claude Code, etc.) working on this repository.

## Project Overview

Monorepo with two main products:
1. **`@ghiberti85/tokens`** — Design token collection (Style Dictionary v4, W3C format)
2. **`@ghiberti85/ui`** — Hybrid React component library (styled base + headless primitives)

## Non-Negotiable Rules

These apply to every task, no exceptions:

1. **Tests** — every component change or addition must have corresponding test coverage (Vitest + Testing Library). Run `pnpm test` before considering any task done.
2. **Documentation** — every new component needs a Storybook story (`*.stories.tsx`) with autodocs and all variants covered. Update `apps/docs` pages when adding components.
3. **Roadmap** — after completing any significant feature or component, update the `## Roadmap` section at the bottom of this file marking items as done and adding new ones.
4. **i18n** — every user-facing string in `apps/docs` must exist in both `en.json` and `pt-BR.json`.
5. **No hardcoded values** — components must consume only CSS custom properties (`var(--color-semantic-*)`, `var(--border-radius-*)`, etc.). Never hardcode colors, sizes, or spacing.

## Architecture Decisions

### Tokens
- Format: W3C Design Token Community Group (DTCG) — `$value`, `$type` keys
- Three design systems: `ds-minimal`, `ds-editorial`, `ds-brutalist`
- Output: CSS Custom Properties via `[data-theme="ds-*"]` selectors + JS ES6 exports
- Build tool: Style Dictionary v4 (`sd.config.mjs`)
- **Semantic bridge**: each theme maps unprefixed vars (`--color-semantic-primary`) to its own prefixed vars so components are theme-agnostic
- **Dark mode**: `[data-theme="ds-*"][data-mode="dark"]` selector overrides semantic vars

### Components
- Framework: React 19 + TypeScript
- Styling: CSS Modules for scoping, CSS Custom Properties for theming
- Primitives: Radix UI for accessibility (Slot, Dialog, etc.)
- Components consume tokens via CSS vars only — `var(--color-semantic-*)`, `var(--border-radius-*)`, `var(--font-family-sans)`

### Naming conventions
- CSS vars: `--{category}-{subcategory}-{name}` (e.g. `--color-semantic-primary`)
- Component files: PascalCase (`Button.tsx`, `Button.module.css`, `Button.test.tsx`, `Button.stories.tsx`)
- Token files: kebab-case (`color.json`, `border-radius.json`, `dark.json`)

## Adding a New Component

1. Create folder: `packages/ui/src/components/ComponentName/`
2. Files needed:
   - `ComponentName.tsx` — component + TypeScript types + JSDoc
   - `ComponentName.module.css` — CSS Modules, consuming `var(--color-semantic-*)` only
   - `ComponentName.test.tsx` — Vitest + Testing Library tests
   - `ComponentName.stories.tsx` — Storybook stories with autodocs
   - `index.ts` — re-exports
3. Export from `packages/ui/src/index.ts`
4. Add to `apps/docs/src/app/[locale]/components/page.tsx`
5. Run `pnpm test` — must pass before committing

## Adding a New Design System

1. Create folder: `packages/tokens/src/ds-{name}/`
2. Add token files: `color.json`, `typography.json`, `spacing.json`, `border-radius.json`, `dark.json`
3. Register in `sd.config.mjs` (already handled by the loop — just create the folder)
4. Add exports to `packages/tokens/package.json`
5. Add to Storybook toolbar in `apps/storybook/.storybook/preview.ts`
6. Import CSS in `apps/storybook/.storybook/preview.ts`

## Testing Rules

- Every component must have tests covering: rendering, props/variants, accessibility, interactions, ref forwarding
- Run: `pnpm test` from root before every commit
- Coverage: `pnpm --filter @ghiberti85/ui test -- --coverage`
- Tests must pass in CI — never commit with failing tests

## i18n (docs app)

- Messages: `apps/docs/messages/en.json` (default) and `pt-BR.json`
- Provider: next-intl with App Router
- All user-facing strings must be in both files

## Commands

```bash
pnpm install                          # install all deps
pnpm --filter @ghiberti85/tokens build  # build tokens first
pnpm dev                              # run all apps
pnpm test                             # run all tests
pnpm build                            # build everything
pnpm lint                             # lint all packages
```

## Roadmap

### Done
- [x] Monorepo scaffold (Turborepo + pnpm workspaces)
- [x] Token package — `ds-minimal`, `ds-editorial`, `ds-brutalist` with full token set
- [x] Style Dictionary v4 build (CSS vars + JS ES6)
- [x] Semantic bridge layer — unprefixed vars consumed by components
- [x] Dark mode tokens (`data-mode="dark"`) for all three DS
- [x] Button component (4 variants, 4 sizes, loading, asChild)
- [x] Badge component (4 variants)
- [x] Input component (label, error, accessible)
- [x] Card component (compound: Header, Title, Description, Content, Footer)
- [x] Dialog component (Radix UI, full sub-component exports)
- [x] 61 unit tests passing
- [x] Storybook 8 with theme switcher
- [x] Chromatic visual regression CI
- [x] Docs app (Next.js 15 + next-intl EN/PT-BR)
- [x] Dark/light mode toggle in docs
- [x] Language switcher (EN / PT-BR) in docs
- [x] Vercel deploy (docs app)

### Done (continued)
- [x] Select component (Radix UI, label/error/helperText/size)
- [x] Checkbox component (CSS-drawn, indeterminate state)
- [x] Toggle / Switch component (Radix UI, animated)
- [x] Radio / RadioGroup component (horizontal/vertical)
- [x] Separator component (horizontal/vertical)
- [x] Textarea component (resize prop)
- [x] Typography components (Heading, Text, Label, Code)
- [x] Layout primitives (Stack, Container)
- [x] State tokens (success/warning/error/info) for all 3 DS
- [x] Shadow/elevation tokens for all 3 DS
- [x] Semantic bridge layer (unprefixed vars consumed by components)
- [x] Dark mode tokens for all 3 DS + brutalist contrast fix
- [x] Font loading via next/font (DM Sans, Playfair Display, Bebas Neue, JetBrains Mono)
- [x] Docs component pages with live demos (Button, Badge, Input, Card)
- [x] Token visualization page (color swatches + semantic table per DS)
- [x] 196 unit tests passing across 14 components

### Done (continued)
- [x] Tooltip component (Radix UI, inverted colors, 4-direction animations, disabled state)
- [x] Avatar component (image + fallback initials, auto-initials from alt, 5 sizes, circle/square)
- [x] Docs component pages expanded (all 16 components with live demos — Form, Display, Layout sections)
- [x] Docs home page redesign (DS showcase cards, component strip, how it works section)
- [x] 221 unit tests passing across 16 components

### Next
- [ ] Storybook custom domain (Chromatic paid plan)
- [ ] Dark mode toggle in Storybook toolbar
- [ ] Component individual pages (/components/button) with full API docs
- [ ] Accessibility audit (axe-core integration in tests)

## Owner

Fernando Ghiberti — Senior Full-Stack Engineer & Front-End Tech Lead
