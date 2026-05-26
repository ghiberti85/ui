import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from './Tooltip'

// Radix Tooltip uses pointer events — jsdom doesn't support them fully,
// so we test open state by using delayDuration=0 and hover via userEvent.
describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.getByRole('button', { name: /hover me/i })).toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tooltip text" delayDuration={0}>
        <button>Hover me</button>
      </Tooltip>
    )
    await user.hover(screen.getByRole('button', { name: /hover me/i }))
    await waitFor(() => {
      // Radix renders the text in both the visible bubble and a hidden role=tooltip span
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })

  it('trigger has open state after hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tooltip text" delayDuration={0}>
        <button>Hover me</button>
      </Tooltip>
    )
    const trigger = screen.getByRole('button', { name: /hover me/i })
    await user.hover(trigger)
    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-state', 'delayed-open')
    })
  })

  it('accepts a side prop without error', () => {
    const sides = ['top', 'right', 'bottom', 'left'] as const
    sides.forEach((side) => {
      const { unmount } = render(
        <Tooltip content="Tip" side={side} delayDuration={0}>
          <button>Btn</button>
        </Tooltip>
      )
      expect(screen.getByRole('button', { name: /btn/i })).toBeInTheDocument()
      unmount()
    })
  })

  it('renders children as-is when disabled', () => {
    render(
      <Tooltip content="Hidden tip" disabled>
        <button>No tip</button>
      </Tooltip>
    )
    expect(screen.getByRole('button', { name: /no tip/i })).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('does not show tooltip on hover when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Hidden tip" disabled delayDuration={0}>
        <button>No tip</button>
      </Tooltip>
    )
    await user.hover(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('forwards ref on trigger via raw primitives', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger ref={ref} asChild>
            <button>Ref trigger</button>
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('exports raw primitives', () => {
    expect(TooltipProvider).toBeDefined()
    expect(TooltipRoot).toBeDefined()
    expect(TooltipTrigger).toBeDefined()
    expect(TooltipContent).toBeDefined()
  })
})

describe('accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
