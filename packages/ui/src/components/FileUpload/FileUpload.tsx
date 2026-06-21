'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import styles from './FileUpload.module.css'

export interface FileUploadFile {
  file: File
  id: string
  preview?: string
}

export interface FileUploadProps {
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Max file size in bytes */
  maxSize?: number
  /** Max number of files */
  maxFiles?: number
  /** Callback with new files */
  onFilesChange?: (files: FileUploadFile[]) => void
  /** Whether the dropzone is disabled */
  disabled?: boolean
  /** Primary label */
  label?: string
  /** Hint text */
  hint?: string
  /** Error message */
  error?: string
  /** Additional className */
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * FileUpload — drag-and-drop file upload with preview list.
 *
 * @example
 * <FileUpload accept="image/*" multiple maxSize={5_000_000} onFilesChange={setFiles} />
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      onFilesChange,
      disabled = false,
      label = 'Drop files here or click to upload',
      hint,
      error,
      className,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<FileUploadFile[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const [sizeError, setSizeError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const inputId = React.useId()

    function addFiles(incoming: File[]) {
      setSizeError(null)
      let valid = incoming

      if (maxSize) {
        const oversized = incoming.filter((f) => f.size > maxSize)
        if (oversized.length > 0) {
          setSizeError(`File too large. Max size: ${formatBytes(maxSize)}`)
          valid = incoming.filter((f) => f.size <= maxSize)
        }
      }

      const newEntries: FileUploadFile[] = valid.map((file) => ({
        file,
        id: `${file.name}-${file.size}-${Date.now()}`,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      }))

      setFiles((prev) => {
        const next = multiple ? [...prev, ...newEntries] : newEntries
        const capped = maxFiles ? next.slice(0, maxFiles) : next
        onFilesChange?.(capped)
        return capped
      })
    }

    function removeFile(id: string) {
      setFiles((prev) => {
        const next = prev.filter((f) => f.id !== id)
        const removed = prev.find((f) => f.id === id)
        if (removed?.preview) URL.revokeObjectURL(removed.preview)
        onFilesChange?.(next)
        return next
      })
    }

    function handleDrop(e: React.DragEvent) {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      const dropped = Array.from(e.dataTransfer.files)
      addFiles(dropped)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const selected = Array.from(e.target.files ?? [])
      addFiles(selected)
      e.target.value = ''
    }

    const displayError = error ?? sizeError

    return (
      <div className={cn(styles.wrapper, className)}>
        <label
          htmlFor={inputId}
          className={cn(
            styles.dropzone,
            isDragging && styles.dragging,
            disabled && styles.disabled,
            displayError && styles.hasError
          )}
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className={styles.hiddenInput}
            onChange={handleChange}
            aria-describedby={displayError ? `${inputId}-error` : undefined}
          />
          <span className={styles.icon} aria-hidden="true">
            {isDragging ? '📂' : '⬆️'}
          </span>
          <span className={styles.label}>{label}</span>
          {hint && <span className={styles.hint}>{hint}</span>}
        </label>

        {displayError && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {displayError}
          </span>
        )}

        {files.length > 0 && (
          <ul className={styles.fileList} aria-label="Uploaded files">
            {files.map((entry) => (
              <li key={entry.id} className={styles.fileItem}>
                {entry.preview ? (
                  <img  /* preview is a local object URL, next/image not applicable */
                    src={entry.preview}
                    alt={entry.file.name}
                    className={styles.preview}
                  />
                ) : (
                  <span className={styles.fileIcon} aria-hidden="true">📄</span>
                )}
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{entry.file.name}</span>
                  <span className={styles.fileSize}>{formatBytes(entry.file.size)}</span>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFile(entry.id)}
                  aria-label={`Remove ${entry.file.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
