/**
 * Cria a conta de admin do painel, ou troca a senha se o e-mail já existir.
 * O site não aceita cadastro; este é o único jeito de criar um usuário.
 *
 *   pnpm admin
 *   DATABASE_URL="URI-DO-SUPABASE" NODE_ENV=production pnpm admin   # produção
 */
import config from '@payload-config'
import { createInterface } from 'node:readline/promises'
import { Writable } from 'node:stream'
import { getPayload } from 'payload'

const MIN_PASSWORD = 12

// Esconde o que é digitado na senha.
let muted = false
const output = new Writable({
  write(chunk, _encoding, done) {
    if (!muted) process.stdout.write(chunk)
    done()
  },
})
const rl = createInterface({ input: process.stdin, output, terminal: Boolean(process.stdin.isTTY) })
// O iterador guarda as linhas que chegam enquanto o Payload inicia.
const lines = rl[Symbol.asyncIterator]()

async function ask(question: string, hidden = false) {
  process.stdout.write(question)
  muted = hidden
  const { value } = await lines.next()
  muted = false
  if (hidden) process.stdout.write('\n')
  return String(value ?? '').trim()
}

function fail(message: string): never {
  console.error(`✗ ${message}`)
  process.exit(1)
}

const email = (await ask('E-mail: ')).toLowerCase()
if (!/^\S+@\S+\.\S+$/.test(email)) fail('E-mail inválido.')

const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})
const existing = docs[0]

const name = existing ? undefined : await ask('Nome: ')
const password = await ask(existing ? 'Nova senha: ' : 'Senha: ', true)
if (password.length < MIN_PASSWORD)
  fail(`A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`)
if ((await ask('Repita a senha: ', true)) !== password) fail('As senhas não conferem.')
rl.close()

if (existing) {
  await payload.update({ collection: 'users', id: existing.id, data: { password } })
  console.log(`✓ Senha de ${email} atualizada.`)
} else {
  await payload.create({ collection: 'users', data: { email, password, name: name || undefined } })
  console.log(`✓ Conta ${email} criada. Entre em /admin.`)
}
process.exit(0)
