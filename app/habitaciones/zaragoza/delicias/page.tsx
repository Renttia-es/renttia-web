import type { Metadata } from 'next'
import Link from 'next/link'
import HabitacionCard, { type Habitacion } from '@/components/HabitacionCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Alquiler en Delicias, Zaragoza | Renttia',
  description:
    'Habitaciones en alquiler en el barrio de Delicias en Zaragoza desde 280€/mes. El barrio más poblado de Zaragoza. WIFI y suministros incluidos. Reserva online.',
  alternates: { canonical: 'https://renttia.es/habitaciones/zaragoza/delicias' },
}

const habitaciones: Habitacion[] = [
  {
    id: 'd1', titulo: 'Habitación individual en piso reformado', zona: 'Delicias, Zaragoza',
    precio: 295, habitaciones: 5, banos: 2, m2: 12, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado'],
    imagen: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80',
    href: '/habitaciones/zaragoza/delicias',
  },
  {
    id: 'd2', titulo: 'Habitación amplia en piso de diseño', zona: 'Delicias, Zaragoza',
    precio: 320, habitaciones: 5, banos: 2, m2: 16, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Terraza común'],
    imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    href: '/habitaciones/zaragoza/delicias',
  },
  {
    id: 'd3', titulo: 'Habitación céntrica con vistas', zona: 'Delicias Sur, Zaragoza',
    precio: 305, habitaciones: 4, banos: 2, m2: 14, disponible: false,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'A/C'],
    imagen: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=600&q=80',
    href: '/habitaciones/zaragoza/delicias',
  },
]

export default function DeliciasPage() {
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
            <span className="text-white/50 font-sans text-xs">Delicias</span>
          </div>
          <h1 className="font-serif text-white text-3xl sm:text-5xl font-light leading-tight mb-4">
            Habitaciones en Delicias, Zaragoza
          </h1>
          <p className="font-sans text-white/70 text-lg max-w-2xl">
            Delicias es el barrio más poblado de Zaragoza, con gran actividad comercial y conexiones
            directas al centro. Habitaciones a precios muy competitivos para trabajadores y estudiantes.
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

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-navy text-2xl font-light mb-4">
            Vivir en Delicias: todo lo que necesitas saber
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-4">
            El barrio de Delicias, con más de 100.000 habitantes, es el barrio más grande de Zaragoza
            y uno de los más dinámicos. Dispone de una excelente red de transporte público, múltiples
            líneas de autobús, comercios de todo tipo y la Estación Delicias de alta velocidad.
          </p>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Los precios de alquiler aquí son más asequibles que en el centro histórico, lo que lo convierte
            en la opción favorita para trabajadores con buena capacidad de organización y presupuesto ajustado.
            En Renttia mantenemos pisos en las mejores calles del barrio.
          </p>
        </div>
      </section>
    </>
  )
}


