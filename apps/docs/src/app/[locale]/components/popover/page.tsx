import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { PopoverDemo } from './PopoverDemo'
import styles from '../[component]/component-page.module.css'

export default async function PopoverPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'bottom'", description: 'Side of the trigger to render the popover.' },
    { prop: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment of the popover relative to the trigger.' },
    { prop: 'sideOffset', type: 'number', defaultValue: '8', description: 'Distance from the trigger in pixels.' },
    { prop: 'showArrow', type: 'boolean', defaultValue: 'false', description: 'Show an arrow pointing to the trigger.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@ghiberti85/ui'

<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="center" showArrow>
    <p>Popover content goes here.</p>
    <PopoverClose asChild>
      <Button variant="ghost" size="sm">Close</Button>
    </PopoverClose>
  </PopoverContent>
</Popover>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Popover</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Popover</h1>
        <p className={styles.description}>{tc('popover_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo}>
          <PopoverDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-popover--docs"
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
