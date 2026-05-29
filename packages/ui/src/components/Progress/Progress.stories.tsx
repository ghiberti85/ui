import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: { value: 60, size: 'md', variant: 'default' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
      <Progress value={60} size="sm" aria-label="Small" />
      <Progress value={60} size="md" aria-label="Medium" />
      <Progress value={60} size="lg" aria-label="Large" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 320 }}>
      <Progress value={60} variant="default" aria-label="Default" />
      <Progress value={60} variant="success" aria-label="Success" />
      <Progress value={60} variant="warning" aria-label="Warning" />
      <Progress value={60} variant="error" aria-label="Error" />
      <Progress value={60} variant="info" aria-label="Info" />
    </div>
  ),
}

export const Empty: Story = { args: { value: 0, 'aria-label': 'Empty' } }
export const Full: Story = { args: { value: 100, 'aria-label': 'Full' } }
