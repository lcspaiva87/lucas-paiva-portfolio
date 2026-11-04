import type { Dictionary } from './pt'

export const en: Dictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    caseStudies: 'Case Studies',
    experience: 'Experience',
    stack: 'Stack',
    contact: 'Contact',
  },
  header: {
    navLabel: 'Main',
    homeLink: '{name}, home page',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuLabel: 'Menu',
    skipToContent: 'Skip to content',
  },
  theme: {
    label: 'Theme',
    light: 'Light theme',
    dark: 'Dark theme',
  },
  language: {
    label: 'Language',
  },
  footer: {
    navLabel: 'Footer',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  hero: {
    viewProjects: 'View projects',
    downloadResume: 'Download résumé',
    globeLabel:
      'Spinning globe with Fortaleza highlighted and arcs of light connecting the city to the world',
    globeFallbackLabel: 'Dotted globe with the main technologies in orbit',
  },
  about: {
    label: 'About me',
    photoPlaceholder: 'Add your photo in Perfil › Sobre',
  },
  projects: {
    label: 'Projects',
    viewAll: 'See all projects',
    count: { one: '{n} project', other: '{n} projects' },
    listIntro:
      'The ones with a case study open with the full story: the problem, the solution and the hard parts.',
    metaDescription: 'Digital products I built from concept to launch: mobile apps, web and SaaS.',
    filterLabel: 'Filter by category',
    all: 'All',
  },
  experience: {
    label: 'Experience',
    today: 'Today',
    education: 'Education',
    graduation: 'Education · class of {date}',
    responsibilities: 'Responsibilities',
    results: 'Results',
  },
  stack: {
    label: 'Stack',
    specialty: 'Specialty',
    groups: {
      frontend: {
        title: 'Front-end',
        description: 'Modern, fast interfaces built around the best possible user experience.',
      },
      backend: {
        title: 'Back-end',
        description: 'APIs, integrations and solid business logic.',
      },
      mobile: {
        title: 'Mobile',
        description: 'Native apps with high performance and great UX.',
      },
      data: {
        title: 'Data',
        description: 'Data modeling, persistence and analysis.',
      },
      tools: {
        title: 'Tools',
        description: 'Productivity, builds, version control and distribution.',
      },
    },
  },
  contact: {
    label: 'Contact',
    available: 'Available',
    sendMessage: 'Send a message',
  },
  caseStudy: {
    back: 'All projects',
    eyebrow: 'Case study',
    titleSuffix: 'case study',
    next: 'Next project',
    screensPlaceholder: 'Add the screens in Case study › Telas do topo',
    facts: {
      role: 'Role',
      platform: 'Platform',
      stack: 'Stack',
      period: 'Period',
    },
  },
  category: {
    mobile: 'Mobile app',
    web: 'Web',
    saas: 'SaaS',
    desktop: 'Desktop',
  },
  stage: {
    production: 'In production',
    development: 'In development',
    discontinued: 'Discontinued',
  },
  link: {
    'play-store': 'Get it on Google Play',
    'app-store': 'Download on the App Store',
    website: 'Visit website',
    repository: 'View code',
    other: 'Open link',
  },
  date: {
    present: 'present',
    and: 'and',
    year: { one: '{n} year', other: '{n} years' },
    month: { one: '{n} month', other: '{n} months' },
  },
}
