import type { Metadata } from 'next'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { articulos } from '@/lib/blog-articulos'

export const metadata: Metadata = {
  title: 'Blog — Guías y consejos para propietarios que quieren alquilar sin riesgos',
  description:
    'Artículos y guías sobre inquiocupación, impagos, Rent to Rent y cómo alquilar tu piso de forma segura en Zaragoza y Huesca.',
  alternates: { canonical: 'https://renttia.es/blog' },
}

const categorias = ['Todos', 'Guías para propietarios', 'Legal y fiscal', 'Mercado inmobiliario', 'Gestión inmobiliaria']

const categoriaColor: Record<string, string> = {
  'Guías para propietarios': 'bg-cta-light text-cta',
  'Legal y fiscal':          'bg-amber-50 text-amber-700',
  'Mercado inmobiliario':    'bg-emerald-50 text-emerald-700',
  'Gestión inmobiliaria':    'bg-purple-50 text-purple-700',
}

export default function BlogPage() {
  const [destacado, ...resto] = articulos

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden -mt-16 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(29,78,216,0.25),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-[88px] pb-14 lg:pb-20">
          <div className="max-w-2xl">
            <span className="section-label text-cta-light">Recursos y consejos</span>
            <h1 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-4">
              Blog de Renttia
            </h1>
            <p className="font-sans text-white/55 text-base leading-relaxed">
              Guías, análisis de mercado y consejos prácticos sobre gestión profesional de inmuebles
              y alquiler de habitaciones premium en Aragón y La Rioja.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTROS DE CATEGORÍA — sticky bajo la navbar ─────────────── */}
      <section className="bg-white border-b border-gray-100 py-5 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat, i) => (
              <button
                key={cat}
                className={`text-xs font-sans font-medium px-4 py-2 rounded-full transition-colors ${
                  i === 0
                    ? 'bg-navy text-white'
                    : 'bg-cream border border-gray-200 text-navy hover:border-cta/40 hover:text-cta'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── ARTÍCULO DESTACADO ────────────────────────────────────── */}
        <div className="mb-14">
          <span className="section-label">Artículo destacado</span>
          <Link href={`/blog/${destacado.slug}`}
            className="group grid lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-cta/15 transition-all duration-300">
            <div className="relative h-64 lg:h-auto overflow-hidden bg-navy-50">
              <img
                src={destacado.imagen}
                alt={destacado.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className={`inline-block text-[0.65rem] font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start ${categoriaColor[destacado.categoria]}`}>
                {destacado.categoria}
              </span>
              <h2 className="font-serif text-navy text-2xl sm:text-3xl font-light leading-snug mb-4 group-hover:text-cta transition-colors">
                {destacado.titulo}
              </h2>
              <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
                {destacado.extracto}
              </p>
              <div className="flex items-center gap-4 text-xs font-sans text-gray-300">
                <span>{destacado.autor}</span>
                <span>·</span>
                <span>{destacado.fecha}</span>
                <span>·</span>
                <span>{destacado.lectura} lectura</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ── GRID DE ARTÍCULOS ─────────────────────────────────────── */}
        <div>
          <span className="section-label">Todos los artículos</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resto.map(art => (
              <Link key={art.slug} href={`/blog/${art.slug}`}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-cta/15 hover:-translate-y-0.5 transition-all duration-300">
                {/* Imagen */}
                <div className="relative h-48 overflow-hidden bg-navy-50 shrink-0">
                  <img
                    src={art.imagen}
                    alt={art.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-block text-[0.65rem] font-sans font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 self-start ${categoriaColor[art.categoria]}`}>
                    {art.categoria}
                  </span>
                  <h3 className="font-serif text-navy text-lg font-normal leading-snug mb-3 group-hover:text-cta transition-colors flex-1">
                    {art.titulo}
                  </h3>
                  <p className="font-sans text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {art.extracto}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-xs font-sans text-gray-300">
                      <span>{art.fecha}</span>
                      <span>·</span>
                      <span>{art.lectura}</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-cta group-hover:translate-x-1 transition-all duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── NEWSLETTER CTA ────────────────────────────────────────── */}
        <div className="mt-16 bg-navy rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_-10%_-10%,rgba(29,78,216,0.4),transparent)]" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-white text-2xl sm:text-3xl font-light mb-3">
                ¿Eres propietario en Aragón o La Rioja?
              </h2>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                Solicita una valoración gratuita de tu inmueble y descubre cuánto puedes cobrar
                con gestión profesional. Sin compromiso, en menos de 24 horas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <CTAButton texto="Quiero una valoración →" className="btn-cta text-sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
