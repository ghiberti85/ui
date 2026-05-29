import { getTranslations } from 'next-intl/server'
import { Spinner } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function SpinnerPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Size of the spinner.' },
    { prop: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost'", defaultValue: "'default'", description: 'Color variant.' },
    { prop: 'label', type: 'string', defaultValue: "'Loading…'", description: 'Accessible label (aria-label).' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Spinner } from '@ghiberti85/ui'

// Default
<Spinner />

// Sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Variants
<Spinner variant="default" />
<Spinner variant="secondary" />
<Spinner variant="outline" />
<Spinner variant="ghost" />

// Custom label
<Spinner label="Saving changes…" />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Spinner</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Spinner</h1>
        <p className={styles.description}>{tc('spinner_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Sizes</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Spinner size="sm" label="Small" />
              <Spinner size="md" label="Medium" />
              <Spinner size="lg" label="Large" />
              <Spinner size="xl" label="Extra Large" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Variants</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Spinner variant="default" label="Default" />
              <Spinner variant="secondary" label="Secondary" />
              <Spinner variant="outline" label="Outline" />
              <Spinner variant="ghost" label="Ghost" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-spinner--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.storybookLink}
        >
          {t('storybook_link')} →
        </a>
      </section>
    </div>
  )
}
