import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

function renderAccordion(props = {}) {
  return render(
    <Accordion type="single" collapsible {...props}>
      <AccordionItem value="item1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content for section 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content for section 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('renders all items with triggers', () => {
    renderAccordion()
    expect(screen.getByRole('button', { name: /section 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /section 2/i })).toBeInTheDocument()
  })

  it('clicking a trigger expands its content', async () => {
    renderAccordion()
    const trigger = screen.getByRole('button', { name: /section 1/i })
    await userEvent.click(trigger)
    expect(screen.getByText('Content for section 1')).toBeVisible()
  })

  it('clicking an open trigger in a collapsible accordion collapses it', async () => {
    renderAccordion()
    const trigger = screen.getByRole('button', { name: /section 1/i })
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'open')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  })

  it('type="multiple" allows multiple items open simultaneously', async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    await userEvent.click(screen.getByRole('button', { name: /section 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /section 2/i }))
    expect(screen.getByRole('button', { name: /section 1/i })).toHaveAttribute('data-state', 'open')
    expect(screen.getByRole('button', { name: /section 2/i })).toHaveAttribute('data-state', 'open')
  })

  it('disabled item cannot be opened', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item1" disabled>
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: /section 1/i })
    expect(trigger).toBeDisabled()
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('data-state', 'closed')
  })

  it('forwards ref on Accordion root', () => {
    const ref = { current: null }
    render(
      <Accordion type="single" collapsible ref={ref}>
        <AccordionItem value="item1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(ref.current).not.toBeNull()
  })
})

describe('Accordion accessibility', () => {
  it('has no violations', async () => {
    const { container } = renderAccordion()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
