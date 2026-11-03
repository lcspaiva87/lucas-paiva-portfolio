import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { colorField } from '@/fields/color'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

export const TECH_GROUPS = [
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'data', label: 'Dados' },
  { value: 'tools', label: 'Ferramentas' },
  { value: 'other', label: 'Outros (só tag de projeto)' },
] as const

// Mudar uma tecnologia altera a seção Stack, o hero e as tags dos projetos.
const tags = () => [CACHE_TAGS.technologies, CACHE_TAGS.projects, CACHE_TAGS.experiences]

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  labels: { singular: 'Tecnologia', plural: 'Tecnologias' },
  orderable: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbr', 'group', 'showInStack', 'showInHero'],
    group: 'Conteúdo',
    description: 'Alimenta a seção Stack, os chips do hero e as tags dos projetos.',
  },
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
      type: 'row',
      fields: [
        { name: 'name', label: 'Nome', type: 'text', required: true, unique: true },
        {
          name: 'abbr',
          label: 'Sigla do ícone',
          type: 'text',
          required: true,
          maxLength: 3,
          admin: { description: 'Ex.: Re, TS, ▲', width: '30%' },
        },
      ],
    },
    {
      name: 'group',
      label: 'Grupo',
      type: 'select',
      required: true,
      defaultValue: 'frontend',
      options: [...TECH_GROUPS],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'appearance',
          label: 'Estilo do ícone',
          type: 'select',
          required: true,
          defaultValue: 'tint',
          options: [
            { value: 'tint', label: 'Tinta (fundo suave da cor)' },
            { value: 'solid', label: 'Sólido (fundo na cor)' },
            { value: 'outline', label: 'Contorno' },
            { value: 'neutral', label: 'Neutro' },
          ],
        },
        colorField({
          name: 'color',
          label: 'Cor da marca',
          admin: {
            description: 'Uma cor só; o site gera as variações dos temas claro e escuro.',
            condition: (_, sibling) =>
              sibling?.appearance === 'tint' || sibling?.appearance === 'solid',
          },
        }),
        colorField({
          name: 'onColor',
          label: 'Cor do texto',
          admin: {
            placeholder: '#FFFFFF',
            description: 'Texto sobre o fundo sólido.',
            condition: (_, sibling) => sibling?.appearance === 'solid',
          },
        }),
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showInStack',
          label: 'Mostrar na seção Stack',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showInHero',
          label: 'Chip flutuante no hero',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
