'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './StreamingText.module.css'

export interface StreamingTextProps {
  text: string
  speed?: number
  cursor?: boolean
  cursorChar?: string
  onComplete?: () => void
  className?: string
}

/**
 * StreamingText — text that appears character by character with a blinking cursor.
 * When `text` prop grows (streaming scenario), continues from current position.
 */
export function StreamingText({
  text,
  speed = 30,
  cursor = true,
  cursorChar = '▋',
  onComplete,
  className,
}: StreamingTextProps) {
  const [displayed, setDisplayed] = React.useState('')
  const indexRef = React.useRef(0)
  const onCompleteRef = React.useRef(onComplete)
  onCompleteRef.current = onComplete

  React.useEffect(() => {
    if (text.length < indexRef.current) {
      indexRef.current = 0
      setDisplayed('')
    }

    if (indexRef.current >= text.length) return

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
      } else {
        clearInterval(timer)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  const isDone = displayed.length === text.length

  return (
    <span className={cn(styles.wrapper, className)}>
      {/* Screen readers get the full text immediately via the hidden element */}
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">{displayed}</span>
      {cursor && !isDone && (
        <span className={styles.cursor} aria-hidden="true">{cursorChar}</span>
      )}
      {cursor && isDone && (
        <span className={cn(styles.cursor, styles.cursorBlink)} aria-hidden="true">{cursorChar}</span>
      )}
    </span>
  )
}

StreamingText.displayName = 'StreamingText'
