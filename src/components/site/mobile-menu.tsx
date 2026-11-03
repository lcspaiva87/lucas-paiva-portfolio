'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'

import { NAV_LINKS } from './nav-links'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-foreground"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-background/95 px-4 pt-24 pb-10 backdrop-blur-md"
      >
        <nav aria-label="Menu" className="flex flex-col gap-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="border-b border-border-subtle">
                <Link
                  href={href}
                  onClick={close}
                  className="flex min-h-14 items-center text-2xl font-extrabold tracking-[-0.03em] text-foreground no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-4">
            <ThemeToggle />
            <Button asChild size="md">
              <Link href="/#contato" onClick={close}>
                Contato
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
