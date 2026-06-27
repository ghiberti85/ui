import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './EmptyState.module.css'

export type EmptyStateVariant = 'default' | 'search' | 'error' | 'no-results'

export interface EmptyStateAction {
  label: string
  onClick: () => void
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant — changes the built-in icon */
  variant?: EmptyStateVariant
  /** Main heading */
  title: string
  /** Supporting description */
  description?: string
  /** Custom icon to replace the built-in one */
  icon?: React.ReactNode
  /** Primary action button */
  action?: EmptyStateAction
}

const DEFAULT_ICONS: Record<EmptyStateVariant, React.ReactNode> = {
  default: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M31 31L40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 22h8M22 18v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      <path d="M24 16v10M24 30v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'no-results': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M18 20l12 8M30 20l-12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

/**
 * EmptyState — zero-data placeholder with icon, title, description, and optional action.
 *
 * @example
 * <EmptyState
 *   variant="search"
 *   title="No results found"
 *   description="Try adjusting your search terms."
 *   action={{ label: 'Clear search', onClick: () => setQuery('') }}
 * />
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant = 'default', title, description, icon, action, ...props }, ref) => (
    <div ref={ref} className={cn(styles.root, className)} {...props}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? DEFAULT_ICONS[variant]}
      </span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <button type="button" className={styles.action} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
)
EmptyState.displayName = 'EmptyState'
