## Summary

<!-- What does this PR do? Why is this change needed? Link to any related issue. -->

## Type of change

- [ ] Bug fix
- [ ] New component
- [ ] New feature / enhancement
- [ ] Refactor
- [ ] Documentation only
- [ ] CI/CD / tooling
- [ ] Design token change

---

## Checklist

### Code quality

- [ ] Tests added or updated for all changed code
- [ ] `pnpm test` passes — zero failing tests
- [ ] `pnpm lint` passes — zero errors or warnings
- [ ] `pnpm build` passes
- [ ] No hardcoded colors, sizes, or spacing — CSS custom properties only (`var(--color-semantic-*)`)
- [ ] No new `'use client'` directives without a clear justification in a comment

### Documentation (all four required — omitting any is a hard failure)

- [ ] `apps/docs` page added or updated for affected component/feature
- [ ] Storybook stories added or updated (`*.stories.tsx`) with autodocs and all variants
- [ ] i18n keys added to both `apps/docs/messages/en.json` and `pt-BR.json`
- [ ] `CLAUDE.md` Roadmap section updated — completed items checked, next items added if relevant

### Security

- [ ] No hardcoded secrets, API tokens, or credentials
- [ ] All `target="_blank"` links include `rel="noopener noreferrer"`
- [ ] No `dangerouslySetInnerHTML` without DOMPurify sanitization
- [ ] No `eval()` or `new Function()` with untrusted input
- [ ] `pnpm audit` run if new dependencies were added — no new high/critical vulnerabilities
- [ ] Images use `next/image`, not raw `<img>` tags

### If this PR adds a new component

- [ ] `packages/ui/src/components/ComponentName/` created with all 5 files (tsx, module.css, test.tsx, stories.tsx, index.ts)
- [ ] Exported from `packages/ui/src/index.ts`
- [ ] Added to `ComponentsLayout.tsx` (`COMPONENT_SLUGS` + `COMPONENT_LABELS`)
- [ ] Added to `ComponentsPageClient.tsx` with a live demo
- [ ] Individual docs page created at `apps/docs/src/app/[locale]/components/[slug]/page.tsx`

### If this PR removes a component or feature

- [ ] Component folder deleted: `packages/ui/src/components/ComponentName/`
- [ ] Export removed from `packages/ui/src/index.ts`
- [ ] Docs page removed: `apps/docs/src/app/[locale]/components/[slug]/`
- [ ] Slug removed from `ComponentsLayout.tsx` (`COMPONENT_SLUGS` + `COMPONENT_LABELS`)
- [ ] Demo removed from `ComponentsPageClient.tsx`
- [ ] i18n keys removed from `en.json` and `pt-BR.json`
- [ ] Storybook story deleted
- [ ] `pnpm test` and `pnpm lint` passing after removal

---

## Vercel Deploy

- [ ] Deploy succeeded after merge (check Vercel dashboard — no ERROR status)
