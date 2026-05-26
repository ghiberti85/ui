import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { id: 'default', label: 'Label', placeholder: 'Placeholder' },
}

export const WithError: Story = {
  args: { id: 'error', label: 'Email', placeholder: 'you@example.com', error: 'Email is required' },
}

export const Disabled: Story = {
  args: { id: 'disabled', label: 'Disabled', placeholder: 'Cannot type here', disabled: true },
}

export const NoLabel: Story = {
  args: { id: 'no-label', placeholder: 'No label' },
}
