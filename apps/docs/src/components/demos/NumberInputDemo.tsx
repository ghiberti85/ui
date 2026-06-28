'use client'
import * as React from 'react'
import { NumberInput } from '@ghiberti85/ui'

export function NumberInputDemo({
  label,
  prefix,
  suffix,
  step = 1,
  precision,
  min,
  max,
  defaultVal = 0,
  helperText,
}: {
  label: string
  prefix?: string
  suffix?: string
  step?: number
  precision?: number
  min?: number
  max?: number
  defaultVal?: number
  helperText?: string
}) {
  const [v, setV] = React.useState<number | undefined>(defaultVal)
  return (
    <NumberInput
      label={label}
      value={v}
      onChange={setV}
      prefix={prefix}
      suffix={suffix}
      step={step}
      precision={precision}
      min={min}
      max={max}
      helperText={helperText}
    />
  )
}
