import * as React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cn } from '../../utils/cn'
import styles from './Tooltip.module.css'

// NOTE: The docs app layout (or the root layout) should wrap the application
// in <TooltipProvider> so all Tooltip instances share a single provider.
// e.g.: import { TooltipProvider } from '@ghiberti85/ui'; <TooltipProvider>{children}</TooltipProvider>

// Re-export raw Radix primitives for advanced usage
export const TooltipProvider = RadixTooltip.Provider
export const TooltipRoot = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...props}
    />
  </RadixTooltip.Portal>
))
TooltipContent.displayName = 'TooltipContent'

export interface TooltipProps {
  /** The tooltip text/content shown in the bubble */
  content: React.ReactNode
  /** The trigger element */
  children: React.ReactNode
  /** Which side of the trigger the tooltip appears on */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end'
  /** Delay in ms before the tooltip opens */
  delayDuration?: number
  /** When true, the tooltip is not rendered and children are returned as-is */
  disabled?: boolean
}

/**
 * Tooltip component — accessible tooltip powered by Radix UI.
 * Wraps the trigger in a TooltipProvider automatically for standalone use.
 *
 * For multiple tooltips on a page, wrap your layout in <TooltipProvider>
 * and use the raw primitives (TooltipRoot, TooltipTrigger, TooltipContent).
 *
 * @example
 * <Tooltip content="Save document">
 *   <Button>Save</Button>
 * </Tooltip>
 */
export const Tooltip = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 400,
  disabled = false,
}: TooltipProps) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            className={styles.content}
          >
            {content}
            <RadixTooltip.Arrow className={styles.arrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

Tooltip.displayName = 'Tooltip'
