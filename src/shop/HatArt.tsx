import { useId } from 'react'
import type { Style } from './catalog'

/*
  Desenhos técnicos (flats) dos modelos, gerados a partir da cor e do bordado.
  Servem de imagem do produto até haver fotografias reais (ver catalog.ts → photos).
*/

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)))
  const r = ch(n >> 16),
    g = ch((n >> 8) & 255),
    b = ch(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255 > 0.55
}

type Props = { style: Style; base: string; accent: string; mark: string; className?: string; title?: string }

export default function HatArt({ style, base, accent, mark, className, title }: Props) {
  const uid = useId().replace(/:/g, '')
  const seam = isLight(base) ? shade(base, -0.22) : shade(base, 0.16)
  const stitch = isLight(base) ? shade(base, -0.12) : shade(base, 0.28)
  const under = shade(base, -0.35)
  const fs = (max: number, width: number) => Math.min(max, width / (mark.length * 0.5))

  const defs = (
    <defs>
      <radialGradient id={`hl${uid}`} cx="38%" cy="28%" r="75%">
        <stop offset="0" stopColor="#fff" stopOpacity={isLight(base) ? 0.35 : 0.16} />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.38" />
      </radialGradient>
      <linearGradient id={`brim${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={shade(base, -0.05)} />
        <stop offset="1" stopColor={shade(base, -0.3)} />
      </linearGradient>
      <pattern id={`mesh${uid}`} width="7" height="7" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill={shade(base, -0.1)} />
        <circle cx="3.5" cy="3.5" r="1.9" fill={shade(base, -0.55)} />
      </pattern>
      <pattern id={`rib${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="transparent" />
        <rect x="0" width="2.2" height="9" fill="#000" opacity="0.16" />
      </pattern>
      <filter id={`blur${uid}`} x="-20%" y="-50%" width="140%" height="200%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </defs>
  )

  const shadow = <ellipse cx="200" cy="322" rx="132" ry="13" fill="#000" opacity="0.5" filter={`url(#blur${uid})`} />

  const text = (y: number, size: number, fill = accent, extra = {}) => (
    <text
      x="200"
      y={y}
      textAnchor="middle"
      fontFamily="'Big Shoulders Display', sans-serif"
      fontWeight={900}
      fontSize={size}
      fill={fill}
      letterSpacing="0.5"
      style={{ paintOrder: 'stroke' }}
      stroke={shade(accent, -0.35)}
      strokeWidth={0.8}
      {...extra}
    >
      {mark}
    </text>
  )

  let body: React.ReactNode = null

  if (style === 'dad' || style === 'trucker' || style === 'snapback') {
    const crown =
      style === 'snapback'
        ? 'M88 252 C 88 150 134 90 200 88 C 266 90 312 150 312 252 Z'
        : style === 'trucker'
          ? 'M94 252 C 90 150 140 94 200 92 C 260 94 310 150 306 252 Z'
          : 'M92 250 C 90 168 140 108 200 106 C 260 108 310 168 308 250 Z'
    const top = style === 'dad' ? 106 : style === 'trucker' ? 92 : 88
    const front = `M200 ${top} C 158 ${top + 26} 134 186 130 252 L270 252 C 266 186 242 ${top + 26} 200 ${top} Z`
    const brim =
      style === 'snapback'
        ? 'M60 248 L340 248 L356 268 C 300 280 100 280 44 268 Z'
        : 'M78 246 C 128 230 272 230 322 246 C 340 262 318 294 200 300 C 82 294 60 262 78 246 Z'
    body = (
      <>
        {shadow}
        <path d={crown} fill={style === 'trucker' ? `url(#mesh${uid})` : base} />
        {style === 'trucker' && <path d={front} fill={base} />}
        <path d={crown} fill={`url(#hl${uid})`} />
        <g fill="none" stroke={seam} strokeWidth="1.6">
          {style !== 'trucker' && <path d={`M200 ${top} L200 250`} />}
          <path d={`M200 ${top} C 162 ${top + 28} 138 186 132 250`} />
          <path d={`M200 ${top} C 238 ${top + 28} 262 186 268 250`} />
        </g>
        <g fill="none" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" opacity="0.7">
          <path d={`M206 ${top + 6} L206 248`} />
          <path d={`M194 ${top + 6} C 160 ${top + 32} 144 186 140 248`} />
          <path d={`M206 ${top + 6} C 240 ${top + 32} 256 186 260 248`} />
        </g>
        <circle cx="200" cy={top + 1} r="7" fill={shade(base, -0.08)} stroke={seam} />
        {style === 'dad' && (
          <g fill={shade(base, -0.45)}>
            <circle cx="158" cy="150" r="3" />
            <circle cx="242" cy="150" r="3" />
          </g>
        )}
        {style === 'trucker'
          ? text(214, fs(92, 150))
          : style === 'snapback'
            ? text(205, fs(48, 230))
            : text(206, fs(56, 150))}
        <path d={brim} fill={`url(#brim${uid})`} />
        {style === 'snapback' ? (
          <>
            <path d="M44 268 C 100 280 300 280 356 268 L352 276 C 300 288 100 288 48 276 Z" fill={under} />
            <rect x="258" y="254" width="26" height="10" rx="1.5" fill={accent} opacity="0.9" />
          </>
        ) : (
          <g fill="none" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
            <path d="M92 252 C 140 240 260 240 308 252" />
            <path d="M84 262 C 140 250 260 250 316 262" />
          </g>
        )}
      </>
    )
  }

  if (style === 'bucket') {
    const crown = 'M120 238 C 122 184 130 150 142 136 C 174 118 226 118 258 136 C 270 150 278 184 280 238 Z'
    body = (
      <>
        {shadow}
        <path d="M46 262 C 72 222 328 222 354 262 Z" fill={shade(base, -0.4)} />
        <path d={crown} fill={base} />
        <path d={crown} fill={`url(#hl${uid})`} />
        <path d="M142 136 C 174 146 226 146 258 136" fill="none" stroke={seam} strokeWidth="1.4" />
        <g fill={shade(base, -0.45)}>
          <circle cx="146" cy="172" r="2.6" />
          <circle cx="254" cy="172" r="2.6" />
        </g>
        {text(212, fs(40, 130))}
        <path d="M120 238 C 160 252 240 252 280 238 L354 262 C 330 300 70 300 46 262 Z" fill={`url(#brim${uid})`} />
        <path d="M120 238 C 160 252 240 252 280 238" fill="none" stroke={seam} strokeWidth="2" />
        <g fill="none" stroke={stitch} strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
          <path d="M66 268 C 120 290 280 290 334 268" />
          <path d="M84 266 C 130 282 270 282 316 266" />
        </g>
      </>
    )
  }

  if (style === 'beanie') {
    const dome = 'M112 262 C 110 160 150 98 200 96 C 250 98 290 160 288 262 Z'
    body = (
      <>
        {shadow}
        <clipPath id={`dc${uid}`}>
          <path d={dome} />
        </clipPath>
        <path d={dome} fill={base} />
        <rect x="100" y="80" width="200" height="200" fill={`url(#rib${uid})`} clipPath={`url(#dc${uid})`} />
        <path d={dome} fill={`url(#hl${uid})`} />
        <rect x="104" y="212" width="192" height="70" rx="16" fill={shade(base, -0.06)} />
        <rect x="104" y="212" width="192" height="70" rx="16" fill={`url(#rib${uid})`} />
        <rect x="104" y="212" width="192" height="70" rx="16" fill="none" stroke={seam} strokeWidth="1.2" />
        <rect x="164" y="232" width="72" height="30" rx="2" fill={accent} />
        <text
          x="200"
          y="252.5"
          textAnchor="middle"
          fontFamily="'Big Shoulders Display', sans-serif"
          fontWeight={800}
          fontSize={Math.min(15, 62 / (mark.length * 0.5))}
          fill={isLight(accent) ? '#141210' : '#ece5d8'}
          letterSpacing="1"
        >
          {mark}
        </text>
      </>
    )
  }

  if (style === 'balaclava') {
    const head = 'M124 316 C 108 200 138 90 200 88 C 262 90 292 200 276 316 C 250 334 150 334 124 316 Z'
    body = (
      <>
        {shadow}
        <clipPath id={`hc${uid}`}>
          <path d={head} />
        </clipPath>
        <path d={head} fill={base} />
        <rect x="100" y="80" width="200" height="260" fill={`url(#rib${uid})`} clipPath={`url(#hc${uid})`} />
        <path d={head} fill={`url(#hl${uid})`} />
        <rect x="140" y="170" width="120" height="42" rx="21" fill="#050404" />
        <rect x="140" y="170" width="120" height="42" rx="21" fill="none" stroke={seam} strokeWidth="2.5" />
        <path d="M150 240 C 180 250 220 250 250 240" fill="none" stroke={seam} strokeWidth="1.2" opacity="0.6" />
        {text(150, fs(26, 70))}
      </>
    )
  }

  return (
    <svg className={className} viewBox="0 0 400 400" role="img" aria-label={title}>
      {title && <title>{title}</title>}
      {defs}
      {body}
    </svg>
  )
}
