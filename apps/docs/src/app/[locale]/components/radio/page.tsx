import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { RadioGroupDemo } from '@/components/demos/FormDemos'
import styles from '../component-page.module.css'

export default async function RadioPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const radioOptions = [
    { value: 'email', label: tc('radio_opt_email'), description: tc('radio_opt_email_desc') },
    { value: 'phone', label: tc('radio_opt_phone'), description: tc('radio_opt_phone_desc') },
    { value: 'sms', label: tc('radio_opt_sms'), description: tc('radio_opt_sms_desc') },
  ]

  const groupProps = [
    { prop: 'options', type: 'RadioOption[]', defaultValue: '—', description: t('radio_prop_options') },
    { prop: 'value', type: 'string', defaultValue: '—', description: t('radio_prop_value') },
    { prop: 'onValueChange', type: '(value: string) => void', defaultValue: '—', description: t('radio_prop_onValueChange') },
    { prop: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'vertical'", description: t('radio_prop_orientation') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('radio_prop_disabled') },
    { prop: 'label', type: 'string', defaultValue: '—', description: t('radio_prop_label') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { RadioGroup, Radio } from '@ghiberti85/ui'

const options = [
  { value: 'email', label: 'Email', description: 'Sent to your inbox.' },
  { value: 'phone', label: 'Phone', description: 'During business hours.' },
  { value: 'sms',   label: 'SMS',   description: 'Short text messages.' },
]

// Vertical (default)
<RadioGroup
  label="Preferred contact method"
  options={options}
  onValueChange={setValue}
/>

// Horizontal
<RadioGroup
  label="Layout"
  options={options}
  orientation="horizontal"
/>

// Controlled
<RadioGroup
  label="Plan"
  options={options}
  value={value}
  onValueChange={setValue}
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Radio / RadioGroup</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Radio / RadioGroup</h1>
        <p className={styles.description}>{tc('radio_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <RadioGroupDemo
            groupLabel={tc('radio_group_label')}
            options={radioOptions}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_props')}</h2>
        <PropsTable rows={groupProps} headings={headings} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_usage')}</h2>
        <CodeBlock code={usageCode} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_storybook')}</h2>
        <a
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-radiogroup--docs"
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
