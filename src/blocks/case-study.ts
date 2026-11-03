import type { Block, Field } from 'payload'

import { GLYPHS } from '@/lib/glyphs'

// A numeração "01 —", "02 —" é calculada pela ordem dos blocos no site.
const label: Field = {
  name: 'label',
  label: 'Rótulo',
  type: 'text',
  admin: { description: 'Ex.: "O problema". O número é adicionado automaticamente.' },
}

const heading: Field = { name: 'heading', label: 'Título', type: 'text' }

export const TextColumnsBlock: Block = {
  slug: 'textColumns',
  labels: { singular: 'Texto (1 ou 2 colunas)', plural: 'Textos' },
  imageAltText: 'Problema / Solução lado a lado',
  fields: [
    {
      name: 'columns',
      label: 'Colunas',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      required: true,
      labels: { singular: 'Coluna', plural: 'Colunas' },
      fields: [label, heading, { name: 'body', label: 'Texto', type: 'richText' }],
    },
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Grade de funcionalidades', plural: 'Grades de funcionalidades' },
  fields: [
    label,
    {
      name: 'items',
      label: 'Funcionalidades',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Funcionalidade', plural: 'Funcionalidades' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              label: 'Ícone',
              type: 'select',
              options: [...GLYPHS],
              admin: { width: '30%' },
            },
            { name: 'title', label: 'Título', type: 'text', required: true },
          ],
        },
        { name: 'description', label: 'Descrição', type: 'textarea' },
      ],
    },
  ],
}

export const ChallengesBlock: Block = {
  slug: 'challenges',
  labels: { singular: 'Lista de desafios', plural: 'Listas de desafios' },
  fields: [
    label,
    heading,
    {
      name: 'items',
      label: 'Desafios',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Desafio', plural: 'Desafios' },
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'description', label: 'Como resolvi', type: 'textarea' },
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Galeria', plural: 'Galerias' },
  fields: [
    label,
    {
      name: 'layout',
      label: 'Formato',
      type: 'select',
      defaultValue: 'phones',
      options: [
        { value: 'phones', label: 'Telas de celular' },
        { value: 'wide', label: 'Imagens largas' },
      ],
    },
    {
      name: 'images',
      label: 'Imagens',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Imagem', plural: 'Imagens' },
      fields: [
        { name: 'image', label: 'Imagem', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Legenda', type: 'text' },
      ],
    },
  ],
}

export const MetricsBlock: Block = {
  slug: 'metrics',
  labels: { singular: 'Métricas', plural: 'Métricas' },
  fields: [
    label,
    {
      name: 'items',
      label: 'Números',
      type: 'array',
      minRows: 1,
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
              admin: { placeholder: '+40%' },
            },
            { name: 'description', label: 'Descrição', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Texto livre', plural: 'Textos livres' },
  fields: [
    label,
    heading,
    { name: 'content', label: 'Conteúdo', type: 'richText', required: true },
  ],
}

export const CASE_STUDY_BLOCKS = [
  TextColumnsBlock,
  FeatureGridBlock,
  ChallengesBlock,
  GalleryBlock,
  MetricsBlock,
  RichTextBlock,
]
