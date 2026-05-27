'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
        ghiberti85/ui
      </Link>

      {/* Desktop links */}
      <div className={styles.links}>
        <Link href="/tokens" className={styles.link}>{t('tokens')}</Link>
        <Link href="/components" className={styles.link}>{t('components')}</Link>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com"
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          {t('storybook')}
        </a>
        <a
          href="https://github.com/ghiberti85/ui"
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          {t('github')}
        </a>
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className={styles.hamburger}
        aria-label={open ? t('menu_close') : t('menu_open')}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
        <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
        <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className={styles.mobileMenu} role="menu">
          <Link href="/tokens" className={styles.mobileLink} onClick={() => setOpen(false)}>
            {t('tokens')}
          </Link>
          <Link href="/components" className={styles.mobileLink} onClick={() => setOpen(false)}>
            {t('components')}
          </Link>
          <a
            href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com"
            className={styles.mobileLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            {t('storybook')}
          </a>
          <a
            href="https://github.com/ghiberti85/ui"
            className={styles.mobileLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            {t('github')}
          </a>
        </div>
      )}
    </nav>
  )
}
