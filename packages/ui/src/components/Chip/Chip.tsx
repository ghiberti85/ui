'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Chip.module.css'

export type ChipVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'
export type ChipSize = 'sm' | 'md' | 'lg'

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: ChipVariant
  /** Size of the chip */
  size?: ChipSize
  /** Called when the remove button is clicked */
  onRemove?: () => void
  /** Label for the remove button (for accessibility) */
  removeLabel?: string
  /** Left icon or element */
  icon?: React.ReactNode
  /** Whether the chip is disabled */
  disabled?: boolean
}

/**
 * Chip/Tag component — compact label with optional remove button and icon.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Chip>React</Chip>
 * <Chip variant="success" onRemove={() => {}}>Active</Chip>
 */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      variant = 'default',
      size = 'md',
      onRemove,
      removeLabel = 'Remove',
      icon,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          styles.chip,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          disabled && styles.disabled,
          className
        )}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <span className={styles.label}>{children}</span>
        {onRemove && !disabled && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={onRemove}
            aria-label={removeLabel}
            tabIndex={0}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Chip.displayName = 'Chip'
