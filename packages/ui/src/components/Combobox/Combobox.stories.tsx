import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Combobox } from './Combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'SolidJS' },
]

function DefaultDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Combobox
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Select a framework..."
      searchPlaceholder="Search frameworks..."
    />
  )
}

function WithInitialValueDemo() {
  const [value, setValue] = React.useState('react')
  return (
    <Combobox
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Select a framework..."
    />
  )
}

function WithDisabledOptionDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Combobox
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue (coming soon)', disabled: true },
        { value: 'svelte', label: 'Svelte' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select..."
    />
  )
}

export const Default: StoryObj<typeof Combobox> = {
  render: () => <DefaultDemo />,
}

export const WithInitialValue: StoryObj<typeof Combobox> = {
  render: () => <WithInitialValueDemo />,
}

export const WithDisabledOption: StoryObj<typeof Combobox> = {
  render: () => <WithDisabledOptionDemo />,
}

export const Disabled: StoryObj<typeof Combobox> = {
  args: {
    options: frameworks,
    placeholder: 'Select a framework...',
    disabled: true,
  },
}
