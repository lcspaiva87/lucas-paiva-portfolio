'use client'

import { m, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type MouseEvent, Suspense, useEffect, useState } from 'react'

import { SPRING } from '@/components/motion/tokens'

import { useI18n } from '@/i18n/client'
import {
  HTML_LANG,
  LANGUAGE_NAME,
  LOCALE_COOKIE,
  LOCALES,
  type Locale,
  localePath,
  stripLocale,
} from '@/i18n/config'
import { cn } from '@/lib/utils'

const ONE_YEAR = 60 * 60 * 24 * 365
/** Largura de cada link (w-10) — a pílula anda esse tanto por opção. */
const STEP = 40
/** Tempo para a pílula chegar antes de recarregar a página no outro idioma. */
const SLIDE_MS = 220

/** A escolha vale para as próximas visitas: o proxy lê o cookie antes do idioma do navegador. */
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`
}

function Switcher({ path, className }: { path: string; className?: string }) {
  const { locale, t } = useI18n()
  const reduced = useReducedMotion() ?? false
  // Idioma escolhido: a pílula já vai para ele enquanto a página do outro idioma carrega.
  const [chosen, setChosen] = useState<Locale>(locale)

  // Voltar pelo navegador restaura a página do cache com a pílula no outro idioma: devolve.
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => event.persisted && setChosen(locale)
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [locale])

  function choose(option: Locale, event: MouseEvent<HTMLAnchorElement>) {
    remember(option)
    if (option === locale || reduced) return
    // Clique comum: segura a navegação o suficiente para a pílula deslizar.
    // Ctrl/Cmd/Shift (nova aba) seguem o comportamento normal do link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    setChosen(option)
    const href = event.currentTarget.href
    window.setTimeout(() => window.location.assign(href), SLIDE_MS)
  }

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn(
        'relative flex h-11 rounded-full border border-border bg-card p-[3px] light:border-border-strong',
        className,
      )}
    >
      <m.span
        aria-hidden="true"
        className="absolute inset-y-[3px] left-[3px] w-10 rounded-full bg-brand-soft"
        initial={false}
        animate={{ x: LOCALES.indexOf(chosen) * STEP }}
        transition={{ type: 'spring', ...SPRING }}
      />
      {LOCALES.map((option) => {
        const active = option === chosen
        return (
          // <a> e não <Link>: a troca recarrega a página com o cookie novo já valendo.
          <a
            key={option}
            href={localePath(option, path)}
            hrefLang={HTML_LANG[option]}
            lang={HTML_LANG[option]}
            aria-label={LANGUAGE_NAME[option]}
            aria-current={option === locale ? 'true' : undefined}
            onClick={(event) => choose(option, event)}
            className={cn(
              'relative flex w-10 items-center justify-center rounded-full font-mono text-xs font-medium text-muted-foreground no-underline transition-colors duration-300',
              'hover:text-foreground',
              active && 'text-brand-ink hover:text-brand-ink dark:text-primary',
            )}
          >
            {option.toUpperCase()}
          </a>
        )
      })}
    </div>
  )
}

function CurrentSwitcher({ className }: { className?: string }) {
  return <Switcher path={stripLocale(usePathname())} className={className} />
}

/** PT / EN. Leva para a mesma página no outro idioma. */
export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <Suspense fallback={<Switcher path="/" className={className} />}>
      <CurrentSwitcher className={className} />
    </Suspense>
  )
}
