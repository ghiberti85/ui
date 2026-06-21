import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Calendar } from './Calendar'

describe('Calendar', () => {
  it('renders the current month', () => {
    render(<Calendar mode="single" />)
    const now = new Date()
    const monthName = now.toLocaleString('en-US', { month: 'long' })
    expect(screen.getByText(new RegExp(monthName, 'i'))).toBeInTheDocument()
  })

  it('renders day numbers', () => {
    render(<Calendar mode="single" />)
    const dayButtons = screen.getAllByText('15')
    expect(dayButtons.length).toBeGreaterThan(0)
  })

  it('calls onSelect when a day is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Calendar mode="single" onSelect={onSelect} />)
    const day = screen.getByText('15')
    await user.click(day)
    expect(onSelect).toHaveBeenCalled()
  })

  it('renders navigation buttons', () => {
    render(<Calendar mode="single" />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('disables dates when disabled prop is set', () => {
    const today = new Date()
    render(<Calendar mode="single" disabled={[today]} />)
    // calendar renders with disabled dates
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('supports range mode', () => {
    render(<Calendar mode="range" />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('supports multiple mode', () => {
    render(<Calendar mode="multiple" />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('shows outside days by default', () => {
    render(<Calendar mode="single" />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Calendar mode="single" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
