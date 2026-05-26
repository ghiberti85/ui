import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './Radio'

const options = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
]

const optionsWithDesc = [
  { value: 'starter', label: 'Starter', description: 'Perfect for individuals' },
  { value: 'pro', label: 'Pro', description: 'For growing teams' },
  { value: 'enterprise', label: 'Enterprise', description: 'For large organisations' },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: { id: 'colour', label: 'Colour', options },
}

export const Horizontal: Story = {
  args: { id: 'colour-h', label: 'Colour', options, orientation: 'horizontal' },
}

export const WithDescriptions: Story = {
  args: { id: 'plan', label: 'Plan', options: optionsWithDesc },
}

export const WithDefaultValue: Story = {
  args: { id: 'colour-val', label: 'Colour', options, value: 'blue' },
}

export const Disabled: Story = {
  args: { id: 'colour-disabled', label: 'Colour', options, disabled: true },
}
