import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea id="test" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label linked via htmlFor/id', () => {
    render(<Textarea id="bio" label="Bio" />)
    const label = screen.getByText('Bio')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'bio')
    expect(screen.getByLabelText('Bio')).toBeInTheDocument()
  })

  it('renders without a label when label prop is omitted', () => {
    render(<Textarea id="x" placeholder="Type here" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Textarea id="bio" helperText="Max 200 chars" />)
    expect(screen.getByText('Max 200 chars')).toBeInTheDocument()
  })

  it('renders error message and not helper text when both provided', () => {
    render(<Textarea id="bio" helperText="Helper" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
  })

  it('links error via aria-describedby', () => {
    render(<Textarea id="bio" error="Invalid" />)
    const ta = screen.getByRole('textbox')
    expect(ta).toHaveAttribute('aria-describedby', 'bio-error')
    expect(screen.getByText('Invalid')).toHaveAttribute('id', 'bio-error')
  })

  it('links helper text via aria-describedby', () => {
    render(<Textarea id="bio" helperText="Hint" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'bio-helper')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Textarea id="x" error="Oops" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when no error', () => {
    render(<Textarea id="x" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Textarea id="x" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('uses default rows=4', () => {
    render(<Textarea id="x" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4')
  })

  it('accepts custom rows', () => {
    render(<Textarea id="x" rows={8} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8')
  })

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn()
    render(<Textarea id="x" onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Textarea id="x" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('passes additional HTML attributes', () => {
    render(<Textarea id="x" data-testid="my-ta" />)
    expect(screen.getByTestId('my-ta')).toBeInTheDocument()
  })
})
