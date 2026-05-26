'use client'

import * as React from 'react'
import {
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
} from '@ghiberti85/ui'

// ── Textarea Demo ─────────────────────────────────────────────────────────────

interface TextareaDemoProps {
  labelDefault: string
  labelError: string
  labelDisabled: string
  placeholder: string
  errorMsg: string
  helperText: string
}

export function TextareaDemo({
  labelDefault,
  labelError,
  labelDisabled,
  placeholder,
  errorMsg,
  helperText,
}: TextareaDemoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4, 1rem)', maxWidth: 360 }}>
      <Textarea id="textarea-default" label={labelDefault} placeholder={placeholder} helperText={helperText} rows={3} />
      <Textarea id="textarea-error" label={labelError} placeholder={placeholder} error={errorMsg} rows={3} />
      <Textarea id="textarea-disabled" label={labelDisabled} placeholder={placeholder} rows={3} disabled />
    </div>
  )
}

// ── Select Demo ───────────────────────────────────────────────────────────────

interface SelectDemoProps {
  labelDefault: string
  labelError: string
  labelDisabled: string
  placeholder: string
  errorMsg: string
  options: Array<{ value: string; label: string }>
}

export function SelectDemo({
  labelDefault,
  labelError,
  labelDisabled,
  placeholder,
  errorMsg,
  options,
}: SelectDemoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4, 1rem)', maxWidth: 360 }}>
      <Select id="select-default" label={labelDefault} placeholder={placeholder} options={options} />
      <Select id="select-error" label={labelError} placeholder={placeholder} options={options} error={errorMsg} />
      <Select id="select-disabled" label={labelDisabled} placeholder={placeholder} options={options} disabled />
    </div>
  )
}

// ── Checkbox Demo ─────────────────────────────────────────────────────────────

interface CheckboxDemoProps {
  labelUnchecked: string
  labelChecked: string
  labelIndeterminate: string
  labelDisabled: string
  descChecked: string
}

export function CheckboxDemo({
  labelUnchecked,
  labelChecked,
  labelIndeterminate,
  labelDisabled,
  descChecked,
}: CheckboxDemoProps) {
  const [checked, setChecked] = React.useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3, 0.75rem)' }}>
      <Checkbox id="cb-unchecked" label={labelUnchecked} checked={false} />
      <Checkbox
        id="cb-checked"
        label={labelChecked}
        description={descChecked}
        checked={checked}
        onCheckedChange={(v) => setChecked(v === true)}
      />
      <Checkbox id="cb-indeterminate" label={labelIndeterminate} checked="indeterminate" />
      <Checkbox id="cb-disabled" label={labelDisabled} checked={false} disabled />
    </div>
  )
}

// ── RadioGroup Demo ───────────────────────────────────────────────────────────

interface RadioGroupDemoProps {
  groupLabel: string
  options: Array<{ value: string; label: string; description?: string }>
}

export function RadioGroupDemo({ groupLabel, options }: RadioGroupDemoProps) {
  const [value, setValue] = React.useState(options[0]?.value ?? '')

  return (
    <RadioGroup
      id="radio-group-demo"
      label={groupLabel}
      options={options}
      value={value}
      onValueChange={setValue}
      orientation="vertical"
    />
  )
}

// ── Switch Demo ───────────────────────────────────────────────────────────────

interface SwitchDemoProps {
  labelOff: string
  labelOn: string
  labelWithDesc: string
  descWithDesc: string
  labelDisabled: string
}

export function SwitchDemo({
  labelOff,
  labelOn,
  labelWithDesc,
  descWithDesc,
  labelDisabled,
}: SwitchDemoProps) {
  const [on, setOn] = React.useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4, 1rem)' }}>
      <Switch id="switch-off" label={labelOff} checked={false} />
      <Switch id="switch-on" label={labelOn} checked={on} onCheckedChange={setOn} />
      <Switch
        id="switch-desc"
        label={labelWithDesc}
        description={descWithDesc}
        checked={on}
        onCheckedChange={setOn}
      />
      <Switch id="switch-disabled" label={labelDisabled} checked={false} disabled />
    </div>
  )
}
