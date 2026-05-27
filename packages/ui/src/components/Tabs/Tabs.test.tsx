import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

function renderTabs(overrides = {}) {
  return render(
    <Tabs defaultValue="tab1" {...overrides}>
      <TabsList>
        <TabsTrigger value="tab1">Tab One</TabsTrigger>
        <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content One</TabsContent>
      <TabsContent value="tab2">Content Two</TabsContent>
      <TabsContent value="tab3">Content Three</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders tabs list and all triggers', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab one/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab two/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab three/i })).toBeInTheDocument()
  })

  it('shows active tab content and hides inactive tab content', () => {
    renderTabs()
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.queryByText('Content Two')).not.toBeInTheDocument()
    expect(screen.queryByText('Content Three')).not.toBeInTheDocument()
  })

  it('switches content when a trigger is clicked', async () => {
    renderTabs()
    await userEvent.click(screen.getByRole('tab', { name: /tab two/i }))
    expect(screen.getByText('Content Two')).toBeInTheDocument()
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('navigates between triggers with ArrowRight', async () => {
    renderTabs()
    const tabOne = screen.getByRole('tab', { name: /tab one/i })
    tabOne.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: /tab two/i })).toHaveFocus()
  })

  it('navigates between triggers with ArrowLeft', async () => {
    renderTabs()
    const tabTwo = screen.getByRole('tab', { name: /tab two/i })
    tabTwo.focus()
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: /tab one/i })).toHaveFocus()
  })

  it('disabled trigger cannot be activated by click', async () => {
    renderTabs()
    const disabledTab = screen.getByRole('tab', { name: /tab three/i })
    expect(disabledTab).toBeDisabled()
    await userEvent.click(disabledTab)
    expect(screen.queryByText('Content Three')).not.toBeInTheDocument()
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })

  it('disabled trigger has aria-disabled attribute', () => {
    renderTabs()
    const disabledTab = screen.getByRole('tab', { name: /tab three/i })
    expect(disabledTab).toBeDisabled()
  })

  it('controlled mode: renders with provided value', () => {
    renderTabs({ defaultValue: undefined, value: 'tab2', onValueChange: vi.fn() })
    expect(screen.getByText('Content Two')).toBeInTheDocument()
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('controlled mode: calls onValueChange when a trigger is clicked', async () => {
    const onValueChange = vi.fn()
    renderTabs({ defaultValue: undefined, value: 'tab1', onValueChange })
    await userEvent.click(screen.getByRole('tab', { name: /tab two/i }))
    expect(onValueChange).toHaveBeenCalledWith('tab2')
  })

  it('forwards ref on Tabs root', () => {
    const ref = { current: null }
    render(
      <Tabs defaultValue="tab1" ref={ref}>
        <TabsList>
          <TabsTrigger value="tab1">Tab One</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content One</TabsContent>
      </Tabs>
    )
    expect(ref.current).not.toBeNull()
  })

  it('active trigger has aria-selected="true"', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: /tab one/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: /tab two/i })).toHaveAttribute('aria-selected', 'false')
  })
})

describe('Tabs accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = renderTabs()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
