import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from './TagInput'

const meta: Meta<typeof TagInput> = {
  title: 'Components/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof TagInput>

function DefaultDemo() {
  const [tags, setTags] = React.useState<string[]>([])
  return (
    <div style={{ width: 360 }}>
      <TagInput value={tags} onChange={setTags} placeholder="Add tag…" />
    </div>
  )
}

function WithInitialTagsDemo() {
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'CSS'])
  return (
    <div style={{ width: 360 }}>
      <TagInput value={tags} onChange={setTags} />
    </div>
  )
}

function MaxTagsDemo() {
  const [tags, setTags] = React.useState<string[]>([])
  return (
    <div style={{ width: 360 }}>
      <TagInput value={tags} onChange={setTags} maxTags={3} placeholder="Max 3 tags" />
    </div>
  )
}

export const Default: Story = { render: () => <DefaultDemo /> }
export const WithInitialTags: Story = { render: () => <WithInitialTagsDemo /> }
export const MaxTags: Story = { render: () => <MaxTagsDemo /> }
export const Disabled: Story = {
  args: { value: ['React', 'TypeScript'], disabled: true },
}
