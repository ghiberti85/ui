import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { ComboboxDemo } from '@/components/demos/ComboboxDemo'
import styles from '../[component]/component-page.module.css'

export default async function ComboboxPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'options', type: '{ value, label, disabled? }[]', defaultValue: '[]', description: t('combobox_prop_options') },
    { prop: 'value', type: 'string', defaultValue: '—', description: t('combobox_prop_value') },
    { prop: 'onChange', type: '(value: string) => void', defaultValue: '—', description: t('combobox_prop_onChange') },
    { prop: 'placeholder', type: 'string', defaultValue: "'Select...'", description: t('combobox_prop_placeholder') },
    { prop: 'searchPlaceholder', type: 'string', defaultValue: "'Search...'", description: t('combobox_prop_searchPlaceholder') },
    { prop: 'emptyText', type: 'string', defaultValue: "'No results found.'", description: t('combobox_prop_emptyText') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('combobox_prop_disabled') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Combobox } from '@ghiberti85/ui'

const [value, setValue] = useState('')

<Combobox
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte', disabled: true },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select a framework..."
  searchPlaceholder="Search..."
  emptyText="No results found."
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Combobox</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Combobox</h1>
        <p className={styles.description}>{tc('combobox_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow}>
          <ComboboxDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-combobox--docs"
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
