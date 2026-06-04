import { getTranslations } from 'next-intl/server'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@ghiberti85/ui'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import styles from '../[component]/component-page.module.css'

export default async function CardPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'variant', type: '"default" | "elevated" | "ghost" | "filled"', defaultValue: '"default"', description: t('card_variant_desc') },
    { prop: 'orientation', type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: t('card_orientation_desc') },
    { prop: 'hoverable', type: 'boolean', defaultValue: 'false', description: t('card_hoverable_desc') },
    { prop: 'CardHeader', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_header_desc') },
    { prop: 'CardTitle', type: '{ children, className, ...HTMLHeadingAttributes }', defaultValue: '—', description: t('card_title_desc') },
    { prop: 'CardDescription', type: '{ children, className, ...HTMLParagraphAttributes }', defaultValue: '—', description: t('card_description_desc') },
    { prop: 'CardContent', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_content_desc') },
    { prop: 'CardFooter', type: '{ children, className, ...HTMLDivAttributes }', defaultValue: '—', description: t('card_footer_desc') },
    { prop: 'CardImage › src', type: 'string', defaultValue: '—', description: t('card_image_src_desc') },
    { prop: 'CardImage › alt', type: 'string', defaultValue: '—', description: t('card_image_alt_desc') },
    { prop: 'CardImage › aspectRatio', type: '"16/9" | "4/3" | "1/1" | "3/4"', defaultValue: '"16/9"', description: t('card_image_aspect_desc') },
    { prop: 'CardImage › position', type: '"top" | "left" | "right" | "background"', defaultValue: '"top"', description: t('card_image_position_desc') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import {
  Card, CardImage,
  CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from '@ghiberti85/ui'

{/* Default card */}
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description.</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>

{/* Media card */}
<Card>
  <CardImage src="/cover.jpg" alt="Cover" aspectRatio="16/9" />
  <CardHeader>
    <CardTitle>Media Card</CardTitle>
  </CardHeader>
  <CardContent>Content below image.</CardContent>
</Card>

{/* Horizontal card */}
<Card orientation="horizontal">
  <CardImage src="/thumb.jpg" alt="Thumb" position="left" />
  <CardContent>Horizontal layout content.</CardContent>
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

      {/* Live Demo — Variants */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
          {(['default', 'elevated', 'ghost', 'filled'] as const).map((variant) => (
            <Card key={variant} variant={variant} style={{ width: 260 }}>
              <CardHeader>
                <CardTitle style={{ textTransform: 'capitalize' }}>{variant}</CardTitle>
                <CardDescription>variant=&quot;{variant}&quot;</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>{tc('card_content')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hoverable */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hoverable</h2>
        <div className={styles.demo}>
          <Card hoverable style={{ width: 320 }}>
            <CardHeader>
              <CardTitle>Hoverable Card</CardTitle>
              <CardDescription>Hover to see the lift effect.</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>Pass <code>hoverable</code> to enable the hover animation.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Media card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Media Card</h2>
        <div className={styles.demo}>
          <Card style={{ width: 320 }}>
            <CardImage src="https://picsum.photos/seed/docs-card/640/360" alt="Sample photo" aspectRatio="16/9" />
            <CardHeader>
              <CardTitle>Media Card</CardTitle>
              <CardDescription>Image at the top with content below.</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>Use <code>CardImage</code> before <code>CardHeader</code>.</p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Horizontal */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Horizontal Layout</h2>
        <div className={styles.demo}>
          <Card orientation="horizontal" style={{ maxWidth: 520 }}>
            <CardImage src="https://picsum.photos/seed/horiz/400/600" alt="Thumbnail" position="left" />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardHeader>
                <CardTitle>Horizontal Card</CardTitle>
                <CardDescription>Image on the left, content on the right.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>Pass <code>orientation=&quot;horizontal&quot;</code> and <code>position=&quot;left&quot;</code>.</p>
              </CardContent>
            </div>
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
