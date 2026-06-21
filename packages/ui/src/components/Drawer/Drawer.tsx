import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { cn } from '../../utils/cn'
import styles from './Drawer.module.css'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export const Drawer = RadixDialog.Root
export const DrawerTrigger = RadixDialog.Trigger
export const DrawerClose = RadixDialog.Close
export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn(styles.title, className)} {...props} />
))
DrawerTitle.displayName = 'DrawerTitle'

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn(styles.description, className)} {...props} />
))
DrawerDescription.displayName = 'DrawerDescription'

export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.header, className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

export const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.footer, className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

export interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  side?: DrawerSide
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DrawerContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className={styles.overlay} />
    <RadixDialog.Content
      ref={ref}
      className={cn(styles.content, styles[`side-${side}`], className)}
      {...props}
    >
      {children}
      <RadixDialog.Close className={styles.closeButton} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
))
DrawerContent.displayName = 'DrawerContent'
