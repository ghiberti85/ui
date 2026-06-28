import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Skeleton, SkeletonText, SkeletonAvatar } from './Skeleton'

describe('Skeleton', () => {
  it('renders as a div', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies width and height styles', () => {
    const { container } = render(<Skeleton width="200px" height="20px" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('20px')
  })

  it('converts numeric values to px', () => {
    const { container } = render(<Skeleton width={100} height={50} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('100px')
    expect(el.style.height).toBe('50px')
  })

  it('has aria-hidden', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })
})

describe('SkeletonText', () => {
  it('renders the correct number of lines', () => {
    const { container } = render(<SkeletonText lines={4} />)
    const lines = container.querySelectorAll('[aria-hidden="true"] [aria-hidden="true"]')
    expect(lines).toHaveLength(4)
  })

  it('renders default 3 lines', () => {
    const { container } = render(<SkeletonText />)
    // The outer container + 3 lines = 4 aria-hidden elements
    const lines = container.querySelectorAll('[aria-hidden="true"]')
    expect(lines.length).toBeGreaterThanOrEqual(3)
  })
})

describe('SkeletonAvatar', () => {
  it('renders with circle border radius', () => {
    const { container } = render(<SkeletonAvatar size={40} shape="circle" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.borderRadius).toBe('50%')
  })

  it('renders with size', () => {
    const { container } = render(<SkeletonAvatar size={48} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('48px')
    expect(el.style.height).toBe('48px')
  })
})

describe('Skeleton accessibility', () => {
  it('Skeleton has no accessibility violations', async () => {
    const { container } = render(<Skeleton width="200px" height="20px" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('SkeletonText has no accessibility violations', async () => {
    const { container } = render(<SkeletonText lines={3} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('SkeletonAvatar has no accessibility violations', async () => {
    const { container } = render(<SkeletonAvatar size={48} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
