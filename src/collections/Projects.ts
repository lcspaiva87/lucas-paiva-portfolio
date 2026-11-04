import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { CASE_STUDY_BLOCKS } from '@/blocks/case-study'
import { colorField } from '@/fields/color'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { CACHE_TAGS } from '@/lib/cache-tags'
import { GLYPHS } from '@/lib/glyphs'

const tags = (doc: Record<string, unknown>) => {
  // Rascunhos não aparecem no site; só publicar ou despublicar precisa revalidar.
  if (doc._status !== 'published') return []
  return [CACHE_TAGS.projects, CACHE_TAGS.project(String(doc.slug))]
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos' },
  orderable: true,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'stage', 'featured', '_status'],
    group: 'Conteúdo',
    description: 'Arraste para mudar a ordem em que aparecem no site.',
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    read: authenticatedOrPublished,
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
      name: 'title',
      label: 'Nome do projeto',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      required: true,
      defaultValue: 'mobile',
      options: [
        { value: 'mobile', label: 'App mobile' },
        { value: 'web', label: 'Web' },
        { value: 'saas', label: 'SaaS' },
        { value: 'desktop', label: 'Desktop' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'stage',
      label: 'Situação',
      type: 'select',
      required: true,
      defaultValue: 'production',
      options: [
        { value: 'production', label: 'Em produção' },
        { value: 'development', label: 'Em desenvolvimento' },
        { value: 'discontinued', label: 'Descontinuado' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      label: 'Destaque na Home',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          description: 'O que aparece na Home e na lista de projetos.',
          fields: [
            {
              name: 'tagline',
              label: 'Frase curta',
              type: 'text',
              required: true,
              localized: true,
              admin: { placeholder: 'Fotografe o prato e a IA calcula as calorias.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'glyph',
                  label: 'Ícone',
                  type: 'select',
                  options: [...GLYPHS],
                  admin: { description: 'Quadrado laranja do card.' },
                },
                colorField({
                  name: 'accentColor',
                  label: 'Cor de destaque',
                  admin: { description: 'Opcional. Padrão: laranja da marca.' },
                }),
              ],
            },
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'image' } },
              admin: {
                description: 'Opcional. Imagem quadrada; substitui o ícone no quadrado do card.',
              },
            },
            {
              name: 'cover',
              label: 'Imagem do card',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Screenshot ou mockup. Sem imagem, o card usa uma ilustração.',
              },
            },
            {
              name: 'technologies',
              label: 'Tecnologias',
              type: 'relationship',
              relationTo: 'technologies',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Ficha',
          description: 'Cabeçalho do case study.',
          fields: [
            {
              name: 'summary',
              label: 'Introdução',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Parágrafo de abertura. A primeira frase fica em destaque.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'role',
                  label: 'Papel',
                  type: 'text',
                  localized: true,
                  admin: { placeholder: 'Produto, design e desenvolvimento' },
                },
                {
                  name: 'platform',
                  label: 'Plataforma',
                  type: 'text',
                  localized: true,
                  admin: { placeholder: 'Android · Google Play' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'periodStart',
                  label: 'Início',
                  type: 'date',
                  admin: { date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' } },
                },
                {
                  name: 'periodEnd',
                  label: 'Fim',
                  type: 'date',
                  admin: {
                    date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' },
                    description: 'Em branco = em andamento.',
                  },
                },
              ],
            },
            {
              name: 'links',
              label: 'Links',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'kind',
                      label: 'Tipo',
                      type: 'select',
                      required: true,
                      defaultValue: 'website',
                      options: [
                        { value: 'play-store', label: 'Google Play' },
                        { value: 'app-store', label: 'App Store' },
                        { value: 'website', label: 'Site' },
                        { value: 'repository', label: 'Repositório' },
                        { value: 'other', label: 'Outro' },
                      ],
                    },
                    {
                      name: 'label',
                      label: 'Texto do botão',
                      type: 'text',
                      localized: true,
                      admin: { placeholder: 'Ver na Google Play' },
                    },
                  ],
                },
                { name: 'url', label: 'URL', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          description: 'Monte a página com blocos. Sem blocos, o projeto não tem página própria.',
          fields: [
            {
              name: 'heroImages',
              label: 'Telas do topo',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              maxRows: 3,
              admin: { description: 'Até 3 screenshots; a do meio ganha destaque.' },
            },
            {
              name: 'layout',
              label: 'Seções',
              type: 'blocks',
              blocks: CASE_STUDY_BLOCKS,
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            { name: 'title', label: 'Título', type: 'text', localized: true },
            {
              name: 'description',
              label: 'Descrição',
              type: 'textarea',
              maxLength: 160,
              localized: true,
            },
            {
              name: 'image',
              label: 'Imagem de compartilhamento',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
