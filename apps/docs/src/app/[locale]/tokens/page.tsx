import { useTranslations } from 'next-intl'
import styles from './page.module.css'

const DESIGN_SYSTEMS = [
  { key: 'ds_minimal', theme: 'ds-minimal', accent: '#2563eb' },
  { key: 'ds_editorial', theme: 'ds-editorial', accent: '#b45309' },
  { key: 'ds_brutalist', theme: 'ds-brutalist', accent: '#dc2626' },
] as const

export default function TokensPage() {
  const t = useTranslations('tokens')

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <div className={styles.grid}>
        {DESIGN_SYSTEMS.map(({ key, theme, accent }) => (
          <div key={theme} className={styles.card} data-theme={theme}>
            <div className={styles.swatch} style={{ background: accent }} />
            <h2 className={styles.dsName}>{t(key)}</h2>
            <code className={styles.themeAttr}>data-theme=&quot;{theme}&quot;</code>
            <div className={styles.preview}>
              <span className={styles.previewText}>Aa</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
