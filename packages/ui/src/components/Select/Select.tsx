import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { cn } from '../../utils/cn'
import styles from './Select.module.css'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  /** Visible label text */
  label?: string
  /** Placeholder shown when no value is selected */
  placeholder?: string
  /** List of options */
  options: SelectOption[]
  /** Error message */
  error?: string
  /** Helper text */
  helperText?: string
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: SelectSize
  /** Controlled value */
  value?: string
  /** Default uncontrolled value */
  defaultValue?: string
  /** Change handler */
  onValueChange?: (value: string) => void
  /** HTML id for the trigger */
  id?: string
  /** Name for form submission */
  name?: string
}

/**
 * Select component — accessible dropdown built on Radix UI Select.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Select label="Country" options={[{ value: 'us', label: 'United States' }]} />
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = 'Select an option',
      options,
      error,
      helperText,
      disabled,
      size = 'md',
      value,
      defaultValue,
      onValueChange,
      id,
      name,
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
        <RadixSelect.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              styles.trigger,
              styles[`size-${size}`],
              error && styles['trigger-error']
            )}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={styles.icon}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
              <RadixSelect.Viewport className={styles.viewport}>
                {options.map((opt) => (
                  <RadixSelect.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={styles.item}
                  >
                    <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className={styles.itemIndicator}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

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

Select.displayName = 'Select'

// Re-export Radix primitives for advanced usage
export const SelectRoot = RadixSelect.Root
export const SelectTrigger = RadixSelect.Trigger
export const SelectContent = RadixSelect.Content
export const SelectItem = RadixSelect.Item
