import type { Locale } from '@/i18n/config'
import type { TechIconName } from '@/lib/tech-icon-options'

/**
 * Conteúdo inicial, tirado do design (canvas "Portfólio Lucas Paiva").
 * Campos que o design deixou como placeholder ficam vazios para preencher no painel.
 * Textos traduzíveis usam `l(português, inglês)`; `pick()` escolhe um dos idiomas.
 */

type L = { readonly pt: string; readonly en: string; readonly localized: true }

const l = (pt: string, en: string = pt): L => ({ pt, en, localized: true })

const isL = (value: unknown): value is L =>
  typeof value === 'object' && value !== null && 'localized' in value

export type Picked<T> = T extends L
  ? string
  : T extends readonly (infer U)[]
    ? Picked<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: Picked<T[K]> }
      : T

/** Troca cada `l(pt, en)` pelo texto do idioma. */
export function pick<T>(value: T, locale: Locale): Picked<T> {
  if (isL(value)) return value[locale] as Picked<T>
  if (Array.isArray(value)) return value.map((item) => pick(item, locale)) as Picked<T>
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, pick(item, locale)]),
    ) as Picked<T>
  }
  return value as Picked<T>
}

type TechSeed = {
  name: string | L
  icon?: TechIconName
  abbr: string
  group: 'frontend' | 'backend' | 'mobile' | 'data' | 'tools' | 'other'
  appearance: 'tint' | 'solid' | 'outline' | 'neutral'
  color?: string
  onColor?: string
  showInHero?: boolean
  showInStack?: boolean
}

export const technologies: TechSeed[] = [
  {
    name: 'React',
    icon: 'react',
    abbr: 'Re',
    group: 'frontend',
    appearance: 'tint',
    color: '#7FD8F0',
    showInHero: true,
  },
  {
    name: 'Next.js',
    icon: 'nextdotjs',
    abbr: 'N',
    group: 'frontend',
    appearance: 'outline',
    showInHero: true,
  },
  {
    name: 'TypeScript',
    icon: 'typescript',
    abbr: 'TS',
    group: 'frontend',
    appearance: 'solid',
    color: '#2F6FCF',
    onColor: '#FFFFFF',
    showInHero: true,
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    abbr: 'JS',
    group: 'frontend',
    appearance: 'solid',
    color: '#F0DB4F',
    onColor: '#0B0A09',
  },
  {
    name: 'Tailwind CSS',
    icon: 'tailwindcss',
    abbr: 'Tw',
    group: 'frontend',
    appearance: 'tint',
    color: '#38BDF8',
  },
  { name: 'shadcn/ui', icon: 'shadcnui', abbr: '//', group: 'frontend', appearance: 'neutral' },
  {
    name: 'React Query',
    icon: 'reactquery',
    abbr: 'RQ',
    group: 'frontend',
    appearance: 'tint',
    color: '#FF6B8A',
  },
  {
    name: 'Zustand',
    icon: 'generic-state',
    abbr: 'Zu',
    group: 'frontend',
    appearance: 'tint',
    color: '#E8A657',
  },
  {
    name: 'Figma',
    icon: 'figma',
    abbr: 'Fg',
    group: 'frontend',
    appearance: 'tint',
    color: '#F2A6D2',
  },

  {
    name: 'Node.js',
    icon: 'nodedotjs',
    abbr: 'No',
    group: 'backend',
    appearance: 'tint',
    color: '#8FE0A0',
    showInHero: true,
  },
  {
    name: 'NestJS',
    icon: 'nestjs',
    abbr: 'Ne',
    group: 'backend',
    appearance: 'tint',
    color: '#FF6B83',
  },
  {
    name: l('API REST', 'REST API'),
    icon: 'generic-api',
    abbr: '{}',
    group: 'backend',
    appearance: 'neutral',
  },
  { name: 'OpenAI API', icon: 'generic-ai', abbr: 'AI', group: 'backend', appearance: 'neutral' },

  {
    name: 'React Native',
    icon: 'react',
    abbr: 'RN',
    group: 'mobile',
    appearance: 'tint',
    color: '#7FD8F0',
    showInHero: true,
  },
  { name: 'Expo', icon: 'expo', abbr: 'Ex', group: 'mobile', appearance: 'neutral' },
  {
    name: 'Google Play',
    icon: 'googleplay',
    abbr: '▶',
    group: 'mobile',
    appearance: 'tint',
    color: '#7FDBAA',
  },
  {
    name: 'App Store',
    icon: 'appstore',
    abbr: 'A',
    group: 'mobile',
    appearance: 'tint',
    color: '#5AA9FF',
  },

  {
    name: 'PostgreSQL',
    icon: 'postgresql',
    abbr: 'Pg',
    group: 'data',
    appearance: 'tint',
    color: '#8FB4EA',
  },
  { name: 'MySQL', icon: 'mysql', abbr: 'My', group: 'data', appearance: 'tint', color: '#5FB8D4' },
  { name: 'Prisma', icon: 'prisma', abbr: 'Pr', group: 'data', appearance: 'neutral' },
  {
    name: 'Supabase',
    icon: 'supabase',
    abbr: 'Sb',
    group: 'data',
    appearance: 'tint',
    color: '#3ECF8E',
  },

  {
    name: 'Electron',
    icon: 'electron',
    abbr: 'El',
    group: 'tools',
    appearance: 'tint',
    color: '#9FEAF9',
  },
  { name: 'GitHub', icon: 'github', abbr: 'Gh', group: 'tools', appearance: 'neutral' },
  { name: 'Vercel', icon: 'vercel', abbr: '▲', group: 'tools', appearance: 'neutral' },
  {
    name: 'Docker',
    icon: 'docker',
    abbr: 'Dk',
    group: 'tools',
    appearance: 'tint',
    color: '#4BA3F5',
  },

  // Só aparecem como tag nos projetos.
  {
    name: l('IA', 'AI'),
    icon: 'generic-ai',
    abbr: 'IA',
    group: 'other',
    appearance: 'neutral',
    showInStack: false,
  },
  {
    name: 'Google OAuth',
    icon: 'google',
    abbr: 'G',
    group: 'other',
    appearance: 'neutral',
    showInStack: false,
  },
]

type Column = { label: L; heading: L; body: L[] }

export const projects = [
  {
    title: 'LuvePet',
    slug: 'luvepet',
    category: 'mobile',
    stage: 'production',
    featured: true,
    glyph: 'heart',
    tagline: l(
      'Gestão completa da saúde do seu pet: vacinas, exames, histórico e lembretes.',
      'Complete health tracking for your pet: vaccines, exams, history and reminders.',
    ),
    technologies: ['React Native', 'Figma'],
  },
  {
    title: 'CalorieUp',
    slug: 'calorieup',
    category: 'mobile',
    stage: 'production',
    featured: true,
    glyph: 'flame',
    tagline: l(
      'Fotografe o prato e a IA calcula as calorias. Publicado na Google Play.',
      'Snap your plate and AI counts the calories. Live on Google Play.',
    ),
    technologies: ['React Native', 'IA', 'Google OAuth'],
    summary: l(
      'Fotografe o prato e a IA calcula as calorias. Um app para acompanhar a alimentação sem pesar e sem digitar, publicado na Google Play.',
      'Snap your plate and AI counts the calories. An app for tracking what you eat without weighing or typing anything, live on Google Play.',
    ),
    platform: l('Android · Google Play'),
    links: [
      {
        kind: 'play-store',
        label: l('Ver na Google Play', 'Get it on Google Play'),
        url: 'https://play.google.com/store/apps/details?id=com.calorieup.ap',
      },
    ],
    caseStudy: {
      columns: [
        {
          label: l('O problema', 'The problem'),
          heading: l(
            'Contar calorias na mão é atrito demais para um hábito diário.',
            'Counting calories by hand is too much friction for a daily habit.',
          ),
          body: [
            l(
              'Pesar a comida, procurar cada alimento numa base de dados e digitar porções transforma cada refeição em trabalho.',
              'Weighing food, looking up every item in a database and typing in portions turns every meal into a chore.',
            ),
          ],
        },
        {
          label: l('A solução', 'The solution'),
          heading: l('Uma foto no lugar do formulário.', 'A photo instead of a form.'),
          body: [
            l(
              'O usuário fotografa o prato e a IA estima as calorias. O registro vai para o diário em segundos, sem balança e sem busca manual.',
              'You snap the plate and the AI estimates the calories. The entry lands in your diary in seconds, with no scale and no manual search.',
            ),
          ],
        },
      ] satisfies Column[],
      featuresLabel: l('Principais funcionalidades', 'Key features'),
      features: [
        {
          icon: 'camera',
          title: l('Fotografe o prato', 'Snap your plate'),
          description: l(
            'Registro de refeição a partir da câmera.',
            'Log a meal straight from the camera.',
          ),
        },
        {
          icon: 'sparkles',
          title: l('IA calcula as calorias', 'AI counts the calories'),
          description: l(
            'Estimativa automática a partir da imagem.',
            'Automatic estimate from the photo.',
          ),
        },
        {
          icon: 'lock',
          title: l('Login com Google', 'Sign in with Google'),
          description: l(
            'OAuth configurado para Android, iOS e web.',
            'OAuth set up for Android, iOS and web.',
          ),
        },
        {
          icon: 'crown',
          title: l('Assinatura Premium', 'Premium subscription'),
          description: l(
            'Planos mensal e anual dentro do app.',
            'Monthly and yearly plans inside the app.',
          ),
        },
      ],
      challengesLabel: l('Desafios técnicos', 'Technical challenges'),
      challengesHeading: l('O que deu trabalho', 'The hard parts'),
      challenges: [
        l('Autenticação com Google em três plataformas', 'Google sign-in across three platforms'),
        l('Da foto ao número', 'From photo to number'),
        l('Publicação e assinaturas', 'Publishing and subscriptions'),
      ],
    },
  },
  {
    title: 'Scalar Workspace',
    slug: 'scalar-workspace',
    category: 'saas',
    stage: 'production',
    featured: true,
    glyph: 'layers',
    tagline: l(
      'Gestão de equipes, escalas 5x2 e operação, com foco em produtividade.',
      'Team management, 5x2 shift scheduling and operations, built for productivity.',
    ),
    technologies: ['shadcn/ui', 'NestJS', 'Prisma'],
  },
] as const

export const experiences = [
  {
    kind: 'work',
    organization: 'Adapta',
    title: l('Software Engineer · Front-end & Mobile'),
    startDate: '2024-02-01',
    summary: l(
      'Desenvolvo produtos SaaS e plataformas de inteligência artificial usados por pessoas e empresas, no produto web e no aplicativo mobile: interfaces, integrações com APIs e funcionalidades de ponta a ponta.',
      'I build SaaS products and artificial intelligence platforms used by people and companies, on both the web product and the mobile app: interfaces, API integrations and end-to-end features.',
    ),
    responsibilities: [
      l('Interfaces web e mobile para produtos de IA', 'Web and mobile interfaces for AI products'),
      l('Integrações com APIs e serviços externos', 'Integrations with APIs and external services'),
      l('Funcionalidades voltadas a usuários e empresas', 'Features for end users and businesses'),
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'React Native'],
  },
  {
    kind: 'education',
    title: l('Sistemas de Informação', 'Information Systems'),
    endDate: '2026-03-01',
    summary: l('Em andamento: Cibersegurança na FIAP.', 'In progress: Cybersecurity at FIAP.'),
    technologies: [],
  },
] as const

export const profile = {
  name: 'Lucas Paiva',
  role: l('Software Engineer'),
  headline: l('Desenvolvedor Full-Stack', 'Full-Stack Developer'),
  intro: l(
    'Desenvolvo produtos digitais completos, do conceito à entrega, com foco em performance, experiência e impacto real no usuário.',
    'I build complete digital products, from concept to launch, with a focus on performance, experience and real impact for users.',
  ),
  location: l('Fortaleza, CE', 'Fortaleza, Brazil'),
  stats: [
    {
      value: l('6+ anos', '6+ years'),
      label: l('em desenvolvimento', 'building software'),
      accent: true,
    },
    { value: l('10+ produtos', '10+ products'), label: l('entregues', 'shipped'), accent: true },
    {
      value: l('Apps em produção', 'Apps in production'),
      label: l('Android e iOS', 'Android and iOS'),
      accent: false,
    },
    {
      value: l('Escala', 'Scale'),
      label: l('AWS e arquitetura', 'AWS and architecture'),
      accent: false,
    },
  ],
  aboutHeading: l('Do Ceará para o *mundo.*', 'From Ceará to the *world.*'),
  aboutBody: l(
    'Sou engenheiro de software, apaixonado por transformar ideias em produtos reais. Atuo com desenvolvimento full-stack, com foco em front-end e mobile, unindo tecnologia, produto e experiência do usuário.',
    "I'm a software engineer who loves turning ideas into real products. I work across the full stack, focused on front-end and mobile, bringing together technology, product and user experience.",
  ),
  facts: [
    { icon: 'map-pin', text: l('Fortaleza, CE', 'Fortaleza, Brazil') },
    {
      icon: 'graduation-cap',
      text: l('Bacharel em SI', 'B.S. in Information Systems'),
      detail: l('(Concl. mar/2026)', '(Class of 2026)'),
    },
    {
      icon: 'laptop',
      text: l('Disponível para oportunidades remotas', 'Open to remote opportunities'),
    },
  ],
  projectsHeading: l('Produtos que eu *construí.*', 'Products I *built.*'),
  experienceHeading: l('Trajetória.', 'Journey.'),
  stackHeading: l('Com o que eu *construo.*', 'What I *build with.*'),
  stackIntro: l(
    'Tecnologias e ferramentas que utilizo no dia a dia para transformar ideias em produtos escaláveis e de alta qualidade.',
    'Technologies and tools I use every day to turn ideas into scalable, high-quality products.',
  ),
  contactHeading: l('Tem um produto para tirar do *papel?*', 'Got a product to *bring to life?*'),
  available: true,
  availabilityText: l('Disponível para oportunidades remotas', 'Open to remote opportunities'),
  socials: [{ platform: 'github', url: 'https://github.com/lcspaiva87' }],
} as const

/** Perfil padrão no idioma pedido (banco recém-criado, sem perfil salvo). */
export const profileFor = (locale: Locale) => pick(profile, locale)
