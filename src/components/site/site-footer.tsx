import Link from 'next/link'

import { LogoMark } from '@/components/brand/logo'
import { getI18n } from '@/i18n/server'
import { getProfile } from '@/lib/cms'

import { CurrentYear } from './current-year'
import { FooterWave } from './footer-wave'
import { NAV_LINK_CLASS, NAV_LINKS, NAV_UNDERLINE_CLASS } from './nav-links'
import { PLATFORM_LABEL, SocialIcon } from './social-icon'

export async function SiteFooter() {
  const { locale, t, href: localized } = await getI18n()
  const profile = await getProfile(locale)

  return (
    <>
      <FooterWave />
      <footer id="rodape" className="container-page flex flex-col gap-7 pt-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link
            href={localized('/#top')}
            className="flex items-center gap-4 text-foreground no-underline"
          >
            <LogoMark size={48} />
            <span aria-hidden="true" className="h-10 w-px bg-border-strong" />
            <span className="flex flex-col gap-0.5">
              <span className="text-[19px] font-extrabold tracking-[-0.03em]">{profile.name}</span>
              <span className="text-sm text-foreground-soft">{profile.headline}</span>
            </span>
          </Link>

          {profile.socials && profile.socials.length > 0 && (
            <ul className="m-0 flex list-none gap-2.5 p-0">
              {profile.socials.map(({ id, platform, url }) => (
                <li key={id ?? url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={PLATFORM_LABEL[platform]}
                    className="flex size-11 items-center justify-center rounded-[10px] border border-border bg-card text-foreground transition-[color,translate] duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <SocialIcon platform={platform} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <nav aria-label={t.footer.navLabel}>
            <ul className="m-0 flex list-none flex-wrap gap-1 p-0 max-sm:-ml-3.5">
              {NAV_LINKS.slice(0, 4).map(({ href, key }) => (
                <li key={href}>
                  <Link href={localized(href)} className={NAV_LINK_CLASS}>
                    {t.nav[key]}
                    <span aria-hidden="true" className={NAV_UNDERLINE_CLASS} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-px bg-border" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-foreground-soft">
            © <CurrentYear /> {profile.name}
            <span aria-hidden="true" className="mx-2">
              •
            </span>
            {t.footer.rights}
          </span>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground no-underline hover:text-primary light:hover:text-brand-ink"
          >
            {t.footer.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </>
  )
}
