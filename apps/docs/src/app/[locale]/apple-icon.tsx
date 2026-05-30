import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Token bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'absolute', left: 40, top: 52 }}>
          <div style={{ width: 79, height: 17, borderRadius: 9, background: 'white' }} />
          <div style={{ width: 56, height: 17, borderRadius: 9, background: 'rgba(255,255,255,0.7)' }} />
          <div style={{ width: 102, height: 17, borderRadius: 9, background: 'rgba(255,255,255,0.45)' }} />
        </div>
        {/* Purple dot */}
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 52,
            width: 34,
            height: 34,
            borderRadius: 17,
            background: '#6d28d9',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
