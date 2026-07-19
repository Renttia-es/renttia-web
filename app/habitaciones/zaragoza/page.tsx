import type { Metadata } from 'next'
import Link from 'next/link'
import HabitacionCard, { type Habitacion } from '@/components/HabitacionCard'

export const metadata: Metadata = {
  title: 'Alquiler de Habitaciones en Zaragoza | Pisos Compartidos',
  description:
    'Habitaciones en alquiler en Zaragoza desde 280€/mes. Pisos compartidos amueblados, con WIFI y suministros incluidos. Actur, Delicias, Centro y Universidad. Reserva online.',
  alternates: { canonical: 'https://renttia.es/habitaciones/zaragoza' },
  openGraph: {
    title: 'Alquiler de Habitaciones en Zaragoza | Renttia',
    description: 'Pisos compartidos premium en Zaragoza desde 280€. WIFI y suministros incluidos.',
    url: 'https://renttia.es/habitaciones/zaragoza',
  },
}

const zonas = [
  { nombre: 'Actur',        href: '/habitaciones/zaragoza/actur',        desc: 'Zona residencial tranquila, bien comunicada' },
  { nombre: 'Delicias',     href: '/habitaciones/zaragoza/delicias',      desc: 'El barrio más accesible y dinámico de Zaragoza' },
  { nombre: 'Universidad',  href: '/habitaciones/zaragoza/universidad',   desc: 'Ideal para estudiantes, cerca del campus' },
]

const habitaciones: Habitacion[] = [
  {
    id: 'h1', titulo: 'Hab. con escritorio y cama en piso de 4', zona: 'Actur, Zaragoza',
    precio: 340, habitaciones: 4, banos: 2, m2: 14, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Lavadora'],
    // Habitación realista: cama + escritorio con silla, buena luz natural
    imagen: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80',
    href: '/habitaciones/zaragoza/actur',
  },
  {
    id: 'h2', titulo: 'Hab. exterior con escritorio y balcón', zona: 'Centro, Zaragoza',
    precio: 390, habitaciones: 3, banos: 1, m2: 18, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Calefacción'],
    // Habitación acogedora con zona de estudio
    imagen: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
    href: '/habitaciones/zaragoza',
  },
  {
    id: 'h3', titulo: 'Hab. individual en piso reformado', zona: 'Delicias, Zaragoza',
    precio: 295, habitaciones: 5, banos: 2, m2: 12, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado'],
    // Habitación simple, limpia y funcional para estudiante
    imagen: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
    href: '/habitaciones/zaragoza/delicias',
  },
  {
    id: 'h4', titulo: 'Hab. en piso cerca de la UZ con TV', zona: 'Campus Universidad, Zaragoza',
    precio: 310, habitaciones: 4, banos: 2, m2: 13, disponible: false,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'TV'],
    // Habitación con TV y cama, estilo estudiante
    imagen: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',
    href: '/habitaciones/zaragoza/universidad',
  },
  {
    id: 'h5', titulo: 'Hab. con baño privado y escritorio', zona: 'Actur, Zaragoza',
    precio: 460, habitaciones: 4, banos: 4, m2: 20, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Baño privado', 'A/C'],
    // Habitación más grande con zona de trabajo y baño propio
    imagen: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    href: '/habitaciones/zaragoza/actur',
  },
  {
    id: 'h6', titulo: 'Hab. amplia con terraza en piso compartido', zona: 'Delicias, Zaragoza',
    precio: 320, habitaciones: 5, banos: 2, m2: 16, disponible: true,
    incluye: ['WIFI', 'Suministros', 'Amueblado', 'Terraza común'],
    // Habitación con luz natural y espacio real
    imagen: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80',
    href: '/habitaciones/zaragoza/delicias',
  },
]

const ventajas = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    texto: 'WIFI incluido',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    texto: 'Suministros incluidos',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
    texto: 'Completamente amueblado',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    texto: 'Contrato legal garantizado',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    texto: 'Zonas comunes cuidadas',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    texto: 'Gestión 100% online',
  },
]

export default function HabitacionesZaragozaPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-navy relative z-[1] overflow-hidden pt-[96px] pb-12 lg:pb-20 -mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(29,78,216,0.25),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Link href="/" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Inicio</Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/50 font-sans text-xs">Habitaciones en Zaragoza</span>
            </div>
            <h1 className="font-serif text-white text-3xl sm:text-5xl font-light leading-tight mb-4 lg:mb-5">
              Habitaciones en Zaragoza
            </h1>
            <p className="font-sans text-white/55 text-lg leading-relaxed mb-8">
              Habitaciones desde <strong className="text-white font-medium">280€/mes</strong> con WIFI y suministros incluidos.
              Cama, escritorio y armario en cada habitación. Sin sorpresas en la factura.
            </p>
            <div className="flex flex-wrap gap-2">
              {ventajas.map(v => (
                <span key={v.texto} className="flex items-center gap-1.5 bg-white/6 border border-white/10 rounded-full px-3 py-1.5 text-white/55 text-xs font-sans hover:bg-white/10 transition-colors">
                  {v.icon}
                  {v.texto}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONAS ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-sans text-xs font-medium text-gray-400 uppercase tracking-widest shrink-0">
              Zona:
            </span>
            <div className="flex flex-wrap gap-2">
              <Link href="/habitaciones/zaragoza"
                className="bg-navy text-white text-xs font-sans font-medium px-4 py-2 rounded-full">
                Todas
              </Link>
              {zonas.map(z => (
                <Link key={z.href} href={z.href}
                  className="bg-cream border border-gray-200 hover:border-cta/40 hover:text-cta text-navy text-xs font-sans font-medium px-4 py-2 rounded-full transition-colors">
                  {z.nombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO ──────────────────────────────────────────────── */}
      <section className="py-14 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="font-sans text-sm text-gray-400">
              <strong className="text-navy font-medium">{habitaciones.filter(h => h.disponible).length}</strong> habitaciones disponibles ahora mismo
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {habitaciones.map(h => (
              <HabitacionCard key={h.id} h={h} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONAS DETALLE ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Explora por barrio</span>
            <h2 className="font-serif text-navy text-3xl font-light">
              Habitaciones por zona en Zaragoza
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {zonas.map(z => (
              <Link key={z.href} href={z.href}
                className="group block bg-cream rounded-3xl border border-gray-100 p-7 hover:shadow-lg hover:border-cta/20 transition-all duration-300">
                <h3 className="font-serif text-navy text-xl font-normal mb-2 group-hover:text-cta transition-colors">
                  Habitaciones en {z.nombre}
                </h3>
                <p className="font-sans text-gray-400 text-sm mb-5 leading-relaxed">{z.desc}</p>
                <span className="text-cta text-sm font-sans font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Ver habitaciones
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PROPIETARIOS ──────────────────────────────────────── */}
      <section className="py-14 bg-navy-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mb-3">¿Eres propietario?</p>
          <h2 className="font-serif text-navy text-2xl font-light mb-5">
            ¿Tienes un piso en Zaragoza? Empieza a cobrar sin gestionar nada.
          </h2>
          <Link href="/zaragoza" className="btn-outline-navy inline-flex text-sm">
            Ver cómo funciona →
          </Link>
        </div>
      </section>
    </>
  )
}
