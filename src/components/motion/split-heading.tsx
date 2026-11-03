'use client'

import { m, type Variants } from 'motion/react'

import { splitHighlight } from '@/lib/format'
import { cn } from '@/lib/utils'

import { IN_VIEW } from './tokens'

const HEADINGS = { h1: m.h1, h2: m.h2 } as const

const piece: Variants = {
  hidden: { opacity: 0, y: '110%', rotate: 10 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1 } },
}

type Props = {
  text: string
  id?: string
  as?: 'h1' | 'h2'
  className?: string
  /** "words" sobe palavra por palavra; "chars", letra por letra (ex.: "Trajetória."). */
  by?: 'words' | 'chars'
}

/**
 * Título que entra em cascata ao aparecer na tela, mantendo o destaque
 * em laranja das palavras marcadas com *asteriscos* no painel.
 */
export function SplitHeading({ text, id, as = 'h2', className, by = 'words' }: Props) {
  const Tag = HEADINGS[as]
  const stagger = by === 'chars' ? 0.04 : 0.08
  const pieces = splitHighlight(text).flatMap((part) =>
    (by === 'chars' ? Array.from(part.text) : part.text.split(/(\s+)/))
      .filter(Boolean)
      .map((t) => ({ text: t, highlight: part.highlight })),
  )

  return (
    <Tag
      id={id}
      aria-label={text.replaceAll('*', '')}
      className={cn('overflow-hidden pb-[0.1em]', className)}
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {pieces.map((p, i) =>
        /^\s+$/.test(p.text) ? (
          ' '
        ) : (
          <m.span
            key={i}
            aria-hidden="true"
            variants={piece}
            className={cn(
              'inline-block origin-bottom-left',
              p.highlight && 'text-primary light:text-brand-ink',
            )}
          >
            {p.text}
          </m.span>
        ),
      )}
    </Tag>
  )
}
