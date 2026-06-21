import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive', 'outline'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: { children: 'React' },
}

function RemovableChip() {
  const [visible, setVisible] = React.useState(true)
  return visible ? (
    <Chip onRemove={() => setVisible(false)}>Remove me</Chip>
  ) : (
    <span style={{ color: 'gray', fontSize: '0.875rem' }}>Chip removed</span>
  )
}

export const Removable: Story = {
  render: () => <RemovableChip />,
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="destructive">Destructive</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true, onRemove: () => {} },
}
