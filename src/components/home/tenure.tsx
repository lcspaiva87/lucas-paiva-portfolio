'use client'

import { formatTenure } from '@/lib/format'
import { useClientValue } from '@/lib/use-client-value'

/** Tempo de casa calculado no navegador, para não congelar no HTML cacheado. */
export function Tenure({ since }: { since: string }) {
  const tenure = useClientValue(() => formatTenure(since))
  return tenure ? <span className="text-muted-foreground">· {tenure}</span> : null
}
