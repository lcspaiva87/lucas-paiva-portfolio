'use client'

import { m } from 'motion/react'
import type { CSSProperties } from 'react'

import { IN_VIEW } from './tokens'

/**
 * Linha laranja da timeline que cresce de cima para baixo ao entrar na tela,
 * com um ponto brilhante na ponta.
 */
export function GrowLine({ style }: { style?: CSSProperties }) {
  return (
    <m.div
      aria-hidden="true"
      className="absolute inset-y-0 w-0.5 origin-top bg-primary after:absolute after:-bottom-[7px] after:-left-1.5 after:size-3.5 after:rounded-full after:bg-brand-ink after:shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_25%,transparent),0_0_24px_6px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
      style={style}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 2.6, delay: 0.3 }}
    />
  )
}
