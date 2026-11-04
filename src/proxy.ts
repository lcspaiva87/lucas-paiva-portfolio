import { type NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LOCALE, isLocale, type Locale, LOCALE_COOKIE } from '@/i18n/config'

/** Primeiro idioma suportado na lista do navegador ("en-US,en;q=0.9,pt;q=0.8" → en). */
function browserLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE
  const match = header
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q.slice(2)) : 1 }
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .find((entry) => isLocale(entry.lang))
  return (match?.lang as Locale | undefined) ?? DEFAULT_LOCALE
}

/**
 * O português responde sem prefixo (reescrito para /pt por dentro) e o inglês em /en.
 * Na primeira visita, quem tem o navegador em inglês vai para /en; depois de usar o
 * seletor, vale o cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1]

  // As imagens de compartilhamento são geradas com o caminho interno (/pt/.../opengraph-image).
  if (isLocale(first) && pathname.includes('/opengraph-image')) return NextResponse.next()

  if (first === DEFAULT_LOCALE) {
    // /pt/... é o endereço interno; o público é sem prefixo.
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }
  if (isLocale(first)) return NextResponse.next()

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(chosen) ? chosen : browserLocale(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  url.search = search
  return locale === DEFAULT_LOCALE ? NextResponse.rewrite(url) : NextResponse.redirect(url)
}

export const config = {
  // Painel, API, arquivos estáticos e ícones ficam de fora.
  matcher: ['/((?!admin|api|_next|_vercel|icon|apple-icon|.*\\..*).*)'],
}
