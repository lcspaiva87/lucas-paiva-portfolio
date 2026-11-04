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
  },
}
