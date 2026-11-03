const monthFormat = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** "fev 2024" */
export function formatMonth(date: string | null | undefined) {
  if (!date) return null
  return monthFormat
    .formatToParts(new Date(date))
    .filter((p) => p.type === 'month' || p.type === 'year')
    .map((p) => p.value.replace('.', ''))
    .join(' ')
}

/** "fev 2024 — atual" */
export function formatPeriod(start: string | null | undefined, end: string | null | undefined) {
  const from = formatMonth(start)
  const to = formatMonth(end) ?? 'atual'
  return from ? `${from} — ${to}` : to
}

export function yearOf(date: string | null | undefined) {
  return date ? new Date(date).getUTCFullYear() : null
}

/** "1 ano e 9 meses" */
export function formatTenure(start: string, now = new Date()) {
  const from = new Date(start)
  const months =
    (now.getUTCFullYear() - from.getUTCFullYear()) * 12 + now.getUTCMonth() - from.getUTCMonth() + 1
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = [
    years && `${years} ${years === 1 ? 'ano' : 'anos'}`,
    rest && `${rest} ${rest === 1 ? 'mês' : 'meses'}`,
  ].filter(Boolean)
  return parts.join(' e ')
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
