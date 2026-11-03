import type { Metadata, Viewport } from 'next'
import { DM_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { MotionProvider } from '@/components/motion/motion-provider'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { getProfile } from '@/lib/cms'
import { SITE_URL } from '@/lib/site'

import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

// Título, descrição e redes vêm do Perfil no CMS.
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile()
  const title = `${profile.name} — ${profile.role}`
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${profile.name}` },
    description: profile.intro,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: profile.name,
      title,
      description: profile.intro,
      url: '/',
    },
    twitter: { card: 'summary_large_image', title, description: profile.intro },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0c' },
    { media: '(prefers-color-scheme: light)', color: '#edeae3' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${jakarta.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Sem JavaScript as entradas animadas não rodam: mostra o conteúdo direto. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
            >
              Pular para o conteúdo
            </a>
            <div id="topo" className="flex min-h-dvh flex-col overflow-x-clip">
              <SiteHeader />
              <main id="conteudo" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
