import { getTranslations } from 'next-intl/server'
import { Button, Badge, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@ghiberti85/ui'
import styles from './page.module.css'

export default async function ComponentsPage() {
  const t = await getTranslations('components')

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      {/* Button */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Button</h2>
        <p className={styles.componentDesc}>{t('button_desc')}</p>
        <div className={styles.demo}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <code className={styles.importLine}>import {'{ Button }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Badge */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Badge</h2>
        <p className={styles.componentDesc}>{t('badge_desc')}</p>
        <div className={styles.demo}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <code className={styles.importLine}>import {'{ Badge }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Input */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Input</h2>
        <p className={styles.componentDesc}>{t('input_desc')}</p>
        <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', maxWidth: 360 }}>
          <Input label={t('input_label_default')} placeholder={t('input_placeholder')} />
          <Input label={t('input_label_error')} placeholder={t('input_placeholder')} error={t('input_error_msg')} />
          <Input label={t('input_label_disabled')} placeholder={t('input_placeholder')} disabled />
        </div>
        <code className={styles.importLine}>import {'{ Input }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>

      {/* Card */}
      <section className={styles.section}>
        <h2 className={styles.componentName}>Card</h2>
        <p className={styles.componentDesc}>{t('card_desc')}</p>
        <div className={styles.demo} style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Card style={{ width: 280 }}>
            <CardHeader>
              <CardTitle>{t('card_title')}</CardTitle>
              <CardDescription>{t('card_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '0.875rem' }}>{t('card_content')}</p>
            </CardContent>
          </Card>
        </div>
        <code className={styles.importLine}>import {'{ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }'} from &apos;@ghiberti85/ui&apos;</code>
      </section>
    </div>
  )
}
