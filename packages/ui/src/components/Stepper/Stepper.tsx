import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './Stepper.module.css'

export type StepStatus = 'pending' | 'active' | 'completed' | 'error'
export type StepperOrientation = 'horizontal' | 'vertical'

export interface StepItem {
  /** Step label */
  label: string
  /** Optional description */
  description?: string
  /** Override status (defaults to derived from activeStep) */
  status?: StepStatus
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepItem[]
  /** Index of the currently active step (0-based) */
  activeStep?: number
  /** Layout orientation */
  orientation?: StepperOrientation
  /** Additional className */
  className?: string
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Stepper component — multi-step wizard with pending/active/completed/error states.
 * Consumes CSS custom properties from the active design system token file.
 *
 * @example
 * <Stepper steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Done' }]} activeStep={1} />
 */
export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ steps, activeStep = 0, orientation = 'horizontal', className }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn(
          styles.stepper,
          styles[`orientation-${orientation}`],
          className
        )}
        aria-label="Progress steps"
      >
        {steps.map((step, index) => {
          const derivedStatus: StepStatus =
            step.status ??
            (index < activeStep
              ? 'completed'
              : index === activeStep
              ? 'active'
              : 'pending')

          return (
            <li
              key={index}
              className={cn(styles.step, styles[`status-${derivedStatus}`])}
              aria-current={derivedStatus === 'active' ? 'step' : undefined}
            >
              <div className={styles.stepHeader}>
                <div className={styles.indicator} aria-hidden="true">
                  {derivedStatus === 'completed' ? (
                    <CheckIcon />
                  ) : derivedStatus === 'error' ? (
                    <ErrorIcon />
                  ) : (
                    <span className={styles.stepNumber}>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={styles.connector} aria-hidden="true" />
                )}
              </div>
              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>{step.label}</span>
                {step.description && (
                  <span className={styles.stepDescription}>{step.description}</span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }
)

Stepper.displayName = 'Stepper'
