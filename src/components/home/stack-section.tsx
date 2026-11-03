import { Boxes, CodeXml, Database, Layers, type LucideIcon, Smartphone } from 'lucide-react'

import { Tech } from '@/components/tech'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { SplitHeading } from '@/components/motion/split-heading'
import { SectionLabel } from '@/components/ui/section-label'
import { TechIcon } from '@/components/ui/tech-chip'
import { cn } from '@/lib/utils'
import type { Technology } from '@/payload-types'

type Group = Exclude<Technology['group'], 'other'>

const GROUPS: Record<Group, { title: string; description: string; Icon: LucideIcon }> = {
  frontend: {
    title: 'Front-end',
    description:
      'Criação de interfaces modernas, performáticas e focadas na melhor experiência do usuário.',
    Icon: Boxes,
  },
  backend: {
    title: 'Back-end',
    description: 'APIs, integrações e regras de negócio robustas.',
    Icon: CodeXml,
  },
  mobile: {
    title: 'Mobile',
    description: 'Apps nativos com alta performance e boa UX.',
    Icon: Smartphone,
  },
  data: {
    title: 'Dados',
    description: 'Modelagem, persistência e análise de dados.',
    Icon: Database,
  },
  tools: {
    title: 'Ferramentas',
    description: 'Produtividade, build, versionamento e distribuição.',
    Icon: Layers,
  },
}

const ORDER: Group[] = ['frontend', 'backend', 'mobile', 'data', 'tools']

// Cards da Stack sobem 6px e ganham borda laranja no hover.
const CARD_HOVER =
  'transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-primary'

const LEAD_MAIN = 'M0 110 C 140 70, 260 60, 380 86 S 600 52, 700 96'

const LEAD_ECHOES = [
  { d: 'M0 116 C 140 80, 260 72, 380 96 S 600 64, 700 104', opacity: 0.45 },
  { d: 'M0 122 C 140 90, 260 84, 380 106 S 600 76, 700 112', opacity: 0.28 },
  { d: 'M0 128 C 140 100, 260 96, 380 116 S 600 88, 700 120', opacity: 0.16 },
]

/**
 * Linhas de onda no canto do card em destaque, no mesmo movimento do rodapé:
 * ondulam em sequência e um ponto de luz percorre a linha principal.
 */
function LeadWave() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 h-[90px] w-[55%] overflow-visible text-primary"
    >
      <defs>
        <filter id="stack-wave-glow" x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path
        d={LEAD_MAIN}
        fill="none"
        className="stroke-[color-mix(in_oklab,var(--primary)_80%,white)] motion-safe:animate-wave-ripple"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <g className="hidden motion-safe:inline">
        <path
          d={LEAD_MAIN}
          pathLength={1000}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="110 890"
          filter="url(#stack-wave-glow)"
          className="animate-wave-ripple"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1000"
            to="0"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d={LEAD_MAIN}
          pathLength={1000}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="70 930"
          className="animate-wave-ripple stroke-white light:stroke-[color-mix(in_oklab,var(--primary)_60%,white)]"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1010"
            to="10"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      {LEAD_ECHOES.map(({ d, opacity }, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={opacity}
          vectorEffect="non-scaling-stroke"
          className="motion-safe:animate-wave-ripple"
          style={{ animationDelay: `${-(i + 1) * 0.35}s` }}
        />
      ))}
    </svg>
  )
}

export function StackSection({
  heading,
  intro,
  technologies,
}: {
  heading: string
  intro?: string | null
  technologies: Technology[]
}) {
  const byGroup = (group: Group) =>
    technologies.filter((t) => t.group === group && t.showInStack !== false)
  const [lead, ...others] = ORDER.filter((g) => byGroup(g).length > 0)
  if (!lead) return null

  return (
    <section
      id="stack"
      aria-labelledby="stack-titulo"
      className="container-page flex scroll-mt-8 flex-col gap-9 pt-28 lg:pt-32"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
        <div className="flex flex-col gap-3.5">
          <SectionLabel>Stack</SectionLabel>
          <SplitHeading
            id="stack-titulo"
            text={heading}
            className="m-0 text-[clamp(2.375rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
          />
        </div>
        {intro && (
          <p className="m-0 max-w-[440px] text-base leading-[1.55] text-foreground-soft">{intro}</p>
        )}
      </div>

      <Reveal
        as="article"
        className={cn(
          'relative flex flex-wrap items-center gap-x-12 gap-y-8 overflow-hidden rounded-[18px] border border-primary p-[clamp(28px,3.5vw,44px)]',
          'bg-[color-mix(in_oklab,var(--primary)_3%,var(--background))]',
          'shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent),0_0_56px_-10px_color-mix(in_oklab,var(--primary)_50%,transparent),inset_0_0_80px_-40px_color-mix(in_oklab,var(--primary)_40%,transparent)]',
          CARD_HOVER,
        )}
      >
        <LeadWave />
        <div className="relative flex min-w-0 flex-[1_1_340px] flex-col gap-3.5 pb-6">
          <span className="font-mono text-[13px] text-foreground-soft">01 — Especialidade</span>
          <h3 className="m-0 text-[clamp(3.25rem,6vw,5.25rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            {GROUPS[lead].title}
          </h3>
          <p className="m-0 max-w-[400px] text-base leading-[1.55] text-foreground-soft">
            {GROUPS[lead].description}
          </p>
        </div>
        <div aria-hidden="true" className="hidden w-px self-stretch bg-border xl:block" />
        <RevealGroup
          as="ul"
          delay={0.2}
          className="relative m-0 grid min-w-0 flex-[1.4_1_460px] list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 p-0"
        >
          {byGroup(lead).map((tech) => (
            <RevealItem as="li" key={tech.id}>
              <Tech tech={tech} className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>

      <RevealGroup className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        {others.map((group, i) => {
          const { title, description, Icon } = GROUPS[group]
          return (
            <RevealItem
              as="article"
              key={group}
              className={cn(
                'flex flex-col gap-3 rounded-[18px] border border-border bg-card p-7',
                CARD_HOVER,
              )}
            >
              <Icon aria-hidden="true" className="size-9 text-primary" strokeWidth={2} />
              <span className="font-mono text-[13px] text-foreground-soft">
                {String(i + 2).padStart(2, '0')} — {title}
              </span>
              <h3 className="m-0 text-[30px] leading-none font-extrabold tracking-[-0.04em]">
                {title}
              </h3>
              <p className="m-0 mb-2 text-[15px] leading-normal text-foreground-soft">
                {description}
              </p>
              <ul className="m-0 list-none p-0">
                {byGroup(group).map((tech) => (
                  <li
                    key={tech.id}
                    className="flex items-center gap-3.5 border-t border-border py-[11px] text-base font-semibold transition-[translate,color] duration-350 ease-out-expo hover:translate-x-1.5 hover:text-brand-ink"
                  >
                    <TechIcon
                      abbr={tech.abbr}
                      appearance={tech.appearance}
                      color={tech.color ?? undefined}
                      onColor={tech.onColor ?? undefined}
                    />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
