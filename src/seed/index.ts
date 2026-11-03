/**
 * Popula o banco com o conteúdo do design. Pode rodar mais de uma vez:
 * cria o que falta e atualiza o que já existe (por nome/slug).
 *
 *   pnpm seed
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import type { Project } from '@/payload-types'

import { experiences, profile, projects, technologies } from './content'

const context = { disableRevalidate: true }

type TextColumns = Extract<NonNullable<Project['layout']>[number], { blockType: 'textColumns' }>
type RichText = NonNullable<TextColumns['columns'][number]['body']>

function richText(paragraphs: readonly string[]): RichText {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      })),
    },
  }
}

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

// Tecnologias
const techIds = new Map<string, number>()
for (const tech of technologies) {
  const data = { showInStack: true, showInHero: false, ...tech }
  const { docs } = await payload.find({
    collection: 'technologies',
    where: { name: { equals: tech.name } },
    limit: 1,
  })
  const doc = docs[0]
    ? await payload.update({ collection: 'technologies', id: docs[0].id, data, context })
    : await payload.create({ collection: 'technologies', data, context })
  techIds.set(tech.name, doc.id)
}
log(`${techIds.size} tecnologias`)

const idsOf = (names: readonly string[]) =>
  names.map((name) => {
    const id = techIds.get(name)
    if (!id) throw new Error(`Tecnologia não encontrada: ${name}`)
    return id
  })

// Projetos
for (const project of projects) {
  const { technologies: techNames, ...fields } = project
  const { caseStudy, ...rest } =
    'caseStudy' in fields ? fields : { ...fields, caseStudy: undefined }

  const data = {
    ...rest,
    technologies: idsOf(techNames),
    links: 'links' in project ? [...project.links] : [],
    layout: caseStudy
      ? [
          {
            blockType: 'textColumns' as const,
            columns: caseStudy.columns.map((c) => ({
              label: c.label,
              heading: c.heading,
              body: richText(c.body),
            })),
          },
          {
            blockType: 'featureGrid' as const,
            label: 'Principais funcionalidades',
            items: caseStudy.features.map((f) => ({ ...f })),
          },
          {
            blockType: 'challenges' as const,
            label: 'Desafios técnicos',
            heading: 'O que deu trabalho',
            items: caseStudy.challenges.map((title) => ({ title })),
          },
        ]
      : [],
    _status: 'published' as const,
  }

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: project.slug } },
    limit: 1,
    draft: true,
  })
  if (docs[0]) {
    await payload.update({ collection: 'projects', id: docs[0].id, data, context })
  } else {
    await payload.create({ collection: 'projects', data, context })
  }
}
log(`${projects.length} projetos`)

// Experiências
for (const exp of experiences) {
  const data = {
    ...exp,
    technologies: idsOf(exp.technologies),
    responsibilities:
      'responsibilities' in exp ? exp.responsibilities.map((text) => ({ text })) : [],
  }
  const { docs } = await payload.find({
    collection: 'experiences',
    where: { title: { equals: exp.title } },
    limit: 1,
  })
  if (docs[0]) {
    await payload.update({ collection: 'experiences', id: docs[0].id, data, context })
  } else {
    await payload.create({ collection: 'experiences', data, context })
  }
}
log(`${experiences.length} experiências`)

// Perfil
await payload.updateGlobal({
  slug: 'profile',
  data: {
    ...profile,
    stats: profile.stats.map((s) => ({ ...s })),
    facts: profile.facts.map((f) => ({ ...f })),
    socials: profile.socials.map((s) => ({ ...s })),
  },
  context,
})
log('perfil')

log('pronto ✓')
process.exit(0)
