'use client'

import { useEffect } from 'react'

import { isDevtoolsShortcut } from '@/lib/devtools-shortcuts'

/**
 * Ignora os atalhos de teclado do DevTools e do "ver código-fonte" no site público.
 * Não impede abrir o DevTools pelo menu do navegador; só desliga os atalhos.
 * Fica desligado em desenvolvimento para não atrapalhar a depuração.
 */
export function BlockDevtoolsShortcuts() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isDevtoolsShortcut(event)) return
      event.preventDefault()
      event.stopPropagation()
    }
    window.addEventListener('keydown', onKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
  }, [])
  return null
}
