# Testing

Testing standards and patterns for `@ghiberti85/ui`.

---

## Philosophy

- **Test behavior, not implementation.** A test should answer: "does this component do what users and developers expect?" — not "does it render a specific class name?"
- **Every component must have tests covering**: rendering, props/variants, accessibility (axe), interactions, and ref forwarding.
- **No snapshots.** Snapshots break on trivial markup changes, reveal nothing about behavior, and create false confidence.
- **Accessibility is a first-class test concern.** Every component runs `axe` in at least one test.

---

## Running Tests

```bash
# Run all tests (from repo root — runs tokens + ui + docs)
pnpm test

# Watch mode (re-runs on file change)
pnpm test --watch

# Run only ui package tests
pnpm --filter @ghiberti85/ui test

# Coverage report
pnpm --filter @ghiberti85/ui test -- --coverage

# Run a single test file
pnpm --filter @ghiberti85/ui test -- Button.test.tsx
```

Test runner: **Vitest**. DOM environment: **jsdom**. Interaction testing: **@testing-library/user-event**.

---

## Test File Structure

Here is a complete annotated example for a hypothetical `Spinner` component:

```tsx
// Spinner.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Spinner } from './Spinner'

// Group related tests under describe blocks
describe('Spinner', () => {

  // 1. Basic render — does it mount without crashing?
  it('renders without crashing', () => {
    render(<Spinner />)
    // Use role queries — they match what assistive technology sees
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  // 2. Default state — what does the component look like out of the box?
  it('shows default accessible label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading…')
  })

  // 3. Props — test each significant prop variation
  it('accepts a custom label', () => {
    render(<Spinner label="Saving your work…" />)
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving your work…')
  })

  // 4. className forwarding — component must accept and apply custom classes
  it('forwards className to root element', () => {
    const { container } = render(<Spinner className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  // 5. Ref forwarding — essential for composability
  it('forwards ref to the root element', () => {
    const ref = { current: null }
    render(<Spinner ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  // 6. HTML attributes — component spreads ...props onto root element
  it('forwards arbitrary HTML attributes', () => {
    render(<Spinner data-testid="my-spinner" />)
    expect(screen.getByTestId('my-spinner')).toBeInTheDocument()
  })

})

// Accessibility — kept in its own describe block for clarity
describe('Spinner accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

---

## What to Test (per component type)

### All components

Every component test file must include:

| Test | How |
|------|-----|
| Renders without crashing | `render(<C />)` + `toBeInTheDocument()` |
| Accepts `className` | `container.firstChild` has class |
| Forwards `ref` | `ref.current` is not null and is HTMLElement |
| Forwards extra HTML attributes | Render with `data-testid`, find by it |
| Accessibility (axe) | `expect(await axe(container)).toHaveNoViolations()` |

### Form inputs (Input, Textarea, Select, Checkbox, Radio, Switch, Combobox)

```tsx
// Controlled value
it('displays the provided value', () => {
  render(<Input value="hello" onChange={() => {}} label="Name" />)
  expect(screen.getByRole('textbox')).toHaveValue('hello')
})

// onChange handler
it('calls onChange when user types', async () => {
  const handleChange = vi.fn()
  render(<Input onChange={handleChange} label="Name" />)
  await userEvent.type(screen.getByRole('textbox'), 'a')
  expect(handleChange).toHaveBeenCalled()
})

// Disabled state
it('does not call onChange when disabled', async () => {
  const handleChange = vi.fn()
  render(<Input disabled onChange={handleChange} label="Name" />)
  await userEvent.type(screen.getByRole('textbox'), 'a')
  expect(handleChange).not.toHaveBeenCalled()
})

// Error state
it('marks the input as invalid when error is provided', () => {
  render(<Input error="Required" label="Name" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByText('Required')).toBeInTheDocument()
})
```

### Interactive components (Button, Dialog, Accordion, Tabs, etc.)

```tsx
// Click handler
it('calls onClick when clicked', async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledOnce()
})

// Keyboard interaction
it('activates on Enter key', async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Press</Button>)
  screen.getByRole('button').focus()
  await userEvent.keyboard('{Enter}')
  expect(handleClick).toHaveBeenCalledOnce()
})

// Disabled — no interaction
it('does not fire onClick when disabled', async () => {
  const handleClick = vi.fn()
  render(<Button disabled onClick={handleClick}>No</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(handleClick).not.toHaveBeenCalled()
})
```

### Compound components (Card, Dialog, Tabs, Accordion, Table, etc.)

```tsx
// Each sub-component renders correctly
it('renders Card with all sub-components', () => {
  render(
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
  expect(screen.getByText('Title')).toBeInTheDocument()
  expect(screen.getByText('Description')).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
  expect(screen.getByText('Footer')).toBeInTheDocument()
})
```

### Components with variants/sizes

```tsx
// Test each variant produces the correct class or behavior
it.each(['primary', 'secondary', 'ghost', 'destructive'] as const)(
  'renders variant=%s correctly',
  (variant) => {
    render(<Button variant={variant}>{variant}</Button>)
    expect(screen.getByRole('button').className).toMatch(
      new RegExp(`variant-${variant}`)
    )
  }
)
```

---

## What NOT to Test

- **CSS class names in isolation** — `toHaveClass('module__button--primary')` is brittle and tests internals. The exception is when a class name is the only way to verify variant application.
- **Internal React state directly** — test via user interaction and observable DOM changes.
- **Third-party library behavior** — don't test that Radix UI's Dialog traps focus; it already has its own test suite. Test that your component renders correctly and passes the right props.
- **Snapshot tests** — they capture markup details that change frequently and give no signal about actual behavior.

---

## Accessibility Testing Pattern

Every component gets at least one axe test:

```tsx
import { axe } from 'vitest-axe'

describe('ComponentName accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName />)
    expect(await axe(container)).toHaveNoViolations()
  })

  // For interactive components, also test the open/active state
  it('has no violations when open', async () => {
    const { container } = render(<Dialog open><DialogContent>Content</DialogContent></Dialog>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

The `vitest-axe` package runs the `axe-core` rule engine against the rendered DOM. This catches missing labels, invalid ARIA attributes, color contrast issues, and more.

---

## Mock Patterns

### Mocking `useToast`

When testing components that call `useToast()` internally:

```tsx
import { vi } from 'vitest'

vi.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))
```

Or wrap the component under test in `<Toaster>`:

```tsx
import { Toaster } from '@ghiberti85/ui'

render(
  <Toaster>
    <ComponentThatUsesToast />
  </Toaster>
)
```

### Testing Portal-based components (Dialog, Tooltip, Popover, DropdownMenu)

Radix UI portals render outside the container returned by `render()`. Use `screen` queries (which search the full document body) rather than `container` queries:

```tsx
it('renders dialog content when open', () => {
  render(
    <Dialog open>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <p>Are you sure?</p>
      </DialogContent>
    </Dialog>
  )
  // screen.getBy* searches document.body — works with portals
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByText('Are you sure?')).toBeInTheDocument()
})
```

For `axe` with portal components, pass `document.body` instead of `container`:

```tsx
it('has no accessibility violations', async () => {
  render(
    <Dialog open>
      <DialogContent><DialogTitle>Test</DialogTitle></DialogContent>
    </Dialog>
  )
  expect(await axe(document.body)).toHaveNoViolations()
})
```

### Mocking `window.matchMedia`

Required for components that read media queries:

```tsx
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})
```

---

## Vitest Configuration

Tests are configured in `packages/ui/vitest.config.ts`. Key settings:

- `environment: 'jsdom'` — browser-like DOM
- `setupFiles: ['./src/test-setup.ts']` — imports `@testing-library/jest-dom` matchers and `vitest-axe/extend-expect`
- `globals: true` — no need to import `describe`/`it`/`expect` in test files (though importing is still recommended for clarity)

Coverage is collected with `v8` provider. Run coverage with:

```bash
pnpm --filter @ghiberti85/ui test -- --coverage
```
