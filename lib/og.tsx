import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }

// Image de partage (Open Graph et Twitter) : fond vert sombre, titre, nom du site. Générée au build.
export function renderOg(title: string, kicker?: string) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: 'linear-gradient(120deg, #2f5e4a 0%, #1a382c 100%)',
        color: '#f4f3ef',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 30, letterSpacing: 4, textTransform: 'uppercase', color: '#c3d6bd' }}>
        {kicker ?? site.name}
      </div>
      <div style={{ fontSize: title.length > 60 ? 64 : 84, fontWeight: 700, lineHeight: 1.1 }}>
        {title}
      </div>
      <div style={{ fontSize: 30, color: '#a9c4a2' }}>{site.name}</div>
    </div>,
    ogSize,
  )
}
