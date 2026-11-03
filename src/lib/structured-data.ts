import type { Profile, Project, Technology } from '@/payload-types'

import { media, populated } from './cms'
import { absoluteUrl } from './site'

const PERSON_ID = absoluteUrl('/#person')

export function personSchema(profile: Profile, technologies: Technology[]) {
  const photo = media(profile.photo)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    url: absoluteUrl('/'),
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
    sameAs: (profile.socials ?? []).map((s) => s.url),
    knowsAbout: technologies.filter((t) => t.showInStack !== false).map((t) => t.name),
  }
}

const APP_CATEGORY: Record<Project['category'], string> = {
  mobile: 'MobileApplication',
  web: 'WebApplication',
  saas: 'WebApplication',
  desktop: 'DesktopApplication',
}

export function projectSchema(project: Project) {
  const store = project.links?.find((l) => l.kind === 'play-store' || l.kind === 'app-store')
  const site = project.links?.find((l) => l.kind === 'website')
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': absoluteUrl(`/projetos/${project.slug}#app`),
    name: project.title,
    description: project.summary || project.tagline,
    applicationCategory: APP_CATEGORY[project.category],
    ...(project.platform && { operatingSystem: project.platform }),
    url: (store ?? site)?.url ?? absoluteUrl(`/projetos/${project.slug}`),
    keywords: populated<Technology>(project.technologies)
      .map((t) => t.name)
      .join(', '),
    creator: { '@id': PERSON_ID },
    mainEntityOfPage: absoluteUrl(`/projetos/${project.slug}`),
  }
}
