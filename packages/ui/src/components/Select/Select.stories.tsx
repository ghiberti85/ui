import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: { id: 'fruit', label: 'Fruit', options, placeholder: 'Select a fruit' },
}

export const WithHelperText: Story = {
  args: { id: 'fruit-helper', label: 'Fruit', options, helperText: 'Choose your favourite fruit' },
}

export const WithError: Story = {
  args: { id: 'fruit-error', label: 'Fruit', options, error: 'Please select a fruit' },
}

export const Disabled: Story = {
  args: { id: 'fruit-disabled', label: 'Fruit', options, disabled: true },
}

export const Small: Story = {
  args: { id: 'fruit-sm', label: 'Fruit', options, size: 'sm' },
}

export const Large: Story = {
  args: { id: 'fruit-lg', label: 'Fruit', options, size: 'lg' },
}

export const WithDefaultValue: Story = {
  args: { id: 'fruit-default', label: 'Fruit', options, defaultValue: 'banana' },
}
