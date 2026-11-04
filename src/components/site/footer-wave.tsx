// Mesma curva deslocada para baixo a cada linha, com opacidade decrescente.
const curve = (dy: number, dyRight: number) =>
  `M0 ${200 + dy} C 280 ${140 + dy}, 520 ${110 + dy}, 760 ${160 + dy} S 1160 ${40 + dyRight}, 1440 ${110 + dyRight}`

const MAIN = curve(0, 0)

const ECHOES = [
  { dy: 12, dyRight: 16, opacity: 0.6 },
  { dy: 24, dyRight: 32, opacity: 0.45 },
  { dy: 36, dyRight: 48, opacity: 0.34 },
  { dy: 48, dyRight: 64, opacity: 0.24 },
  { dy: 60, dyRight: 80, opacity: 0.16 },
  { dy: 72, dyRight: 96, opacity: 0.1 },
]

/**
 * Onda acima do rodapé. Em movimento: as linhas ondulam em sequência,
 * um ponto de luz percorre a curva principal e o brilho pulsa.
 * Com "reduzir movimento" ativado, fica estática.
 */
export function FooterWave() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-24 h-[180px] sm:h-[280px]">
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible text-primary"
      >
        <defs>
          <linearGradient id="footer-wave-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <filter id="footer-wave-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <path d={`${MAIN} L1440 280 L0 280 Z`} fill="url(#footer-wave-fill)" />

        <path
          d={MAIN}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          filter="url(#footer-wave-glow)"
          className="motion-safe:animate-wave-glow"
        />
        <path
          d={MAIN}
          fill="none"
          className="stroke-[color-mix(in_oklab,var(--primary)_45%,white)] light:stroke-primary"
          strokeWidth="2"
        />

        {/* Ponto de luz que viaja pela curva */}
        <g className="hidden motion-safe:inline">
          <path
            d={MAIN}
            pathLength={1000}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="90 910"
            filter="url(#footer-wave-glow)"
            className="animate-wave-comet"
          />
          <path
            d={MAIN}
            pathLength={1000}
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="60 940"
            className="animate-wave-comet light:stroke-[color-mix(in_oklab,var(--primary)_60%,white)]"
            style={{ animationDelay: '-0.12s' }}
          />
        </g>

        {ECHOES.map(({ dy, dyRight, opacity }, i) => (
          <path
            key={dy}
            d={curve(dy, dyRight)}
            fill="none"
            stroke="currentColor"
            strokeOpacity={opacity}
            vectorEffect="non-scaling-stroke"
            className="motion-safe:animate-wave-ripple"
            style={{ animationDelay: `${-i * 0.35}s` }}
          />
        ))}

        <path
          d="M120 280 L 200 170 M300 280 L 340 145 M480 280 L 500 130 M660 280 L 660 148 M840 280 L 820 152 M1020 280 L 980 112 M1200 280 L 1150 84 M1380 280 L 1320 96"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
