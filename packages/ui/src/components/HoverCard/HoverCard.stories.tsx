import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'

const meta: Meta<typeof HoverCardContent> = {
  title: 'Components/HoverCard',
  component: HoverCardContent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

export const Default: StoryObj<typeof HoverCardContent> = {
  render: () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <a href="#" style={{ color: 'var(--color-semantic-primary)', textDecoration: 'underline' }}>
          @ghiberti85
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <strong style={{ color: 'var(--color-semantic-foreground)' }}>Fernando Ghiberti</strong>
          <span style={{ color: 'var(--color-semantic-foreground-muted)', fontSize: '0.875rem' }}>
            Senior Full-Stack Engineer & Front-End Tech Lead
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithArrow: StoryObj<typeof HoverCardContent> = {
  render: () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <button style={{ padding: '8px 16px', background: 'var(--color-semantic-primary)', color: 'var(--color-semantic-primary-foreground)', border: 'none', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}>
          Hover for info
        </button>
      </HoverCardTrigger>
      <HoverCardContent showArrow>
        <p style={{ margin: 0, color: 'var(--color-semantic-foreground)' }}>
          This card has an arrow pointing to the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const AlignStart: StoryObj<typeof HoverCardContent> = {
  render: () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <a href="#" style={{ color: 'var(--color-semantic-primary)', textDecoration: 'underline' }}>
          Align Start
        </a>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p style={{ margin: 0, color: 'var(--color-semantic-foreground)' }}>
          Content aligned to the start of the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}
