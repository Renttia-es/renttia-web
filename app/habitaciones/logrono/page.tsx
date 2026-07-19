import type { Metadata } from 'next'
import Link from 'next/link'
import HabitacionCard, { type Habitacion } from '@/components/HabitacionCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Alquiler en Logroño | Estudiantes y Trabajadores',
  description:
    'Habitaciones en alquiler en Logroño para estudiantes y trabajadores desde 260€/mes. Pisos compartidos amueblados, WIFI y suministros incluidos. Reserva online.',
  alternates: { canonical: 'https://renttia.es/habitaciones/logrono' },
  openGraph: {
    title: 'Habitaciones en Alquiler en Logroño | Renttia',
    url: 'https://renttia.es/habitaciones/logrono',
  },
}

const habitaciones: Habitacion[] = [
  {
    id: 'l1', titulo: 'Habitación en el centro histórico', zona: 'Casco Antiguo, Logroño',
    precio: 300, habitaciones: 4, banos: 2, m2: 13, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Céntrico'],
    imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    href: '/habitaciones/logrono',
  },
  {
    id: 'l2', titulo: 'Habitación cerca de la UR', zona: 'Zona Universidad, Logroño',
    precio: 280, habitaciones: 3, banos: 1, m2: 12, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado'],
    imagen: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80',
    href: '/habitaciones/logrono',
  },
  {
    id: 'l3', titulo: 'Habitación exterior con mucha luz', zona: 'Ensanche, Logroño',
    precio: 320, habitaciones: 4, banos: 2, m2: 16, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Calefacción'],
    imagen: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',
    href: '/habitaciones/logrono',
  },
]

export default function HabitacionesLogronoPag() {
  return (
    <>
      <section className="bg-navy relative z-[1] overflow-hidden pt-[96px] pb-12 lg:pb-20 -mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(18,52,98,0.4),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Link href="/" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Inicio</Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/50 font-sans text-xs">Habitaciones en Logroño</span>
            </div>
            <h1 className="font-serif text-white text-3xl sm:text-5xl font-light leading-tight mb-4 lg:mb-5">
              Habitaciones en Logroño
            </h1>
            <p className="font-sans text-white/55 text-lg leading-relaxed mb-8">
              Habitaciones desde <strong className="text-white font-medium">260€/mes</strong> con WIFI y suministros incluidos.
              Cama, escritorio y armario en cada habitación. Para estudiantes y trabajadores.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {habitaciones.map(h => <HabitacionCard key={h.id} h={h} />)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-navy text-2xl font-light mb-4">
            Alquiler de habitaciones en Logroño
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-4">
            Logroño es la capital de La Rioja, conocida por su riqueza gastronómica y su excelente
            calidad de vida. La ciudad tiene una demanda creciente de habitaciones de alquiler,
            impulsada por los estudiantes de la Universidad de La Rioja y los trabajadores de los
            sectores servicios y vitivinícola.
          </p>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-6">
            En Renttia seleccionamos pisos en las mejores zonas de Logroño: el Casco Antiguo, el Ensanche
            y las zonas próximas al campus universitario. Todos los pisos están completamente reformados,
            amueblados y equipados.
          </p>
          <Link href="/logrono" className="btn-outline-navy inline-flex">
            ¿Tienes un piso en Logroño? Gestiónalo con Renttia →
          </Link>
        </div>
      </section>
    </>
  )
}


