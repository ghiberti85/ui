import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input id="test" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label linked to input via htmlFor/id', () => {
    render(<Input id="name" label="Full Name" />)
    const label = screen.getByText('Full Name')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'name')
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
  })

  it('renders without a label when label prop is omitted', () => {
    render(<Input id="no-label" placeholder="Type here" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('renders error message below the input', () => {
    render(<Input id="email" label="Email" error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('links error message via aria-describedby', () => {
    render(<Input id="email" label="Email" error="Invalid email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(screen.getByText('Invalid email')).toHaveAttribute('id', 'email-error')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Input id="email" error="Required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when no error', () => {
    render(<Input id="email" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input id="x" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders placeholder text', () => {
    render(<Input id="x" placeholder="Enter value" />)
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
  })

  it('calls onChange handler when typing', async () => {
    const handleChange = vi.fn()
    render(<Input id="x" onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input id="x" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('passes additional HTML attributes', () => {
    render(<Input id="x" data-testid="my-input" type="email" />)
    expect(screen.getByTestId('my-input')).toHaveAttribute('type', 'email')
  })
})

describe('accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Input id="test" label="Name" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
