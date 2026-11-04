# Deploy — Supabase + Vercel

O código já está pronto para produção: as migrations do banco rodam sozinhas no build da Vercel e as imagens do painel vão para o Supabase Storage. Estes passos são os que dependem das suas contas.

Tempo estimado: 15 minutos.

## 1. Supabase: banco e storage

1. Em [supabase.com](https://supabase.com), crie um projeto (região **South America (São Paulo)**). Guarde a senha do banco.
2. **Banco:** _Connect_ › _Connection string_ › **Transaction pooler** (porta `6543`). Copie a URI e troque `[YOUR-PASSWORD]` pela senha. Esse é o `DATABASE_URL`.
3. **Storage:** _Storage_ › _New bucket_ › nome `media`. Pode ser privado: o site busca as imagens pelo Payload.
4. **Chaves S3:** _Project Settings_ › _Storage_ › _S3 Connection_:
   - copie o **Endpoint** (`S3_ENDPOINT`) e a **Region** (`S3_REGION`);
   - em _Access keys_, crie uma chave e copie **Access key ID** e **Secret access key** (o secret só aparece uma vez).

## 2. Conteúdo inicial (opcional, recomendado)

No seu computador, rode o seed apontando para o banco do Supabase. Ele cria as tabelas (migrations) e cadastra tecnologias, projetos, experiências e perfil:

```bash
DATABASE_URL="URI-DO-SUPABASE" RUN_MIGRATIONS=true NODE_ENV=production pnpm seed
```

Sem esse passo o site também sobe: o primeiro deploy cria as tabelas e a Home usa os textos padrão até você preencher o painel.

## 3. Vercel

1. _Settings_ › _Environment Variables_ (ambientes **Production** e **Preview**):

   | Variável               | Valor                                                                     |
   | ---------------------- | ------------------------------------------------------------------------- |
   | `DATABASE_URL`         | URI do Transaction pooler                                                 |
   | `PAYLOAD_SECRET`       | uma string nova: `openssl rand -hex 32` (não reutilize a do `.env` local) |
   | `NEXT_PUBLIC_SITE_URL` | `https://SEU-PROJETO.vercel.app` (sem barra no final)                     |
   | `S3_BUCKET`            | `media`                                                                   |
   | `S3_ENDPOINT`          | endpoint do passo 1.4                                                     |
   | `S3_REGION`            | região do passo 1.4                                                       |
   | `S3_ACCESS_KEY_ID`     | access key do passo 1.4                                                   |
   | `S3_SECRET_ACCESS_KEY` | secret do passo 1.4                                                       |

2. _Settings_ › _Git_ › **Production Branch: `main`**. A branch padrão do GitHub é `development`, então sem isso a Vercel publicaria a `development` como produção.
3. _Settings_ › _General_ › **Node.js Version: 24.x** (o Payload exige Node ≥ 24.22.1).
4. Faça um novo deploy (_Deployments_ › _Redeploy_), ou abra o PR `development` → `main`.

## 4. Depois do primeiro deploy

1. Crie a sua conta de administrador pelo terminal. O site não aceita cadastro, nem a tela de "primeiro usuário" do painel:

   ```bash
   DATABASE_URL="URI-DO-SUPABASE" NODE_ENV=production pnpm admin
   ```

   Ele pede e-mail, nome e senha (mínimo 12 caracteres). Rodar de novo com o mesmo e-mail troca a senha. Depois, entre em `https://SEU-PROJETO.vercel.app/admin`.

2. Preencha no painel o que falta: e-mail, LinkedIn, foto, currículo (PDF) e telas do CalorieUp.
3. Teste a prévia de compartilhamento colando o link no LinkedIn ou no WhatsApp.

## Observações

- **Limite de upload:** a Vercel aceita requisições de até 4,5 MB. Imagens maiores precisam ser comprimidas antes de subir.
- **Domínio próprio:** em _Settings_ › _Domains_, depois atualize `NEXT_PUBLIC_SITE_URL` e faça redeploy.
- **Mudanças no schema:** ao alterar coleções, gere uma migration com `pnpm payload migrate:create nome` e commite junto. Ela roda sozinha no próximo deploy.
- **Banco local:** continua sendo sincronizado direto pelo Payload em dev. Não rode `RUN_MIGRATIONS=true` contra ele.
