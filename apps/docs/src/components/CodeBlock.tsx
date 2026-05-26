import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className={styles.wrapper}>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  )
}
