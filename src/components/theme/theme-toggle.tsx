'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { useI18n } from '@/i18n/client'
import { cn } from '@/lib/utils'

const options = [
  { value: 'light', Icon: Sun },
  { value: 'dark', Icon: Moon },
] as const

const subscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n()
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
      aria-label={t.theme.label}
      className={cn(
        'flex h-11 rounded-full border border-border bg-card p-[3px] light:border-border-strong',
        className,
      )}
    >
      {options.map(({ value, Icon }) => {
        const active = mounted && resolvedTheme === value
        return (
          <button
            key={value}
            type="button"
            aria-label={t.theme[value]}
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
