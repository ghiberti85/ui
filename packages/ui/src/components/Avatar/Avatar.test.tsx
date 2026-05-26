import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders with src as an img element', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Fernando Ghiberti" />)
    expect(screen.getByRole('img', { name: /fernando ghiberti/i })).toBeInTheDocument()
  })

  it('renders fallback initials when no src is provided', () => {
    render(<Avatar fallback="FG" />)
    expect(screen.getByText('FG')).toBeInTheDocument()
  })

  it('auto-generates initials from alt when no fallback is provided', () => {
    render(<Avatar alt="Fernando Ghiberti" />)
    expect(screen.getByText('FG')).toBeInTheDocument()
  })

  it('auto-generates single initial for single-word alt', () => {
    render(<Avatar alt="Alice" />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar src="https://example.com/broken.jpg" alt="Fernando Ghiberti" fallback="FG" />)
    const img = screen.getByRole('img', { name: /fernando ghiberti/i })
    fireEvent.error(img)
    expect(screen.getByText('FG')).toBeInTheDocument()
  })

  it('falls back to auto-generated initials from alt when image errors and no fallback', () => {
    render(<Avatar src="https://example.com/broken.jpg" alt="Fernando Ghiberti" />)
    const img = screen.getByRole('img', { name: /fernando ghiberti/i })
    fireEvent.error(img)
    expect(screen.getByText('FG')).toBeInTheDocument()
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('applies size class for size="%s"', (size) => {
    const { container } = render(<Avatar fallback="FG" size={size} />)
    // CSS Modules hash class names; match the local name portion
    expect((container.firstChild as HTMLElement).className).toMatch(new RegExp(`size-${size}`))
  })

  it.each(['circle', 'square'] as const)('applies shape class for shape="%s"', (shape) => {
    const { container } = render(<Avatar fallback="FG" shape={shape} />)
    expect((container.firstChild as HTMLElement).className).toMatch(new RegExp(`shape-${shape}`))
  })

  it('defaults to md size and circle shape', () => {
    const { container } = render(<Avatar fallback="FG" />)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toMatch(/size-md/)
    expect(cls).toMatch(/shape-circle/)
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLSpanElement | null }
    render(<Avatar fallback="FG" ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('SPAN')
  })

  it('passes additional HTML attributes to the root span', () => {
    render(<Avatar fallback="FG" data-testid="avatar-el" />)
    expect(screen.getByTestId('avatar-el')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(<Avatar fallback="FG" className="custom-class" />)
    expect((container.firstChild as HTMLElement).className).toMatch(/custom-class/)
  })
})

describe('accessibility', () => {
  it('has no violations', async () => {
    // Provide alt to satisfy role="img" accessible label requirement
    const { container } = render(<Avatar fallback="FG" alt="Fernando Ghiberti" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
