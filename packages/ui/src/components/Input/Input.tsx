import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text */
  label?: string
  /** Error message displayed below the input */
  error?: string
}

/**
 * Input component — accessible text input with optional label and error message.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Input label="Email" id="email" placeholder="you@example.com" />
 * <Input label="Name" id="name" error="Name is required" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, disabled, className, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          className={cn(styles.input, error && styles['input-error'], className)}
          {...props}
        />
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
