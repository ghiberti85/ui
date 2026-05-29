import { getTranslations } from 'next-intl/server'
import { Progress } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function ProgressPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'value', type: 'number', defaultValue: '0', description: 'Current progress value (0–max).' },
    { prop: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Height of the progress bar.' },
    { prop: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", defaultValue: "'default'", description: 'Color variant.' },
    { prop: 'aria-label', type: 'string', defaultValue: "'Progress'", description: 'Accessible label.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Progress } from '@ghiberti85/ui'

// Default
<Progress value={60} />

// Variants
<Progress value={80} variant="success" />
<Progress value={40} variant="warning" />
<Progress value={25} variant="error" />
<Progress value={70} variant="info" />

// Sizes
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Progress</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Progress</h1>
        <p className={styles.description}>{tc('progress_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn} style={{ maxWidth: 480, gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Variants</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Progress value={60} variant="default" aria-label="Default" />
              <Progress value={80} variant="success" aria-label="Success" />
              <Progress value={40} variant="warning" aria-label="Warning" />
              <Progress value={25} variant="error" aria-label="Error" />
              <Progress value={70} variant="info" aria-label="Info" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '0.75rem', opacity: 0.6 }}>Sizes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Progress value={60} size="sm" aria-label="Small" />
              <Progress value={60} size="md" aria-label="Medium" />
              <Progress value={60} size="lg" aria-label="Large" />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-progress--docs"
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
