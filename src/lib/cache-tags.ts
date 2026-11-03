/** Tags de cache compartilhadas entre o site (cacheTag) e os hooks do CMS (revalidateTag). */
export const CACHE_TAGS = {
  projects: 'projects',
  technologies: 'technologies',
  experiences: 'experiences',
  profile: 'profile',
  project: (slug: string) => `project:${slug}`,
} as const
