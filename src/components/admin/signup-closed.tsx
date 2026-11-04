import Link from 'next/link'

/**
 * Substitui a tela "Criar primeiro usuário" do painel. O cadastro é fechado
 * (ver collections/Users.ts); a conta de admin é criada no terminal.
 */
export function SignupClosed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--base) * 0.75)' }}>
      <h1>Cadastro fechado</h1>
      <p>Este painel não aceita novas contas. Crie a conta de administrador pelo terminal:</p>
      <pre>
        <code>pnpm admin</code>
      </pre>
      <p>
        Depois, <Link href="/admin/login">entre no painel</Link>.
      </p>
    </div>
  )
}
