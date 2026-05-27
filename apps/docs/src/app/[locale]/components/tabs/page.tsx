import { getTranslations } from 'next-intl/server'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function TabsPage() {
  const t = await getTranslations('componentPages')

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const rootProps = [
    { prop: 'defaultValue', type: 'string', defaultValue: '—', description: 'The value of the tab that should be active when initially rendered.' },
    { prop: 'value', type: 'string', defaultValue: '—', description: 'The controlled value of the active tab.' },
    { prop: 'onValueChange', type: '(value: string) => void', defaultValue: '—', description: 'Event handler called when the value changes.' },
    { prop: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'The orientation of the tabs.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS class names.' },
  ]

  const triggerProps = [
    { prop: 'value', type: 'string', defaultValue: '—', description: 'A unique value that associates the trigger with its content panel.' },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'When true, prevents the user from interacting with the tab.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS class names.' },
  ]

  const usageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ghiberti85/ui'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Manage your account settings.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password here.</p>
  </TabsContent>
  <TabsContent value="notifications">
    <p>Configure notification preferences.</p>
  </TabsContent>
</Tabs>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">Components</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Tabs</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Tabs</h1>
        <p className={styles.description}>A set of layered sections of content — known as tab panels — that are displayed one at a time.</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p style={{ padding: '1rem 0', fontSize: '0.875rem' }}>Manage your account settings and preferences.</p>
            </TabsContent>
            <TabsContent value="password">
              <p style={{ padding: '1rem 0', fontSize: '0.875rem' }}>Change your password and security settings.</p>
            </TabsContent>
            <TabsContent value="notifications">
              <p style={{ padding: '1rem 0', fontSize: '0.875rem' }}>Configure how and when you receive notifications.</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Props Tables */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}: Tabs (Root)</h2>
        <PropsTable rows={rootProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}: TabsTrigger</h2>
        <PropsTable rows={triggerProps} headings={headings} />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-tabs--docs"
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
