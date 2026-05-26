import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(<Container>content</Container>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    render(<Container data-testid="container">content</Container>)
    expect(screen.getByTestId('container').tagName).toBe('DIV')
  })

  it('renders as a custom element when "as" prop is provided', () => {
    render(
      <Container as="main" data-testid="container">
        content
      </Container>
    )
    expect(screen.getByTestId('container').tagName).toBe('MAIN')
  })

  it('applies lg size class by default', () => {
    render(<Container data-testid="container">content</Container>)
    expect(screen.getByTestId('container').className).toMatch(/size-lg/)
  })

  it('applies sm size class', () => {
    render(
      <Container size="sm" data-testid="container">
        content
      </Container>
    )
    expect(screen.getByTestId('container').className).toMatch(/size-sm/)
  })

  it('applies xl size class', () => {
    render(
      <Container size="xl" data-testid="container">
        content
      </Container>
    )
    expect(screen.getByTestId('container').className).toMatch(/size-xl/)
  })

  it('applies full size class', () => {
    render(
      <Container size="full" data-testid="container">
        content
      </Container>
    )
    expect(screen.getByTestId('container').className).toMatch(/size-full/)
  })

  it('merges custom className', () => {
    render(
      <Container className="custom-class" data-testid="container">
        content
      </Container>
    )
    expect(screen.getByTestId('container').className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Container ref={ref}>content</Container>)
    expect(ref.current).not.toBeNull()
  })

  it('passes additional HTML attributes', () => {
    render(
      <Container data-testid="container" aria-label="page container">
        content
      </Container>
    )
    expect(screen.getByTestId('container')).toHaveAttribute('aria-label', 'page container')
  })
})

describe('accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Container>content</Container>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
