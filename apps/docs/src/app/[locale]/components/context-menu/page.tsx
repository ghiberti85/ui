import type { CSSProperties } from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
} from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

const triggerBoxStyle: CSSProperties = {
  width: 280,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed var(--color-semantic-border)',
  borderRadius: 8,
  color: 'var(--color-semantic-foreground-muted)',
  fontSize: '0.875rem',
  userSelect: 'none',
  cursor: 'context-menu',
}

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={triggerBoxStyle}>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Edit</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show line numbers</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>
          Delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default async function ContextMenuPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'children', type: 'React.ReactNode', defaultValue: '—', description: 'Content shown inside the menu.' },
    { prop: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '—', description: 'Callback when the menu opens or closes.' },
  ]

  const itemProps = [
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables the item.' },
    { prop: 'onSelect', type: '(e: Event) => void', defaultValue: '—', description: 'Called when the item is selected.' },
    { prop: 'inset', type: 'boolean', defaultValue: 'false', description: 'Adds left padding to align with checkbox/radio items.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '@ghiberti85/ui'

<ContextMenu>
  <ContextMenuTrigger>
    <div>Right-click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>File</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem>
      New File <ContextMenuShortcut>⌘N</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuCheckboxItem checked>Show toolbar</ContextMenuCheckboxItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Option A</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>ContextMenu</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>ContextMenu</h1>
        <p className={styles.description}>{tc('context_menu_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow}>
          <ContextMenuDemo />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ContextMenuContent Props</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ContextMenuItem Props</h2>
        <PropsTable rows={itemProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-contextmenu--docs"
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
