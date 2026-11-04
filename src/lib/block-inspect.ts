type Shortcut = Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>

/**
 * Atalhos que abrem o DevTools ou o código-fonte:
 * F12; Ctrl+Shift+I/J/C (Windows e Linux); Cmd+Option+I/J/C (Mac); Ctrl+U e Cmd+Option+U.
 * Usa `code` (tecla física) porque, no Mac, Option muda o `key` ("I" vira "ˆ").
 */
export function isDevtoolsShortcut(event: Shortcut) {
  if (event.key === 'F12' || event.code === 'F12') return true
  const letter = event.code.startsWith('Key') ? event.code.slice(3) : event.key.toUpperCase()
  const ctrlShift = event.ctrlKey && event.shiftKey && !event.altKey
  const cmdOption = event.metaKey && event.altKey
  if ((ctrlShift || cmdOption) && ['I', 'J', 'C'].includes(letter)) return true
  if (letter === 'U' && ((event.ctrlKey && !event.shiftKey && !event.altKey) || cmdOption)) {
    return true
  }
  return false
}

/** Campos de texto mantêm o menu do clique direito, para colar e corrigir ortografia. */
export function allowsContextMenu(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return !!target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')
}
