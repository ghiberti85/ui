import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage, ChatContainer } from './ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ChatMessage>

export const User: Story = {
  args: {
    role: 'user',
    content: 'Hey, can you help me with a React question?',
    timestamp: '10:30 AM',
  },
}

export const Assistant: Story = {
  args: {
    role: 'assistant',
    content: 'Of course! What would you like to know about React?',
    timestamp: '10:31 AM',
  },
}

export const System: Story = {
  args: { role: 'system', content: 'Conversation started', timestamp: '10:29 AM' },
}

export const Conversation: Story = {
  render: () => (
    <ChatContainer
      style={{ maxHeight: 400, border: '1px solid #e4e4e7', borderRadius: 8 }}
    >
      <ChatMessage role="system" content="Chat started" timestamp="10:00 AM" />
      <ChatMessage
        role="user"
        content="Hello! Can you help me?"
        timestamp="10:01 AM"
        avatar={
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
            }}
          >
            U
          </span>
        }
      />
      <ChatMessage
        role="assistant"
        content="Of course! I am here to help. What do you need?"
        timestamp="10:01 AM"
        avatar={
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#e4e4e7',
              color: '#18181b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
            }}
          >
            A
          </span>
        }
      />
      <ChatMessage role="user" content="How do I use the DataTable component?" timestamp="10:02 AM" />
      <ChatMessage
        role="assistant"
        content="The DataTable component accepts columns and data props. Columns define the structure, and data is the array of objects to display. You can also enable sorting and searching!"
        timestamp="10:02 AM"
      />
    </ChatContainer>
  ),
}
