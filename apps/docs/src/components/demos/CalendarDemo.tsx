'use client'
import * as React from 'react'
import { Calendar } from '@ghiberti85/ui'

export function CalendarSingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <Calendar mode="single" selected={date} onSelect={setDate} />
      {date && (
        <p style={{ fontSize: '0.875rem', color: 'var(--color-semantic-foreground-muted)' }}>
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export function CalendarRangeDemo() {
  const [range, setRange] = React.useState<{ from: Date | undefined; to?: Date } | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Calendar mode="range" selected={range as any} onSelect={setRange as any} />
}
