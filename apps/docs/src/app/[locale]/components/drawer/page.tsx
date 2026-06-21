'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>This is the drawer description.</DrawerDescription>
          </DrawerHeader>
          <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--color-semantic-foreground)' }}>
            <p>Drawer body content goes here.</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function DrawerLeftDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Left Side</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent side="left">
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
            <DrawerDescription>Slides in from the left.</DrawerDescription>
          </DrawerHeader>
          <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--color-semantic-foreground)' }}>
            <p>Navigation or settings panel.</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default function DrawerPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'side', type: "'left' | 'right' | 'top' | 'bottom'", defaultValue: "'right'", description: t('drawer_prop_side') },
    { prop: 'open', type: 'boolean', defaultValue: '—', description: t('drawer_prop_open') },
    { prop: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '—', description: t('drawer_prop_onOpenChange') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  Drawer, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription,
  DrawerFooter, DrawerClose
} from '@ghiberti85/ui'

const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <div>Body content</div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="secondary">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Drawer</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Drawer</h1>
        <p className={styles.description}>{tc('drawer_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ gap: 12, flexWrap: 'wrap' }}>
          <DrawerDemo />
          <DrawerLeftDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-drawer--docs"
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
