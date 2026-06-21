'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Rating.module.css'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps {
  /** Current rating value (1-max) */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Maximum stars */
  max?: number
  /** Size of the stars */
  size?: RatingSize
  /** If true, user cannot interact */
  readOnly?: boolean
  /** If true, renders as disabled */
  disabled?: boolean
  /** Accessible label prefix for each star */
  starLabel?: (index: number, max: number) => string
  /** Called when rating changes */
  onChange?: (value: number) => void
  /** Additional className */
  className?: string
}

const STAR_SIZES: Record<RatingSize, number> = { sm: 16, md: 22, lg: 30 }

function StarIcon({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/**
 * Rating component — clickable stars with optional readonly and half-star display.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Rating value={3} onChange={(v) => console.log(v)} />
 * <Rating value={4} readOnly />
 */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      defaultValue = 0,
      max = 5,
      size = 'md',
      readOnly = false,
      disabled = false,
      starLabel,
      onChange,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [hovered, setHovered] = React.useState(0)
    const currentValue = isControlled ? (value ?? 0) : internalValue
    const displayValue = hovered || currentValue
    const px = STAR_SIZES[size]

    const handleClick = (index: number) => {
      if (readOnly || disabled) return
      const newValue = index === currentValue ? 0 : index
      if (!isControlled) setInternalValue(newValue)
      onChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (readOnly || disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(index)
      }
    }

    const defaultStarLabel = (i: number, m: number) => `Rate ${i} out of ${m} stars`

    return (
      <div
        ref={ref}
        className={cn(
          styles.root,
          readOnly && styles.readOnly,
          disabled && styles.disabled,
          styles[`size-${size}`],
          className
        )}
        role="group"
        aria-label="Rating"
      >
        {Array.from({ length: max }, (_, i) => {
          const index = i + 1
          const filled = index <= displayValue
          const label = (starLabel ?? defaultStarLabel)(index, max)
          return (
            <span
              key={index}
              className={cn(styles.star, filled && styles.filled)}
              onClick={() => handleClick(index)}
              onMouseEnter={() => !readOnly && !disabled && setHovered(index)}
              onMouseLeave={() => setHovered(0)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role={readOnly || disabled ? 'img' : 'button'}
              tabIndex={readOnly || disabled ? undefined : 0}
              aria-label={label}
              aria-pressed={!readOnly && !disabled ? index === currentValue : undefined}
            >
              <StarIcon filled={filled} size={px} />
            </span>
          )
        })}
      </div>
    )
  }
)

Rating.displayName = 'Rating'
