import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import { expect, describe, it, vi } from 'vitest'
import { TagInput } from './TagInput'


describe('TagInput', () => {
  it('renders placeholder', () => {
    render(<TagInput placeholder="Add tag" />)
    expect(screen.getByPlaceholderText('Add tag')).toBeDefined()
  })

  it('adds a tag on Enter', async () => {
    const user = userEvent.setup()
    render(<TagInput placeholder="Add" />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'React{Enter}')
    expect(screen.getByText('React')).toBeDefined()
  })

  it('calls onChange when a tag is removed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput value={['React']} onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Remove React' }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('calls onChange when tags change', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TagInput onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'React{Enter}')
    expect(onChange).toHaveBeenCalledWith(['React'])
  })

  it('respects maxTags', async () => {
    const user = userEvent.setup()
    render(<TagInput maxTags={1} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'React{Enter}')
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('renders with initial value', () => {
    render(<TagInput value={['React', 'TypeScript']} onChange={() => {}} />)
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('TypeScript')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<TagInput value={['React']} onChange={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
