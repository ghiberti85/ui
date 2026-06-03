'use client'

import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import styles from './ThemeSwitcher.module.css'

const THEMES = [
  { value: 'ds-minimal',   label: 'Minimal' },
  { value: 'ds-editorial', label: 'Editorial' },
  { value: 'ds-brutalist', label: 'Brutalist' },
  { value: 'ds-financas',  label: 'Finanças do Casal' },
  { value: 'ds-dil',       label: 'DIL — DevInterviewLab' },
  { value: 'ds-icc',       label: 'ICC — Interview Command Center' },
] as const

export default function ThemeSwitcher() {
  const t = useTranslations('theme_switcher')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.setAttribute('data-theme', e.target.value)
  }, [])

  return (
    <div className={styles.wrapper}>
      <label htmlFor="theme-select" className={styles.label}>{t('label')}</label>
      <select id="theme-select" className={styles.select} onChange={handleChange} defaultValue="ds-minimal">
        {THEMES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}
