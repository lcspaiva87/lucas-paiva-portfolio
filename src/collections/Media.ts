import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateAfterChange } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Arquivo', plural: 'Mídia' },
  admin: {
    group: 'Conteúdo',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    // Trocar o alt ou o arquivo afeta qualquer página que o use.
    afterChange: [revalidateAfterChange(() => [CACHE_TAGS.projects, CACHE_TAGS.profile])],
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Descreva a imagem para leitores de tela.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 960 },
      { name: 'full', width: 1920 },
    ],
    adminThumbnail: 'thumb',
    // Sem isso o arquivo sai com max-age=0 e cada miniatura passa pela função de novo,
    // chegando em branco na primeira visita. O nome do arquivo muda a cada upload,
    // então dá para guardar: 1 dia no navegador, 1 dia na CDN servindo o antigo
    // enquanto busca o novo em segundo plano.
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=2592000')
      return headers
    },
  },
}
