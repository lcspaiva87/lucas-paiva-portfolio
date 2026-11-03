import { Code2, Package, Server, Smartphone } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Profile } from '@/payload-types'

// Ícones seguem a posição do número cadastrado no painel.
const ICONS = [Code2, Package, Smartphone, Server]

export function Stats({ stats }: { stats: NonNullable<Profile['stats']> }) {
  if (stats.length === 0) return null
  return (
    <div className="container-page relative">
      <dl className="m-0 grid grid-cols-2 gap-px border-y border-border-subtle bg-border-subtle lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <div
              key={stat.id ?? i}
              className="flex items-center gap-4 bg-background px-3 py-5 transition-colors duration-300 hover:bg-card sm:px-5 sm:py-6"
            >
              <Icon
                aria-hidden="true"
                className="hidden size-7 shrink-0 text-primary sm:block"
                strokeWidth={1.6}
              />
              <div className="flex flex-col-reverse gap-0.5">
                <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                <dd
                  className={cn(
                    'm-0 text-[15px] font-extrabold sm:text-lg',
                    stat.accent && 'text-primary light:text-brand-ink',
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
