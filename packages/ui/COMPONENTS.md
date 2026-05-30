# Component Catalog

All 30 components exported from `@ghiberti85/ui`. Grouped by category.

Import any component:

```tsx
import { Button, Card, Dialog } from '@ghiberti85/ui'
```

---

## Form

### Button

**Purpose**: Primary call-to-action; triggers actions or navigates.

**When to use**: Form submissions, dialog triggers, navigation links (via `asChild`), any user action.

**When NOT to use**: Don't use Button for non-interactive decorative elements. Don't use for links unless you use `asChild`.

**Key props**:
- `variant`: `'primary' | 'secondary' | 'ghost' | 'destructive'` — visual style
- `size`: `'sm' | 'md' | 'lg' | 'icon'` — button size
- `loading`: `boolean` — shows spinner, sets `aria-busy`, disables button
- `asChild`: `boolean` — renders children as the root element (use with `<a>`)
- `disabled`: `boolean` — native disabled state

**Accessibility**: Native `<button>` element. `aria-busy` set when loading. Works with all keyboard navigation.

---

### Input

**Purpose**: Single-line text field for user input.

**When to use**: Forms, search boxes, login fields, any single-line text entry.

**When NOT to use**: Multi-line text — use Textarea. Rich text — use a dedicated editor.

**Key props**:
- `label`: `string` — visible label (renders `<label>` associated via `htmlFor`)
- `error`: `string` — error message shown below the field; sets `aria-invalid`
- `helperText`: `string` — optional hint shown below the field
- `id`: `string` — auto-generated if not provided; links label to input

**Accessibility**: Associated `<label>`, `aria-invalid` on error, `aria-describedby` linking to helper/error text.

---

### Textarea

**Purpose**: Multi-line text input.

**When to use**: Long-form text: comments, descriptions, bio fields.

**When NOT to use**: Single-line input — use Input.

**Key props**:
- `label`: `string` — visible label
- `error`: `string` — error message
- `helperText`: `string` — optional hint
- `resize`: `'none' | 'vertical' | 'horizontal' | 'both'` — CSS resize behavior

**Accessibility**: Same as Input — associated label, `aria-invalid`, `aria-describedby`.

---

### Select

**Purpose**: Dropdown list for selecting one option from a predefined set.

**When to use**: When the user must choose from 5–15 fixed options. Preferred over radio groups for longer lists.

**When NOT to use**: Fewer than 4 options — use Radio. Searchable lists — use Combobox.

**Key props**:
- `label`: `string` — visible label
- `placeholder`: `string` — shown when no value is selected
- `options`: `{ value: string; label: string }[]` — list of options
- `error`: `string` — error message
- `size`: `'sm' | 'md' | 'lg'` — control size

**Accessibility**: Built on Radix UI Select. Full keyboard navigation, screen reader announcements, ARIA roles.

---

### Checkbox

**Purpose**: Binary on/off toggle for a single option.

**When to use**: Optional settings, consent forms, multi-select lists.

**When NOT to use**: Mutually exclusive options — use Radio. On/off toggle with immediate effect — use Switch.

**Key props**:
- `checked`: `boolean | 'indeterminate'` — controlled state
- `onCheckedChange`: `(checked: boolean) => void` — change handler
- `label`: `string` — visible label
- `disabled`: `boolean`

**Accessibility**: Built on Radix UI Checkbox. `role="checkbox"`, supports `aria-checked="mixed"` for indeterminate.

---

### Radio / RadioGroup

**Purpose**: Mutually exclusive selection within a group.

**When to use**: 2–5 mutually exclusive options where all should be visible simultaneously.

**When NOT to use**: More than 5–6 options — use Select. Non-exclusive choices — use Checkbox.

**Key props** (RadioGroup):
- `value`: `string` — controlled selected value
- `onValueChange`: `(value: string) => void`
- `orientation`: `'horizontal' | 'vertical'`
- `name`: `string` — form field name

**Key props** (Radio item):
- `value`: `string` — the option value
- `label`: `string` — visible label

**Accessibility**: `role="radiogroup"` on the container. Arrow key navigation between options.

---

### Switch

**Purpose**: Immediately-effective binary toggle (on/off).

**When to use**: Settings that take effect immediately without a Save action (e.g., notifications on/off, dark mode).

**When NOT to use**: Form fields in a larger form — use Checkbox instead.

**Key props**:
- `checked`: `boolean` — controlled state
- `onCheckedChange`: `(checked: boolean) => void`
- `label`: `string` — visible label
- `disabled`: `boolean`

**Accessibility**: Built on Radix UI Switch. `role="switch"`, `aria-checked`.

---

### Combobox

**Purpose**: Searchable select — text input that filters a dropdown list.

**When to use**: Long option lists (15+) where filtering helps. Autocomplete patterns.

**When NOT to use**: Short lists — use Select. Free-form text input — use Input.

**Key props**:
- `options`: `{ value: string; label: string }[]` — full option list
- `value`: `string` — controlled selected value
- `onValueChange`: `(value: string) => void`
- `placeholder`: `string`
- `searchPlaceholder`: `string` — placeholder inside the search input

**Accessibility**: Built on Popover + custom keyboard navigation. `role="combobox"`, `aria-expanded`, `aria-activedescendant`. Full keyboard support (Arrow Up/Down, Enter, Escape).

---

## Feedback

### Badge

**Purpose**: Small label for status, category, or count.

**When to use**: Status indicators, tags, notification counts, labels on cards.

**When NOT to use**: Primary CTAs — use Button. Long text — use Alert.

**Key props**:
- `variant`: `'default' | 'secondary' | 'destructive' | 'outline'`
- `children`: `ReactNode` — badge content

**Accessibility**: Rendered as `<span>`. Add `aria-label` on the parent if the badge conveys important status not readable in context.

---

### Alert

**Purpose**: Inline message communicating status or important information.

**When to use**: Form validation summaries, success/error feedback after an action, informational notices.

**When NOT to use**: Temporary notifications — use Toast. Blocking confirmations — use AlertDialog.

**Key props**:
- `variant`: `'default' | 'success' | 'warning' | 'destructive'`
- `title`: `string` — optional heading
- `onDismiss`: `() => void` — if provided, renders a dismiss button
- `children`: `ReactNode` — message body

**Accessibility**: `role="alert"` for live announcements on mount.

---

### Progress

**Purpose**: Visual indicator of task completion.

**When to use**: File uploads, multi-step forms, loading sequences with known progress.

**When NOT to use**: Unknown duration — use Spinner or Skeleton.

**Key props**:
- `value`: `number` — current progress (0–100)
- `max`: `number` — defaults to 100
- `variant`: `'default' | 'success' | 'warning' | 'destructive' | 'info'`
- `size`: `'sm' | 'md' | 'lg'`

**Accessibility**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

### Skeleton

**Purpose**: Placeholder that mimics content shape while loading.

**When to use**: Data that takes >300ms to load. Prefer over spinners for layout-heavy content.

**When NOT to use**: Instant operations. Known progress — use Progress.

**Key props** (Skeleton):
- `width`: `string | number`
- `height`: `string | number`
- `borderRadius`: `string` — shape override

**Helpers**: `SkeletonText` (mimics text lines), `SkeletonAvatar` (circular placeholder)

**Accessibility**: `aria-hidden="true"` — skeletons are decorative. Wrap in a container with `aria-busy="true"` and `aria-label="Loading…"`.

---

### Spinner

**Purpose**: Indeterminate loading indicator.

**When to use**: Operations with unknown duration where showing a skeleton is not practical.

**When NOT to use**: Known progress — use Progress. Page-level loading — use Skeleton.

**Key props**:
- `size`: `'sm' | 'md' | 'lg' | 'xl'`
- `variant`: `'default' | 'secondary' | 'outline' | 'ghost'`
- `label`: `string` — accessible label (default: `'Loading…'`)

**Accessibility**: `role="status"`, `aria-label` with the `label` prop. Screen-reader-only text inside.

---

### Toast

**Purpose**: Brief, non-blocking notification that auto-dismisses.

**When to use**: Confirmation of background actions (saved, deleted, sent). Non-critical errors.

**When NOT to use**: Critical errors requiring user action — use Alert or AlertDialog.

**Key props** (useToast hook):
- `toast({ title, description, variant, duration })` — trigger a toast
- `variant`: `'default' | 'success' | 'warning' | 'destructive' | 'info'`

**Composition**: Wrap your app with `<Toaster />` (convenience component). Use the `useToast()` hook to trigger toasts.

**Accessibility**: Built on Radix UI Toast. `role="status"` for non-destructive, `role="alert"` for destructive. Auto-dismiss respects `prefers-reduced-motion`.

---

## Overlay

### Dialog

**Purpose**: Modal overlay for focused tasks that require user attention.

**When to use**: Forms, detail views, confirmations that need more than a single button.

**When NOT to use**: Destructive confirmations — use AlertDialog. Brief messages — use Toast.

**Key props** (Dialog.Content):
- `onOpenChange`: `(open: boolean) => void` — controlled open state
- `aria-labelledby` / `aria-describedby`: link to DialogTitle and DialogDescription

**Composition**: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

**Accessibility**: Built on Radix UI Dialog. Focus trap, scroll lock, `role="dialog"`, `aria-modal="true"`, Escape to close.

---

### AlertDialog

**Purpose**: Blocking confirmation dialog for destructive or irreversible actions.

**When to use**: Delete confirmations, permanent actions, sign-out with data loss.

**When NOT to use**: Non-destructive confirmations — use Dialog.

**Key props**: Same open/close pattern as Dialog.

**Composition**: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`

**Accessibility**: `role="alertdialog"`. Cancel button always present. Focus lands on Cancel by default (safer for destructive actions).

---

### Tooltip

**Purpose**: Short contextual label that appears on hover/focus.

**When to use**: Icon buttons that need text labels. Truncated text with full content on hover. Definitions.

**When NOT to use**: Essential information — it's invisible on touch devices. Interactive content (links, buttons) inside the tooltip.

**Key props** (TooltipContent):
- `side`: `'top' | 'right' | 'bottom' | 'left'`
- `children`: tooltip text content
- `delayDuration`: `number` — ms before showing (on TooltipProvider)

**Composition**: `TooltipProvider` (wrap app once), `Tooltip`, `TooltipTrigger`, `TooltipContent`

**Accessibility**: Built on Radix UI Tooltip. `role="tooltip"`, linked via `aria-describedby`. Shows on focus for keyboard users.

---

### Popover

**Purpose**: Non-modal overlay anchored to a trigger for secondary content.

**When to use**: Filters, date pickers, secondary forms, contextual content that doesn't block interaction.

**When NOT to use**: Destructive actions — use AlertDialog. Simple labels — use Tooltip.

**Key props** (PopoverContent):
- `side`: `'top' | 'right' | 'bottom' | 'left'`
- `align`: `'start' | 'center' | 'end'`

**Composition**: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`

**Accessibility**: Built on Radix UI Popover. Focus moves into content on open, returns to trigger on close. Escape to close.

---

### DropdownMenu

**Purpose**: Context menu attached to a trigger for a list of actions.

**When to use**: Action menus ("More options"), user account menus, context-sensitive actions on rows/cards.

**When NOT to use**: Navigation — use Tabs or sidebar links. Single action — use Button.

**Key props** (DropdownMenuContent):
- `align`: `'start' | 'center' | 'end'`
- `side`: `'top' | 'right' | 'bottom' | 'left'`

**Composition**: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSub`, `DropdownMenuShortcut`

**Accessibility**: Built on Radix UI DropdownMenu. `role="menu"`, Arrow key navigation, Enter/Space to select, Escape to close.

---

## Display

### Avatar

**Purpose**: User or entity representation via image or initials fallback.

**When to use**: User profiles, comment threads, team lists, any person/entity identifier.

**When NOT to use**: Decorative images — use `next/image` directly.

**Key props**:
- `src`: `string` — image URL
- `alt`: `string` — image alt text; auto-generates initials from this if no image
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `shape`: `'circle' | 'square'`
- `fallback`: `string` — explicit initials override

**Accessibility**: `<img>` with `alt` attribute. Fallback is `aria-hidden` since it's decorative when `alt` conveys the name.

---

### Card

**Purpose**: Contained content surface with consistent padding and border.

**When to use**: Dashboard widgets, content items, grouped information, product cards.

**When NOT to use**: Inline content within text flow — use a `<section>` or `<div>` directly.

**Composition**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**Accessibility**: Rendered as `<div>`. Add `role="article"` or `aria-label` when cards are repeated list items.

---

### Table

**Purpose**: Structured data in rows and columns.

**When to use**: Tabular data with clear row/column relationships. Comparisons.

**When NOT to use**: Non-tabular layout — use CSS Grid/Flexbox. Very simple key-value pairs — use a description list.

**Composition**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

**Accessibility**: Semantic `<table>` with `<th>` elements. Add `scope="col"` or `scope="row"` for complex tables. Wrap in a scrollable container for responsive behavior.

---

### Separator

**Purpose**: Horizontal or vertical visual divider between content sections.

**When to use**: Separating sections in a layout, items in a dropdown, or content groups.

**Key props**:
- `orientation`: `'horizontal' | 'vertical'`
- `decorative`: `boolean` — if true, `aria-hidden="true"` (default: true for visual separators)

**Accessibility**: Built on Radix UI Separator. `role="separator"` when not decorative.

---

### Typography

**Purpose**: Consistent text rendering using design system type scale.

**When to use**: All text content — headings, body, labels, code snippets.

**Components**: `Heading`, `Text`, `Label`, `Code`

**Key props** (Heading):
- `level`: `1 | 2 | 3 | 4 | 5 | 6` — renders `<h1>` through `<h6>`
- `size`: type scale override independent of semantic level

**Key props** (Text):
- `size`: `'xs' | 'sm' | 'md' | 'lg'`
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'`
- `color`: semantic color token name
- `as`: polymorphic element (`'p' | 'span' | 'div'`)

**Accessibility**: Heading hierarchy must be maintained (h1 → h2 → h3). Use `level` semantically, `size` visually.

---

## Layout

### Stack

**Purpose**: One-dimensional flex layout with consistent spacing.

**When to use**: Vertical or horizontal sequences of elements with uniform gaps.

**When NOT to use**: Complex two-dimensional grids — use CSS Grid directly.

**Key props**:
- `direction`: `'row' | 'column'`
- `gap`: spacing token value (e.g. `4`, `8`)
- `align`: `'start' | 'center' | 'end' | 'stretch'`
- `justify`: `'start' | 'center' | 'end' | 'between'`
- `wrap`: `boolean`

**Accessibility**: Renders as `<div>`. Semantically neutral.

---

### Container

**Purpose**: Centered, max-width content wrapper with responsive padding.

**When to use**: Page-level layout to constrain content width on large screens.

**When NOT to use**: Component-level spacing — use Stack or padding directly.

**Key props**:
- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'full'` — max-width preset
- `as`: polymorphic element (`'div' | 'main' | 'section' | 'article'`)

**Accessibility**: Semantically neutral. Use `as="main"` for the page main content area.

---

## Navigation

### Tabs

**Purpose**: Switch between related panels of content.

**When to use**: Secondary navigation within a page, content that logically belongs together but can't all be shown at once.

**When NOT to use**: Primary page navigation — use the app router. Independent pages — use links.

**Key props** (Tabs):
- `defaultValue`: `string` — initially selected tab
- `value`: `string` — controlled selected tab
- `onValueChange`: `(value: string) => void`
- `orientation`: `'horizontal' | 'vertical'`

**Composition**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

**Accessibility**: Built on Radix UI Tabs. `role="tablist"`, `role="tab"`, `role="tabpanel"`. Arrow key navigation. `aria-selected`, `aria-controls`, `aria-labelledby`.

---

### Accordion

**Purpose**: Vertically stacked sections that expand/collapse to reveal content.

**When to use**: FAQs, settings panels, navigation sections with sub-items, progressive disclosure.

**When NOT to use**: Small amounts of content that could just be shown — avoid hiding content unnecessarily.

**Key props** (Accordion):
- `type`: `'single' | 'multiple'` — single collapses others; multiple allows many open
- `defaultValue`: `string | string[]`
- `collapsible`: `boolean` — allow collapsing all items in `single` mode

**Composition**: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

**Accessibility**: Built on Radix UI Accordion. `role="button"` on triggers, `aria-expanded`, `aria-controls`. Keyboard: Enter/Space to toggle, Arrow keys to navigate triggers.

---

### Breadcrumb

**Purpose**: Shows current page location within a hierarchy.

**When to use**: Multi-level navigation hierarchies (3+ levels deep).

**When NOT to use**: Top-level pages with no hierarchy. Single-level navigation.

**Key props** (BreadcrumbItem):
- `href`: `string` — link target (omit for current page item)
- `isCurrent`: `boolean` — marks the current page

**Composition**: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

**Accessibility**: `<nav aria-label="breadcrumb">`. Current page item has `aria-current="page"`.

---

### Pagination

**Purpose**: Navigate between pages of a paginated data set.

**When to use**: Tables, search results, content feeds with more items than fit on one screen.

**When NOT to use**: Infinite scroll patterns. Very small data sets (<2 pages).

**Key props**:
- `page`: `number` — current page (1-based)
- `totalPages`: `number`
- `onPageChange`: `(page: number) => void`
- `siblingCount`: `number` — pages shown on each side of current (default: 1)
- `showFirstLast`: `boolean` — show first/last page buttons

**Accessibility**: `<nav aria-label="pagination">`. Current page link has `aria-current="page"`. Previous/Next buttons have descriptive `aria-label`.
