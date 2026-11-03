export const NAV_LINKS = [
  { href: '/#topo', label: 'Início' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/projetos', label: 'Case Studies' },
  { href: '/#experiencia', label: 'Experiência' },
  { href: '/#stack', label: 'Stack' },
] as const

/** Link de navegação com sublinhado laranja que cresce no hover (topo e rodapé). */
export const NAV_LINK_CLASS =
  'group/nav relative inline-flex min-h-11 items-center px-3.5 text-[15px] font-medium text-foreground-soft no-underline transition-colors duration-250 hover:text-foreground'

export const NAV_UNDERLINE_CLASS =
  'absolute inset-x-3.5 bottom-1.5 h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-350 ease-out-expo group-hover/nav:scale-x-100'
