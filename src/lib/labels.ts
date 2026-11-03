import type { Project } from '@/payload-types'

export const CATEGORY_LABEL: Record<Project['category'], string> = {
  mobile: 'App mobile',
  web: 'Web',
  saas: 'SaaS',
  desktop: 'Desktop',
}

export const STAGE_LABEL: Record<Project['stage'], string> = {
  production: 'Em produção',
  development: 'Em desenvolvimento',
  discontinued: 'Descontinuado',
}

type LinkKind = NonNullable<Project['links']>[number]['kind']

export const LINK_LABEL: Record<LinkKind, string> = {
  'play-store': 'Ver na Google Play',
  'app-store': 'Ver na App Store',
  website: 'Visitar site',
  repository: 'Ver código',
  other: 'Abrir link',
}
