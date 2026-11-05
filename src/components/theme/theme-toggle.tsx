'use client'

import { m, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { type MouseEvent, useSyncExternalStore } from 'react'

import { SPRING } from '@/components/motion/tokens'
import { useI18n } from '@/i18n/client'
import { cn } from '@/lib/utils'

const options = [
  { value: 'light', Icon: Sun, spin: 90 },
  { value: 'dark', Icon: Moon, spin: -30 },
] as const

type ThemeValue = (typeof options)[number]['value']

/** Largura de cada botão (w-9) — a pílula anda esse tanto por opção. */
const STEP = 36

const subscribe = () => () => {}

/**
 * Troca o tema com um círculo que se abre a partir do botão clicado (View Transitions).
 * Sem suporte, ou com "reduzir movimento", troca na hora.
 */
function switchTheme(value: ThemeValue, apply: () => void, origin: HTMLElement, reduced: boolean) {
  const root = document.documentElement
  if (reduced || typeof document.startViewTransition !== 'function') {
    apply()
    return
  }
  const { left, top, width, height } = origin.getBoundingClientRect()
  const x = left + width / 2
  const y = top + height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  root.style.setProperty('--theme-x', `${x}px`)
  root.style.setProperty('--theme-y', `${y}px`)
  root.style.setProperty('--theme-r', `${radius}px`)
  root.classList.add('theme-transition')

  const transition = document.startViewTransition(() => {
    // O next-themes aplica o atributo num efeito; aqui ele já precisa valer no "depois" da captura.
    root.setAttribute('data-theme', value)
    root.style.colorScheme = value
    apply()
  })
  transition.finished.finally(() => root.classList.remove('theme-transition'))
}

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n()
  const { resolvedTheme, setTheme } = useTheme()
  const reduced = useReducedMotion() ?? false
  // O tema só é conhecido no cliente; evita mismatch de hidratação.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const index = options.findIndex((option) => option.value === resolvedTheme)

  function choose(value: ThemeValue, event: MouseEvent<HTMLButtonElement>) {
    if (value === resolvedTheme) return
    switchTheme(value, () => setTheme(value), event.currentTarget, reduced)
  }

  return (
    <div
      role="group"
      aria-label={t.theme.label}
      className={cn(
        'relative flex h-11 rounded-full border border-border bg-card p-[3px] light:border-border-strong',
        className,
      )}
    >
      {mounted && index >= 0 && (
        <m.span
          aria-hidden="true"
          className="absolute inset-y-[3px] left-[3px] w-9 rounded-full bg-brand-soft"
          initial={false}
          animate={{ x: index * STEP }}
          transition={{ type: 'spring', ...SPRING }}
        />
      )}
      {options.map(({ value, Icon, spin }) => {
        const active = mounted && resolvedTheme === value
        return (
          <button
            key={value}
            type="button"
            aria-label={t.theme[value]}
            aria-pressed={active}
            onClick={(event) => choose(value, event)}
            className={cn(
              'relative flex w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-300',
              'hover:text-foreground',
              active && 'text-brand-ink hover:text-brand-ink dark:text-primary',
            )}
          >
            <m.span
              className="flex"
              initial={false}
              animate={active ? { rotate: 0, scale: 1 } : { rotate: spin, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
            </m.span>
          </button>
        )
      })}
    </div>
  )
}
