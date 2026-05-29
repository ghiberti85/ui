import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders with default props', () => {
    render(<Progress />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeInTheDocument()
  })

  it('sets aria-valuenow, aria-valuemin, aria-valuemax', () => {
    render(<Progress value={60} max={100} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '60')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('clamps value to 0–max', () => {
    const { rerender } = render(<Progress value={-10} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
    rerender(<Progress value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('uses custom max', () => {
    render(<Progress value={50} max={200} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200')
  })

  it('applies size classes', () => {
    const { container } = render(<Progress size="lg" />)
    expect((container.firstChild as HTMLElement).className).toMatch(/size-lg/)
  })

  it('applies variant classes', () => {
    const { container } = render(<Progress variant="success" />)
    const fill = container.querySelector('[data-value]') as HTMLElement
    expect(fill.className).toMatch(/variant-success/)
  })

  it('accepts custom aria-label', () => {
    render(<Progress value={30} aria-label="Upload progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<Progress value={50} aria-label="Loading" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
