import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { FileUpload, type FileUploadFile } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

function DefaultDemo() {
  const [files, setFiles] = React.useState<FileUploadFile[]>([])
  return (
    <div style={{ width: 400 }}>
      <FileUpload
        label="Drop files here or click to upload"
        hint="Any file type supported"
        onFilesChange={setFiles}
      />
      {files.length > 0 && (
        <p style={{ fontSize: '0.75rem', marginTop: 8, color: 'var(--color-semantic-foreground-muted)' }}>
          {files.length} file(s) selected
        </p>
      )}
    </div>
  )
}

export const Default: StoryObj<typeof FileUpload> = { render: () => <DefaultDemo /> }

export const ImagesOnly: StoryObj<typeof FileUpload> = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUpload
        accept="image/*"
        multiple
        label="Upload images"
        hint="PNG, JPG, GIF up to 5MB each"
        maxSize={5_000_000}
      />
    </div>
  ),
}

export const MultipleFiles: StoryObj<typeof FileUpload> = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUpload multiple maxFiles={5} label="Upload up to 5 files" hint="Maximum 5 files" />
    </div>
  ),
}

export const WithError: StoryObj<typeof FileUpload> = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUpload label="Upload document" error="Upload failed. Please try again." />
    </div>
  ),
}

export const Disabled: StoryObj<typeof FileUpload> = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUpload disabled label="Upload disabled" />
    </div>
  ),
}
