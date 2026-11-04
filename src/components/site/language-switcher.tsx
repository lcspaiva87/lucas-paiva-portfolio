'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

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

/** A escolha vale para as próximas visitas: o proxy lê o cookie antes do idioma do navegador. */
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`
}

function Switcher({ path, className }: { path: string; className?: string }) {
  const { locale, t } = useI18n()
  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn(
        'flex h-11 rounded-full border border-border bg-card p-[3px] light:border-border-strong',
        className,
      )}
    >
      {LOCALES.map((option) => {
        const active = option === locale
        return (
          // <a> e não <Link>: a troca recarrega a página com o cookie novo já valendo.
          <a
            key={option}
            href={localePath(option, path)}
            hrefLang={HTML_LANG[option]}
            lang={HTML_LANG[option]}
            aria-label={LANGUAGE_NAME[option]}
            aria-current={active ? 'true' : undefined}
            onClick={() => remember(option)}
            className={cn(
              'flex w-10 items-center justify-center rounded-full font-mono text-xs font-medium text-muted-foreground no-underline transition-colors duration-300',
              'hover:text-foreground',
              active && 'bg-brand-soft text-brand-ink hover:text-brand-ink dark:text-primary',
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
