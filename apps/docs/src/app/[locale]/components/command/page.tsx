'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function CommandDemo() {
  return (
    <Command style={{ width: '100%', maxWidth: 420 }}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">📅 Calendar</CommandItem>
          <CommandItem value="search">🔍 Search</CommandItem>
          <CommandItem value="settings">⚙️ Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">
            📄 New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="open">
            📂 Open
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          background: 'var(--color-semantic-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--border-radius-md)',
          fontFamily: 'var(--typography-font-family-sans)',
          fontSize: '0.875rem',
        }}
      >
        Open Command Palette (⌘K)
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="home">🏠 Home</CommandItem>
            <CommandItem value="components">🧩 Components</CommandItem>
            <CommandItem value="tokens">🎨 Tokens</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default function CommandPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

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
