import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articulos } from '@/lib/blog-articulos'
import BlogCTAPopup from '@/components/BlogCTAPopup'
import CTAButton from '@/components/CTAButton'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articulos.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const art = articulos.find(a => a.slug === slug)
  if (!art) return {}
  return {
    title: `${art.titulo} | Blog Renttia`,
    description: art.metaDescription,
    alternates: { canonical: `https://renttia.es/blog/${art.slug}` },
    openGraph: {
      title: art.titulo,
      description: art.metaDescription,
      url: `https://renttia.es/blog/${art.slug}`,
      images: [{ url: art.imagen }],
    },
  }
}

const categoriaColor: Record<string, string> = {
  'Guías para propietarios': 'bg-cta-light text-cta',
  'Legal y fiscal':          'bg-amber-50 text-amber-700',
  'Mercado inmobiliario':    'bg-emerald-50 text-emerald-700',
  'Gestión inmobiliaria':    'bg-purple-50 text-purple-700',
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params
  const art = articulos.find(a => a.slug === slug)
  if (!art) notFound()

  const relacionados = articulos.filter(a => a.slug !== art.slug).slice(0, 3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden -mt-16 z-[1]">
        <div className="absolute inset-0">
          <img src={art.imagen} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/88 to-navy" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-[96px] pb-12 lg:pb-16">
          {/* Volver — bloque propio */}
          <div className="mb-5">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/45 hover:text-white/75 text-sm font-sans transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver al blog
            </Link>
          </div>
          {/* Categoría */}
          <div className="mb-4">
            <span className={`inline-block text-[0.65rem] font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${categoriaColor[art.categoria] ?? 'bg-white/10 text-white/60'}`}>
              {art.categoria}
            </span>
          </div>
          {/* H1 — keyword principal */}
          <h1 className="font-serif text-white text-2xl sm:text-3xl lg:text-[2rem] font-light leading-snug mb-5 max-w-3xl">
            {art.titulo}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-white/45">
            <span>{art.autor}</span>
            <span>·</span>
            <time dateTime={art.fecha}>{art.fecha}</time>
            <span>·</span>
            <span>{art.lectura} de lectura</span>
          </div>
        </div>
      </section>

      {/* ── IMAGEN DESTACADA ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-52 sm:h-72 lg:h-[380px] shadow-lg">
          <img
            src={art.imagen}
            alt={art.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── LAYOUT: sidebar + contenido ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">

          {/* ── CONTENIDO PRINCIPAL ───────────────────────────── */}
          <article>
            {/* Extracto */}
            <p className="font-serif text-gray-500 text-lg sm:text-xl font-light leading-relaxed italic mb-10 pb-10 border-b border-gray-100">
              {art.extracto}
            </p>

            {/* Cuerpo dinámico */}
            <div>
              {art.contenido.map((bloque, i) => {
                if (bloque.tipo === 'h2') return (
                  <h2 key={i} className="font-serif text-navy text-xl sm:text-2xl font-light mt-10 mb-4 leading-snug">
                    {bloque.texto}
                  </h2>
                )
                if (bloque.tipo === 'h3') return (
                  <h3 key={i} className="font-serif text-navy text-lg font-normal mt-7 mb-3 leading-snug">
                    {bloque.texto}
                  </h3>
                )
                if (bloque.tipo === 'p') return (
                  <p key={i} className="font-sans font-normal text-gray-600 text-base leading-relaxed mb-5">
                    {bloque.texto}
                  </p>
                )
                if (bloque.tipo === 'ul') return (
                  <ul key={i} className="mb-6 space-y-2 pl-1">
                    {bloque.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 font-sans font-normal text-gray-600 text-base">
                        <span className="mt-1.5 w-4 h-4 rounded-full bg-cta-light flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
                if (bloque.tipo === 'ol') return (
                  <ol key={i} className="mb-6 space-y-2 pl-1">
                    {bloque.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 font-sans font-normal text-gray-600 text-base">
                        <span className="mt-0.5 w-6 h-6 rounded-full bg-navy flex items-center justify-center shrink-0 text-white text-xs font-sans font-medium">
                          {j + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                )
                if (bloque.tipo === 'destacado') return (
                  <blockquote key={i} className="my-8 border-l-4 border-cta bg-cta-light/30 rounded-r-2xl px-6 py-5">
                    <p className="font-serif text-navy text-base sm:text-lg font-light leading-relaxed italic">
                      {bloque.texto}
                    </p>
                  </blockquote>
                )
                return null
              })}
            </div>

            {/* CTA con popup */}
            <BlogCTAPopup />
          </article>

          {/* ── SIDEBAR — sticky desktop ───────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Mini CTA */}
              <div className="rounded-2xl bg-navy p-6 text-center">
                <p className="font-serif text-white text-lg font-light leading-snug mb-3">
                  ¿Quieres cobrar el día 1 sin gestionar nada?
                </p>
                <p className="font-sans text-white/60 text-xs mb-5">Valoración gratuita en menos de 24 h.</p>
                <CTAButton texto="Solicitar valoración →" className="btn-cta text-sm py-3 px-5 w-full" />
              </div>
              {/* Artículos relacionados */}
              {relacionados.length > 0 && (
                <div>
                  <p className="font-sans text-navy/40 text-[0.65rem] uppercase tracking-widest font-semibold mb-3">Más artículos</p>
                  <div className="space-y-3">
                    {relacionados.map(rel => (
                      <Link key={rel.slug} href={`/blog/${rel.slug}`}
                        className="group flex gap-3 items-start p-3 rounded-xl hover:bg-navy/4 transition-colors border border-transparent hover:border-navy/8">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-navy-50">
                          <img src={rel.imagen} alt={rel.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <p className="font-serif text-navy text-sm font-light leading-snug group-hover:text-cta transition-colors">
                          {rel.titulo}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

        </div>

        {/* Artículos relacionados — solo móvil/tablet */}
        {relacionados.length > 0 && (
          <div className="mt-14 pt-10 border-t border-gray-100 lg:hidden">
            <span className="section-label">Artículos relacionados</span>
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
              {relacionados.map(rel => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-cta/15 transition-all duration-300">
                  <div className="h-32 overflow-hidden bg-navy-50 shrink-0">
                    <img src={rel.imagen} alt={rel.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className={`inline-block text-[0.6rem] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${categoriaColor[rel.categoria] ?? 'bg-gray-100 text-gray-500'}`}>
                      {rel.categoria}
                    </span>
                    <h3 className="font-serif text-navy text-sm font-normal leading-snug group-hover:text-cta transition-colors">
                      {rel.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
