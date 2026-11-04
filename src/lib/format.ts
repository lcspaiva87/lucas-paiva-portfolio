import { HTML_LANG, type Locale } from '@/i18n/config'
import { DICTIONARIES, plural } from '@/i18n/messages'

const monthFormat = (locale: Locale) =>
  new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' })

/** "fev 2024" / "Feb 2024" */
export function formatMonth(date: string | null | undefined, locale: Locale) {
  if (!date) return null
  return monthFormat(locale)
    .formatToParts(new Date(date))
    .filter((p) => p.type === 'month' || p.type === 'year')
    .map((p) => p.value.replace('.', ''))
    .join(' ')
}

/** "fev 2024 — atual" / "Feb 2024 — present" */
export function formatPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
  locale: Locale,
) {
  const from = formatMonth(start, locale)
  const to = formatMonth(end, locale) ?? DICTIONARIES[locale].date.present
  return from ? `${from} — ${to}` : to
}

export function yearOf(date: string | null | undefined) {
  return date ? new Date(date).getUTCFullYear() : null
}

/** "1 ano e 9 meses" / "1 year and 9 months" */
export function formatTenure(start: string, locale: Locale, now = new Date()) {
  const from = new Date(start)
  const months =
    (now.getUTCFullYear() - from.getUTCFullYear()) * 12 + now.getUTCMonth() - from.getUTCMonth() + 1
  const years = Math.floor(months / 12)
  const rest = months % 12
  const { date } = DICTIONARIES[locale]
  const parts = [years && plural(date.year, years), rest && plural(date.month, rest)].filter(
    Boolean,
  )
  return parts.join(` ${date.and} `)
}

/** Separa "Do Ceará para o *mundo.*" em trechos normais e destacados. */
export function splitHighlight(text: string) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('*') && part.endsWith('*')
        ? { text: part.slice(1, -1), highlight: true }
        : { text: part, highlight: false },
    )
}

export function plainText(text: string) {
  return text.replaceAll('*', '')
}
