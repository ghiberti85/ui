import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { ToastDemo } from '@/components/demos/ToastDemo'
import styles from '../[component]/component-page.module.css'

export default async function ToastPage() {
  const t = await getTranslations('componentPages')

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const toastProps = [
    { prop: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info'", defaultValue: "'default'", description: 'Visual style of the toast, conveying intent.' },
    { prop: 'duration', type: 'number', defaultValue: '4000', description: 'Duration in milliseconds before the toast auto-dismisses.' },
    { prop: 'title', type: 'string', defaultValue: '—', description: 'Bold heading text displayed at the top of the toast.' },
    { prop: 'description', type: 'string', defaultValue: '—', description: 'Supporting text displayed below the title.' },
  ]

  const usageCode = `// 1. Add <Toaster /> once at the app root (e.g. layout.tsx)
import { Toaster } from '@ghiberti85/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// 2. Use the hook in any client component
'use client'
import { useToast, Button } from '@ghiberti85/ui'

export function MyComponent() {
  const { toast } = useToast()

  return (
    <Button onClick={() => toast({
      title: 'Saved!',
      description: 'Your changes have been saved.',
      variant: 'success',
    })}>
      Save
    </Button>
  )
}`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">Components</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Toast</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Toast</h1>
        <p className={styles.description}>A succinct message that is displayed temporarily, providing brief feedback about an operation.</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>
            Click a button below to trigger each toast variant.
          </p>
          <ToastDemo />
        </div>
      </section>

      {/* Props Table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}: Toast</h2>
        <PropsTable rows={toastProps} headings={headings} />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-toast--docs"
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
