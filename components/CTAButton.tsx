'use client'

interface Props {
  texto?: string
  className?: string
}

export default function CTAButton({
  texto = 'Solicitar valoración gratuita',
  className = '',
}: Props) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('renttia:open-modal'))}
      className={className}
    >
      {texto}
    </button>
  )
}
