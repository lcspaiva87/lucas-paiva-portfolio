import {
  Braces,
  Cloud,
  Code,
  Database,
  FlaskConical,
  KeyRound,
  type LucideIcon,
  PawPrint,
  Sparkles,
} from 'lucide-react'
import type { ComponentProps } from 'react'
import {
  siAndroid,
  siAnthropic,
  siApple,
  siAppstore,
  siClaude,
  siCypress,
  siDocker,
  siElectron,
  siExpo,
  siFigma,
  siFirebase,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGoogle,
  siGoogleplay,
  siGraphql,
  siIos,
  siJavascript,
  siJest,
  siKotlin,
  siLinux,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNpm,
  siPayloadcms,
  siPnpm,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siReactquery,
  siReactrouter,
  siRedis,
  siRedux,
  siSass,
  siShadcnui,
  siStorybook,
  siStripe,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTanstack,
  siThreedotjs,
  siTurborepo,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siZod,
} from 'simple-icons'

import type { TechIconName } from '@/lib/tech-icon-options'

// Logos oficiais (simple-icons, CC0) por valor salvo no painel.
const BRANDS: Partial<Record<TechIconName, { path: string }>> = {
  react: siReact,
  nextdotjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  shadcnui: siShadcnui,
  reactquery: siReactquery,
  tanstack: siTanstack,
  redux: siRedux,
  reactrouter: siReactrouter,
  vite: siVite,
  sass: siSass,
  framer: siFramer,
  threedotjs: siThreedotjs,
  storybook: siStorybook,
  figma: siFigma,
  zod: siZod,
  nodedotjs: siNodedotjs,
  nestjs: siNestjs,
  graphql: siGraphql,
  python: siPython,
  payloadcms: siPayloadcms,
  stripe: siStripe,
  anthropic: siAnthropic,
  claude: siClaude,
  expo: siExpo,
  googleplay: siGoogleplay,
  appstore: siAppstore,
  apple: siApple,
  android: siAndroid,
  ios: siIos,
  swift: siSwift,
  kotlin: siKotlin,
  flutter: siFlutter,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  prisma: siPrisma,
  supabase: siSupabase,
  firebase: siFirebase,
  electron: siElectron,
  git: siGit,
  github: siGithub,
  vercel: siVercel,
  docker: siDocker,
  nginx: siNginx,
  linux: siLinux,
  pnpm: siPnpm,
  npm: siNpm,
  turborepo: siTurborepo,
  jest: siJest,
  vitest: siVitest,
  cypress: siCypress,
  google: siGoogle,
}

// Conceitos sem logo oficial: ícones de contorno do lucide.
const GENERIC: Partial<Record<TechIconName, LucideIcon>> = {
  'generic-ai': Sparkles,
  'generic-api': Braces,
  'generic-cloud': Cloud,
  'generic-database': Database,
  'generic-auth': KeyRound,
  'generic-test': FlaskConical,
  'generic-state': PawPrint,
  'generic-code': Code,
}

export function hasTechGlyph(name?: string | null): name is TechIconName {
  return Boolean(name && (name in BRANDS || name in GENERIC))
}

/** Desenha o logo escolhido no painel na cor do texto atual. */
export function TechGlyph({ name, ...props }: ComponentProps<'svg'> & { name: TechIconName }) {
  const Generic = GENERIC[name]
  if (Generic) return <Generic aria-hidden="true" strokeWidth={2} {...props} />
  const brand = BRANDS[name]
  if (!brand) return null
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={brand.path} />
    </svg>
  )
}
