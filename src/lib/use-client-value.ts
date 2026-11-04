'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Valor calculado só no navegador (ex.: datas relativas a "agora").
 * No pré-render do servidor retorna null, então o HTML cacheado não congela a data.
 */
export function useClientValue<T extends string | number>(compute: () => T): T | null {
  return useSyncExternalStore(subscribe, compute, () => null)
}
