import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'select', options: [true, false, 'indeterminate'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { id: 'default', label: 'Accept terms and conditions' },
}

export const Checked: Story = {
  args: { id: 'checked', label: 'Checked', checked: true },
}

export const Indeterminate: Story = {
  args: { id: 'indeterminate', label: 'Select all', checked: 'indeterminate' },
}

export const WithDescription: Story = {
  args: {
    id: 'with-desc',
    label: 'Marketing emails',
    description: 'Receive emails about new products and features.',
  },
}

export const Disabled: Story = {
  args: { id: 'disabled', label: 'Disabled option', disabled: true },
}

export const DisabledChecked: Story = {
  args: { id: 'disabled-checked', label: 'Disabled & checked', checked: true, disabled: true },
}

export const Interaction: Story = {
  args: { id: 'interaction', label: 'Accept terms and conditions' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms and conditions' })
    await expect(checkbox).toBeInTheDocument()
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}
