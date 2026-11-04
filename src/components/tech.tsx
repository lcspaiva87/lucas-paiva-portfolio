import type { Technology } from '@/payload-types'

import { TechChip } from './ui/tech-chip'

type Variant = 'pill' | 'float' | 'tag'

/** TechChip alimentado por um documento da coleção `technologies`. */
export function Tech({
  tech,
  variant = 'pill',
  className,
}: {
  tech: Technology
  variant?: Variant
  className?: string
}) {
  return (
    <TechChip
      variant={variant}
      name={tech.name}
      className={className}
      icon={{
        glyph: tech.icon,
        abbr: tech.abbr || tech.name.slice(0, 2),
        appearance: tech.appearance,
        color: tech.color ?? undefined,
        onColor: tech.onColor ?? undefined,
      }}
    />
  )
}
