import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as a div', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })

  it('accepts additional className', () => {
    render(<Card className="extra" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('extra')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).not.toBeNull()
  })

  it('applies variant class', () => {
    render(<Card variant="elevated" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('variant-elevated')
  })

  it('applies horizontal class for horizontal orientation', () => {
    render(<Card orientation="horizontal" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('horizontal')
  })

  it('applies hoverable class', () => {
    render(<Card hoverable data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('hoverable')
  })

  it('defaults to variant=default, orientation=vertical, hoverable=false', () => {
    render(<Card data-testid="card">Content</Card>)
    const el = screen.getByTestId('card')
    expect(el.className).toContain('variant-default')
    expect(el.className).not.toContain('horizontal')
    expect(el.className).not.toContain('hoverable')
  })
})

describe('CardImage', () => {
  it('renders an img with correct alt', () => {
    render(<CardImage src="/img.jpg" alt="Test image" />)
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('renders background position variant', () => {
    render(<CardImage src="/img.jpg" alt="bg" position="background" data-testid="bg" />)
    expect(screen.getByAltText('bg')).toBeInTheDocument()
  })
})

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).not.toBeNull()
  })
})

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>My Title</CardTitle>)
    expect(screen.getByRole('heading', { level: 3, name: 'My Title' })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CardTitle ref={ref}>Title</CardTitle>)
    expect(ref.current).not.toBeNull()
  })
})

describe('CardDescription', () => {
  it('renders as p', () => {
    render(<CardDescription>Desc</CardDescription>)
    expect(screen.getByText('Desc').tagName).toBe('P')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CardDescription ref={ref}>Desc</CardDescription>)
    expect(ref.current).not.toBeNull()
  })
})

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Body</CardContent>)
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CardContent ref={ref}>Body</CardContent>)
    expect(ref.current).not.toBeNull()
  })
})

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref.current).not.toBeNull()
  })
})

describe('Card compound usage', () => {
  it('renders full card structure', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Body</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Card Title' })).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Card Body')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('renders media card with image', () => {
    render(
      <Card data-testid="card">
        <CardImage src="/cover.jpg" alt="Cover photo" />
        <CardHeader>
          <CardTitle>Media Card</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    )
    expect(screen.getByAltText('Cover photo')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Media Card' })).toBeInTheDocument()
  })

  it('renders horizontal card', () => {
    render(
      <Card orientation="horizontal" data-testid="card">
        <CardImage src="/thumb.jpg" alt="Thumbnail" position="left" />
        <CardContent>Horizontal content</CardContent>
      </Card>
    )
    expect(screen.getByTestId('card').className).toContain('horizontal')
    expect(screen.getByAltText('Thumbnail')).toBeInTheDocument()
  })
})

describe('Card variants', () => {
  const variants = ['default', 'elevated', 'ghost', 'filled'] as const
  variants.forEach((variant) => {
    it(`renders variant="${variant}"`, () => {
      render(<Card variant={variant} data-testid="card">Content</Card>)
      expect(screen.getByTestId('card').className).toContain(`variant-${variant}`)
    })
  })
})

describe('accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations — with image', async () => {
    const { container } = render(
      <Card>
        <CardImage src="/img.jpg" alt="Descriptive alt text" />
        <CardContent>Content</CardContent>
      </Card>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
