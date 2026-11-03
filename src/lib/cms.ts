import 'server-only'

import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import type { Experience, Media, Profile, Project, Technology } from '@/payload-types'

import { profile as defaultProfile } from '@/seed/content'

import { CACHE_TAGS } from './cache-tags'

// O conteúdo só muda quando algo é publicado no painel; os hooks invalidam as tags.
const forever = () => cacheLife('max')

const payload = () => getPayload({ config })

export async function getProfile(): Promise<Profile> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.profile)
  const profile = await (await payload()).findGlobal({ slug: 'profile', depth: 1 })
  // Banco recém-criado (primeiro deploy) ainda não tem perfil: usa os textos padrão do seed.
  const filled = Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== null && value !== undefined),
  )
  return { ...defaultProfile, ...filled } as unknown as Profile
}

export async function getTechnologies(): Promise<Technology[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'technologies',
    sort: '_order',
    limit: 200,
    pagination: false,
  })
  return docs
}

export async function getProjects(): Promise<Project[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.projects, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    sort: '_order',
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.project(slug), CACHE_TAGS.projects, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'projects',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getExperiences(): Promise<Experience[]> {
  'use cache'
  forever()
  cacheTag(CACHE_TAGS.experiences, CACHE_TAGS.technologies)
  const { docs } = await (
    await payload()
  ).find({
    collection: 'experiences',
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
