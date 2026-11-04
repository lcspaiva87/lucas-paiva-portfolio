'use client'

import { useEffect } from 'react'

import { allowsContextMenu, isDevtoolsShortcut } from '@/lib/block-inspect'

/**
 * No site público, ignora os atalhos do DevTools e do "ver código-fonte" e desliga o menu
 * do clique direito (menos em campos de texto). Não impede abrir o DevTools pelo menu do
 * navegador. Fica desligado em desenvolvimento para não atrapalhar a depuração.
 */
export function BlockInspect() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isDevtoolsShortcut(event)) return
      event.preventDefault()
      event.stopPropagation()
    }
    const onContextMenu = (event: MouseEvent) => {
      if (!allowsContextMenu(event.target)) event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown, { capture: true })
    window.addEventListener('contextmenu', onContextMenu, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      window.removeEventListener('contextmenu', onContextMenu, { capture: true })
    }
  }, [])
  return null
}
