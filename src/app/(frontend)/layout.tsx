import type { Metadata } from 'next'
import { DM_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/components/theme/theme-provider'

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

export const metadata: Metadata = {
  title: {
    default: 'Lucas Paiva — Software Engineer',
    template: '%s · Lucas Paiva',
  },
  description:
    'Desenvolvo produtos digitais completos, do conceito à entrega, com foco em performance, experiência e impacto real no usuário.',
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
