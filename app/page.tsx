import type { Metadata } from 'next'
import Link from 'next/link'
import CiudadCard from '@/components/CiudadCard'
import ReviewsTicker from '@/components/ReviewsTicker'
import CTAButton from '@/components/CTAButton'

/* ── SEO ── keyword principal en title + description enriquecida ── */
export const metadata: Metadata = {
  title: 'Gestión integral del alquiler de su vivienda | Renttia',
  description:
    'Renttia gestiona tu piso en Zaragoza y Huesca. Cobras el día 1 sin impagos, sin llamadas y sin comisiones de inmobiliaria. Gestión integral del alquiler. Valoración gratuita.',
  alternates: { canonical: 'https://renttia.es' },
  openGraph: {
    title: 'Gestión integral del alquiler de su vivienda | Renttia',
    url: 'https://renttia.es',
  },
}

const ciudadesPropietarios = [
  {
    ciudad: 'Zaragoza', slug: 'gestion-alquiler-zaragoza',
    descripcion: 'Más de 40 habitaciones gestionadas. La mayor cartera de pisos compartidos premium de la ciudad.',
    pisos: 40, ocupacion: '94%',
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  },
  {
    ciudad: 'Huesca', slug: 'gestion-alquiler-huesca',
    descripcion: 'Pioneros en gestión de pisos compartidos en Huesca. Mercado con alta demanda y poca oferta.',
    pisos: 8, ocupacion: '89%',
    imagen: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  },
]

const stats = [
  { valor: '78+', etiqueta: 'Pisos gestionados'  },
  { valor: '93%', etiqueta: 'Ocupación media'     },
  { valor: '0€',  etiqueta: 'Impagos en 3 años'  },
  { valor: '2',   etiqueta: 'Ciudades activas'    },
]

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          H1 — keyword principal: "gestión integral del alquiler"
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-[1] overflow-hidden min-h-[65vh] sm:min-h-[92vh] flex items-center -mt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1600&q=85"
            alt="Apartamento en alquiler gestionado por Renttia"
            className="w-full h-full object-cover"
          />
          {/* Degradado diagonal: azul desde arriba-izquierda, foto original abajo-derecha */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/55 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28 w-full">
          <div className="max-w-2xl">
            <span className="section-label text-cta-light">Gestión profesional de inmuebles</span>

            {/* H1 — keyword exacta del meta title, sin el pipe */}
            <h1 className="h1-hero text-white mb-4 sm:mb-5">
              Gestión integral del alquiler de su vivienda
            </h1>

            <p className="subtitle-italic mb-6 sm:mb-10 max-w-lg">
              Somos el inquilino perfecto: recibe su pago el día 1 de cada mes. Acondicionamos su piso y reformamos si es necesario. Gestionamos todas las incidencias por usted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton texto="Solicitar valoración gratuita" className="btn-cta text-sm py-3.5 sm:py-4 px-6 sm:px-8 w-full sm:w-auto text-center" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25">
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-gray-100 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map(s => (
              <div key={s.etiqueta} className="bg-white text-center py-6 sm:py-8 lg:py-10 px-4">
                <p className="font-serif text-navy text-3xl sm:text-4xl lg:text-6xl font-light">{s.valor}</p>
                <p className="font-sans text-gray-400 text-[0.65rem] sm:text-xs mt-1.5 tracking-widest uppercase">{s.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          H2 — "olvídese de los impagos…" / "morosidad alquiler"
          H3 — "inquiokupación" / riesgo inquilino
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-6 sm:mb-8 lg:mb-14">
            <span className="section-label">¿Qué buscas?</span>

            {/* H2 — miedo principal del propietario / impago moroso */}
            <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light max-w-3xl mx-auto">
              Olvídese de los impagos y la morosidad al alquilar su propiedad
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5">

            {/* Propietarios — H3 inquiokupación */}
            <Link href="/#como-funciona" className="group relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[440px] flex flex-col">
              <img
                src="/hab-4.jpg"
                alt="Propietario protegido frente a la inquiokupación"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/65 to-navy/30" />
              <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-12 lg:p-16 justify-end max-w-2xl">
                <span className="inline-block bg-cta text-white text-[0.65rem] font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start">
                  Soy propietario
                </span>
                {/* H3 — keyword "inquiokupación" */}
                <h3 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-4 leading-snug">
                  Máxima tranquilidad frente al riesgo de la inquiokupación
                </h3>
                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  Firma con Renttia su contrato de alquiler, no con el inquilino. Se olvida de cualquier preocupación y recibe su renta el día uno.
                </p>
                <span className="btn-cta text-sm self-start">Ver cómo funciona →</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          H2 — "seguro de impago de alquiler" alternativa
          H3 — "requisitos scoring" / "cobro puntual renta"
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-start mb-8 sm:mb-12 lg:mb-16">
            <div>
              <span className="section-label">Por qué Renttia</span>

              {/* H2 — keyword "inquilino perfecto alquiler" */}
              <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">
                Renttia es el inquilino perfecto.
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm lg:text-base leading-relaxed lg:pt-10">
              Firmamos el contrato, pagamos el día 1 y nos encargamos de todo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

            {/* Card 1 — H3 "sin requisitos de scoring" */}
            <div className="group flex flex-col gap-4 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl glass-card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cta to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl bg-navy/5 group-hover:bg-navy flex items-center justify-center text-navy group-hover:text-white transition-all duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              {/* H3 — keyword "seguro impago alquiler requisitos" */}
              <h3 className="font-serif text-navy text-base font-normal leading-snug">
                Sin los complejos requisitos de scoring ni el precio de una póliza
              </h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Ningún seguro le exige nóminas ni avales a sus inquilinos. Nosotros asumimos el riesgo.
              </p>
            </div>

            {/* Card 2 — H3 "cobro puntual renta" */}
            <div className="group flex flex-col gap-4 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl glass-card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cta to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl bg-navy/5 group-hover:bg-navy flex items-center justify-center text-navy group-hover:text-white transition-all duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              {/* H3 — keyword "cobro puntual renta" / "alquiler seguro impago" */}
              <h3 className="font-serif text-navy text-base font-normal leading-snug">
                Cobro puntual de la renta del 1 al 5 de cada mes
              </h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Sin esperas. La renta llega a su cuenta en los primeros días del mes, siempre.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col gap-4 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl glass-card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cta to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl bg-navy/5 group-hover:bg-navy flex items-center justify-center text-navy group-hover:text-white transition-all duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="font-serif text-navy text-base font-normal leading-snug">Sin llamadas de inquilinos</h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Renttia es su único interlocutor. Averías, incidencias, rotaciones. Usted no recibe ninguna llamada.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group flex flex-col gap-4 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl glass-card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cta to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl bg-navy/5 group-hover:bg-navy flex items-center justify-center text-navy group-hover:text-white transition-all duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-serif text-navy text-base font-normal leading-snug">Piso devuelto en perfecto estado</h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                Reformamos antes de empezar. Mantenemos durante el contrato. Se lo devolvemos igual o mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-end mb-6 sm:mb-8 lg:mb-12">
            <div>
              <span className="section-label">Su propiedad en nuestras manos</span>
              <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">
                Así queda su piso cuando Renttia lo pone a punto.
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm lg:text-base leading-relaxed">
              Equipamos y amueblamos cada habitación antes de entrar: cama, escritorio, armario, WIFI y suministros a nuestro cargo.
              Su propiedad siempre presentada en su mejor versión, sin que usted invierta nada.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div className="col-span-2 lg:col-span-1 lg:row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative group aspect-[16/9] sm:aspect-video lg:aspect-auto lg:min-h-[520px]">
              <img src="/hab-1.jpg" alt="Habitación con cama y escritorio para estudiante" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
              <div className="absolute bottom-3 left-3 lg:bottom-5 lg:left-5">
                <p className="font-serif text-white text-sm sm:text-base lg:text-lg font-light">Cama + escritorio</p>
                <p className="font-sans text-white/60 text-[0.65rem] sm:text-xs hidden sm:block">Lo que un estudiante necesita</p>
              </div>
            </div>
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative group aspect-[4/3]">
              <img src="/hab-escritorio.jpg" alt="Escritorio de estudio en habitación" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4"><p className="font-serif text-white text-xs sm:text-sm lg:text-base font-light">Zona de trabajo</p></div>
            </div>
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative group aspect-[4/3]">
              <img src="/hab-armario.jpg" alt="Armario y almacenaje en habitación" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4"><p className="font-serif text-white text-xs sm:text-sm lg:text-base font-light">Armario y almacenaje</p></div>
            </div>
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative group aspect-[4/3]">
              <img src="/hab-comun.jpg" alt="Zona común del piso compartido" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4"><p className="font-serif text-white text-xs sm:text-sm lg:text-base font-light">Zonas comunes</p></div>
            </div>
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl bg-navy relative overflow-hidden flex flex-col items-start justify-end p-4 sm:p-5 lg:p-6 aspect-[4/3]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(18,52,98,0.6),transparent)]" />
              <div className="relative">
                <p className="font-serif text-white text-lg sm:text-xl lg:text-2xl font-light">Próximamente</p>
                <p className="font-sans text-white/50 text-[0.65rem] sm:text-xs">Habitaciones disponibles en breve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          H2 — "empresa de gestión de alquileres" / "buscar inquilinos"
          H3 — "gestión coliving" / "contratos estables 5 años"
          ═══════════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-10 sm:py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="section-label">El proceso</span>
            {/* H2 — keyword "buscar inquilinos para mi piso" / "administracion alquileres" */}
            <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light max-w-3xl mx-auto">
              Nos encargamos de buscar inquilinos y administrar todo el papeleo por usted
            </h2>
          </div>

          {/* 4 pasos numerados */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-10">
            {[
              { num: '01', t: 'Valoración gratuita',  d: 'Analizamos su piso y le damos una renta estimada en 24h. Sin compromiso.' },
              { num: '02', t: 'Firmamos el contrato', d: 'Contrato legal entre usted y Renttia. Sin inquilinos, sin intermediarios.' },
              { num: '03', t: 'Lo ponemos a punto',   d: 'Reforma, mobiliario y suministros a nuestro cargo. Listo para entrar.' },
              { num: '04', t: 'Cobra cada mes',       d: 'Renta garantizada del 1 al 5. Sin llamadas. Sin gestión. Sin impagos.' },
            ].map((p) => (
              <div key={p.num} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 transition-all duration-300 flex flex-col" style={{border:'1px solid rgba(18,52,98,0.08)',boxShadow:'0 0 0 1px rgba(18,52,98,0.05),0 4px 20px rgba(18,52,98,0.08)'}}>
                <span className="font-serif text-cta text-3xl sm:text-4xl lg:text-5xl font-light leading-none mb-3 sm:mb-5 tracking-tight">
                  {p.num}
                </span>
                <div className="w-6 sm:w-8 h-px bg-navy/15 mb-3 sm:mb-5" />
                <h3 className="font-serif text-navy text-sm sm:text-base lg:text-lg font-normal leading-snug mb-2">{p.t}</h3>
                <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed hidden sm:block">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Características clave debajo de los pasos */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* H3 — "revalorización inmueble" */}
            <div className="glass-card rounded-3xl p-6 lg:p-7 border border-gray-100 flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-cta-light flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-navy text-lg font-normal mb-2">
                  Revalorizamos su inmueble, con la tranquilidad de cobrar el día 1.
                </h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">
                  Equipamos y amueblamos cada habitación antes de entrar: cama, escritorio, armario, WIFI y suministros. La inversión corre de nuestra parte.
                </p>
              </div>
            </div>
            {/* H3 — "contratos estables" */}
            <div className="glass-card rounded-3xl p-6 lg:p-7 border border-gray-100 flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-cta-light flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-navy text-lg font-normal mb-2">
                  Contratos estables de 3 a 7 años con un único interlocutor, Renttia.
                </h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">
                  Un solo contrato. Una sola renta. Sin cambios de inquilino.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          H2 — "gestión inmobiliaria" local / "gestión arrendamientos"
          H4 — una por ciudad
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="section-label">Cobertura</span>

            {/* H2 — keyword "gestión arrendamientos" / "gestión inmobiliaria" local */}
            <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">
              Expertos locales en la gestión de arrendamientos en su ciudad
            </h2>
            <p className="font-sans text-gray-400 text-sm lg:text-base mt-4 max-w-md mx-auto leading-relaxed">
              Conocemos el mercado, los barrios y los precios en cada ciudad donde operamos.
            </p>
          </div>

          {/* H4 por ciudad — SEO local "gestión inmobiliaria zaragoza" etc. */}
          <div className="grid sm:grid-cols-3 gap-5">
            {ciudadesPropietarios.map(c => (
              <Link key={c.slug} href={`/${c.slug}`}
                className="group glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-navy/10 shadow-[0_0_0_1px_rgba(18,52,98,0.06),0_4px_24px_rgba(18,52,98,0.08)] hover:shadow-[0_0_0_1px_rgba(18,52,98,0.15),0_8px_32px_rgba(18,52,98,0.14)] transition-all duration-300 flex flex-col gap-4 sm:gap-5">
                {/* Indicador ciudad */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-cta">{c.ciudad}</span>
                  <svg className="w-4 h-4 text-navy/25 group-hover:text-navy/60 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                {/* H4 — keyword ciudad + gestión */}
                <h4 className="font-serif text-navy text-lg font-normal leading-snug">
                  {c.slug === 'gestion-alquiler-zaragoza' && 'Gestión y supervisión de viviendas en Zaragoza'}
                  {c.slug === 'gestion-alquiler-logrono'  && 'Optimización y cuidado de propiedades en Logroño'}
                  {c.slug === 'gestion-alquiler-huesca'   && 'Cobertura y protección para propietarios en Huesca'}
                </h4>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">{c.descripcion}</p>
                <div className="flex gap-3 mt-auto pt-2 border-t border-gray-100">
                  <span className="font-sans text-navy/60 text-xs"><strong className="font-semibold text-navy">{c.pisos}</strong> pisos activos</span>
                  <span className="text-gray-200">·</span>
                  <span className="font-sans text-navy/60 text-xs"><strong className="font-semibold text-navy">{c.ocupacion}</strong> ocupación</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          H2 — CTA / "alquiler sin inmobiliaria" / "renta pasiva"
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 sm:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&q=85"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
          <span className="font-sans font-medium text-[0.7rem] tracking-widest uppercase mb-4 inline-block text-white/50">
            Sin compromisos
          </span>

          {/* H2 — keyword "alquiler sin agencia" / "renta pasiva" */}
          <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
            Disfrute de una renta pasiva libre de comisiones de inmobiliarias
          </h2>

          <p className="font-sans text-white/65 text-base leading-relaxed mb-9">
            Valoración gratuita. Respuesta en 24 horas. Sin compromiso.
          </p>
          <CTAButton texto="Solicitar valoración gratuita" className="inline-flex items-center justify-center gap-2 bg-white text-navy hover:bg-navy-50 font-sans font-medium text-sm tracking-wide px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-px w-full sm:w-auto" />
          <p className="font-sans text-white/40 text-xs mt-4">Sin coste · Sin compromiso · Respuesta en 24h</p>
        </div>
      </section>

      {/* ── REVIEWS TICKER ───────────────────────────────────────────── */}
      <ReviewsTicker />

    </>
  )
}
