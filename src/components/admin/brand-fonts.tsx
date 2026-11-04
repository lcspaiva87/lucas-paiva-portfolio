import { DM_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

// As mesmas fontes do site. O painel lê --font-body e --font-mono.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export function BrandFonts({ children }: { children?: ReactNode }) {
  return (
    <>
      <style>{`:root{--font-body:${jakarta.style.fontFamily};--font-mono:${dmMono.style.fontFamily}}`}</style>
      {children}
    </>
  )
}
