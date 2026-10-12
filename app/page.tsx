import type { Metadata } from 'next'
import Link from 'next/link'
import ReviewsTicker from '@/components/ReviewsTicker'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'Gestión integral del alquiler de su vivienda | Renttia',
  description:
    'Renttia gestiona tu piso en Zaragoza y Huesca. Cobras el día 1 sin impagos, sin llamadas y sin preocupaciones. Gestión integral del alquiler. Valoración gratuita.',
  alternates: { canonical: 'https://renttia.es' },
  openGraph: {
    title: 'Gestión integral del alquiler de su vivienda | Renttia',
    url: 'https://renttia.es',
  },
}

const ciudadesPropietarios = [
  {
    ciudad: 'Zaragoza', slug: 'gestion-alquiler-zaragoza',
    descripcion: 'Gestión de pisos compartidos premium en el corazón de Zaragoza. Renta garantizada y cero preocupaciones.',
    pisos: 3, ocupacion: '94%',
    imagen: '/hab-comun.jpg',
    titulo: 'Gestión y supervisión de viviendas en Zaragoza',
  },
  {
    ciudad: 'Huesca', slug: 'gestion-alquiler-huesca',
    descripcion: 'Pioneros en gestión de pisos compartidos en Huesca. Mercado con alta demanda y poca oferta.',
    pisos: 9, ocupacion: '89%',
    imagen: '/hab-4.jpg',
    titulo: 'Cobertura y protección para propietarios en Huesca',
  },
  {
    ciudad: 'Logroño', slug: 'gestion-alquiler-logrono',
    descripcion: 'Nueva ciudad en expansión. Alta demanda de alquiler compartido y poca oferta de calidad gestionada.',
    pisos: 0, ocupacion: '—',
    imagen: '/hab-escritorio.jpg',
    titulo: 'Nueva ciudad: gestión de pisos compartidos en Logroño',
  },
]

const razones = [
  {
    t: 'Cobro puntual de la renta del 1 al 5 de cada mes',
    d: 'Sin esperas. La renta llega a su cuenta en los primeros días del mes, siempre.',
  },
  {
    t: 'Sin llamadas de inquilinos',
    d: 'Renttia es su único interlocutor. Averías, incidencias, rotaciones. Usted no recibe ninguna llamada.',
  },
  {
    t: 'Piso devuelto en perfecto estado',
    d: 'Lo ponemos a punto antes de empezar, sin coste para usted. Lo mantenemos durante el contrato. Se lo devolvemos igual o mejor.',
  },
]

const pasos = [
  { num: '01', t: 'Valoración gratuita', d: 'Analizamos su piso y le damos una renta estimada en 24h. Sin compromiso.' },
  { num: '02', t: 'Firmamos el contrato', d: 'Contrato legal entre usted y Renttia. Sin inquilinos, sin intermediarios.' },
  { num: '03', t: 'Lo ponemos a punto', d: 'Pintura, decoración, mobiliario y suministros a nuestro cargo. Listo para entrar.' },
  { num: '04', t: 'Cobra cada mes', d: 'Renta garantizada del 1 al 5. Sin llamadas. Sin gestión. Sin impagos.' },
]

const fotos = [
  { src: '/hab-1.jpg', alt: 'Habitación con cama y escritorio para estudiante', label: 'Cama y escritorio', clase: 'lg:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-[560px]' },
  { src: '/hab-escritorio.jpg', alt: 'Escritorio de estudio en habitación', label: 'Zona de trabajo', clase: 'min-h-[200px]' },
  { src: '/hab-armario.jpg', alt: 'Armario y almacenaje en habitación', label: 'Armario', clase: 'min-h-[200px]' },
  { src: '/hab-comun.jpg', alt: 'Zona común del piso compartido', label: 'Zonas comunes', clase: 'lg:col-span-2 min-h-[220px]' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative z-[1] bg-navy -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-sans text-sm font-semibold mb-5" style={{ color: '#F5C842' }}>Zaragoza · Huesca · Logroño</p>
            <h1 className="font-serif text-white font-semibold tracking-tight leading-[0.98] text-[2.5rem] sm:text-6xl lg:text-[4.75rem] [text-wrap:balance]">
              Gestión integral del alquiler de su vivienda
            </h1>
            <p className="font-sans text-white/90 text-lg sm:text-xl leading-relaxed mt-6 max-w-xl">
              Somos el inquilino perfecto: recibe su pago <span className="font-serif italic font-semibold" style={{ color: '#F5C842' }}>el día 1 de cada mes.</span> Acondicionamos y decoramos su piso a nuestro cargo. Gestionamos todas las incidencias por usted.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <CTAButton texto="Solicitar valoración gratuita" className="btn-cta-gold w-full sm:w-auto" />
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-lg border-t border-white/15 pt-6">
              <div>
                <dt className="font-sans text-xs font-semibold text-white/75">Impagos en 1 año</dt>
                <dd className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-1">0 €</dd>
              </div>
              <div>
                <dt className="font-sans text-xs font-semibold text-white/75">Ocupación media</dt>
                <dd className="font-serif text-3xl sm:text-4xl font-semibold mt-1" style={{ color: '#F5C842' }}>93%</dd>
              </div>
              <div>
                <dt className="font-sans text-xs font-semibold text-white/75">Ciudades</dt>
                <dd className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-1">3</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <img
                src="/hab-1.jpg"
                alt="Habitación puesta a punto por Renttia"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />
              <p className="absolute left-5 bottom-5 font-serif text-white text-2xl sm:text-3xl font-semibold">Su piso, puesto al día</p>
            </div>
            <div className="relative z-10 -mt-8 ml-4 sm:ml-8 bg-white rounded-2xl px-5 py-4 max-w-[280px] shadow-[0_18px_40px_-18px_rgba(6,20,45,0.55)]">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-navy">Cada mes</p>
              <p className="font-serif text-navy text-3xl font-semibold leading-none mt-1">Día 1</p>
              <p className="font-sans text-slate-700 text-sm mt-1">La renta entra. Haya habitaciones libres o no.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <h2 className="font-serif text-navy text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05] [text-wrap:balance]">
            Olvídese de los impagos y la morosidad al alquilar su propiedad
          </h2>
          <Link href="/#como-funciona" className="group relative block min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-[1.75rem]">
            <img
              src="/hab-4.jpg"
              alt="Propietario protegido frente a la inquiokupación"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-serif text-white text-2xl sm:text-3xl font-semibold leading-snug [text-wrap:balance]">
                Máxima tranquilidad frente al riesgo de la inquiokupación
              </h3>
              <p className="font-sans text-white/90 text-base leading-relaxed mt-3 max-w-md">
                Firma con Renttia su contrato de alquiler, no con el inquilino. Se olvida de cualquier preocupación y recibe su renta <span className="font-serif italic font-semibold" style={{ color: '#F5C842' }}>el día uno.</span>
              </p>
              <span className="inline-block mt-5 font-sans text-sm font-bold" style={{ color: '#F5C842' }}>Ver cómo funciona →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-end mb-12 lg:mb-16">
            <h2 className="font-serif text-navy text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Renttia es el inquilino perfecto.
            </h2>
            <p className="font-sans text-slate-700 text-lg leading-relaxed">
              Firmamos el contrato, pagamos el día 1 y nos encargamos de todo.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-navy px-6 py-8 sm:px-10 sm:py-12 mb-8" style={{ backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(245,200,66,0.16), transparent 55%)' }}>
            <h3 className="font-serif text-white text-2xl sm:text-4xl font-semibold leading-snug max-w-3xl [text-wrap:balance]">
              Sin los complejos requisitos de scoring ni el precio de una póliza
            </h3>
            <p className="font-sans text-white/90 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl">
              Ningún seguro le exige nóminas ni avales a sus inquilinos. Nosotros asumimos el riesgo directamente.
            </p>
            <p className="font-sans text-sm font-bold mt-6" style={{ color: '#F5C842' }}>Renttia garantiza su renta</p>
          </div>

          <ol className="divide-y divide-navy/10 border-y border-navy/10">
            {razones.map((r, i) => (
              <li key={r.t} className="grid sm:grid-cols-[4rem_1fr] gap-3 sm:gap-8 py-6 sm:py-8">
                <span className="font-sans text-sm font-bold tabular-nums text-navy">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-serif text-navy text-xl sm:text-2xl font-semibold leading-snug">{r.t}</h3>
                  <p className="font-sans text-slate-700 text-base leading-relaxed mt-2 max-w-2xl">{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-16 items-end mb-10">
            <h2 className="font-serif text-navy text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05] [text-wrap:balance]">
              Así queda su piso cuando Renttia lo pone a punto.
            </h2>
            <p className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed">
              Equipamos y amueblamos cada habitación antes de entrar: cama, escritorio, armario, WIFI y suministros a nuestro cargo. Pintamos y decoramos según las tendencias actuales, sin coste para usted. Su propiedad siempre presentada en su mejor versión, sin que usted invierta nada.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {fotos.map(f => (
              <figure key={f.src} className={`relative overflow-hidden rounded-[1.25rem] ${f.clase}`}>
                <img src={f.src} alt={f.alt} className="absolute inset-0 w-full h-full object-cover" />
                <figcaption className="absolute left-3 bottom-3 bg-white/95 text-navy font-sans text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">{f.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="font-sans text-slate-700 text-sm font-semibold mt-5">Próximamente: habitaciones disponibles en breve.</p>
        </div>
      </section>

      <section id="como-funciona" className="bg-navy py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05] max-w-3xl [text-wrap:balance]">
            Nos encargamos de buscar inquilinos y administrar todo el papeleo por usted
          </h2>
          <ol className="mt-12 grid lg:grid-cols-4 gap-8 lg:gap-6">
            {pasos.map(p => (
              <li key={p.num}>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl font-sans text-lg font-bold text-navy" style={{ backgroundColor: '#F5C842' }}>{p.num}</span>
                <h3 className="font-serif text-white text-xl font-semibold mt-4 leading-snug">{p.t}</h3>
                <p className="font-sans text-white/85 text-sm sm:text-base leading-relaxed mt-2">{p.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid md:grid-cols-2 gap-8 border-t border-white/15 pt-10">
            <div>
              <h3 className="font-serif text-white text-xl sm:text-2xl font-semibold leading-snug">
                Revalorizamos su inmueble, con la tranquilidad de cobrar el día 1.
              </h3>
              <p className="font-sans text-white/85 text-base leading-relaxed mt-3">
                Equipamos, decoramos y amueblamos cada habitación antes de entrar, sin coste para usted. La inversión corre de nuestra parte.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-white text-xl sm:text-2xl font-semibold leading-snug">
                Contratos estables de larga duración con un único interlocutor, Renttia.
              </h3>
              <p className="font-sans text-white/85 text-base leading-relaxed mt-3">
                Un solo contrato. Una sola renta. Sin cambios de inquilino.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <h2 className="font-serif text-navy text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Expertos locales en Zaragoza, Huesca y Logroño
            </h2>
            <p className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed max-w-md">
              Somos de aquí. Conocemos el mercado, los barrios y los precios de cada zona, y gestionamos tu piso de tú a tú.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {ciudadesPropietarios.map(c => (
              <Link key={c.slug} href={`/${c.slug}`} className="group relative min-h-[380px] overflow-hidden rounded-[1.75rem] block">
                <img src={c.imagen} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#F5C842' }}>{c.ciudad}</p>
                  <h4 className="font-serif text-white text-2xl font-semibold leading-snug mt-2">{c.titulo}</h4>
                  <p className="font-sans text-white/90 text-sm leading-relaxed mt-2">{c.descripcion}</p>
                  {c.pisos > 0 && (
                    <p className="font-sans text-white text-sm font-semibold mt-4">{c.pisos} pisos activos · {c.ocupacion} ocupación</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-white text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] [text-wrap:balance]">
            Disfrute de una renta garantizada, <span className="italic" style={{ color: '#F5C842' }}>sin llamadas y sin preocupaciones</span>
          </h2>
          <p className="font-sans text-white/90 text-lg mt-6">Valoración gratuita. Respuesta en 24 horas. Sin compromiso.</p>
          <CTAButton texto="Solicitar valoración gratuita" className="btn-cta-gold mt-8" />
          <p className="font-sans text-white/80 text-sm mt-4">Sin coste · Sin compromiso · Respuesta en 24h</p>
        </div>
      </section>

      <ReviewsTicker />
    </>
  )
}
