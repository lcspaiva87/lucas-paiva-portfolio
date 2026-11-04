'use client'

import { createContext, type ReactNode, use } from 'react'

import { type Locale, localePath } from './config'
import { DICTIONARIES } from './messages'

const LocaleContext = createContext<Locale>('pt')

/** Disponibiliza o idioma da rota para os Client Components. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>
}

/** Mesma forma de `getI18n()`, para Client Components. */
export function useI18n() {
  const locale = use(LocaleContext)
  return {
    locale,
    t: DICTIONARIES[locale],
    href: (path: string) => localePath(locale, path),
  }
}
