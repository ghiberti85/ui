import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Spinner.module.css'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerVariant = 'default' | 'secondary' | 'outline' | 'ghost'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Color variant */
  variant?: SpinnerVariant
  /** Accessible label */
  label?: string
}

/**
 * Spinner component — CSS-only loading indicator.
 * Uses border trick with CSS custom properties for theming.
 *
 * @example
 * <Spinner size="md" />
 * <Spinner variant="secondary" label="Saving…" />
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', variant = 'default', label = 'Loading…', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(styles.spinner, styles[`size-${size}`], styles[`variant-${variant}`], className)}
        {...props}
      >
        <span className={styles.srOnly}>{label}</span>
      </span>
    )
  }
)

Spinner.displayName = 'Spinner'
