import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Rótulo de seção da Home: "/ Sobre mim". */
function SectionLabel({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-[13px] font-extrabold tracking-[0.16em] text-primary uppercase light:text-brand-ink',
        className,
      )}
      {...props}
    >
      / {children}
    </span>
  )
}

/** Metadado em DM Mono: "01 — O problema", "Case study 01 · App mobile". */
function Eyebrow({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('eyebrow text-brand-ink', className)} {...props} />
}

export { Eyebrow, SectionLabel }
