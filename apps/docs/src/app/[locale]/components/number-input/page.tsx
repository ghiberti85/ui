import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { NumberInput } from '@ghiberti85/ui'
import { NumberInputDemo } from '@/components/demos/NumberInputDemo'
import styles from '../[component]/component-page.module.css'

export default async function NumberInputPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'value', type: 'number | undefined', defaultValue: '—', description: t('number_input_prop_value') },
    { prop: 'onChange', type: '(value: number | undefined) => void', defaultValue: '—', description: t('number_input_prop_onChange') },
    { prop: 'min', type: 'number', defaultValue: '—', description: t('number_input_prop_min') },
    { prop: 'max', type: 'number', defaultValue: '—', description: t('number_input_prop_max') },
    { prop: 'step', type: 'number', defaultValue: '1', description: t('number_input_prop_step') },
    { prop: 'precision', type: 'number', defaultValue: '—', description: t('number_input_prop_precision') },
    { prop: 'prefix', type: 'string', defaultValue: '—', description: t('number_input_prop_prefix') },
    { prop: 'suffix', type: 'string', defaultValue: '—', description: t('number_input_prop_suffix') },
    { prop: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: t('number_input_prop_size') },
    { prop: 'label', type: 'string', defaultValue: '—', description: t('number_input_prop_label') },
    { prop: 'error', type: 'string', defaultValue: '—', description: t('number_input_prop_error') },
    { prop: 'helperText', type: 'string', defaultValue: '—', description: t('number_input_prop_helperText') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { NumberInput } from '@ghiberti85/ui'

const [quantity, setQuantity] = useState(1)

// Basic
<NumberInput label="Quantity" value={quantity} onChange={setQuantity} min={0} max={99} />

// Currency
<NumberInput
  label="Price"
  value={price}
  onChange={setPrice}
  prefix="$"
  min={0}
  step={0.01}
  precision={2}
/>

// Percentage with helper text
<NumberInput
  label="Discount"
  value={discount}
  onChange={setDiscount}
  suffix="%"
  min={0}
  max={100}
  step={5}
  helperText="Enter a value between 0 and 100"
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>NumberInput</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>NumberInput</h1>
        <p className={styles.description}>{tc('number_input_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
          <NumberInputDemo label="Quantity" min={0} max={99} defaultVal={1} />
          <NumberInputDemo label="Price" prefix="$" step={10} precision={2} defaultVal={100} />
          <NumberInputDemo label="Discount" suffix="%" min={0} max={100} step={5} defaultVal={20} helperText="0–100%" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
          <NumberInput size="sm" label="Small" value={1} />
          <NumberInput size="md" label="Medium" value={1} />
          <NumberInput size="lg" label="Large" value={1} />
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-numberinput--docs"
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
