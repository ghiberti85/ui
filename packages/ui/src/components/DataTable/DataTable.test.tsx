import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import { expect, describe, it } from 'vitest'
import { DataTable } from './DataTable'


const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
  { key: 'role', header: 'Role' },
]

const data = [
  { name: 'Alice', age: 30, role: 'Engineer' },
  { name: 'Bob', age: 25, role: 'Designer' },
  { name: 'Charlie', age: 35, role: 'Manager' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Age')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('renders data rows', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
    expect(screen.getByText('Charlie')).toBeDefined()
  })

  it('shows empty message when no data', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeDefined()
  })

  it('filters data with search', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={data} searchable searchPlaceholder="Search" />)
    await user.type(screen.getByRole('searchbox'), 'alice')
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.queryByText('Bob')).toBeNull()
  })

  it('sorts by column when clicked', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={data} />)
    await user.click(screen.getByText('Name'))
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })

  it('renders custom cell renderer', () => {
    const cols = [
      { key: 'name', header: 'Name', render: (val: unknown) => <strong>{String(val)}</strong> },
    ]
    render(<DataTable columns={cols} data={[{ name: 'Alice' }]} />)
    expect(screen.getByText('Alice').tagName).toBe('STRONG')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DataTable columns={columns} data={data} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
