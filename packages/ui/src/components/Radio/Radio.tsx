import * as React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { cn } from '../../utils/cn'
import styles from './Radio.module.css'

export interface RadioOption {
  value: string
  label: string
  description?: string
}

export interface RadioGroupProps {
  /** Options to render */
  options: RadioOption[]
  /** Controlled value */
  value?: string
  /** Change handler */
  onValueChange?: (value: string) => void
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Disabled state — disables the whole group */
  disabled?: boolean
  /** Accessible group label */
  label?: string
  /** HTML id for the group */
  id?: string
  /** Additional class name */
  className?: string
}

export interface RadioProps {
  /** Option value */
  value: string
  /** Visible label text */
  label?: string
  /** Optional description beneath the label */
  description?: string
  /** Disabled state */
  disabled?: boolean
  /** HTML id */
  id?: string
  /** Additional class name */
  className?: string
}

/**
 * Radio — single radio item built on Radix UI RadioGroup.Item.
 * Intended to be used inside a RadioGroup.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ value, label, description, disabled, id, className }, ref) => {
    const descId = description && id ? `${id}-desc` : undefined

    return (
      <div className={cn(styles.itemWrapper, className)}>
        <RadixRadioGroup.Item
          ref={ref}
          value={value}
          id={id}
          disabled={disabled}
          aria-describedby={descId}
          className={styles.item}
        >
          <RadixRadioGroup.Indicator className={styles.indicator} />
        </RadixRadioGroup.Item>

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

Radio.displayName = 'Radio'

/**
 * RadioGroup component — accessible radio group built on Radix UI RadioGroup.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <RadioGroup
 *   label="Colour"
 *   options={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }]}
 *   onValueChange={setValue}
 * />
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      orientation = 'vertical',
      disabled,
      label,
      id,
      className,
    },
    ref
  ) => {
    return (
      <div className={cn(styles.groupWrapper, className)}>
        {label && <span className={styles.groupLabel}>{label}</span>}
        <RadixRadioGroup.Root
          ref={ref}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          orientation={orientation}
          aria-label={label}
          id={id}
          className={cn(styles.group, styles[`orientation-${orientation}`])}
        >
          {options.map((opt) => (
            <Radio
              key={opt.value}
              value={opt.value}
              label={opt.label}
              description={opt.description}
              id={id ? `${id}-${opt.value}` : opt.value}
            />
          ))}
        </RadixRadioGroup.Root>
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
