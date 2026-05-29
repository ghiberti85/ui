import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Combobox } from './Combobox'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
]

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(<Combobox options={options} placeholder="Select framework..." />)
    expect(screen.getByText('Select framework...')).toBeInTheDocument()
  })

  it('has combobox role', () => {
    render(<Combobox options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('opens popover on click', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} placeholder="Select..." />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('filters options on search', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} />)
    await user.click(screen.getByRole('combobox'))
    const input = screen.getByRole('textbox')
    await user.type(input, 'rea')
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('Vue')).not.toBeInTheDocument()
  })

  it('calls onChange on selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('React'))
    expect(onChange).toHaveBeenCalledWith('react')
  })

  it('shows selected label', () => {
    render(<Combobox options={options} value="vue" />)
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('shows empty text when no results', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} emptyText="Nothing found" />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('textbox'), 'zzz')
    expect(screen.getByText('Nothing found')).toBeInTheDocument()
  })

  it('is disabled when disabled prop set', () => {
    render(<Combobox options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Combobox options={options} placeholder="Select..." />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
