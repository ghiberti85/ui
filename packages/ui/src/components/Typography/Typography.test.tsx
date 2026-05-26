import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import { Heading, Text, Label, Code } from './Typography'

// ── Heading ───────────────────────────────────────────────────────────────────

describe('Heading', () => {
  it('renders with default props (h2, size 2xl)', () => {
    render(<Heading>Hello</Heading>)
    const el = screen.getByRole('heading', { name: /hello/i })
    expect(el).toBeInTheDocument()
    expect(el.tagName).toBe('H2')
    expect(el.className).toMatch(/heading-size-2xl/)
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'renders as %s when as="%s"',
    (tag) => {
      render(<Heading as={tag}>Title</Heading>)
      expect(screen.getByRole('heading').tagName).toBe(tag.toUpperCase())
    }
  )

  it.each(['4xl', '3xl', '2xl', 'xl', 'lg', 'md'] as const)(
    'applies size class heading-size-%s',
    (size) => {
      render(<Heading size={size}>Title</Heading>)
      expect(screen.getByRole('heading').className).toMatch(
        new RegExp(`heading-size-${size}`)
      )
    }
  )

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLHeadingElement | null }
    render(<Heading ref={ref}>Ref</Heading>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('H2')
  })

  it('passes additional HTML attributes', () => {
    render(<Heading data-testid="heading-el">Test</Heading>)
    expect(screen.getByTestId('heading-el')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<Heading className="custom">Test</Heading>)
    expect(screen.getByRole('heading').className).toContain('custom')
  })
})

// ── Text ──────────────────────────────────────────────────────────────────────

describe('Text', () => {
  it('renders as <p> with default props', () => {
    render(<Text>Body copy</Text>)
    const el = screen.getByText(/body copy/i)
    expect(el.tagName).toBe('P')
    expect(el.className).toMatch(/text-size-md/)
    expect(el.className).toMatch(/text-weight-regular/)
    expect(el.className).toMatch(/text-color-default/)
  })

  it.each(['p', 'span', 'div'] as const)(
    'renders as <%s> when as="%s"',
    (tag) => {
      render(<Text as={tag} data-testid="text-el">Copy</Text>)
      expect(screen.getByTestId('text-el').tagName).toBe(tag.toUpperCase())
    }
  )

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies size class text-size-%s',
    (size) => {
      render(<Text size={size} data-testid="text-el">Copy</Text>)
      expect(screen.getByTestId('text-el').className).toMatch(
        new RegExp(`text-size-${size}`)
      )
    }
  )

  it.each(['regular', 'medium', 'semibold', 'bold'] as const)(
    'applies weight class text-weight-%s',
    (weight) => {
      render(<Text weight={weight} data-testid="text-el">Copy</Text>)
      expect(screen.getByTestId('text-el').className).toMatch(
        new RegExp(`text-weight-${weight}`)
      )
    }
  )

  it('applies color class text-color-default', () => {
    render(<Text color="default" data-testid="text-el">Copy</Text>)
    expect(screen.getByTestId('text-el').className).toMatch(/text-color-default/)
  })

  it('applies color class text-color-muted', () => {
    render(<Text color="muted" data-testid="text-el">Copy</Text>)
    expect(screen.getByTestId('text-el').className).toMatch(/text-color-muted/)
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLParagraphElement | null }
    render(<Text ref={ref}>Ref</Text>)
    expect(ref.current).not.toBeNull()
  })

  it('passes additional HTML attributes', () => {
    render(<Text data-testid="text-attr">Text</Text>)
    expect(screen.getByTestId('text-attr')).toBeInTheDocument()
  })
})

// ── Label ─────────────────────────────────────────────────────────────────────

describe('Label', () => {
  it('renders a <label> element', () => {
    render(<Label>Email</Label>)
    expect(screen.getByText(/email/i).tagName).toBe('LABEL')
  })

  it('does not apply required class when required is false (default)', () => {
    render(<Label data-testid="label-el">Name</Label>)
    expect(screen.getByTestId('label-el').className).not.toMatch(/label-required/)
  })

  it('applies required class when required is true', () => {
    render(<Label required data-testid="label-el">Name</Label>)
    expect(screen.getByTestId('label-el').className).toMatch(/label-required/)
  })

  it('associates with an input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" type="email" />
      </>
    )
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLLabelElement | null }
    render(<Label ref={ref}>Ref</Label>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('LABEL')
  })

  it('passes additional HTML attributes', () => {
    render(<Label data-testid="label-attr">Label</Label>)
    expect(screen.getByTestId('label-attr')).toBeInTheDocument()
  })
})

// ── Code ──────────────────────────────────────────────────────────────────────

describe('Code', () => {
  it('renders inline <code> by default', () => {
    render(<Code data-testid="code-el">const x = 1</Code>)
    const el = screen.getByTestId('code-el')
    expect(el.tagName).toBe('CODE')
    expect(el.className).toMatch(/code-inline/)
  })

  it('renders <pre><code> when block is true', () => {
    render(<Code block data-testid="code-el">const x = 1</Code>)
    const codeEl = screen.getByTestId('code-el')
    expect(codeEl.tagName).toBe('CODE')
    // The parent should be a <pre>
    expect(codeEl.parentElement?.tagName).toBe('PRE')
    expect(codeEl.parentElement?.className).toMatch(/code-block/)
  })

  it('renders children content', () => {
    render(<Code>hello world</Code>)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })

  it('forwards ref on inline code', () => {
    const ref = { current: null as HTMLElement | null }
    render(<Code ref={ref}>inline</Code>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('CODE')
  })

  it('forwards ref on block code', () => {
    const ref = { current: null as HTMLElement | null }
    render(<Code block ref={ref}>block</Code>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('CODE')
  })

  it('passes additional HTML attributes on inline code', () => {
    render(<Code data-testid="code-attr">code</Code>)
    expect(screen.getByTestId('code-attr')).toBeInTheDocument()
  })

  it('passes additional HTML attributes on block code', () => {
    render(<Code block data-testid="code-block-attr">code</Code>)
    expect(screen.getByTestId('code-block-attr')).toBeInTheDocument()
  })
})

describe('accessibility', () => {
  it('Heading has no violations', async () => {
    const { container } = render(<Heading>Page Title</Heading>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Text has no violations', async () => {
    const { container } = render(<Text>Some paragraph text</Text>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Label has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="field-id">Field label</Label>
        <input id="field-id" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Code has no violations', async () => {
    const { container } = render(<Code>const x = 1</Code>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
