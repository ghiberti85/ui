import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, useToast } from './Toast'
import { Button } from '../Button/Button'

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Toaster>
        <Story />
      </Toaster>
    ),
  ],
}

export default meta
type Story = StoryObj

// ─── Default ──────────────────────────────────────────────────────────────────

function DefaultDemo() {
  const { toast } = useToast()
  return (
    <Button
      onClick={() => toast({ title: 'Notification', variant: 'default' })}
    >
      Show toast
    </Button>
  )
}

export const Default: Story = {
  render: () => <DefaultDemo />,
}

// ─── Variants ─────────────────────────────────────────────────────────────────

function VariantsDemo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => toast({ title: 'Default', variant: 'default' })}>
        Default
      </Button>
      <Button onClick={() => toast({ title: 'Success!', variant: 'success' })}>
        Success
      </Button>
      <Button onClick={() => toast({ title: 'Warning', variant: 'warning' })}>
        Warning
      </Button>
      <Button onClick={() => toast({ title: 'Error', variant: 'error' })}>
        Error
      </Button>
      <Button onClick={() => toast({ title: 'Info', variant: 'info' })}>
        Info
      </Button>
    </div>
  )
}

export const Variants: Story = {
  render: () => <VariantsDemo />,
}

// ─── WithDescription ──────────────────────────────────────────────────────────

function WithDescriptionDemo() {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'File saved',
          description: 'Your changes have been saved successfully.',
          variant: 'success',
        })
      }
    >
      Show toast with description
    </Button>
  )
}

export const WithDescription: Story = {
  render: () => <WithDescriptionDemo />,
}

// ─── WithAction ───────────────────────────────────────────────────────────────

function WithActionDemo() {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Email deleted',
          description: 'The email has been moved to trash.',
          variant: 'default',
          action: {
            label: 'Undo',
            onClick: () => alert('Undo clicked'),
          },
        })
      }
    >
      Show toast with action
    </Button>
  )
}

export const WithAction: Story = {
  render: () => <WithActionDemo />,
}
