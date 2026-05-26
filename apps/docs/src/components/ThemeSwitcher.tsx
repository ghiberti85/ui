'use client'

import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import styles from './ThemeSwitcher.module.css'

const THEMES = ['ds-minimal', 'ds-editorial', 'ds-brutalist'] as const

export default function ThemeSwitcher() {
  const t = useTranslations('theme_switcher')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.setAttribute('data-theme', e.target.value)
  }, [])

  return (
    <div className={styles.wrapper}>
      <label htmlFor="theme-select" className={styles.label}>{t('label')}</label>
      <select id="theme-select" className={styles.select} onChange={handleChange} defaultValue="ds-minimal">
        {THEMES.map((theme) => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
    </div>
  )
}
