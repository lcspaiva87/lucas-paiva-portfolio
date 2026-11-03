'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'

import { NAV_LINKS } from './nav-links'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const button = buttonRef.current
    const panel = panelRef.current
    if (!button || !panel) return

    // O resto da página fica inacessível (teclado e leitor de tela) enquanto o menu está aberto.
    const background = ['conteudo', 'rodape']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    background.forEach((el) => (el.inert = true))
    document.body.style.overflow = 'hidden'

    const focusables = () => [button, ...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
    focusables()[1]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      // Mantém o Tab circulando entre o botão de fechar e os itens do menu.
      const items = focusables()
      const index = items.indexOf(document.activeElement as HTMLElement)
      const next = e.shiftKey ? index - 1 : index + 1
      if (next < 0 || next >= items.length) {
        e.preventDefault()
        items[next < 0 ? items.length - 1 : 0].focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      background.forEach((el) => (el.inert = false))
      document.body.style.overflow = ''
      // Ao fechar, o foco volta para o botão que abriu o menu.
      if (panel.contains(document.activeElement) || document.activeElement === document.body) {
        button.focus()
      }
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
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
        ref={panelRef}
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
