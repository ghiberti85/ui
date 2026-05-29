import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Progress.module.css'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0–100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Size of the progress bar */
  size?: ProgressSize
  /** Visual variant */
  variant?: ProgressVariant
  /** Accessible label */
  'aria-label'?: string
}

/**
 * Progress component — displays a progress bar with accessible attributes.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Progress value={60} />
 * <Progress value={80} variant="success" size="lg" />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max)
    const percentage = (clampedValue / max) * 100

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel ?? 'Progress'}
        className={cn(styles.root, styles[`size-${size}`], className)}
        {...props}
      >
        <div
          className={cn(styles.fill, styles[`variant-${variant}`])}
          style={{ width: `${percentage}%` }}
          data-value={clampedValue}
          data-max={max}
        />
      </div>
    )
  }
)

Progress.displayName = 'Progress'
