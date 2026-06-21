'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './NumberInput.module.css'

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'size'> {
  /** Current numeric value */
  value?: number
  /** Callback with new numeric value */
  onChange?: (value: number | undefined) => void
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Step size for increment/decrement */
  step?: number
  /** Number of decimal places */
  precision?: number
  /** Prefix symbol (e.g. "$", "€") */
  prefix?: string
  /** Suffix symbol (e.g. "%", "kg") */
  suffix?: string
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Error message */
  error?: string
  /** Helper text below input */
  helperText?: string
  /** Additional className */
  className?: string
}

/**
 * NumberInput — numeric input with stepper buttons, min/max, prefix/suffix.
 *
 * @example
 * <NumberInput label="Amount" value={100} onChange={setAmount} prefix="$" min={0} />
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      precision,
      prefix,
      suffix,
      size = 'md',
      label,
      error,
      helperText,
      disabled,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const errorId = `${id}-error`
    const helperId = `${id}-helper`

    const [inputValue, setInputValue] = React.useState(
      value !== undefined ? String(value) : ''
    )

    React.useEffect(() => {
      setInputValue(value !== undefined ? String(value) : '')
    }, [value])

    function clamp(n: number): number {
      if (min !== undefined && n < min) return min
      if (max !== undefined && n > max) return max
      return n
    }

    function applyPrecision(n: number): number {
      if (precision === undefined) return n
      return parseFloat(n.toFixed(precision))
    }

    function commit(raw: string) {
      const parsed = parseFloat(raw)
      if (raw === '' || raw === '-') {
        onChange?.(undefined)
        return
      }
      if (isNaN(parsed)) {
        setInputValue(value !== undefined ? String(value) : '')
        return
      }
      const clamped = applyPrecision(clamp(parsed))
      setInputValue(String(clamped))
      onChange?.(clamped)
    }

    function increment() {
      const current = value ?? 0
      const next = applyPrecision(clamp(current + step))
      setInputValue(String(next))
      onChange?.(next)
    }

    function decrement() {
      const current = value ?? 0
      const next = applyPrecision(clamp(current - step))
      setInputValue(String(next))
      onChange?.(next)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'ArrowUp') { e.preventDefault(); increment() }
      if (e.key === 'ArrowDown') { e.preventDefault(); decrement() }
    }

    const canIncrement = !disabled && (max === undefined || (value ?? 0) < max)
    const canDecrement = !disabled && (min === undefined || (value ?? 0) > min)

    return (
      <div className={cn(styles.wrapper, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={cn(
            styles.inputRow,
            styles[size],
            error && styles.hasError,
            disabled && styles.disabled
          )}
        >
          {prefix && <span className={styles.affix} aria-hidden="true">{prefix}</span>}
          <button
            type="button"
            aria-label="Decrease"
            className={styles.stepper}
            onClick={decrement}
            disabled={!canDecrement}
            tabIndex={-1}
          >
            −
          </button>
          <input
            {...rest}
            ref={ref}
            id={id}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-invalid={!!error}
            aria-describedby={
              [error ? errorId : null, helperText ? helperId : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            disabled={disabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          <button
            type="button"
            aria-label="Increase"
            className={styles.stepper}
            onClick={increment}
            disabled={!canIncrement}
            tabIndex={-1}
          >
            +
          </button>
          {suffix && <span className={styles.affix} aria-hidden="true">{suffix}</span>}
        </div>
        {error && (
          <span id={errorId} className={styles.error} role="alert">{error}</span>
        )}
        {helperText && !error && (
          <span id={helperId} className={styles.helperText}>{helperText}</span>
        )}
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'
