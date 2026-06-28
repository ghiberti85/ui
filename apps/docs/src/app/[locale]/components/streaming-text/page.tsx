import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { StreamingText } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default async function StreamingTextPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'text', type: 'string', defaultValue: '—', description: t('streaming_text_prop_text') },
    { prop: 'speed', type: 'number', defaultValue: '30', description: t('streaming_text_prop_speed') },
    { prop: 'cursor', type: 'boolean', defaultValue: 'true', description: t('streaming_text_prop_cursor') },
    { prop: 'cursorChar', type: 'string', defaultValue: "'▋'", description: t('streaming_text_prop_cursorChar') },
    { prop: 'onComplete', type: '() => void', defaultValue: '—', description: t('streaming_text_prop_onComplete') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { StreamingText } from '@ghiberti85/ui'

// Basic usage
<StreamingText text="Hello, world!" />

// Custom speed and cursor
<StreamingText text="Fast stream" speed={10} cursorChar="|" />

// No cursor
<StreamingText text="No cursor" cursor={false} />

// With completion callback
<StreamingText
  text="Done!"
  onComplete={() => console.log('finished')}
/>

// Simulated LLM streaming
const [text, setText] = useState('')
// Update text as chunks arrive from your API
<StreamingText text={text} speed={1} />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>StreamingText</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>StreamingText</h1>
        <p className={styles.description}>{tc('streaming_text_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <p style={{ fontSize: '1.125rem' }}>
            <StreamingText text="The quick brown fox jumps over the lazy dog." speed={40} />
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            <StreamingText text="Faster stream at 10ms per character." speed={10} />
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            <StreamingText text="Custom pipe cursor." speed={40} cursorChar="|" />
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            <StreamingText text="No cursor shown here." speed={40} cursor={false} />
          </p>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-streamingtext--docs"
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
