import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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
  }),
  sharp,
  plugins: [
    // Uploads vão para um bucket S3 (Supabase Storage) quando configurado;
    // sem as variáveis, continuam no disco (dev local).
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      // Mesmo schema com ou sem o plugin, para as migrations valerem nos dois casos.
      alwaysInsertFields: true,
      collections: { media: true },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
