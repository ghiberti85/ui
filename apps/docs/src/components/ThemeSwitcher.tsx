'use client'

import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import styles from './ThemeSwitcher.module.css'

const THEMES = [
  { value: 'ds-editorial', label: 'Editorial' },
  { value: 'ds-brutalist', label: 'Brutalist' },
  { value: 'ds-velvet', label: 'Velvet' },
  { value: 'ds-clean',  label: 'Clean' },
  { value: 'ds-onyx',   label: 'Onyx' },
] as const

export default function ThemeSwitcher() {
  const t = useTranslations('theme_switcher')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.setAttribute('data-theme', e.target.value)
  }, [])

  return (
    <div className={styles.wrapper}>
      <label htmlFor="theme-select" className={styles.label}>{t('label')}</label>
      <select id="theme-select" className={styles.select} onChange={handleChange} defaultValue="ds-editorial">
        {THEMES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}
