import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonAvatar } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: { width: '200px', height: '20px' },
}

export const TextPlaceholder: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SkeletonText lines={4} />
    </div>
  ),
}

export const AvatarPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <SkeletonAvatar size={48} shape="circle" />
      <div style={{ flex: 1 }}>
        <SkeletonText lines={2} />
      </div>
    </div>
  ),
}

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: 320, padding: '1rem', border: '1px solid var(--color-semantic-border)', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton height="160px" />
      <SkeletonText lines={3} />
      <Skeleton height="36px" width="120px" />
    </div>
  ),
}
