import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: { id: 'default', label: 'Description', placeholder: 'Enter description…', rows: 4 },
}

export const WithHelperText: Story = {
  args: { id: 'helper', label: 'Bio', helperText: 'Max 200 characters', placeholder: 'Tell us about yourself' },
}

export const WithError: Story = {
  args: { id: 'error', label: 'Notes', placeholder: 'Enter notes…', error: 'This field is required' },
}

export const Disabled: Story = {
  args: { id: 'disabled', label: 'Disabled', placeholder: 'Cannot type here', disabled: true },
}

export const ResizeNone: Story = {
  args: { id: 'resize-none', label: 'Fixed Size', resize: 'none', rows: 4 },
}

export const ResizeBoth: Story = {
  args: { id: 'resize-both', label: 'Resize Both', resize: 'both', rows: 4 },
}
