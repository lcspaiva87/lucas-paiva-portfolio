import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { en } from '@payloadcms/translations/languages/en'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Experiences } from './collections/Experiences'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Technologies } from './collections/Technologies'
import { Users } from './collections/Users'
import { Profile } from './globals/Profile'
import { DEFAULT_LOCALE } from './i18n/config'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function isLocalDatabase(url = '') {
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname)
  } catch {
    return false
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Painel Lucas Paiva',
    },
    components: {
      // Marca e fontes do site; as cores ficam em app/(payload)/custom.scss.
      graphics: {
        Logo: '/components/admin/graphics#AdminLogo',
        Icon: '/components/admin/graphics#AdminIcon',
      },
      providers: ['/components/admin/brand-fonts#BrandFonts'],
      beforeDashboard: ['/components/admin/welcome#Welcome'],
      // Com o banco vazio, o Payload abre essa tela; o cadastro é fechado (ver Users).
      views: {
        createFirstUser: { Component: '/components/admin/signup-closed#SignupClosed' },
      },
    },
  },
  i18n: {
    supportedLanguages: { pt, en },
    fallbackLanguage: 'pt',
  },
  // Conteúdo do site em dois idiomas. Campo sem tradução mostra o português.
  localization: {
    locales: [
      { code: 'pt', label: 'Português' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: DEFAULT_LOCALE,
    fallback: true,
  },
  collections: [Projects, Technologies, Experiences, Media, Users],
  globals: [Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Na Vercel (ou com RUN_MIGRATIONS=true) o schema vem das migrations, aplicadas ao iniciar.
    // Em dev o Payload sincroniza o banco direto ("push"); por isso um build local contra
    // o banco de dev não roda migrations (o Payload pediria para apagar dados).
    prodMigrations:
      process.env.VERCEL === '1' || process.env.RUN_MIGRATIONS === 'true' ? migrations : undefined,
    // O push só vale para o banco local. Contra o Neon, um `pnpm seed` sem NODE_ENV=production
    // criaria as tabelas por fora das migrations e o próximo deploy falharia com
    // "relation already exists"; assim ele só falha, sem mexer no banco.
    push: isLocalDatabase(process.env.DATABASE_URL),
  }),
  sharp,
  plugins: [
    // Na Vercel os uploads vão para o Vercel Blob (a Vercel cria BLOB_READ_WRITE_TOKEN ao
    // conectar o Blob ao projeto); sem o token, continuam no disco (dev local).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Mesmo schema com ou sem o plugin, para as migrations valerem nos dois casos.
      alwaysInsertFields: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // O navegador envia o arquivo direto para o Blob, sem o limite de 4,5 MB da Vercel.
      clientUploads: true,
    }),
  ],
})
