import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Stack>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '0.5rem 1rem',
      background: 'var(--color-semantic-primary, #2563eb)',
      color: 'var(--color-semantic-primary-foreground, #fff)',
      borderRadius: 'var(--border-radius-md, 6px)',
      fontSize: '0.875rem',
      fontWeight: 500,
    }}
  >
    {children}
  </div>
)

export const Vertical: Story = {
  args: { direction: 'vertical', gap: 4 },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export const Horizontal: Story = {
  args: { direction: 'horizontal', gap: 4, align: 'center' },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export const SpaceBetween: Story = {
  args: { direction: 'horizontal', gap: 4, justify: 'between' },
  render: (args) => (
    <Stack {...args} style={{ width: '100%' }}>
      <Box>Left</Box>
      <Box>Right</Box>
    </Stack>
  ),
}

export const Wrapping: Story = {
  args: { direction: 'horizontal', gap: 4, wrap: true },
  render: (args) => (
    <Stack {...args} style={{ width: '300px' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>Item {i + 1}</Box>
      ))}
    </Stack>
  ),
}

export const PolymorphicSection: Story = {
  render: () => (
    <Stack as="section" gap={4} direction="vertical">
      <Box>Section item 1</Box>
      <Box>Section item 2</Box>
    </Stack>
  ),
}
