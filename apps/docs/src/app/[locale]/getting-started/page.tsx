'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { CodeBlock } from '@/components/CodeBlock'
import styles from './page.module.css'

const INSTALL_NPM   = `npm install @ghiberti85/tokens @ghiberti85/ui`
const INSTALL_PNPM  = `pnpm add @ghiberti85/tokens @ghiberti85/ui`
const INSTALL_YARN  = `yarn add @ghiberti85/tokens @ghiberti85/ui`

const IMPORT_TOKENS = `// Import the design system CSS (pick one)
import '@ghiberti85/tokens/ds-minimal'
// import '@ghiberti85/tokens/ds-editorial'
// import '@ghiberti85/tokens/ds-brutalist'
// import '@ghiberti85/tokens/ds-icc'       // Interview Command Center
// import '@ghiberti85/tokens/ds-dil'       // DevInterviewLab
// import '@ghiberti85/tokens/ds-financas'  // Finanças do Casal`

const HTML_ATTR = `<!-- Apply a theme and optional dark mode -->
<html data-theme="ds-minimal">
  <!-- for dark mode: data-theme="ds-minimal" data-mode="dark" -->
</html>

<!-- Available themes: ds-minimal, ds-editorial, ds-brutalist,
     ds-icc, ds-dil, ds-financas -->`

const FIRST_COMPONENT = `import { Button } from '@ghiberti85/ui'

export default function App() {
  return <Button variant="primary">Hello, world!</Button>
}`

const SWITCH_THEME = `// Switch theme at runtime — no re-render needed
document.documentElement.setAttribute('data-theme', 'ds-editorial')
// All available themes:
// 'ds-minimal' | 'ds-editorial' | 'ds-brutalist'
// 'ds-icc' | 'ds-dil' | 'ds-financas'`

const DARK_MODE = `// Toggle dark mode
document.documentElement.setAttribute('data-mode', 'dark')
// Remove for light mode
document.documentElement.removeAttribute('data-mode')`

export default function GettingStartedPage() {
  const t = useTranslations('gettingStarted')

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.badge}>{t('badge')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      {/* Step 1 — Install */}
      <section className={styles.section}>
        <div className={styles.stepNumber}>01</div>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>{t('step_install_title')}</h2>
          <p className={styles.stepDesc}>{t('step_install_desc')}</p>
          <div className={styles.tabs}>
            <div className={styles.tabGroup}>
              <span className={styles.tabLabel}>npm</span>
              <CodeBlock code={INSTALL_NPM} language="bash" />
            </div>
            <div className={styles.tabGroup}>
              <span className={styles.tabLabel}>pnpm</span>
              <CodeBlock code={INSTALL_PNPM} language="bash" />
            </div>
            <div className={styles.tabGroup}>
              <span className={styles.tabLabel}>yarn</span>
              <CodeBlock code={INSTALL_YARN} language="bash" />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* Step 2 — Import tokens */}
      <section className={styles.section}>
        <div className={styles.stepNumber}>02</div>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>{t('step_tokens_title')}</h2>
          <p className={styles.stepDesc}>{t('step_tokens_desc')}</p>
          <CodeBlock code={IMPORT_TOKENS} language="ts" />
          <div className={styles.callout}>
            <span className={styles.calloutIcon}>💡</span>
            <p>{t('step_tokens_tip')}</p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* Step 3 — Set data-theme */}
      <section className={styles.section}>
        <div className={styles.stepNumber}>03</div>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>{t('step_theme_title')}</h2>
          <p className={styles.stepDesc}>{t('step_theme_desc')}</p>
          <CodeBlock code={HTML_ATTR} language="html" />
          <div className={styles.themeGrid}>
            {[
              { value: 'ds-minimal',   label: 'Minimal' },
              { value: 'ds-editorial', label: 'Editorial' },
              { value: 'ds-brutalist', label: 'Brutalist' },
              { value: 'ds-icc',       label: 'ICC' },
              { value: 'ds-dil',       label: 'DIL' },
              { value: 'ds-financas',  label: 'Finanças' },
            ].map(({ value, label }) => (
              <div key={value} className={styles.themeCard} data-theme={value}>
                <span className={styles.themeCardName}>{label}</span>
                <div className={styles.themeCardDot} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* Step 4 — First component */}
      <section className={styles.section}>
        <div className={styles.stepNumber}>04</div>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>{t('step_component_title')}</h2>
          <p className={styles.stepDesc}>{t('step_component_desc')}</p>
          <CodeBlock code={FIRST_COMPONENT} language="tsx" />
        </div>
      </section>

      <div className={styles.divider} />

      {/* Step 5 — Switch themes */}
      <section className={styles.section}>
        <div className={styles.stepNumber}>05</div>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>{t('step_switch_title')}</h2>
          <p className={styles.stepDesc}>{t('step_switch_desc')}</p>
          <CodeBlock code={SWITCH_THEME} language="ts" />
          <CodeBlock code={DARK_MODE} language="ts" />
        </div>
      </section>

      <div className={styles.divider} />

      {/* Next steps */}
      <section className={styles.nextSteps}>
        <h2 className={styles.nextTitle}>{t('next_title')}</h2>
        <div className={styles.nextGrid}>
          <Link href="/components" className={styles.nextCard}>
            <span className={styles.nextCardIcon}>🧩</span>
            <span className={styles.nextCardLabel}>{t('next_components')}</span>
            <span className={styles.nextCardArrow}>→</span>
          </Link>
          <Link href="/tokens" className={styles.nextCard}>
            <span className={styles.nextCardIcon}>🎨</span>
            <span className={styles.nextCardLabel}>{t('next_tokens')}</span>
            <span className={styles.nextCardArrow}>→</span>
          </Link>
          <a
            href="https://github.com/ghiberti85/ui"
            className={styles.nextCard}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.nextCardIcon}>📦</span>
            <span className={styles.nextCardLabel}>{t('next_github')}</span>
            <span className={styles.nextCardArrow}>→</span>
          </a>
        </div>
      </section>
    </div>
  )
}
