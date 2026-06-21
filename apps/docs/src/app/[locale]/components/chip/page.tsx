'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Chip } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

function ChipRemovableDemo() {
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'CSS'])
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Chip key={tag} variant="secondary" onRemove={() => setTags(tags.filter((t) => t !== tag))}>
          {tag}
        </Chip>
      ))}
    </div>
  )
}

export default function ChipPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'variant', type: "'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'", defaultValue: "'default'", description: t('chip_prop_variant') },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: t('chip_prop_size') },
    { prop: 'onRemove', type: '() => void', defaultValue: '—', description: t('chip_prop_onRemove') },
    { prop: 'removeLabel', type: 'string', defaultValue: "'Remove'", description: t('chip_prop_removeLabel') },
    { prop: 'icon', type: 'React.ReactNode', defaultValue: '—', description: t('chip_prop_icon') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('chip_prop_disabled') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Chip } from '@ghiberti85/ui'

// Basic
<Chip>React</Chip>

// Variants
<Chip variant="success">Active</Chip>
<Chip variant="destructive">Error</Chip>
<Chip variant="outline">Draft</Chip>

// Removable
const [tags, setTags] = useState(['React', 'TypeScript'])
{tags.map(tag => (
  <Chip
    key={tag}
    variant="secondary"
    onRemove={() => setTags(tags.filter(t => t !== tag))}
  >
    {tag}
  </Chip>
))}

// Sizes
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Chip</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Chip</h1>
        <p className={styles.description}>{tc('chip_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip variant="default">Default</Chip>
            <Chip variant="secondary">Secondary</Chip>
            <Chip variant="success">Success</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="destructive">Destructive</Chip>
            <Chip variant="outline">Outline</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
          <ChipRemovableDemo />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-chip--docs"
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
