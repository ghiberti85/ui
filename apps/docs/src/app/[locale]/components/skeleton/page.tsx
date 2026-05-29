import { getTranslations } from 'next-intl/server'
import { Skeleton, SkeletonText, SkeletonAvatar } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function SkeletonPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'width', type: 'string | number', defaultValue: '100%', description: 'Width of the skeleton element.' },
    { prop: 'height', type: 'string | number', defaultValue: '1rem', description: 'Height of the skeleton element.' },
    { prop: 'borderRadius', type: 'string | number', defaultValue: 'var(--border-radius-sm)', description: 'Border radius of the skeleton.' },
    { prop: 'className', type: 'string', defaultValue: '—', description: 'Additional CSS class names.' },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Skeleton, SkeletonText, SkeletonAvatar } from '@ghiberti85/ui'

// Basic
<Skeleton width="200px" height="20px" />

// Multi-line text
<SkeletonText lines={3} />

// Avatar placeholder
<SkeletonAvatar size={40} shape="circle" />

// Card skeleton
<div>
  <Skeleton height="160px" />
  <SkeletonText lines={3} />
</div>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Skeleton</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Skeleton</h1>
        <p className={styles.description}>{tc('skeleton_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn} style={{ maxWidth: 400, gap: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SkeletonAvatar size={48} />
            <div style={{ flex: 1 }}><SkeletonText lines={2} /></div>
          </div>
          <Skeleton height="120px" />
          <SkeletonText lines={3} />
          <Skeleton width="120px" height="36px" />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-skeleton--docs"
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
