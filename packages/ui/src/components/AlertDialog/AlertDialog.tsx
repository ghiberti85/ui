import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '../../utils/cn'
import styles from './AlertDialog.module.css'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className={styles.overlay} />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
))
AlertDialogContent.displayName = 'AlertDialogContent'

export const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.header, className)} {...props} />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

export const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.footer, className)} {...props} />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn(styles.description, className)} {...props} />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  /** Use destructive variant for dangerous actions */
  variant?: 'default' | 'destructive'
}

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = 'default', ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(styles.action, variant === 'destructive' && styles.actionDestructive, className)}
    {...props}
  />
))
AlertDialogAction.displayName = 'AlertDialogAction'

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(styles.cancel, className)}
    {...props}
  />
))
AlertDialogCancel.displayName = 'AlertDialogCancel'
