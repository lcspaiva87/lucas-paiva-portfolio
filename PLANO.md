# Portfólio Lucas Paiva — Plano

Base visual: canvas "Portfólio Lucas Paiva" (Direção visual, Home desktop/mobile, Case CalorieUp, Hero claro).

## Decisões (03/11/2026)
- **Painel:** Payload CMS embutido no Next.js (`/admin`)
- **Infra de produção:** a definir na Fase 5. Até lá, banco `portfolio` num Postgres local em Docker (ver `.env.example`) e uploads em disco (`/media`)
- **Runtime:** Node 24.22.2 (`.nvmrc`), Next.js 16.3, Payload 3.92, pnpm
- **Editável pelo painel:** projetos + stack/tecnologias + experiência + perfil e textos do site

## Objetivo

Site de portfólio em Next.js fiel ao design, com um painel administrativo (`/admin`) onde eu cadastro e edito projetos, case studies, experiência e stack **sem mexer no código nem fazer deploy**. Publicou no painel → o site atualiza sozinho.

---

## 1. Arquitetura

```
Next.js (App Router, TypeScript)
├── (site)            → páginas públicas, Server Components, cache + revalidação sob demanda
│   ├── /                      Home (hero, sobre, projetos em destaque, experiência, stack, contato)
│   ├── /projetos              Todos os projetos (filtro por categoria/tecnologia)
│   └── /projetos/[slug]       Case study (template único alimentado pelo CMS)
├── (painel)
│   └── /admin                 Painel de conteúdo (login só meu)
└── api/                       Endpoints do CMS + revalidação
        │
        ├── PostgreSQL (Neon ou Supabase)
        └── Storage de imagens (Vercel Blob ou S3/Supabase Storage)
```

**Como o "CRM" funciona:** quando eu salvo/publico algo no painel, um hook chama `revalidateTag('projects')` e a página afetada é regenerada. O site continua estático e rápido; o conteúdo vive no banco.

### Opção recomendada para o painel: Payload CMS (embutido no próprio Next.js)

- Roda dentro do mesmo app Next (`/admin`), mesmo deploy na Vercel, sem serviço externo pago.
- Painel pronto: login, upload de imagens com crop/resize, editor rich text, **rascunho vs. publicado**, histórico de versões, ordenação.
- Os schemas ficam em TypeScript no repo e geram tipos para o front.
- "Blocos" encaixam no formato do case study (Problema, Solução, Funcionalidades, Desafios, Galeria…), então cada case pode ter seções diferentes.

Alternativas consideradas:
| Opção | Prós | Contras |
|---|---|---|
| **Payload CMS** (recomendado) | Painel completo de graça, tipado, mesmo deploy | Mais uma dependência grande; painel com visual do Payload (customizável) |
| Painel próprio (shadcn + Prisma + Auth.js) | 100% no meu visual, vira um case do portfólio | 2–3× mais trabalho: CRUD, upload, rich text, auth, versões, tudo na mão |
| CMS SaaS (Sanity) | Painel ótimo, setup rápido | Conteúdo fora do meu banco, limites do plano grátis |

---

## 2. Modelo de conteúdo (o que fica editável)

### Coleção `projects`
| Campo | Tipo | Uso no design |
|---|---|---|
| `title`, `slug` | texto | "CalorieUp", `/projetos/calorieup` |
| `tagline` | texto curto | "Fotografe o prato e a IA calcula as calorias." |
| `summary` | texto | intro do case |
| `category` | select: App mobile · Web · SaaS · Desktop | "Case study 01 · App mobile" |
| `status` | select: Em produção · Em desenvolvimento · Descontinuado | badge |
| `featured` + `order` | boolean + número | quais aparecem na Home e em que ordem |
| `icon`, `cover`, `accentColor` | upload / cor | card da Home |
| `technologies` | relação → `technologies` | chips "React Native", "IA"… |
| `role`, `platform`, `periodStart`, `periodEnd` | texto / data | ficha "Papel · Plataforma · Stack · Período" |
| `links[]` | {rótulo, url, tipo: Play Store / App Store / Site / Repo} | botões "Ver na Google Play" |
| `screenshots[]` | uploads | mockups de celular |
| `caseStudy` | **blocos** (abaixo) | página do case |
| `seo` | título, descrição, imagem OG | metadata |
| `_status` | rascunho / publicado | só publicado vai pro site |

Blocos do case study: `problem`, `solution`, `featureGrid` (ícone + título + texto), `challenges` (lista numerada), `gallery`, `richText`, `metrics`.
"Próximo projeto" é calculado pela ordem, não precisa cadastrar.

### Coleção `technologies`
`name`, `abbr` ("Re", "TS"), `group` (Front-end · Back-end · Mobile · Dados · Ferramentas), `colors` (fundo/texto do chip), `order`, `showInHero`.
Alimenta a seção Stack, os chips flutuantes do hero e as tags dos projetos.

### Coleção `experiences`
`company`, `role`, `start`, `end` (vazio = "atual"), `summary`, `responsibilities[]`, `results[]`, `technologies`, `order`. Tempo de casa calculado automaticamente.

### Global `profile` (dados do site)
Nome, headline ("Desenvolvedor Full-Stack"), bio, localização, formação, status "disponível", números do hero (6+ anos, 10+ produtos…), e-mail, redes, foto, **arquivo do currículo (PDF)**.

### Coleção `media`
Uploads com alt text obrigatório e tamanhos gerados (thumb, card, full).

---

## 3. Stack técnica

- **Next.js** (App Router, RSC, TypeScript strict) + **pnpm**
- **Tailwind CSS v4** com os tokens da Direção visual como CSS variables (tema escuro principal + claro)
- **shadcn/ui** para primitivos (botão, badge, sheet do menu mobile, dialog)
- **next/font**: Plus Jakarta Sans (400–800) + DM Mono (400/500)
- **next-themes** para alternar escuro/claro
- **motion** (Framer Motion) para entradas `ease-out-expo 700ms`, stagger 60ms, microinterações
- **React Three Fiber + drei** para o globo do hero (com fallback estático e `prefers-reduced-motion`)
- **Payload CMS** + Postgres + storage de imagens
- **Zod** para validar o formulário de contato; **Resend** para enviar o e-mail
- Qualidade: ESLint, Prettier, Vitest (utils), Playwright (smoke das páginas)
- Deploy: **Vercel** (preview por branch)

---

## 4. Fases

### Fase 0 — Fundação
- [x] Criar projeto Next.js + Payload, git, ESLint/Prettier, `.env.example`
- [x] Banco Postgres local em Docker (banco `portfolio`)
- [x] Estrutura de pastas e aliases

### Fase 1 — Design system
- [x] Tokens (cores, tipografia, espaçamento base 4px, grid 12 col, raios) em `globals.css`
- [x] Fontes, tema escuro/claro
- [x] Componentes base: Button (primário/secundário/link), TechChip + TechIcon, Badge de status, SectionLabel/Eyebrow, Logo, Card, Input/Label, utilitário `container-page`
- [x] Página `/styleguide` (noindex) para revisar o design system

### Fase 2 — CMS
- [x] Coleções `projects`, `technologies`, `experiences`, `media` e global `profile` (painel em português)
- [x] Login do admin (usuário único) — falta criar a conta em `/admin`
- [x] Hooks de revalidação (`revalidateTag(tag, { expire: 0 })`) ao publicar
- [x] Seed com o conteúdo atual: CalorieUp, LuvePet, Scalar Workspace, Adapta, stack completa (`pnpm seed`, pode rodar de novo sem duplicar)

### Fase 3 — Páginas
- [x] Layout: header com nav + toggle de tema, footer
- [x] Home: Hero, Números, Sobre, Projetos em destaque, Experiência (timeline), Stack, Contato
- [x] `/projetos`: grid com filtro
- [x] `/projetos/[slug]`: template do case renderizando os blocos
- [x] Versão mobile (menu em tela cheia, layout 375px sem scroll horizontal)
- [x] Cache Components (`'use cache'` + `cacheTag`) com revalidação ao publicar, testada em `next start`

### Fase 4 — Movimento e polimento
- [ ] Animações de entrada, hover magnético, cards com tilt
- [ ] Globo 3D com rotação no scroll
- [ ] `prefers-reduced-motion` em tudo
- [ ] Acessibilidade (contraste, foco, navegação por teclado)

### Fase 5 — SEO e lançamento
- [ ] `generateMetadata` por página, OG image dinâmica (`next/og`), `sitemap.xml`, `robots.txt`, JSON-LD (Person + CreativeWork)
- [ ] Formulário de contato funcionando
- [ ] Analytics (Vercel Analytics)
- [ ] Deploy na Vercel + domínio
- [ ] Lighthouse ≥ 95 em performance/acessibilidade

---

## 5. Pendências de conteúdo (placeholders do design)
- Papel e período do CalorieUp; URL da landing page
- Textos de contexto/arquitetura/desafios do case CalorieUp
- Resultados na Adapta; experiência anterior; instituição da formação
- Foto, e-mail de contato, PDF do currículo

Tudo isso vai ser preenchido **pelo painel**, então não bloqueia o desenvolvimento.
