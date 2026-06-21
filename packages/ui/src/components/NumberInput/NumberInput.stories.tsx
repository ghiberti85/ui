import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { NumberInput } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { step: 1 },
}

export default meta

function DefaultDemo() {
  const [v, setV] = React.useState<number | undefined>(0)
  return <NumberInput label="Quantity" value={v} onChange={setV} min={0} max={100} />
}

function WithPrefixSuffixDemo() {
  const [v, setV] = React.useState<number | undefined>(1500)
  return <NumberInput label="Amount" value={v} onChange={setV} prefix="$" suffix="USD" min={0} step={100} />
}

function PercentageDemo() {
  const [v, setV] = React.useState<number | undefined>(75)
  return (
    <NumberInput
      label="Completion"
      value={v}
      onChange={setV}
      suffix="%"
      min={0}
      max={100}
      step={5}
      helperText="Enter completion percentage (0–100)"
    />
  )
}

function WithErrorDemo() {
  const [v, setV] = React.useState<number | undefined>(undefined)
  return <NumberInput label="Price" value={v} onChange={setV} prefix="€" error="Price is required" min={0} />
}

export const Default: StoryObj<typeof NumberInput> = { render: () => <DefaultDemo /> }
export const WithPrefixSuffix: StoryObj<typeof NumberInput> = { render: () => <WithPrefixSuffixDemo /> }
export const Percentage: StoryObj<typeof NumberInput> = { render: () => <PercentageDemo /> }
export const WithError: StoryObj<typeof NumberInput> = { render: () => <WithErrorDemo /> }

export const Sizes: StoryObj<typeof NumberInput> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <NumberInput size="sm" value={1} label="Small" />
      <NumberInput size="md" value={1} label="Medium" />
      <NumberInput size="lg" value={1} label="Large" />
    </div>
  ),
}

export const Disabled: StoryObj<typeof NumberInput> = {
  render: () => <NumberInput label="Quantity" value={5} disabled />,
}
