import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import userEvent from '@testing-library/user-event'
import { expect, describe, it } from 'vitest'
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerHeader, DrawerFooter, DrawerClose } from './Drawer'
import { Button } from '../Button'


function DrawerDemo({ side = 'right' as const }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Test Drawer</DrawerTitle>
          <DrawerDescription>Test description</DrawerDescription>
        </DrawerHeader>
        <p>Drawer content</p>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('renders trigger button', () => {
    render(<DrawerDemo />)
    expect(screen.getByRole('button', { name: 'Open' })).toBeDefined()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    render(<DrawerDemo />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeDefined()
    expect(screen.getByText('Test Drawer')).toBeDefined()
    expect(screen.getByText('Drawer content')).toBeDefined()
  })

  it('closes on close button click', async () => {
    const user = userEvent.setup()
    render(<DrawerDemo />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    // Use the first "Close" button found (the footer close button)
    const closeButtons = screen.getAllByRole('button', { name: /close/i })
    await user.click(closeButtons[0])
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders all sides', async () => {
    const user = userEvent.setup()
    for (const side of ['left', 'right', 'top', 'bottom'] as const) {
      const { unmount } = render(<DrawerDemo side={side} />)
      await user.click(screen.getByRole('button', { name: 'Open' }))
      expect(screen.getByRole('dialog')).toBeDefined()
      unmount()
    }
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DrawerDemo />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
