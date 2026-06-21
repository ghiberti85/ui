import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { expect, describe, it } from 'vitest'
import { ChatMessage, ChatContainer } from './ChatMessage'


describe('ChatMessage', () => {
  it('renders user message', () => {
    render(<ChatMessage role="user" content="Hello there" />)
    expect(screen.getByText('Hello there')).toBeDefined()
  })

  it('renders assistant message', () => {
    render(<ChatMessage role="assistant" content="Hi! How can I help?" />)
    expect(screen.getByText('Hi! How can I help?')).toBeDefined()
  })

  it('renders system message', () => {
    render(<ChatMessage role="system" content="Conversation started" />)
    expect(screen.getByText('Conversation started')).toBeDefined()
  })

  it('renders timestamp', () => {
    render(<ChatMessage role="user" content="Hi" timestamp="10:30 AM" />)
    expect(screen.getByText('10:30 AM')).toBeDefined()
  })

  it('renders avatar', () => {
    render(
      <ChatMessage
        role="assistant"
        content="Hi"
        avatar={<span data-testid="avatar">A</span>}
      />
    )
    expect(screen.getByTestId('avatar')).toBeDefined()
  })

  it('ChatContainer renders children', () => {
    render(
      <ChatContainer>
        <ChatMessage role="user" content="Hello" />
        <ChatMessage role="assistant" content="World" />
      </ChatContainer>
    )
    expect(screen.getByText('Hello')).toBeDefined()
    expect(screen.getByText('World')).toBeDefined()
  })

  it('has no accessibility violations (user)', async () => {
    const { container } = render(<ChatMessage role="user" content="Hello" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations (assistant)', async () => {
    const { container } = render(<ChatMessage role="assistant" content="Hi!" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
