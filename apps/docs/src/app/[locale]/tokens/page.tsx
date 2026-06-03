import { useTranslations } from 'next-intl'
import styles from './page.module.css'

const DESIGN_SYSTEMS = [
  { key: 'ds_clean',     theme: 'ds-clean' },
  { key: 'ds_velvet',    theme: 'ds-velvet' },
  { key: 'ds_brutalist', theme: 'ds-brutalist' },
  { key: 'ds_editorial', theme: 'ds-editorial' },
  { key: 'ds_onyx',      theme: 'ds-onyx' },
] as const

const SEMANTIC_COLORS = [
  { key: 'background', var: '--color-semantic-background', label: 'Background' },
  { key: 'foreground', var: '--color-semantic-foreground', label: 'Foreground' },
  { key: 'primary', var: '--color-semantic-primary', label: 'Primary' },
  { key: 'border', var: '--color-semantic-border', label: 'Border' },
  { key: 'background_subtle', var: '--color-semantic-background-subtle', label: 'Background Subtle' },
] as const

export default function TokensPage() {
  const t = useTranslations('tokens')

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      {/* Side-by-side design system cards */}
      <div className={styles.grid}>
        {DESIGN_SYSTEMS.map(({ key, theme }) => (
          <div key={theme} className={styles.card} data-theme={theme}>
            <h2 className={styles.dsName}>{t(key)}</h2>
            <code className={styles.themeAttr}>data-theme=&quot;{theme}&quot;</code>

            {/* Semantic color swatches */}
            <div className={styles.swatchRow}>
              {SEMANTIC_COLORS.map((color) => (
                <div key={color.key} className={styles.swatchItem} title={color.label}>
                  <div
                    className={styles.swatch}
                    style={{ background: `var(${color.var})` }}
                  />
                  <span className={styles.swatchLabel}>{color.label}</span>
                </div>
              ))}
            </div>

            {/* Typography preview */}
            <div className={styles.preview}>
              <span className={styles.previewText}>Aa</span>
              <span className={styles.previewMono}>01</span>
            </div>

            {/* Primary color bar */}
            <div
              className={styles.primaryBar}
              style={{ background: 'var(--color-semantic-primary)' }}
            />
          </div>
        ))}
      </div>

      {/* Semantic token table */}
      <section className={styles.tokenSection}>
        <h2 className={styles.sectionTitle}>{t('semantic_tokens')}</h2>
        <p className={styles.sectionDesc}>{t('semantic_tokens_desc')}</p>
        <div className={styles.tokenTable}>
          <div className={styles.tokenTableHeader}>
            <span>{t('token_name')}</span>
            {DESIGN_SYSTEMS.map(({ key, theme }) => (
              <span key={theme}>{t(key)}</span>
            ))}
          </div>
          {SEMANTIC_COLORS.map((color) => (
            <div key={color.key} className={styles.tokenRow}>
              <code className={styles.tokenName}>{color.var}</code>
              {DESIGN_SYSTEMS.map(({ theme }) => (
                <div key={theme} className={styles.tokenCell} data-theme={theme}>
                  <div
                    className={styles.tokenSwatch}
                    style={{ background: `var(${color.var})` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
