import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  useToast,
  Toaster,
} from './Toast'

// Helper: render a single Toast inside the required Radix Provider
function renderToast(ui: React.ReactNode) {
  return render(
    <ToastProvider>
      {ui}
      <ToastViewport />
    </ToastProvider>
  )
}

// Helper: trigger a toast via useToast inside Toaster
function ToastTrigger({ title }: { title: string }) {
  const { toast } = useToast()
  React.useEffect(() => {
    toast({ title })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

describe('Toast', () => {
  it('renders title and description', () => {
    renderToast(
      <Toast open>
        <ToastTitle>Hello</ToastTitle>
        <ToastDescription>This is a description</ToastDescription>
      </Toast>
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('This is a description')).toBeInTheDocument()
  })

  it('applies default variant class by default', () => {
    renderToast(<Toast open data-testid="toast" />)
    const el = screen.getByTestId('toast')
    expect(el.className).toMatch(/toast--default/)
  })

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'applies %s variant class',
    (variant) => {
      renderToast(<Toast open variant={variant} data-testid="toast" />)
      expect(screen.getByTestId('toast').className).toMatch(
        new RegExp(`toast--${variant}`)
      )
    }
  )

  it('renders ToastClose with accessible label "Close"', () => {
    renderToast(
      <Toast open>
        <ToastClose />
      </Toast>
    )
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('renders ToastAction with altText and label', () => {
    const handleClick = vi.fn()
    renderToast(
      <Toast open>
        <ToastAction altText="Undo last action" onClick={handleClick}>
          Undo
        </ToastAction>
      </Toast>
    )
    const action = screen.getByRole('button', { name: /undo/i })
    expect(action).toBeInTheDocument()
  })

  it('Toaster renders and shows a toast triggered via useToast', async () => {
    render(
      <Toaster>
        <ToastTrigger title="Toast via hook" />
      </Toaster>
    )
    expect(await screen.findByText('Toast via hook')).toBeInTheDocument()
  })

  it('Toaster renders children that are not toasts', () => {
    render(
      <Toaster>
        <span data-testid="child">child</span>
      </Toaster>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

describe('Toast accessibility', () => {
  it('has no axe violations on a single Toast with title', async () => {
    const { container } = renderToast(
      <Toast open>
        <ToastTitle>Accessible toast</ToastTitle>
      </Toast>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
