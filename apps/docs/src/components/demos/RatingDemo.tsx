'use client'
import * as React from 'react'
import { Rating } from '@ghiberti85/ui'

export function RatingDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Rating value={value} onChange={setValue} />
      <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>
        Rating: {value} / 5
      </p>
    </div>
  )
}
