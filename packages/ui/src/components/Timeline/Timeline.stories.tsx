import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

export const Default: StoryObj<typeof Timeline> = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline
        items={[
          { title: 'Project kickoff', date: 'January 2024', description: 'Initial planning and team assembly.' },
          { title: 'Design phase', date: 'February 2024', description: 'Wireframes and design system setup.' },
          { title: 'Development started', date: 'March 2024', description: 'Core components built.' },
          { title: 'Beta launch', date: 'May 2024', description: 'Public beta released to early users.' },
          { title: 'v1.0 released', date: 'June 2024' },
        ]}
      />
    </div>
  ),
}

export const WithVariants: StoryObj<typeof Timeline> = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline
        items={[
          { title: 'Deployment started', date: '09:00', variant: 'info', description: 'Rolling out to production.' },
          { title: 'Tests passed', date: '09:05', variant: 'success', description: 'All 287 tests green.' },
          { title: 'Warning detected', date: '09:10', variant: 'warning', description: 'Memory usage at 80%.' },
          { title: 'Error occurred', date: '09:15', variant: 'error', description: 'Rollback triggered.' },
          { title: 'Recovered', date: '09:20', variant: 'success', description: 'System stable.' },
        ]}
      />
    </div>
  ),
}

export const WithIcons: StoryObj<typeof Timeline> = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline
        items={[
          { title: 'Order placed', date: 'Dec 1', icon: '🛒', variant: 'default' },
          { title: 'Payment confirmed', date: 'Dec 1', icon: '💳', variant: 'success' },
          { title: 'Shipped', date: 'Dec 2', icon: '📦', variant: 'info' },
          { title: 'Out for delivery', date: 'Dec 4', icon: '🚚', variant: 'warning' },
          { title: 'Delivered', date: 'Dec 4', icon: '✅', variant: 'success' },
        ]}
      />
    </div>
  ),
}

export const Minimal: StoryObj<typeof Timeline> = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline
        items={[
          { title: 'Created account' },
          { title: 'Added first project' },
          { title: 'Invited team members' },
          { title: 'First deployment' },
        ]}
      />
    </div>
  ),
}
