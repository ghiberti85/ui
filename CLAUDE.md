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

## End-of-Iteration Flow (mandatory after every implementation, fix, or edit)

At the end of **every** iteration — no exceptions — execute these steps in order:

1. **Review docs** — check that `apps/docs` pages reflect the change (new/updated component page, i18n keys in `en.json` + `pt-BR.json`, Storybook story).
2. **Run tests** — `pnpm test` must pass. Fix any failures before proceeding.
3. **Update roadmap** — mark completed items in `## Roadmap` and add next items if relevant.
4. **Commit** — clear, descriptive commit message on the feature branch `claude/friendly-lamport-g7exP`.
5. **Open PR** — use `mcp__github__create_pull_request` targeting `main` with a summary of what changed.
6. **Merge PR** — use `mcp__github__merge_pull_request` with `squash` method immediately after creating it (resolve any merge conflicts first by merging `origin/main` locally).

This flow is non-negotiable and must be completed before reporting a task as done.

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
- [x] Dark mode toggle in Storybook toolbar (globalTypes + withMode decorator)
- [x] Component individual pages (/components/button, /badge, /input, /card, /dialog)
- [x] Accessibility audit — vitest-axe integrated, 240 tests passing (19 axe tests)

### Done (continued)
- [x] Individual pages for remaining 11 components (Textarea, Select, Checkbox, Radio, Switch, Separator, Typography, Stack, Container, Tooltip, Avatar)
- [x] Search / filter on /components page
- [x] Responsive mobile nav with hamburger menu + Storybook link
- [x] Mandatory end-of-iteration flow (docs → tests → commit → PR → merge)

### Done (continued)
- [x] Mobile nav fix — controls (theme/locale/mode) moved to hamburger dropdown, header sem overflow
- [x] Bottom navigation bar (replaces hamburger on mobile) — Home/Tokens/Components/Settings tabs
- [x] Favicon — elegant SVG token-stack icon with purple accent dot
- [x] Home title shimmer animation slowed to 6s
- [x] Getting Started page — install, token import, theme setup, first component, dark mode
- [x] Sidebar de navegação nas docs (todos os componentes com link direto)
- [x] Navegação anterior/próximo entre páginas de componentes (prev/next)

### Done (continued)
- [x] Tabs component (Radix UI, horizontal/vertical, controlled/uncontrolled)
- [x] Accordion component (Radix UI, single/multiple, animated height)
- [x] Toast component (Radix UI, 5 variants, useToast hook, Toaster convenience component)
- [x] Table component (semantic HTML, striped rows, scrollable wrapper)
- [x] 287 unit tests passing
- [x] Dark mode contrast audit — WCAG AA fixes for all 3 DS (background-subtle, foreground-muted, border, primary, state tokens)
- [x] Bugfix: ToastDemo context error — useToast called outside Toaster provider
- [x] Tabs mobile fix — horizontal scroll instead of overflow; smaller triggers at ≤640px
- [x] Accordion content top spacing — 0.75rem top padding added to contentInner
- [x] PWA manifest + home screen icons (icon-192.svg, icon-512.svg, manifest.webmanifest)
- [x] Axe accessibility tests for Tooltip and Avatar (already passing — confirmed)
- [x] Copy-to-clipboard on all CodeBlock instances (inline SVG icons, 2s feedback)
- [x] Dark mode anti-flash — inline script in <head> applies data-mode before first paint

### Next — Wow Factor (alto impacto visual / técnico)
- [ ] **Motion tokens** — `--transition-*` e `--animation-*` tokens nos 3 DS, aplicados aos componentes existentes
- [ ] **Live theme playground** — página interativa onde o usuário ajusta tokens (cor primária, radius, tipografia) em tempo real e vê todos os componentes atualizarem ao vivo (CSS custom properties via range/color inputs)

### Next — Wow Factor (alto impacto visual / técnico)
- [ ] **Copy-to-clipboard** em todos os code blocks das páginas de componentes
- [ ] **Live theme playground** — página interativa onde o usuário ajusta tokens em tempo real
- [ ] **Dark mode automático** — anti-flash com script inline no `<head>`
- [ ] **Motion tokens** — `--transition-*` e `--animation-*` tokens nos 3 DS

### Next — Integração de Projetos (requer desktop)
- [ ] **DS ds-icc** — adicionar design system do projeto ICC (requer acesso ao repo pelo desktop para extrair cores/tipografia)
- [ ] **DS ds-financas-casal** — adicionar design system do projeto Finanças Casal (idem)
- [ ] **DS ds-dev-interview-lab** — adicionar design system do projeto Dev Interview Lab (idem)
- [ ] Registrar os 3 novos DS no `sd.config.mjs`, Storybook toolbar e docs

### Next — Publicação e Distribuição
- [ ] **Figma Tokens export** — gerar JSON compatível com Figma Tokens / Tokens Studio a partir do Style Dictionary
- [ ] **npmjs publish** — publicar `@ghiberti85/tokens` e `@ghiberti85/ui` no npm com semantic-release + changesets
- [ ] **CLI scaffold** — `npx @ghiberti85/ui init` que instala deps e copia CSS global para o projeto do usuário
- [ ] **Chromatic visual diff badge** no README com link para o último build
- [ ] **OG image dinâmica** na docs — Next.js `ImageResponse` gerando preview com o design system ativo

## Owner

Fernando Ghiberti — Senior Full-Stack Engineer & Front-End Tech Lead
