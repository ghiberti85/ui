import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from './Radio'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

const options = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue', description: 'Ocean blue' },
  { value: 'green', label: 'Green' },
]

describe('RadioGroup', () => {
  it('renders radio buttons for each option', () => {
    render(<RadioGroup options={options} id="colour" />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('renders labels for each option', () => {
    render(<RadioGroup options={options} id="colour" />)
    expect(screen.getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('renders group label', () => {
    render(<RadioGroup options={options} id="colour" label="Colour" />)
    expect(screen.getByText('Colour')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<RadioGroup options={options} id="colour" />)
    expect(screen.getByText('Ocean blue')).toBeInTheDocument()
  })

  it('reflects controlled value', () => {
    render(<RadioGroup options={options} id="colour" value="blue" />)
    const radios = screen.getAllByRole('radio')
    const blueRadio = radios.find((r) => r.getAttribute('value') === 'blue')
    expect(blueRadio).toHaveAttribute('data-state', 'checked')
  })

  it('calls onValueChange when an option is clicked', async () => {
    const handleChange = vi.fn()
    render(<RadioGroup options={options} id="colour" onValueChange={handleChange} />)
    await userEvent.click(screen.getByText('Red'))
    expect(handleChange).toHaveBeenCalledWith('red')
  })

  it('disables all radios when disabled prop is true', () => {
    render(<RadioGroup options={options} id="colour" disabled />)
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled()
    })
  })

  it('forwards ref to the root element', () => {
    const ref = { current: null }
    render(<RadioGroup options={options} id="colour" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})

describe('Radio (standalone)', () => {
  it('renders a single radio item inside a RadioGroup root', () => {
    render(
      <RadixRadioGroup.Root>
        <Radio value="x" id="x" label="Option X" />
      </RadixRadioGroup.Root>
    )
    expect(screen.getByRole('radio')).toBeInTheDocument()
    expect(screen.getByText('Option X')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <RadixRadioGroup.Root>
        <Radio value="x" id="x" ref={ref} />
      </RadixRadioGroup.Root>
    )
    expect(ref.current).not.toBeNull()
  })
})
