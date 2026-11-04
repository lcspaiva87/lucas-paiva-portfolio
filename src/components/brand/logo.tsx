import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const MARK_PATH = 'M6 6H24A8 8 0 0 1 24 22H14V26H26V34H6ZM14 11H24A3 3 0 0 1 24 17H14Z'

/** Monograma "P" com sombra deslocada. */
function LogoMark({ size = 40, className, ...props }: ComponentProps<'svg'> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="4 4 34 34"
      aria-hidden="true"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        fill="var(--primary-deep)"
        fillRule="evenodd"
        transform="translate(3 3)"
        d={MARK_PATH}
      />
      <path fill="var(--primary)" fillRule="evenodd" d={MARK_PATH} />
    </svg>
  )
}

/** "Lucas Paiva" com o quadrado laranja no fim. */
function Wordmark({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-[19px] font-extrabold tracking-[-0.035em] whitespace-nowrap', className)}
      {...props}
    >
      Lucas Paiva
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block size-[0.27em] bg-primary align-baseline"
      />
    </span>
  )
}

type LogoProps = ComponentProps<'span'> & {
  markSize?: number
  subtitle?: string
}

function Logo({ markSize = 40, subtitle, className, ...props }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-foreground', className)} {...props}>
      <LogoMark size={markSize} />
      <span className="flex flex-col gap-0.5">
        <Wordmark />
        {subtitle && <span className="font-mono text-xs text-muted-foreground">{subtitle}</span>}
      </span>
    </span>
  )
}

export { Logo, LogoMark, MARK_PATH, Wordmark }
