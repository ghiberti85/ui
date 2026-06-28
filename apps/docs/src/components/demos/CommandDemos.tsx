'use client'
import * as React from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@ghiberti85/ui'

export function CommandDemo() {
  return (
    <Command style={{ width: '100%', maxWidth: 420 }}>
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

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          background: 'var(--color-semantic-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--border-radius-md)',
          fontFamily: 'var(--typography-font-family-sans)',
          fontSize: '0.875rem',
        }}
      >
        Open Command Palette (⌘K)
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="home">🏠 Home</CommandItem>
            <CommandItem value="components">🧩 Components</CommandItem>
            <CommandItem value="tokens">🎨 Tokens</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
