'use client'
import * as React from 'react'
import { Combobox } from '@ghiberti85/ui'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'SolidJS' },
]

export function ComboboxDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Combobox
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Select a framework..."
      searchPlaceholder="Search frameworks..."
    />
  )
}
