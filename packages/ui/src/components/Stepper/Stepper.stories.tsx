import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './Stepper'

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Review', description: 'Review your details' },
  { label: 'Done', description: 'All set!' },
]

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    activeStep: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  args: { steps, activeStep: 1 },
}

function InteractiveStepper() {
  const [active, setActive] = React.useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Stepper steps={steps} activeStep={active} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}>
          Back
        </button>
        <button onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))} disabled={active === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveStepper />,
}

export const Vertical: Story = {
  args: { steps, activeStep: 2, orientation: 'vertical' },
}

export const WithError: Story = {
  args: {
    steps: [
      { label: 'Account', status: 'completed' },
      { label: 'Profile', status: 'error' },
      { label: 'Done', status: 'pending' },
    ],
    activeStep: 1,
  },
}
