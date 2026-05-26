import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a checkbox element', () => {
    render(<Checkbox id="test" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders label linked via htmlFor/id', () => {
    render(<Checkbox id="terms" label="Accept terms" />)
    const label = screen.getByText('Accept terms')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'terms')
  })

  it('renders description text', () => {
    render(<Checkbox id="terms" label="Accept" description="You agree to our terms" />)
    expect(screen.getByText('You agree to our terms')).toBeInTheDocument()
  })

  it('links description via aria-describedby', () => {
    render(<Checkbox id="terms" label="Accept" description="Details here" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-describedby', 'terms-desc')
  })

  it('is unchecked by default', () => {
    render(<Checkbox id="x" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders as checked when checked=true', () => {
    render(<Checkbox id="x" checked={true} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked')
  })

  it('renders indeterminate state', () => {
    render(<Checkbox id="x" checked="indeterminate" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'indeterminate')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox id="x" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('calls onCheckedChange when clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox id="x" label="Check me" onCheckedChange={handleChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Checkbox id="x" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('does not render label element when label prop is omitted', () => {
    render(<Checkbox id="x" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})
