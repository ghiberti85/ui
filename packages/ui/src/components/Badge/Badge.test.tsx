import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default').className).toMatch(/variant-default/)
  })

  it('applies secondary variant class', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary').className).toMatch(/variant-secondary/)
  })

  it('applies destructive variant class', () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText('Error').className).toMatch(/variant-destructive/)
  })

  it('applies outline variant class', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline').className).toMatch(/variant-outline/)
  })

  it('renders as a span element', () => {
    render(<Badge>Span</Badge>)
    expect(screen.getByText('Span').tagName).toBe('SPAN')
  })

  it('accepts additional className', () => {
    render(<Badge className="extra">Extra</Badge>)
    expect(screen.getByText('Extra').className).toContain('extra')
  })

  it('passes additional HTML attributes', () => {
    render(<Badge data-testid="my-badge">Test</Badge>)
    expect(screen.getByTestId('my-badge')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Badge ref={ref}>Ref</Badge>)
    expect(ref.current).not.toBeNull()
  })
})
