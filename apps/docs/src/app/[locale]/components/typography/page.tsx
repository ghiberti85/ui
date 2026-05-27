import { getTranslations } from 'next-intl/server'
import { Heading, Text, Label, Code } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function TypographyPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const headingProps = [
    { prop: 'as', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", defaultValue: "'h2'", description: t('heading_prop_as') },
    { prop: 'size', type: "'4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md'", defaultValue: "'2xl'", description: t('heading_prop_size') },
  ]

  const textProps = [
    { prop: 'as', type: "'p' | 'span' | 'div'", defaultValue: "'p'", description: t('text_prop_as') },
    { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: t('text_prop_size') },
    { prop: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'", defaultValue: "'regular'", description: t('text_prop_weight') },
    { prop: 'color', type: "'default' | 'muted'", defaultValue: "'default'", description: t('text_prop_color') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Heading, Text, Label, Code } from '@ghiberti85/ui'

// Heading
<Heading as="h1" size="4xl">Page title</Heading>
<Heading as="h2" size="2xl">Section</Heading>

// Text
<Text size="md">Body copy</Text>
<Text size="sm" color="muted">Helper text</Text>
<Text size="lg" weight="semibold">Emphasised</Text>

// Label (for forms)
<Label htmlFor="email">Email address</Label>
<Label required>Password</Label>

// Code
<Text>Call <Code>render()</Code> to mount.</Text>
<Code block>{'const x = 42'}</Code>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Typography</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Typography</h1>
        <p className={styles.description}>{tc('typography_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div>
            <Text size="xs" color="muted" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>
              {tc('typography_heading_label')}
            </Text>
            <Heading as="h1" size="4xl">{tc('typography_sample_h1')}</Heading>
            <Heading as="h2" size="3xl">{tc('typography_sample_h2')}</Heading>
            <Heading as="h3" size="2xl">{tc('typography_sample_h3')}</Heading>
            <Heading as="h4" size="xl">{tc('typography_sample_h4')}</Heading>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Text size="xs" color="muted" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>
              {tc('typography_text_label')}
            </Text>
            <Text size="xl">{tc('typography_text_xl')}</Text>
            <Text size="lg">{tc('typography_text_lg')}</Text>
            <Text size="md">{tc('typography_text_md')}</Text>
            <Text size="sm">{tc('typography_text_sm')}</Text>
            <Text size="xs">{tc('typography_text_xs')}</Text>
            <Label>{tc('typography_label_example')}</Label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Text size="xs" color="muted" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>
              {tc('typography_code_label')}
            </Text>
            <Text size="sm">Inline: <Code>{tc('typography_code_inline')}</Code></Text>
            <Code block>{tc('typography_code_block')}</Code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('heading_props_title')}</h2>
        <PropsTable rows={headingProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('text_props_title')}</h2>
        <PropsTable rows={textProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-typography--docs"
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
