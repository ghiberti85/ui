import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="Nothing here" />)
    expect(screen.getByRole('heading', { name: 'Nothing here' })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<EmptyState title="Empty" description="No items found." />)
    expect(screen.getByText('No items found.')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<EmptyState title="Empty" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })

  it('renders action button and calls onClick', async () => {
    const onClick = vi.fn()
    render(<EmptyState title="Empty" action={{ label: 'Add item', onClick }} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add item' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not render action when not provided', () => {
    render(<EmptyState title="Empty" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    render(<EmptyState title="Empty" icon={<span data-testid="custom-icon" />} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<EmptyState title="Empty" className="my-class" />)
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<EmptyState ref={ref} title="Empty" />)
    expect(ref.current).toBeTruthy()
  })

  it('renders all variants without error', () => {
    const variants = ['default', 'search', 'error', 'no-results'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<EmptyState title="Title" variant={variant} />)
      unmount()
    })
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<EmptyState title="Nothing here" description="No items found." />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with action button', async () => {
    const { container } = render(
      <EmptyState title="Nothing here" action={{ label: 'Add item', onClick: () => {} }} />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
