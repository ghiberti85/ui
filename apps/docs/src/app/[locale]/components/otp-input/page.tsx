'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { OTPInput } from '@ghiberti85/ui'
import styles from '../[component]/component-page.module.css'

export default function OTPInputPage() {
  const t = useTranslations('componentPages')
  const tc = useTranslations('components')

  const props = [
    { prop: 'length', type: 'number', defaultValue: '6', description: t('otp_input_prop_length') },
    { prop: 'value', type: 'string', defaultValue: '—', description: t('otp_input_prop_value') },
    { prop: 'onChange', type: '(value: string) => void', defaultValue: '—', description: t('otp_input_prop_onChange') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('otp_input_prop_disabled') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('otp_input_prop_error') },
    { prop: 'autoFocus', type: 'boolean', defaultValue: 'false', description: t('otp_input_prop_autoFocus') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { OTPInput } from '@ghiberti85/ui'

// 6-digit default
<OTPInput onChange={(val) => console.log(val)} />

// 4-digit PIN
<OTPInput length={4} />

// With error
<OTPInput error="Invalid verification code" />

// Controlled
const [code, setCode] = useState('')
<OTPInput value={code} onChange={setCode} />`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>OTPInput</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>OTPInput</h1>
        <p className={styles.description}>{tc('otp_input_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <OTPInput length={6} />
          <OTPInput length={4} />
          <OTPInput length={6} error="Invalid code. Please try again." />
          <OTPInput length={6} disabled value="123456" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={props} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-otpinput--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.storybookLink}
        >
          {t('storybook_link')} →
        </a>
      </section>
    </div>
  )
}
