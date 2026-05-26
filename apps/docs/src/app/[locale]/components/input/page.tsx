import { getTranslations } from 'next-intl/server'
import { Input } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function InputPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'label', type: 'string', defaultValue: '—', description: t('input_prop_label') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('input_prop_error') },
    { prop: 'helperText', type: 'string', defaultValue: '—', description: t('input_prop_helperText') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('input_prop_disabled') },
    { prop: 'placeholder', type: 'string', defaultValue: '—', description: t('input_prop_placeholder') },
    { prop: 'id', type: 'string', defaultValue: '—', description: t('input_prop_id') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Input } from '@ghiberti85/ui'

// Default
<Input label="Email" id="email" placeholder="you@example.com" />

// With error
<Input
  label="Email"
  id="email-error"
  placeholder="you@example.com"
  error="Please enter a valid email address."
/>

// Disabled
<Input label="Email (disabled)" placeholder="you@example.com" disabled />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Input</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Input</h1>
        <p className={styles.description}>{tc('input_desc')}</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn} style={{ maxWidth: 400 }}>
          <Input label={tc('input_label_default')} id="input-demo-default" placeholder={tc('input_placeholder')} />
          <Input label={tc('input_label_error')} id="input-demo-error" placeholder={tc('input_placeholder')} error={tc('input_error_msg')} />
          <Input label={tc('input_label_disabled')} id="input-demo-disabled" placeholder={tc('input_placeholder')} disabled />
        </div>
      </section>

      {/* Props Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      {/* Usage */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      {/* Storybook */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-input--docs"
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
