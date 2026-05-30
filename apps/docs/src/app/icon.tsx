import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Token bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'absolute', left: 7, top: 8 }}>
          <div style={{ width: 14, height: 3, borderRadius: 2, background: 'white' }} />
          <div style={{ width: 10, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.7)' }} />
          <div style={{ width: 18, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.45)' }} />
        </div>
        {/* Purple dot */}
        <div
          style={{
            position: 'absolute',
            right: 4,
            top: 8,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: '#6d28d9',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
