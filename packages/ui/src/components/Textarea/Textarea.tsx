import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Textarea.module.css'

export type TextareaResize = 'none' | 'vertical' | 'both'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label text */
  label?: string
  /** Helper text displayed below the textarea */
  helperText?: string
  /** Error message — when set, overrides helperText display and applies error styles */
  error?: string
  /** Number of visible rows (default: 4) */
  rows?: number
  /** CSS resize behaviour (default: 'vertical') */
  resize?: TextareaResize
}

/**
 * Textarea component — accessible multi-line text input with optional label,
 * helper text, and error state.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Textarea id="bio" label="Bio" helperText="Tell us about yourself" />
 * <Textarea id="notes" label="Notes" error="Notes are required" />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      id,
      helperText,
      error,
      rows = 4,
      resize = 'vertical',
      disabled,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const helperId = helperText && id ? `${id}-helper` : undefined
    const errorId = error && id ? `${id}-error` : undefined
    const describedBy = errorId ?? helperId

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(styles.textarea, error && styles['textarea-error'], className)}
          style={{ resize, ...style }}
          {...props}
        />
        {error ? (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className={styles.helper}>
            {helperText}
          </span>
        ) : null}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
