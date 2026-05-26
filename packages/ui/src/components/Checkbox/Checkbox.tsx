import * as React from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { cn } from '../../utils/cn'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  /** Visible label text */
  label?: string
  /** Optional description beneath the label */
  description?: string
  /** Controlled checked state — true | false | 'indeterminate' */
  checked?: boolean | 'indeterminate'
  /** Disabled state */
  disabled?: boolean
  /** Change handler */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  /** HTML id for the checkbox */
  id?: string
  /** Additional class name */
  className?: string
}

/**
 * Checkbox component — accessible checkbox built on Radix UI Checkbox.
 * Supports checked, unchecked, and indeterminate states.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Checkbox id="terms" label="Accept terms" onCheckedChange={setChecked} />
 * <Checkbox id="select-all" label="Select all" checked="indeterminate" />
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, description, checked, disabled, onCheckedChange, id, className }, ref) => {
    const descId = description && id ? `${id}-desc` : undefined

    return (
      <div className={cn(styles.wrapper, className)}>
        <RadixCheckbox.Root
          ref={ref}
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          aria-describedby={descId}
          className={styles.root}
        >
          <RadixCheckbox.Indicator className={styles.indicator} />
        </RadixCheckbox.Root>

        {(label || description) && (
          <div className={styles.textWrapper}>
            {label && (
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
            )}
            {description && (
              <span id={descId} className={styles.description}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
