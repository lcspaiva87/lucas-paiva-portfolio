import { type CollectionConfig, Forbidden } from 'payload'

/**
 * Ninguém se cadastra pelo site: nem pelo painel, nem pela API, nem pela tela de
 * "primeiro usuário" (que ignora o access control). A conta de admin é criada no
 * terminal com `pnpm admin`.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  admin: {
    useAsTitle: 'email',
    group: 'Configurações',
  },
  auth: true,
  access: {
    create: () => false,
  },
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if (operation === 'create' && req.payloadAPI !== 'local') throw new Forbidden(req.t)
      },
    ],
  },
  fields: [{ name: 'name', label: 'Nome', type: 'text' }],
}
