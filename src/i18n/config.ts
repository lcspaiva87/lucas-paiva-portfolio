/** Idiomas do site. O português é o padrão e fica sem prefixo na URL; o inglês vive em /en. */
export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

/** Guarda a escolha feita no seletor de idioma; sem ele, vale o idioma do navegador. */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)

/** Atributo lang do <html>, hreflang e formatação de datas. */
export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }

export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/** "/projects" → "/en/projects", "/#about" → "/en#about". O português não muda. */
export function localePath(locale: Locale, path = '/') {
  if (locale === DEFAULT_LOCALE) return path
  if (path === '/') return `/${locale}`
  return path.startsWith('/#') ? `/${locale}${path.slice(1)}` : `/${locale}${path}`
}

/** "/en/projects" → "/projects". */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split('/')
  return isLocale(first) ? `/${rest.join('/')}` : pathname
}

/** Nome de cada idioma na própria língua, para o seletor. */
export const LANGUAGE_NAME: Record<Locale, string> = { pt: 'Português', en: 'English' }
