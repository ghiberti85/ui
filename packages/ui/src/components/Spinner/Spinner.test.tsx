import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has default aria-label "Loading…"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading…')
  })

  it('accepts custom label', () => {
    render(<Spinner label="Saving…" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving…')
  })

  it('applies size class', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status').className).toMatch(/size-lg/)
  })

  it('applies variant class', () => {
    render(<Spinner variant="secondary" />)
    expect(screen.getByRole('status').className).toMatch(/variant-secondary/)
  })

  it('applies custom className', () => {
    render(<Spinner className="custom" />)
    expect(screen.getByRole('status').className).toMatch(/custom/)
  })

  it('renders all sizes without error', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} />)
      expect(screen.getByRole('status')).toBeInTheDocument()
      unmount()
    }
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<Spinner label="Loading content" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
