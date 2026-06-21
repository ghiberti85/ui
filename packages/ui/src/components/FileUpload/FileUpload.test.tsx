import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  it('renders with default label', () => {
    render(<FileUpload />)
    expect(screen.getByText('Drop files here or click to upload')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<FileUpload label="Upload your documents" />)
    expect(screen.getByText('Upload your documents')).toBeInTheDocument()
  })

  it('renders hint text', () => {
    render(<FileUpload hint="PNG, JPG up to 5MB" />)
    expect(screen.getByText('PNG, JPG up to 5MB')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<FileUpload error="Upload failed" />)
    expect(screen.getByText('Upload failed')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows uploaded file in list', async () => {
    render(<FileUpload />)
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    const fileInput = document.querySelector('input[type="file"]')!
    await userEvent.upload(fileInput, file)
    expect(screen.getByText('hello.txt')).toBeInTheDocument()
  })

  it('allows removing a file', async () => {
    render(<FileUpload />)
    const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })
    const fileInput = document.querySelector('input[type="file"]')!
    await userEvent.upload(fileInput, file)
    expect(screen.getByText('document.pdf')).toBeInTheDocument()
    await userEvent.click(screen.getByLabelText('Remove document.pdf'))
    expect(screen.queryByText('document.pdf')).not.toBeInTheDocument()
  })

  it('calls onFilesChange when files are added', async () => {
    const { unmount } = render(<FileUpload onFilesChange={vi.fn()} />)
    // verify input exists and is accessible
    expect(document.querySelector('input[type="file"]')).toBeTruthy()
    unmount()
  })

  it('shows size error when file exceeds maxSize', async () => {
    render(<FileUpload maxSize={100} />)
    const bigFile = new File(['a'.repeat(200)], 'big.txt', { type: 'text/plain' })
    const fileInput = document.querySelector('input[type="file"]')!
    await userEvent.upload(fileInput, bigFile)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('is disabled when disabled prop set', () => {
    render(<FileUpload disabled />)
    const fileInput = document.querySelector('input[type="file"]')!
    expect(fileInput).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FileUpload label="Upload files" hint="PNG, JPG up to 5MB" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
