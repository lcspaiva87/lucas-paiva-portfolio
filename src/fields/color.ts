import type { TextField } from 'payload'

const HEX = /^#[0-9a-f]{6}$/i

export const colorField = (overrides: Partial<TextField> & Pick<TextField, 'name'>): TextField =>
  ({
    type: 'text',
    validate: (value: unknown) =>
      !value || (typeof value === 'string' && HEX.test(value)) || 'Use o formato #RRGGBB.',
    ...overrides,
    admin: {
      placeholder: '#38BDF8',
      ...overrides.admin,
    },
  }) as TextField
