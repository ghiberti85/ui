'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function HoverCardDemo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href="#"
          style={{ color: 'var(--color-semantic-primary)', textDecoration: 'underline', fontWeight: 600 }}
          onClick={(e) => e.preventDefault()}
        >
          @ghiberti85
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <strong style={{ color: 'var(--color-semantic-foreground)' }}>Fernando Ghiberti</strong>
          <span style={{ color: 'var(--color-semantic-foreground-muted)', fontSize: '0.875rem' }}>
            Senior Full-Stack Engineer & Front-End Tech Lead
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function HoverCardArrowDemo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <button
          style={{
            padding: '8px 16px',
            background: 'var(--color-semantic-primary)',
            color: 'var(--color-semantic-primary-foreground)',
            border: 'none',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
          }}
        >
          Hover for info
        </button>
      </HoverCardTrigger>
      <HoverCardContent showArrow>
        <p style={{ margin: 0, color: 'var(--color-semantic-foreground)' }}>
          This card has an arrow pointing to the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default function HoverCardPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'sideOffset', type: 'number', defaultValue: '8', description: t('hover_card_prop_sideOffset') },
    { prop: 'showArrow', type: 'boolean', defaultValue: 'false', description: t('hover_card_prop_showArrow') },
    { prop: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: t('hover_card_prop_align') },
    { prop: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'bottom'", description: t('hover_card_prop_side') },
    { prop: 'openDelay', type: 'number', defaultValue: '700', description: t('hover_card_prop_openDelay') },
    { prop: 'closeDelay', type: 'number', defaultValue: '300', description: t('hover_card_prop_closeDelay') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@ghiberti85/ui'

<HoverCard openDelay={200}>
  <HoverCardTrigger asChild>
    <a href="#">@username</a>
  </HoverCardTrigger>
  <HoverCardContent showArrow>
    <p>User profile info here</p>
  </HoverCardContent>
</HoverCard>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>HoverCard</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>HoverCard</h1>
        <p className={styles.description}>{tc('hover_card_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <HoverCardDemo />
          <HoverCardArrowDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-hovercard--docs"
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
