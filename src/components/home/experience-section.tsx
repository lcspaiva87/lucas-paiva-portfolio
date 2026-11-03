import { GrowLine } from '@/components/motion/grow-line'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { SplitHeading } from '@/components/motion/split-heading'
import { SectionLabel } from '@/components/ui/section-label'
import { TechChip } from '@/components/ui/tech-chip'
import { populated } from '@/lib/cms'
import { formatMonth, formatPeriod, yearOf } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Experience, Technology } from '@/payload-types'

import { Tenure } from './tenure'

// Coluna da linha do tempo: o mesmo valor posiciona a linha e os pontos.
const RAIL = 'clamp(14px, 2.4vw, 36px)'
const INDENT = 'clamp(40px, 6vw, 96px)'

function periodOf(exp: Experience) {
  if (exp.kind === 'education') {
    const end = formatMonth(exp.endDate)
    return end ? `Formação · conclusão ${end}` : 'Formação'
  }
  return formatPeriod(exp.startDate, exp.endDate)
}

function BulletCard({
  title,
  items,
}: {
  title: string
  items: { id?: string | null; text: string }[]
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-border bg-card p-5">
      <span className="text-[13px] font-bold">{title}</span>
      <ul className="m-0 flex flex-col gap-1.5 pl-[18px] text-sm leading-[1.55] text-foreground-soft">
        {items.map((item) => (
          <li key={item.id ?? item.text}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

function TimelineItem({ exp, current }: { exp: Experience; current: boolean }) {
  const techs = populated<Technology>(exp.technologies)
  const year = yearOf(exp.startDate) ?? yearOf(exp.endDate)
  const responsibilities = exp.responsibilities ?? []
  const results = exp.results ?? []

  return (
    <RevealItem
      as="li"
      from="left"
      className="group/item relative isolate flex flex-wrap gap-x-12 gap-y-6 border-t border-border py-10"
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-11 size-[18px] rounded-full',
          current
            ? 'bg-primary shadow-[0_0_0_5px_var(--brand-soft)]'
            : 'border-2 border-border-strong bg-background',
        )}
        style={{ left: `calc(${RAIL} - ${INDENT} - 8px)` }}
      >
        {current && (
          <span className="absolute -inset-1.5 rounded-full border-2 border-primary motion-safe:animate-ring" />
        )}
      </span>
      {year && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-0 -z-10 text-[clamp(80px,11vw,168px)] leading-none font-extrabold tracking-[-0.06em] text-transparent transition-[-webkit-text-stroke-color] duration-400 [-webkit-text-stroke:1.5px_var(--border)] group-hover/item:[-webkit-text-stroke-color:var(--primary)]"
        >
          {year}
        </span>
      )}

      <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-2.5">
        <span className="font-mono text-[13px] text-brand-ink">
          {periodOf(exp)}{' '}
          {exp.kind === 'work' && !exp.endDate && exp.startDate && <Tenure since={exp.startDate} />}
        </span>
        <h3 className="m-0 text-card-title">{exp.organization || exp.title}</h3>
        {exp.organization && <span className="text-[15px] text-muted-foreground">{exp.title}</span>}
      </div>

      <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-6">
        {exp.summary && (
          <p className="m-0 text-base leading-[1.65] text-foreground-soft sm:text-[17px]">
            {exp.summary}
          </p>
        )}
        {(responsibilities.length > 0 || results.length > 0) && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {responsibilities.length > 0 && (
              <BulletCard title="Responsabilidades" items={responsibilities} />
            )}
            {results.length > 0 && <BulletCard title="Resultados" items={results} />}
          </div>
        )}
        {techs.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {techs.map((tech) => (
              <li key={tech.id}>
                <TechChip variant="tag" name={tech.name} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </RevealItem>
  )
}

export function ExperienceSection({
  heading,
  experiences,
}: {
  heading: string
  experiences: Experience[]
}) {
  if (experiences.length === 0) return null
  return (
    <section
      id="experiencia"
      aria-labelledby="exp-titulo"
      className="container-page relative isolate flex scroll-mt-8 flex-col gap-[72px] pt-28 lg:pt-32"
    >
      <div className="flex flex-col gap-3.5">
        <SectionLabel>Experiência</SectionLabel>
        <SplitHeading
          id="exp-titulo"
          text={heading}
          by="chars"
          className="m-0 text-[clamp(2.375rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
        />
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-border"
          style={{ left: RAIL }}
        />
        <GrowLine style={{ left: RAIL }} />
        {/* Pulso de luz descendo pela linha */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1 rounded bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_180px,var(--foreground)_240px,transparent_300px,transparent_320px)] opacity-60 motion-safe:animate-flow motion-reduce:hidden"
          style={{ left: `calc(${RAIL} - 1px)` }}
        />
        <span
          aria-hidden="true"
          className="absolute -top-[34px] rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-brand-ink uppercase"
          style={{ left: `calc(${RAIL} - 22px)` }}
        >
          Hoje
        </span>
        <RevealGroup
          as="ol"
          stagger={0.25}
          className="m-0 flex list-none flex-col p-0"
          style={{ paddingLeft: INDENT }}
        >
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} current={i === 0 && !exp.endDate} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
