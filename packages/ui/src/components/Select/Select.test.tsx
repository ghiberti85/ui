import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
]

describe('Select', () => {
  it('renders a combobox trigger', () => {
    render(<Select id="fruit" options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders label linked to trigger via htmlFor/id', () => {
    render(<Select id="fruit" label="Fruit" options={options} />)
    const label = screen.getByText('Fruit')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'fruit')
  })

  it('renders placeholder text', () => {
    render(<Select id="fruit" placeholder="Pick a fruit" options={options} />)
    expect(screen.getByText('Pick a fruit')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Select id="fruit" options={options} error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Select id="fruit" options={options} helperText="Choose wisely" />)
    expect(screen.getByText('Choose wisely')).toBeInTheDocument()
  })

  it('shows error and hides helper when both provided', () => {
    render(<Select id="fruit" options={options} error="Required" helperText="Helper" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
  })

  it('sets aria-invalid when error present', () => {
    render(<Select id="fruit" options={options} error="Required" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Select id="fruit" options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('opens dropdown and shows options on click', async () => {
    render(<Select id="fruit" options={options} />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Apple')).toBeVisible()
    expect(screen.getByText('Banana')).toBeVisible()
  })

  it('calls onValueChange when an option is selected', async () => {
    const handleChange = vi.fn()
    render(<Select id="fruit" options={options} onValueChange={handleChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Apple'))
    expect(handleChange).toHaveBeenCalledWith('apple')
  })

  it('forwards ref to the trigger button', () => {
    const ref = { current: null }
    render(<Select id="fruit" options={options} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('renders with default value selected', () => {
    render(<Select id="fruit" options={options} defaultValue="banana" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana')
  })
})
