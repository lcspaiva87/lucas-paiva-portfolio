// Anéis animados em volta da Terra 3D. A órbita é desenhada em duas camadas:
// atrás do canvas (a Terra cobre a metade de trás) e na frente (só a metade da frente).

const C = 300 // centro do viewBox 600×600
const ORBIT = { rx: 300, ry: 92, tilt: -16 }
// Trajeto da elipse para os pontos que percorrem a órbita.
const ORBIT_PATH = `M${C - ORBIT.rx},${C} a${ORBIT.rx},${ORBIT.ry} 0 1,0 ${ORBIT.rx * 2},0 a${ORBIT.rx},${ORBIT.ry} 0 1,0 ${-ORBIT.rx * 2},0`

const RUNNERS = [
  { begin: '0s', r: 5, className: 'fill-[#ffd2bf]', glow: true },
  { begin: '-5.5s', r: 3.5, className: 'fill-primary', glow: false },
]

function Orbit({ front }: { front: boolean }) {
  return (
    <g
      transform={`rotate(${ORBIT.tilt} ${C} ${C})`}
      clipPath={front ? 'url(#orbit-front)' : undefined}
    >
      <ellipse
        cx={C}
        cy={C}
        rx={ORBIT.rx}
        ry={ORBIT.ry}
        fill="none"
        stroke="currentColor"
        strokeOpacity={front ? 0.8 : 0.4}
        strokeWidth="1.5"
      />
      {RUNNERS.map(({ begin, r, className, glow }) => (
        <g key={begin}>
          {glow && (
            <circle r={r * 3} fill="currentColor" fillOpacity="0.25" filter="url(#orbit-blur)">
              <animateMotion dur="11s" begin={begin} repeatCount="indefinite" path={ORBIT_PATH} />
            </circle>
          )}
          <circle r={r} className={className}>
            <animateMotion dur="11s" begin={begin} repeatCount="indefinite" path={ORBIT_PATH} />
          </circle>
        </g>
      ))}
    </g>
  )
}

const layer =
  'pointer-events-none absolute -inset-[12%] h-[124%] w-[124%] overflow-visible text-primary'

/** Fica atrás do canvas: anel tracejado girando, ondas de sonar e a órbita completa. */
export function EarthOrbitsBack() {
  return (
    <svg aria-hidden="true" viewBox="0 0 600 600" className={layer}>
      <defs>
        <filter id="orbit-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Ondas de sonar saindo da borda da Terra */}
      {[0, 1.5, 3].map((delay) => (
        <circle
          key={delay}
          cx={C}
          cy={C}
          r="194"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-sonar [transform-box:view-box] [transform-origin:300px_300px]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Anel tracejado girando devagar */}
      <g className="animate-orbit-spin [transform-box:view-box] [transform-origin:300px_300px]">
        <circle
          cx={C}
          cy={C}
          r="226"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="2 9"
        />
        <circle cx={C} cy={C - 226} r="3" className="fill-primary" />
      </g>
      <g className="animate-orbit-spin [animation-direction:reverse] [animation-duration:80s] [transform-box:view-box] [transform-origin:300px_300px]">
        <circle
          cx={C}
          cy={C}
          r="252"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeDasharray="40 14 4 14"
        />
      </g>

      <Orbit front={false} />
    </svg>
  )
}

/** Fica na frente do canvas: só a metade de baixo da órbita, que passa diante da Terra. */
export function EarthOrbitsFront() {
  return (
    <svg aria-hidden="true" viewBox="0 0 600 600" className={layer}>
      <defs>
        <clipPath id="orbit-front">
          <rect x="-100" y={C} width="800" height="400" />
        </clipPath>
      </defs>
      <Orbit front />
    </svg>
  )
}
