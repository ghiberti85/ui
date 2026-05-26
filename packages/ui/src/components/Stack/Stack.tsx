import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Stack.module.css'

export type StackDirection = 'horizontal' | 'vertical'
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** Flex direction — 'horizontal' maps to row, 'vertical' maps to column */
  direction?: StackDirection
  /** Gap between children — maps to spacing token */
  gap?: StackGap
  /** align-items value */
  align?: StackAlign
  /** justify-content value */
  justify?: StackJustify
  /** Whether to allow wrapping */
  wrap?: boolean
  /** Polymorphic element type */
  as?: React.ElementType
}

const justifyMap: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const alignMap: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

/**
 * Stack component — flex container for composing layouts.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Stack direction="horizontal" gap={4} align="center">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 * </Stack>
 */
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 0,
      align,
      justify,
      wrap = false,
      as: Comp = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const gapVar = gap === 0 ? '0px' : `var(--spacing-${gap})`

    return (
      <Comp
        ref={ref}
        className={cn(styles.stack, className)}
        style={
          {
            '--stack-direction': direction === 'horizontal' ? 'row' : 'column',
            '--stack-gap': gapVar,
            '--stack-align': align ? alignMap[align] : undefined,
            '--stack-justify': justify ? justifyMap[justify] : undefined,
            '--stack-wrap': wrap ? 'wrap' : 'nowrap',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Stack.displayName = 'Stack'
