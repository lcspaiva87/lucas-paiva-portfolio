# Deploy — Vercel + Neon + Vercel Blob

O código já está pronto para produção: as migrations do banco rodam sozinhas no build da Vercel e as imagens do painel vão para o Vercel Blob. Estes passos são os que dependem da sua conta.

Tempo estimado: 10 minutos.

## 1. Banco (Neon)

Na Vercel, _Storage_ › _Create Database_ › **Neon** e conecte ao projeto (ambientes **Production** e **Preview**). A integração cria o `DATABASE_URL` sozinha, junto com outras variáveis (`PG*`, `POSTGRES_*`) que o site não usa.

## 2. Imagens (Vercel Blob)

_Storage_ › _Create Database_ › **Blob** e conecte ao projeto (**Production** e **Preview**). A Vercel cria o `BLOB_READ_WRITE_TOKEN`. Sem ele, o painel até abre, mas os uploads (foto, currículo, telas) falham em produção.

## 3. Variáveis que faltam

_Settings_ › _Environment Variables_ (ambientes **Production** e **Preview**):

| Variável               | Valor                                                                     |
| ---------------------- | ------------------------------------------------------------------------- |
| `PAYLOAD_SECRET`       | uma string nova: `openssl rand -hex 32` (não reutilize a do `.env` local) |
| `NEXT_PUBLIC_SITE_URL` | `https://lucas-paiva-portfolio-beige.vercel.app` (sem barra no final)     |

Confira também:

- _Settings_ › _Git_ › **Production Branch: `main`**. A branch padrão do GitHub é `development`, então sem isso a Vercel publicaria a `development` como produção.
- _Settings_ › _Build and Deployment_ › **Node.js Version: 24.x ou mais nova** (o Payload exige Node ≥ 24.22.1).

Depois, _Deployments_ › último deploy › _Redeploy_. Mudar variável não refaz os deploys antigos.

## 4. Conteúdo e conta de admin

O primeiro build cria as tabelas. Depois dele, no seu computador, com o `DATABASE_URL` do Neon (_Storage_ › seu banco › _.env.local_ › copie o `DATABASE_URL`):

1. Conteúdo inicial (tecnologias, projetos, experiências e perfil, em pt e en):

   ```bash
   DATABASE_URL="URI-DO-NEON" NODE_ENV=production pnpm seed
   ```

   Sem esse passo o site também sobe: a Home usa os textos padrão até você preencher o painel.

2. Conta de administrador. O site não aceita cadastro, nem a tela de "primeiro usuário" do painel:

   ```bash
   DATABASE_URL="URI-DO-NEON" NODE_ENV=production pnpm admin
   ```

   Ele pede e-mail, nome e senha (mínimo 12 caracteres). Rodar de novo com o mesmo e-mail troca a senha. Depois, entre em `https://lucas-paiva-portfolio-beige.vercel.app/admin`.

3. Preencha no painel o que falta: e-mail, LinkedIn, foto, currículo (PDF) e telas do CalorieUp.
4. Teste a prévia de compartilhamento colando o link no LinkedIn ou no WhatsApp.

## Observações

- **Previews usam o mesmo banco:** com o Neon ligado em Production e Preview, os deploys de PR leem e gravam no banco de produção. As migrations de um PR rodam nele já no preview.
- **Domínio próprio:** em _Settings_ › _Domains_, depois atualize `NEXT_PUBLIC_SITE_URL` e faça redeploy.
- **Mudanças no schema:** ao alterar coleções, gere uma migration com `pnpm payload migrate:create nome` e commite junto. Ela roda sozinha no próximo deploy.
- **Banco local:** continua sendo sincronizado direto pelo Payload em dev. Não rode `RUN_MIGRATIONS=true` contra ele.
- **Build falha com `relation "..." already exists`:** as tabelas do Neon foram criadas fora das migrations (por exemplo, um `pnpm seed` rodado sem `NODE_ENV=production` antes desta proteção existir). Recrie o banco pelas migrations — apaga tudo, então só enquanto não houver conteúdo de verdade — e depois rode de novo o seed e o admin do passo 4:

  ```bash
  DATABASE_URL="URI-DO-NEON" NODE_ENV=production pnpm payload migrate:fresh
  ```
