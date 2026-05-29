'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from '@ghiberti85/ui'
import { Button } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default function DropdownMenuPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'DropdownMenu', type: 'Radix Root', defaultValue: '—', description: 'Root component that controls open/closed state.' },
    { prop: 'DropdownMenuTrigger', type: 'Radix Trigger', defaultValue: '—', description: 'Element that opens the menu when activated.' },
    { prop: 'DropdownMenuContent', type: 'Radix Content', defaultValue: '—', description: 'The floating menu panel.' },
    { prop: 'DropdownMenuItem', type: 'Radix Item', defaultValue: '—', description: 'A single menu item. Supports disabled state.' },
    { prop: 'DropdownMenuLabel', type: 'Radix Label', defaultValue: '—', description: 'Section label inside the menu.' },
    { prop: 'DropdownMenuSeparator', type: 'Radix Separator', defaultValue: '—', description: 'Horizontal divider between menu sections.' },
    { prop: 'DropdownMenuShortcut', type: 'span', defaultValue: '—', description: 'Right-aligned keyboard shortcut hint.' },
    { prop: 'DropdownMenuCheckboxItem', type: 'Radix CheckboxItem', defaultValue: '—', description: 'Checkbox toggle item.' },
    { prop: 'DropdownMenuRadioGroup', type: 'Radix RadioGroup', defaultValue: '—', description: 'Group of radio items.' },
    { prop: 'DropdownMenuRadioItem', type: 'Radix RadioItem', defaultValue: '—', description: 'Single radio option.' },
    { prop: 'DropdownMenuSub', type: 'Radix Sub', defaultValue: '—', description: 'Submenu root.' },
    { prop: 'DropdownMenuSubTrigger', type: 'Radix SubTrigger', defaultValue: '—', description: 'Item that opens a submenu.' },
    { prop: 'DropdownMenuSubContent', type: 'Radix SubContent', defaultValue: '—', description: 'The submenu panel.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuShortcut,
} from '@ghiberti85/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>DropdownMenu</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>DropdownMenu</h1>
        <p className={styles.description}>{tc('dropdown_menu_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-dropdownmenu--docs"
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
