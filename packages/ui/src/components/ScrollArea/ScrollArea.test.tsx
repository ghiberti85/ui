import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ScrollArea, ScrollAreaScrollbar } from './ScrollArea'

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea style={{ height: 100 }}>
        <p>Scrollable content</p>
      </ScrollArea>
    )
    expect(screen.getByText('Scrollable content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ScrollArea className="custom-class" style={{ height: 100 }}>
        <p>Content</p>
      </ScrollArea>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with vertical orientation without error', () => {
    const { container } = render(
      <ScrollArea orientation="vertical" style={{ height: 100 }}>
        <div style={{ height: 500 }}>Tall content</div>
      </ScrollArea>
    )
    // Root element is present — scrollbars are not rendered in JSDOM (no ResizeObserver layout)
    expect(container.firstChild).toBeTruthy()
  })

  it('renders with horizontal orientation without error', () => {
    const { container } = render(
      <ScrollArea orientation="horizontal" style={{ width: 100 }}>
        <div style={{ width: 500 }}>Wide content</div>
      </ScrollArea>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('renders with both orientation without error', () => {
    const { container } = render(
      <ScrollArea orientation="both" style={{ height: 100, width: 100 }}>
        <div style={{ height: 500, width: 500 }}>Large content</div>
      </ScrollArea>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('renders ScrollAreaScrollbar within a ScrollArea without error', () => {
    const { container } = render(
      <ScrollArea style={{ height: 100 }}>
        <ScrollAreaScrollbar orientation="horizontal" />
        <div>Content</div>
      </ScrollArea>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('forwards ref to root element', () => {
    const ref = { current: null }
    render(
      <ScrollArea ref={ref} style={{ height: 100 }}>
        <p>Content</p>
      </ScrollArea>
    )
    expect(ref.current).toBeTruthy()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ScrollArea style={{ height: 100 }}>
        <p>Scrollable content</p>
      </ScrollArea>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
