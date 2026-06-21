'use client'

import * as React from 'react'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Popover, PopoverTrigger, PopoverContent } from '../Popover'
import { Calendar } from '../Calendar'
import { cn } from '../../utils/cn'
import styles from './DatePicker.module.css'

export interface DatePickerProps {
  /** Selected date */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** date-fns format string */
  dateFormat?: string
  /** Disables the picker */
  disabled?: boolean
  /** Additional className */
  className?: string
  /** Disabled dates passed to Calendar */
  disabledDates?: React.ComponentProps<typeof Calendar>['disabled']
  /** Minimum selectable date */
  fromDate?: Date
  /** Maximum selectable date */
  toDate?: Date
}

/**
 * DatePicker — calendar popover for selecting a single date.
 *
 * @example
 * <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Pick a date',
      dateFormat = 'PPP',
      disabled = false,
      className,
      disabledDates,
      fromDate,
      toDate,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    function handleSelect(date: Date | undefined) {
      onChange?.(date)
      if (date) setOpen(false)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={value ? format(value, dateFormat) : placeholder}
            disabled={disabled}
            className={cn(styles.trigger, !value && styles.triggerPlaceholder, className)}
          >
            <span className={styles.calIcon} aria-hidden="true">📅</span>
            <span className={styles.triggerText}>
              {value ? format(value, dateFormat) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className={styles.popoverContent} align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabledDates}
            fromDate={fromDate}
            toDate={toDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export interface DateRangePickerProps {
  /** Selected range */
  value?: DateRange
  /** Callback when range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** date-fns format string */
  dateFormat?: string
  /** Disables the picker */
  disabled?: boolean
  /** Additional className */
  className?: string
}

/**
 * DateRangePicker — calendar popover for selecting a date range.
 *
 * @example
 * <DateRangePicker value={range} onChange={setRange} placeholder="Pick a date range" />
 */
export const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, onChange, placeholder = 'Pick a date range', dateFormat = 'PP', disabled = false, className }, ref) => {
    const [open, setOpen] = React.useState(false)

    const label = React.useMemo(() => {
      if (value?.from && value.to) return `${format(value.from, dateFormat)} – ${format(value.to, dateFormat)}`
      if (value?.from) return format(value.from, dateFormat)
      return placeholder
    }, [value, dateFormat, placeholder])

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={label}
            disabled={disabled}
            className={cn(styles.trigger, !value?.from && styles.triggerPlaceholder, className)}
          >
            <span className={styles.calIcon} aria-hidden="true">📅</span>
            <span className={styles.triggerText}>{label}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className={styles.popoverContent} align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DateRangePicker.displayName = 'DateRangePicker'
