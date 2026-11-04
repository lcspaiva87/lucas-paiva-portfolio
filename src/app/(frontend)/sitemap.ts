import type { MetadataRoute } from 'next'

import { DEFAULT_LOCALE, HTML_LANG, LOCALES, localePath } from '@/i18n/config'
import { getProjects, hasCaseStudy } from '@/lib/cms'
import { absoluteUrl } from '@/lib/site'

/** Uma entrada por idioma, cada uma apontando para as outras versões (hreflang). */
function localized(path: string, entry: Omit<MetadataRoute.Sitemap[number], 'url'>) {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [HTML_LANG[locale], absoluteUrl(localePath(locale, path))]),
  )
  return LOCALES.map((locale) => ({
    ...entry,
    url: absoluteUrl(localePath(locale, path)),
    alternates: { languages },
  }))
}

// Atualiza junto com os projetos: os hooks do CMS invalidam a tag "projects".
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects(DEFAULT_LOCALE)
  const lastProject = projects.reduce(
    (latest, p) => (p.updatedAt > latest ? p.updatedAt : latest),
    projects[0]?.updatedAt ?? new Date(0).toISOString(),
  )

  return [
    ...localized('/', { lastModified: lastProject, changeFrequency: 'monthly', priority: 1 }),
    ...localized('/projetos', {
      lastModified: lastProject,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...projects.filter(hasCaseStudy).flatMap((project) =>
      localized(`/projetos/${project.slug}`, {
        lastModified: project.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.7,
      }),
    ),
  ]
}
