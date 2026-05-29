import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Button } from '../Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './DropdownMenu'

const meta: Meta = {
  title: 'Components/DropdownMenu',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

function WithCheckboxItemsDemo() {
  const [showStatus, setShowStatus] = React.useState(true)
  const [showActivity, setShowActivity] = React.useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>Show Status</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>Show Activity</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithCheckboxItems: StoryObj = {
  render: () => <WithCheckboxItemsDemo />,
}

function WithRadioItemsDemo() {
  const [size, setSize] = React.useState('md')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Font Size: {size}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
          <DropdownMenuRadioItem value="sm">Small</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="md">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lg">Large</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithRadioItems: StoryObj = {
  render: () => <WithRadioItemsDemo />,
}

export const WithSubMenu: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New File</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Open Recent</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>project-a.tsx</DropdownMenuItem>
            <DropdownMenuItem>project-b.tsx</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Quit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithDisabledItem: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Delete (disabled)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
