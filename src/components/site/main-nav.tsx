'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import { stripLocale } from '@/i18n/config'
import { useI18n } from '@/i18n/client'
import { cn } from '@/lib/utils'

import { NAV_LINK_CLASS, NAV_LINKS, NAV_UNDERLINE_CLASS } from './nav-links'

function NavList({ className, pathname }: { className?: string; pathname: string | null }) {
  const { t, href: localized } = useI18n()
  const path = pathname && stripLocale(pathname)
  return (
    <ul className={cn('flex flex-wrap items-center gap-0.5', className)}>
      {NAV_LINKS.map(({ href, key }) => {
        const active =
          href === '/projetos'
            ? Boolean(path?.startsWith('/projetos'))
            : href === '/#topo' && path === '/'
        return (
          <li key={href}>
            <Link
              href={localized(href)}
              aria-current={active ? 'page' : undefined}
              className={cn(NAV_LINK_CLASS, active && 'text-foreground')}
            >
              {t.nav[key]}
              <span
                aria-hidden="true"
                className={cn(NAV_UNDERLINE_CLASS, active && 'scale-x-100')}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function ActiveNavList({ className }: { className?: string }) {
  return <NavList className={className} pathname={usePathname()} />
}

/** O link ativo depende da URL; até ela ser lida, a lista aparece sem destaque. */
export function MainNav({ className }: { className?: string }) {
  return (
    <Suspense fallback={<NavList className={className} pathname={null} />}>
      <ActiveNavList className={className} />
    </Suspense>
  )
}
