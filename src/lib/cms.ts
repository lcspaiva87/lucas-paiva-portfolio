import 'server-only'

import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import type { Locale } from '@/i18n/config'
import type { Experience, Media, Profile, Project, Technology } from '@/payload-types'

import { profileFor } from '@/seed/content'

import { CACHE_TAGS } from './cache-tags'

// O conteúdo só muda quando algo é publicado no painel; os hooks invalidam as tags.
// O idioma entra como argumento: cada um vira uma entrada de cache, invalidada pelas mesmas tags.
// Campos sem tradução caem no português (fallback do Payload).
const forever = () => cacheLife('max')

const payload = () => getPayload({ config })

export async function getProfile(locale: Locale): Promise<Profile> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.profile)
  const profile = await (await payload()).findGlobal({ slug: 'profile', depth: 1, locale })
  // Banco recém-criado (primeiro deploy) ainda não tem perfil: usa os textos padrão do seed.
  const filled = Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== null && value !== undefined),
  )
  return { ...profileFor(locale), ...filled } as unknown as Profile
}

export async function getTechnologies(locale: Locale): Promise<Technology[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'technologies',
    locale,
    sort: '_order',
    limit: 200,
    pagination: false,
  })
  return docs
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.projects, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'projects',
    locale,
    where: { _status: { equals: 'published' } },
    sort: '_order',
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
}

export async function getProjectBySlug(slug: string, locale: Locale): Promise<Project | null> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.project(slug), CACHE_TAGS.projects, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'projects',
    locale,
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getExperiences(locale: Locale): Promise<Experience[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.experiences, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'experiences',
    locale,
    sort: '-endDate',
    depth: 1,
    limit: 50,
    pagination: false,
  })
  return docs
}

/** Relações com depth >= 1 chegam populadas; isso descarta os IDs soltos. */
export function populated<T extends object>(items: (number | T)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => typeof item === 'object' && item !== null)
}

export function media(value: number | Media | null | undefined): Media | null {
  return typeof value === 'object' && value?.url ? value : null
}

export function hasCaseStudy(project: Project) {
  return (project.layout?.length ?? 0) > 0
}
