'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Pagination } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function PaginationDemo() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={20} onPageChange={setPage} />
}

function PaginationWithFirstLast() {
  const [page, setPage] = React.useState(5)
  return <Pagination page={page} totalPages={20} onPageChange={setPage} showFirstLast />
}

export default function PaginationPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'page', type: 'number', defaultValue: '—', description: t('pagination_prop_page') },
    { prop: 'totalPages', type: 'number', defaultValue: '—', description: t('pagination_prop_totalPages') },
    { prop: 'onPageChange', type: '(page: number) => void', defaultValue: '—', description: t('pagination_prop_onPageChange') },
    { prop: 'siblingCount', type: 'number', defaultValue: '1', description: t('pagination_prop_siblingCount') },
    { prop: 'showFirstLast', type: 'boolean', defaultValue: 'false', description: t('pagination_prop_showFirstLast') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Pagination } from '@ghiberti85/ui'

const [page, setPage] = useState(1)

// Basic
<Pagination page={page} totalPages={10} onPageChange={setPage} />

// With first/last buttons
<Pagination
  page={page}
  totalPages={50}
  onPageChange={setPage}
  siblingCount={1}
  showFirstLast
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Pagination</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Pagination</h1>
        <p className={styles.description}>{tc('pagination_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div className={styles.demoGroup}>
            <span className={styles.demoGroupLabel}>Default (20 pages)</span>
            <PaginationDemo />
          </div>
          <div className={styles.demoGroup}>
            <span className={styles.demoGroupLabel}>With First/Last buttons</span>
            <PaginationWithFirstLast />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-pagination--docs"
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
