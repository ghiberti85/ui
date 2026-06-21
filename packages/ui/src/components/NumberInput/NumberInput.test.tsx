import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { NumberInput } from './NumberInput'

describe('NumberInput', () => {
  it('renders with label', () => {
    render(<NumberInput label="Quantity" />)
    expect(screen.getByText('Quantity')).toBeInTheDocument()
  })

  it('renders with value', () => {
    render(<NumberInput value={42} />)
    expect(screen.getByRole('spinbutton')).toHaveValue('42')
  })

  it('increments on + click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} step={1} />)
    await user.click(screen.getByLabelText('Increase'))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('decrements on - click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} step={1} />)
    await user.click(screen.getByLabelText('Decrease'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('respects min value — decrease button disabled at minimum', () => {
    render(<NumberInput value={0} min={0} />)
    expect(screen.getByLabelText('Decrease')).toBeDisabled()
  })

  it('respects max value — increase button disabled at maximum', () => {
    render(<NumberInput value={10} max={10} />)
    expect(screen.getByLabelText('Increase')).toBeDisabled()
  })

  it('shows prefix and suffix', () => {
    render(<NumberInput value={100} prefix="$" suffix="USD" />)
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<NumberInput error="Value is required" />)
    expect(screen.getByText('Value is required')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<NumberInput helperText="Enter a number between 1 and 100" />)
    expect(screen.getByText('Enter a number between 1 and 100')).toBeInTheDocument()
  })

  it('is disabled when disabled prop set', () => {
    render(<NumberInput disabled value={5} />)
    expect(screen.getByRole('spinbutton')).toBeDisabled()
    expect(screen.getByLabelText('Increase')).toBeDisabled()
    expect(screen.getByLabelText('Decrease')).toBeDisabled()
  })

  it('increments with ArrowUp key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await user.click(screen.getByRole('spinbutton'))
    await user.keyboard('{ArrowUp}')
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('decrements with ArrowDown key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await user.click(screen.getByRole('spinbutton'))
    await user.keyboard('{ArrowDown}')
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<NumberInput label="Amount" value={10} min={0} max={100} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
