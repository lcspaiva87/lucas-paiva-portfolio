'use client'

import { useClientValue } from '@/lib/use-client-value'

export function CurrentYear() {
  return useClientValue(() => new Date().getFullYear())
}
