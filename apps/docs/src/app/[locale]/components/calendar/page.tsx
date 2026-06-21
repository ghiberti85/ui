'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Calendar } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <Calendar mode="single" selected={date} onSelect={setDate} />
      {date && (
        <p style={{ fontSize: '0.875rem', color: 'var(--color-semantic-foreground-muted)' }}>
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

function CalendarRangeDemo() {
  const [range, setRange] = React.useState<Parameters<typeof Calendar>[0]['selected']>(undefined)
  return <Calendar mode="range" selected={range} onSelect={setRange} />
}

export default function CalendarPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'mode', type: '"single" | "multiple" | "range"', defaultValue: '"single"', description: t('calendar_prop_mode') },
    { prop: 'selected', type: 'Date | Date[] | DateRange', defaultValue: '—', description: t('calendar_prop_selected') },
    { prop: 'onSelect', type: '(date) => void', defaultValue: '—', description: t('calendar_prop_onSelect') },
    { prop: 'disabled', type: 'Date | Date[] | Matcher', defaultValue: '—', description: t('calendar_prop_disabled') },
    { prop: 'showOutsideDays', type: 'boolean', defaultValue: 'true', description: t('calendar_prop_showOutsideDays') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Calendar } from '@ghiberti85/ui'

// Single date
const [date, setDate] = useState<Date | undefined>()
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<{ from?: Date; to?: Date }>()
<Calendar mode="range" selected={range} onSelect={setRange} />

// Multiple dates
const [dates, setDates] = useState<Date[]>()
<Calendar mode="multiple" selected={dates} onSelect={setDates} />

// Disable weekends
<Calendar mode="single" disabled={{ dayOfWeek: [0, 6] }} />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Calendar</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Calendar</h1>
        <p className={styles.description}>{tc('calendar_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 8 }}>Single</p>
            <CalendarDemo />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 8 }}>Range</p>
            <CalendarRangeDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-calendar--docs"
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
