import { getTranslations } from 'next-intl/server'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function AccordionPage() {
  const t = await getTranslations('componentPages')

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const accordionProps = [
    { prop: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: 'Determines whether one or multiple items can be opened at the same time.' },
    { prop: 'collapsible', type: 'boolean', defaultValue: 'false', description: 'When type is "single", allows closing content when clicking the trigger of an open item.' },
    { prop: 'defaultValue', type: 'string | string[]', defaultValue: '—', description: 'The value of the item(s) to expand when initially rendered.' },
    { prop: 'value', type: 'string | string[]', defaultValue: '—', description: 'The controlled value of the expanded item(s).' },
    { prop: 'onValueChange', type: '(value: string | string[]) => void', defaultValue: '—', description: 'Event handler called when the expanded state changes.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS class names.' },
  ]

  const usageCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ghiberti85/ui'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What are design tokens?</AccordionTrigger>
    <AccordionContent>
      Design tokens are the visual design atoms of the design system —
      colors, spacing, typography, and more stored as variables.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
    <AccordionContent>
      Yes. Apply data-mode="dark" to any ancestor element to activate
      the dark palette for that subtree.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">Components</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Accordion</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Accordion</h1>
        <p className={styles.description}>A vertically stacked set of interactive headings that each reveal a section of content.</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn} style={{ maxWidth: 560 }}>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are design tokens?</AccordionTrigger>
              <AccordionContent>
                Design tokens are the visual design atoms of the design system — colors, spacing, typography, and more stored as named variables. They let components stay theme-agnostic by consuming semantic variables like <code>--color-semantic-primary</code>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
              <AccordionContent>
                Yes. Apply <code>data-mode=&quot;dark&quot;</code> to any ancestor element to activate the dark palette for that subtree. All three design systems (minimal, editorial, brutalist) ship with a dark variant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it compatible with any React framework?</AccordionTrigger>
              <AccordionContent>
                Yes. The components are plain React and work with Next.js, Remix, Vite, and any other framework that supports React 18+. Server components can render all non-interactive parts; interactive demos require client boundaries.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Props Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}: Accordion (Root)</h2>
        <PropsTable rows={accordionProps} headings={headings} />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-accordion--docs"
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
