'use client'
import * as React from 'react'
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@ghiberti85/ui'

export function DrawerRightDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>This is the drawer description.</DrawerDescription>
          </DrawerHeader>
          <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--color-semantic-foreground)' }}>
            <p>Drawer body content goes here.</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function DrawerLeftDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Left Side</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent side="left">
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
            <DrawerDescription>Slides in from the left.</DrawerDescription>
          </DrawerHeader>
          <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--color-semantic-foreground)' }}>
            <p>Navigation or settings panel.</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
