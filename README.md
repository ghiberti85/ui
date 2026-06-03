# ghiberti85/ui

> Design systems collection and component library — by [Fernando Ghiberti](https://github.com/ghiberti85)

A monorepo containing multiple design systems and a hybrid React component library built for authorial projects. Multiple visual identities, one component API.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@ghiberti85/tokens`](./packages/tokens) | Design tokens in W3C format, powered by Style Dictionary v4 | ![npm](https://img.shields.io/npm/v/@ghiberti85/tokens) |
| [`@ghiberti85/ui`](./packages/ui) | React component library (hybrid styled + headless) | ![npm](https://img.shields.io/npm/v/@ghiberti85/ui) |

## Apps

| App | Description |
|-----|-------------|
| [`apps/docs`](./apps/docs) | Documentation site — Next.js 15, EN/PT-BR |
| [`apps/storybook`](./apps/storybook) | Component explorer — Storybook 8 + Chromatic |

## Design Systems

Five visual identities, all consuming the same component API:

- **ds-clean** — Technical authority, navy + lime accent. Inter + JetBrains Mono. *(default)*
- **ds-velvet** — Warm, approachable, rounded. DM Sans/Nunito + teal accent.
- **ds-brutalist** — Raw, bold, intentional. Bebas Neue + pure primaries.
- **ds-editorial** — Warm, typographic, refined. Playfair Display + cream tones.
- **ds-onyx** — Dark-first, clinical. Inter + cyan accent. Productivity/dense UI.

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

```bash
# Install dependencies
pnpm install

# Build all tokens first
pnpm --filter @ghiberti85/tokens build

# Run all in dev mode
pnpm dev

# Run Storybook only
pnpm --filter @ghiberti85/storybook dev

# Run docs only
pnpm --filter @ghiberti85/docs dev
```

## Testing

```bash
# Unit tests (Vitest + Testing Library)
pnpm test

# Interactive test UI
pnpm test:ui

# Visual regression (requires Chromatic token)
# Set CHROMATIC_PROJECT_TOKEN in your environment
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Monorepo | Turborepo + pnpm workspaces |
| Tokens | Style Dictionary v4 (W3C format) |
| Components | React 19 + TypeScript |
| Styling | CSS Modules + CSS Custom Properties |
| Primitives | Radix UI (accessibility) |
| Docs | Next.js 15 + next-intl (EN/PT-BR) |
| Storybook | Storybook 8 |
| Testing | Vitest + Testing Library |
| Visual regression | Chromatic |
| CI/CD | GitHub Actions |

## Contributing

This is a personal project, but issues and suggestions are welcome.

## License

MIT © [Fernando Ghiberti](https://github.com/ghiberti85)
