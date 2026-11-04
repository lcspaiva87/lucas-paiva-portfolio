/**
 * Textos fixos da interface. O conteúdo editável (perfil, projetos, experiências)
 * vem do painel, com uma versão por idioma.
 *
 * "{name}" e afins são trocados por `fill()`; plurais usam `{ one, other }`.
 */
export const pt = {
  nav: {
    home: 'Início',
    about: 'Sobre',
    projects: 'Projetos',
    caseStudies: 'Case Studies',
    experience: 'Experiência',
    stack: 'Stack',
    contact: 'Contato',
  },
  header: {
    navLabel: 'Principal',
    homeLink: '{name}, página inicial',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuLabel: 'Menu',
    skipToContent: 'Pular para o conteúdo',
  },
  theme: {
    label: 'Tema',
    light: 'Tema claro',
    dark: 'Tema escuro',
  },
  language: {
    label: 'Idioma',
  },
  footer: {
    navLabel: 'Rodapé',
    rights: 'Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },
  hero: {
    viewProjects: 'Ver projetos',
    downloadResume: 'Baixar currículo',
    globeLabel:
      'Globo terrestre girando, com Fortaleza em destaque e arcos de luz ligando a cidade ao mundo',
    globeFallbackLabel: 'Globo de pontos com as principais tecnologias orbitando',
  },
  about: {
    label: 'Sobre mim',
    photoPlaceholder: 'Adicione sua foto em Perfil › Sobre',
  },
  projects: {
    label: 'Projetos',
    viewAll: 'Ver todos os projetos',
    count: { one: '{n} projeto', other: '{n} projetos' },
    listIntro:
      'Os que têm case study abrem com a história completa: problema, solução e o que deu trabalho.',
    metaDescription:
      'Produtos digitais que desenvolvi, do conceito à entrega: apps mobile, web e SaaS.',
    filterLabel: 'Filtrar por categoria',
    all: 'Todos',
  },
  experience: {
    label: 'Experiência',
    today: 'Hoje',
    education: 'Formação',
    graduation: 'Formação · conclusão {date}',
    responsibilities: 'Responsabilidades',
    results: 'Resultados',
  },
  stack: {
    label: 'Stack',
    specialty: 'Especialidade',
    groups: {
      frontend: {
        title: 'Front-end',
        description:
          'Criação de interfaces modernas, performáticas e focadas na melhor experiência do usuário.',
      },
      backend: {
        title: 'Back-end',
        description: 'APIs, integrações e regras de negócio robustas.',
      },
      mobile: {
        title: 'Mobile',
        description: 'Apps nativos com alta performance e boa UX.',
      },
      data: {
        title: 'Dados',
        description: 'Modelagem, persistência e análise de dados.',
      },
      tools: {
        title: 'Ferramentas',
        description: 'Produtividade, build, versionamento e distribuição.',
      },
    },
  },
  contact: {
    label: 'Contato',
    available: 'Disponível',
    sendMessage: 'Enviar mensagem',
  },
  caseStudy: {
    back: 'Todos os projetos',
    eyebrow: 'Case study',
    titleSuffix: 'case study',
    next: 'Próximo projeto',
    screensPlaceholder: 'Adicione as telas em Case study › Telas do topo',
    facts: {
      role: 'Papel',
      platform: 'Plataforma',
      stack: 'Stack',
      period: 'Período',
    },
  },
  category: {
    mobile: 'App mobile',
    web: 'Web',
    saas: 'SaaS',
    desktop: 'Desktop',
  },
  stage: {
    production: 'Em produção',
    development: 'Em desenvolvimento',
    discontinued: 'Descontinuado',
  },
  link: {
    'play-store': 'Ver na Google Play',
    'app-store': 'Ver na App Store',
    website: 'Visitar site',
    repository: 'Ver código',
    other: 'Abrir link',
  },
  date: {
    present: 'atual',
    and: 'e',
    year: { one: '{n} ano', other: '{n} anos' },
    month: { one: '{n} mês', other: '{n} meses' },
  },
}

export type Dictionary = typeof pt
