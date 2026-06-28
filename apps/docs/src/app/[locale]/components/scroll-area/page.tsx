import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { ScrollArea } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function ScrollAreaVerticalDemo() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  return (
    <ScrollArea style={{ height: 200, width: 280, border: '1px solid var(--color-semantic-border)', borderRadius: 8, padding: 12 }}>
      {items.map((item) => (
        <div key={item} style={{ padding: '6px 0', fontSize: '0.875rem', borderBottom: '1px solid var(--color-semantic-border)', color: 'var(--color-semantic-foreground)' }}>
          {item}
        </div>
      ))}
    </ScrollArea>
  )
}

function ScrollAreaHorizontalDemo() {
  const tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Radix UI', 'Storybook', 'Vitest', 'Turborepo']
  return (
    <ScrollArea orientation="horizontal" style={{ width: 280, border: '1px solid var(--color-semantic-border)', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
        {tags.map((tag) => (
          <span key={tag} style={{ padding: '4px 12px', background: 'var(--color-semantic-background-subtle)', borderRadius: 999, fontSize: '0.8125rem', whiteSpace: 'nowrap', color: 'var(--color-semantic-foreground)' }}>
            {tag}
          </span>
        ))}
      </div>
    </ScrollArea>
  )
}

export default async function ScrollAreaPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'orientation', type: "'vertical' | 'horizontal' | 'both'", defaultValue: "'vertical'", description: 'Which scrollbar(s) to render.' },
    { prop: 'children', type: 'React.ReactNode', defaultValue: '—', description: 'Scrollable content.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Extra CSS class on the root element.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { ScrollArea } from '@ghiberti85/ui'

// Vertical (default)
<ScrollArea style={{ height: 200 }}>
  {items.map(i => <div key={i}>{i}</div>)}
</ScrollArea>

// Horizontal
<ScrollArea orientation="horizontal" style={{ width: 300 }}>
  <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
    {tags.map(t => <span key={t}>{t}</span>)}
  </div>
</ScrollArea>

// Both axes
<ScrollArea orientation="both" style={{ height: 200, width: 300 }}>
  <div style={{ width: 600, height: 600 }}>Large content</div>
</ScrollArea>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>ScrollArea</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>ScrollArea</h1>
        <p className={styles.description}>{tc('scroll_area_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '0.8125rem', color: 'var(--color-semantic-foreground-muted)' }}>Vertical</p>
            <ScrollAreaVerticalDemo />
          </div>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '0.8125rem', color: 'var(--color-semantic-foreground-muted)' }}>Horizontal</p>
            <ScrollAreaHorizontalDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-scrollarea--docs"
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
