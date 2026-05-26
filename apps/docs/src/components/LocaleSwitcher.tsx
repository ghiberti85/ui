'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTransition } from 'react'
import styles from './LocaleSwitcher.module.css'

export default function LocaleSwitcher() {
  const t = useTranslations('locale_switcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as (typeof routing.locales)[number]
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="locale-select" className={styles.label}>{t('label')}</label>
      <select
        id="locale-select"
        className={styles.select}
        value={locale}
        onChange={handleChange}
        disabled={isPending}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'en' ? 'EN' : 'PT-BR'}
          </option>
        ))}
      </select>
    </div>
  )
}
