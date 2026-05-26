import styles from './page.module.css'

export default function ComponentsPage() {
  return (
    <div>
      <h1 className={styles.title}>Components</h1>
      <p className={styles.subtitle}>React component library built on design tokens.</p>
      <div className={styles.grid}>
        {['Button', 'Badge', 'Input', 'Card', 'Dialog'].map((name) => (
          <div key={name} className={styles.card}>
            <h2 className={styles.componentName}>{name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
