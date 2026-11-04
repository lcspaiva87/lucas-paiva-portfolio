import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { getProfile } from '@/lib/cms'
import { OG_SIZE, OgFrame, ogFonts } from '@/lib/og'
import { SITE_URL } from '@/lib/site'

export const alt = 'Lucas Paiva, Software Engineer'
export const size = OG_SIZE
export const contentType = 'image/png'

// Rotas de imagem não leem next/root-params: o idioma vem dos params.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const [profile, fonts] = await Promise.all([getProfile(lang), ogFonts()])
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
