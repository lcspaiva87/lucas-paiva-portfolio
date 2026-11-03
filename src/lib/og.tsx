import 'server-only'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ReactNode } from 'react'

/** Imagens de compartilhamento: 1200×630, com a identidade visual do site (sempre no tema escuro). */
export const OG_SIZE = { width: 1200, height: 630 }

const COLORS = {
  bg: '#0d0d0c',
  fg: '#edeae3',
  soft: '#cfcbc3',
  muted: '#8c8983',
  primary: '#ff5a1f',
  deep: '#8a2e0b',
  ink: '#ff8a5c',
  border: '#282725',
  card: '#161615',
}

const font = (file: string) => readFile(join(process.cwd(), 'assets/fonts', file))

export async function ogFonts() {
  const [regular, extrabold, mono] = await Promise.all([
    font('plus-jakarta-sans-latin-400-normal.woff'),
    font('plus-jakarta-sans-latin-800-normal.woff'),
    font('dm-mono-latin-500-normal.woff'),
  ])
  return [
    { name: 'Jakarta', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Jakarta', data: extrabold, weight: 800 as const, style: 'normal' as const },
    { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ]
}

const MARK = 'M6 6H24A8 8 0 0 1 24 22H14V26H26V34H6ZM14 11H24A3 3 0 0 1 24 17H14Z'

export function OgMark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="4 4 34 34">
      <path fill={COLORS.deep} fillRule="evenodd" transform="translate(3 3)" d={MARK} />
      <path fill={COLORS.primary} fillRule="evenodd" d={MARK} />
    </svg>
  )
}

type FrameProps = {
  eyebrow: string
  title: string
  description?: string | null
  tags?: string[]
  footer: string
  /** Título muito longo encolhe para caber em duas linhas. */
  titleSize?: number
}

/** Layout compartilhado pelas imagens: globo de pontos à direita, texto à esquerda. */
export function OgFrame({
  eyebrow,
  title,
  description,
  tags = [],
  footer,
  titleSize = 120,
}: FrameProps): ReactNode {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: COLORS.bg,
        backgroundImage:
          'radial-gradient(circle at 82% 38%, rgba(255,90,31,0.3) 0%, rgba(255,90,31,0.12) 32%, rgba(13,13,12,0) 60%)',
        color: COLORS.fg,
        fontFamily: 'Jakarta',
        padding: '64px 72px',
        overflow: 'hidden',
      }}
    >
      {/* Globo de pontos */}
      <div
        style={{
          position: 'absolute',
          right: -60,
          top: 95,
          width: 440,
          height: 440,
          borderRadius: 9999,
          border: '2px solid rgba(255,122,71,0.55)',
          backgroundColor: '#140c08',
          backgroundImage: 'radial-gradient(circle, rgba(255,90,31,0.95) 2.5px, transparent 3px)',
          backgroundSize: '18px 18px',
        }}
      />
      <svg
        width="760"
        height="300"
        viewBox="0 0 760 300"
        style={{ position: 'absolute', right: -200, top: 165 }}
      >
        <ellipse
          cx="380"
          cy="150"
          rx="350"
          ry="62"
          fill="none"
          stroke="rgba(255,90,31,0.75)"
          strokeWidth="2.5"
          transform="rotate(-16 380 150)"
        />
        <circle cx="62" cy="230" r="7" fill="#ffd2bf" />
      </svg>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 760,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              borderRadius: 8,
              background: 'rgba(61,28,15,0.6)',
              border: '1px solid #3a1a0e',
              fontFamily: 'Mono',
              fontSize: 24,
              color: COLORS.ink,
            }}
          >
            {`> ${eyebrow}`}
            <div style={{ width: 12, height: 26, background: COLORS.primary }} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              fontSize: titleSize,
              lineHeight: 0.9,
              fontWeight: 800,
              letterSpacing: '-0.05em',
            }}
          >
            {title}
            <div
              style={{
                width: titleSize * 0.17,
                height: titleSize * 0.17,
                marginLeft: titleSize * 0.04,
                marginBottom: titleSize * 0.1,
                background: COLORS.primary,
              }}
            />
          </div>
          {description && (
            <div
              style={{
                display: 'flex',
                maxWidth: 680,
                fontSize: 30,
                lineHeight: 1.4,
                color: COLORS.soft,
              }}
            >
              {description}
            </div>
          )}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 10 }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    padding: '8px 14px',
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.card,
                    fontSize: 22,
                    color: COLORS.fg,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <OgMark size={52} />
          <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 22, color: COLORS.muted }}>
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
