import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './Dialog'

function TestDialog({ open, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description text.</DialogDescription>
        </DialogHeader>
        <p>Dialog body content.</p>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('renders trigger button', () => {
    render(<TestDialog />)
    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('does not show content when closed', () => {
    render(<TestDialog />)
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    })
  })

  it('renders title and description when open', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      expect(screen.getByText('Dialog description text.')).toBeInTheDocument()
    })
  })

  it('renders body content when open', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() => {
      expect(screen.getByText('Dialog body content.')).toBeInTheDocument()
    })
  })

  it('closes dialog when close button is clicked', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    })
    await userEvent.click(screen.getByLabelText('Close'))
    await waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
    })
  })

  it('calls onOpenChange when dialog opens', async () => {
    const onOpenChange = vi.fn()
    render(<TestDialog onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders in controlled open state', () => {
    render(<TestDialog open={true} />)
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
  })

  it('title has correct role', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('DialogHeader renders as a div', async () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader data-testid="header">
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('header').tagName).toBe('DIV')
  })

  it('DialogFooter renders as a div', async () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter data-testid="footer">Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('footer').tagName).toBe('DIV')
  })

  it('DialogTitle forwards ref', async () => {
    const ref = { current: null }
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle ref={ref}>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(ref.current).not.toBeNull()
  })

  it('DialogDescription forwards ref', async () => {
    const ref = { current: null }
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription ref={ref}>Desc</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(ref.current).not.toBeNull()
  })

  it('DialogContent forwards ref', async () => {
    const ref = { current: null }
    render(
      <Dialog open>
        <DialogContent ref={ref}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(ref.current).not.toBeNull()
  })
})

describe('accessibility', () => {
  it('has no violations when open', async () => {
    const { container } = render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Description for the dialog.</DialogDescription>
          </DialogHeader>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
