import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solicitud recibida | Renttia',
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-cream py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Icono check */}
        <div className="w-20 h-20 bg-cta-light rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-serif text-navy text-3xl sm:text-4xl font-light mb-4">
          ¡Solicitud recibida!
        </h1>

        <p className="font-sans text-gray-500 text-lg leading-relaxed mb-8">
          Hemos recibido tu solicitud de valoración gratuita. Un miembro de nuestro equipo
          se pondrá en contacto contigo en <strong className="text-navy">menos de 24 horas</strong>.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left">
          <h2 className="font-serif text-navy text-lg font-semibold mb-3">¿Qué pasa ahora?</h2>
          <ol className="space-y-3">
            {[
              'Nuestro equipo revisa los datos de tu piso',
              'Te llamamos para concertar una visita o videollamada',
              'Te presentamos una propuesta de renta garantizada personalizada',
              'Si aceptas, firmamos el contrato y empezamos',
            ].map((paso, i) => (
              <li key={i} className="flex items-start gap-3 font-sans text-sm text-gray-600">
                <span className="shrink-0 w-6 h-6 rounded-full bg-cta text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {paso}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-outline-navy">
            Volver al inicio
          </Link>
          <Link href="/habitaciones/zaragoza" className="btn-cta">
            Ver habitaciones disponibles →
          </Link>
        </div>
      </div>
    </section>
  )
}


