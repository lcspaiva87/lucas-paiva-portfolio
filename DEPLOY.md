# Deploy — Vercel + Neon + Cloudflare R2

O código já está pronto para produção: as migrations do banco rodam sozinhas no build da Vercel e as imagens do painel vão para um bucket do Cloudflare R2. Estes passos são os que dependem da sua conta.

Tempo estimado: 10 minutos.

## 1. Banco (Neon)

Na Vercel, _Storage_ › _Create Database_ › **Neon** e conecte ao projeto (ambientes **Production** e **Preview**). A integração cria o `DATABASE_URL` sozinha, junto com outras variáveis (`PG*`, `POSTGRES_*`) que o site não usa.

## 2. Imagens (Cloudflare R2)

No painel da Cloudflare, _R2 Object Storage_:

1. **Create bucket** › nome `media`. Pode ficar privado: o site serve as imagens pelo Payload (`/api/media/file/...`), sem acesso público ao bucket.
2. **Manage R2 API Tokens** › **Create API token** › permissão **Object Read & Write**, limitada ao bucket `media`. Guarde o **Access Key ID** e o **Secret Access Key** (o secret só aparece uma vez).
3. Anote o **Account ID** (aparece na página do R2). O endpoint é `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.

Sem essas variáveis o painel até abre, mas os uploads (foto, currículo, telas) falham em produção. Cada upload passa pela Vercel, que aceita até 4,5 MB por arquivo.

## 3. Variáveis que faltam

_Settings_ › _Environment Variables_ (ambientes **Production** e **Preview**):

| Variável               | Valor                                                                     |
| ---------------------- | ------------------------------------------------------------------------- |
| `PAYLOAD_SECRET`       | uma string nova: `openssl rand -hex 32` (não reutilize a do `.env` local) |
| `NEXT_PUBLIC_SITE_URL` | `https://lucas-paiva-portfolio-beige.vercel.app` (sem barra no final)     |
| `S3_BUCKET`            | `media`                                                                   |
| `S3_ENDPOINT`          | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`                           |
| `S3_ACCESS_KEY_ID`     | Access Key ID do token do passo 2                                         |
| `S3_SECRET_ACCESS_KEY` | Secret Access Key do token do passo 2                                     |

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

2. Conta de administrador. O site não aceita cadastro (a rota de "primeiro usuário" do painel responde 404):

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
