import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders with default value', () => {
    render(<Slider aria-label="Volume" />)
    const input = screen.getByRole('slider')
    expect(input).toBeInTheDocument()
  })

  it('displays correct aria attributes', () => {
    render(<Slider value={50} min={0} max={100} aria-label="Volume" />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('calls onChange when value changes', () => {
    const onChange = vi.fn()
    render(<Slider defaultValue={0} min={0} max={100} onChange={onChange} aria-label="Volume" />)
    const input = screen.getByRole('slider')
    fireEvent.change(input, { target: { value: '42' } })
    expect(onChange).toHaveBeenCalledWith(42)
  })

  it('renders marks when provided', () => {
    render(
      <Slider
        marks={[{ value: 0, label: 'Low' }, { value: 100, label: 'High' }]}
        aria-label="Level"
      />
    )
    expect(screen.getByText('Low')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Slider disabled aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Slider ref={ref} aria-label="Volume" />)
    expect(ref.current).not.toBeNull()
  })
})

describe('Slider accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Slider value={50} aria-label="Volume" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
