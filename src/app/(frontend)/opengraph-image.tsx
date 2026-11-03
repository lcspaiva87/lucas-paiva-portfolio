import { ImageResponse } from 'next/og'

import { getProfile } from '@/lib/cms'
import { OG_SIZE, OgFrame, ogFonts } from '@/lib/og'
import { SITE_URL } from '@/lib/site'

export const alt = 'Lucas Paiva, desenvolvedor full-stack'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const [profile, fonts] = await Promise.all([getProfile(), ogFonts()])
  const host = new URL(SITE_URL).host
  return new ImageResponse(
    <OgFrame
      eyebrow={profile.headline}
      title={profile.name}
      description={profile.intro}
      footer={[profile.role, profile.location, host].filter(Boolean).join('  ·  ')}
    />,
    { ...size, fonts },
  )
}
