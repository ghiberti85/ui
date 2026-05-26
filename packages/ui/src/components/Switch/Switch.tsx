import * as React from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import { cn } from '../../utils/cn'
import styles from './Switch.module.css'

export interface SwitchProps {
  /** Visible label text */
  label?: string
  /** Optional description beneath the label */
  description?: string
  /** Controlled checked state */
  checked?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void
  /** HTML id for the switch */
  id?: string
  /** Additional class name */
  className?: string
}

/**
 * Switch component — accessible toggle switch built on Radix UI Switch.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Switch id="notifications" label="Enable notifications" onCheckedChange={setEnabled} />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, description, checked, disabled, onCheckedChange, id, className }, ref) => {
    const descId = description && id ? `${id}-desc` : undefined

    return (
      <div className={cn(styles.wrapper, className)}>
        <RadixSwitch.Root
          ref={ref}
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          aria-describedby={descId}
          className={styles.root}
        >
          <RadixSwitch.Thumb className={styles.thumb} />
        </RadixSwitch.Root>

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

Switch.displayName = 'Switch'
