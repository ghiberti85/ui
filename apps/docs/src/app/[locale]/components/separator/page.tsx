import { getTranslations } from 'next-intl/server'
import { Separator, Text } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function SeparatorPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: t('separator_prop_orientation') },
    { prop: 'decorative', type: 'boolean', defaultValue: 'true', description: t('separator_prop_decorative') },
    { prop: 'className', type: 'string', defaultValue: '—', description: t('separator_prop_className') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Separator } from '@ghiberti85/ui'

// Horizontal (default)
<div>
  <Text>Section A</Text>
  <Separator />
  <Text>Section B</Text>
</div>

// Vertical — use inside a flex row
<div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>

// Semantic (not decorative) — announced to screen readers
<Separator decorative={false} />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Separator</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Separator</h1>
        <p className={styles.description}>{tc('separator_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div>
            <Text size="sm" color="muted">{t('separator_demo_horizontal')}</Text>
            <div style={{ marginTop: '0.75rem' }}>
              <Text size="sm">{tc('separator_before')}</Text>
              <Separator />
              <Text size="sm">{tc('separator_after')}</Text>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Text size="sm" color="muted">{t('separator_demo_vertical')}</Text>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, gap: '0.75rem', marginTop: '0.75rem' }}>
              <Text size="sm">{tc('separator_before')}</Text>
              <Separator orientation="vertical" />
              <Text size="sm">{tc('separator_after')}</Text>
            </div>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-separator--docs"
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
