import { getTranslations } from 'next-intl/server'
import { Avatar } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../component-page.module.css'

export default async function AvatarPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'src', type: 'string', defaultValue: '—', description: t('avatar_prop_src') },
    { prop: 'alt', type: 'string', defaultValue: '—', description: t('avatar_prop_alt') },
    { prop: 'fallback', type: 'string', defaultValue: '—', description: t('avatar_prop_fallback') },
    { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: t('avatar_prop_size') },
    { prop: 'shape', type: "'circle' | 'square'", defaultValue: "'circle'", description: t('avatar_prop_shape') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Avatar } from '@ghiberti85/ui'

// With image
<Avatar src="/avatar.jpg" alt="Fernando Ghiberti" size="md" />

// With explicit fallback initials
<Avatar fallback="FG" size="md" />

// Auto-initials from alt text
<Avatar alt="Fernando Ghiberti" size="md" />
// → renders "FG"

// Sizes
<Avatar fallback="FG" size="xs" />
<Avatar fallback="FG" size="sm" />
<Avatar fallback="FG" size="md" />
<Avatar fallback="FG" size="lg" />
<Avatar fallback="FG" size="xl" />

// Square shape
<Avatar fallback="FG" shape="square" size="md" />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Avatar</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Avatar</h1>
        <p className={styles.description}>{t('avatar_description')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-semantic-foreground-muted)', display: 'block', marginBottom: '0.75rem' }}>
              {t('avatar_group_sizes')}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Avatar fallback="FG" size="xs" />
              <Avatar fallback="FG" size="sm" />
              <Avatar fallback="FG" size="md" />
              <Avatar fallback="FG" size="lg" />
              <Avatar fallback="FG" size="xl" />
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-semantic-foreground-muted)', display: 'block', marginBottom: '0.75rem' }}>
              {t('avatar_group_shapes')}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Avatar fallback="FG" size="lg" shape="circle" />
              <Avatar fallback="FG" size="lg" shape="square" />
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-semantic-foreground-muted)', display: 'block', marginBottom: '0.75rem' }}>
              {t('avatar_group_auto_initials')}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Avatar alt="Fernando Ghiberti" size="md" />
              <Avatar alt="Alice" size="md" />
              <Avatar alt="Bob Smith" size="md" />
            </div>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-avatar--docs"
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
