import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders a switch element', () => {
    render(<Switch id="test" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders label linked via htmlFor/id', () => {
    render(<Switch id="notif" label="Enable notifications" />)
    const label = screen.getByText('Enable notifications')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'notif')
  })

  it('renders description text', () => {
    render(<Switch id="notif" label="Enable" description="Get push notifications" />)
    expect(screen.getByText('Get push notifications')).toBeInTheDocument()
  })

  it('links description via aria-describedby', () => {
    render(<Switch id="notif" label="Enable" description="Details" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-describedby', 'notif-desc')
  })

  it('is unchecked by default', () => {
    render(<Switch id="x" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders as checked when checked=true', () => {
    render(<Switch id="x" checked={true} />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Switch id="x" disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('calls onCheckedChange when clicked', async () => {
    const handleChange = vi.fn()
    render(<Switch id="x" label="Toggle" onCheckedChange={handleChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Switch id="x" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('does not render label element when label prop is omitted', () => {
    render(<Switch id="x" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})

describe('accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Switch id="notifications" label="Enable notifications" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
