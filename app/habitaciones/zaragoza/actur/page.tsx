import type { Metadata } from 'next'
import Link from 'next/link'
import HabitacionCard, { type Habitacion } from '@/components/HabitacionCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Alquiler en el Actur, Zaragoza | Renttia',
  description:
    'Habitaciones en alquiler en el barrio del Actur en Zaragoza desde 300€/mes. Pisos compartidos amueblados, WIFI y suministros incluidos. Reserva online.',
  alternates: { canonical: 'https://renttia.es/habitaciones/zaragoza/actur' },
}

const habitaciones: Habitacion[] = [
  {
    id: 'a1', titulo: 'Habitación luminosa junto al parque', zona: 'Actur Norte, Zaragoza',
    precio: 340, habitaciones: 4, banos: 2, m2: 14, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Lavadora'],
    imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    href: '/habitaciones/zaragoza/actur',
  },
  {
    id: 'a2', titulo: 'Habitación premium con baño propio', zona: 'Actur, Zaragoza',
    precio: 460, habitaciones: 4, banos: 4, m2: 20, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Baño privado', 'A/C'],
    imagen: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    href: '/habitaciones/zaragoza/actur',
  },
  {
    id: 'a3', titulo: 'Habitación individual bien comunicada', zona: 'Actur Sur, Zaragoza',
    precio: 310, habitaciones: 5, banos: 2, m2: 12, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado'],
    imagen: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80',
    href: '/habitaciones/zaragoza/actur',
  },
]

export default function ActurPage() {
  return (
    <>
      <section className="bg-navy relative z-[1] overflow-hidden pt-[96px] pb-12 lg:pb-20 -mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(18,52,98,0.4),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Link href="/" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Inicio</Link>
            <span className="text-white/20 text-xs">/</span>
            <Link href="/habitaciones/zaragoza" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Habitaciones Zaragoza</Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-white/50 font-sans text-xs">Actur</span>
          </div>
          <h1 className="font-serif text-white text-3xl sm:text-5xl font-light leading-tight mb-4">
            Habitaciones en el Actur, Zaragoza
          </h1>
          <p className="font-sans text-white/70 text-lg max-w-2xl">
            El Actur es uno de los barrios más tranquilos y bien comunicados de Zaragoza. Pisos amplios,
            bien equipados y a precios competitivos. WIFI y suministros incluidos.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {habitaciones.map(h => <HabitacionCard key={h.id} h={h} />)}
          </div>
          <div className="mt-10 text-center">
            <Link href="/habitaciones/zaragoza" className="btn-outline-navy inline-flex">
              ← Ver todas las habitaciones en Zaragoza
            </Link>
          </div>
        </div>
      </section>

      {/* Texto SEO */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-navy text-2xl font-light mb-4">
            ¿Por qué vivir en el Actur?
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-4">
            El barrio del Actur (Actuación Urbanística de Zaragoza) es uno de los barrios más grandes y
            modernos de la ciudad. Con más de 40.000 habitantes, cuenta con excelentes comunicaciones
            mediante el tranvía y autobuses, grandes superficies comerciales, colegios, parques y zonas verdes.
          </p>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Es especialmente atractivo para trabajadores y estudiantes que buscan tranquilidad sin alejarse
            demasiado del centro. Los precios de alquiler son más asequibles que en el Centro o la zona
            de Gran Vía, manteniendo una calidad de vida alta.
          </p>
        </div>
      </section>
    </>
  )
}


