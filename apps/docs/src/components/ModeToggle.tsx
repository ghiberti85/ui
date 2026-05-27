'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './ModeToggle.module.css'

const STORAGE_KEY = 'docs-color-mode'

export default function ModeToggle() {
  const t = useTranslations('mode_toggle')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved !== null ? saved === 'dark' : prefersDark
    document.documentElement.setAttribute('data-mode', isDark ? 'dark' : '')
    // localStorage is SSR-unavailable so this must run in an effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-mode', next ? 'dark' : '')
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
  }

  return (
    <button
      className={styles.button}
      onClick={toggle}
      aria-label={dark ? t('light') : t('dark')}
      title={dark ? t('light') : t('dark')}
    >
      {dark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
