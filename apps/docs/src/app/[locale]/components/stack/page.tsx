import { getTranslations } from 'next-intl/server'
import { Stack, Badge } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function StackPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'direction', type: "'horizontal' | 'vertical'", defaultValue: "'vertical'", description: t('stack_prop_direction') },
    { prop: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', defaultValue: '0', description: t('stack_prop_gap') },
    { prop: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", defaultValue: "'stretch'", description: t('stack_prop_align') },
    { prop: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", defaultValue: "'start'", description: t('stack_prop_justify') },
    { prop: 'wrap', type: 'boolean', defaultValue: 'false', description: t('stack_prop_wrap') },
    { prop: 'as', type: 'React.ElementType', defaultValue: "'div'", description: t('stack_prop_as') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Stack } from '@ghiberti85/ui'

// Vertical stack
<Stack direction="vertical" gap={4}>
  <Badge>Item 1</Badge>
  <Badge>Item 2</Badge>
  <Badge>Item 3</Badge>
</Stack>

// Horizontal stack with alignment
<Stack direction="horizontal" gap={3} align="center">
  <Badge>Left</Badge>
  <Badge>Center</Badge>
  <Badge>Right</Badge>
</Stack>

// Wrapping horizontal stack
<Stack direction="horizontal" gap={2} wrap>
  {items.map(item => <Badge key={item}>{item}</Badge>)}
</Stack>

// As a semantic element
<Stack as="ul" direction="vertical" gap={2}>
  <li>Item 1</li>
  <li>Item 2</li>
</Stack>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Stack</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Stack</h1>
        <p className={styles.description}>{tc('stack_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-semantic-foreground-muted)' }}>
              {tc('stack_vertical_label')}
            </span>
            <Stack direction="vertical" gap={3} style={{ marginTop: '0.5rem' }}>
              <Badge variant="default">{tc('stack_item')} 1</Badge>
              <Badge variant="secondary">{tc('stack_item')} 2</Badge>
              <Badge variant="outline">{tc('stack_item')} 3</Badge>
            </Stack>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-semantic-foreground-muted)' }}>
              {tc('stack_horizontal_label')}
            </span>
            <Stack direction="horizontal" gap={4} align="center" style={{ marginTop: '0.5rem' }}>
              <Badge variant="default">{tc('stack_item')} 1</Badge>
              <Badge variant="secondary">{tc('stack_item')} 2</Badge>
              <Badge variant="outline">{tc('stack_item')} 3</Badge>
            </Stack>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/layout-stack--docs"
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
