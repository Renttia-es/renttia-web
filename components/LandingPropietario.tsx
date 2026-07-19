import ContactForm from './ContactForm'
import StickyCtaBar from './StickyCtaBar'

interface LandingPropietarioProps {
  ciudad: string
  slug: string
  h1: string
  heroSubtitulo: string
  dolorTexto: string
  mercadoTexto: string
  rentaMedia: string
  ocupacionMedia: string
  pisosActivos: number
  heroImagen?: string
}

function getFaqs() {
  return [
    {
      pregunta: '¿Qué es Renttia y en qué se diferencia de una inmobiliaria?',
      respuesta: 'No somos una agencia ni buscamos inquilinos tradicionales. Renttia se convierte en tu único inquilino. Te pagamos el alquiler cada mes directamente como empresa y gestionamos el piso por completo, eliminando todos tus riesgos.',
    },
    {
      pregunta: '¿Cómo me garantizáis que cobraré mi alquiler todos los meses?',
      respuesta: 'Tu contrato es con Renttia, no con un particular. Te pagamos el día estipulado, esté el piso ocupado o vacío. Si surge cualquier problema de impago con los residentes, lo asumimos nosotros. Tu renta está 100% garantizada.',
    },
    {
      pregunta: '¿Qué pasa si un residente no paga?',
      respuesta: 'Ese es un problema exclusivamente nuestro. Tú sigues recibiendo tu renta íntegra cada mes según lo pactado.',
    },
    {
      pregunta: '¿Quién se encarga del mantenimiento y los desperfectos diarios?',
      respuesta: 'Nosotros nos ocupamos del mantenimiento ordinario, las reparaciones por uso y la limpieza periódica del piso. Nos interesa que la vivienda esté siempre en perfecto estado, por lo que mantendrá o mejorará su valor.',
    },
    {
      pregunta: '¿Tengo que pagar alguna comisión por vuestra gestión?',
      respuesta: 'No. No cobramos comisiones de gestión, ni mensualidades, ni tarifas ocultas al propietario. El importe de la renta pactado en el contrato es el que recibirás íntegro en tu cuenta cada mes.',
    },
    {
      pregunta: '¿Cómo seleccionáis a las personas que van a vivir en mi piso?',
      respuesta: 'Filtramos de forma muy estricta a los residentes potenciales. Buscamos exclusivamente perfiles cualificados, solventes y con estancia temporal, como jóvenes profesionales, sanitarios o estudiantes.',
    },
    {
      pregunta: '¿Qué pasa si un residente causa problemas en la vivienda o con la comunidad de vecinos?',
      respuesta: 'Nosotros nos encargamos de la gestión, la sustitución del residente y cualquier inconveniente de forma rápida y sin que tú tengas que hacer nada.',
    },
    {
      pregunta: '¿Cómo recupero mi vivienda al finalizar el contrato?',
      respuesta: 'Al terminar el periodo acordado, te devolvemos las llaves con el piso en el mismo estado —o mejor— en el que nos lo entregaste, completamente limpio y listo.',
    },
  ]
}

const dolorPoints = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    titulo: 'Impagos e incertidumbre',
    texto: 'La misma angustia cada mes: esperar la transferencia, reclamar, negociar. Un desahucio puede durar 2 años y costar más de 10.000€.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    titulo: 'El riesgo de inquiocupación',
    texto: 'El inquilino deja de pagar pero no se va. Sin acceso a la propiedad ni recursos rápidos. Una pesadilla legal que ningún propietario debería vivir.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
    titulo: 'El piso vuelve destrozado',
    texto: 'Pintura, suelos, electrodomésticos. Cada rotación de inquilino te cuesta dinero en reformas. La pregunta siempre es la misma: ¿quién lo paga?',
  },
]

const ventajas = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titulo: 'Impago imposible',
    texto: 'Te paga una empresa, no una persona física. Imposible que se olviden del día 1.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    titulo: 'Inquiocupación imposible',
    texto: 'Tenemos acceso permanente a las zonas comunes. No existe ese escenario.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
    titulo: 'Revalorizamos tu propiedad',
    texto: 'Hacemos pequeñas reformas antes de entrar. Tu piso vale más cuando nos vamos.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    titulo: 'Gestionamos todo',
    texto: 'Filtramos residentes, resolvemos incidencias y gestionamos contratos. Tú no te enteras.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    titulo: 'Un solo contrato',
    texto: 'Firmamos tú y Renttia. Sin inquilinos en tu contrato, sin llamadas, sin gestiones.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    titulo: 'Suministros a nuestro cargo',
    texto: 'Luz, agua, gas, internet: todo a nuestro nombre desde el día de la firma.',
  },
]

export default function LandingPropietario({
  ciudad,
  slug,
  h1,
  heroSubtitulo,
  dolorTexto,
  mercadoTexto,
  rentaMedia,
  ocupacionMedia,
  pisosActivos,
  heroImagen = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=85',
}: LandingPropietarioProps) {
  const faqs = getFaqs()

  return (
    <>
      <StickyCtaBar ciudad={ciudad} />

      {/* ── 1. HERO — navy con foto ────────────────────────────────── */}
      <section className="relative z-[1] overflow-hidden min-h-[88vh] sm:min-h-[82vh] flex items-center -mt-16">
        <div className="absolute inset-0">
          <img
            src={heroImagen}
            alt={`Gestión de alquiler en ${ciudad}`}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/50" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Copy */}
            <div>
              <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-[0.65rem] font-sans font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Tu inquilino perfecto · {ciudad}
              </span>
              <h1 className="h1-hero text-white mb-4 sm:mb-5">{h1}</h1>
              <p className="font-serif font-light text-white/85 text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8">
                {heroSubtitulo}
              </p>

              {/* Stats rápidos */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {[
                  { v: pisosActivos + '+', l: 'Pisos activos' },
                  { v: ocupacionMedia,     l: 'Ocupación'     },
                  { v: rentaMedia,         l: 'Renta en zona' },
                ].map(s => (
                  <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/15">
                    <p className="font-serif text-white text-base sm:text-2xl font-light">{s.v}</p>
                    <p className="font-sans text-white/50 text-[0.55rem] sm:text-xs mt-0.5 sm:mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Trust bullets */}
              <ul className="space-y-2.5">
                {[
                  'Somos nosotros tu inquilino: firmamos, tú cobras',
                  'Contrato de arrendamiento revisado por abogado',
                  'Inquiocupación imposible: acceso permanente a la vivienda',
                  'Equipamos el piso antes de entrar, sin coste tuyo',
                ].map(t => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-sans text-white/80 text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulario */}
            <div
              id="contacto"
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7"
              style={{ boxShadow: '0 0 0 1px rgba(18,52,98,0.10),0 8px 40px rgba(18,52,98,0.14)' }}
            >
              <h2 className="font-serif text-navy text-xl sm:text-2xl font-light mb-1">
                ¿Encaja tu piso con nuestro modelo?
              </h2>
              <p className="font-sans text-gray-500 text-sm mb-5">
                Evaluamos tu piso sin coste. Respuesta en menos de 24 horas. Sin compromiso.
              </p>
              <ContactForm ciudad={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DOLOR — blanco ─────────────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <span className="section-label">Lo que te preocupa</span>
            <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
              Los tres miedos de cualquier propietario
            </h2>
            <p className="font-serif font-light text-gray-500 text-base sm:text-lg leading-relaxed">
              {dolorTexto}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {dolorPoints.map((d, i) => (
              <div
                key={d.titulo}
                className={`group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 hover:-translate-y-1 transition-transform duration-300 ${i % 2 === 0 ? 'sm:-translate-y-1.5' : 'sm:translate-y-1.5'}`}
                style={{ boxShadow: '0 8px 32px rgba(18,52,98,0.10), 0 1px 4px rgba(18,52,98,0.06)', border: '1px solid rgba(18,52,98,0.07)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-400 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  {d.icon}
                </div>
                <h3 className="font-serif text-navy text-lg font-normal mb-2">{d.titulo}</h3>
                <p className="font-sans font-normal text-gray-500 text-sm leading-relaxed">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SOLUCIÓN — navy con foto ───────────────────────────── */}
      <section className="py-14 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-navy/90" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">
              La diferencia Renttia
            </span>
            <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
              Somos tu inquilino perfecto. Nosotros firmamos, tú cobras.
            </h2>
            <p className="font-serif font-light text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              No somos una gestora. Somos literalmente tu inquilino: firmamos el contrato contigo,
              asumimos toda la responsabilidad y tú no vuelves a saber nada del piso.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventajas.map((v, i) => (
              <div
                key={v.titulo}
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex gap-4 items-start hover:-translate-y-1 transition-transform duration-300 ${i % 2 === 0 ? 'sm:-translate-y-1.5' : 'sm:translate-y-1.5'}`}
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-cta-light flex items-center justify-center text-cta shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-serif text-navy text-base font-normal mb-1.5">{v.titulo}</h3>
                  <p className="font-sans font-normal text-gray-500 text-sm leading-relaxed">{v.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MERCADO LOCAL — blanco ─────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="section-label">Mercado local</span>
              <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
                El mercado del alquiler en {ciudad}
              </h2>
              <p className="font-serif font-light text-gray-500 text-base sm:text-lg leading-relaxed mb-7">
                {mercadoTexto}
              </p>
              <a href="#contacto" className="btn-cta w-full sm:w-auto text-center text-sm">
                Consulta si tu piso encaja →
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: rentaMedia,     l: 'Renta media en la zona',  color: 'text-navy',        bg: 'bg-navy-50' },
                { v: ocupacionMedia, l: 'Tasa de ocupación media', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { v: '< 24h',        l: 'Tiempo de respuesta',     color: 'text-cta',         bg: 'bg-cta-light' },
                { v: '100%',         l: 'Pisos sin impagos',       color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map(s => (
                <div key={s.l} className={`${s.bg} rounded-2xl sm:rounded-3xl p-5 sm:p-7`}>
                  <p className={`font-serif text-2xl sm:text-4xl font-light ${s.color}`}>{s.v}</p>
                  <p className="font-sans font-normal text-gray-500 text-xs sm:text-sm mt-1.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQs — navy con foto ───────────────────────────────── */}
      <section className="py-14 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
          />
          <div className="absolute inset-0 bg-navy/92" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">
              Preguntas frecuentes
            </span>
            <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light">
              Lo que nos preguntan los propietarios de {ciudad}
            </h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-2 backdrop-blur-sm">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-white/15 last:border-0"
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none gap-4">
                  <span className="font-serif text-white text-base sm:text-lg font-light">{faq.pregunta}</span>
                  <svg
                    className="w-4 h-4 text-white/40 shrink-0 group-open:rotate-180 transition-transform duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="font-serif font-light text-white/75 text-base leading-relaxed pb-5 pr-6">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL — foto + navy ────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=85"
            alt={`Piso gestionado por Renttia en ${ciudad}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-4">
            Tu inquilino perfecto
          </span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
            Deja de buscar al inquilino ideal. Ya lo tienes.
          </h2>
          <p className="font-serif font-light text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Valoración gratuita de tu piso en {ciudad}. Respuesta en menos de 24 h. Sin compromiso.
          </p>
          <a href="#contacto" className="btn-cta w-full sm:w-auto text-sm py-4 px-10">
            Consulta si tu piso encaja, es gratis →
          </a>
        </div>
      </section>
    </>
  )
}
