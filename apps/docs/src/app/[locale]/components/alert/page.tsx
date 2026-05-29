import { getTranslations } from 'next-intl/server'
import { Alert } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function AlertPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'variant', type: "'info' | 'success' | 'warning' | 'error'", defaultValue: "'info'", description: 'Color and icon variant.' },
    { prop: 'title', type: 'string', defaultValue: '—', description: 'Optional title displayed above the content.' },
    { prop: 'icon', type: 'ReactNode | false', defaultValue: 'Built-in SVG', description: 'Override the default icon. Pass false to hide it.' },
    { prop: 'onDismiss', type: '() => void', defaultValue: '—', description: 'Dismiss callback. When provided, shows an X button.' },
    { prop: 'children', type: 'ReactNode', defaultValue: '—', description: 'Alert message content.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Alert } from '@ghiberti85/ui'

// Variants
<Alert variant="info" title="Information">Informational message.</Alert>
<Alert variant="success" title="Success">Saved successfully.</Alert>
<Alert variant="warning" title="Warning">Proceed with caution.</Alert>
<Alert variant="error" title="Error">Something went wrong.</Alert>

// Dismissable
<Alert variant="info" onDismiss={() => setVisible(false)}>
  Click X to dismiss.
</Alert>

// No icon
<Alert variant="success" icon={false}>No icon variant.</Alert>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Alert</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Alert</h1>
        <p className={styles.description}>{tc('alert_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn} style={{ maxWidth: 520, gap: '12px' }}>
          <Alert variant="info" title="Information">This is an informational alert message.</Alert>
          <Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
          <Alert variant="warning" title="Warning">Please review before proceeding.</Alert>
          <Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-alert--docs"
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
