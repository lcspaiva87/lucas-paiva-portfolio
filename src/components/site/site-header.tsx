import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { LogoMark, Wordmark } from '@/components/brand/logo'
import { Magnetic } from '@/components/motion/magnetic'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button, ButtonArrow } from '@/components/ui/button'

import { MainNav } from './main-nav'
import { MobileMenu } from './mobile-menu'

export function SiteHeader() {
  return (
    <header className="relative z-30 border-b border-border-subtle">
      <nav
        aria-label="Principal"
        className="container-page flex min-h-16 items-center justify-between gap-4 lg:min-h-[76px]"
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground no-underline"
          aria-label="Lucas Paiva, página inicial"
        >
          <LogoMark size={36} className="lg:size-10" />
          <Wordmark className="text-[17px] lg:text-[19px]" />
        </Link>

        <MainNav className="hidden xl:flex" />

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <Magnetic strength={6}>
            <Button asChild size="md">
              <Link href="/#contato">
                Contato
                <ButtonArrow>
                  <ArrowUpRight strokeWidth={2.4} />
                </ButtonArrow>
              </Link>
            </Button>
          </Magnetic>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}
