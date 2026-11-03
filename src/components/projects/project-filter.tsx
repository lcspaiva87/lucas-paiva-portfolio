'use client'

import { type ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'

type Item = { id: number; category: string; card: ReactNode }

export function ProjectFilter({
  items,
  categories,
}: {
  items: Item[]
  categories: { value: string; label: string }[]
}) {
  const [active, setActive] = useState<string | null>(null)
  const visible = active ? items.filter((item) => item.category === active) : items
  const options = [{ value: null, label: 'Todos' }, ...categories]

  return (
    <div className="flex flex-col gap-8">
      {categories.length > 1 && (
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {options.map(({ value, label }) => {
            const pressed = active === value
            return (
              <button
                key={label}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(value)}
                className={cn(
                  'min-h-11 cursor-pointer rounded-full border px-4 font-mono text-xs transition-colors duration-200',
                  pressed
                    ? 'border-transparent bg-brand-soft text-brand-ink'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'projeto' : 'projetos'}
      </p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5 p-0">
        {visible.map((item) => (
          <li key={item.id} className="contents">
            {item.card}
          </li>
        ))}
      </ul>
    </div>
  )
}
