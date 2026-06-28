'use client'

import { EmptyState } from '@ghiberti85/ui'

export function EmptyStateDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, border: '1px solid var(--color-semantic-border)', borderRadius: 8, background: 'var(--color-semantic-background-subtle)', overflow: 'hidden' }}>
      <EmptyState
        variant="default"
        title="No content yet"
        description="Get started by creating your first item."
        action={{ label: 'Create item', onClick: () => {} }}
      />
      <EmptyState
        variant="search"
        title="No results found"
        description="Try adjusting your search terms."
        action={{ label: 'Clear search', onClick: () => {} }}
      />
      <EmptyState
        variant="error"
        title="Something went wrong"
        description="We couldn't load this content. Please try again."
        action={{ label: 'Retry', onClick: () => {} }}
      />
      <EmptyState
        variant="no-results"
        title="No items match"
        description="Remove some filters to see more results."
      />
    </div>
  )
}
