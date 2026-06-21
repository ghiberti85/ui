import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { DatePicker, DateRangePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })

  it('renders selected date', () => {
    const date = new Date(2024, 0, 15) // Jan 15, 2024
    render(<DatePicker value={date} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens calendar on click', async () => {
    const user = userEvent.setup()
    render(<DatePicker placeholder="Pick a date" />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<DatePicker disabled placeholder="Pick a date" />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onChange with selected date', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} placeholder="Pick a date" />)
    await user.click(screen.getByRole('button'))
    const dayBtn = screen.getByText('15')
    await user.click(dayBtn)
    expect(onChange).toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DatePicker placeholder="Pick a date" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('DateRangePicker', () => {
  it('renders with placeholder', () => {
    render(<DateRangePicker placeholder="Pick a range" />)
    expect(screen.getByText('Pick a range')).toBeInTheDocument()
  })

  it('renders selected range', () => {
    const value = { from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) } as const
    render(<DateRangePicker value={value} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens calendar on click', async () => {
    const user = userEvent.setup()
    render(<DateRangePicker placeholder="Pick a range" />)
    await user.click(screen.getByRole('button'))
    expect(screen.getAllByRole('grid').length).toBeGreaterThan(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DateRangePicker placeholder="Pick a range" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
