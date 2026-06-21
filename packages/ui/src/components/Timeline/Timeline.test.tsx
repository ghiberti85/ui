import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Timeline, TimelineItem } from './Timeline'

const items = [
  { title: 'Project started', date: 'Jan 2024', variant: 'success' as const },
  { title: 'Beta launched', date: 'Mar 2024', description: 'First public release.' },
  { title: 'v1.0 released', date: 'Jun 2024', variant: 'default' as const },
]

describe('Timeline', () => {
  it('renders all items', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('Project started')).toBeInTheDocument()
    expect(screen.getByText('Beta launched')).toBeInTheDocument()
    expect(screen.getByText('v1.0 released')).toBeInTheDocument()
  })

  it('renders dates', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('Mar 2024')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('First public release.')).toBeInTheDocument()
  })

  it('renders as ordered list', () => {
    render(<Timeline items={items} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders empty timeline without errors', () => {
    render(<Timeline items={[]} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders with custom icon', () => {
    render(<Timeline items={[{ title: 'Event', icon: '⭐' }]} />)
    expect(screen.getByText('Event')).toBeInTheDocument()
    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('renders all variants', () => {
    const variantItems = [
      { title: 'Default', variant: 'default' as const },
      { title: 'Success', variant: 'success' as const },
      { title: 'Warning', variant: 'warning' as const },
      { title: 'Error', variant: 'error' as const },
      { title: 'Info', variant: 'info' as const },
    ]
    render(<Timeline items={variantItems} />)
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('renders standalone TimelineItem', () => {
    render(
      <ol>
        <TimelineItem title="Standalone event" date="Today" description="A description." />
      </ol>
    )
    expect(screen.getByText('Standalone event')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Timeline items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
