# CLAUDE.md — AI Context for ghiberti85/ui

This file provides context for AI assistants (Claude Code, etc.) working on this repository.

## Project Overview

Monorepo with two main products:
1. **`@ghiberti85/tokens`** — Design token collection (Style Dictionary v4, W3C format)
2. **`@ghiberti85/ui`** — Hybrid React component library (styled base + headless primitives)

## Architecture Decisions

### Tokens
- Format: W3C Design Token Community Group (DTCG) — `$value`, `$type` keys
- Three design systems: `ds-minimal`, `ds-editorial`, `ds-brutalist`
- Output: CSS Custom Properties via `[data-theme="ds-*"]` selectors + JS ES6 exports
- Build tool: Style Dictionary v4 (`sd.config.mjs`)

### Components
- Framework: React 19 + TypeScript
- Styling: CSS Modules for scoping, CSS Custom Properties for theming
- Primitives: Radix UI for accessibility (Slot, Dialog, etc.)
- Components consume tokens via CSS vars — no hardcoded colors or sizes

### Naming conventions
- CSS vars: `--{category}-{subcategory}-{name}` (e.g. `--color-semantic-primary`)
- Component files: PascalCase (`Button.tsx`, `Button.module.css`, `Button.test.tsx`, `Button.stories.tsx`)
- Token files: kebab-case (`color.json`, `border-radius.json`)

## Adding a New Component

1. Create folder: `packages/ui/src/components/ComponentName/`
2. Files needed:
   - `ComponentName.tsx` — component + TypeScript types + JSDoc
   - `ComponentName.module.css` — CSS Modules, consuming `var(--token-*)` only
   - `ComponentName.test.tsx` — Vitest + Testing Library tests
   - `ComponentName.stories.tsx` — Storybook stories with autodocs
   - `index.ts` — re-exports
3. Export from `packages/ui/src/index.ts`

## Adding a New Design System

1. Create folder: `packages/tokens/src/ds-{name}/`
2. Add token files: `color.json`, `typography.json`, `spacing.json`, `border-radius.json`
3. Register in `sd.config.mjs` (already handled by the loop — just create the folder)
4. Add exports to `packages/tokens/package.json`
5. Add to Storybook toolbar in `apps/storybook/.storybook/preview.ts`
6. Import CSS in `apps/storybook/.storybook/preview.ts`

## Testing Rules

- Every component must have tests covering: rendering, props/variants, accessibility, interactions
- Run: `pnpm test` from root
- Coverage: `pnpm --filter @ghiberti85/ui test -- --coverage`

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

## Owner

Fernando Ghiberti — Senior Full-Stack Engineer & Front-End Tech Lead
