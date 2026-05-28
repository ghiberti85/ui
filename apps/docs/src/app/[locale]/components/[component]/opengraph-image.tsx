import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'Ghiberti UI Component'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const componentMeta: Record<string, { subtitle: string; tags: string[] }> = {
  button: {
    subtitle: 'Trigger actions and navigation with styled, accessible buttons.',
    tags: ['4 variants', '4 sizes', 'Loading state', 'asChild'],
  },
  badge: {
    subtitle: 'Compact labels to highlight status, categories, or metadata.',
    tags: ['4 variants', 'Accessible', 'TypeScript'],
  },
  input: {
    subtitle: 'Text input field with label, helper text, and error state.',
    tags: ['Label', 'Error state', 'Accessible'],
  },
  textarea: {
    subtitle: 'Multi-line text input with resize control and error state.',
    tags: ['Resize prop', 'Label', 'Error state'],
  },
  select: {
    subtitle: 'Dropdown selection built on Radix UI with full keyboard support.',
    tags: ['Radix UI', 'Accessible', 'Label', 'Helper text'],
  },
  checkbox: {
    subtitle: 'CSS-drawn checkbox with indeterminate state support.',
    tags: ['Indeterminate', 'Accessible', 'TypeScript'],
  },
  radio: {
    subtitle: 'Radio group for single selection from a set of options.',
    tags: ['Horizontal', 'Vertical', 'Accessible'],
  },
  switch: {
    subtitle: 'Animated toggle switch built on Radix UI.',
    tags: ['Radix UI', 'Animated', 'Accessible'],
  },
  card: {
    subtitle: 'Compound card component with Header, Content, and Footer.',
    tags: ['Compound API', 'Header', 'Footer', 'Content'],
  },
  dialog: {
    subtitle: 'Modal dialog built on Radix UI with full accessibility.',
    tags: ['Radix UI', 'Modal', 'Accessible', 'TypeScript'],
  },
  tooltip: {
    subtitle: 'Contextual hints with 4-direction animations and inverted colors.',
    tags: ['Radix UI', '4 directions', 'Animated', 'Accessible'],
  },
  avatar: {
    subtitle: 'User avatar with image fallback and auto-generated initials.',
    tags: ['5 sizes', 'Fallback', 'Circle / Square'],
  },
  separator: {
    subtitle: 'Visual divider supporting horizontal and vertical orientation.',
    tags: ['Horizontal', 'Vertical', 'Accessible'],
  },
  typography: {
    subtitle: 'Heading, Text, Label, and Code typography primitives.',
    tags: ['Heading', 'Text', 'Label', 'Code'],
  },
  stack: {
    subtitle: 'Flexbox layout primitive for composing vertical or horizontal stacks.',
    tags: ['Flex', 'Gap', 'Align', 'Direction'],
  },
  container: {
    subtitle: 'Max-width wrapper for centering page content.',
    tags: ['Max-width', 'Responsive', 'Padding'],
  },
  tabs: {
    subtitle: 'Tab navigation built on Radix UI, horizontal and vertical.',
    tags: ['Radix UI', 'Horizontal', 'Vertical', 'Accessible'],
  },
  accordion: {
    subtitle: 'Collapsible sections with smooth animated height transitions.',
    tags: ['Radix UI', 'Single / Multiple', 'Animated'],
  },
  toast: {
    subtitle: '5-variant notification toasts with useToast hook.',
    tags: ['5 variants', 'useToast hook', 'Radix UI'],
  },
  table: {
    subtitle: 'Semantic HTML table with striped rows and scrollable wrapper.',
    tags: ['Semantic HTML', 'Striped', 'Scrollable'],
  },
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function loadFont(filename: string): Buffer | null {
  const candidates = [
    path.join(process.cwd(), 'node_modules/@fontsource/dm-sans/files', filename),
    path.join(
      process.cwd(),
      '../../node_modules/.pnpm/@fontsource+dm-sans@5.2.8/node_modules/@fontsource/dm-sans/files',
      filename,
    ),
  ]
  for (const p of candidates) {
    try {
      return fs.readFileSync(p)
    } catch {
      // try next
    }
  }
  return null
}

export default async function Image({ params }: { params: Promise<{ component: string; locale: string }> }) {
  const { component } = await params
  const meta = componentMeta[component] ?? {
    subtitle: 'A reusable, accessible React component.',
    tags: ['Accessible', 'TypeScript'],
  }

  const font400 = loadFont('dm-sans-latin-400-normal.woff2')
  const font700 = loadFont('dm-sans-latin-700-normal.woff2')

  const fonts: ConstructorParameters<typeof ImageResponse>[1]['fonts'] = []
  if (font400) {
    fonts.push({ name: 'DM Sans', data: font400, weight: 400, style: 'normal' })
  }
  if (font700) {
    fonts.push({ name: 'DM Sans', data: font700, weight: 700, style: 'normal' })
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          fontFamily: fonts.length > 0 ? 'DM Sans, sans-serif' : 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Left purple accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '4px',
            height: '630px',
            background: '#6d28d9',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 80px 64px 84px',
            width: '100%',
          }}
        >
          {/* Top section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Breadcrumb */}
            <span
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#6b7280',
                letterSpacing: '0.1em',
              }}
            >
              Ghiberti UI / Components
            </span>

            {/* Component name */}
            <h1
              style={{
                fontSize: '88px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {capitalize(component)}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#9ca3af',
                margin: 0,
                lineHeight: 1.5,
                maxWidth: '800px',
              }}
            >
              {meta.subtitle}
            </p>
          </div>

          {/* Bottom: tag pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              {meta.tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    background: 'rgba(109, 40, 217, 0.15)',
                    border: '1px solid rgba(109, 40, 217, 0.4)',
                    borderRadius: '6px',
                    color: '#a78bfa',
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#4b5563',
                margin: 0,
              }}
            >
              ghiberti-ui.vercel.app
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  )
}
