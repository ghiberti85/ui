import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

function DefaultDemo() {
  return (
    <Command style={{ width: 420 }}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">📅 Calendar</CommandItem>
          <CommandItem value="search">🔍 Search</CommandItem>
          <CommandItem value="settings">⚙️ Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">
            📄 New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="open">
            📂 Open
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function AsDialogDemo() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])
  return (
    <>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-semantic-foreground-muted)' }}>
        Press <kbd>⌘K</kbd> to open
      </p>
      <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Open Command Palette
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="home">🏠 Home</CommandItem>
            <CommandItem value="components">🧩 Components</CommandItem>
            <CommandItem value="tokens">🎨 Tokens</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem value="light">☀️ Light Mode</CommandItem>
            <CommandItem value="dark">🌙 Dark Mode</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export const Default: StoryObj<typeof Command> = { render: () => <DefaultDemo /> }
export const AsDialog: StoryObj<typeof Command> = { render: () => <AsDialogDemo /> }
