'use client'

import { Button, Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@ghiberti85/ui'

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '0.875rem' }}>Popover title</p>
        <p style={{ margin: '0 0 12px', fontSize: '0.875rem', opacity: 0.8 }}>This is popover content that floats over the page.</p>
        <PopoverClose asChild>
          <Button variant="ghost" size="sm">Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
