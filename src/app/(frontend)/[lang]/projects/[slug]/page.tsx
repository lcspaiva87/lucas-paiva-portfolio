import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CaseStudyBlocks } from '@/components/case-study/blocks'
import { JsonLd } from '@/components/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/section-label'
import { LOCALES } from '@/i18n/config'
import { getI18n } from '@/i18n/server'
import { getProjectBySlug, getProjects, hasCaseStudy, media, populated } from '@/lib/cms'
import { formatPeriod } from '@/lib/format'
import { alternates } from '@/lib/seo'
import { projectSchema } from '@/lib/structured-data'
import { cn } from '@/lib/utils'
import type { Media, Technology } from '@/payload-types'

type Props = { params: Promise<{ lang: string; slug: string }> }

// Slugs publicados depois do build renderizam sob demanda (os dados vêm do cache).
// Bloquear aqui, em vez de usar streaming, mantém o status 404 para slugs inexistentes.
export const instant = false

export async function generateStaticParams() {
  // Os slugs são os mesmos nos dois idiomas.
  const projects = await getProjects(LOCALES[0])
  const slugs = projects.filter(hasCaseStudy).map((p) => ({ slug: p.slug }))
  // Cache Components exige ao menos um item; sem cases publicados, o reserva vira 404.
  return slugs.length > 0 ? slugs : [{ slug: 'em-breve' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { locale, t } = await getI18n()
  const project = await getProjectBySlug(slug, locale)
  if (!project) return {}
  // Imagem cadastrada no SEO do projeto; sem ela, vale a gerada em opengraph-image.tsx.
  const image = media(project.seo?.image)
  const title = project.seo?.title || `${project.title} — ${t.caseStudy.titleSuffix}`
  const description = project.seo?.description || project.tagline
  const { canonical, languages } = alternates(locale, `/projects/${project.slug}`)
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      ...(image?.url && { images: [{ url: image.url, alt: image.alt }] }),
    },
    twitter: { title, description },
  }
}

/** Primeira frase em destaque, o resto em tom secundário. */
function Summary({ text }: { text: string }) {
  const match = text.match(/^(.+?[.!?])\s+(.*)$/s)
  return (
    <p className="m-0 max-w-[760px] text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.45] text-muted-foreground">
      {match ? (
        <>
          <span className="text-foreground">{match[1]}</span> {match[2]}
        </>
      ) : (
        <span className="text-foreground">{text}</span>
      )}
    </p>
  )
}

function PhoneFrame({
  image,
  highlight,
  placeholder,
}: {
  image?: Media | null
  highlight?: boolean
  placeholder?: string
}) {
  return (
    <div
      className={cn(
        'relative -mb-15 overflow-hidden border-[1.5px] bg-background',
        highlight
          ? 'h-[400px] w-[200px] rounded-[42px] border-primary sm:h-[560px] sm:w-[280px]'
          : 'hidden h-[520px] w-[260px] translate-y-10 rounded-[40px] border-border-strong md:block',
      )}
    >
      {image ? (
        // Alinhado pelo topo: se o print for mais alto que a moldura, corta embaixo, não o cabeçalho.
        <Image
          src={image.url!}
          alt={image.alt}
          fill
          sizes="280px"
          className="object-cover object-top"
        />
      ) : (
        highlight && (
          <span className="absolute inset-x-6 top-1/3 text-center font-mono text-xs text-placeholder">
            {placeholder}
          </span>
        )
      )}
    </div>
  )
}

/** Janela de navegador para projetos web: o print de desktop com a barra de endereço. */
function BrowserFrame({
  image,
  address,
  placeholder,
}: {
  image?: Media | null
  address?: string | null
  placeholder?: string
}) {
  return (
    <div className="relative -mb-10 w-full max-w-[1040px] overflow-hidden rounded-t-[18px] border-[1.5px] border-b-0 border-border-strong bg-background shadow-[0_-24px_80px_-40px_var(--glow)]">
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-border-strong" />
          ))}
        </span>
        {address && (
          <span className="mx-auto max-w-[60%] truncate rounded-full bg-muted px-4 py-1 font-mono text-[11px] text-muted-foreground">
            {address}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full">
        {image ? (
          <Image
            src={image.url!}
            alt={image.alt}
            fill
            sizes="(min-width: 1100px) 1040px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute inset-x-6 top-1/3 text-center font-mono text-xs text-placeholder">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  )
}

function hostOf(url?: string | null) {
  try {
    return url ? new URL(url).host : null
  } catch {
    return null
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const { locale, t, href } = await getI18n()
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug, locale),
    getProjects(locale),
  ])
  if (!project || !hasCaseStudy(project)) notFound()

  const cases = projects.filter(hasCaseStudy)
  const index = cases.findIndex((p) => p.id === project.id)
  const next =
    projects.length > 1
      ? projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length]
      : null

  const techs = populated<Technology>(project.technologies)
  const heroImages = populated<Media>(project.heroImages)
  const facts = [
    { label: t.caseStudy.facts.role, value: project.role },
    { label: t.caseStudy.facts.platform, value: project.platform },
    { label: t.caseStudy.facts.stack, value: techs.map((tech) => tech.name).join(' · ') },
    {
      label: t.caseStudy.facts.period,
      value: project.periodStart
        ? formatPeriod(project.periodStart, project.periodEnd, locale)
        : null,
    },
  ].filter((f) => f.value)

  // App: três telas de celular, a do meio em destaque. Web: a 1ª imagem no navegador e a 2ª,
  // opcional, num celular sobreposto. Faltando imagens, as molduras ficam vazias.
  const isWeb = project.category !== 'mobile'
  const phones = [heroImages[1] ?? null, heroImages[0] ?? null, heroImages[2] ?? null]
  const address = hostOf(project.links?.find((link) => link.kind === 'website')?.url)

  return (
    <article>
      <JsonLd data={projectSchema(project, locale)} />
      <div className="container-page pt-6">
        <Link
          href={href('/projects')}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground no-underline hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.caseStudy.back}
        </Link>
      </div>

      <header className="container-page flex flex-col gap-10 pt-16 lg:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>
            {t.caseStudy.eyebrow} {String(index + 1).padStart(2, '0')} ·{' '}
            {t.category[project.category]}
          </Eyebrow>
          <Badge variant="brand">{t.stage[project.stage]}</Badge>
        </div>
        <h1 className="m-0 text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] font-extrabold tracking-[-0.055em]">
          {project.title}
        </h1>
        <Summary text={project.summary || project.tagline} />

        {facts.length > 0 && (
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px overflow-hidden rounded-card border border-border bg-border">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5 bg-background p-5">
                <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
                <dd className="m-0 text-[15px] font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, i) => (
              <Button key={link.id ?? link.url} asChild variant={i === 0 ? 'primary' : 'secondary'}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label || t.link[link.kind]}
                  <ButtonArrow>
                    <ArrowUpRight />
                  </ButtonArrow>
                </a>
              </Button>
            ))}
          </div>
        )}
      </header>

      <div className="container-page pt-20">
        <div
          className={cn(
            'relative flex items-end justify-center gap-8 overflow-hidden rounded-panel border border-border bg-card',
            // A janela 16:10 é mais baixa que os celulares em telas estreitas.
            isWeb ? 'h-[280px] sm:h-[480px] lg:h-[640px]' : 'h-[440px] sm:h-[640px]',
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
          />
          {isWeb ? (
            <div className="relative flex w-full justify-center px-5 pt-8 sm:px-12">
              <BrowserFrame
                image={heroImages[0]}
                address={address}
                placeholder={t.caseStudy.screensPlaceholder}
              />
              {heroImages[1] && (
                <div className="absolute right-[6%] bottom-0 hidden h-[400px] w-[190px] overflow-hidden rounded-[34px] border-[1.5px] border-primary bg-background shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)] lg:block">
                  <Image
                    src={heroImages[1].url!}
                    alt={heroImages[1].alt}
                    fill
                    sizes="190px"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <PhoneFrame image={phones[1]} />
              <PhoneFrame
                image={phones[0]}
                highlight
                placeholder={t.caseStudy.screensPlaceholder}
              />
              <PhoneFrame image={phones[2]} />
            </>
          )}
        </div>
      </div>

      <CaseStudyBlocks blocks={project.layout ?? []} />

      {next && next.id !== project.id && (
        <div className="container-page pt-28 lg:pt-40">
          <Link
            href={href(hasCaseStudy(next) ? `/projects/${next.slug}` : '/projects')}
            className="group/next flex flex-wrap items-end justify-between gap-6 border-t border-border py-12 text-foreground no-underline"
          >
            <span className="flex flex-col gap-3">
              <span className="font-mono text-[13px] text-muted-foreground">
                {t.caseStudy.next}
              </span>
              <span className="text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.05em] transition-colors group-hover/next:text-primary">
                {next.title}
              </span>
            </span>
            <ArrowRight
              className="size-14 text-primary transition-transform duration-350 ease-out-expo group-hover/next:translate-x-2"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </article>
  )
}
