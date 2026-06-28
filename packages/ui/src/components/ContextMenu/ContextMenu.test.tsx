import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
} from './ContextMenu'

function BasicContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div data-testid="trigger-area" style={{ width: 200, height: 100 }}>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem disabled>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

describe('ContextMenu', () => {
  it('renders trigger area', () => {
    render(<BasicContextMenu />)
    expect(screen.getByTestId('trigger-area')).toBeInTheDocument()
  })

  it('opens menu on right-click', async () => {
    render(<BasicContextMenu />)
    await userEvent.pointer({ target: screen.getByTestId('trigger-area'), keys: '[MouseRight]' })
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('renders label and separator', async () => {
    render(<BasicContextMenu />)
    await userEvent.pointer({ target: screen.getByTestId('trigger-area'), keys: '[MouseRight]' })
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders disabled item', async () => {
    render(<BasicContextMenu />)
    await userEvent.pointer({ target: screen.getByTestId('trigger-area'), keys: '[MouseRight]' })
    const deleteItem = screen.getByText('Delete')
    expect(deleteItem.closest('[data-disabled]')).toBeTruthy()
  })

  it('renders ContextMenuShortcut', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div data-testid="trigger">area</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  })

  it('renders ContextMenuCheckboxItem', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div data-testid="trigger">area</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Show toolbar</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    await userEvent.pointer({ target: screen.getByTestId('trigger'), keys: '[MouseRight]' })
    expect(screen.getByText('Show toolbar')).toBeInTheDocument()
  })

  it('has no accessibility violations in closed state', async () => {
    const { container } = render(<BasicContextMenu />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations when open', async () => {
    const { container } = render(<BasicContextMenu />)
    await userEvent.pointer({ target: container.querySelector('[data-testid="trigger-area"]')!, keys: '[MouseRight]' })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
