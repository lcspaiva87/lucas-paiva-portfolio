'use client'

import { m, useMotionTemplate, useMotionValue, useSpring, type Variants } from 'motion/react'
import type { ComponentProps, PointerEvent, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { SPRING } from './tokens'
import { usePointerEffects } from './use-fine-pointer'

const MAX_TILT = 4

// Entrada em sequência quando o card está dentro de um <RevealGroup>.
const enter: Variants = {
  hidden: { opacity: 0, y: 96, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2 } },
}

/**
 * Card que inclina até 4° na direção do cursor, com um brilho laranja que segue o mouse.
 * O hover (subir e borda laranja) continua no CSS do card.
 */
type Props = Omit<ComponentProps<typeof m.article>, 'children'> & { children?: ReactNode }

export function TiltCard({ className, children, style, ...props }: Props) {
  const enabled = usePointerEffects()
  const rotateX = useSpring(0, SPRING)
  const rotateY = useSpring(0, SPRING)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 45%)`

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rotateY.set((px - 0.5) * 2 * MAX_TILT)
    rotateX.set((0.5 - py) * 2 * MAX_TILT)
    mx.set(px * 100)
    my.set(py * 100)
  }
  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.article
      className={cn('group/tilt transform-3d', className)}
      variants={enter}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1600 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...props}
    >
      {enabled && (
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-350 group-hover/tilt:opacity-100"
          style={{ backgroundImage: glow }}
        />
      )}
      {children}
    </m.article>
  )
}
