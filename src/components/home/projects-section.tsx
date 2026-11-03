import Link from 'next/link'

import { ProjectCard } from '@/components/projects/project-card'
import { Highlight } from '@/components/ui/highlight'
import { SectionLabel } from '@/components/ui/section-label'
import { plainText } from '@/lib/format'
import type { Project } from '@/payload-types'

export function ProjectsSection({ heading, projects }: { heading: string; projects: Project[] }) {
  return (
    <section
      id="projetos"
      aria-labelledby="proj-titulo"
      className="container-page flex scroll-mt-8 flex-col gap-8 pt-24 lg:pt-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3.5">
          <SectionLabel>Projetos</SectionLabel>
          <h2
            id="proj-titulo"
            aria-label={plainText(heading)}
            className="m-0 text-[clamp(2.375rem,4.4vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em]"
          >
            <Highlight text={heading} />
          </h2>
        </div>
        <Link
          href="/projetos"
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-primary no-underline hover:text-foreground light:text-brand-ink"
        >
          Ver todos os projetos <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5 p-0">
        {projects.map((project) => (
          <li key={project.id} className="contents">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
