import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Fernando Ghiberti',
    size: 'md',
    shape: 'circle',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'FG',
    size: 'md',
    shape: 'circle',
  },
}

export const AutoInitials: Story = {
  args: {
    alt: 'Fernando Ghiberti',
    size: 'md',
    shape: 'circle',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="FG" size="xs" />
      <Avatar fallback="FG" size="sm" />
      <Avatar fallback="FG" size="md" />
      <Avatar fallback="FG" size="lg" />
      <Avatar fallback="FG" size="xl" />
    </div>
  ),
}

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="FG" size="md" shape="circle" />
      <Avatar fallback="FG" size="md" shape="square" />
    </div>
  ),
}

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {[
        { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice Brown' },
        { src: 'https://i.pravatar.cc/150?img=2', alt: 'Bob Chen' },
        { src: 'https://i.pravatar.cc/150?img=3', alt: 'Carol Diaz' },
        { fallback: 'FG', alt: 'Fernando Ghiberti' },
      ].map((avatar, i) => (
        <span
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : '-10px',
            position: 'relative',
            zIndex: 4 - i,
            display: 'inline-flex',
            border: '2px solid white',
            borderRadius: '9999px',
          }}
        >
          <Avatar
            src={'src' in avatar ? avatar.src : undefined}
            fallback={'fallback' in avatar ? avatar.fallback : undefined}
            alt={avatar.alt}
            size="md"
            shape="circle"
          />
        </span>
      ))}
    </div>
  ),
}
