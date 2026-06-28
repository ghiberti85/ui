'use client'
import * as React from 'react'
import { Stepper } from '@ghiberti85/ui'

export const demoSteps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Review', description: 'Review your details' },
  { label: 'Done', description: 'All set!' },
]

export function StepperDemo() {
  const [active, setActive] = React.useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <Stepper steps={demoSteps} activeStep={active} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-semantic-border)',
            background: 'transparent',
            cursor: active === 0 ? 'not-allowed' : 'pointer',
            opacity: active === 0 ? 0.5 : 1,
            fontFamily: 'var(--typography-font-family-sans)',
            fontSize: '0.875rem',
          }}
        >
          Back
        </button>
        <button
          onClick={() => setActive((a) => Math.min(demoSteps.length - 1, a + 1))}
          disabled={active === demoSteps.length - 1}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: 'var(--color-semantic-primary)',
            color: 'var(--color-semantic-primary-foreground)',
            cursor: active === demoSteps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: active === demoSteps.length - 1 ? 0.5 : 1,
            fontFamily: 'var(--typography-font-family-sans)',
            fontSize: '0.875rem',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
