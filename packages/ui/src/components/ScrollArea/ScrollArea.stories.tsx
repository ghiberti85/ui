import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const TAGS = Array.from({ length: 30 }, (_, i) => `item-${i + 1}`)

export const Vertical: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ height: 200, width: 300, border: '1px solid var(--color-semantic-border)', borderRadius: 8, padding: 12 }}>
      {TAGS.map((tag) => (
        <div key={tag} style={{ padding: '4px 0', fontSize: '0.875rem', borderBottom: '1px solid var(--color-semantic-border)' }}>
          {tag}
        </div>
      ))}
    </ScrollArea>
  ),
  args: { orientation: 'vertical' },
}

export const Horizontal: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ width: 300, border: '1px solid var(--color-semantic-border)', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
        {TAGS.map((tag) => (
          <div key={tag} style={{ padding: '8px 16px', background: 'var(--color-semantic-background-subtle)', borderRadius: 6, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: { orientation: 'horizontal' },
}

export const Both: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ height: 200, width: 300, border: '1px solid var(--color-semantic-border)', borderRadius: 8, padding: 12 }}>
      <div style={{ width: 600 }}>
        {TAGS.map((tag) => (
          <div key={tag} style={{ padding: '4px 0', fontSize: '0.875rem', whiteSpace: 'nowrap', borderBottom: '1px solid var(--color-semantic-border)' }}>
            {tag} — wide content that forces horizontal scroll
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: { orientation: 'both' },
}
