import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-sans no-underline',
    'transition-[translate,box-shadow,border-color,background-color,color] duration-350 ease-out-expo',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary font-bold text-primary-foreground hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-10px_var(--glow)]',
        secondary:
          'border border-border-strong font-semibold text-foreground hover:border-primary hover:bg-brand-soft/40',
        link: 'h-11 rounded-none border-b border-brand-line px-0 font-semibold text-brand-ink hover:text-foreground',
      },
      size: {
        md: 'h-11 px-5 text-[15px]',
        lg: 'h-13 px-6 text-base',
      },
    },
    compoundVariants: [{ variant: 'link', className: 'h-11 px-0 text-[15px]' }],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/** Seta que avança 4px quando o botão recebe hover. */
function ButtonArrow({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex transition-transform duration-350 ease-out-expo group-hover/button:translate-x-1',
        className,
      )}
      {...props}
    />
  )
}

export { Button, ButtonArrow, buttonVariants }
