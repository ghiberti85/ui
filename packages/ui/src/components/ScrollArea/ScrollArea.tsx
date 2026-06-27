import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '../../utils/cn'
import styles from './ScrollArea.module.css'

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Scroll direction */
  orientation?: 'vertical' | 'horizontal' | 'both'
}

/**
 * ScrollArea — custom-styled scrollable container built on Radix UI.
 *
 * @example
 * <ScrollArea className="h-72">
 *   <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
 * </ScrollArea>
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(styles.root, className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={styles.viewport}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    {(orientation === 'vertical' || orientation === 'both') && (
      <ScrollAreaScrollbar orientation="vertical" />
    )}
    {(orientation === 'horizontal' || orientation === 'both') && (
      <ScrollAreaScrollbar orientation="horizontal" />
    )}
    <ScrollAreaPrimitive.Corner className={styles.corner} />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = 'ScrollArea'

export const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      styles.scrollbar,
      orientation === 'vertical' ? styles.scrollbarVertical : styles.scrollbarHorizontal,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className={styles.thumb} />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'
