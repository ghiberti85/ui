import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { cn } from '../../utils/cn'
import styles from './Dialog.module.css'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogClose = RadixDialog.Close

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className={styles.overlay} />
    <RadixDialog.Content
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
      <RadixDialog.Close className={styles.closeButton} aria-label="Close">
        <span aria-hidden="true">✕</span>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
))
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.header, className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.footer, className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn(styles.title, className)} {...props} />
))
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn(styles.description, className)} {...props} />
))
DialogDescription.displayName = 'DialogDescription'
