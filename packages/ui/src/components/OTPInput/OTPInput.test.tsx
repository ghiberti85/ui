import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi } from 'vitest'
import { OTPInput } from './OTPInput'


describe('OTPInput', () => {
  it('renders correct number of inputs', () => {
    render(<OTPInput length={6} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('renders custom length', () => {
    render(<OTPInput length={4} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('shows error message', () => {
    render(<OTPInput error="Invalid code" />)
    expect(screen.getByText('Invalid code')).toBeDefined()
  })

  it('is disabled when disabled prop set', () => {
    render(<OTPInput disabled />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((inp) => expect((inp as HTMLInputElement).disabled).toBe(true))
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OTPInput onChange={onChange} />)
    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0])
    await user.keyboard('1')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders controlled value', () => {
    render(<OTPInput value="123456" />)
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
    expect(inputs[0].value).toBe('1')
    expect(inputs[5].value).toBe('6')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<OTPInput />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
