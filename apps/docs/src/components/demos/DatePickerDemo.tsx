'use client'
import * as React from 'react'
import { DatePicker, DateRangePicker } from '@ghiberti85/ui'

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
}

export function DateRangeDemo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [range, setRange] = React.useState<any>(undefined)
  return <DateRangePicker value={range} onChange={setRange} placeholder="Pick a date range" />
}
