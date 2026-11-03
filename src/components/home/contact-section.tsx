import { ArrowUpRight, Mail } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Highlight } from '@/components/ui/highlight'
import { SectionLabel } from '@/components/ui/section-label'
import { plainText } from '@/lib/format'
import type { Profile } from '@/payload-types'

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="container-page scroll-mt-8 pt-28 lg:pt-32"
    >
      <div className="relative flex flex-wrap items-end justify-between gap-8 overflow-hidden rounded-[18px] border border-brand-soft bg-card p-6 sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 -right-1/4 size-[640px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]"
        />
        <div className="relative flex max-w-2xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <SectionLabel>Contato</SectionLabel>
            {profile.available && (
              <Badge variant="success">{profile.availabilityText || 'Disponível'}</Badge>
            )}
          </div>
          <h2
            id="contato-titulo"
            aria-label={plainText(profile.contactHeading)}
            className="m-0 text-[clamp(2rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
          >
            <Highlight text={profile.contactHeading} />
          </h2>
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="self-start text-lg font-bold text-foreground no-underline hover:text-primary"
            >
              {profile.email}
            </a>
          )}
        </div>
        {profile.email && (
          <Button asChild className="relative w-full sm:w-auto">
            <a href={`mailto:${profile.email}`}>
              <Mail />
              Enviar mensagem
              <ButtonArrow>
                <ArrowUpRight strokeWidth={2.4} />
              </ButtonArrow>
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
