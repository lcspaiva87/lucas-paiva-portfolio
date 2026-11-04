'use client'

import { useI18n } from '@/i18n/client'
import { formatTenure } from '@/lib/format'
import { useClientValue } from '@/lib/use-client-value'

/** Tempo de casa calculado no navegador, para não congelar no HTML cacheado. */
export function Tenure({ since }: { since: string }) {
  const { locale } = useI18n()
  const tenure = useClientValue(() => formatTenure(since, locale))
  return tenure ? <span className="text-muted-foreground">· {tenure}</span> : null
}
