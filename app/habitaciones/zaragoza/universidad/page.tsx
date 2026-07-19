import type { Metadata } from 'next'
import Link from 'next/link'
import HabitacionCard, { type Habitacion } from '@/components/HabitacionCard'

export const metadata: Metadata = {
  title: 'Habitaciones cerca de la Universidad de Zaragoza | Renttia',
  description:
    'Habitaciones en alquiler cerca del Campus de la Universidad de Zaragoza desde 280€. Pisos compartidos para estudiantes, con WIFI, suministros y todo amueblado.',
  alternates: { canonical: 'https://renttia.es/habitaciones/zaragoza/universidad' },
}

const habitaciones: Habitacion[] = [
  {
    id: 'u1', titulo: 'Habitación a 5 min. del Campus Río Ebro', zona: 'Campus UZ, Zaragoza',
    precio: 310, habitaciones: 4, banos: 2, m2: 13, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Escritorio'],
    imagen: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=600&q=80',
    href: '/habitaciones/zaragoza/universidad',
  },
  {
    id: 'u2', titulo: 'Habitación tranquila, ideal para estudiar', zona: 'San José, Zaragoza',
    precio: 290, habitaciones: 4, banos: 2, m2: 12, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Tranquilo'],
    imagen: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',
    href: '/habitaciones/zaragoza/universidad',
  },
  {
    id: 'u3', titulo: 'Habitación exterior en piso compartido', zona: 'Romareda, Zaragoza',
    precio: 340, habitaciones: 3, banos: 1, m2: 15, disponible: false,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Céntrico'],
    imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    href: '/habitaciones/zaragoza/universidad',
  },
]

export default function UniversidadPage() {
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
            <span className="text-white/50 font-sans text-xs">Zona Universidad</span>
          </div>
          <h1 className="font-serif text-white text-3xl sm:text-5xl font-light leading-tight mb-4">
            Habitaciones cerca de la Universidad de Zaragoza
          </h1>
          <p className="font-sans text-white/70 text-lg max-w-2xl">
            Pisos compartidos premium para estudiantes universitarios, cerca del Campus Río Ebro
            y de las facultades del centro. WIFI de alta velocidad, escritorio y todo amueblado.
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
            La mejor opción para estudiantes de la UZ
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-4">
            La Universidad de Zaragoza cuenta con varios campus distribuidos por la ciudad: Campus Río Ebro
            (ciencias e ingenierías), Campus San Francisco (humanidades y sociales) y el Campus de la Salud.
            Dependiendo de tu facultad, te recomendamos la mejor zona.
          </p>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            En Renttia seleccionamos pisos que combinan precio, comodidad y proximidad al campus. Todos
            nuestros pisos para estudiantes incluyen escritorio en la habitación, WIFI de alta velocidad y
            un ambiente de convivencia tranquilo y organizado.
          </p>
        </div>
      </section>
    </>
  )
}


