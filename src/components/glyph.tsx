import {
  Bell,
  Bot,
  CalendarClock,
  Camera,
  ChartLine,
  Code,
  Crown,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  Laptop,
  Layers,
  Lock,
  type LucideIcon,
  type LucideProps,
  MapPin,
  PawPrint,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'

import type { Glyph as GlyphName } from '@/lib/glyphs'

const ICONS: Record<GlyphName | 'map-pin' | 'graduation-cap' | 'laptop', LucideIcon> = {
  heart: Heart,
  flame: Flame,
  layers: Layers,
  camera: Camera,
  sparkles: Sparkles,
  lock: Lock,
  crown: Crown,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  'calendar-clock': CalendarClock,
  'chart-line': ChartLine,
  'shield-check': ShieldCheck,
  zap: Zap,
  users: Users,
  wallet: Wallet,
  'paw-print': PawPrint,
  bell: Bell,
  code: Code,
  'map-pin': MapPin,
  'graduation-cap': GraduationCap,
  laptop: Laptop,
}

export function Glyph({ icon, ...props }: LucideProps & { icon?: string | null }) {
  const Icon = (icon && ICONS[icon as keyof typeof ICONS]) || Code
  return <Icon aria-hidden="true" {...props} />
}
