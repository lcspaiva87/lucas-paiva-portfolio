/**
 * Conteúdo inicial, tirado do design (canvas "Portfólio Lucas Paiva").
 * Campos que o design deixou como placeholder ficam vazios para preencher no painel.
 */

type TechSeed = {
  name: string
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
    abbr: 'Re',
    group: 'frontend',
    appearance: 'tint',
    color: '#7FD8F0',
    showInHero: true,
  },
  { name: 'Next.js', abbr: 'N', group: 'frontend', appearance: 'outline', showInHero: true },
  {
    name: 'TypeScript',
    abbr: 'TS',
    group: 'frontend',
    appearance: 'solid',
    color: '#2F6FCF',
    onColor: '#FFFFFF',
    showInHero: true,
  },
  {
    name: 'JavaScript',
    abbr: 'JS',
    group: 'frontend',
    appearance: 'solid',
    color: '#F0DB4F',
    onColor: '#0B0A09',
  },
  { name: 'Tailwind CSS', abbr: 'Tw', group: 'frontend', appearance: 'tint', color: '#38BDF8' },
  { name: 'shadcn/ui', abbr: '//', group: 'frontend', appearance: 'neutral' },
  { name: 'React Query', abbr: 'RQ', group: 'frontend', appearance: 'tint', color: '#FF6B8A' },
  { name: 'Zustand', abbr: 'Zu', group: 'frontend', appearance: 'tint', color: '#E8A657' },
  { name: 'Figma', abbr: 'Fg', group: 'frontend', appearance: 'tint', color: '#F2A6D2' },

  {
    name: 'Node.js',
    abbr: 'No',
    group: 'backend',
    appearance: 'tint',
    color: '#8FE0A0',
    showInHero: true,
  },
  { name: 'NestJS', abbr: 'Ne', group: 'backend', appearance: 'tint', color: '#FF6B83' },
  { name: 'API REST', abbr: '{}', group: 'backend', appearance: 'neutral' },
  { name: 'OpenAI API', abbr: 'AI', group: 'backend', appearance: 'neutral' },

  {
    name: 'React Native',
    abbr: 'RN',
    group: 'mobile',
    appearance: 'tint',
    color: '#7FD8F0',
    showInHero: true,
  },
  { name: 'Expo', abbr: 'Ex', group: 'mobile', appearance: 'neutral' },
  { name: 'Google Play', abbr: '▶', group: 'mobile', appearance: 'tint', color: '#7FDBAA' },
  { name: 'App Store', abbr: 'A', group: 'mobile', appearance: 'tint', color: '#5AA9FF' },

  { name: 'PostgreSQL', abbr: 'Pg', group: 'data', appearance: 'tint', color: '#8FB4EA' },
  { name: 'MySQL', abbr: 'My', group: 'data', appearance: 'tint', color: '#5FB8D4' },
  { name: 'Prisma', abbr: 'Pr', group: 'data', appearance: 'neutral' },
  { name: 'Supabase', abbr: 'Sb', group: 'data', appearance: 'tint', color: '#3ECF8E' },

  { name: 'Electron', abbr: 'El', group: 'tools', appearance: 'tint', color: '#9FEAF9' },
  { name: 'GitHub', abbr: 'Gh', group: 'tools', appearance: 'neutral' },
  { name: 'Vercel', abbr: '▲', group: 'tools', appearance: 'neutral' },
  { name: 'Docker', abbr: 'Dk', group: 'tools', appearance: 'tint', color: '#4BA3F5' },

  // Só aparecem como tag nos projetos.
  { name: 'IA', abbr: 'IA', group: 'other', appearance: 'neutral', showInStack: false },
  { name: 'Google OAuth', abbr: 'G', group: 'other', appearance: 'neutral', showInStack: false },
]

type Column = { label: string; heading: string; body: string[] }

export const projects = [
  {
    title: 'LuvePet',
    slug: 'luvepet',
    category: 'mobile',
    stage: 'production',
    featured: true,
    glyph: 'heart',
    tagline: 'Gestão completa da saúde do seu pet: vacinas, exames, histórico e lembretes.',
    technologies: ['React Native', 'Figma'],
  },
  {
    title: 'CalorieUp',
    slug: 'calorieup',
    category: 'mobile',
    stage: 'production',
    featured: true,
    glyph: 'flame',
    tagline: 'Fotografe o prato e a IA calcula as calorias. Publicado na Google Play.',
    technologies: ['React Native', 'IA', 'Google OAuth'],
    summary:
      'Fotografe o prato e a IA calcula as calorias. Um app para acompanhar a alimentação sem pesar e sem digitar, publicado na Google Play.',
    platform: 'Android · Google Play',
    links: [
      {
        kind: 'play-store',
        label: 'Ver na Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.calorieup.ap',
      },
    ],
    caseStudy: {
      columns: [
        {
          label: 'O problema',
          heading: 'Contar calorias na mão é atrito demais para um hábito diário.',
          body: [
            'Pesar a comida, procurar cada alimento numa base de dados e digitar porções transforma cada refeição em trabalho.',
          ],
        },
        {
          label: 'A solução',
          heading: 'Uma foto no lugar do formulário.',
          body: [
            'O usuário fotografa o prato e a IA estima as calorias. O registro vai para o diário em segundos, sem balança e sem busca manual.',
          ],
        },
      ] satisfies Column[],
      features: [
        {
          icon: 'camera',
          title: 'Fotografe o prato',
          description: 'Registro de refeição a partir da câmera.',
        },
        {
          icon: 'sparkles',
          title: 'IA calcula as calorias',
          description: 'Estimativa automática a partir da imagem.',
        },
        {
          icon: 'lock',
          title: 'Login com Google',
          description: 'OAuth configurado para Android, iOS e web.',
        },
        {
          icon: 'crown',
          title: 'Assinatura Premium',
          description: 'Planos mensal e anual dentro do app.',
        },
      ],
      challenges: [
        'Autenticação com Google em três plataformas',
        'Da foto ao número',
        'Publicação e assinaturas',
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
    tagline: 'Gestão de equipes, escalas 5x2 e operação, com foco em produtividade.',
    technologies: ['shadcn/ui', 'NestJS', 'Prisma'],
  },
] as const

export const experiences = [
  {
    kind: 'work',
    organization: 'Adapta',
    title: 'Software Engineer · Front-end & Mobile',
    startDate: '2024-02-01',
    summary:
      'Desenvolvo produtos SaaS e plataformas de inteligência artificial usados por pessoas e empresas, no produto web e no aplicativo mobile: interfaces, integrações com APIs e funcionalidades de ponta a ponta.',
    responsibilities: [
      'Interfaces web e mobile para produtos de IA',
      'Integrações com APIs e serviços externos',
      'Funcionalidades voltadas a usuários e empresas',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'React Native'],
  },
  {
    kind: 'education',
    title: 'Sistemas de Informação',
    endDate: '2026-03-01',
    summary: 'Em andamento: Cibersegurança na FIAP.',
    technologies: [],
  },
] as const

export const profile = {
  name: 'Lucas Paiva',
  role: 'Software Engineer',
  headline: 'Desenvolvedor Full-Stack',
  intro:
    'Desenvolvo produtos digitais completos, do conceito à entrega, com foco em performance, experiência e impacto real no usuário.',
  location: 'Fortaleza, CE',
  stats: [
    { value: '6+ anos', label: 'em desenvolvimento', accent: true },
    { value: '10+ produtos', label: 'entregues', accent: true },
    { value: 'Apps em produção', label: 'Android e iOS', accent: false },
    { value: 'Escala', label: 'AWS e arquitetura', accent: false },
  ],
  aboutHeading: 'Do Ceará para o *mundo.*',
  aboutBody:
    'Sou engenheiro de software, apaixonado por transformar ideias em produtos reais. Atuo com desenvolvimento full-stack, com foco em front-end e mobile, unindo tecnologia, produto e experiência do usuário.',
  facts: [
    { icon: 'map-pin', text: 'Fortaleza, CE' },
    { icon: 'graduation-cap', text: 'Bacharel em SI', detail: '(Concl. mar/2026)' },
    { icon: 'laptop', text: 'Disponível para oportunidades remotas' },
  ],
  projectsHeading: 'Produtos que eu *construí.*',
  experienceHeading: 'Trajetória.',
  stackHeading: 'Com o que eu *construo.*',
  stackIntro:
    'Tecnologias e ferramentas que utilizo no dia a dia para transformar ideias em produtos escaláveis e de alta qualidade.',
  contactHeading: 'Tem um produto para tirar do *papel?*',
  available: true,
  availabilityText: 'Disponível para oportunidades remotas',
  socials: [{ platform: 'github', url: 'https://github.com/lcspaiva87' }],
} as const
