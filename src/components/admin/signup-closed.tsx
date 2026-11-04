import Link from 'next/link'

import { AdminLogo } from './graphics'

/**
 * Substitui a tela "Criar primeiro usuário" do painel. O cadastro é fechado
 * (ver collections/Users.ts); a conta de admin é criada no terminal.
 */
export function SignupClosed() {
  return (
    <div className="lp-closed">
      <AdminLogo />
      <div className="lp-closed__card">
        <span className="lp-closed__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Cadastro fechado
        </span>
        <h1 className="lp-closed__title">Este painel não aceita novas contas.</h1>
        <p className="lp-closed__text">
          A conta de administrador é criada pelo terminal, na pasta do projeto:
        </p>
        <code className="lp-closed__command">
          <span aria-hidden="true">$</span> pnpm admin
        </code>
        <p className="lp-closed__hint">Rodar de novo com o mesmo e-mail troca a senha.</p>
        <Link href="/admin/login" className="btn btn--style-primary btn--size-large lp-closed__cta">
          Ir para o login
        </Link>
      </div>
    </div>
  )
}
