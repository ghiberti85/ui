import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DataTable>

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (val: unknown) => (
      <span style={{ color: val === 'Active' ? 'green' : 'gray' }}>{String(val)}</span>
    ),
  },
]

const data = [
  { name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { name: 'Bob Smith', role: 'Designer', status: 'Inactive' },
  { name: 'Charlie Brown', role: 'Manager', status: 'Active' },
  { name: 'Diana Prince', role: 'Engineer', status: 'Active' },
]

export const Default: Story = {
  args: { columns, data },
}

export const Searchable: Story = {
  args: { columns, data, searchable: true, searchPlaceholder: 'Search team members...' },
}

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: 'No team members found.' },
}
