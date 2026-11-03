/** Tokens de movimento da direção visual. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

/** Entradas: 700 ms, 24 px de deslocamento, 60 ms entre itens. */
export const ENTER = { duration: 0.7, distance: 24, stagger: 0.06 } as const

/** Microinterações: mola 300/30 (opções de useSpring). */
export const SPRING = { stiffness: 300, damping: 30 } as const

/** Só dispara quando um pedaço razoável do elemento está visível, uma vez. */
export const IN_VIEW = { once: true, amount: 0.2 } as const
