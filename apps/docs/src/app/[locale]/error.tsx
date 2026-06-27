'use client'

import { useEffect } from 'react'
import styles from './error.module.css'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[docs] unhandled error:', error)
  }, [error])

  return (
    <div className={styles.root}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
          <path d="M24 14v12M24 30v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.description}>
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.primaryAction} onClick={reset}>
          Try again
        </button>
        <a href="/" className={styles.secondaryAction}>
          Go home
        </a>
      </div>
      {error.digest && (
        <code className={styles.digest}>Error ID: {error.digest}</code>
      )}
    </div>
  )
}
