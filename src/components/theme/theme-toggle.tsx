'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

const options = [
  { value: 'light', label: 'Tema claro', Icon: Sun },
  { value: 'dark', label: 'Tema escuro', Icon: Moon },
] as const

const subscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // O tema só é conhecido no cliente; evita mismatch de hidratação.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  return (
    <div
      role="group"
      aria-label="Tema"
      className={cn(
        'flex h-11 rounded-full border border-border bg-card p-[3px] light:border-border-strong',
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        const active = mounted && resolvedTheme === value
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={cn(
              'flex w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-300',
              'hover:text-foreground',
              active && 'bg-brand-soft text-brand-ink hover:text-brand-ink dark:text-primary',
            )}
          >
            <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
