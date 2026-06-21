import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { StreamingText } from './StreamingText'

const meta: Meta<typeof StreamingText> = {
  title: 'Components/StreamingText',
  component: StreamingText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof StreamingText>

export const Default: Story = {
  args: {
    text: 'Hello, I am streaming text appearing character by character.',
    speed: 30,
  },
}

export const Fast: Story = {
  args: { text: 'Fast streaming at 10ms per character.', speed: 10 },
}

export const NoCursor: Story = {
  args: { text: 'No cursor shown at the end.', cursor: false },
}

export const CustomCursor: Story = {
  args: { text: 'Custom cursor character', cursorChar: '|' },
}

export const SimulatedStreaming: Story = {
  render: () => {
    const fullText = 'The quick brown fox jumps over the lazy dog.'
    const [text, setText] = useState('')

    useEffect(() => {
      let i = 0
      const timer = setInterval(() => {
        i += 3
        setText(fullText.slice(0, i))
        if (i >= fullText.length) clearInterval(timer)
      }, 50)
      return () => clearInterval(timer)
    }, [])

    return (
      <p style={{ maxWidth: 400, lineHeight: 1.6 }}>
        <StreamingText text={text} speed={1} />
      </p>
    )
  },
}
