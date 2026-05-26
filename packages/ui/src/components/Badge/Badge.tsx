import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant
}

/**
 * Badge component — small pill-shaped label.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Badge variant="default">New</Badge>
 * <Badge variant="destructive">Error</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(styles.badge, styles[`variant-${variant}`], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
