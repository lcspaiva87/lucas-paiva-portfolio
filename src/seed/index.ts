/**
 * Popula o banco com o conteúdo do design, em português e inglês. Pode rodar mais de uma vez:
 * cria o que falta e atualiza o que já existe (por nome/slug).
 *
 *   pnpm seed
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { DEFAULT_LOCALE, type Locale, LOCALES } from '@/i18n/config'
import type { Project } from '@/payload-types'

import { experiences, pick, profile, projects, technologies } from './content'

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

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Arrays e blocos são compartilhados entre os idiomas; só o texto muda. Para gravar o inglês
 * nas mesmas linhas, cada item recebe o id que o português criou.
 */
function withIds<T>(data: T, saved: unknown): T {
  if (Array.isArray(data)) {
    const rows = Array.isArray(saved) ? saved : []
    return data.map((item, i) => withIds(item, rows[i])) as T
  }
  if (isObject(data) && isObject(saved)) {
    const merged: Record<string, unknown> = { ...data }
    if (typeof saved.id === 'string' && !('id' in data)) merged.id = saved.id
    for (const key of Object.keys(data)) merged[key] = withIds(data[key], saved[key])
    return merged as T
  }
  return data
}

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)
const otherLocales = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)

// Tecnologias (projetos e experiências se referem a elas pelo nome em português)
const techIds = new Map<string, number>()
for (const tech of technologies) {
  const data = { showInStack: true, showInHero: false, ...pick(tech, DEFAULT_LOCALE) }
  const { docs } = await payload.find({
    collection: 'technologies',
    where: { name: { equals: data.name } },
    locale: DEFAULT_LOCALE,
    limit: 1,
  })
  const doc = docs[0]
    ? await payload.update({
        collection: 'technologies',
        id: docs[0].id,
        data,
        locale: DEFAULT_LOCALE,
        context,
      })
    : await payload.create({ collection: 'technologies', data, locale: DEFAULT_LOCALE, context })
  for (const locale of otherLocales) {
    await payload.update({
      collection: 'technologies',
      id: doc.id,
      data: { name: pick(tech, locale).name },
      locale,
      context,
    })
  }
  techIds.set(data.name, doc.id)
}
log(`${techIds.size} tecnologias`)

const idsOf = (names: readonly string[]) =>
  names.map((name) => {
    const id = techIds.get(name)
    if (!id) throw new Error(`Tecnologia não encontrada: ${name}`)
    return id
  })

// Projetos
function projectData(project: (typeof projects)[number], locale: Locale) {
  const { technologies: techNames, ...fields } = pick(project, locale)
  const { caseStudy, ...rest } =
    'caseStudy' in fields ? fields : { ...fields, caseStudy: undefined }
  return {
    ...rest,
    technologies: idsOf(techNames),
    links: 'links' in fields ? fields.links : [],
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
            label: caseStudy.featuresLabel,
            items: caseStudy.features,
          },
          {
            blockType: 'challenges' as const,
            label: caseStudy.challengesLabel,
            heading: caseStudy.challengesHeading,
            items: caseStudy.challenges.map((title) => ({ title })),
          },
        ]
      : [],
    _status: 'published' as const,
  }
}

for (const project of projects) {
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: project.slug } },
    limit: 1,
    draft: true,
  })
  const data = projectData(project, DEFAULT_LOCALE)
  const saved = docs[0]
    ? await payload.update({
        collection: 'projects',
        id: docs[0].id,
        data,
        locale: DEFAULT_LOCALE,
        context,
      })
    : await payload.create({ collection: 'projects', data, locale: DEFAULT_LOCALE, context })
  for (const locale of otherLocales) {
    await payload.update({
      collection: 'projects',
      id: saved.id,
      data: withIds(projectData(project, locale), saved),
      locale,
      context,
    })
  }
}
log(`${projects.length} projetos`)

// Experiências
function experienceData(exp: (typeof experiences)[number], locale: Locale) {
  const fields = pick(exp, locale)
  return {
    ...fields,
    technologies: idsOf(fields.technologies),
    responsibilities:
      'responsibilities' in fields ? fields.responsibilities.map((text) => ({ text })) : [],
  }
}

for (const exp of experiences) {
  const { docs } = await payload.find({
    collection: 'experiences',
    where: { title: { equals: exp.title.pt } },
    locale: DEFAULT_LOCALE,
    limit: 1,
  })
  const data = experienceData(exp, DEFAULT_LOCALE)
  const saved = docs[0]
    ? await payload.update({
        collection: 'experiences',
        id: docs[0].id,
        data,
        locale: DEFAULT_LOCALE,
        context,
      })
    : await payload.create({ collection: 'experiences', data, locale: DEFAULT_LOCALE, context })
  for (const locale of otherLocales) {
    await payload.update({
      collection: 'experiences',
      id: saved.id,
      data: withIds(experienceData(exp, locale), saved),
      locale,
      context,
    })
  }
}
log(`${experiences.length} experiências`)

// Perfil
const savedProfile = await payload.updateGlobal({
  slug: 'profile',
  data: pick(profile, DEFAULT_LOCALE),
  locale: DEFAULT_LOCALE,
  context,
})
for (const locale of otherLocales) {
  await payload.updateGlobal({
    slug: 'profile',
    data: withIds(pick(profile, locale), savedProfile),
    locale,
    context,
  })
}
log('perfil')

log('pronto ✓')
process.exit(0)
