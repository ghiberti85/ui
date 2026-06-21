'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Slider.module.css'

export interface SliderMark {
  value: number
  label?: string
}

export interface SliderProps {
  /** Current value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Whether the slider is disabled */
  disabled?: boolean
  /** Marks to display along the track */
  marks?: SliderMark[]
  /** Accessible label */
  'aria-label'?: string
  /** Callback on value change */
  onChange?: (value: number) => void
  /** Additional className */
  className?: string
  /** Inline style for the root wrapper */
  style?: React.CSSProperties
}

/**
 * Slider component — range input with draggable thumb, min/max, step, and optional marks.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Slider value={50} min={0} max={100} onChange={(v) => console.log(v)} />
 * <Slider defaultValue={30} step={10} marks={[{value: 0, label: '0'}, {value: 100, label: '100'}]} />
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      marks,
      'aria-label': ariaLabel,
      onChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = isControlled ? value : internalValue

    const percentage = ((currentValue - min) / (max - min)) * 100

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      if (!isControlled) setInternalValue(newValue)
      onChange?.(newValue)
    }

    return (
      <div className={cn(styles.root, disabled && styles.disabled, className)} style={style}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${percentage}%` }} />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            aria-label={ariaLabel ?? 'Slider'}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            onChange={handleChange}
            className={styles.input}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        </div>
        {marks && marks.length > 0 && (
          <div className={styles.marks} aria-hidden="true">
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100
              return (
                <div
                  key={mark.value}
                  className={styles.mark}
                  style={{ left: `${markPercent}%` }}
                >
                  <div className={styles.markDot} />
                  {mark.label && <span className={styles.markLabel}>{mark.label}</span>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'
