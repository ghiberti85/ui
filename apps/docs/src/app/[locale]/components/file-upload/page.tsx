import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { FileUpload } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default async function FileUploadPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'accept', type: 'string', defaultValue: '—', description: t('file_upload_prop_accept') },
    { prop: 'multiple', type: 'boolean', defaultValue: 'false', description: t('file_upload_prop_multiple') },
    { prop: 'maxSize', type: 'number', defaultValue: '—', description: t('file_upload_prop_maxSize') },
    { prop: 'maxFiles', type: 'number', defaultValue: '—', description: t('file_upload_prop_maxFiles') },
    { prop: 'onFilesChange', type: '(files: FileUploadFile[]) => void', defaultValue: '—', description: t('file_upload_prop_onFilesChange') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('file_upload_prop_disabled') },
    { prop: 'label', type: 'string', defaultValue: "'Drop files here or click to upload'", description: t('file_upload_prop_label') },
    { prop: 'hint', type: 'string', defaultValue: '—', description: t('file_upload_prop_hint') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('file_upload_prop_error') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { FileUpload, FileUploadFile } from '@ghiberti85/ui'

const [files, setFiles] = useState<FileUploadFile[]>([])

// Basic
<FileUpload onFilesChange={setFiles} />

// Images only, max 5MB
<FileUpload
  accept="image/*"
  multiple
  maxSize={5_000_000}
  maxFiles={10}
  label="Upload images"
  hint="PNG, JPG, GIF up to 5MB"
  onFilesChange={setFiles}
/>

// Access file data
files.forEach(({ file, id, preview }) => {
  console.log(file.name, file.size)
})`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>FileUpload</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>FileUpload</h1>
        <p className={styles.description}>{tc('file_upload_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 440 }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 8 }}>Single file</p>
            <FileUpload label="Drop a file here or click to upload" hint="Any file type" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 8 }}>Multiple images, max 2MB</p>
            <FileUpload
              accept="image/*"
              multiple
              maxSize={2_000_000}
              maxFiles={4}
              label="Upload images"
              hint="PNG, JPG up to 2MB"
            />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-fileupload--docs"
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
