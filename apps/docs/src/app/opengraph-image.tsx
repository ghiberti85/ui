import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'Ghiberti UI — Design System'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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

export default async function Image() {
  const font400 = loadFont('dm-sans-latin-400-normal.woff')
  const font700 = loadFont('dm-sans-latin-700-normal.woff')

  const fonts: { name: string; data: Buffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: 'normal' | 'italic' }[] = []
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

        {/* Token-stack icon — top right */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 64,
            width: 120,
            height: 120,
            borderRadius: 28,
            background: '#18181b',
            border: '1px solid rgba(109,40,217,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'absolute', left: 22, top: 28 }}>
            <div style={{ width: 44, height: 10, borderRadius: 5, background: 'white' }} />
            <div style={{ width: 32, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.7)' }} />
            <div style={{ width: 56, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.45)' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              right: 18,
              top: 24,
              width: 20,
              height: 20,
              borderRadius: 10,
              background: '#6d28d9',
            }}
          />
        </div>

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#6b7280',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              DESIGN SYSTEM
            </span>
            <h1
              style={{
                fontSize: '96px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Ghiberti UI
            </h1>
            <p
              style={{
                fontSize: '28px',
                fontWeight: 400,
                color: '#9ca3af',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Component library · 3 themes · Dark mode
            </p>
          </div>

          {/* Bottom section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DS pill badges */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['ds-editorial', 'ds-brutalist', 'ds-clean'].map((ds) => (
                <div
                  key={ds}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 18px',
                    background: 'rgba(109, 40, 217, 0.15)',
                    border: '1px solid rgba(109, 40, 217, 0.4)',
                    borderRadius: '6px',
                    color: '#a78bfa',
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {ds}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <p
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#6b7280',
                margin: 0,
              }}
            >
              30 components · 326 tests · TypeScript · React 19
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
