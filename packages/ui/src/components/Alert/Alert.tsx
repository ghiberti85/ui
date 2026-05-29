import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Alert.module.css'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14.928 14H1.072L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6v3M8 11v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6L6 10M6 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: AlertVariant
  /** Optional title */
  title?: string
  /** Override the default icon (pass false to hide) */
  icon?: React.ReactNode | false
  /** Callback to dismiss — shows X button when provided */
  onDismiss?: () => void
  children: React.ReactNode
}

/**
 * Alert component — displays contextual messages.
 * Uses state token CSS custom properties for colors.
 *
 * @example
 * <Alert variant="success" title="Saved!">Your changes have been saved.</Alert>
 * <Alert variant="error" onDismiss={() => {}}>Something went wrong.</Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      onDismiss,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon === false ? null : (icon ?? DEFAULT_ICONS[variant])

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(styles.alert, styles[`variant-${variant}`], className)}
        {...props}
      >
        {resolvedIcon && (
          <span className={styles.icon}>{resolvedIcon}</span>
        )}
        <div className={styles.body}>
          {title && <p className={styles.title}>{title}</p>}
          <div className={styles.content}>{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M12 2L2 12M2 2l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'
