import * as React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '../../utils/cn'
import styles from './Tabs.module.css'

// ── Root ────────────────────────────────────────────────────────────────────

export interface TabsProps {
  /** The value of the tab that should be active when initially rendered (uncontrolled). */
  defaultValue?: string
  /** The controlled value of the active tab. */
  value?: string
  /** Callback invoked when the active tab changes. */
  onValueChange?: (value: string) => void
  /** The orientation of the tabs. */
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children?: React.ReactNode
}

/**
 * Tabs root component — built on Radix UI Tabs.
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, orientation = 'horizontal', className, children }, ref) => (
    <RadixTabs.Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn(styles.root, styles[`root-${orientation}`], className)}
    >
      {children}
    </RadixTabs.Root>
  )
)
Tabs.displayName = 'Tabs'

// ── List ────────────────────────────────────────────────────────────────────

export interface TabsListProps {
  className?: string
  children?: React.ReactNode
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children }, ref) => (
    <RadixTabs.List ref={ref} className={cn(styles.list, className)}>
      {children}
    </RadixTabs.List>
  )
)
TabsList.displayName = 'TabsList'

// ── Trigger ─────────────────────────────────────────────────────────────────

export interface TabsTriggerProps {
  /** The value of the tab this trigger controls. */
  value: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, className, children }, ref) => (
    <RadixTabs.Trigger
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(styles.trigger, className)}
    >
      {children}
    </RadixTabs.Trigger>
  )
)
TabsTrigger.displayName = 'TabsTrigger'

// ── Content ─────────────────────────────────────────────────────────────────

export interface TabsContentProps {
  /** The value of the tab whose content this panel holds. */
  value: string
  className?: string
  children?: React.ReactNode
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children }, ref) => (
    <RadixTabs.Content ref={ref} value={value} className={cn(styles.content, className)}>
      {children}
    </RadixTabs.Content>
  )
)
TabsContent.displayName = 'TabsContent'
