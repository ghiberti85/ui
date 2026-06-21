import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Rating } from './Rating'

describe('Rating', () => {
  it('renders 5 stars by default', () => {
    render(<Rating />)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('renders correct number of stars with max prop', () => {
    render(<Rating max={3} />)
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('calls onChange when a star is clicked', () => {
    const onChange = vi.fn()
    render(<Rating onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('button')[2])
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('does not call onChange in readOnly mode', () => {
    const onChange = vi.fn()
    render(<Rating readOnly value={3} onChange={onChange} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('toggles off when clicking selected star', () => {
    const onChange = vi.fn()
    render(<Rating value={3} onChange={onChange} />)
    fireEvent.click(screen.getAllByRole('button')[2])
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Rating ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})

describe('Rating accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Rating value={3} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no violations in readOnly mode', async () => {
    const { container } = render(<Rating value={4} readOnly />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
