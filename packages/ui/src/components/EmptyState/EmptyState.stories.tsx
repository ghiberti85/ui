import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'search', 'error', 'no-results'] },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'No content yet',
    description: 'Get started by creating your first item.',
    action: { label: 'Create item', onClick: () => alert('clicked') },
  },
}

export const Search: Story = {
  args: {
    variant: 'search',
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
    action: { label: 'Clear search', onClick: () => {} },
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: 'We couldn\'t load this content. Please try again.',
    action: { label: 'Retry', onClick: () => {} },
  },
}

export const NoResults: Story = {
  args: {
    variant: 'no-results',
    title: 'No items match',
    description: 'Remove some filters to see more results.',
  },
}

export const WithoutAction: Story = {
  args: {
    variant: 'default',
    title: 'All done!',
    description: 'There\'s nothing left to review.',
  },
}
