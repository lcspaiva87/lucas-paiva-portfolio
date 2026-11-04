import type { Dictionary } from '@/i18n/messages'

/** Caminhos em português; `href()` adiciona o prefixo do idioma. O texto vem de `t.nav`. */
export const NAV_LINKS: { href: string; key: keyof Dictionary['nav'] }[] = [
  { href: '/#topo', key: 'home' },
  { href: '/#sobre', key: 'about' },
  { href: '/#projetos', key: 'projects' },
  { href: '/projetos', key: 'caseStudies' },
  { href: '/#experiencia', key: 'experience' },
  { href: '/#stack', key: 'stack' },
]

/** Link de navegação com sublinhado laranja que cresce no hover (topo e rodapé). */
export const NAV_LINK_CLASS =
  'group/nav relative inline-flex min-h-11 items-center px-3.5 text-[15px] font-medium text-foreground-soft no-underline transition-colors duration-250 hover:text-foreground'

export const NAV_UNDERLINE_CLASS =
  'absolute inset-x-3.5 bottom-1.5 h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-350 ease-out-expo group-hover/nav:scale-x-100'
