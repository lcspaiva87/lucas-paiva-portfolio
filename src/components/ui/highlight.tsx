import { splitHighlight } from '@/lib/format'

/** Renderiza a palavra marcada com *asteriscos* no painel em laranja. */
export function Highlight({ text }: { text: string }) {
  return splitHighlight(text).map((part, i) =>
    part.highlight ? (
      <span key={i} className="text-primary light:text-brand-ink">
        {part.text}
      </span>
    ) : (
      part.text
    ),
  )
}
