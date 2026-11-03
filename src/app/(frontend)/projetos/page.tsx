import type { Metadata } from 'next'

import { ProjectCard } from '@/components/projects/project-card'
import { ProjectFilter } from '@/components/projects/project-filter'
import { Highlight } from '@/components/ui/highlight'
import { SectionLabel } from '@/components/ui/section-label'
import { getProfile, getProjects } from '@/lib/cms'
import { plainText } from '@/lib/format'
import { CATEGORY_LABEL } from '@/lib/labels'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Produtos digitais que desenvolvi, do conceito à entrega: apps mobile, web e SaaS.',
}

export default async function ProjectsPage() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()])
  const categories = (Object.keys(CATEGORY_LABEL) as (keyof typeof CATEGORY_LABEL)[])
    .filter((value) => projects.some((p) => p.category === value))
    .map((value) => ({ value, label: CATEGORY_LABEL[value] }))

  return (
    <div className="container-page flex flex-col gap-12 pt-16 lg:pt-24">
      <header className="flex flex-col gap-4">
        <SectionLabel>Projetos</SectionLabel>
        <h1 aria-label={plainText(profile.projectsHeading)} className="m-0 text-display">
          <Highlight text={profile.projectsHeading} />
        </h1>
        <p className="m-0 max-w-2xl text-body-lg text-muted-foreground">
          {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}. Os que têm case study
          abrem com a história completa: problema, solução e o que deu trabalho.
        </p>
      </header>

      <ProjectFilter
        categories={categories}
        items={projects.map((project) => ({
          id: project.id,
          category: project.category,
          card: <ProjectCard project={project} headingLevel="h2" />,
        }))}
      />
    </div>
  )
}
