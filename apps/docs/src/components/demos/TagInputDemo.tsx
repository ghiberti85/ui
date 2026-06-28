'use client'
import * as React from 'react'
import { TagInput } from '@ghiberti85/ui'

export function TagInputDemo() {
  const [tags, setTags] = React.useState(['React', 'TypeScript'])
  return <TagInput value={tags} onChange={setTags} placeholder="Add tag…" />
}

export function TagInputMaxDemo() {
  const [tags, setTags] = React.useState(['Max', 'Three'])
  return <TagInput value={tags} onChange={setTags} maxTags={3} placeholder="Max 3 tags" />
}

export function TagInputDisabledDemo() {
  return <TagInput disabled value={['Disabled', 'Tag']} onChange={() => {}} />
}
