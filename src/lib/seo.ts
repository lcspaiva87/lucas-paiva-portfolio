import { DEFAULT_LOCALE, HTML_LANG, type Locale, LOCALES, localePath } from '@/i18n/config'

/** Canônico da página no idioma atual e as versões nos outros idiomas (hreflang). */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], localePath(l, path)])),
      'x-default': localePath(DEFAULT_LOCALE, path),
    },
  }
}
