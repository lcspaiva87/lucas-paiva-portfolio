import { describe, expect, it } from 'vitest'

import { isDevtoolsShortcut } from '@/lib/devtools-shortcuts'

const key = (
  code: string,
  mods: Partial<Record<'ctrl' | 'meta' | 'shift' | 'alt', boolean>> = {},
  key = code.replace('Key', ''),
) => ({
  key,
  code,
  ctrlKey: !!mods.ctrl,
  metaKey: !!mods.meta,
  shiftKey: !!mods.shift,
  altKey: !!mods.alt,
})

describe('isDevtoolsShortcut', () => {
  it('blocks the DevTools and view-source shortcuts', () => {
    expect(isDevtoolsShortcut(key('F12'))).toBe(true)
    for (const letter of ['I', 'J', 'C']) {
      expect(isDevtoolsShortcut(key(`Key${letter}`, { ctrl: true, shift: true }))).toBe(true)
      // No Mac, Option muda o `key`; vale a tecla física.
      expect(isDevtoolsShortcut(key(`Key${letter}`, { meta: true, alt: true }, 'ˆ'))).toBe(true)
    }
    expect(isDevtoolsShortcut(key('KeyU', { ctrl: true }))).toBe(true)
    expect(isDevtoolsShortcut(key('KeyU', { meta: true, alt: true }))).toBe(true)
  })

  it('leaves everyday shortcuts alone', () => {
    expect(isDevtoolsShortcut(key('KeyC', { ctrl: true }))).toBe(false) // copiar
    expect(isDevtoolsShortcut(key('KeyC', { meta: true }))).toBe(false) // copiar no Mac
    expect(isDevtoolsShortcut(key('KeyI', { meta: true }))).toBe(false)
    expect(isDevtoolsShortcut(key('KeyJ', { ctrl: true }))).toBe(false)
    expect(isDevtoolsShortcut(key('KeyU', { meta: true }))).toBe(false)
    expect(isDevtoolsShortcut(key('KeyI'))).toBe(false)
    expect(isDevtoolsShortcut(key('F5'))).toBe(false)
  })
})
