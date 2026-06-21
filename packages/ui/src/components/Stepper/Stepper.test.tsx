import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Stepper } from './Stepper'

const steps = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Done' },
]

describe('Stepper', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={steps} activeStep={0} />)
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('marks active step with aria-current="step"', () => {
    render(<Stepper steps={steps} activeStep={1} />)
    const activeItem = screen.getByText('Profile').closest('li')
    expect(activeItem).toHaveAttribute('aria-current', 'step')
  })

  it('applies status-active class to active step', () => {
    render(<Stepper steps={steps} activeStep={1} />)
    const activeItem = screen.getByText('Profile').closest('li')
    expect(activeItem?.className).toMatch(/status-active/)
  })

  it('applies status-completed class to completed steps', () => {
    render(<Stepper steps={steps} activeStep={2} />)
    const completedItem = screen.getByText('Account').closest('li')
    expect(completedItem?.className).toMatch(/status-completed/)
  })

  it('renders step descriptions when provided', () => {
    render(
      <Stepper
        steps={[{ label: 'Step 1', description: 'Fill in details' }]}
        activeStep={0}
      />
    )
    expect(screen.getByText('Fill in details')).toBeInTheDocument()
  })

  it('renders in vertical orientation', () => {
    const { container } = render(
      <Stepper steps={steps} activeStep={0} orientation="vertical" />
    )
    expect(container.querySelector('ol')?.className).toMatch(/orientation-vertical/)
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Stepper steps={steps} activeStep={0} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})

describe('Stepper accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
