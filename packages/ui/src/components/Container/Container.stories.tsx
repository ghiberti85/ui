import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '2rem',
      background: 'var(--color-semantic-background-subtle, #fafafa)',
      border: '1px dashed var(--color-semantic-border, #e4e4e7)',
      borderRadius: 'var(--border-radius-md, 6px)',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: 'var(--color-semantic-foreground-muted, #71717a)',
    }}
  >
    {label}
  </div>
)

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container size=sm (max 640px)" />
    </Container>
  ),
}

export const Medium: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container size=md (max 768px)" />
    </Container>
  ),
}

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container size=lg (max 1024px)" />
    </Container>
  ),
}

export const ExtraLarge: Story = {
  args: { size: 'xl' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container size=xl (max 1280px)" />
    </Container>
  ),
}

export const Full: Story = {
  args: { size: 'full' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container size=full (100%)" />
    </Container>
  ),
}

export const PolymorphicMain: Story = {
  render: () => (
    <Container as="main" size="lg">
      <Placeholder label="Rendered as <main> element" />
    </Container>
  ),
}
