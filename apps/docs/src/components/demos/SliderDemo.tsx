'use client'
import * as React from 'react'
import { Slider } from '@ghiberti85/ui'

export function SliderDemo() {
  const [value, setValue] = React.useState(40)
  return (
    <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Slider value={value} onChange={setValue} aria-label="Volume" />
      <p style={{ fontSize: '0.75rem', color: 'var(--color-semantic-foreground-muted)' }}>Value: {value}</p>
    </div>
  )
}

export function SliderMarksDemo() {
  const [value, setValue] = React.useState(50)
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <Slider
        value={value}
        onChange={setValue}
        step={25}
        marks={[
          { value: 0, label: '0' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 75, label: '75' },
          { value: 100, label: '100' },
        ]}
        aria-label="Level"
      />
    </div>
  )
}
