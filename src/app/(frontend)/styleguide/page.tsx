import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonArrow } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input, Label } from '@/components/ui/input'
import { Eyebrow, SectionLabel } from '@/components/ui/section-label'
import { TechChip } from '@/components/ui/tech-chip'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

const palette = [
  { token: 'background', className: 'bg-background border border-border' },
  { token: 'card', className: 'bg-card border border-border' },
  { token: 'muted', className: 'bg-muted' },
  { token: 'border', className: 'bg-border' },
  { token: 'border-strong', className: 'bg-border-strong' },
  { token: 'muted-foreground', className: 'bg-muted-foreground' },
  { token: 'foreground-soft', className: 'bg-foreground-soft' },
  { token: 'foreground', className: 'bg-foreground' },
  { token: 'primary', className: 'bg-primary' },
  { token: 'primary-deep', className: 'bg-primary-deep' },
  { token: 'brand-soft', className: 'bg-brand-soft' },
  { token: 'brand-ink', className: 'bg-brand-ink' },
  { token: 'success', className: 'bg-success' },
  { token: 'placeholder', className: 'bg-placeholder' },
  { token: 'destructive', className: 'bg-destructive' },
]

// Amostra: estes dados virão da coleção `technologies` no CMS.
const techs = [
  { name: 'React', icon: { abbr: 'Re', color: '#61dafb' } },
  { name: 'Next.js', icon: { abbr: 'N', appearance: 'outline' as const } },
  { name: 'TypeScript', icon: { abbr: 'TS', color: '#2f6fcf', appearance: 'solid' as const } },
  {
    name: 'JavaScript',
    icon: { abbr: 'JS', color: '#f0db4f', onColor: '#0b0a09', appearance: 'solid' as const },
  },
  { name: 'Tailwind CSS', icon: { abbr: 'Tw', color: '#38bdf8' } },
  { name: 'Node.js', icon: { abbr: 'No', color: '#5fa04e' } },
  { name: 'NestJS', icon: { abbr: 'Ne', color: '#ff4d6d' } },
  { name: 'PostgreSQL', icon: { abbr: 'Pg', color: '#6b9bd8' } },
  { name: 'Supabase', icon: { abbr: 'Sb', color: '#3ecf8e' } },
  { name: 'Figma', icon: { abbr: 'Fg', color: '#f2a6d2' } },
]

const motion = [
  {
    label: 'ease-out-expo',
    title: 'Entradas',
    body: 'cubic-bezier(0.22, 1, 0.36, 1), 700 ms, deslocamento de 24 px e stagger de 60 ms por item.',
  },
  {
    label: 'spring 300 / 30',
    title: 'Microinterações',
    body: 'Botões magnéticos, seta que avança 4 px no hover, cards que inclinam até 4°.',
  },
  {
    label: 'scroll-linked',
    title: 'Parallax e cenas',
    body: 'Globo 3D gira com o scroll; imagens de projeto sobem 8% mais devagar que o texto.',
  },
  {
    label: 'prefers-reduced-motion',
    title: 'Movimento reduzido',
    body: 'Só fades de 150 ms; globo vira imagem estática; cursor customizado desligado.',
  },
]

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-5">
      <h2 className="text-[15px] font-bold tracking-[-0.01em]">{title}</h2>
      {children}
    </section>
  )
}

function Spec({ children }: { children: ReactNode }) {
  return <span className="font-mono text-xs text-muted-foreground">{children}</span>
}

export default function StyleguidePage() {
  return (
    <main className="container-page flex flex-col gap-14 py-16 md:py-20">
      <header className="flex flex-wrap items-end justify-between gap-10 border-b border-border pb-10">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow text-muted-foreground">00 — Direção visual</span>
          <h1 className="text-display">Precisão calma.</h1>
          <p className="text-body-lg text-muted-foreground">
            Preto quente, branco-osso e um único laranja sinal para ação e destaque. Plus Jakarta
            Sans 800 nos títulos e DM Mono para tudo que é metadado de engenharia.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 sm:items-end">
          <ThemeToggle />
          <Logo markSize={64} subtitle="Software Engineer" />
        </div>
      </header>

      <div className="grid gap-14 lg:grid-cols-2">
        <Block title="Paleta">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {palette.map(({ token, className }) => (
              <div key={token} className="flex min-w-0 flex-col gap-2">
                <div className={`h-20 rounded-[10px] ${className}`} />
                <span className="truncate font-mono text-xs text-muted-foreground">{token}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Tipografia · Plus Jakarta Sans + DM Mono">
          <Card className="flex flex-col overflow-hidden">
            {[
              {
                el: (
                  <span className="text-[72px] leading-none font-extrabold tracking-[-0.045em]">
                    Display
                  </span>
                ),
                spec: '88–120 / 0.95 · 800',
              },
              { el: <span className="text-section">Título de seção</span>, spec: '32–56 · 800' },
              { el: <span className="text-card-title">Título de card</span>, spec: '28/34 · 800' },
              {
                el: (
                  <span className="text-body-lg text-muted-foreground">
                    Texto corrido para narrativas.
                  </span>
                ),
                spec: '18/29 · 400',
              },
              { el: <Eyebrow>02 — Experiência · 2024 → hoje</Eyebrow>, spec: 'DM Mono 13 · 500' },
              { el: <SectionLabel>Sobre mim</SectionLabel>, spec: 'Jakarta 13 · 800 · +16%' },
            ].map(({ el, spec }) => (
              <div
                key={spec}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border-subtle px-6 py-5 last:border-b-0"
              >
                {el}
                <Spec>{spec}</Spec>
              </div>
            ))}
          </Card>
        </Block>

        <Block title="Componentes">
          <Card className="flex flex-col gap-7 p-7">
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                Ver projetos
                <ButtonArrow>
                  <ArrowRight strokeWidth={2.2} />
                </ButtonArrow>
              </Button>
              <Button variant="secondary">
                <Download />
                Baixar currículo
              </Button>
              <Button size="md">
                Contato
                <ButtonArrow>
                  <ArrowUpRight strokeWidth={2.4} />
                </ButtonArrow>
              </Button>
              <Button variant="link" asChild>
                <a href="#">
                  Ler case study
                  <ButtonArrow>→</ButtonArrow>
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>React Native</Badge>
              <Badge>Next.js</Badge>
              <Badge variant="brand">Em produção</Badge>
              <Badge variant="success">Disponível</Badge>
              <Badge variant="placeholder">[Placeholder]</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="sg-email">E-mail</Label>
              <Input id="sg-email" type="email" placeholder="voce@empresa.com" />
            </div>
          </Card>
        </Block>

        <Block title="Tecnologias">
          <Card className="flex flex-col gap-7 p-7">
            <ul className="flex flex-wrap gap-2.5">
              {techs.map(({ name, icon }) => (
                <li key={name}>
                  <TechChip name={name} icon={icon} />
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <TechChip variant="float" name="React" icon={techs[0].icon} />
              <TechChip variant="float" name="TypeScript" icon={techs[2].icon} />
            </div>
            <div className="flex flex-wrap gap-2">
              <TechChip variant="tag" name="React Native" />
              <TechChip variant="tag" name="IA" />
              <TechChip variant="tag" name="Google OAuth" />
            </div>
          </Card>
        </Block>

        <Block title="Movimento">
          <div className="grid gap-3 sm:grid-cols-2">
            {motion.map(({ label, title, body }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-card border border-border p-5"
              >
                <span className="font-mono text-xs text-brand-ink">{label}</span>
                <span className="text-[15px] font-bold">{title}</span>
                <span className="text-sm leading-[1.55] text-muted-foreground">{body}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Grid">
          <div className="flex flex-col gap-2.5 rounded-card border border-border p-5">
            <div className="grid h-12 grid-cols-12 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="rounded bg-brand-soft" />
              ))}
            </div>
            <Spec>
              12 colunas · gutter 24 · margem 80 (desktop) / 16 (mobile) · seções a cada 160 px ·
              base de 4 px
            </Spec>
          </div>
        </Block>
      </div>
    </main>
  )
}
