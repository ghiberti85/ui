'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Slider } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function SliderDemo() {
  const [value, setValue] = React.useState(40)
  return (
    <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Slider value={value} onChange={setValue} aria-label="Volume" />
      <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Value: {value}</p>
    </div>
  )
}

function SliderMarksDemo() {
  const [value, setValue] = React.useState(50)
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <Slider
        value={value}
        onChange={setValue}
        step={25}
        marks={[
          { value: 0, label: '0' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 75, label: '75' },
          { value: 100, label: '100' },
        ]}
        aria-label="Level"
      />
    </div>
  )
}

export default function SliderPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'value', type: 'number', defaultValue: '—', description: t('slider_prop_value') },
    { prop: 'defaultValue', type: 'number', defaultValue: '0', description: t('slider_prop_defaultValue') },
    { prop: 'min', type: 'number', defaultValue: '0', description: t('slider_prop_min') },
    { prop: 'max', type: 'number', defaultValue: '100', description: t('slider_prop_max') },
    { prop: 'step', type: 'number', defaultValue: '1', description: t('slider_prop_step') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('slider_prop_disabled') },
    { prop: 'marks', type: 'SliderMark[]', defaultValue: '—', description: t('slider_prop_marks') },
    { prop: 'onChange', type: '(value: number) => void', defaultValue: '—', description: t('slider_prop_onChange') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Slider } from '@ghiberti85/ui'

const [value, setValue] = useState(40)

// Basic
<Slider value={value} onChange={setValue} aria-label="Volume" />

// With marks and step
<Slider
  value={value}
  onChange={setValue}
  step={25}
  marks={[
    { value: 0, label: '0' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ]}
  aria-label="Level"
/>

// Disabled
<Slider defaultValue={60} disabled aria-label="Disabled" />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Slider</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Slider</h1>
        <p className={styles.description}>{tc('slider_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow} style={{ flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Basic</p>
            <SliderDemo />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>With Marks</p>
            <SliderMarksDemo />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Disabled</p>
            <Slider defaultValue={60} disabled aria-label="Disabled slider" />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-slider--docs"
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
