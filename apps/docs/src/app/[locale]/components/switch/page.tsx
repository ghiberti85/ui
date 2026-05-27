import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { SwitchDemo } from '@/components/demos/FormDemos'
import styles from '../component-page.module.css'

export default async function SwitchPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'label', type: 'string', defaultValue: '—', description: t('switch_prop_label') },
    { prop: 'description', type: 'string', defaultValue: '—', description: t('switch_prop_description') },
    { prop: 'checked', type: 'boolean', defaultValue: '—', description: t('switch_prop_checked') },
    { prop: 'onCheckedChange', type: '(checked: boolean) => void', defaultValue: '—', description: t('switch_prop_onCheckedChange') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('switch_prop_disabled') },
    { prop: 'id', type: 'string', defaultValue: '—', description: t('switch_prop_id') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Switch } from '@ghiberti85/ui'

// Basic
<Switch id="darkMode" label="Dark mode" />

// With description
<Switch
  id="beta"
  label="Beta features"
  description="Enable experimental features. May be unstable."
/>

// Controlled
<Switch
  id="notif"
  label="Notifications"
  checked={enabled}
  onCheckedChange={setEnabled}
/>

// Disabled
<Switch id="airplane" label="Airplane mode" disabled />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Switch</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Switch</h1>
        <p className={styles.description}>{tc('switch_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <SwitchDemo
            labelOff={tc('switch_off')}
            labelOn={tc('switch_on')}
            labelWithDesc={tc('switch_with_desc_label')}
            descWithDesc={tc('switch_with_desc_desc')}
            labelDisabled={tc('switch_disabled')}
          />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-switch--docs"
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
