'use client'

import { useReducedMotion } from 'motion/react'
import { useSyncExternalStore } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/** Efeitos que seguem o cursor só fazem sentido com mouse e sem "reduzir movimento". */
export function usePointerEffects() {
  const fine = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
  const reduced = useReducedMotion()
  return fine && !reduced
}
