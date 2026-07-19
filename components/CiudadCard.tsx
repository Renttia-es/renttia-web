import Link from 'next/link'

interface CiudadCardProps {
  ciudad: string
  slug: string
  descripcion: string
  pisos: number
  ocupacion: string
  audience: 'propietarios' | 'inquilinos'
  imagen?: string
}

export default function CiudadCard({ ciudad, slug, descripcion, pisos, ocupacion, audience, imagen }: CiudadCardProps) {
  const href = audience === 'propietarios' ? `/${slug}` : `/habitaciones/${slug}`

  return (
    <Link href={href}
      className="group block bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Foto de ciudad */}
      {imagen && (
        <div className="relative h-44 overflow-hidden bg-navy-50">
          <img
            src={imagen}
            alt={`Gestión de alquiler en ${ciudad}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="font-serif text-white text-xl font-light">{ciudad}</span>
          </div>
        </div>
      )}

      <div className="p-5">
        {!imagen && (
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif text-navy text-xl font-normal group-hover:text-cta transition-colors duration-200">
              {ciudad}
            </h3>
            <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-cta flex items-center justify-center transition-colors duration-200 mt-0.5 shrink-0">
              <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        )}

        <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">{descripcion}</p>

        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="font-sans text-[0.65rem] text-gray-300 uppercase tracking-wider mb-0.5">Pisos activos</p>
            <p className="font-sans font-medium text-navy text-sm">{pisos}+</p>
          </div>
          <div className="border-l border-gray-100 pl-4">
            <p className="font-sans text-[0.65rem] text-gray-300 uppercase tracking-wider mb-0.5">Ocupación</p>
            <p className="font-sans font-medium text-emerald-600 text-sm">{ocupacion}</p>
          </div>
          <div className="ml-auto flex items-end">
            <svg className="w-4 h-4 text-gray-200 group-hover:text-cta group-hover:translate-x-1 transition-all duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
