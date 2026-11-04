import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Magnetic } from '@/components/motion/magnetic'
import { PLATFORM_LABEL, SocialIcon } from '@/components/site/social-icon'
import { Tech } from '@/components/tech'
import { Button, ButtonArrow } from '@/components/ui/button'
import { getI18n } from '@/i18n/server'
import { media } from '@/lib/cms'
import type { Profile, Technology } from '@/payload-types'

import { HeroEarth } from './hero-earth'

// Posições dos chips flutuantes ao redor do globo (até 5).
// Ficam fora da faixa central, por onde o rótulo de Fortaleza passa ao girar.
const CHIP_POSITIONS = [
  'left-[14%] top-[4%]',
  'right-[2%] top-[1%]',
  '-right-[2%] top-[22%]',
  '-left-[2%] top-[22%]',
  'right-[6%] bottom-[6%]',
]

// As entradas do hero são CSS puro: começam no primeiro paint, sem esperar o JavaScript.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

function CodeWindow({ profile, stack }: { profile: Profile; stack: string[] }) {
  const str = (value: string) => <span className="text-[#f5c26b]">&quot;{value}&quot;</span>
  const key = (name: string) => <span className="text-[#cfcbc3]">{name}:</span>

  const lines: { indent?: boolean; content: ReactNode }[] = [
    {
      content: (
        <>
          <span className="text-[#ff8a5c]">const</span> developer{' '}
          <span className="text-[#8c8983]">=</span> {'{'}
        </>
      ),
    },
    {
      indent: true,
      content: (
        <>
          {key('name')} {str(profile.name)},
        </>
      ),
    },
    {
      indent: true,
      content: (
        <>
          {key('role')} {str(profile.headline)},
        </>
      ),
    },
  ]
  if (stack.length > 0) {
    lines.push({
      indent: true,
      content: (
        <>
          {key('stack')} [
          {stack.map((name, i) => (
            <span key={name}>
              {i > 0 && ', '}
              {str(name)}
            </span>
          ))}
          ],
        </>
      ),
    })
  }
  if (profile.location) {
    lines.push({
      indent: true,
      content: (
        <>
          {key('location')} {str(profile.location)}
        </>
      ),
    })
  }
  lines.push({ content: '};' })

  return (
    <div
      className="absolute bottom-0 left-0 z-10 w-[min(92%,340px)] sm:bottom-[2%] sm:w-[min(78%,340px)] rounded-card border border-[#6b2a10] bg-[rgb(20_17_15/0.82)] px-4 pt-3.5 pb-4 font-mono text-[11px] leading-[1.7] text-[#edeae3] shadow-[0_0_0_1px_rgb(255_90_31/0.15),0_24px_60px_-12px_rgb(255_90_31/0.35)] backdrop-blur-md motion-safe:animate-fade-up sm:text-xs"
      style={delay(450)}
    >
      <div aria-hidden="true" className="mb-3 flex gap-[7px]">
        <span className="size-2.5 rounded-full bg-[#ff5a1f]" />
        <span className="size-2.5 rounded-full bg-[#f5c26b]" />
        <span className="size-2.5 rounded-full bg-[#7fdbaa]" />
      </div>
      <pre className="m-0 font-mono break-words whitespace-pre-wrap">
        {lines.map((line, i) => (
          // Cada linha "digita" depois da anterior.
          <span
            key={i}
            className={`block motion-safe:animate-typing ${line.indent ? 'pl-5' : ''}`}
            style={delay(700 + i * 300)}
          >
            {line.content}
          </span>
        ))}
      </pre>
    </div>
  )
}

export async function Hero({ profile, heroTechs }: { profile: Profile; heroTechs: Technology[] }) {
  const { t, href } = await getI18n()
  const resume = media(profile.resume)
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section aria-labelledby="hero-titulo" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%_-10%_auto_30%] h-[900px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)] motion-safe:animate-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[420px] h-[260px] origin-top bg-[linear-gradient(color-mix(in_oklab,var(--primary)_10%,var(--background))_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--primary)_10%,var(--background))_1px,transparent_1px)] bg-size-[56px_56px] opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)] [transform:perspective(600px)_rotateX(62deg)]"
      />

      <div className="container-page relative grid items-center gap-12 pt-8 pb-12 lg:grid-cols-[1fr_1.05fr] lg:pt-16">
        <div className="flex min-w-0 flex-col gap-7">
          <span className="inline-flex items-center gap-2 self-start rounded-md border border-brand-soft bg-brand-soft/40 px-3 py-[7px] font-mono text-[13px] text-brand-ink motion-safe:animate-fade-up sm:text-sm">
            &gt; {profile.headline}
            <span
              aria-hidden="true"
              className="inline-block h-4 w-2 bg-primary motion-safe:animate-blink"
            />
          </span>

          <h1 id="hero-titulo" className="flex flex-col text-hero">
            <span className="inline-block origin-bottom-left motion-safe:animate-rise">
              {first}
            </span>
            <span
              className="inline-block origin-bottom-left motion-safe:animate-rise"
              style={delay(160)}
            >
              {rest.join(' ')}
              <span
                aria-hidden="true"
                className="ml-[0.04em] inline-block size-[0.17em] bg-primary"
              />
            </span>
          </h1>

          <p
            className="m-0 max-w-[520px] text-base leading-[1.55] text-foreground-soft motion-safe:animate-fade-up sm:text-[19px]"
            style={delay(350)}
          >
            {profile.intro}
          </p>

          <div
            className="flex flex-col gap-3 motion-safe:animate-fade-up sm:flex-row sm:flex-wrap"
            style={delay(480)}
          >
            <Magnetic>
              <Button asChild>
                <Link href={href('/#projects')}>
                  {t.hero.viewProjects}
                  <ButtonArrow>
                    <ArrowRight strokeWidth={2.2} />
                  </ButtonArrow>
                </Link>
              </Button>
            </Magnetic>
            {resume && (
              <Magnetic>
                <Button asChild variant="secondary">
                  <a href={resume.url!} download>
                    <Download />
                    {t.hero.downloadResume}
                  </a>
                </Button>
              </Magnetic>
            )}
          </div>

          {profile.socials && profile.socials.length > 0 && (
            <ul className="flex gap-1 motion-safe:animate-fade-up" style={delay(600)}>
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

        <div
          className="relative mx-auto aspect-[375/500] w-full max-w-[640px] min-w-0 motion-safe:animate-fade-up sm:aspect-[600/560]"
          style={delay(200)}
        >
          <HeroEarth place={profile.location || 'Fortaleza, CE'} />
          <CodeWindow
            profile={profile}
            stack={heroTechs.map((t) => (t.abbr === 'RN' ? 'RN' : t.name)).slice(0, 4)}
          />
          <ul className="contents">
            {heroTechs.slice(0, CHIP_POSITIONS.length).map((tech, i) => (
              <li
                key={tech.id}
                className={`absolute hidden motion-safe:animate-fade-up sm:block ${CHIP_POSITIONS[i]}`}
                style={delay(900 + i * 120)}
              >
                <span
                  className="block motion-safe:animate-float"
                  style={{ animationDelay: `${-i * 1.2}s` }}
                >
                  <Tech tech={tech} variant="float" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
