import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    delayDuration: { control: 'number' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
    side: 'top',
    align: 'center',
    delayDuration: 400,
  },
}

export const AllSides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '64px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <Tooltip content="Top tooltip" side="top" delayDuration={0}>
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right" delayDuration={0}>
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom" delayDuration={0}>
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left" delayDuration={0}>
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip message that wraps across multiple lines to show how the bubble handles overflow.',
    children: <Button>Long tooltip</Button>,
    side: 'top',
    delayDuration: 0,
  },
}

export const Disabled: Story = {
  args: {
    content: 'You should never see this',
    children: <Button variant="ghost">No tooltip</Button>,
    disabled: true,
  },
}
