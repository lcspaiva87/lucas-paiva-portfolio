import { MARK_PATH } from '@/components/brand/logo'

/** Monograma do site; as cores vêm de custom.scss (--brand, --brand-deep). */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="4 4 34 34" aria-hidden="true" className="lp-mark">
      <path
        className="lp-mark__shadow"
        fillRule="evenodd"
        transform="translate(3 3)"
        d={MARK_PATH}
      />
      <path className="lp-mark__face" fillRule="evenodd" d={MARK_PATH} />
    </svg>
  )
}

/** Login e tela de cadastro fechado. */
export function AdminLogo() {
  return (
    <span className="lp-logo">
      <Mark size={44} />
      <span className="lp-logo__text">
        <span className="lp-logo__name">
          Lucas Paiva
          <span className="lp-logo__dot" aria-hidden="true" />
        </span>
        <span className="lp-logo__sub">painel</span>
      </span>
    </span>
  )
}

/** Canto da navegação. */
export function AdminIcon() {
  return <Mark size={22} />
}
