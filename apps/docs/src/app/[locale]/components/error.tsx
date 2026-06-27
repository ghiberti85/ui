'use client'

import { useEffect } from 'react'
import styles from '../error.module.css'

export default function ComponentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[docs/components] demo error:', error)
  }, [error])

  return (
    <div className={styles.root}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22l4 4-4 4M26 30h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className={styles.title}>Demo failed to render</h2>
      <p className={styles.description}>
        This component demo threw an error. The rest of the docs are unaffected.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.primaryAction} onClick={reset}>
          Retry demo
        </button>
        <a href="/components" className={styles.secondaryAction}>
          Back to components
        </a>
      </div>
      {error.digest && (
        <code className={styles.digest}>Error ID: {error.digest}</code>
      )}
    </div>
  )
}
