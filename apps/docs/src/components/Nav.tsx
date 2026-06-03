'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const t = useTranslations('nav')

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        ghiberti85/ui
      </Link>

      <div className={styles.links}>
        <Link href="/getting-started" className={styles.link}>{t('getting_started')}</Link>
        <Link href="/tokens" className={styles.link}>{t('tokens')}</Link>
        <Link href="/tokens/motion" className={styles.link}>{t('motion_tokens')}</Link>
        <Link href="/components" className={styles.link}>{t('components')}</Link>
        <Link href="/playground" className={styles.link}>{t('playground')}</Link>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('storybook')}
        </a>
        <a
          href="https://github.com/ghiberti85/ui"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('github')}
        </a>
      </div>
    </nav>
  )
}
