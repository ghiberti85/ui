import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { CheckboxDemo } from '@/components/demos/FormDemos'
import styles from '../component-page.module.css'

export default async function CheckboxPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'label', type: 'string', defaultValue: '—', description: t('checkbox_prop_label') },
    { prop: 'description', type: 'string', defaultValue: '—', description: t('checkbox_prop_description') },
    { prop: 'checked', type: "boolean | 'indeterminate'", defaultValue: '—', description: t('checkbox_prop_checked') },
    { prop: 'onCheckedChange', type: "(checked: boolean | 'indeterminate') => void", defaultValue: '—', description: t('checkbox_prop_onCheckedChange') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('checkbox_prop_disabled') },
    { prop: 'id', type: 'string', defaultValue: '—', description: t('checkbox_prop_id') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Checkbox } from '@ghiberti85/ui'

// Basic
<Checkbox id="terms" label="Accept terms and conditions" />

// With description
<Checkbox
  id="marketing"
  label="Marketing emails"
  description="Receive updates about new features."
/>

// Indeterminate
<Checkbox id="all" label="Select all" checked="indeterminate" />

// Controlled
<Checkbox
  id="notif"
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>

// Disabled
<Checkbox id="opt" label="Unavailable option" disabled />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Checkbox</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Checkbox</h1>
        <p className={styles.description}>{tc('checkbox_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <CheckboxDemo
            labelUnchecked={tc('checkbox_unchecked')}
            labelChecked={tc('checkbox_checked')}
            labelIndeterminate={tc('checkbox_indeterminate')}
            labelDisabled={tc('checkbox_disabled')}
            descChecked={tc('checkbox_checked_desc')}
          />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-checkbox--docs"
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
