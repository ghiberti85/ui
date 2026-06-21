import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { DatePicker, DateRangePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

function DefaultDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
}

function WithValueDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <DatePicker value={date} onChange={setDate} />
}

function CustomFormatDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <DatePicker value={date} onChange={setDate} dateFormat="dd/MM/yyyy" placeholder="DD/MM/YYYY" />
}

function RangePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return <DateRangePicker value={range} onChange={setRange} placeholder="Pick a date range" />
}

export const Default: StoryObj<typeof DatePicker> = { render: () => <DefaultDemo /> }
export const WithValue: StoryObj<typeof DatePicker> = { render: () => <WithValueDemo /> }
export const Disabled: StoryObj<typeof DatePicker> = { render: () => <DatePicker disabled placeholder="Pick a date" /> }
export const CustomFormat: StoryObj<typeof DatePicker> = { render: () => <CustomFormatDemo /> }
export const RangePicker: StoryObj<typeof DatePicker> = { render: () => <RangePickerDemo /> }
