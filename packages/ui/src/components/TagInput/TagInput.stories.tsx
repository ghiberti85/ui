import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagInput } from './TagInput'

const meta: Meta<typeof TagInput> = {
  title: 'Components/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof TagInput>

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div style={{ width: 360 }}>
        <TagInput value={tags} onChange={setTags} placeholder="Add tag…" />
      </div>
    )
  },
}

export const WithInitialTags: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'CSS'])
    return (
      <div style={{ width: 360 }}>
        <TagInput value={tags} onChange={setTags} />
      </div>
    )
  },
}

export const MaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div style={{ width: 360 }}>
        <TagInput value={tags} onChange={setTags} maxTags={3} placeholder="Max 3 tags" />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: { value: ['React', 'TypeScript'], disabled: true },
}
