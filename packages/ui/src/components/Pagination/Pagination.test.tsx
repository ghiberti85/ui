import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders navigation', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />)
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
  })

  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Page 3')).toHaveAttribute('aria-current', 'page')
  })

  it('calls onPageChange when clicking a page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Page 3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange for prev/next', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Previous page'))
    expect(onPageChange).toHaveBeenCalledWith(2)
    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('disables prev on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination page={5} totalPages={20} onPageChange={vi.fn()} />)
    const ellipsis = document.querySelectorAll('[aria-hidden="true"]')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it('shows first/last buttons when showFirstLast', () => {
    render(<Pagination page={5} totalPages={10} onPageChange={vi.fn()} showFirstLast />)
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Pagination page={3} totalPages={10} onPageChange={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
