'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import ThemeSwitcher from './ThemeSwitcher'
import LocaleSwitcher from './LocaleSwitcher'
import ModeToggle from './ModeToggle'
import styles from './BottomNav.module.css'

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}

function TokensIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="10" height="2.5" rx="1.25"/>
      <rect x="3" y="10.75" width="7" height="2.5" rx="1.25"/>
      <rect x="3" y="16.5" width="13" height="2.5" rx="1.25"/>
      <circle cx="19" cy="6.25" r="2.25" fill="currentColor" stroke="none" opacity="0.7"/>
    </svg>
  )
}

function ComponentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

export default function BottomNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const close = () => setSettingsOpen(false)

  // Close sheet on route change
  useEffect(() => {
    close()
  }, [pathname])

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (settingsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [settingsOpen])

  const homeActive = isActive('/') && !isActive('/tokens') && !isActive('/components') && !isActive('/getting-started') && !isActive('/playground') && !isActive('/tokens/motion')

  return (
    <>
      {/* Overlay */}
      {settingsOpen && (
        <div
          className={styles.overlay}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`${styles.sheet} ${settingsOpen ? styles.sheetOpen : ''}`}
        role="dialog"
        aria-label={t('settings')}
        aria-modal="true"
      >
        <div className={styles.sheetHandle} aria-hidden="true" />

        <div className={styles.sheetHeader}>
          <span className={styles.sheetTitle}>{t('settings')}</span>
          <button className={styles.sheetClose} onClick={close} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.sheetLinks}>
          <Link href="/getting-started" className={`${styles.sheetLink} ${isActive('/getting-started') ? styles.sheetLinkActive : ''}`} onClick={close}>
            {t('getting_started')}
          </Link>
          <Link href="/tokens/motion" className={`${styles.sheetLink} ${isActive('/tokens/motion') ? styles.sheetLinkActive : ''}`} onClick={close}>
            {t('motion_tokens')}
          </Link>
          <Link href="/playground" className={`${styles.sheetLink} ${isActive('/playground') ? styles.sheetLinkActive : ''}`} onClick={close}>
            {t('playground')}
          </Link>
          <a href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com" className={styles.sheetLink} target="_blank" rel="noopener noreferrer" onClick={close}>
            {t('storybook')}
          </a>
          <a href="https://github.com/ghiberti85/ui" className={styles.sheetLink} target="_blank" rel="noopener noreferrer" onClick={close}>
            {t('github')}
          </a>
        </div>

        <div className={styles.sheetControls}>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Theme</span>
            <ThemeSwitcher />
          </div>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Lang</span>
            <LocaleSwitcher />
          </div>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Mode</span>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <Link
          href="/"
          className={`${styles.tab} ${homeActive ? styles.tabActive : ''}`}
          onClick={close}
        >
          <span className={styles.tabIndicator} aria-hidden="true" />
          <HomeIcon />
          <span className={styles.tabLabel}>{t('home')}</span>
        </Link>

        <Link
          href="/tokens"
          className={`${styles.tab} ${isActive('/tokens') ? styles.tabActive : ''}`}
          onClick={close}
        >
          <span className={styles.tabIndicator} aria-hidden="true" />
          <TokensIcon />
          <span className={styles.tabLabel}>{t('tokens')}</span>
        </Link>

        <Link
          href="/components"
          className={`${styles.tab} ${isActive('/components') ? styles.tabActive : ''}`}
          onClick={close}
        >
          <span className={styles.tabIndicator} aria-hidden="true" />
          <ComponentsIcon />
          <span className={styles.tabLabel}>{t('components')}</span>
        </Link>

        <button
          className={`${styles.tab} ${settingsOpen ? styles.tabActive : ''}`}
          onClick={() => setSettingsOpen((v) => !v)}
          aria-label={t('settings')}
          aria-expanded={settingsOpen}
        >
          <span className={styles.tabIndicator} aria-hidden="true" />
          <SettingsIcon />
          <span className={styles.tabLabel}>{t('settings')}</span>
        </button>
      </nav>
    </>
  )
}
