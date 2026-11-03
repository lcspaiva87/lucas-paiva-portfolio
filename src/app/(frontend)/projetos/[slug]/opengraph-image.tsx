import { ImageResponse } from 'next/og'

import { getProfile, getProjectBySlug, populated } from '@/lib/cms'
import { CATEGORY_LABEL } from '@/lib/labels'
import { OG_SIZE, OgFrame, ogFonts } from '@/lib/og'
import type { Technology } from '@/payload-types'

export const alt = 'Case study'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, profile, fonts] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
    ogFonts(),
  ])
  const title = project?.title ?? profile.name
  return new ImageResponse(
    <OgFrame
      eyebrow={project ? `Case study · ${CATEGORY_LABEL[project.category]}` : profile.headline}
      title={title}
      titleSize={title.length > 12 ? 96 : 120}
      description={project?.tagline ?? profile.intro}
      tags={populated<Technology>(project?.technologies).map((t) => t.name)}
      footer={`${profile.name}  ·  ${profile.role}`}
    />,
    { ...size, fonts },
  )
}
