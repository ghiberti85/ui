import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover'

describe('Popover', () => {
  it('renders the trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument()
  })

  it('shows content when trigger is clicked', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )
    await userEvent.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('closes when PopoverClose is clicked', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          Content
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    )
    await userEvent.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByText('Content')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Accessible content</PopoverContent>
      </Popover>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
