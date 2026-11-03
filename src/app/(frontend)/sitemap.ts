import type { MetadataRoute } from 'next'

import { getProjects, hasCaseStudy } from '@/lib/cms'
import { absoluteUrl } from '@/lib/site'

// Atualiza junto com os projetos: os hooks do CMS invalidam a tag "projects".
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const lastProject = projects.reduce(
    (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
    projects[0]?.updatedAt ?? new Date(0).toISOString(),
  )

  return [
    { url: absoluteUrl('/'), lastModified: lastProject, changeFrequency: 'monthly', priority: 1 },
    {
      url: absoluteUrl('/projetos'),
      lastModified: lastProject,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.filter(hasCaseStudy).map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      lastModified: project.updatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
