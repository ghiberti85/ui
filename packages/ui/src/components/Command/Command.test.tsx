import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command'

function BasicCommand() {
  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            Calendar
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem value="search">Search</CommandItem>
          <CommandItem value="settings" disabled>Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">New File</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe('Command', () => {
  it('renders search input', () => {
    render(<BasicCommand />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders items', () => {
    render(<BasicCommand />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('New File')).toBeInTheDocument()
  })

  it('renders group headings', () => {
    render(<BasicCommand />)
    expect(screen.getByText('Suggestions')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders keyboard shortcut', () => {
    render(<BasicCommand />)
    expect(screen.getByText('⌘C')).toBeInTheDocument()
  })

  it('filters items on search', async () => {
    const user = userEvent.setup()
    render(<BasicCommand />)
    await user.type(screen.getByPlaceholderText('Search...'), 'cal')
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.queryByText('New File')).not.toBeInTheDocument()
  })

  it('shows empty state when no results', async () => {
    const user = userEvent.setup()
    render(<BasicCommand />)
    await user.type(screen.getByPlaceholderText('Search...'), 'zzznotfound')
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('calls onSelect when item clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="calendar" onSelect={onSelect}>Calendar</CommandItem>
        </CommandList>
      </Command>
    )
    await user.click(screen.getByText('Calendar'))
    expect(onSelect).toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<BasicCommand />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
