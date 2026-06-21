import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Chip } from './Chip'

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>React</Chip>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('applies variant class', () => {
    render(<Chip variant="success" data-testid="chip">Active</Chip>)
    expect(screen.getByTestId('chip').className).toMatch(/variant-success/)
  })

  it('applies size class', () => {
    render(<Chip size="lg" data-testid="chip">Large</Chip>)
    expect(screen.getByTestId('chip').className).toMatch(/size-lg/)
  })

  it('shows remove button when onRemove is provided', () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove}>Tag</Chip>)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  it('calls onRemove when remove button clicked', () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove}>Tag</Chip>)
    fireEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('does not show remove button when disabled', () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove} disabled>Disabled</Chip>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('does not render remove button when onRemove is absent', () => {
    render(<Chip>No remove</Chip>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<Chip icon={<span data-testid="icon">★</span>}>With icon</Chip>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Chip ref={ref}>Ref</Chip>)
    expect(ref.current).not.toBeNull()
  })
})

describe('Chip accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Chip>Tag</Chip>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('remove button has accessible label', async () => {
    const { container } = render(
      <Chip onRemove={() => {}} removeLabel="Remove tag">Tag</Chip>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
