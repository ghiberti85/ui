'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Rating } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function RatingDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Rating value={value} onChange={setValue} />
      <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>
        Rating: {value} / 5
      </p>
    </div>
  )
}

export default function RatingPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'value', type: 'number', defaultValue: '—', description: t('rating_prop_value') },
    { prop: 'defaultValue', type: 'number', defaultValue: '0', description: t('rating_prop_defaultValue') },
    { prop: 'max', type: 'number', defaultValue: '5', description: t('rating_prop_max') },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: t('rating_prop_size') },
    { prop: 'readOnly', type: 'boolean', defaultValue: 'false', description: t('rating_prop_readOnly') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('rating_prop_disabled') },
    { prop: 'onChange', type: '(value: number) => void', defaultValue: '—', description: t('rating_prop_onChange') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Rating } from '@ghiberti85/ui'

const [value, setValue] = useState(3)

// Interactive
<Rating value={value} onChange={setValue} />

// Read-only
<Rating value={4} readOnly />

// Sizes
<Rating value={3} size="sm" readOnly />
<Rating value={3} size="md" readOnly />
<Rating value={3} size="lg" readOnly />

// Custom max
<Rating value={7} max={10} readOnly />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Rating</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Rating</h1>
        <p className={styles.description}>{tc('rating_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <RatingDemo />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Rating value={3} size="sm" readOnly />
            <Rating value={3} size="md" readOnly />
            <Rating value={3} size="lg" readOnly />
          </div>
          <Rating value={2} disabled />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-rating--docs"
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
