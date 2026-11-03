import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, CSSProperties } from 'react'

import { hasTechGlyph, TechGlyph } from '@/components/tech-glyph'
import { cn } from '@/lib/utils'

/**
 * Ícone quadrado da tecnologia: o logo escolhido no painel ou, sem logo, a sigla ("Re", "TS").
 * Uma única cor (cadastrada no CMS) gera fundo e traço para os dois temas.
 */
const techIconVariants = cva(
  'flex size-[26px] flex-none items-center justify-center rounded-md font-mono text-[10px] font-medium',
  {
    variants: {
      appearance: {
        tint: [
          'bg-[color-mix(in_oklab,var(--tech)_var(--tech-bg-amount),var(--card))]',
          'text-[color-mix(in_oklab,var(--tech)_var(--tech-ink-amount),var(--tech-ink-base))]',
        ],
        solid: 'bg-(--tech) font-sans font-extrabold text-(--tech-on)',
        outline: 'rounded-full border-[1.5px] border-foreground font-sans text-xs font-extrabold',
        neutral: 'bg-muted text-foreground',
      },
      glyph: { true: '', false: '' },
    },
    compoundVariants: [
      // Logos que já são um quadrado/círculo (TS, JS, Next.js) aparecem inteiros, sem caixa.
      { glyph: true, appearance: 'solid', className: 'bg-transparent text-(--tech)' },
      { glyph: true, appearance: 'outline', className: 'border-0 text-foreground' },
    ],
    defaultVariants: {
      appearance: 'tint',
      glyph: false,
    },
  },
)

type TechIconProps = ComponentProps<'span'> &
  Omit<VariantProps<typeof techIconVariants>, 'glyph'> & {
    /** Logo escolhido no painel (ver lib/tech-icon-options). */
    glyph?: string | null
    abbr?: string | null
    color?: string
    /** Cor do texto no modo solid (ex.: preto sobre o amarelo do JS). */
    onColor?: string
  }

function TechIcon({
  glyph,
  abbr,
  color,
  onColor,
  appearance,
  className,
  style,
  ...props
}: TechIconProps) {
  const withGlyph = hasTechGlyph(glyph)
  const fullSize = withGlyph && (appearance === 'solid' || appearance === 'outline')
  return (
    <span
      aria-hidden="true"
      className={cn(techIconVariants({ appearance, glyph: withGlyph }), className)}
      style={
        {
          '--tech': color ?? 'var(--muted-foreground)',
          '--tech-on': onColor ?? '#ffffff',
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {withGlyph ? (
        <TechGlyph name={glyph} className={fullSize ? 'size-[22px]' : 'size-[15px]'} />
      ) : (
        abbr
      )}
    </span>
  )
}

const techChipVariants = cva('inline-flex items-center font-sans whitespace-nowrap', {
  variants: {
    variant: {
      /** Seção Stack: pílula com ícone. */
      pill: [
        'h-[46px] gap-2.5 rounded-[10px] border border-border bg-card pr-3.5 pl-[9px] text-sm font-semibold',
        'transition-[translate,border-color] duration-350 ease-out-expo hover:-translate-y-[3px] hover:border-primary',
      ],
      /** Chips flutuantes do hero. */
      float: [
        'gap-2.5 rounded-[10px] border border-border bg-card py-2.5 pr-4 pl-2.5 text-[15px] font-semibold',
        'light:shadow-[0_10px_24px_-12px_rgb(13_13_12/0.25)]',
      ],
      /** Tags pequenas dos cards de projeto, sem ícone. */
      tag: 'rounded-md border border-border bg-muted px-2.5 py-1.5 text-xs',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
})

type TechChipProps = ComponentProps<'span'> &
  VariantProps<typeof techChipVariants> & {
    name: string
    icon?: Omit<TechIconProps, 'className'>
  }

function TechChip({ name, icon, variant, className, ...props }: TechChipProps) {
  return (
    <span className={cn(techChipVariants({ variant }), className)} {...props}>
      {icon && variant !== 'tag' && <TechIcon {...icon} />}
      {name}
    </span>
  )
}

export { TechChip, TechIcon, techChipVariants, techIconVariants }
