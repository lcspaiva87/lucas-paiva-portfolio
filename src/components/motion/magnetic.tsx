'use client'

import { m, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { SPRING } from './tokens'
import { usePointerEffects } from './use-fine-pointer'

/** Puxa o filho na direção do cursor (até `strength` px), com mola 300/30. */
export function Magnetic({ children, strength = 8 }: { children: ReactNode; strength?: number }) {
  const enabled = usePointerEffects()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span
      className="inline-flex max-sm:w-full [&>*]:max-sm:w-full"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  )
}
