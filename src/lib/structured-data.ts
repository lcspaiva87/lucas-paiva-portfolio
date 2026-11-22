import { HTML_LANG, type Locale, LOCALES, localePath } from '@/i18n/config'
import type { Experience, Profile, Project, Technology } from '@/payload-types'

import { hasCaseStudy, media, populated } from './cms'
import { absoluteUrl } from './site'

const PERSON_ID = absoluteUrl('/#person')
const WEBSITE_ID = absoluteUrl('/#website')

type Crumbs = { home: string; projects: string }

const graph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})

/** O mesmo `@id` em toda página, para os buscadores ligarem o autor ao perfil completo da home. */
function personRef(profile: Profile, locale: Locale) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: absoluteUrl(localePath(locale, '/')),
  }
}

function websiteNode(profile: Profile) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: profile.name,
    url: absoluteUrl('/'),
    inLanguage: LOCALES.map((l) => HTML_LANG[l]),
    publisher: { '@id': PERSON_ID },
  }
}

function breadcrumb(page: string, items: { name: string; path: string }[], locale: Locale) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${page}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  }
}

/** Link principal do projeto: estudo de caso no site, senão a loja ou o site do produto. */
function projectUrl(project: Project, locale: Locale) {
  if (hasCaseStudy(project)) return absoluteUrl(localePath(locale, `/projects/${project.slug}`))
  const link =
    project.links?.find((l) => l.kind === 'play-store' || l.kind === 'app-store') ??
    project.links?.find((l) => l.kind === 'website')
  return link?.url ?? absoluteUrl(localePath(locale, '/projects'))
}

const organization = (name: string) => ({ '@type': 'Organization', name })

export function homeSchema(
  profile: Profile,
  technologies: Technology[],
  experiences: Experience[],
  locale: Locale,
) {
  const page = absoluteUrl(localePath(locale, '/'))
  const photo = media(profile.photo)
  const orgs = (kind: Experience['kind'], current: boolean) => [
    ...new Set(
      experiences
        .filter((e) => e.kind === kind && (!current || !e.endDate))
        .map((e) => e.organization)
        .filter((name): name is string => Boolean(name)),
    ),
  ]
  const worksFor = orgs('work', true)
  const alumniOf = orgs('education', false)

  const person = {
    ...personRef(profile, locale),
    jobTitle: profile.role,
    description: profile.intro,
    ...(photo?.url && { image: absoluteUrl(photo.url) }),
    ...(profile.email && { email: `mailto:${profile.email}` }),
    ...(profile.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.split(',')[0]?.trim(),
        addressRegion: profile.location.split(',')[1]?.trim(),
        addressCountry: 'BR',
      },
    }),
    ...(worksFor.length > 0 && { worksFor: worksFor.map(organization) }),
    ...(alumniOf.length > 0 && { alumniOf: alumniOf.map(organization) }),
    sameAs: (profile.socials ?? []).map((s) => s.url),
    knowsAbout: technologies.filter((t) => t.showInStack !== false).map((t) => t.name),
  }

  return graph(
    websiteNode(profile),
    {
      '@type': 'ProfilePage',
      '@id': `${page}#profilepage`,
      url: page,
      name: `${profile.name} — ${profile.role}`,
      inLanguage: HTML_LANG[locale],
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    person,
  )
}

export function projectsSchema(
  profile: Profile,
  projects: Project[],
  locale: Locale,
  labels: Crumbs & { title: string; description: string },
) {
  const page = absoluteUrl(localePath(locale, '/projects'))
  return graph(
    {
      '@type': 'CollectionPage',
      '@id': `${page}#collection`,
      url: page,
      name: labels.title,
      description: labels.description,
      inLanguage: HTML_LANG[locale],
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      breadcrumb: { '@id': `${page}#breadcrumb` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: project.title,
          url: projectUrl(project, locale),
        })),
      },
    },
    breadcrumb(
      page,
      [
        { name: labels.home, path: '/' },
        { name: labels.projects, path: '/projects' },
      ],
      locale,
    ),
    personRef(profile, locale),
  )
}

const APP_CATEGORY: Record<Project['category'], string> = {
  mobile: 'MobileApplication',
  web: 'WebApplication',
  saas: 'WebApplication',
  desktop: 'DesktopApplication',
}

export function projectSchema(project: Project, profile: Profile, locale: Locale, labels: Crumbs) {
  const page = absoluteUrl(localePath(locale, `/projects/${project.slug}`))
  const store = project.links?.find((l) => l.kind === 'play-store' || l.kind === 'app-store')
  const site = project.links?.find((l) => l.kind === 'website')
  return graph(
    {
      '@type': 'SoftwareApplication',
      '@id': `${page}#app`,
      inLanguage: HTML_LANG[locale],
      name: project.title,
      description: project.summary || project.tagline,
      applicationCategory: APP_CATEGORY[project.category],
      ...(project.platform && { operatingSystem: project.platform }),
      url: (store ?? site)?.url ?? page,
      keywords: populated<Technology>(project.technologies)
        .map((t) => t.name)
        .join(', '),
      creator: { '@id': PERSON_ID },
      mainEntityOfPage: page,
    },
    breadcrumb(
      page,
      [
        { name: labels.home, path: '/' },
        { name: labels.projects, path: '/projects' },
        { name: project.title, path: `/projects/${project.slug}` },
      ],
      locale,
    ),
    personRef(profile, locale),
  )
}
