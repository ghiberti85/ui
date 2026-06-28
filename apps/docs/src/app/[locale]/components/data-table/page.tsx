import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { DataTable } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status' },
]

const data = [
  { name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { name: 'Bob Smith', role: 'Designer', status: 'Inactive' },
  { name: 'Charlie Brown', role: 'Manager', status: 'Active' },
]

export default async function DataTablePage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'columns', type: 'DataTableColumn[]', defaultValue: '—', description: t('data_table_prop_columns') },
    { prop: 'data', type: 'T[]', defaultValue: '—', description: t('data_table_prop_data') },
    { prop: 'searchable', type: 'boolean', defaultValue: 'false', description: t('data_table_prop_searchable') },
    { prop: 'searchPlaceholder', type: 'string', defaultValue: "'Search…'", description: t('data_table_prop_searchPlaceholder') },
    { prop: 'emptyMessage', type: 'string', defaultValue: "'No results.'", description: t('data_table_prop_emptyMessage') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { DataTable } from '@ghiberti85/ui'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', render: (val) => <span>{String(val)}</span> },
]

const data = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Inactive' },
]

<DataTable columns={columns} data={data} searchable />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>DataTable</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>DataTable</h1>
        <p className={styles.description}>{tc('data_table_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ width: '100%' }}>
          <DataTable columns={columns} data={data} searchable searchPlaceholder="Search…" />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-datatable--docs"
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
