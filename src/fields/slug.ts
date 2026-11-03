import type { TextField } from 'payload'

import { slugify } from '@/lib/slugify'

/** Slug gerado a partir de outro campo quando deixado em branco. */
export const slugField = (from = 'title'): TextField => ({
  name: 'slug',
  label: 'Slug (URL)',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Gerado a partir do título se ficar em branco.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[from]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})
