import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { cn } from '../../utils/cn'
import styles from './HoverCard.module.css'

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  /** Show arrow pointer */
  showArrow?: boolean
}

/**
 * HoverCard — floating card revealed on hover, built on Radix UI.
 * Supports animated scale+fade open/close with motion tokens.
 *
 * @example
 * <HoverCard>
 *   <HoverCardTrigger asChild><a href="#">@username</a></HoverCardTrigger>
 *   <HoverCardContent>User profile info</HoverCardContent>
 * </HoverCard>
 */
export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, sideOffset = 8, showArrow = false, children, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
      {showArrow && <HoverCardPrimitive.Arrow className={styles.arrow} />}
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Portal>
))

HoverCardContent.displayName = 'HoverCardContent'
