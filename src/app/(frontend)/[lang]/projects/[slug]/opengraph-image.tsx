import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { DICTIONARIES } from '@/i18n/messages'
import { getProfile, getProjectBySlug, populated } from '@/lib/cms'
import { OG_SIZE, OgFrame, ogFonts } from '@/lib/og'
import type { Technology } from '@/payload-types'

export const alt = 'Case study'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const t = DICTIONARIES[lang]
  const [project, profile, fonts] = await Promise.all([
    getProjectBySlug(slug, lang),
    getProfile(lang),
    ogFonts(),
  ])
  const title = project?.title ?? profile.name
  return new ImageResponse(
    <OgFrame
      eyebrow={
        project ? `${t.caseStudy.eyebrow} · ${t.category[project.category]}` : profile.headline
      }
      title={title}
      titleSize={title.length > 12 ? 96 : 120}
      description={project?.tagline ?? profile.intro}
      tags={populated<Technology>(project?.technologies).map((tech) => tech.name)}
      footer={`${profile.name}  ·  ${profile.role}`}
    />,
    { ...size, fonts },
  )
}
