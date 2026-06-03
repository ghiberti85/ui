import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './page.module.css'

export default function Home() {
  const t = useTranslations('home')

  const components = [
    'Button', 'Badge', 'Input', 'Textarea', 'Select', 'Checkbox',
    'Radio', 'Switch', 'Card', 'Dialog', 'Tooltip', 'Avatar',
    'Separator', 'Typography', 'Stack', 'Container',
  ]

  const designSystems = [
    {
      key: 'ds-minimal' as const,
      theme: 'ds-minimal',
      name: t('ds_minimal_name'),
      desc: t('ds_minimal_desc'),
      font: 'DM Sans',
      badgeLabel: t('ds_minimal_badge'),
      buttonLabel: t('ds_cta_button'),
    },
    {
      key: 'ds-editorial' as const,
      theme: 'ds-editorial',
      name: t('ds_editorial_name'),
      desc: t('ds_editorial_desc'),
      font: 'Playfair Display',
      badgeLabel: t('ds_editorial_badge'),
      buttonLabel: t('ds_cta_button'),
    },
    {
      key: 'ds-brutalist' as const,
      theme: 'ds-brutalist',
      name: t('ds_brutalist_name'),
      desc: t('ds_brutalist_desc'),
      font: 'Bebas Neue',
      badgeLabel: t('ds_brutalist_badge'),
      buttonLabel: t('ds_cta_button'),
    },
    {
      key: 'ds-velvet' as const,
      theme: 'ds-velvet',
      name: t('ds_velvet_name'),
      desc: t('ds_velvet_desc'),
      font: 'DM Sans',
      badgeLabel: t('ds_velvet_badge'),
      buttonLabel: t('ds_cta_button'),
    },
    {
      key: 'ds-clean' as const,
      theme: 'ds-clean',
      name: t('ds_clean_name'),
      desc: t('ds_clean_desc'),
      font: 'Inter',
      badgeLabel: t('ds_clean_badge'),
      buttonLabel: t('ds_cta_button'),
    },
    {
      key: 'ds-onyx' as const,
      theme: 'ds-onyx',
      name: t('ds_onyx_name'),
      desc: t('ds_onyx_desc'),
      font: 'Inter',
      badgeLabel: t('ds_onyx_badge'),
      buttonLabel: t('ds_cta_button'),
    },
  ]

  const howItWorks = [
    {
      icon: '◉',
      title: t('how_tokens_title'),
      desc: t('how_tokens_desc'),
    },
    {
      icon: '▣',
      title: t('how_components_title'),
      desc: t('how_components_desc'),
    },
    {
      icon: '◈',
      title: t('how_themes_title'),
      desc: t('how_themes_desc'),
    },
  ]

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          {t('title')}
          <span className={styles.titleUnderline} aria-hidden="true" />
        </h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.cta}>
          <Link href="/components" className={styles.ctaPrimary}>
            {t('cta_components')}
          </Link>
          <Link href="/tokens" className={styles.ctaSecondary}>
            {t('cta_tokens')}
          </Link>
        </div>
        <div className={styles.stats}>
          <span className={styles.stat}>{t('stat_components')}</span>
          <span className={styles.statDivider} aria-hidden="true">·</span>
          <span className={styles.stat}>{t('stat_design_systems')}</span>
          <span className={styles.statDivider} aria-hidden="true">·</span>
          <span className={styles.stat}>{t('stat_tests')}</span>
        </div>
      </section>

      {/* ── Design System Showcase ── */}
      <section className={styles.showcase}>
        <h2 className={styles.sectionTitle}>{t('showcase_title')}</h2>
        <div className={styles.showcaseGrid}>
          {designSystems.map((ds) => (
            <Link
              key={ds.key}
              href="/tokens"
              className={styles.dsCard}
              data-theme={ds.theme}
            >
              <div className={styles.dsCardHeader}>
                <span className={styles.dsName}>{ds.name}</span>
                <span className={styles.dsFont}>{ds.font}</span>
              </div>
              <p className={styles.dsDesc}>{ds.desc}</p>

              {/* Mini component preview */}
              <div className={styles.dsPreview}>
                <div className={styles.previewButton}>{ds.buttonLabel}</div>
                <div className={styles.previewBadge}>{ds.badgeLabel}</div>
                <div className={styles.previewInput}>
                  <div className={styles.previewInputLabel}>{t('preview_label')}</div>
                  <div className={styles.previewInputField}>{t('preview_placeholder')}</div>
                </div>
              </div>

              <div className={styles.dsFooter}>
                <span className={styles.dsFontTag}>{ds.font}</span>
                <span className={styles.dsArrow} aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Component Strip ── */}
      <section className={styles.componentStrip}>
        <h2 className={styles.sectionTitle}>{t('strip_title')}</h2>
        <div className={styles.stripRow}>
          {components.map((name) => (
            <span key={name} className={styles.stripPill}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>{t('how_title')}</h2>
        <div className={styles.howGrid}>
          {howItWorks.map((item) => (
            <div key={item.title} className={styles.howCard}>
              <div className={styles.howIcon} aria-hidden="true">{item.icon}</div>
              <h3 className={styles.howCardTitle}>{item.title}</h3>
              <p className={styles.howCardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
