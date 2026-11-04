import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const tags = () => [CACHE_TAGS.experiences]

const monthPicker = { date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' } } as const

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Experiência', plural: 'Experiências' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'kind', 'startDate', 'endDate'],
    group: 'Conteúdo',
    description: 'Linha do tempo da Home, ordenada da mais recente para a mais antiga.',
  },
  // Sem data de fim = atual, e o Postgres ordena nulos primeiro em DESC.
  defaultSort: '-endDate',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateAfterChange(tags)],
    afterDelete: [revalidateAfterDelete(tags)],
  },
  fields: [
    {
      name: 'kind',
      label: 'Tipo',
      type: 'radio',
      required: true,
      defaultValue: 'work',
      options: [
        { value: 'work', label: 'Trabalho' },
        { value: 'education', label: 'Formação' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'organization',
          label: 'Empresa / instituição',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Cargo / curso',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          label: 'Início',
          type: 'date',
          admin: monthPicker,
          validate: (value: unknown, { siblingData }: { siblingData: { kind?: string } }) =>
            Boolean(value) || siblingData?.kind !== 'work' || 'Informe o início.',
        },
        {
          name: 'endDate',
          label: 'Fim',
          type: 'date',
          admin: { ...monthPicker, description: 'Em branco = atual / em andamento.' },
        },
      ],
    },
    { name: 'summary', label: 'Resumo', type: 'textarea', localized: true },
    {
      name: 'responsibilities',
      label: 'Responsabilidades',
      type: 'array',
      labels: { singular: 'Responsabilidade', plural: 'Responsabilidades' },
      admin: { condition: (data) => data?.kind === 'work' },
      fields: [{ name: 'text', label: 'Texto', type: 'text', required: true, localized: true }],
    },
    {
      name: 'results',
      label: 'Resultados',
      type: 'array',
      labels: { singular: 'Resultado', plural: 'Resultados' },
      admin: {
        condition: (data) => data?.kind === 'work',
        description: 'O que mudou, para quem e como foi medido.',
      },
      fields: [{ name: 'text', label: 'Texto', type: 'text', required: true, localized: true }],
    },
    {
      name: 'technologies',
      label: 'Tecnologias',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
  ],
}
