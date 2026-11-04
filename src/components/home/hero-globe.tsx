'use client'

import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { type RefObject, useEffect, useRef } from 'react'

import { useI18n } from '@/i18n/client'

// Elipse da órbita, usada também como trajeto dos pontos que giram em volta do globo.
const ORBIT = 'M8,260 a292,96 0 1,1 584,0 a292,96 0 1,1 -584,0'

/**
 * Globo de pontos do hero. Em movimento: os pontos correm pela superfície,
 * os meridianos giram, dois pontos percorrem a órbita, e a órbita inclina
 * conforme a página rola. Com "reduzir movimento", vira uma imagem estática.
 */
export function HeroGlobe() {
  const { t } = useI18n()
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref as unknown as RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  })
  const tilt = useSpring(useTransform(scrollYProgress, [0, 1], [-16, 24]), {
    stiffness: 120,
    damping: 30,
  })
  const spin = useTransform(scrollYProgress, [0, 1], [0, 60])

  // As animações SVG (SMIL) sempre vão no HTML; aqui elas param se o usuário pediu menos movimento.
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    if (reduced) {
      svg.pauseAnimations()
      svg.setCurrentTime(0)
    } else {
      svg.unpauseAnimations()
    }
  }, [reduced])

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 520"
      className="h-full w-full overflow-visible text-primary"
      role="img"
      aria-label={t.hero.globeFallbackLabel}
    >
      <defs>
        <pattern id="hero-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
          <animateTransform
            attributeName="patternTransform"
            type="translate"
            from="0 0"
            to="10 0"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </pattern>
        <radialGradient id="hero-shade" cx="36%" cy="32%" r="72%">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0.6" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-sphere">
          <circle cx="300" cy="260" r="210" fill="url(#hero-shade)" />
        </mask>
      </defs>

      <circle
        cx="300"
        cy="260"
        r="270"
        fill="url(#hero-halo)"
        className="motion-safe:animate-glow"
      />
      <circle cx="300" cy="260" r="210" className="fill-[#140c08] light:fill-card" />
      <rect
        x="90"
        y="50"
        width="420"
        height="420"
        fill="url(#hero-dots)"
        mask="url(#hero-sphere)"
      />

      {/* Meridianos: a largura oscila entre 210 e 0, simulando a rotação */}
      {[0, -3, -6].map((begin) => (
        <ellipse
          key={begin}
          cx="300"
          cy="260"
          rx="210"
          ry="210"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
        >
          <animate
            attributeName="rx"
            values="210;0;210"
            dur="9s"
            begin={`${begin}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      ))}

      <circle
        cx="300"
        cy="260"
        r="210"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />

      <m.g
        style={{
          rotate: reduced ? -16 : tilt,
          transformOrigin: '300px 260px',
          transformBox: 'view-box',
        }}
      >
        <ellipse
          cx="300"
          cy="260"
          rx="292"
          ry="96"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="1.5"
        />
        {[0, -5.5].map((begin, i) => (
          <circle
            key={begin}
            r={i === 0 ? 5 : 4}
            className={i === 0 ? 'fill-[#ffd2bf]' : 'fill-primary'}
          >
            <animateMotion dur="11s" begin={`${begin}s`} repeatCount="indefinite" path={ORBIT} />
          </circle>
        ))}
      </m.g>

      {/* Anel externo que gira devagar com o scroll */}
      <m.circle
        cx="300"
        cy="260"
        r="240"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeDasharray="2 10"
        style={{
          rotate: reduced ? 0 : spin,
          transformOrigin: '300px 260px',
          transformBox: 'view-box',
        }}
      />
    </svg>
  )
}
