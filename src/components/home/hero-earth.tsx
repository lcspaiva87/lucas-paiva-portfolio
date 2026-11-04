'use client'

import type { COBEOptions, Globe } from 'cobe'
import { useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { useI18n } from '@/i18n/client'
import { cn } from '@/lib/utils'

import { EarthOrbitsBack, EarthOrbitsFront } from './earth-orbits'
import { HeroGlobe } from './hero-globe'

type LatLon = [number, number]

const HOME: LatLon = [-3.7319, -38.5267] // Fortaleza, CE

// "Do Ceará para o mundo": arcos saindo de Fortaleza.
const DESTINATIONS: { id: string; location: LatLon }[] = [
  { id: 'sao-paulo', location: [-23.5505, -46.6333] },
  { id: 'lisboa', location: [38.7223, -9.1393] },
  { id: 'londres', location: [51.5072, -0.1276] },
  { id: 'berlim', location: [52.52, 13.405] },
  { id: 'nova-york', location: [40.7128, -74.006] },
  { id: 'sao-francisco', location: [37.7749, -122.4194] },
  { id: 'toronto', location: [43.6532, -79.3832] },
  { id: 'toquio', location: [35.6762, 139.6503] },
]

// Ângulos que deixam um ponto de frente para a câmera.
const facing = ([lat, lon]: LatLon) => ({
  phi: Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2),
  theta: (lat * Math.PI) / 180,
})

// Começa com Fortaleza um pouco à direita do centro; a rotação a traz para o meio.
const START = { ...facing(HOME), phi: facing(HOME).phi + 0.35 }
const BASE_THETA = 0.06
const AUTO_SPEED = 0.0018

type Rgb = [number, number, number]

const PALETTE: Record<
  'dark' | 'light',
  Pick<COBEOptions, 'dark' | 'diffuse' | 'mapBrightness' | 'mapBaseBrightness'> & {
    base: Rgb
    marker: Rgb
    glow: Rgb
    arc: Rgb
  }
> = {
  dark: {
    dark: 1,
    diffuse: 1.4,
    mapBrightness: 7,
    mapBaseBrightness: 0.02,
    base: [0.32, 0.14, 0.07],
    marker: [1, 0.42, 0.18],
    glow: [0.55, 0.2, 0.08],
    arc: [1, 0.48, 0.24],
  },
  light: {
    dark: 0,
    diffuse: 1.6,
    mapBrightness: 3,
    mapBaseBrightness: 0,
    base: [1, 0.93, 0.89],
    marker: [0.91, 0.28, 0.06],
    glow: [1, 0.86, 0.78],
    arc: [0.91, 0.32, 0.1],
  },
}

function themeOptions(theme: 'dark' | 'light'): Partial<COBEOptions> {
  const p = PALETTE[theme]
  return {
    dark: p.dark,
    diffuse: p.diffuse,
    mapBrightness: p.mapBrightness,
    mapBaseBrightness: p.mapBaseBrightness,
    baseColor: p.base,
    markerColor: p.marker,
    glowColor: p.glow,
    arcColor: p.arc,
  }
}

/**
 * Terra em WebGL (cobe): continentes em pontos, Fortaleza em destaque e arcos
 * para o mundo. Gira sozinha, acelera com o scroll e pode ser arrastada.
 * Até carregar (ou sem WebGL, ou com "reduzir movimento") mostra o globo em SVG.
 */
export function HeroEarth({ place }: { place: string }) {
  const { t } = useI18n()
  const squareRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<Globe | null>(null)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const theme: 'dark' | 'light' = resolvedTheme === 'light' ? 'light' : 'dark'
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
    globeRef.current?.update(themeOptions(theme))
  }, [theme])

  useEffect(() => {
    const square = squareRef.current
    const canvas = canvasRef.current
    if (!square || !canvas || reduced) return

    let cancelled = false
    let frame = 0
    let visible = true
    let size = square.offsetWidth

    // Estado da rotação: automática + arraste com inércia + empurrão do scroll.
    let phi = START.phi
    let theta = BASE_THETA
    let velocity = 0
    let dragging: { x: number; y: number } | null = null
    let lastScroll = window.scrollY

    const onPointerDown = (e: PointerEvent) => {
      dragging = { x: e.clientX, y: e.clientY }
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - dragging.x
      const dy = e.clientY - dragging.y
      dragging = { x: e.clientX, y: e.clientY }
      velocity = dx / 220
      phi += velocity
      theta = Math.max(-0.6, Math.min(0.9, theta + dy / 400))
    }
    const onPointerUp = () => {
      dragging = null
      canvas.style.cursor = 'grab'
    }
    const onScroll = () => {
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      velocity += delta / 4000
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    const ro = new ResizeObserver(() => {
      size = square.offsetWidth
      globeRef.current?.update({ width: size, height: size })
    })

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const globe = globeRef.current
      if (!globe || !visible || document.hidden) return

      if (!dragging) {
        velocity *= 0.94 // inércia
        phi += AUTO_SPEED + velocity
        // Volta suavemente para a inclinação padrão, somada ao quanto a página rolou.
        const target = BASE_THETA + Math.min(window.scrollY / 2500, 0.35)
        theta += (target - theta) * 0.04
      }
      globe.update({ phi, theta })

      // Rótulo de Fortaleza acompanha o marcador (posição publicada pelo cobe).
      const anchor = square.querySelector<HTMLElement>('[data-cobe-home]')
      const label = labelRef.current
      if (anchor && label) {
        label.style.left = anchor.style.left
        label.style.top = anchor.style.top
      }
    }

    import('cobe').then(({ default: createGlobe }) => {
      if (cancelled) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size,
        height: size,
        phi,
        theta,
        scale: 1,
        mapSamples: 20000,
        markers: [
          { location: HOME, size: 0.09, id: 'home' },
          ...DESTINATIONS.map((d) => ({ location: d.location, size: 0.035, id: d.id })),
        ],
        arcs: DESTINATIONS.map((d) => ({ from: HOME, to: d.location, id: d.id })),
        arcWidth: 0.6,
        arcHeight: 0.28,
        markerElevation: 0.015,
        ...themeOptions(themeRef.current),
      } as COBEOptions)
      globeRef.current = globe

      // O cobe cria um <div> com anchor-name para cada marcador; marcamos o de Fortaleza.
      requestAnimationFrame(() => {
        const homeAnchor = [...square.querySelectorAll<HTMLElement>('div')].find((el) =>
          el.style.cssText.includes('--cobe-home'),
        )
        homeAnchor?.setAttribute('data-cobe-home', '')
        setReady(true)
      })

      io.observe(square)
      ro.observe(square)
      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerup', onPointerUp)
      canvas.addEventListener('pointercancel', onPointerUp)
      window.addEventListener('scroll', onScroll, { passive: true })
      frame = requestAnimationFrame(tick)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      globeRef.current?.destroy()
      globeRef.current = null
      setReady(false)
    }
  }, [reduced])

  return (
    <div className="absolute inset-0">
      {/* Reserva: globo SVG até o WebGL ficar pronto */}
      <div
        aria-hidden={ready}
        className={cn(
          'absolute inset-x-0 top-0 aspect-[600/520] transition-opacity duration-700 sm:inset-0 sm:aspect-auto',
          ready && 'opacity-0',
        )}
      >
        <HeroGlobe />
      </div>

      <div
        ref={squareRef}
        className={cn(
          'absolute top-0 left-1/2 aspect-square w-[min(100%,560px)] -translate-x-1/2 transition-[opacity,scale] duration-1000 ease-out-expo sm:top-1/2 sm:-translate-y-1/2',
          ready ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        )}
      >
        {ready && <EarthOrbitsBack />}
        {/* Atmosfera atrás da Terra */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_38%,transparent),transparent)] blur-2xl motion-safe:animate-glow"
        />
        {/* O cobe envolve o canvas num <div> próprio; este container isola isso do React. */}
        <div className="relative size-full">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t.hero.globeLabel}
            className="size-full cursor-grab touch-pan-y"
          />
        </div>
        {ready && <EarthOrbitsFront />}
        <div
          ref={labelRef}
          aria-hidden="true"
          className="pointer-events-none absolute -translate-x-1/2 transition-opacity duration-300"
          style={{ opacity: 'var(--cobe-visible-home, 0)' }}
        >
          <span className="absolute top-0 left-1/2 size-3 -translate-1/2 rounded-full bg-primary shadow-[0_0_16px_4px_color-mix(in_oklab,var(--primary)_70%,transparent)]" />
          {[0, 0.9].map((delay) => (
            <span
              key={delay}
              className="absolute top-0 left-1/2 size-3 -translate-1/2 rounded-full border-2 border-primary motion-safe:animate-ring"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[#6b2a10] bg-[rgb(20_17_15/0.9)] px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-[#ff8a5c] shadow-[0_8px_24px_-8px_rgb(255_90_31/0.5)]">
            {place}
          </span>
        </div>
      </div>
    </div>
  )
}
