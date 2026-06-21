'use client'

import * as React from 'react'
import { Command as CmdkPrimitive } from 'cmdk'
import { Dialog, DialogContent } from '../Dialog'
import { cn } from '../../utils/cn'
import styles from './Command.module.css'

/** Root command panel */
const Command = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive
    ref={ref}
    className={cn(styles.command, className)}
    {...props}
  />
))
Command.displayName = 'Command'

/** Full-screen dialog wrapper for Command */
interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  /** ARIA label for the dialog */
  label?: string
}

const CommandDialog = ({ open, onOpenChange, children, label = 'Command palette' }: CommandDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={styles.dialogContent} aria-label={label}>
      <Command className={styles.commandInDialog}>{children}</Command>
    </DialogContent>
  </Dialog>
)
CommandDialog.displayName = 'CommandDialog'

/** Search input */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className={styles.inputWrapper} data-cmdk-input-wrapper="">
    <span className={styles.searchIcon} aria-hidden="true">🔍</span>
    <CmdkPrimitive.Input
      ref={ref}
      className={cn(styles.input, className)}
      {...props}
    />
  </div>
))
CommandInput.displayName = 'CommandInput'

/** Scrollable list of results */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.List>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.List
    ref={ref}
    className={cn(styles.list, className)}
    {...props}
  />
))
CommandList.displayName = 'CommandList'

/** Empty state */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.Empty>
>((props, ref) => (
  <CmdkPrimitive.Empty ref={ref} className={styles.empty} {...props} />
))
CommandEmpty.displayName = 'CommandEmpty'

/** Group of items with optional heading */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Group
    ref={ref}
    className={cn(styles.group, className)}
    {...props}
  />
))
CommandGroup.displayName = 'CommandGroup'

/** Visual separator between groups */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Separator
    ref={ref}
    aria-hidden="true"
    className={cn(styles.separator, className)}
    {...props}
  />
))
CommandSeparator.displayName = 'CommandSeparator'

/** Single command item */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CmdkPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CmdkPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Item
    ref={ref}
    className={cn(styles.item, className)}
    {...props}
  />
))
CommandItem.displayName = 'CommandItem'

/** Keyboard shortcut badge inside an item */
const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(styles.shortcut, className)} {...props} />
)
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
}
