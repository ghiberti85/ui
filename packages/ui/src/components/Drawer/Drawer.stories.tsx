import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from './Drawer'
import { Button } from '../Button'

const meta: Meta<typeof DrawerContent> = {
  title: 'Components/Drawer',
  component: DrawerContent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof DrawerContent>

function DrawerStory({ side = 'right' as const, label = 'Open Drawer' }) {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>{label}</Button>
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a {side} drawer.</DrawerDescription>
        </DrawerHeader>
        <p style={{ marginBottom: '1rem' }}>Drawer body content goes here.</p>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const Right: Story = {
  render: () => <DrawerStory side="right" label="Open Right Drawer" />,
}

export const Left: Story = {
  render: () => <DrawerStory side="left" label="Open Left Drawer" />,
}

export const Top: Story = {
  render: () => <DrawerStory side="top" label="Open Top Drawer" />,
}

export const Bottom: Story = {
  render: () => <DrawerStory side="bottom" label="Open Bottom Drawer" />,
}
