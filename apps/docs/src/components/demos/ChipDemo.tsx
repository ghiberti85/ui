'use client'
import * as React from 'react'
import { Chip } from '@ghiberti85/ui'

export function ChipRemovableDemo() {
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'CSS'])
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Chip key={tag} variant="secondary" onRemove={() => setTags(tags.filter((t) => t !== tag))}>
          {tag}
        </Chip>
      ))}
    </div>
  )
}
