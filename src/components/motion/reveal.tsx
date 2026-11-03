'use client'

import { m, type Variants } from 'motion/react'
import type { ComponentProps, ElementType } from 'react'

import { ENTER, IN_VIEW } from './tokens'

const item: Variants = {
  hidden: { opacity: 0, y: ENTER.distance },
  visible: { opacity: 1, y: 0 },
}

// Itens da linha do tempo entram da esquerda, como no design.
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
}

const group = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

// Elementos animados criados uma vez, fora da renderização.
const TAGS = {
  div: m.div,
  section: m.section,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  article: m.article,
  header: m.header,
  p: m.p,
  span: m.span,
  dl: m.dl,
} as const

type Tag = keyof typeof TAGS

type Props<T extends Tag> = Omit<ComponentProps<T>, 'ref'> & {
  as?: T
  delay?: number
}

/** Elemento que sobe 24px e aparece quando entra na tela. */
export function Reveal<T extends Tag = 'div'>({ as, delay = 0, ...props }: Props<T>) {
  const Comp = TAGS[as ?? 'div'] as ElementType
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={item}
      transition={{ delay }}
      {...props}
    />
  )
}

/** Container que revela os filhos <RevealItem> em sequência (60 ms entre cada). */
export function RevealGroup<T extends Tag = 'div'>({
  as,
  delay = 0,
  stagger = ENTER.stagger,
  ...props
}: Props<T> & { stagger?: number }) {
  const Comp = TAGS[as ?? 'div'] as ElementType
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={group(stagger, delay)}
      {...props}
    />
  )
}

export function RevealItem<T extends Tag = 'div'>({
  as,
  from = 'below',
  ...props
}: Omit<Props<T>, 'delay'> & { from?: 'below' | 'left' }) {
  const Comp = TAGS[as ?? 'div'] as ElementType
  return <Comp variants={from === 'left' ? fromLeft : item} {...props} />
}
