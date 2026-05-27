import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { SelectDemo } from '@/components/demos/FormDemos'
import styles from '../component-page.module.css'

export default async function SelectPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const fruitOptions = [
    { value: 'apple', label: tc('select_opt_apple') },
    { value: 'banana', label: tc('select_opt_banana') },
    { value: 'cherry', label: tc('select_opt_cherry') },
    { value: 'mango', label: tc('select_opt_mango') },
  ]

  const props = [
    { prop: 'options', type: 'SelectOption[]', defaultValue: '—', description: t('select_prop_options') },
    { prop: 'label', type: 'string', defaultValue: '—', description: t('select_prop_label') },
    { prop: 'placeholder', type: 'string', defaultValue: "'Select an option'", description: t('select_prop_placeholder') },
    { prop: 'value', type: 'string', defaultValue: '—', description: t('select_prop_value') },
    { prop: 'defaultValue', type: 'string', defaultValue: '—', description: t('select_prop_defaultValue') },
    { prop: 'onValueChange', type: '(value: string) => void', defaultValue: '—', description: t('select_prop_onValueChange') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('select_prop_error') },
    { prop: 'helperText', type: 'string', defaultValue: '—', description: t('select_prop_helperText') },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: t('select_prop_size') },
    { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: t('select_prop_disabled') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Select } from '@ghiberti85/ui'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

// Basic
<Select label="Fruit" options={options} placeholder="Pick a fruit" />

// With error
<Select label="Fruit" options={options} error="Please select a fruit" />

// Sizes
<Select label="Fruit" options={options} size="sm" />
<Select label="Fruit" options={options} size="lg" />

// Disabled
<Select label="Fruit" options={options} disabled />

// Controlled
<Select
  label="Fruit"
  options={options}
  value={value}
  onValueChange={setValue}
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Select</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Select</h1>
        <p className={styles.description}>{tc('select_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demoColumn}>
          <SelectDemo
            labelDefault={tc('select_label_default')}
            labelError={tc('select_label_error')}
            labelDisabled={tc('select_label_disabled')}
            placeholder={tc('select_placeholder')}
            errorMsg={tc('select_error_msg')}
            options={fruitOptions}
          />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-select--docs"
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
