import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Timeline } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

const demoItems = [
  { title: 'Project kickoff', date: 'January 2024', description: 'Initial planning and team assembly.', variant: 'default' as const },
  { title: 'Design phase complete', date: 'February 2024', description: 'Wireframes and design system finalized.', variant: 'success' as const },
  { title: 'Deployment warning', date: 'March 2024', description: 'Memory usage exceeded threshold.', variant: 'warning' as const },
  { title: 'Critical bug found', date: 'April 2024', description: 'Data sync issue in production.', variant: 'error' as const },
  { title: 'v1.0 released', date: 'June 2024', variant: 'success' as const },
]

const iconItems = [
  { title: 'Order placed', date: 'Dec 1', icon: '🛒', variant: 'default' as const },
  { title: 'Payment confirmed', date: 'Dec 1', icon: '💳', variant: 'success' as const },
  { title: 'Shipped', date: 'Dec 2', icon: '📦', variant: 'info' as const },
  { title: 'Delivered', date: 'Dec 4', icon: '✅', variant: 'success' as const },
]

export default async function TimelinePage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const itemProps = [
    { prop: 'title', type: 'ReactNode', defaultValue: '—', description: t('timeline_item_prop_title') },
    { prop: 'description', type: 'ReactNode', defaultValue: '—', description: t('timeline_item_prop_description') },
    { prop: 'date', type: 'ReactNode', defaultValue: '—', description: t('timeline_item_prop_date') },
    { prop: 'icon', type: 'ReactNode', defaultValue: '—', description: t('timeline_item_prop_icon') },
    { prop: 'variant', type: '"default" | "success" | "warning" | "error" | "info"', defaultValue: '"default"', description: t('timeline_item_prop_variant') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Timeline } from '@ghiberti85/ui'

<Timeline
  items={[
    {
      title: 'Project started',
      date: 'Jan 2024',
      description: 'Initial planning phase.',
      variant: 'success',
    },
    {
      title: 'Beta launched',
      date: 'Mar 2024',
      icon: '🚀',
      variant: 'info',
    },
    {
      title: 'v1.0 released',
      date: 'Jun 2024',
      variant: 'success',
    },
  ]}
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Timeline</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Timeline</h1>
        <p className={styles.description}>{tc('timeline_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ minWidth: 280 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 12 }}>With variants</p>
            <Timeline items={demoItems} />
          </div>
          <div style={{ minWidth: 220 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 12 }}>With icons</p>
            <Timeline items={iconItems} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Item Props</h2>
        <PropsTable rows={itemProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-timeline--docs"
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
