import { getTranslations } from 'next-intl/server'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function CardPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'Card', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_prop_children') },
    { prop: 'CardHeader', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_header_desc') },
    { prop: 'CardTitle', type: '{ children, className, ...HTMLHeadingAttributes }', defaultValue: '—', description: t('card_title_desc') },
    { prop: 'CardDescription', type: '{ children, className, ...HTMLParagraphAttributes }', defaultValue: '—', description: t('card_description_desc') },
    { prop: 'CardContent', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_content_desc') },
    { prop: 'CardFooter', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_footer_desc') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@ghiberti85/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A short description.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Card</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Card</h1>
        <p className={styles.description}>{tc('card_desc')}</p>
      </header>

      {/* Live Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo}>
          <Card style={{ width: 320 }}>
            <CardHeader>
              <CardTitle>{tc('card_title')}</CardTitle>
              <CardDescription>{tc('card_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '0.875rem' }}>{tc('card_content')}</p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </CardFooter>
          </Card>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-card--docs"
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
