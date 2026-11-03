/**
 * Ícones (lucide) que podem ser escolhidos no painel.
 * O front mapeia cada valor para o componente correspondente.
 */
export const GLYPHS = [
  { value: 'heart', label: 'Coração' },
  { value: 'flame', label: 'Chama' },
  { value: 'layers', label: 'Camadas' },
  { value: 'camera', label: 'Câmera' },
  { value: 'sparkles', label: 'Brilho / IA' },
  { value: 'lock', label: 'Cadeado' },
  { value: 'crown', label: 'Coroa / Premium' },
  { value: 'smartphone', label: 'Celular' },
  { value: 'globe', label: 'Globo / Web' },
  { value: 'bot', label: 'Robô' },
  { value: 'calendar-clock', label: 'Agenda' },
  { value: 'chart-line', label: 'Gráfico' },
  { value: 'shield-check', label: 'Escudo' },
  { value: 'zap', label: 'Raio / Performance' },
  { value: 'users', label: 'Pessoas' },
  { value: 'wallet', label: 'Carteira' },
  { value: 'paw-print', label: 'Pata' },
  { value: 'bell', label: 'Lembrete' },
  { value: 'code', label: 'Código' },
] as const

export type Glyph = (typeof GLYPHS)[number]['value']
