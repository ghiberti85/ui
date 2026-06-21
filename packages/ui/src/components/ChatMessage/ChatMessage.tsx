import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './ChatMessage.module.css'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessageProps {
  role: ChatRole
  content: string
  timestamp?: string
  avatar?: React.ReactNode
  className?: string
}

/**
 * ChatMessage — a single message bubble for chat interfaces.
 * user: right-aligned, primary background.
 * assistant: left-aligned, subtle background.
 * system: centered, muted.
 */
export function ChatMessage({ role, content, timestamp, avatar, className }: ChatMessageProps) {
  if (role === 'system') {
    return (
      <div className={cn(styles.system, className)}>
        <span className={styles.systemText}>{content}</span>
        {timestamp && <span className={styles.systemTime}>{timestamp}</span>}
      </div>
    )
  }

  const isUser = role === 'user'

  return (
    <div className={cn(styles.row, isUser ? styles.rowUser : styles.rowAssistant, className)}>
      {!isUser && avatar && <div className={styles.avatar}>{avatar}</div>}
      <div className={styles.bubbleWrapper}>
        <div className={cn(styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant)}>
          {content}
        </div>
        {timestamp && (
          <span className={cn(styles.time, isUser ? styles.timeRight : styles.timeLeft)}>
            {timestamp}
          </span>
        )}
      </div>
      {isUser && avatar && <div className={styles.avatar}>{avatar}</div>}
    </div>
  )
}

ChatMessage.displayName = 'ChatMessage'

export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * ChatContainer — scrollable wrapper for a list of ChatMessage components.
 */
export function ChatContainer({ children, className, ...props }: ChatContainerProps) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  )
}

ChatContainer.displayName = 'ChatContainer'
