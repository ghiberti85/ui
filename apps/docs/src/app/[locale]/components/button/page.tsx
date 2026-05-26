import { getTranslations } from 'next-intl/server'
import { Button } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function ButtonPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive'", defaultValue: "'primary'", description: t('button_prop_variant') },
    { prop: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", defaultValue: "'md'", description: t('button_prop_size') },
    { prop: 'loading', type: 'boolean', defaultValue: 'false', description: t('button_prop_loading') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('button_prop_disabled') },
    { prop: 'asChild', type: 'boolean', defaultValue: 'false', description: t('button_prop_asChild') },
    { prop: 'onClick', type: '(e: React.MouseEvent) => void', defaultValue: '—', description: t('button_prop_onClick') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Button } from '@ghiberti85/ui'

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading…</Button>
<Button disabled>Disabled</Button>

// As link (asChild)
<Button asChild><a href="/about">About</a></Button>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Button</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Button</h1>
        <p className={styles.description}>{tc('button_desc')}</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div className={styles.demoGroup}>
            <span className={styles.demoGroupLabel}>{t('button_group_variants')}</span>
            <div className={styles.demoRow}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          <div className={styles.demoGroup}>
            <span className={styles.demoGroupLabel}>{t('button_group_sizes')}</span>
            <div className={styles.demoRow}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
          <div className={styles.demoGroup}>
            <span className={styles.demoGroupLabel}>{t('button_group_states')}</span>
            <div className={styles.demoRow}>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      {/* Usage */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      {/* Storybook */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-button--docs"
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
