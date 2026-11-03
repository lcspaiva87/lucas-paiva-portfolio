import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

type TagsFor = (doc: Record<string, unknown>) => string[]

/**
 * Publicar no painel deixa a página afetada desatualizada na hora:
 * o próximo acesso já busca o conteúdo novo.
 */
function revalidate(tags: string[], req: PayloadRequest) {
  if (req.context.disableRevalidate) return
  for (const tag of new Set(tags)) {
    try {
      revalidateTag(tag, { expire: 0 })
    } catch (error) {
      // Fora do runtime do Next (ex.: scripts) não há cache para invalidar.
      req.payload.logger.debug({ msg: `revalidateTag(${tag}) ignorado`, error })
    }
  }
}

export const revalidateAfterChange =
  (tagsFor: TagsFor): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req }) => {
    const tags = [...tagsFor(doc), ...(previousDoc ? tagsFor(previousDoc) : [])]
    revalidate(tags, req)
    return doc
  }

export const revalidateAfterDelete =
  (tagsFor: TagsFor): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    revalidate(tagsFor(doc), req)
    return doc
  }

export const revalidateGlobal =
  (tags: string[]): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    revalidate(tags, req)
    return doc
  }
