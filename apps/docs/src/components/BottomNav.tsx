'use client'

import { useState } from 'react'
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

export default function BottomNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Settings panel */}
      {settingsOpen && (
        <div className={styles.settingsPanel} role="dialog" aria-label={t('settings')}>
          <div className={styles.settingsPanelInner}>
            <ThemeSwitcher />
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>
      )}

      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <Link
          href="/"
          className={`${styles.tab} ${isActive('/') ? styles.tabActive : ''}`}
          onClick={() => setSettingsOpen(false)}
        >
          <HomeIcon />
          <span className={styles.tabLabel}>{t('home')}</span>
        </Link>

        <Link
          href="/tokens"
          className={`${styles.tab} ${isActive('/tokens') ? styles.tabActive : ''}`}
          onClick={() => setSettingsOpen(false)}
        >
          <TokensIcon />
          <span className={styles.tabLabel}>{t('tokens')}</span>
        </Link>

        <Link
          href="/components"
          className={`${styles.tab} ${isActive('/components') ? styles.tabActive : ''}`}
          onClick={() => setSettingsOpen(false)}
        >
          <ComponentsIcon />
          <span className={styles.tabLabel}>{t('components')}</span>
        </Link>

        <button
          className={`${styles.tab} ${settingsOpen ? styles.tabActive : ''}`}
          onClick={() => setSettingsOpen((v) => !v)}
          aria-label={t('settings')}
          aria-expanded={settingsOpen}
        >
          <SettingsIcon />
          <span className={styles.tabLabel}>{t('settings')}</span>
        </button>
      </nav>
    </>
  )
}
