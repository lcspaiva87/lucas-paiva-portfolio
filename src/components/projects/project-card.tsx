import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Glyph } from '@/components/glyph'
import { TiltCard } from '@/components/motion/tilt-card'
import { Badge } from '@/components/ui/badge'
import { TechIcon } from '@/components/ui/tech-chip'
import { getI18n } from '@/i18n/server'
import { hasCaseStudy, media, populated } from '@/lib/cms'
import { cn } from '@/lib/utils'
import type { Project, Technology } from '@/payload-types'

/** Celular desenhado, usado quando o projeto ainda não tem imagem de card. */
function PhoneIllustration({ glyph }: { glyph?: string | null }) {
  return (
    <div className="flex h-full flex-col gap-2.5 px-3 py-[22px]">
      <div className="flex h-[130px] items-center justify-center rounded-2xl bg-brand-soft">
        <Glyph icon={glyph} className="size-[46px] text-brand-ink" strokeWidth={1.6} />
      </div>
      <div className="h-2 w-3/5 rounded bg-foreground" />
      <div className="h-1.5 w-4/5 rounded bg-border-strong" />
      <div className="mt-1.5 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[34px] flex-1 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  )
}

export async function ProjectCard({
  project,
  headingLevel = 'h3',
}: {
  project: Project
  headingLevel?: 'h2' | 'h3'
}) {
  const { href, t } = await getI18n()
  const Heading = headingLevel
  const cover = media(project.cover)
  const logo = media(project.logo)
  const techs = populated<Technology>(project.technologies)
  const linked = hasCaseStudy(project)
  // Sem case study, o card abre o produto: o site, ou a página na loja se não houver site.
  const external = linked
    ? null
    : (project.links?.find((link) => link.kind === 'website') ??
      project.links?.find((link) => link.kind === 'play-store' || link.kind === 'app-store') ??
      null)

  const body = (
    <>
      <div className="relative z-[1] flex min-w-0 flex-[1_1_55%] flex-col gap-3.5 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          {logo ? (
            <span
              aria-hidden="true"
              className="relative size-11 overflow-hidden rounded-xl border border-border"
            >
              <Image src={logo.url!} alt="" fill sizes="44px" className="object-cover" />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-xl bg-(--accent) text-white"
            >
              <Glyph icon={project.glyph} className="size-[22px]" strokeWidth={2.2} />
            </span>
          )}
          {/* Só o que não está em produção ganha etiqueta; "em produção" é o padrão. */}
          {project.stage !== 'production' && (
            <Badge variant={project.stage === 'development' ? 'placeholder' : 'neutral'}>
              {t.stage[project.stage]}
            </Badge>
          )}
        </div>
        <Heading className="m-0 text-[26px] font-extrabold tracking-[-0.03em]">
          {linked ? (
            <Link
              href={href(`/projects/${project.slug}`)}
              className="text-foreground no-underline after:absolute after:inset-0 after:z-[2]"
            >
              {project.title}
            </Link>
          ) : external ? (
            <a
              href={external.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-foreground no-underline after:absolute after:inset-0 after:z-[2]"
            >
              {project.title}
              <ArrowUpRight
                className="mt-1 size-5 text-muted-foreground transition-colors group-hover/card:text-primary"
                aria-hidden="true"
              />
              <span className="sr-only">({external.label || t.link[external.kind]})</span>
            </a>
          ) : (
            project.title
          )}
        </Heading>
        <p className="m-0 text-sm leading-[1.6] text-foreground-soft">{project.tagline}</p>
        {techs.length > 0 && (
          // Só os ícones: o nome fica no title (dica ao passar o mouse) e para leitores de tela.
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {techs.map((tech) => (
              <li key={tech.id} title={tech.name}>
                <TechIcon
                  glyph={tech.icon}
                  abbr={tech.abbr || tech.name.slice(0, 2)}
                  appearance={tech.appearance}
                  color={tech.color ?? undefined}
                  onColor={tech.onColor ?? undefined}
                  className="size-8"
                />
                <span className="sr-only">{tech.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div aria-hidden="true" className="relative min-w-[150px] flex-[1_1_45%]">
        <div className="absolute top-6 left-1.5 h-[340px] w-[168px] overflow-hidden rounded-[30px] border-[3px] border-border-strong bg-background transition-transform duration-800 ease-out-expo group-hover/card:-translate-y-3.5 group-hover/card:-rotate-2">
          {cover ? (
            <Image src={cover.url!} alt="" fill sizes="168px" className="object-cover" />
          ) : (
            <PhoneIllustration glyph={project.glyph} />
          )}
        </div>
      </div>
    </>
  )

  return (
    <TiltCard
      className={cn(
        'group/card relative flex min-h-[340px] overflow-hidden rounded-[18px] border border-border bg-card',
        'transition-[translate,border-color,box-shadow] duration-600 ease-out-expo',
        'hover:-translate-y-2 hover:border-primary hover:shadow-[0_40px_80px_-32px_color-mix(in_oklab,var(--primary)_35%,transparent)] focus-within:border-primary',
      )}
      style={{ '--accent': project.accentColor || 'var(--primary)' } as CSSProperties}
    >
      {body}
    </TiltCard>
  )
}
