import type { Locale } from './config'
import { en } from './dictionaries/en'
import { pt, type Dictionary } from './dictionaries/pt'

export type { Dictionary }

export const DICTIONARIES: Record<Locale, Dictionary> = { pt, en }

/** fill('{n} projetos', { n: 3 }) → "3 projetos" */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

type Plural = { one: string; other: string }

/** plural(t.projects.count, 1) → "1 projeto" */
export function plural(forms: Plural, n: number) {
  return fill(n === 1 ? forms.one : forms.other, { n })
}
