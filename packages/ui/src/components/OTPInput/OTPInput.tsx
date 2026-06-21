'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './OTPInput.module.css'

export interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: string
  autoFocus?: boolean
  className?: string
}

/**
 * OTPInput — PIN/verification code input with N separate digit boxes.
 * Auto-advances on input; backspace moves to previous box.
 */
export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  autoFocus = false,
  className,
}: OTPInputProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? '')
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const isControlled = value !== undefined
  const current = isControlled ? value : internalValue
  const digits = Array.from({ length }, (_, i) => current[i] ?? '')

  function update(next: string) {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const next = digits.map((d, i) => (i === index ? char : d)).join('')
    update(next)
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? '' : d)).join('')
        update(next)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
        const next = digits.map((d, i) => (i === index - 1 ? '' : d)).join('')
        update(next)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = Array.from({ length }, (_, i) => pasted[i] ?? '').join('')
    update(next)
    const focusIdx = Math.min(pasted.length, length - 1)
    inputRefs.current[focusIdx]?.focus()
  }

  const id = React.useId()

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        className={cn(styles.inputs, error && styles.hasError)}
        role="group"
        aria-label="One-time password"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            id={`${id}-${i}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            className={cn(styles.input, error && styles.inputError, disabled && styles.inputDisabled)}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  )
}

OTPInput.displayName = 'OTPInput'
