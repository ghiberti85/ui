import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders a separator element', () => {
    render(<Separator />)
    // decorative=true renders with role="none"
    expect(document.querySelector('[data-orientation]')).toBeInTheDocument()
  })

  it('renders as non-decorative separator with correct role', () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('applies horizontal orientation by default', () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies vertical orientation when specified', () => {
    render(<Separator orientation="vertical" decorative={false} />)
    expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('is decorative by default (role none)', () => {
    render(<Separator />)
    const el = document.querySelector('[data-orientation]')
    // Radix sets role="none" for decorative separators
    expect(el).toHaveAttribute('role', 'none')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Separator ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('applies custom className', () => {
    render(<Separator className="my-separator" decorative={false} />)
    expect(screen.getByRole('separator')).toHaveClass('my-separator')
  })
})
