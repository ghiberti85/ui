import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <span>child</span>
      </Stack>
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    render(<Stack data-testid="stack">content</Stack>)
    expect(screen.getByTestId('stack').tagName).toBe('DIV')
  })

  it('renders as a custom element when "as" prop is provided', () => {
    render(
      <Stack as="section" data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack').tagName).toBe('SECTION')
  })

  it('applies vertical direction by default', () => {
    render(<Stack data-testid="stack">content</Stack>)
    const el = screen.getByTestId('stack')
    expect(el).toHaveStyle({ '--stack-direction': 'column' })
  })

  it('applies horizontal direction', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-direction': 'row' })
  })

  it('applies gap as a CSS var', () => {
    render(
      <Stack gap={4} data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-gap': 'var(--spacing-4)' })
  })

  it('applies zero gap as 0px', () => {
    render(
      <Stack gap={0} data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-gap': '0px' })
  })

  it('applies align prop', () => {
    render(
      <Stack align="center" data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-align': 'center' })
  })

  it('applies justify prop', () => {
    render(
      <Stack justify="between" data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-justify': 'space-between' })
  })

  it('applies wrap prop', () => {
    render(
      <Stack wrap data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ '--stack-wrap': 'wrap' })
  })

  it('merges custom className', () => {
    render(
      <Stack className="custom-class" data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack').className).toContain('custom-class')
  })

  it('merges custom style', () => {
    render(
      <Stack style={{ color: 'red' }} data-testid="stack">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Stack ref={ref}>content</Stack>)
    expect(ref.current).not.toBeNull()
  })

  it('passes additional HTML attributes', () => {
    render(
      <Stack data-testid="stack" aria-label="layout">
        content
      </Stack>
    )
    expect(screen.getByTestId('stack')).toHaveAttribute('aria-label', 'layout')
  })
})
