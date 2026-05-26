import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { DialogPageDemo } from '../[component]/DialogPageDemo'
import styles from '../[component]/component-page.module.css'

export default async function DialogPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'Dialog', type: 'RadixDialog.RootProps', defaultValue: '—', description: t('dialog_root_desc') },
    { prop: 'DialogTrigger', type: 'RadixDialog.TriggerProps', defaultValue: '—', description: t('dialog_trigger_desc') },
    { prop: 'DialogContent', type: '{ children, className, ...RadixDialog.ContentProps }', defaultValue: '—', description: t('dialog_content_desc') },
    { prop: 'DialogHeader', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('dialog_header_desc') },
    { prop: 'DialogTitle', type: '{ children, className, ...RadixDialog.TitleProps }', defaultValue: '—', description: t('dialog_title_desc') },
    { prop: 'DialogDescription', type: '{ children, className, ...RadixDialog.DescriptionProps }', defaultValue: '—', description: t('dialog_description_desc') },
    { prop: 'DialogFooter', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('dialog_footer_desc') },
    { prop: 'DialogClose', type: 'RadixDialog.CloseProps', defaultValue: '—', description: t('dialog_close_desc') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@ghiberti85/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="primary">Confirm</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Dialog</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Dialog</h1>
        <p className={styles.description}>{tc('dialog_desc')}</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo}>
          <DialogPageDemo
            triggerLabel={tc('dialog_trigger')}
            title={tc('dialog_title')}
            description={tc('dialog_description')}
            cancelLabel={tc('dialog_cancel')}
            confirmLabel={tc('dialog_confirm')}
          />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-dialog--docs"
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
