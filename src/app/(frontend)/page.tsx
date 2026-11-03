import Link from 'next/link'

import { Logo } from '@/components/brand/logo'
import { Button, ButtonArrow } from '@/components/ui/button'

// Placeholder até a Fase 3 (Home completa).
export default function HomePage() {
  return (
    <main className="container-page flex min-h-dvh flex-col items-start justify-center gap-8">
      <Logo />
      <h1 className="text-hero">
        Lucas
        <br />
        Paiva
      </h1>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/styleguide">
            Design system <ButtonArrow>→</ButtonArrow>
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/admin" prefetch={false}>
            Painel
          </Link>
        </Button>
      </div>
    </main>
  )
}
