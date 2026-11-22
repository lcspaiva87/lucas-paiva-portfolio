import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Valem para o site e para o admin. Sem CSP por enquanto: o Payload e o Next usam scripts
// inline, então ela precisa de nonce e de um teste próprio antes de entrar.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Só o próprio site pode embutir as páginas (o live preview do Payload continua funcionando).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
]

const nextConfig: NextConfig = {
  // Conteúdo do CMS é cacheado com 'use cache' e invalidado pelos hooks do Payload.
  cacheComponents: true,
  // Remove o "X-Powered-By: Next.js, Payload" (o withPayload respeita esta opção).
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    // A versão otimizada de cada imagem fica 31 dias no cache (o padrão na Vercel era 60 s,
    // e as miniaturas dos projetos chegavam em branco até dar F5). Cada upload ganha um
    // nome de arquivo próprio, então a URL nunca aponta para outra imagem.
    minimumCacheTTL: 2678400,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Os projetos ficavam em /projetos; links já compartilhados continuam funcionando.
  async redirects() {
    return [
      { source: '/projetos/:path*', destination: '/projects/:path*', permanent: true },
      { source: '/en/projetos/:path*', destination: '/en/projects/:path*', permanent: true },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
