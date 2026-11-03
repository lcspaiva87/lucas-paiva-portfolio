import { Code2, Package, Server, Smartphone } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import type { Profile } from '@/payload-types'

// Ícones seguem a posição do número cadastrado no painel.
const ICONS = [Code2, Package, Smartphone, Server]

export function Stats({ stats }: { stats: NonNullable<Profile['stats']> }) {
  if (stats.length === 0) return null
  return (
    <div className="container-page relative">
      <RevealGroup
        as="dl"
        delay={0.6}
        className="m-0 grid grid-cols-2 gap-px border-y border-border-subtle bg-border-subtle lg:grid-cols-4"
      >
        {stats.map((stat, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            // <dt>/<dd> precisam ser filhos diretos do item; o ícone fica dentro do <dd>.
            <RevealItem
              key={stat.id ?? i}
              className="relative flex flex-col-reverse justify-center gap-0.5 bg-background px-3 py-5 transition-colors duration-300 hover:bg-card sm:py-6 sm:pr-5 sm:pl-16"
            >
              <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd
                className={cn(
                  'm-0 text-[15px] font-extrabold sm:text-lg',
                  stat.accent && 'text-primary light:text-brand-ink',
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="absolute top-1/2 left-5 hidden size-7 -translate-y-1/2 text-primary sm:block"
                  strokeWidth={1.6}
                />
                {stat.value}
              </dd>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </div>
  )
}
