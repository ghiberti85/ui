import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { TagInputDemo, TagInputMaxDemo, TagInputDisabledDemo } from '@/components/demos/TagInputDemo'
import styles from '../[component]/component-page.module.css'

export default async function TagInputPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'value', type: 'string[]', defaultValue: '—', description: t('tag_input_prop_value') },
    { prop: 'onChange', type: '(tags: string[]) => void', defaultValue: '—', description: t('tag_input_prop_onChange') },
    { prop: 'placeholder', type: 'string', defaultValue: "'Add tag…'", description: t('tag_input_prop_placeholder') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('tag_input_prop_disabled') },
    { prop: 'maxTags', type: 'number', defaultValue: '—', description: t('tag_input_prop_maxTags') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { TagInput } from '@ghiberti85/ui'

const [tags, setTags] = useState(['React', 'TypeScript'])

<TagInput value={tags} onChange={setTags} placeholder="Add tag…" />

// With max limit
<TagInput maxTags={5} value={tags} onChange={setTags} />

// Disabled
<TagInput disabled value={['React']} />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>TagInput</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>TagInput</h1>
        <p className={styles.description}>{tc('tag_input_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400, alignItems: 'stretch' }}>
          <TagInputDemo />
          <TagInputMaxDemo />
          <TagInputDisabledDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-taginput--docs"
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
