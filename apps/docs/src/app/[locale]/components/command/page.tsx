import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { CommandDemo, CommandDialogDemo } from '@/components/demos/CommandDemos'
import styles from '../[component]/component-page.module.css'

export default async function CommandPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'children', type: 'ReactNode', defaultValue: '—', description: t('command_prop_children') },
    { prop: 'value', type: 'string', defaultValue: '—', description: t('command_prop_value') },
    { prop: 'onValueChange', type: '(value: string) => void', defaultValue: '—', description: t('command_prop_onValueChange') },
  ]

  const dialogProps = [
    { prop: 'open', type: 'boolean', defaultValue: '—', description: t('command_dialog_prop_open') },
    { prop: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '—', description: t('command_dialog_prop_onOpenChange') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  Command, CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
  CommandSeparator, CommandShortcut,
} from '@ghiberti85/ui'

// Inline panel
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem value="new">New File <CommandShortcut>⌘N</CommandShortcut></CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

// Dialog palette (⌘K)
const [open, setOpen] = useState(false)
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem value="home">Home</CommandItem>
  </CommandList>
</CommandDialog>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Command</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Command</h1>
        <p className={styles.description}>{tc('command_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <CommandDemo />
          <CommandDialogDemo />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Command Props</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CommandDialog Props</h2>
        <PropsTable rows={dialogProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-command--docs"
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
