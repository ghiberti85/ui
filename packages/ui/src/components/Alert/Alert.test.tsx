import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something happened</Alert>)
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('has role="alert"', () => {
    render(<Alert>Message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Alert title="Heads up!">Message</Alert>)
    expect(screen.getByText('Heads up!')).toBeInTheDocument()
  })

  it('applies variant class', () => {
    render(<Alert variant="success">OK</Alert>)
    expect(screen.getByRole('alert').className).toMatch(/variant-success/)
  })

  it('renders dismiss button when onDismiss provided', () => {
    render(<Alert onDismiss={() => {}}>Message</Alert>)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('calls onDismiss on click', async () => {
    const handleDismiss = vi.fn()
    render(<Alert onDismiss={handleDismiss}>Message</Alert>)
    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('hides icon when icon=false', () => {
    const { container } = render(<Alert icon={false}>Message</Alert>)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>Message</Alert>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders default icon for each variant', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const
    for (const variant of variants) {
      const { container } = render(<Alert variant={variant}>Message</Alert>)
      expect(container.querySelector('svg')).not.toBeNull()
    }
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<Alert title="Note" variant="info">Please review the terms.</Alert>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
