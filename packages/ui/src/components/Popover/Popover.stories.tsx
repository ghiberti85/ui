import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover'
import { Button } from '../Button/Button'

const meta: Meta<typeof PopoverContent> = {
  title: 'Components/Popover',
  component: PopoverContent,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    showArrow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof PopoverContent>

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent {...args}>
          <p style={{ margin: 0 }}>This is popover content.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: { side: 'bottom', align: 'center', showArrow: false },
}

export const WithArrow: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">With Arrow</Button>
        </PopoverTrigger>
        <PopoverContent showArrow>
          <p style={{ margin: 0 }}>Arrow pointing to trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const WithClose: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p style={{ margin: '0 0 8px' }}>Click close to dismiss.</p>
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">Close</Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  ),
}
