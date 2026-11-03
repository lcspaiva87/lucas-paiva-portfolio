import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import { Glyph } from '@/components/glyph'
import { Eyebrow } from '@/components/ui/section-label'
import { media } from '@/lib/cms'
import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'

type Block = NonNullable<Project['layout']>[number]
type BlockOf<T extends Block['blockType']> = Extract<Block, { blockType: T }>

const proseClass =
  'flex flex-col gap-4 text-body-lg text-muted-foreground [&_a]:text-brand-ink [&_strong]:text-foreground [&_p]:m-0 [&_ul]:m-0 [&_ul]:pl-5'

/** "01 — O problema": o número segue a ordem dos rótulos na página. */
function SectionEyebrow({ n, label }: { n: number; label?: string | null }) {
  if (!label) return null
  return (
    <Eyebrow>
      {String(n).padStart(2, '0')} — {label}
    </Eyebrow>
  )
}

const h2Class =
  'm-0 text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em]'

function TextColumns({ block, start }: { block: BlockOf<'textColumns'>; start: number }) {
  let n = start
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-16">
      {block.columns.map((column) => (
        <div key={column.id} className="flex flex-col gap-5">
          <SectionEyebrow n={column.label ? n++ : n} label={column.label} />
          {column.heading && <h2 className={h2Class}>{column.heading}</h2>}
          {column.body && <RichText data={column.body} className={proseClass} />}
        </div>
      ))}
    </div>
  )
}

function FeatureGrid({ block, n }: { block: BlockOf<'featureGrid'>; n: number }) {
  return (
    <div className="flex flex-col gap-10">
      <SectionEyebrow n={n} label={block.label} />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-0">
        {block.items?.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3.5 rounded-card border border-border bg-card p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-[10px] bg-brand-soft">
              <Glyph icon={item.icon} className="size-5 text-brand-ink" strokeWidth={2} />
            </span>
            <span className="text-lg font-bold">{item.title}</span>
            {item.description && (
              <span className="text-sm leading-[1.6] text-muted-foreground">
                {item.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Challenges({ block, n }: { block: BlockOf<'challenges'>; n: number }) {
  return (
    <div className="flex flex-wrap gap-x-20 gap-y-12">
      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5">
        <SectionEyebrow n={n} label={block.label} />
        {block.heading && <h2 className={h2Class}>{block.heading}</h2>}
      </div>
      <ol className="m-0 flex min-w-0 flex-[2_1_560px] list-none flex-col p-0">
        {block.items?.map((item, i) => (
          <li key={item.id} className="flex gap-6 border-t border-border py-7 last:border-b">
            <span className="font-mono text-[13px] text-brand-ink">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">{item.title}</span>
              {item.description && (
                <span className="text-base leading-[1.65] text-muted-foreground">
                  {item.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Gallery({ block, n }: { block: BlockOf<'gallery'>; n: number }) {
  const phones = block.layout !== 'wide'
  return (
    <div className="flex flex-col gap-10">
      <SectionEyebrow n={n} label={block.label} />
      <ul
        className={cn(
          'm-0 grid list-none gap-6 p-0',
          phones
            ? 'grid-cols-[repeat(auto-fill,minmax(220px,1fr))]'
            : 'grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))]',
        )}
      >
        {block.images?.map((item) => {
          const image = media(item.image)
          if (!image) return null
          return (
            <li key={item.id}>
              <figure className="m-0 flex flex-col gap-3">
                <div
                  className={cn(
                    'relative overflow-hidden border border-border bg-card',
                    phones ? 'aspect-[9/19] rounded-[36px]' : 'aspect-video rounded-card',
                  )}
                >
                  <Image
                    src={image.url!}
                    alt={image.alt}
                    fill
                    sizes={phones ? '280px' : '(min-width: 1024px) 50vw, 100vw'}
                    className="object-cover"
                  />
                </div>
                {item.caption && (
                  <figcaption className="font-mono text-xs text-muted-foreground">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Metrics({ block, n }: { block: BlockOf<'metrics'>; n: number }) {
  return (
    <div className="flex flex-col gap-10">
      <SectionEyebrow n={n} label={block.label} />
      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px overflow-hidden rounded-card border border-border bg-border">
        {block.items?.map((item) => (
          <div key={item.id} className="flex flex-col-reverse gap-2 bg-background p-6">
            <dt className="text-sm text-muted-foreground">{item.description}</dt>
            <dd className="m-0 text-section text-primary light:text-brand-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function FreeText({ block, n }: { block: BlockOf<'richText'>; n: number }) {
  return (
    <div className="flex max-w-3xl flex-col gap-5">
      <SectionEyebrow n={n} label={block.label} />
      {block.heading && <h2 className={h2Class}>{block.heading}</h2>}
      <RichText data={block.content} className={proseClass} />
    </div>
  )
}

function labelsIn(block: Block) {
  return block.blockType === 'textColumns'
    ? block.columns.filter((c) => c.label).length
    : block.label
      ? 1
      : 0
}

export function CaseStudyBlocks({ blocks }: { blocks: Block[] }) {
  let counter = 1
  return blocks.map((block) => {
    const n = counter
    counter += labelsIn(block)
    const content = (() => {
      switch (block.blockType) {
        case 'textColumns':
          return <TextColumns block={block} start={n} />
        case 'featureGrid':
          return <FeatureGrid block={block} n={n} />
        case 'challenges':
          return <Challenges block={block} n={n} />
        case 'gallery':
          return <Gallery block={block} n={n} />
        case 'metrics':
          return <Metrics block={block} n={n} />
        case 'richText':
          return <FreeText block={block} n={n} />
      }
    })()
    return (
      <section key={block.id} className="container-page pt-28 lg:pt-40">
        {content}
      </section>
    )
  })
}
