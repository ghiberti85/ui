import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { EmptyStateDemo } from '@/components/demos/EmptyStateDemo'
import styles from '../[component]/component-page.module.css'

export default async function EmptyStatePage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'title', type: 'string', defaultValue: '—', description: 'Main heading (required).' },
    { prop: 'description', type: 'string', defaultValue: '—', description: 'Supporting text below the title.' },
    { prop: 'variant', type: "'default' | 'search' | 'error' | 'no-results'", defaultValue: "'default'", description: 'Selects the built-in icon and implied context.' },
    { prop: 'icon', type: 'React.ReactNode', defaultValue: '—', description: 'Custom icon that overrides the built-in variant icon.' },
    { prop: 'action', type: '{ label: string; onClick: () => void }', defaultValue: '—', description: 'Primary action button rendered below the description.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Extra CSS class on the root element.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { EmptyState } from '@ghiberti85/ui'

// Default
<EmptyState
  title="No content yet"
  description="Get started by creating your first item."
  action={{ label: 'Create item', onClick: () => {} }}
/>

// Search empty state
<EmptyState
  variant="search"
  title="No results found"
  description="Try adjusting your search terms."
  action={{ label: 'Clear search', onClick: () => setQuery('') }}
/>

// Error state
<EmptyState
  variant="error"
  title="Something went wrong"
  description="We couldn't load this content."
  action={{ label: 'Retry', onClick: () => refetch() }}
/>

// Custom icon
<EmptyState
  icon={<MyIcon />}
  title="Inbox empty"
  description="You're all caught up!"
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>EmptyState</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>EmptyState</h1>
        <p className={styles.description}>{tc('empty_state_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <EmptyStateDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-emptystate--docs"
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
