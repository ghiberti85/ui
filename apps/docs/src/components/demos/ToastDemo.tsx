'use client'

import { useToast, Button } from '@ghiberti85/ui'

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Button variant="secondary" onClick={() => toast({ title: 'Default', description: 'This is a default toast.' })}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Success!', description: 'Your changes have been saved.', variant: 'success' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Warning', description: 'This action may have side effects.', variant: 'warning' })}>
        Warning
      </Button>
      <Button variant="destructive" onClick={() => toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'error' })}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Info', description: 'Here is some useful information.', variant: 'info' })}>
        Info
      </Button>
    </div>
  )
}
