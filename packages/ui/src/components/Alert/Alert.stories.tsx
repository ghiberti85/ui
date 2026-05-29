import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: { variant: 'info', title: 'Information', children: 'This is an informational message.' },
}

export const Success: Story = {
  args: { variant: 'success', title: 'Success', children: 'Your changes have been saved successfully.' },
}

export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning', children: 'Please review before proceeding.' },
}

export const Error: Story = {
  args: { variant: 'error', title: 'Error', children: 'Something went wrong. Please try again.' },
}

export const WithDismiss: Story = {
  args: { variant: 'info', title: 'Dismissable', children: 'Click the X to dismiss this alert.', onDismiss: () => alert('dismissed') },
}

export const NoTitle: Story = {
  args: { variant: 'warning', children: 'No title, just content.' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 480 }}>
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Proceed with caution.</Alert>
      <Alert variant="error" title="Error">Something failed.</Alert>
    </div>
  ),
}
