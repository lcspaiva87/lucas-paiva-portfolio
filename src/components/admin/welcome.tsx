import Link from 'next/link'
import type { TypedUser } from 'payload'

/** Topo do painel inicial: saudação e atalhos para o que mais se edita. */
export function Welcome({ user }: { user?: TypedUser | null }) {
  const firstName = (user && 'name' in user && user.name?.split(' ')[0]) || ''

  return (
    <section className="lp-welcome">
      <div className="lp-welcome__text">
        <p className="lp-welcome__eyebrow">Painel do portfólio</p>
        <h1 className="lp-welcome__title">{firstName ? `Olá, ${firstName}.` : 'Olá.'}</h1>
        <p className="lp-welcome__lead">
          Tudo o que aparece no site sai daqui: perfil, projetos, experiências e stack, em português
          e inglês.
        </p>
      </div>
      <div className="lp-welcome__actions">
        <Link href="/admin/globals/profile" className="btn btn--style-primary btn--size-medium">
          Editar perfil
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="btn btn--style-secondary btn--size-medium"
        >
          Ver o site ↗
        </a>
      </div>
    </section>
  )
}
