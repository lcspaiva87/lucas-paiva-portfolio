import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type = 'text', ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'h-12 w-full min-w-0 rounded-lg border border-input bg-background px-4 font-sans text-[15px] text-foreground',
        'placeholder:text-muted-foreground transition-colors duration-200',
        'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        'aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label className={cn('text-[13px] font-medium text-muted-foreground', className)} {...props} />
  )
}

export { Input, Label }
