'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '../../utils/cn'
import styles from './Calendar.module.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Calendar — month-view date picker built on react-day-picker.
 * Supports single, multiple, and range selection modes.
 *
 * @example
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.calendar, className)}
      classNames={{
        months: styles.months,
        month: styles.month,
        month_caption: styles.caption,
        caption_label: styles.captionLabel,
        nav: styles.nav,
        button_previous: styles.navButton,
        button_next: styles.navButton,
        month_grid: styles.table,
        weekdays: styles.headRow,
        weekday: styles.headCell,
        week: styles.row,
        day: styles.cell,
        day_button: styles.day,
        selected: styles.daySelected,
        today: styles.dayToday,
        outside: styles.dayOutside,
        disabled: styles.dayDisabled,
        range_start: styles.dayRangeStart,
        range_end: styles.dayRangeEnd,
        range_middle: styles.dayRangeMiddle,
        hidden: styles.dayHidden,
        ...classNames,
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'
