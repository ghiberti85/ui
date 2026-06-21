import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { defaultValue: 40, 'aria-label': 'Volume' },
}

export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 0, label: '0' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 75, label: '75' },
      { value: 100, label: '100' },
    ],
    'aria-label': 'Level',
  },
}

export const WithStep: Story = {
  args: { defaultValue: 30, step: 10, 'aria-label': 'Step slider' },
}

export const Disabled: Story = {
  args: { defaultValue: 60, disabled: true, 'aria-label': 'Disabled' },
}
