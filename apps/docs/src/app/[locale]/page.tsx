import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './page.module.css'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <p className={styles.description}>{t('description')}</p>
      <div className={styles.cta}>
        <Link href="/components" className={styles.ctaPrimary}>
          {t('cta_components')}
        </Link>
        <Link href="/tokens" className={styles.ctaSecondary}>
          {t('cta_tokens')}
        </Link>
      </div>
    </div>
  )
}
