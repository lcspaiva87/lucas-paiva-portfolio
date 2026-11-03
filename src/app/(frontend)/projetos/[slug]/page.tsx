import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CaseStudyBlocks } from '@/components/case-study/blocks'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/section-label'
import { getProjectBySlug, getProjects, hasCaseStudy, media, populated } from '@/lib/cms'
import { formatPeriod } from '@/lib/format'
import { CATEGORY_LABEL, LINK_LABEL, STAGE_LABEL } from '@/lib/labels'
import { cn } from '@/lib/utils'
import type { Media, Technology } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

// Slugs publicados depois do build renderizam sob demanda (os dados vêm do cache).
// Bloquear aqui, em vez de usar streaming, mantém o status 404 para slugs inexistentes.
export const instant = false

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.filter(hasCaseStudy).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  // Imagem cadastrada no SEO do projeto; sem ela, vale a gerada em opengraph-image.tsx.
  const image = media(project.seo?.image)
  const title = project.seo?.title || `${project.title} — case study`
  const description = project.seo?.description || project.tagline
  const url = `/projetos/${project.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
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

function PhoneFrame({ image, highlight }: { image?: Media | null; highlight?: boolean }) {
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
        <Image src={image.url!} alt={image.alt} fill sizes="280px" className="object-cover" />
      ) : (
        highlight && (
          <span className="absolute inset-x-6 top-1/3 text-center font-mono text-xs text-placeholder">
            Adicione as telas em Case study › Telas do topo
          </span>
        )
      )}
    </div>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getProjects()])
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
    { label: 'Papel', value: project.role },
    { label: 'Plataforma', value: project.platform },
    { label: 'Stack', value: techs.map((t) => t.name).join(' · ') },
    {
      label: 'Período',
      value: project.periodStart ? formatPeriod(project.periodStart, project.periodEnd) : null,
    },
  ].filter((f) => f.value)

  // Três telas: a do meio em destaque. Faltando imagens, as molduras ficam vazias.
  const phones = [heroImages[1] ?? null, heroImages[0] ?? null, heroImages[2] ?? null]

  return (
    <article>
      <div className="container-page pt-6">
        <Link
          href="/projetos"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground no-underline hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Todos os projetos
        </Link>
      </div>

      <header className="container-page flex flex-col gap-10 pt-16 lg:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>
            Case study {String(index + 1).padStart(2, '0')} · {CATEGORY_LABEL[project.category]}
          </Eyebrow>
          <Badge variant="brand">{STAGE_LABEL[project.stage]}</Badge>
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
                  {link.label || LINK_LABEL[link.kind]}
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
        <div className="relative flex h-[440px] items-end justify-center gap-8 overflow-hidden rounded-panel border border-border bg-card sm:h-[640px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
          />
          <PhoneFrame image={phones[1]} />
          <PhoneFrame image={phones[0]} highlight />
          <PhoneFrame image={phones[2]} />
        </div>
      </div>

      <CaseStudyBlocks blocks={project.layout ?? []} />

      {next && next.id !== project.id && (
        <div className="container-page pt-28 lg:pt-40">
          <Link
            href={hasCaseStudy(next) ? `/projetos/${next.slug}` : '/projetos'}
            className="group/next flex flex-wrap items-end justify-between gap-6 border-t border-border py-12 text-foreground no-underline"
          >
            <span className="flex flex-col gap-3">
              <span className="font-mono text-[13px] text-muted-foreground">Próximo projeto</span>
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
