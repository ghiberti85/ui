import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Motion Tokens — Ghiberti UI',
  description: 'Transition and easing tokens across all three design systems.',
}

// Real values from packages/tokens/src/*/motion.json
const TRANSITION_TOKENS = [
  { token: '--transition-fast',  minimal: '120ms', editorial: '150ms', brutalist: '80ms' },
  { token: '--transition-base',  minimal: '200ms', editorial: '250ms', brutalist: '150ms' },
  { token: '--transition-slow',  minimal: '300ms', editorial: '400ms', brutalist: '250ms' },
]

const EASING_TOKENS = [
  { token: '--easing-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Standard' },
  { token: '--easing-in',      value: 'cubic-bezier(0.4, 0, 1, 1)',   label: 'Accelerate' },
  { token: '--easing-out',     value: 'cubic-bezier(0, 0, 0.2, 1)',   label: 'Decelerate' },
  { token: '--easing-spring',  value: 'DS-specific (see below)',       label: 'Spring' },
]

const SPRING_VALUES = {
  minimal:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
  editorial: 'cubic-bezier(0.25, 1.25, 0.5, 1)',
  brutalist: 'cubic-bezier(0.5, 2, 0.5, 1)',
}

export default function MotionTokensPage() {
  const t = useTranslations('motion')
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.desc}>{t('desc')}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('transitions')}</h2>
        <p className={styles.sectionDesc}>{t('transitions_desc')}</p>
        {/* Demo boxes */}
        <div className={styles.demoRow}>
          {TRANSITION_TOKENS.map(({ token, minimal }) => (
            <div key={token} className={styles.demoBox} style={{ '--demo-duration': minimal } as React.CSSProperties}>
              <span className={styles.demoLabel}>{token}</span>
              <span className={styles.demoValue}>{minimal}</span>
            </div>
          ))}
        </div>
        {/* Table: token × DS */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('token')}</th>
                <th>ds-minimal</th>
                <th>ds-editorial</th>
                <th>ds-brutalist</th>
              </tr>
            </thead>
            <tbody>
              {TRANSITION_TOKENS.map(({ token, minimal, editorial, brutalist }) => (
                <tr key={token}>
                  <td><code className={styles.code}>{token}</code></td>
                  <td>{minimal}</td>
                  <td>{editorial}</td>
                  <td>{brutalist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('easing')}</h2>
        <p className={styles.sectionDesc}>{t('easing_desc')}</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('token')}</th>
                <th>{t('label')}</th>
                <th>{t('value')}</th>
              </tr>
            </thead>
            <tbody>
              {EASING_TOKENS.slice(0, 3).map(({ token, value, label }) => (
                <tr key={token}>
                  <td><code className={styles.code}>{token}</code></td>
                  <td>{label}</td>
                  <td><code className={styles.code}>{value}</code></td>
                </tr>
              ))}
              <tr>
                <td><code className={styles.code}>--easing-spring</code></td>
                <td>Spring</td>
                <td>
                  <div><small>minimal:</small> <code className={styles.code}>{SPRING_VALUES.minimal}</code></div>
                  <div><small>editorial:</small> <code className={styles.code}>{SPRING_VALUES.editorial}</code></div>
                  <div><small>brutalist:</small> <code className={styles.code}>{SPRING_VALUES.brutalist}</code></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('usage')}</h2>
        <p className={styles.sectionDesc}>{t('usage_desc')}</p>
        <pre className={styles.codeBlock}>{`.button {
  transition: background var(--transition-fast) var(--easing-default),
              transform  var(--transition-fast) var(--easing-spring);
}`}</pre>
      </section>
    </div>
  )
}
