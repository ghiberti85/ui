import * as React from 'react'
import * as RadixSeparator from '@radix-ui/react-separator'
import { cn } from '../../utils/cn'
import styles from './Separator.module.css'

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical'
  /** When true, the separator is purely visual (not a landmark) */
  decorative?: boolean
  /** Additional class name */
  className?: string
}

/**
 * Separator component — thin visual divider built on Radix UI Separator.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" />
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className }, ref) => {
    return (
      <RadixSeparator.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        className={cn(
          styles.separator,
          styles[`orientation-${orientation}`],
          className
        )}
      />
    )
  }
)

Separator.displayName = 'Separator'
