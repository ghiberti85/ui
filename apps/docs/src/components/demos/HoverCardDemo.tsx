'use client'

import { HoverCard, HoverCardTrigger, HoverCardContent } from '@ghiberti85/ui'

export function HoverCardLinkDemo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href="#"
          style={{ color: 'var(--color-semantic-primary)', textDecoration: 'underline', fontWeight: 600 }}
          onClick={(e) => e.preventDefault()}
        >
          @ghiberti85
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <strong style={{ color: 'var(--color-semantic-foreground)' }}>Fernando Ghiberti</strong>
          <span style={{ color: 'var(--color-semantic-foreground-muted)', fontSize: '0.875rem' }}>
            Senior Full-Stack Engineer &amp; Front-End Tech Lead
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardArrowDemo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <button
          style={{
            padding: '8px 16px',
            background: 'var(--color-semantic-primary)',
            color: 'var(--color-semantic-primary-foreground)',
            border: 'none',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
          }}
        >
          Hover for info
        </button>
      </HoverCardTrigger>
      <HoverCardContent showArrow>
        <p style={{ margin: 0, color: 'var(--color-semantic-foreground)' }}>
          This card has an arrow pointing to the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
