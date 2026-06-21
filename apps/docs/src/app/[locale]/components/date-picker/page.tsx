'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { DatePicker, DateRangePicker } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
}

function DateRangeDemo() {
  const [range, setRange] = React.useState<Parameters<typeof DateRangePicker>[0]['value']>(undefined)
  return <DateRangePicker value={range} onChange={setRange} placeholder="Pick a date range" />
}

export default function DatePickerPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'value', type: 'Date | undefined', defaultValue: '—', description: t('date_picker_prop_value') },
    { prop: 'onChange', type: '(date: Date | undefined) => void', defaultValue: '—', description: t('date_picker_prop_onChange') },
    { prop: 'placeholder', type: 'string', defaultValue: "'Pick a date'", description: t('date_picker_prop_placeholder') },
    { prop: 'dateFormat', type: 'string', defaultValue: "'PPP'", description: t('date_picker_prop_dateFormat') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('date_picker_prop_disabled') },
    { prop: 'disabledDates', type: 'Matcher', defaultValue: '—', description: t('date_picker_prop_disabledDates') },
    { prop: 'fromDate', type: 'Date', defaultValue: '—', description: t('date_picker_prop_fromDate') },
    { prop: 'toDate', type: 'Date', defaultValue: '—', description: t('date_picker_prop_toDate') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { DatePicker, DateRangePicker } from '@ghiberti85/ui'

// Single date
const [date, setDate] = useState<Date | undefined>()
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
  dateFormat="dd/MM/yyyy"
/>

// Date range
const [range, setRange] = useState<{ from?: Date; to?: Date }>()
<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Pick a date range"
/>

// With constraints
<DatePicker
  value={date}
  onChange={setDate}
  fromDate={new Date()}
  disabledDates={{ dayOfWeek: [0, 6] }}
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>DatePicker</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>DatePicker</h1>
        <p className={styles.description}>{tc('date_picker_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Single Date</p>
            <DatePickerDemo />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 280 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Date Range</p>
            <DateRangeDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-datepicker--docs"
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
