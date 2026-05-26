import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px' }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '40px', padding: '8px' }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
}

export const Semantic: Story = {
  args: { orientation: 'horizontal', decorative: false },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px' }}>
        <p>Section one</p>
        <Story />
        <p>Section two</p>
      </div>
    ),
  ],
}
