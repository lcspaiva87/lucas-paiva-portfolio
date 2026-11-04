import { notFound } from 'next/navigation'

/**
 * Substitui a tela "Criar primeiro usuário" do Payload, que traria um formulário de
 * cadastro. O cadastro é fechado (ver collections/Users.ts) e a conta de admin é criada
 * no terminal com `pnpm admin`, então a rota responde 404. O proxy já barra a rota antes;
 * isto cobre qualquer caminho que chegue aqui mesmo assim.
 */
export function SignupClosed(): never {
  notFound()
}
