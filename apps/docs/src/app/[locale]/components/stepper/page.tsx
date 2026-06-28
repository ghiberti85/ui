import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { Stepper } from '@ghiberti85/ui'
import { StepperDemo, demoSteps } from '@/components/demos/StepperDemo'
import styles from '../[component]/component-page.module.css'

export default async function StepperPage() {
  const t = await getTranslations('componentPages')
  const tc = await getTranslations('components')

  const props = [
    { prop: 'steps', type: 'StepItem[]', defaultValue: '—', description: t('stepper_prop_steps') },
    { prop: 'activeStep', type: 'number', defaultValue: '0', description: t('stepper_prop_activeStep') },
    { prop: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: t('stepper_prop_orientation') },
  ]

  const headings = {
    prop: t('table_prop'),
    type: t('table_type'),
    default: t('table_default'),
    description: t('table_description'),
  }

  const usageCode = `import { Stepper } from '@ghiberti85/ui'

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Done' },
]

// Horizontal (default)
<Stepper steps={steps} activeStep={1} />

// Vertical
<Stepper steps={steps} activeStep={2} orientation="vertical" />

// With error state
<Stepper
  steps={[
    { label: 'Account', status: 'completed' },
    { label: 'Profile', status: 'error' },
    { label: 'Done', status: 'pending' },
  ]}
  activeStep={1}
/>`

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link href="/components">{tc('title')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>Stepper</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>Stepper</h1>
        <p className={styles.description}>{tc('stepper_desc')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('section_demo')}</h2>
        <div className={styles.demo} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
          <StepperDemo />
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 12 }}>Vertical</p>
            <Stepper steps={demoSteps.slice(0, 3)} activeStep={1} orientation="vertical" />
          </div>
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)', marginBottom: 12 }}>With Error</p>
            <Stepper
              steps={[
                { label: 'Account', status: 'completed' },
                { label: 'Profile', status: 'error' },
                { label: 'Done', status: 'pending' },
              ]}
              activeStep={1}
            />
          </div>
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
          href="https://main--6a1610ad99f4ffa5234828d5.chromatic.com/?path=/docs/components-stepper--docs"
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
