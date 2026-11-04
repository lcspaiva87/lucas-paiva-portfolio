import Link from 'next/link'

import { RevealGroup } from '@/components/motion/reveal'
import { SplitHeading } from '@/components/motion/split-heading'
import { ProjectCard } from '@/components/projects/project-card'
import { SectionLabel } from '@/components/ui/section-label'
import { getI18n } from '@/i18n/server'
import type { Project } from '@/payload-types'

export async function ProjectsSection({
  heading,
  projects,
}: {
  heading: string
  projects: Project[]
}) {
  const { t, href } = await getI18n()
  return (
    <section
      id="projects"
      aria-labelledby="proj-titulo"
      className="container-page flex scroll-mt-8 flex-col gap-8 pt-24 lg:pt-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3.5">
          <SectionLabel>{t.projects.label}</SectionLabel>
          <SplitHeading
            id="proj-titulo"
            text={heading}
            className="m-0 text-[clamp(2.375rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
          />
        </div>
        <Link
          href={href('/projects')}
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-primary no-underline hover:text-foreground light:text-brand-ink"
        >
          {t.projects.viewAll} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <RevealGroup
        as="ul"
        stagger={0.14}
        className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5 p-0 perspective-[1600px]"
      >
        {projects.map((project) => (
          <li key={project.id} className="contents">
            <ProjectCard project={project} />
          </li>
        ))}
      </RevealGroup>
    </section>
  )
}
