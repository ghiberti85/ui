import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

function SingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}

function RangeDemo() {
  const [range, setRange] = React.useState<{ from?: Date; to?: Date } | undefined>()
  return <Calendar mode="range" selected={range} onSelect={setRange as any} />
}

function MultipleDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>()
  return <Calendar mode="multiple" selected={dates} onSelect={setDates as any} />
}

function DisabledDatesDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ dayOfWeek: [0, 6] }} />
}

function HideOutsideDaysDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return <Calendar mode="single" selected={date} onSelect={setDate} showOutsideDays={false} />
}

export const Single: StoryObj<typeof Calendar> = { render: () => <SingleDemo /> }
export const Range: StoryObj<typeof Calendar> = { render: () => <RangeDemo /> }
export const Multiple: StoryObj<typeof Calendar> = { render: () => <MultipleDemo /> }
export const WithDisabledDates: StoryObj<typeof Calendar> = { render: () => <DisabledDatesDemo /> }
export const HideOutsideDays: StoryObj<typeof Calendar> = { render: () => <HideOutsideDaysDemo /> }
