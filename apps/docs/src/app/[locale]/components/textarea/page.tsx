import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { TextareaDemo } from '@/components/demos/FormDemos'
import styles from '../component-page.module.css'

export default async function TextareaPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'label', type: 'string', defaultValue: '—', description: t('textarea_prop_label') },
    { prop: 'helperText', type: 'string', defaultValue: '—', description: t('textarea_prop_helperText') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('textarea_prop_error') },
    { prop: 'rows', type: 'number', defaultValue: '4', description: t('textarea_prop_rows') },
    { prop: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", defaultValue: "'vertical'", description: t('textarea_prop_resize') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('textarea_prop_disabled') },
    { prop: 'placeholder', type: 'string', defaultValue: '—', description: t('textarea_prop_placeholder') },
    { prop: 'id', type: 'string', defaultValue: '—', description: t('textarea_prop_id') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Textarea } from '@ghiberti85/ui'

// Basic
<Textarea id="bio" label="Bio" placeholder="Tell us about yourself" />

// With helper text
<Textarea id="notes" label="Notes" helperText="Max 500 characters" />

// With error
<Textarea id="msg" label="Message" error="Message is required" />

// Disabled
<Textarea id="msg" label="Message" disabled />

// Custom rows and resize
<Textarea id="desc" label="Description" rows={6} resize="none" />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Textarea</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Textarea</h1>
        <p className={styles.description}>{tc('textarea_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <TextareaDemo
            labelDefault={tc('textarea_label_default')}
            labelError={tc('textarea_label_error')}
            labelDisabled={tc('textarea_label_disabled')}
            placeholder={tc('textarea_placeholder')}
            errorMsg={tc('textarea_error_msg')}
            helperText={tc('textarea_helper_text')}
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-textarea--docs"
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
