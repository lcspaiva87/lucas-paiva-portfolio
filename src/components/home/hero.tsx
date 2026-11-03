import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

import { PLATFORM_LABEL, SocialIcon } from '@/components/site/social-icon'
import { Tech } from '@/components/tech'
import { Button, ButtonArrow } from '@/components/ui/button'
import { media } from '@/lib/cms'
import type { Profile, Technology } from '@/payload-types'

// Posições dos chips flutuantes ao redor do globo (até 5).
const CHIP_POSITIONS = [
  'left-[14%] top-[4%]',
  'right-[2%] top-[1%]',
  '-right-[2%] top-[40%]',
  'left-[6%] top-[58%]',
  'right-[8%] bottom-[8%]',
]

function Globe() {
  return (
    <svg
      viewBox="0 0 600 520"
      className="h-full w-full text-primary"
      role="img"
      aria-label="Globo de pontos com as principais tecnologias orbitando"
    >
      <defs>
        <pattern id="hero-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
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
      <circle cx="300" cy="260" r="270" fill="url(#hero-halo)" />
      <circle cx="300" cy="260" r="210" className="fill-[#140c08] light:fill-card" />
      <rect
        x="90"
        y="50"
        width="420"
        height="420"
        fill="url(#hero-dots)"
        mask="url(#hero-sphere)"
      />
      {[150, 90, 30].map((rx) => (
        <ellipse
          key={rx}
          cx="300"
          cy="260"
          rx={rx}
          ry="210"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
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
      <ellipse
        cx="300"
        cy="260"
        rx="292"
        ry="96"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="1.5"
        transform="rotate(-16 300 260)"
      />
    </svg>
  )
}

function CodeWindow({ profile, stack }: { profile: Profile; stack: string[] }) {
  const str = (value: string) => <span className="text-[#f5c26b]">&quot;{value}&quot;</span>
  return (
    <div className="absolute top-[48%] left-1/2 w-[min(86%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-card border border-[#6b2a10] bg-[rgb(20_17_15/0.9)] px-5 pt-4 pb-5 font-mono text-[11px] leading-[1.75] text-[#edeae3] shadow-[0_0_0_1px_rgb(255_90_31/0.15),0_24px_60px_-12px_rgb(255_90_31/0.35)] sm:text-[13px]">
      <div aria-hidden="true" className="mb-3 flex gap-[7px]">
        <span className="size-2.5 rounded-full bg-[#ff5a1f]" />
        <span className="size-2.5 rounded-full bg-[#f5c26b]" />
        <span className="size-2.5 rounded-full bg-[#7fdbaa]" />
      </div>
      <pre className="m-0 font-mono break-words whitespace-pre-wrap">
        <span className="text-[#ff8a5c]">const</span> developer{' '}
        <span className="text-[#8c8983]">=</span> {'{\n'}
        {'  '}
        <span className="text-[#cfcbc3]">name:</span> {str(profile.name)},{'\n'}
        {'  '}
        <span className="text-[#cfcbc3]">role:</span> {str(profile.headline)},{'\n'}
        {stack.length > 0 && (
          <>
            {'  '}
            <span className="text-[#cfcbc3]">stack:</span> [
            {stack.map((name, i) => (
              <span key={name}>
                {i > 0 && ', '}
                {str(name)}
              </span>
            ))}
            ],{'\n'}
          </>
        )}
        {profile.location && (
          <>
            {'  '}
            <span className="text-[#cfcbc3]">location:</span> {str(profile.location)}
            {'\n'}
          </>
        )}
        {'};'}
      </pre>
    </div>
  )
}

export function Hero({ profile, heroTechs }: { profile: Profile; heroTechs: Technology[] }) {
  const resume = media(profile.resume)
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section aria-labelledby="hero-titulo" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%_-10%_auto_30%] h-[900px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[420px] h-[260px] origin-top bg-[linear-gradient(color-mix(in_oklab,var(--primary)_10%,var(--background))_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--primary)_10%,var(--background))_1px,transparent_1px)] bg-size-[56px_56px] opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)] [transform:perspective(600px)_rotateX(62deg)]"
      />

      <div className="container-page relative grid items-center gap-12 pt-8 pb-12 lg:grid-cols-[1fr_1.05fr] lg:pt-16">
        <div className="flex min-w-0 flex-col gap-7">
          <span className="inline-flex items-center gap-2 self-start rounded-md border border-brand-soft bg-brand-soft/40 px-3 py-[7px] font-mono text-[13px] text-brand-ink sm:text-sm">
            &gt; {profile.headline}
            <span
              aria-hidden="true"
              className="inline-block h-4 w-2 bg-primary motion-safe:animate-blink"
            />
          </span>

          <h1 id="hero-titulo" className="flex flex-col text-hero">
            <span>{first}</span>
            <span>
              {rest.join(' ')}
              <span
                aria-hidden="true"
                className="ml-[0.04em] inline-block size-[0.17em] bg-primary"
              />
            </span>
          </h1>

          <p className="m-0 max-w-[520px] text-base leading-[1.55] text-foreground-soft sm:text-[19px]">
            {profile.intro}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/#projetos">
                Ver projetos
                <ButtonArrow>
                  <ArrowRight strokeWidth={2.2} />
                </ButtonArrow>
              </Link>
            </Button>
            {resume && (
              <Button asChild variant="secondary">
                <a href={resume.url!} download>
                  <Download />
                  Baixar currículo
                </a>
              </Button>
            )}
          </div>

          {profile.socials && profile.socials.length > 0 && (
            <ul className="flex gap-1">
              {profile.socials.map(({ id, platform, url }) => (
                <li key={id ?? url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={PLATFORM_LABEL[platform]}
                    className="flex size-11 items-center justify-center rounded-lg text-foreground-soft transition-[color,translate] duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <SocialIcon platform={platform} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative mx-auto aspect-[600/560] w-full max-w-[640px] min-w-0">
          <Globe />
          <CodeWindow
            profile={profile}
            stack={heroTechs.map((t) => (t.abbr === 'RN' ? 'RN' : t.name)).slice(0, 4)}
          />
          <ul className="contents">
            {heroTechs.slice(0, CHIP_POSITIONS.length).map((tech, i) => (
              <li
                key={tech.id}
                className={`absolute hidden sm:block motion-safe:animate-float ${CHIP_POSITIONS[i]}`}
                style={{ animationDelay: `${-i * 1.2}s` }}
              >
                <Tech tech={tech} variant="float" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
