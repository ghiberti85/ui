'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import { Chip } from '../Chip'
import styles from './TagInput.module.css'

export interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  className?: string
}

/**
 * TagInput — multi-value text input with removable Chip tags.
 * Press Enter or comma to add a tag. Backspace on empty input removes the last tag.
 */
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, placeholder = 'Add tag…', disabled = false, maxTags, className }, ref) => {
    const [internalTags, setInternalTags] = React.useState<string[]>(value ?? [])
    const [inputVal, setInputVal] = React.useState('')
    const isControlled = value !== undefined
    const tags = isControlled ? value : internalTags

    function update(next: string[]) {
      if (!isControlled) setInternalTags(next)
      onChange?.(next)
    }

    function addTag(tag: string) {
      const trimmed = tag.trim()
      if (!trimmed || tags.includes(trimmed)) return
      if (maxTags !== undefined && tags.length >= maxTags) return
      update([...tags, trimmed])
      setInputVal('')
    }

    function removeTag(tag: string) {
      update(tags.filter((t) => t !== tag))
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        addTag(inputVal)
      } else if (e.key === 'Backspace' && !inputVal && tags.length > 0) {
        removeTag(tags[tags.length - 1])
      }
    }

    function handleBlur() {
      if (inputVal.trim()) addTag(inputVal)
    }

    const atMax = maxTags !== undefined && tags.length >= maxTags
    const inputRef = ref as React.RefObject<HTMLInputElement>

    return (
      <div
        className={cn(styles.wrapper, disabled && styles.disabled, className)}
        onClick={() => inputRef?.current?.focus()}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="secondary"
            size="sm"
            onRemove={disabled ? undefined : () => removeTag(tag)}
            removeLabel={`Remove ${tag}`}
          >
            {tag}
          </Chip>
        ))}
        {!atMax && (
          <input
            ref={ref}
            type="text"
            className={styles.input}
            value={inputVal}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled}
            onChange={(e) => setInputVal(e.target.value.replace(',', ''))}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label={placeholder}
          />
        )}
      </div>
    )
  }
)

TagInput.displayName = 'TagInput'
