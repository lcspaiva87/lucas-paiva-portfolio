import type { Metadata } from 'next'

import { ProjectCard } from '@/components/projects/project-card'
import { ProjectFilter } from '@/components/projects/project-filter'
import { Highlight } from '@/components/ui/highlight'
import { SectionLabel } from '@/components/ui/section-label'
import { plural } from '@/i18n/messages'
import { getI18n } from '@/i18n/server'
import { getProfile, getProjects } from '@/lib/cms'
import { plainText } from '@/lib/format'
import { alternates } from '@/lib/seo'
import type { Project } from '@/payload-types'

const CATEGORIES: Project['category'][] = ['mobile', 'web', 'saas', 'desktop']

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n()
  const { canonical, languages } = alternates(locale, '/projects')
  return {
    title: t.projects.label,
    description: t.projects.metaDescription,
    alternates: { canonical, languages },
    openGraph: { url: canonical },
  }
}

export default async function ProjectsPage() {
  const { locale, t } = await getI18n()
  const [projects, profile] = await Promise.all([getProjects(locale), getProfile(locale)])
  const categories = CATEGORIES.filter((value) => projects.some((p) => p.category === value)).map(
    (value) => ({ value, label: t.category[value] }),
  )

  return (
    <div className="container-page flex flex-col gap-12 pt-16 lg:pt-24">
      <header className="flex flex-col gap-4">
        <SectionLabel>{t.projects.label}</SectionLabel>
        <h1 aria-label={plainText(profile.projectsHeading)} className="m-0 text-display">
          <Highlight text={profile.projectsHeading} />
        </h1>
        <p className="m-0 max-w-2xl text-body-lg text-muted-foreground">
          {plural(t.projects.count, projects.length)}. {t.projects.listIntro}
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
