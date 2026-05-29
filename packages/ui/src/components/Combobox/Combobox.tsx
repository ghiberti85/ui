import * as React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../Popover'
import { cn } from '../../utils/cn'
import styles from './Combobox.module.css'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** List of options */
  options: ComboboxOption[]
  /** Controlled value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Placeholder for trigger button */
  placeholder?: string
  /** Placeholder for search input */
  searchPlaceholder?: string
  /** Text shown when no options match */
  emptyText?: string
  /** Disables the combobox */
  disabled?: boolean
  /** Additional className for trigger */
  className?: string
}

/**
 * Combobox — searchable select built on Popover + custom input.
 * Keyboard: Arrow keys to navigate, Enter to select, Escape to close.
 *
 * @example
 * <Combobox
 *   options={[{ value: 'react', label: 'React' }]}
 *   value={val}
 *   onChange={setVal}
 *   placeholder="Select framework..."
 * />
 */
export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      emptyText = 'No results found.',
      disabled = false,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLUListElement>(null)

    const filtered = React.useMemo(
      () =>
        options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        ),
      [options, search]
    )

    const selectedLabel = value ? options.find((o) => o.value === value)?.label : undefined

    function handleSelect(opt: ComboboxOption) {
      if (opt.disabled) return
      onChange?.(opt.value)
      setOpen(false)
      setSearch('')
      setActiveIndex(-1)
    }

    function handleKeyDown(e: React.KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => {
          const next = i + 1
          return next >= filtered.length ? 0 : next
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => {
          const prev = i - 1
          return prev < 0 ? filtered.length - 1 : prev
        })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (activeIndex >= 0 && filtered[activeIndex]) {
          handleSelect(filtered[activeIndex])
        }
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    React.useEffect(() => {
      if (open) {
        setTimeout(() => inputRef.current?.focus(), 0)
        setActiveIndex(-1)
      } else {
        setSearch('')
      }
    }, [open])

    React.useEffect(() => {
      if (activeIndex >= 0 && listRef.current) {
        const el = listRef.current.children[activeIndex] as HTMLElement
        el?.scrollIntoView({ block: 'nearest' })
      }
    }, [activeIndex])

    const listId = React.useId()

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            aria-label={selectedLabel ?? placeholder}
            disabled={disabled}
            className={cn(styles.trigger, className)}
          >
            <span className={styles.triggerText} aria-hidden="true">{selectedLabel ?? placeholder}</span>
            <span className={styles.triggerIcon} aria-hidden="true">▾</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className={styles.popover} onKeyDown={handleKeyDown}>
          <div className={styles.searchWrapper}>
            <input
              ref={inputRef}
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setActiveIndex(-1)
              }}
              aria-label={searchPlaceholder}
            />
          </div>
          <ul
            id={listId}
            ref={listRef}
            role="listbox"
            className={styles.list}
          >
            {filtered.length === 0 ? (
              <li className={styles.empty}>{emptyText}</li>
            ) : (
              filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  className={cn(
                    styles.option,
                    opt.value === value && styles.optionSelected,
                    opt.disabled && styles.optionDisabled,
                    i === activeIndex && styles.optionActive
                  )}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className={styles.optionCheck} aria-hidden="true">
                    {opt.value === value ? '✓' : ''}
                  </span>
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        </PopoverContent>
      </Popover>
    )
  }
)

Combobox.displayName = 'Combobox'
