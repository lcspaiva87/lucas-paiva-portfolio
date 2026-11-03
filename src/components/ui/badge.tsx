import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'border border-border bg-muted text-foreground',
        brand: 'bg-brand-soft font-medium text-brand-ink',
        success: 'bg-success-soft text-success',
        placeholder: 'bg-placeholder-soft text-placeholder',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === 'success' && (
        <span
          aria-hidden="true"
          className="size-[7px] rounded-full bg-success motion-safe:animate-pulse-ring"
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
