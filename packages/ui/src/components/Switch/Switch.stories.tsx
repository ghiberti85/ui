import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { id: 'default', label: 'Enable feature' },
}

export const Checked: Story = {
  args: { id: 'checked', label: 'Enabled', checked: true },
}

export const WithDescription: Story = {
  args: {
    id: 'with-desc',
    label: 'Email notifications',
    description: 'Receive email updates about your account.',
  },
}

export const Disabled: Story = {
  args: { id: 'disabled', label: 'Disabled option', disabled: true },
}

export const DisabledChecked: Story = {
  args: { id: 'disabled-checked', label: 'Locked on', checked: true, disabled: true },
}

export const Interaction: Story = {
  args: { id: 'interaction', label: 'Enable notifications' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('switch', { name: 'Enable notifications' })
    await expect(toggle).toBeInTheDocument()
    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).not.toBeChecked()
  },
}
