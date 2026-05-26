'use client'

import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@ghiberti85/ui'

interface DialogPageDemoProps {
  triggerLabel: string
  title: string
  description: string
  cancelLabel: string
  confirmLabel: string
}

export function DialogPageDemo({
  triggerLabel,
  title,
  description,
  cancelLabel,
  confirmLabel,
}: DialogPageDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{cancelLabel}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary">{confirmLabel}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
