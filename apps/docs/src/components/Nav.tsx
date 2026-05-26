import { useTranslations } from 'next-intl'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
  const t = useTranslations('nav')

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>ghiberti85/ui</Link>
      <div className={styles.links}>
        <Link href="/tokens" className={styles.link}>{t('tokens')}</Link>
        <Link href="/components" className={styles.link}>{t('components')}</Link>
        <a
          href="https://github.com/ghiberti85/ui"
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          {t('github')}
        </a>
      </div>
    </nav>
  )
}
