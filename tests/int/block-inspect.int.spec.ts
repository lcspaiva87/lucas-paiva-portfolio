import { describe, expect, it } from 'vitest'

import { allowsContextMenu, isDevtoolsShortcut } from '@/lib/block-inspect'

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

describe('allowsContextMenu', () => {
  it('keeps the menu only in text fields', () => {
    document.body.innerHTML = `
      <p id="text">Texto</p><img id="img" alt="" /><a id="link" href="/">Link</a>
      <input id="input" /><textarea id="area"></textarea><div contenteditable="true"><span id="edit">x</span></div>`
    const el = (id: string) => document.getElementById(id)
    expect(allowsContextMenu(el('text'))).toBe(false)
    expect(allowsContextMenu(el('img'))).toBe(false)
    expect(allowsContextMenu(el('link'))).toBe(false)
    expect(allowsContextMenu(el('input'))).toBe(true)
    expect(allowsContextMenu(el('area'))).toBe(true)
    expect(allowsContextMenu(el('edit'))).toBe(true)
    expect(allowsContextMenu(null)).toBe(false)
  })
})
