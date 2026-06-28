import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default async function AlertDialogPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'AlertDialog', type: 'Radix Root', defaultValue: '—', description: 'Root component that controls open/closed state.' },
    { prop: 'AlertDialogTrigger', type: 'Radix Trigger', defaultValue: '—', description: 'Element that opens the dialog.' },
    { prop: 'AlertDialogContent', type: 'Radix Content', defaultValue: '—', description: 'The modal panel with overlay.' },
    { prop: 'AlertDialogTitle', type: 'Radix Title', defaultValue: '—', description: 'Accessible title of the dialog.' },
    { prop: 'AlertDialogDescription', type: 'Radix Description', defaultValue: '—', description: 'Accessible description of the dialog.' },
    { prop: 'AlertDialogAction', type: 'Radix Action', defaultValue: '—', description: 'Confirm/proceed button. Closes the dialog.' },
    { prop: 'AlertDialogCancel', type: 'Radix Cancel', defaultValue: '—', description: 'Cancel button. Closes the dialog without action.' },
    { prop: 'variant (Action)', type: "'default' | 'destructive'", defaultValue: "'default'", description: t('alert_dialog_prop_variant') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from '@ghiberti85/ui'

// Default
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Open</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Destructive variant
<AlertDialogAction variant="destructive">Delete</AlertDialogAction>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>AlertDialog</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>AlertDialog</h1>
        <p className={styles.description}>{tc('alert_dialog_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoRow}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Open Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>This will permanently delete your account.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-alertdialog--docs"
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
