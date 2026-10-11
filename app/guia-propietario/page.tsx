'use client'

import { useState, useRef, useEffect } from 'react'
import {
  LandingHeader, StickyCTA, TickerStrip,
  AntesDespues, Proceso, QuienesSomos, Reviews,
  FAQSection, FinalCTA, LandingFooter,
  FormSection, LeadForm,
  type Paso, type EstadoOpcion, type Faq,
} from '@/components/landing/LandingSections'

/* ── CONFIG ─────────────────────────────────────────────────────────────── */
const FUENTE = 'guia-propietario'

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Valoramos tu piso', texto: 'Visita o videollamada. Te hacemos una propuesta concreta, sin compromiso.' },
  { num: '03', titulo: 'Firmamos', texto: 'Pasamos a ser tu inquilino. Equipamos el piso si hace falta, sin coste tuyo.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1. Sin gestionar, sin llamadas, sin riesgos.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'vacio-cerrado',          label: 'Vacío / Cerrado'                  },
  { value: 'necesita-reforma',       label: 'Necesita reforma'                 },
  { value: 'alquilado-tradicional',  label: 'Alquiler tradicional'             },
  { value: 'alquilado-habitaciones', label: 'Alquilado por habitaciones'       },
  { value: 'heredado',               label: 'Heredado'                         },
  { value: 'alquilado-cambio',       label: 'Alquilado, busco cambiar'         },
]

const faqs: Faq[] = [
  {
    pregunta: '¿Cómo funciona el acuerdo con Renttia?',
    respuesta: 'Hacemos equipo. Tú tienes la seguridad de cobrar tu renta cada mes sin sobresaltos, mientras nosotros nos encargamos del 100% del trabajo: ponemos a punto el piso, seleccionamos a los residentes, gestionamos la convivencia y el mantenimiento. Tú solo ingresas tu dinero a fin de mes.',
  },
  {
    pregunta: '¿Es 100% legal ceder el piso a una empresa?',
    respuesta: 'Sí, totalmente legal. Firmamos un contrato corporativo entre empresa y propietario, revisado por abogado especializado. Este acuerdo te blinda ante la nueva normativa: sin prórrogas forzosas, sin indemnizaciones al inquilino, sin topes de renta.',
  },
  {
    pregunta: '¿Qué es la carencia y cómo nos afecta?',
    respuesta: 'La carencia es un periodo pactado al inicio —habitualmente 1 o 2 meses— durante el cual no pagamos la renta mientras acondicionamos el piso. Se acuerda de forma transparente antes de firmar y sirve para que el inmueble esté listo desde el primer día.',
  },
  {
    pregunta: '¿Renttia paga fianza al propietario?',
    respuesta: 'No. Renttia no aporta fianza al propietario al firmar. Lo que garantiza el acuerdo es el propio contrato y la solidez del modelo. Sí depositamos la fianza legal correspondiente en el organismo autonómico, como exige la normativa.',
  },
  {
    pregunta: '¿Qué hacemos si el piso tiene muebles antiguos o necesita reforma?',
    respuesta: 'Entréganos el piso tal como está. Retiramos muebles viejos, hacemos el lavado de cara necesario y lo equipamos completamente. Si quieres conservar algo, lo trasladamos nosotros. Sin coste para ti.',
  },
  {
    pregunta: '¿Cómo nos repartimos los seguros?',
    respuesta: 'Tú solo mantienes el seguro de hogar básico (continente). Nosotros aseguramos todo el mobiliario y contenido que introducimos en el piso.',
  },
  {
    pregunta: '¿Qué gastos sigue pagando el propietario?',
    respuesta: 'IBI, cuota de comunidad y seguro del continente. Los suministros (luz, agua, gas, internet) pasan a nombre de Renttia desde el día de la firma.',
  },
  {
    pregunta: 'Si hay una avería o problema, ¿quién responde?',
    respuesta: 'Nosotros respondemos por todo. Pequeñas reparaciones, mantenimiento, incidencias con vecinos. Tu teléfono no volverá a sonar un domingo por un grifo que gotea.',
  },
  {
    pregunta: '¿Tiene algún coste este acuerdo para el propietario?',
    respuesta: 'Ninguno. No somos una gestora ni cobramos comisiones. Al contrario: invertimos nuestro dinero en actualizar tu piso y te pagamos la renta pactada todos los meses.',
  },
  {
    pregunta: '¿Cómo recupero mi vivienda al finalizar el contrato?',
    respuesta: 'Te devolvemos el piso en el mismo estado —o mejor— en el que nos lo entregaste, limpio y listo. Sin disputas, sin retenciones, sin sorpresas.',
  },
]

/* ── DOLORES ────────────────────────────────────────────────────────────── */
const dolores = [
  {
    emoji: '💸',
    titulo: 'Un impago puede costarte más de 15.000€',
    texto: 'Proceso judicial, abogado, meses sin cobrar, piso en mal estado al recuperarlo. El alquiler tradicional tiene un riesgo que nadie te cuenta hasta que lo vives.',
    color: 'border-red-100 bg-red-50',
    badge: 'text-red-500 bg-red-100',
  },
  {
    emoji: '📋',
    titulo: 'La nueva normativa ata las manos del propietario',
    texto: 'Prórrogas automáticas, preaviso de 6 meses, indemnizaciones por no renovar… Cada año el alquiler tradicional se complica más y te deja menos control.',
    color: 'border-amber-100 bg-amber-50',
    badge: 'text-amber-700 bg-amber-100',
  },
  {
    emoji: '🏚️',
    titulo: 'Tu piso necesita reforma y no quieres invertir',
    texto: 'Muchos propietarios tienen el piso parado por no querer gastarse dinero antes de saber si va a rentar. Ese tiempo vacío es dinero perdido.',
    color: 'border-orange-100 bg-orange-50',
    badge: 'text-orange-600 bg-orange-100',
  },
  {
    emoji: '🔒',
    titulo: 'El miedo a la ocupación ilegal',
    texto: 'Un piso vacío es un piso vulnerable. Recuperar una vivienda ocupada puede tardar años y costarte miles de euros en abogados.',
    color: 'border-purple-100 bg-purple-50',
    badge: 'text-purple-600 bg-purple-100',
  },
  {
    emoji: '📞',
    titulo: 'Gestionar inquilinos consume tu tiempo y energía',
    texto: 'Llamadas a deshora, averías, conflictos, renovaciones, fianzas… Tener un piso en alquiler debería darte ingresos, no darte trabajo.',
    color: 'border-blue-100 bg-blue-50',
    badge: 'text-blue-600 bg-blue-100',
  },
]

/* ── SOLUCIONES ─────────────────────────────────────────────────────────── */
const soluciones = [
  { emoji: '💶', dolor: 'Impagos', solucion: 'Somos nosotros tu inquilino. Te pagamos el día 1, siempre, independientemente de lo que pase con los residentes.' },
  { emoji: '⚖️', dolor: 'Normativa', solucion: 'Firmamos un contrato corporativo empresa-propietario. Sin prórrogas forzosas, sin indemnizaciones, sin topes de renta.' },
  { emoji: '🛠️', dolor: 'Reforma', solucion: 'Nos encargamos nosotros. Retiramos muebles viejos, pintamos, equipamos. Sin inversión por tu parte.' },
  { emoji: '🔑', dolor: 'Ocupación', solucion: 'El piso nunca está vacío ni sin supervisión. Tenemos acceso permanente y realizamos visitas periódicas.' },
  { emoji: '🤝', dolor: 'Gestión', solucion: 'Ni una llamada tuya. Averías, convivencia, incidencias, todo lo gestionamos nosotros. Tú solo cobras.' },
]

/* ── STAT BOX ───────────────────────────────────────────────────────────── */
function StatBox({ valor, etiqueta, sub, danger }: { valor: string; etiqueta: string; sub?: string; danger?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 text-center ${danger ? 'bg-red-50 border border-red-100' : 'bg-navy/5 border border-navy/10'}`}>
      <p className={`font-serif text-3xl sm:text-4xl font-light mb-1 ${danger ? 'text-red-600' : 'text-navy'}`}>{valor}</p>
      <p className={`font-sans text-xs sm:text-sm font-semibold uppercase tracking-wide ${danger ? 'text-red-500' : 'text-navy/60'}`}>{etiqueta}</p>
      {sub && <p className="font-sans text-xs text-gray-400 mt-1.5">{sub}</p>}
    </div>
  )
}

/* ── INLINE CTA ─────────────────────────────────────────────────────────── */
function InlineCTA({ onForm, texto }: { onForm: () => void; texto: string }) {
  return (
    <div className="my-10 bg-navy rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
      <p className="font-serif text-white text-base sm:text-lg font-light text-center sm:text-left">{texto}</p>
      <button onClick={onForm} className="btn-cta-white shrink-0 text-sm py-3 px-7 whitespace-nowrap">
        Solicitar valoración gratuita →
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function GuiaPropietarioPage() {
  const [showSticky, setShowSticky] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [rentaMensual, setRentaMensual] = useState(650)

  useEffect(() => {
    const onScroll = () => setShowSticky((heroRef.current?.getBoundingClientRect().bottom ?? 0) < 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <div className="min-h-screen bg-white font-sans">

      <StickyCTA show={showSticky} onForm={scrollToForm} ctaLabel="Solicitar valoración gratuita →" />
      <LandingHeader onForm={scrollToForm} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-transparent" />
        </div>
        <div className="w-full px-6 sm:px-10 lg:px-20 py-20 sm:py-28 relative max-w-7xl mx-auto">
          <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-cta-light mb-4">
            Para propietarios · Zaragoza · Huesca · Logroño
          </p>
          <h1 className="font-serif text-white text-[2rem] sm:text-5xl lg:text-6xl font-light leading-tight mb-5 max-w-3xl">
            Todos los problemas<br />
            de tu piso,{' '}
            <span className="italic" style={{ color: '#C9A96E' }}>resueltos de una vez.</span>
          </h1>
          <p className="font-serif font-light text-white/80 text-base sm:text-xl leading-relaxed max-w-xl mb-10">
            Impagos, normativa, reforma, ocupación, gestión diaria…
            Hay una forma de eliminar todos esos riesgos y cobrar el día 1, sin excepciones.
          </p>
          <button onClick={scrollToForm} className="btn-cta-white text-sm py-4 px-10">
            Quiero saber más →
          </button>
          <p className="font-sans text-white/35 text-xs mt-4">Sin compromiso. Te llamamos en menos de 24 h.</p>
        </div>
      </section>

      <TickerStrip />

      {/* ══ LOS 5 DOLORES ═════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-cta mb-3">Lo que frena a los propietarios</p>
            <h2 className="font-serif text-navy text-2xl sm:text-4xl font-light mb-3">
              ¿Te suena alguno de estos problemas?
            </h2>
            <p className="font-serif font-light text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Si has pensado alguna vez en cualquiera de estos, sigue leyendo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {dolores.map((d, i) => (
              <div key={d.titulo}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col gap-3 ${d.color} ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="text-3xl">{d.emoji}</div>
                <h3 className="font-serif text-navy text-lg sm:text-xl font-normal leading-snug">{d.titulo}</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{d.texto}</p>
              </div>
            ))}
          </div>

          <InlineCTA onForm={scrollToForm} texto="¿Te identificas con alguno? Tenemos la solución para cada uno." />
        </div>
      </section>

      {/* ══ RENTTIA LO RESUELVE TODO ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-cta mb-3">La respuesta a cada dolor</p>
            <h2 className="font-serif text-navy text-2xl sm:text-4xl font-light mb-3">
              Renttia resuelve cada problema,{' '}
              <span className="italic">uno a uno</span>
            </h2>
          </div>

          <div className="space-y-4">
            {soluciones.map(s => (
              <div key={s.dolor} className="bg-white rounded-2xl border border-navy/8 p-5 sm:p-6 flex gap-5 items-start"
                style={{ boxShadow: '0 2px 12px rgba(18,52,98,0.06)' }}>
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0 text-xl">{s.emoji}</div>
                <div>
                  <p className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-cta mb-1">{s.dolor}</p>
                  <p className="font-serif text-navy text-base sm:text-lg font-light leading-snug">{s.solucion}</p>
                </div>
                <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CALCULADORA IMPAGO ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-10">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-red-500 mb-3">💸 El riesgo que nadie visualiza</p>
            <h2 className="font-serif text-navy text-2xl sm:text-4xl font-light mb-3">¿Cuánto puede costarte un impago?</h2>
            <p className="font-serif font-light text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Ajusta la renta de tu piso y ve el impacto real.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-navy/10"
            style={{ boxShadow: '0 4px 24px rgba(18,52,98,0.08)' }}>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm text-navy/70">Tu renta mensual (€)</span>
                <span className="font-serif text-2xl text-navy font-light">{rentaMensual} €</span>
              </div>
              <div className="relative h-2 rounded-full bg-navy/10 group cursor-pointer">
                <div className="absolute inset-y-0 left-0 rounded-full bg-cta transition-all" style={{ width: `${((rentaMensual - 300) / 1200) * 100}%` }} />
                <div className="absolute top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-cta shadow-lg pointer-events-none"
                  style={{ left: `${((rentaMensual - 300) / 1200) * 100}%` }} />
                <input type="range" min={300} max={1500} step={50} value={rentaMensual}
                  onChange={e => setRentaMensual(Number(e.target.value))}
                  className="absolute -inset-y-3 inset-x-0 w-full h-8 opacity-0 cursor-grab active:cursor-grabbing" />
              </div>
              <div className="flex justify-between text-xs text-gray-400"><span>300 €</span><span>1.500 €</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100 text-center">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-wide text-red-400 mb-2">Alquiler tradicional</p>
                <p className="font-serif text-3xl text-red-600 font-light">{((rentaMensual * 15) + 5000).toLocaleString('es-ES')} €</p>
                <p className="font-sans text-xs text-red-400/80 mt-1.5">pérdida total estimada<br />(renta + legal + reforma)</p>
              </div>
              <div className="p-5 rounded-2xl bg-green-50 border border-green-100 text-center">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-wide text-green-600 mb-2">Con Renttia</p>
                <p className="font-serif text-3xl text-green-700 font-light">0 €</p>
                <p className="font-sans text-xs text-green-600/80 mt-1.5">riesgo de impago<br />somos nosotros tu inquilino</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <StatBox valor={`${(rentaMensual * 12).toLocaleString('es-ES')} €`} etiqueta="Riesgo anual" danger />
              <StatBox valor={`${(rentaMensual * 3 + 4000).toLocaleString('es-ES')} €`} etiqueta="Coste legal mín." danger />
              <StatBox valor="12–18 m." etiqueta="Sin cobrar (media)" danger />
            </div>
          </div>

          <InlineCTA onForm={scrollToForm} texto="Con Renttia ese riesgo desaparece el día que firmamos." />
        </div>
      </section>

      {/* ══ REFORMA ANTES / DESPUÉS ═══════════════════════════════════════ */}
      <section className="py-4 sm:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-10">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-cta mb-3">🛠️ Reforma incluida</p>
            <h2 className="font-serif text-navy text-2xl sm:text-4xl font-light mb-3">
              Entréganos el piso tal como está
            </h2>
            <p className="font-serif font-light text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Sin que tengas que invertir un euro ni mover un dedo.
            </p>
          </div>
        </div>
      </section>
      <AntesDespues />

      {/* ══ LO QUE GANAS ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0f2d55] to-navy/90" />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/10 border border-white/15 text-white/70 text-[0.6rem] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              Lo que consigues
            </span>
            <h2 className="font-serif text-white text-2xl sm:text-4xl font-light mb-4">
              Tu piso trabaja para ti.{' '}
              <span className="italic" style={{ color: '#C9A96E' }}>Tú no trabajas para él.</span>
            </h2>
            <p className="font-serif font-light text-white/75 text-base sm:text-lg max-w-2xl mx-auto">
              Esto es exactamente lo que cambia en tu vida el día que firmas con Renttia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {[
              { e: '💶', t: 'Renta fija el día 1',            s: 'Sin esperas, sin excusas. El dinero en tu cuenta cada mes, siempre.' },
              { e: '🏠', t: 'Piso reformado sin coste',        s: 'Lo recibimos como está y lo dejamos impecable. Tú no inviertes nada.' },
              { e: '📵', t: 'Cero llamadas',                   s: 'Averías, incidencias, vecinos. Todo lo gestionamos nosotros. Tu teléfono, en silencio.' },
              { e: '🛡️', t: 'Blindado ante la normativa',      s: 'Contrato corporativo que te protege de las restricciones del alquiler tradicional.' },
              { e: '🔒', t: 'Piso siempre ocupado y vigilado', s: 'Nunca vacío, nunca desatendido. La ocupación ilegal es prácticamente imposible.' },
              { e: '🤝', t: 'Un solo interlocutor para todo',  s: 'Nosotros respondemos por todo. Tú no tienes que coordinarte con nadie más.' },
            ].map(b => (
              <div key={b.t}
                className="bg-white rounded-2xl p-5 sm:p-6 flex gap-4 items-start"
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)' }}>
                <div className="w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center shrink-0 text-lg">{b.e}</div>
                <div>
                  <h3 className="font-serif text-navy text-sm sm:text-base font-normal mb-1">{b.t}</h3>
                  <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed">{b.s}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={scrollToForm} className="btn-cta-white text-sm py-4 px-10">
              Quiero esto para mi piso →
            </button>
            <p className="font-sans text-white/35 text-xs mt-3">Sin compromiso · Respuesta en menos de 24 h</p>
          </div>
        </div>
      </section>

      {/* ══ PROCESO ═══════════════════════════════════════════════════════ */}
      <Proceso pasos={pasos} />

      {/* ══ QUIÉNES SOMOS ════════════════════════════════════════════════ */}
      <QuienesSomos />

      {/* ══ REVIEWS ═══════════════════════════════════════════════════════ */}
      <Reviews />

      {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
      <FAQSection faqs={faqs} />

      {/* ══ FORMULARIO ════════════════════════════════════════════════════ */}
      <FormSection
        innerRef={formRef}
        titulo="¿Tu piso encaja con nuestro modelo?"
        texto="Cuéntanos los detalles y te damos una respuesta concreta en menos de 24 horas. Sin compromiso."
      >
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} ctaLabel="Solicitar valoración gratuita →" />
      </FormSection>

      {/* ══ FINAL CTA ══════════════════════════════════════════════════════ */}
      <FinalCTA
        titulo="Cobra el día 1. Para siempre."
        texto="Sin impagos, sin reforma, sin normativa, sin gestión. Todo eso es nuestro problema ahora."
        ctaLabel="Quiero mi valoración gratuita →"
        onForm={scrollToForm}
      />

      <LandingFooter />
    </div>
  )
}
