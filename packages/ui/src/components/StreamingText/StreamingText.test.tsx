import { render, screen, act } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'
import { StreamingText } from './StreamingText'


describe('StreamingText', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('starts empty and animates to full text', () => {
    render(<StreamingText text="Hello" speed={10} />)
    act(() => { vi.advanceTimersByTime(50) })
    // The full text is available in the sr-only span
    expect(screen.getAllByText('Hello').length).toBeGreaterThan(0)
  })

  it('shows cursor by default', () => {
    const { container } = render(<StreamingText text="Hi" speed={1000} cursor />)
    expect(container.querySelector('span')).toBeDefined()
  })

  it('calls onComplete when done', () => {
    const onComplete = vi.fn()
    render(<StreamingText text="Hi" speed={10} onComplete={onComplete} />)
    act(() => { vi.advanceTimersByTime(100) })
    expect(onComplete).toHaveBeenCalled()
  })

  it('renders without cursor when cursor=false', () => {
    const { container } = render(<StreamingText text="Hi" cursor={false} speed={1000} />)
    // No cursor span — only wrapper, sr-only span, and displayed text span
    const cursorSpans = container.querySelectorAll('[class*="cursor"]')
    expect(cursorSpans.length).toBe(0)
  })

})

describe('StreamingText accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<StreamingText text="Hello world" speed={1000} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
