import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'

import { isLocale, type Locale, localePath } from './config'
import { DICTIONARIES } from './messages'

/** Idioma da rota atual (segmento [lang] da raiz), em qualquer Server Component. */
export async function getLocale(): Promise<Locale> {
  const value = await lang()
  if (!isLocale(value)) notFound()
  return value
}

/** Idioma, textos e um gerador de links que mantém o idioma: `href('/projects')`. */
export async function getI18n() {
  const locale = await getLocale()
  return {
    locale,
    t: DICTIONARIES[locale],
    href: (path: string) => localePath(locale, path),
  }
}
