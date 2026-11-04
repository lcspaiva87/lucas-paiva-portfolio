import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'

const highlightHint = 'Coloque entre *asteriscos* a palavra que fica em laranja.'

const sectionHeading = (name: string, label: string, placeholder: string): Field => ({
  name,
  label,
  type: 'text',
  required: true,
  localized: true,
  admin: { placeholder, description: highlightHint },
})

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Perfil e textos do site',
  admin: {
    group: 'Conteúdo',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal([CACHE_TAGS.profile])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', label: 'Nome', type: 'text', required: true },
                {
                  name: 'role',
                  label: 'Cargo',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: { placeholder: 'Software Engineer' },
                },
              ],
            },
            {
              name: 'headline',
              label: 'Linha do terminal',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Desenvolvedor Full-Stack',
                description: 'Aparece como "> texto".',
              },
            },
            {
              name: 'intro',
              label: 'Apresentação',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'location',
              label: 'Localização',
              type: 'text',
              localized: true,
              admin: { placeholder: 'Fortaleza, CE' },
            },
            {
              name: 'stats',
              label: 'Números',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Número', plural: 'Números' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      label: 'Valor',
                      type: 'text',
                      required: true,
                      localized: true,
                      admin: { placeholder: '6+ anos' },
                    },
                    {
                      name: 'label',
                      label: 'Legenda',
                      type: 'text',
                      required: true,
                      localized: true,
                      admin: { placeholder: 'em desenvolvimento' },
                    },
                  ],
                },
                {
                  name: 'accent',
                  label: 'Valor em laranja',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'resume',
              label: 'Currículo (PDF)',
              type: 'upload',
              localized: true,
              relationTo: 'media',
              filterOptions: { mimeType: { equals: 'application/pdf' } },
            },
          ],
        },
        {
          label: 'Sobre',
          fields: [
            sectionHeading('aboutHeading', 'Título', 'Do Ceará para o *mundo.*'),
            {
              name: 'aboutBody',
              label: 'Texto',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'facts',
              label: 'Itens em destaque',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Item', plural: 'Itens' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      label: 'Ícone',
                      type: 'select',
                      required: true,
                      defaultValue: 'map-pin',
                      options: [
                        { value: 'map-pin', label: 'Local' },
                        { value: 'graduation-cap', label: 'Formação' },
                        { value: 'laptop', label: 'Trabalho' },
                        { value: 'globe', label: 'Mundo' },
                      ],
                      admin: { width: '30%' },
                    },
                    {
                      name: 'text',
                      label: 'Texto',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'detail',
                  label: 'Complemento',
                  type: 'text',
                  localized: true,
                  admin: { placeholder: '(Concl. mar/2026)' },
                },
              ],
            },
            {
              name: 'photo',
              label: 'Foto',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'image' } },
            },
          ],
        },
        {
          label: 'Seções',
          description: 'Títulos e textos das demais seções da Home.',
          fields: [
            sectionHeading('projectsHeading', 'Projetos', 'Produtos que eu *construí.*'),
            sectionHeading('experienceHeading', 'Experiência', 'Trajetória.'),
            sectionHeading('stackHeading', 'Stack', 'Com o que eu *construo.*'),
            { name: 'stackIntro', label: 'Texto da Stack', type: 'textarea', localized: true },
            sectionHeading('contactHeading', 'Contato', 'Tem um produto para tirar do *papel?*'),
          ],
        },
        {
          label: 'Contato',
          fields: [
            { name: 'email', label: 'E-mail', type: 'email' },
            {
              type: 'row',
              fields: [
                {
                  name: 'available',
                  label: 'Disponível para oportunidades',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'availabilityText',
                  label: 'Texto do status',
                  type: 'text',
                  localized: true,
                  admin: {
                    placeholder: 'Disponível para oportunidades remotas',
                    condition: (_, sibling) => Boolean(sibling?.available),
                  },
                },
              ],
            },
            {
              name: 'socials',
              label: 'Redes',
              type: 'array',
              labels: { singular: 'Rede', plural: 'Redes' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      label: 'Rede',
                      type: 'select',
                      required: true,
                      options: [
                        { value: 'github', label: 'GitHub' },
                        { value: 'linkedin', label: 'LinkedIn' },
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'instagram', label: 'Instagram' },
                        { value: 'x', label: 'X' },
                      ],
                      admin: { width: '30%' },
                    },
                    { name: 'url', label: 'URL', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
