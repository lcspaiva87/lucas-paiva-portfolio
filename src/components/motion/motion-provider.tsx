'use client'

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

import { EASE_OUT_EXPO } from './tokens'

/**
 * Carrega só as features de animação usadas no site e aplica os tokens da direção visual.
 * reducedMotion="user": com "reduzir movimento" ativado, transforms são desligados
 * e sobram apenas os fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
