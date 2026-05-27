import { getTranslations } from 'next-intl/server'
import { Tooltip, Button, Badge } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function TooltipPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'content', type: 'React.ReactNode', defaultValue: '—', description: t('tooltip_prop_content') },
    { prop: 'children', type: 'React.ReactNode', defaultValue: '—', description: t('tooltip_prop_children') },
    { prop: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: t('tooltip_prop_side') },
    { prop: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: t('tooltip_prop_align') },
    { prop: 'delayDuration', type: 'number', defaultValue: '700', description: t('tooltip_prop_delayDuration') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('tooltip_prop_disabled') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Tooltip, Button } from '@ghiberti85/ui'

// Basic
<Tooltip content="Save document">
  <Button variant="primary">Save</Button>
</Tooltip>

// Sides
<Tooltip content="Left side" side="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Bottom" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

// Custom delay
<Tooltip content="Quick tip" delayDuration={200}>
  <Button>Hover me</Button>
</Tooltip>

// Disabled — renders children without tooltip
<Tooltip content="Won't show" disabled>
  <Button>No tooltip</Button>
</Tooltip>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Tooltip</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Tooltip</h1>
        <p className={styles.description}>{t('tooltip_description')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo}>
          <Tooltip content={t('tooltip_demo_top')} side="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content={t('tooltip_demo_right')} side="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
          <Tooltip content={t('tooltip_demo_bottom')} side="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content={t('tooltip_demo_left')} side="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content={t('tooltip_demo_badge')}>
            <Badge variant="default">{t('tooltip_demo_badge_label')}</Badge>
          </Tooltip>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-tooltip--docs"
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
