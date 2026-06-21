import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { OTPInput } from './OTPInput'

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof OTPInput>

export const Default: Story = {
  args: { length: 6 },
}

export const FourDigit: Story = {
  args: { length: 4 },
}

export const WithError: Story = {
  args: { length: 6, error: 'Invalid verification code' },
}

export const Disabled: Story = {
  args: { length: 6, disabled: true, value: '123456' },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <OTPInput value={val} onChange={setVal} />
        <p style={{ fontSize: '0.875rem' }}>Value: {val}</p>
      </div>
    )
  },
}
