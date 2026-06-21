# CLAUDE.md — AI Context for ghiberti85/ui

This file provides context for AI assistants (Claude Code, etc.) working on this repository.

## Project Overview

Monorepo with two main products:
1. **`@ghiberti85/tokens`** — Design token collection (Style Dictionary v4, W3C format)
2. **`@ghiberti85/ui`** — Hybrid React component library (styled base + headless primitives)

---

## **Non-Negotiable Rules**

**These apply to every task, no exceptions. Violating any of these is a hard failure.**

1. **Tests** — every feature, fix, or edit must have corresponding test coverage (Vitest + Testing Library). Run `pnpm test` before every commit. Zero failing tests allowed.
2. **Documentation** — after every change, ALL of the following must be updated without exception:
   - (a) `apps/docs` pages for the affected component/feature
   - (b) Storybook stories (`*.stories.tsx`) with autodocs and all variants covered
   - (c) Tests in `*.test.tsx`
   - (d) Roadmap section in this file
   Omitting any of these four items is a hard failure.
3. **Security** — no hardcoded secrets or API tokens. CSS vars only — no `style={{ color: userInput }}`. All external links must have `rel="noopener noreferrer"`. Run `pnpm audit` before adding any new dependency. No `eval()` or `dangerouslySetInnerHTML` without DOMPurify sanitization. Use `next/image` for all images.
4. **No hardcoded values** — components must consume only CSS custom properties (`var(--color-semantic-*)`, `var(--border-radius-*)`, etc.). Never hardcode colors, sizes, or spacing.
5. **i18n** — every user-facing string in `apps/docs` must exist in both `en.json` and `pt-BR.json`.
6. **Clean codebase** — when removing a feature, remove everything: component files, tests, stories, docs page, i18n keys, exports, and sidebar entries. See Component Removal Checklist below.

---

## **End-of-Iteration Flow (mandatory after every implementation, fix, or edit)**

**⚠️ MANDATORY after every implementation, edit, or fix — no exceptions. Complete ALL steps before reporting done.**

1. **Update `apps/docs` pages** — component page updated/created, i18n keys added to both `en.json` and `pt-BR.json`, Storybook story created/updated.
2. **Update Storybook stories** — every component change needs a corresponding `*.stories.tsx` update with autodocs and all variants covered.
3. **`pnpm test`** — run from root; fix all failures before proceeding. Never commit with failing tests.
4. **`pnpm lint`** — fix all warnings/errors before proceeding.
5. **Security check** — no hardcoded secrets, no unsafe patterns (`eval`, unsanitized `dangerouslySetInnerHTML`), all external links have `rel="noopener noreferrer"`, no raw `<img>` tags.
6. **Update Roadmap** — mark completed items in `## Roadmap` and add next items if relevant.
7. **Commit** — clear, descriptive commit message on the feature branch `claude/friendly-lamport-g7exP`.
8. **🚨 Push + PR → merge (OBRIGATÓRIO, sem exceções)** — `git push -u origin claude/friendly-lamport-g7exP`, depois use `mcp__github__create_pull_request` targeting `main`, resolva quaisquer conflitos com `git merge origin/main --no-edit` se necessário, e imediatamente faça o merge com `mcp__github__merge_pull_request` usando método `squash`. **Nunca reporte a tarefa como concluída sem abrir e mergear o PR.**
9. **🚨 Verificar deploy na Vercel (OBRIGATÓRIO)** — use `mcp__2c150976-9830-4b91-99f4-0287eb02861e__list_deployments` para checar o status. Se o deploy mostrar ERROR, leia os build logs com `mcp__2c150976-9830-4b91-99f4-0287eb02861e__get_deployment_build_logs`, corrija o problema, e reabra um novo PR. **Nunca reporte a tarefa como concluída sem confirmar que o deploy está READY.**

---

## Security Guidelines

- **Never commit `.env` files or API keys** — use environment variables and `.gitignore`
- **CSS vars only** — never use `style={{ color: userInput }}` or other dynamic inline styles from user input
- **External links** — always include `rel="noopener noreferrer"` on `target="_blank"` links
- **Images** — use `next/image` for all images; never use raw `<img>` tags
- **Dependency hygiene** — run `pnpm audit` before adding new dependencies; address high/critical vulnerabilities
- **No `eval()`** — never use `eval()` or `new Function()` with untrusted input
- **`dangerouslySetInnerHTML`** — only use with DOMPurify-sanitized content; never with raw user input
- **Server Components by default** — only add `'use client'` when strictly necessary (event handlers, browser APIs, hooks)
- **No secrets in code** — API keys, tokens, and credentials belong only in environment variables

---

## Component Removal Checklist

When removing a component, verify every item is completed before committing:

- [ ] Delete `packages/ui/src/components/ComponentName/` (all files)
- [ ] Remove export from `packages/ui/src/index.ts`
- [ ] Delete docs page `apps/docs/src/app/[locale]/components/[slug]/`
- [ ] Remove slug from `ComponentsLayout.tsx` (`COMPONENT_SLUGS` array + `COMPONENT_LABELS` map)
- [ ] Remove component demo from `ComponentsPageClient.tsx`
- [ ] Remove i18n keys from `apps/docs/messages/en.json`
- [ ] Remove i18n keys from `apps/docs/messages/pt-BR.json`
- [ ] Delete `*.stories.tsx` from Storybook app
- [ ] Run `pnpm test` — must pass
- [ ] Run `pnpm lint` — must pass

---

## Known Gotchas & Platform Quirks

### iOS PWA apple-touch-icon
**Problem:** Next.js App Router with `[locale]` dynamic segments generates icons at `/en/apple-icon.png`, not `/apple-icon.png`. iOS ignores locale-scoped paths and shows a generic letter icon.

**Solution (do not change this pattern):**
- Icon served via `app/apple-icon.png/route.ts` — edge route handler at `/apple-icon.png` using `ImageResponse`.
- `<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png">` added **explicitly** in `<head>` of `[locale]/layout.tsx`. Do NOT rely on Next.js auto-discovery.
- Do NOT use `[locale]/apple-icon.tsx` — it generates the wrong URL.

### Dark Mode & CSS Custom Properties
- Dark mode via `data-mode="dark"` on `<html>` (set by `ModeToggle`). Token selector: `[data-theme="ds-editorial"][data-mode="dark"]`.
- **Never set CSS vars on `document.documentElement.style`** from client components — inline styles override CSS rules including dark mode. Scope to a container ref instead. (See `PlaygroundClient` for the correct pattern.)

### React `'use client'` in component library
Components that use React hooks (`useState`, `useEffect`, etc.) must have `'use client'` at the top. Without it, they crash with `TypeError: useState is not a function` from Server Components. Current client components: `Avatar`, `Toast`, `Combobox`.

### CSS token undefined — `--color-semantic-surface`
This token **does not exist**. Use `--color-semantic-background-subtle` instead. If you see transparent or invisible backgrounds, this is the likely cause.

### Mobile viewport overflow — pages appear as "desktop layout" or content clipped on right
**Problem:** Elements with `white-space: pre` (e.g. `<CodeBlock>`) containing long lines can expand the page's scrollable width beyond the viewport.

**Critical distinction — `overflow-x: hidden` vs `overflow-x: clip`:**
- `overflow-x: hidden` creates a new scroll container (BFC). Applied to `site-main` or `body`, it clips content at that element's boundary — content touching the right edge appears "stuck" or cut off. Child elements with `overflow-x: auto` (code blocks) may also lose their ability to scroll.
- `overflow-x: clip` is the correct approach for the `html` element: it clips at the viewport level without creating a scroll container, so inner elements with `overflow-x: auto` (code blocks) still scroll normally.

**Rules (do not change these):**
- `html` in `globals.css` must have `overflow-x: clip` — this is the ONLY correct place to prevent viewport-level horizontal scroll.
- Do NOT add `overflow-x: hidden` to `body` or `.site-main` — it clips content and breaks child scroll containers.
- Every page-level `.page` class must have `width: 100%` alongside `max-width`.
- Every `CodeBlock` wrapper must have `max-width: 100%` and `overflow: hidden` (for border-radius clipping); `.pre` inside must have `overflow-x: auto`.

**When adding a new page:**
1. Give the root `.page` element both `width: 100%` AND `max-width: <value>`.
2. Use `clamp()` for all font sizes above 1.25rem (e.g. `clamp(1.5rem, 5vw, 2.5rem)`).
3. Test on a 375px viewport — no horizontal scroll, no content clipped at right edge.

---

## Architecture Decisions

### Tokens
- Format: W3C Design Token Community Group (DTCG) — `$value`, `$type` keys
- Five design systems: `ds-editorial`, `ds-brutalist`, `ds-onyx`, `ds-clean`, `ds-velvet`
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

---

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

---

## Adding a New Design System

1. Create folder: `packages/tokens/src/ds-{name}/`
2. Add token files: `color.json`, `typography.json`, `spacing.json`, `border-radius.json`, `dark.json`
3. Register in `sd.config.mjs` (already handled by the loop — just create the folder)
4. Add exports to `packages/tokens/package.json`
5. Add to Storybook toolbar in `apps/storybook/.storybook/preview.ts`
6. Import CSS in `apps/storybook/.storybook/preview.ts`

---

## Testing Rules

- Every component must have tests covering: rendering, props/variants, accessibility, interactions, ref forwarding
- Run: `pnpm test` from root before every commit
- Coverage: `pnpm --filter @ghiberti85/ui test -- --coverage`
- Tests must pass in CI — never commit with failing tests

---

## i18n (docs app)

- Messages: `apps/docs/messages/en.json` (default) and `pt-BR.json`
- Provider: next-intl with App Router
- All user-facing strings must be in both files

---

## Commands

```bash
pnpm install                          # install all deps
pnpm --filter @ghiberti85/tokens build  # build tokens first
pnpm dev                              # run all apps
pnpm test                             # run all tests
pnpm build                            # build everything
pnpm lint                             # lint all packages
pnpm audit                            # check for security vulnerabilities
```

---

## Roadmap

### Done
- [x] Monorepo scaffold (Turborepo + pnpm workspaces)
- [x] Token package — `ds-editorial`, `ds-brutalist`, `ds-onyx`, `ds-clean`, `ds-velvet` with full token set (ds-minimal removed — redundant with ds-clean)
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

### Done (continued)
- [x] **Motion tokens** — `--transition-*` e `--animation-*` tokens nos 3 DS, aplicados aos componentes existentes
- [x] **Live theme playground** — `/playground` page with real-time CSS custom property editor (primary color, background, border radius, font size, reset, copy CSS)
- [x] Copy-to-clipboard em todos os code blocks das páginas de componentes
- [x] Dark mode automático — anti-flash com script inline no `<head>`

### Done (continued)
- [x] Motion tokens docs page (/tokens/motion) — transition durations table, easing curves, live hover demos
- [x] Playground docs page with how-it-works explanation (how_title + how_desc i18n keys)
- [x] Mandatory update rule reinforced in CLAUDE.md — rule #2 explicit 4-item checklist, end-of-iteration flow with bold warning and numbered 1-6 steps

### Done (continued)
- [x] DropdownMenu component (Radix UI, labels, separators, checkbox/radio items, submenus, keyboard shortcuts)
- [x] AlertDialog component (Radix UI, destructive variant, same overlay pattern as Dialog)
- [x] Combobox component (built on Popover, searchable, keyboard navigation, accessible ARIA)
- [x] Breadcrumb component (pure semantic HTML, custom separator, ellipsis, aria-current)
- [x] Pagination component (pure HTML, ellipsis for large ranges, siblingCount, showFirstLast, aria-current)
- [x] 367 unit tests passing across 30 test files
- [x] Docs pages for all 5 new components with live demos, props tables, and usage code
- [x] i18n keys for all 5 components in en.json and pt-BR.json
- [x] ComponentsLayout sidebar updated with 5 new slugs

### Done (continued)
- [x] Progress component (animated fill, 5 variants, 3 sizes, role=progressbar a11y)
- [x] Skeleton component (CSS shimmer + SkeletonText + SkeletonAvatar helpers)
- [x] Alert component (4 variants, built-in SVG icons, optional title, dismiss button)
- [x] Popover component (Radix UI, animated scale+fade, arrow, PopoverClose)
- [x] Spinner component (CSS border trick, 4 sizes, 4 variants, accessible label)
- [x] 326 unit tests passing (39 new tests across 5 new components)
- [x] Individual docs pages + sidebar links + ComponentsPageClient demos for all 5 components
- [x] EN/PT-BR i18n keys for all 5 new components

### Done (continued)
- [x] **CLAUDE.md rewrite** — Security Guidelines section, Component Removal Checklist, expanded Non-Negotiable Rules, 9-step End-of-Iteration Flow
- [x] **CI security audit** — `pnpm audit --audit-level=high` step added to ci.yml (continue-on-error: true)
- [x] **security.yml workflow** — dedicated GitHub Actions workflow running `pnpm audit` + Dependency Review on every PR to main
- [x] **prepublishOnly gate** — `packages/ui/package.json` now runs tests + lint + build before any npm publish
- [x] **Docs quality audit** — all 10 new component pages confirmed to have Demo, Props table, Usage code, and Storybook link sections

### Done (continued)
- [x] **DS ds-onyx** — Interview Command Center: slate-950 + cyan-400, dark-first, clinical typography (Inter + JetBrains Mono)
- [x] **DS ds-clean** — DevInterviewLab: navy-950 + lime-400, technical authority, relaxed line-height
- [x] **DS ds-velvet** — Finanças do Casal: warm stone + teal-500, rounded corners, humanist type (DM Sans/Nunito)
- [x] Registered all 3 new DS in `sd.config.mjs`, `package.json` exports, Storybook toolbar
- [x] `DESIGN.md` — visual system documentation (semantic bridge pattern, all 6 themes, token reference tables, anti-patterns)
- [x] 367 unit tests passing

### Done (continued)
- [x] **Playground expanded controls** — Foreground Color, Border Color, Spacing Scale, Transition Speed, Font Family (4 options) added to sidebar; Preview expanded with Typography, Alert (4 variants), Progress, Spinner, Textarea, Select components; controls grouped by Color / Shape & Scale / Typography / Motion sections

### Done (continued)
- [x] **Slider component** — range input with fill track, marks with labels, min/max/step, controlled/uncontrolled, accessible aria attributes
- [x] **Chip component** — 6 variants, 3 sizes, removable with X button, icon slot, disabled state
- [x] **Rating component** — 5-star interactive rating, hover states, readOnly/disabled, toggle-off, role="img" for readOnly stars (axe compliant)
- [x] **Stepper component** — horizontal/vertical orientation, completed/active/error/pending statuses, animated connectors, semantic `<ol>` markup
- [x] 473 unit tests passing across 40 test files
- [x] Docs pages + sidebar + i18n (EN/PT-BR) for all 4 new components
- [x] ComponentsPageClient demos for all 4 new components

### Next — Integração de Projetos

### Next — Publicação e Distribuição
- [ ] **Figma Tokens export** — gerar JSON compatível com Figma Tokens / Tokens Studio a partir do Style Dictionary
- [ ] **npmjs publish** — publicar `@ghiberti85/tokens` e `@ghiberti85/ui` no npm com semantic-release + changesets
- [ ] **CLI scaffold** — `npx @ghiberti85/ui init` que instala deps e copia CSS global para o projeto do usuário
- [ ] **Chromatic visual diff badge** no README com link para o último build
- [x] **OG image dinâmica** na docs — Next.js `ImageResponse` gerando preview com o design system ativo (home + per-component, DM Sans font, dark card with purple accent bar)

---

## Owner

Fernando Ghiberti — Senior Full-Stack Engineer & Front-End Tech Lead
