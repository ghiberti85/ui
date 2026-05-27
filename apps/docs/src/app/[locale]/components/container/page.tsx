import { getTranslations } from 'next-intl/server'
import { Container, Text } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function ContainerPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'lg'", description: t('container_prop_size') },
    { prop: 'as', type: 'React.ElementType', defaultValue: "'div'", description: t('container_prop_as') },
    { prop: 'children', type: 'React.ReactNode', defaultValue: '—', description: t('container_prop_children') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Container } from '@ghiberti85/ui'

// Default (lg — 1024px max)
<Container>
  <p>Page content</p>
</Container>

// Small container
<Container size="sm">
  <p>Narrow form or article</p>
</Container>

// Full width
<Container size="full">
  <p>Full-bleed layout</p>
</Container>

// As a semantic element
<Container as="main" size="lg">
  {children}
</Container>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Container</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Container</h1>
        <p className={styles.description}>{tc('container_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Container
              key={size}
              size={size}
              style={{
                border: '1px dashed var(--color-semantic-border)',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius-sm)',
              }}
            >
              <Text size="sm">{tc(`container_${size}` as 'container_sm')}</Text>
            </Container>
          ))}
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/layout-container--docs"
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
