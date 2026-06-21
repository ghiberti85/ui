import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    max: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

function DefaultRating() {
  const [value, setValue] = React.useState(3)
  return <Rating value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <DefaultRating />,
}

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
}

export const Disabled: Story = {
  args: { value: 2, disabled: true },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Rating value={3} size="sm" readOnly />
      <Rating value={3} size="md" readOnly />
      <Rating value={3} size="lg" readOnly />
    </div>
  ),
}

export const MaxStars: Story = {
  args: { value: 7, max: 10, readOnly: true },
}
