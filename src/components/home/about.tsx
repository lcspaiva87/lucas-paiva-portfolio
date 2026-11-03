import { ImageIcon } from 'lucide-react'
import Image from 'next/image'

import { Glyph } from '@/components/glyph'
import { Highlight } from '@/components/ui/highlight'
import { SectionLabel } from '@/components/ui/section-label'
import { media } from '@/lib/cms'
import { plainText } from '@/lib/format'
import type { Profile } from '@/payload-types'

export function About({ profile }: { profile: Profile }) {
  const photo = media(profile.photo)

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="container-page flex scroll-mt-8 flex-wrap items-center gap-x-14 gap-y-10 pt-20 lg:pt-24"
    >
      <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
        <SectionLabel>Sobre mim</SectionLabel>
        <h2
          id="sobre-titulo"
          aria-label={plainText(profile.aboutHeading)}
          className="m-0 text-[clamp(2.375rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
        >
          <Highlight text={profile.aboutHeading} />
        </h2>
      </div>

      <div className="flex min-w-0 flex-[1.3_1_380px] flex-col gap-7">
        <p className="m-0 text-base leading-[1.65] text-foreground-soft sm:text-[17px]">
          {profile.aboutBody}
        </p>
        {profile.facts && profile.facts.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-5 p-0">
            {profile.facts.map((fact) => (
              <li key={fact.id} className="flex items-center gap-3 text-sm leading-[1.4]">
                <Glyph
                  icon={fact.icon}
                  className="size-[22px] shrink-0 text-primary"
                  strokeWidth={2}
                />
                <span>
                  {fact.text}
                  {fact.detail && (
                    <>
                      <br />
                      <span className="text-muted-foreground">{fact.detail}</span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative flex aspect-[16/7] min-w-0 flex-[1.2_1_360px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-card">
        {photo ? (
          <Image
            src={photo.url!}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: `${photo.focalX ?? 50}% ${photo.focalY ?? 50}%` }}
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_60%)]"
            />
            <span className="relative flex items-center gap-2.5 font-mono text-xs text-placeholder">
              <ImageIcon className="size-[18px]" aria-hidden="true" />
              Adicione sua foto em Perfil › Sobre
            </span>
          </>
        )}
      </div>
    </section>
  )
}
