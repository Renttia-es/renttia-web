import Link from 'next/link'

export interface Habitacion {
  id: string
  titulo: string
  zona: string
  precio: number
  habitaciones: number
  banos: number
  m2: number
  incluye: string[]
  imagen: string
  disponible: boolean
  href: string
}

export default function HabitacionCard({ h }: { h: Habitacion }) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      {/* Imagen */}
      <div className="relative h-52 bg-navy-50 overflow-hidden">
        <img
          src={h.imagen}
          alt={h.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          {h.disponible ? (
            <span className="bg-emerald-500 text-white text-[0.65rem] font-sans font-medium px-2.5 py-1 rounded-full">
              Disponible
            </span>
          ) : (
            <span className="bg-gray-500/80 backdrop-blur-sm text-white text-[0.65rem] font-sans font-medium px-2.5 py-1 rounded-full">
              Reservada
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-navy text-lg font-normal leading-snug">{h.titulo}</h3>
          <div className="shrink-0 text-right">
            <span className="font-sans font-semibold text-navy text-lg">{h.precio.toLocaleString('es-ES')}€</span>
            <span className="text-gray-300 text-xs font-sans block leading-none">/mes</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-sans mb-4 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-cta shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {h.zona}
        </p>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-400 font-sans mb-4 pb-4 border-b border-gray-50">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {h.habitaciones} hab.
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            {h.m2} m²
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            {h.banos} baño{h.banos !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {h.incluye.map(tag => (
            <span key={tag} className="bg-cta-light text-cta text-[0.65rem] font-sans font-medium px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={h.href}
            className={`btn-cta w-full text-xs py-3 ${!h.disponible ? 'opacity-40 pointer-events-none' : ''}`}
          >
            {h.disponible ? 'Ver habitación →' : 'No disponible'}
          </Link>
        </div>
      </div>
    </article>
  )
}
