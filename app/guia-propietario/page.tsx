'use client'

import { useState, useRef, useEffect } from 'react'
import type { Metadata } from 'next'
import {
  CallPopup, LandingHeader, StickyCTA, TickerStrip,
  AntesDespues, Proceso, QuienesSomos, Reviews,
  FAQSection, FinalCTA, LandingFooter,
  FormSection, LeadForm,
  type Beneficio, type Paso, type EstadoOpcion, type Faq,
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
    pregunta: '¿Cómo funciona este acuerdo entre Renttia y el propietario?',
    respuesta: 'Hacemos equipo Renttia–Propietario. Tú tienes la seguridad de cobrar tu renta cada mes sin sobresaltos, mientras nosotros nos encargamos del 100% del trabajo: ponemos a punto el piso, seleccionamos a los residentes con lupa (de ello depende nuestro negocio), gestionamos la convivencia y el mantenimiento diario. Tú te dedicas a ingresar tu dinero a fin de mes y olvidarte de todo lo demás.',
  },
  {
    pregunta: '¿Es 100% legal ceder el piso a una empresa?',
    respuesta: 'Sí, totalmente legal. Firmamos un contrato de arrendamiento para uso no residencial amparado por la LAU (Art. 3), un acuerdo entre empresa y propietario. Este tipo de contrato te blinda ante la nueva normativa de vivienda: sin prórrogas forzosas, sin indemnizaciones al inquilino, sin topes de renta. Revisado por abogado especializado.',
  },
  {
    pregunta: '¿Qué es la carencia y cómo nos afecta?',
    respuesta: 'La carencia es un periodo pactado al inicio del contrato —habitualmente 1 o 2 meses— durante el cual Renttia no paga la renta al propietario. Se utiliza para acondicionar el piso, hacer las reformas necesarias y equiparlo antes de la entrada de los residentes. Es una condición estándar en nuestro modelo y se acuerda de forma transparente antes de firmar.',
  },
  {
    pregunta: '¿Renttia paga fianza al propietario?',
    respuesta: 'No. Renttia no aporta fianza al propietario al firmar el contrato corporativo. Sí depositamos en el Gobierno de Aragón la fianza legal correspondiente según normativa, pero no hacemos entrega de ninguna cantidad al propietario como garantía previa. Lo que garantiza el acuerdo es el propio contrato y la solidez del modelo de negocio de Renttia.',
  },
  {
    pregunta: '¿Qué hacemos si el piso tiene muebles antiguos o necesita actualizarse?',
    respuesta: 'Revalorizamos la vivienda sin que tengas que mover un dedo ni invertir nada. Nos encargamos del lavado de cara necesario y de retirar el mobiliario viejo. Si hay muebles o enseres que quieras conservar, los trasladamos nosotros mismos a donde nos indiques, sin coste ni molestias.',
  },
  {
    pregunta: '¿Cómo nos repartimos el tema de los seguros?',
    respuesta: 'De forma transparente y sencilla: tú solo mantienes el seguro de hogar básico para la estructura de la vivienda (Continente). En Renttia aseguramos todo el mobiliario, equipamiento y contenido que introducimos en el piso, garantizando cobertura ante cualquier imprevisto del día a día.',
  },
  {
    pregunta: '¿Qué gastos sigue pagando el propietario?',
    respuesta: 'El propietario continúa asumiendo los gastos propios de la titularidad del inmueble: IBI, cuota de comunidad de propietarios y el seguro de hogar del continente. Los suministros (luz, agua, gas, internet) pasan a nombre de Renttia desde el día de la firma: son nuestro gasto, no el tuyo.',
  },
  {
    pregunta: '¿Qué tipo de alquiler hacemos en las habitaciones?',
    respuesta: 'Gestionamos el piso por habitaciones mediante contratos temporales. Así tenemos control total sobre quién entra, cuánto tiempo se queda, la convivencia y el estado del piso. Además, tanto el propietario como Renttia tenemos acceso a las zonas comunes durante toda la vigencia del contrato, lo que hace la ocupación ilegal prácticamente imposible.',
  },
  {
    pregunta: 'Si hay una avería o un problema con la comunidad, ¿quién responde?',
    respuesta: 'Nosotros respondemos por todo. Asumimos las pequeñas reparaciones, el mantenimiento diario y cualquier incidencia con los vecinos. Tu teléfono no volverá a sonar un domingo por un grifo que gotea o una bombilla fundida.',
  },
  {
    pregunta: '¿Tiene algún coste este acuerdo para el propietario?',
    respuesta: 'Ninguno. No somos una gestora ni cobramos comisiones. Al contrario: invertimos nuestro propio dinero en actualizar y equipar tu piso, y te pagamos la renta acordada todos los meses. El único coste previo que puede surgir es el del impuesto de transmisiones patrimoniales (ITP) del contrato, que asume Renttia.',
  },
  {
    pregunta: '¿Cómo recupero mi vivienda al finalizar el contrato?',
    respuesta: 'Al terminar el periodo acordado te devolvemos las llaves con el piso en el mismo estado —o mejor— en el que nos lo entregaste, limpio y listo. Sin disputas, sin retenciones de fianza, sin sorpresas.',
  },
]

/* ── COMPONENTE CAPÍTULO HEADER ─────────────────────────────────────────── */
function ChapterHeader({ num, titulo, subtitulo }: { num: string; titulo: string; subtitulo: string }) {
  return (
    <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-10">
      <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-navy flex items-center justify-center">
        <span className="font-serif text-white text-xl sm:text-3xl font-light">{num}</span>
      </div>
      <div>
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-cta mb-1">Capítulo {num}</p>
        <h2 className="font-serif text-navy text-xl sm:text-2xl lg:text-3xl font-light leading-snug mb-2">{titulo}</h2>
        <p className="font-serif font-light text-gray-500 text-base sm:text-lg leading-relaxed">{subtitulo}</p>
      </div>
    </div>
  )
}

/* ── RIESGO CARD ────────────────────────────────────────────────────────── */
function RiesgoCard({ emoji, titulo, texto, color = 'red' }: { emoji: string; titulo: string; texto: string; color?: 'red' | 'amber' | 'orange' }) {
  const colors = {
    red:    'bg-red-50    border-red-100    text-red-700',
    amber:  'bg-amber-50  border-amber-100  text-amber-700',
    orange: 'bg-orange-50 border-orange-100 text-orange-700',
  }
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${colors[color]}`}>
      <div className="text-2xl mb-3">{emoji}</div>
      <h4 className="font-serif text-base sm:text-lg font-normal mb-2">{titulo}</h4>
      <p className="font-sans text-sm leading-relaxed opacity-80">{texto}</p>
    </div>
  )
}

/* ── SOLUCIÓN CARD ──────────────────────────────────────────────────────── */
function SolucionCard({ emoji, titulo, texto }: { emoji: string; titulo: string; texto: string }) {
  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 flex gap-4 items-start"
      style={{ boxShadow: '0 2px 12px rgba(18,52,98,0.07)' }}>
      <div className="shrink-0 w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg">{emoji}</div>
      <div>
        <h4 className="font-serif text-navy text-base font-normal mb-1">{titulo}</h4>
        <p className="font-sans text-gray-500 text-sm leading-relaxed">{texto}</p>
      </div>
    </div>
  )
}

/* ── STAT HIGHLIGHT ─────────────────────────────────────────────────────── */
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
function InlineCTA({ onForm, texto = '¿Quieres eliminar estos riesgos? Pide tu valoración gratuita →' }: { onForm: () => void; texto?: string }) {
  return (
    <div className="my-8 sm:my-10 bg-navy rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
      <p className="font-serif text-white text-base sm:text-lg font-light text-center sm:text-left">{texto}</p>
      <button onClick={onForm} className="btn-cta-white shrink-0 text-sm py-3 px-7 whitespace-nowrap">
        Solicitar valoración →
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
      <section ref={heroRef} className="bg-navy relative overflow-hidden min-h-[75vh] flex items-center">
        {/* Foto de fondo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        </div>
        <div className="w-full px-6 sm:px-10 lg:px-20 py-20 sm:py-28 relative text-left max-w-7xl mx-auto">
          <span className="inline-block bg-red-500/20 border border-red-400/30 text-red-300 text-[0.6rem] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            ⚠️ Guía urgente para propietarios · Octubre 2026
          </span>
          <h1 className="font-serif text-white text-[2rem] sm:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-3xl">
            Todo lo que necesitas saber<br />
            <span className="italic" style={{ color: '#C9A96E' }}>para proteger tu piso</span>
          </h1>
          <p className="font-serif font-light text-white/80 text-base sm:text-xl leading-relaxed max-w-xl mb-10">
            Normativa de vivienda, impagos, ocupación ilegal, pisos sin reformar…
            En esta guía tienes la respuesta honesta a cada problema y una alternativa real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button onClick={scrollToForm} className="btn-cta-white text-sm py-4 px-10">
              Solicitar valoración gratuita →
            </button>
          </div>
          <p className="font-sans text-white/35 text-xs mt-4">Sin compromiso. Respuesta en menos de 24 h.</p>
        </div>
      </section>

      <TickerStrip />

      {/* ══ CAP 1: LEY DE VIVIENDA ════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <ChapterHeader
            num="01"
            titulo="Los decretos de octubre de 2026: qué aplica realmente y qué no"
            subtitulo="RDL 28/2026 y 29/2026, publicados en el BOE el 7 de octubre. Mucho ruido, pero no todo aplica en Zaragoza, Huesca y Logroño. Te explicamos la realidad sin alarmar ni minimizar."
          />

          {/* Alerta contexto */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex gap-3 mb-8">
            <span className="text-xl shrink-0">📢</span>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Lo que de verdad necesitas saber</p>
              <p className="font-serif text-amber-900 text-base leading-relaxed">
                Hay dos decretos nuevos. Algunos de sus efectos aplican en toda España. Otros solo en <strong>zonas tensionadas</strong> — y Zaragoza, Huesca y Logroño <strong>no lo son</strong> (ni está previsto que lo sean). A continuación, la tabla real de qué te afecta hoy.
              </p>
            </div>
          </div>

          <div className="prose-renttia">

            {/* Tabla qué aplica / qué no */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 sm:p-6">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-red-500 mb-3">⚠️ Aplica en TODA España — incluidas nuestras ciudades</p>
                <ul className="space-y-3.5">
                  {[
                    { t: 'Prórroga extraordinaria forzosa hasta dic. 2028', s: 'El inquilino puede exigirte ampliar el contrato 1-2 años si vence antes de esa fecha, sin subir la renta. RDL 29/2026, ya en vigor.' },
                    { t: 'Prórrogas automáticas de 5-7 años', s: 'Desde el 15 de noviembre (RDL 28/2026): una vez cumplido el mínimo legal, el contrato se renueva solo indefinidamente.' },
                    { t: 'Preaviso de 6 meses para no renovar', s: 'Antes eran 4 meses. Si avisas tarde, el contrato se renueva automáticamente sin poder hacer nada.' },
                    { t: 'Indemnización obligatoria al inquilino', s: 'Si no renuevas sin causa legal justificada: lo mayor entre 12 mensualidades o 1 mes por año vivido.' },
                  ].map(({ t, s }) => (
                    <li key={t} className="font-sans text-sm text-red-800 list-none">
                      <span className="font-semibold block mb-0.5">{t}</span>
                      <span className="text-red-600/75 text-xs leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 sm:p-6">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-green-600 mb-3">✅ NO aplica en Zaragoza · Huesca · Logroño</p>
                <ul className="space-y-3.5">
                  {[
                    { t: 'Topes de renta (0% o máx. 2%)', s: 'Solo en zonas tensionadas. Aragón las vetó por unanimidad en junio 2026. La Rioja tampoco tiene ninguna declarada.' },
                    { t: 'Límite de precio por habitaciones', s: 'Solo aplica en zonas tensionadas. Fuera de ellas el precio por habitación no está regulado.' },
                    { t: 'Sanciones directas al propietario', s: 'Las sanciones de los decretos son para plataformas digitales (Airbnb, Booking...), no para propietarios.' },
                    { t: 'Control de rentas sin histórico', s: 'El índice SERVAPI requiere datos históricos de la vivienda. Sin ellos, no se puede calcular ni aplicar ningún tope.' },
                  ].map(({ t, s }) => (
                    <li key={t} className="font-sans text-sm text-green-800 list-none">
                      <span className="font-semibold block mb-0.5">{t}</span>
                      <span className="text-green-700/70 text-xs leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dato Aragón */}
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-5 sm:p-6 mb-8 flex gap-4 items-start">
              <span className="text-2xl shrink-0">🏛️</span>
              <div>
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-navy/50 mb-2">Dato verificado · BOA, 1 de julio de 2026</p>
                <p className="font-serif text-navy text-base sm:text-lg font-light leading-relaxed">
                  El Gobierno de Aragón aprobó por unanimidad el <strong>24 de junio de 2026</strong> vetar las zonas tensionadas en todo Aragón.{' '}
                  Ningún municipio aragonés tendrá zonas tensionadas mientras gobierne el PP. La Rioja tampoco figura en el BOE.{' '}
                  <strong>Hoy, en nuestras tres ciudades, los topes de renta no tienen ningún efecto práctico.</strong>
                </p>
              </div>
            </div>

            {/* El problema real */}
            <div className="mb-8">
              <h3 className="font-serif text-navy text-xl sm:text-2xl font-light mb-4">Entonces, ¿cuál es el problema real?</h3>
              <p className="font-serif font-light text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                El problema no es lo que aplica hoy en Zaragoza. El problema es la <strong>incertidumbre permanente</strong>. Las prórrogas automáticas y las indemnizaciones ya son una realidad en toda España desde noviembre. Y la dirección legislativa es clara: cada año hay nuevas restricciones para los propietarios. El que firma hoy con un inquilino particular no sabe con qué reglas tendrá que convivir dentro de dos años.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <RiesgoCard
                  emoji="🔄"
                  titulo="Atrapado 5-7 años sin poder salir"
                  texto="Las prórrogas automáticas del RDL 28/2026 aplican ya en toda España. Sin causa legal, recuperar tu piso puede tardar casi una década."
                  color="red"
                />
                <RiesgoCard
                  emoji="💸"
                  titulo="Pagar al inquilino por no renovar"
                  texto="Desde el 15 de noviembre: si no renuevas sin justificación, puedes deber hasta 12 mensualidades de indemnización. La libertad del propietario tiene ahora un coste."
                  color="amber"
                />
                <RiesgoCard
                  emoji="📋"
                  titulo="Normativa que cambia cada mes"
                  texto="Desde 2023, han salido varios decretos de vivienda. Imposible saber hoy qué reglas te exigirán cuando tu próximo contrato venza."
                  color="orange"
                />
              </div>
            </div>

            {/* Solución */}
            <div className="bg-navy/5 border border-navy/10 rounded-2xl p-6 sm:p-8 mb-8">
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-cta mb-3">La solución de Renttia</p>
              <h3 className="font-serif text-navy text-xl sm:text-2xl font-light mb-4">
                Nuestro contrato corporativo te saca del juego legislativo
              </h3>
              <p className="font-serif font-light text-gray-600 text-base sm:text-lg leading-relaxed mb-3">
                Cuando Renttia es tu inquilino, firmamos un <strong>contrato de arrendamiento para uso no residencial</strong> (LAU Art. 3): un acuerdo entre empresa y propietario. Los decretos RDL 28 y 29/2026 regulan el <em>arrendamiento de vivienda habitual</em> — un tipo de contrato completamente distinto. <strong>Ni las prórrogas forzosas, ni las indemnizaciones, ni los topes futuros te afectan.</strong>
              </p>
              <p className="font-serif font-light text-gray-500 text-sm sm:text-base leading-relaxed mb-5">
                El alquiler por habitaciones a nuestros residentes es un asunto nuestro. Tú solo tienes un contrato con Renttia. Cuando el Gobierno cambie las reglas, tú ya habrás salido del tablero.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { e: '✅', t: 'Sin prórrogas automáticas de 5-7 años' },
                  { e: '✅', t: 'Sin indemnización por no renovar' },
                  { e: '✅', t: 'Sin preaviso de 6 meses obligatorio' },
                  { e: '✅', t: 'Sin topes de renta, hoy ni en el futuro' },
                  { e: '✅', t: 'Condiciones pactadas y fijas por contrato' },
                  { e: '✅', t: 'Revisado por abogado especializado en LAU' },
                ].map(({ e, t }) => (
                  <div key={t} className="flex items-center gap-2.5 font-sans text-navy text-sm">
                    <span>{e}</span><span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <InlineCTA onForm={scrollToForm} texto="¿Quieres salir del tablero legislativo para siempre? Hablamos." />
        </div>
      </section>

      {/* ══ CAP 2: IMPAGOS ════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <ChapterHeader
            num="02"
            titulo="El coste real de un impago que nadie te cuenta"
            subtitulo="No es solo perder un mes de alquiler. Es un proceso que puede durar más de un año y costarte decenas de miles de euros."
          />

          {/* Calculadora de riesgo */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 border border-navy/10"
            style={{ boxShadow: '0 4px 24px rgba(18,52,98,0.08)' }}>
            <h3 className="font-serif text-navy text-lg sm:text-xl font-light mb-1">Calcula tu riesgo de impago</h3>
            <p className="font-sans text-gray-400 text-sm mb-6">Ajusta la renta de tu piso y ve el impacto real.</p>

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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <StatBox valor={`${rentaMensual} €`} etiqueta="Renta mensual" />
              <StatBox valor={`${(rentaMensual * 12).toLocaleString('es-ES')} €`} etiqueta="Riesgo anual" danger />
              <StatBox valor={`${(rentaMensual * 3 + 4000).toLocaleString('es-ES')} €`} etiqueta="Coste legal mín." danger sub="abogado + proc." />
              <StatBox valor="12–18 m." etiqueta="Meses sin cobrar" danger sub="media en España" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-center">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-wide text-red-400 mb-1.5">Alquiler tradicional</p>
                <p className="font-serif text-2xl sm:text-3xl text-red-600 font-light">{((rentaMensual * 15) + 5000).toLocaleString('es-ES')} €</p>
                <p className="font-sans text-xs text-red-400/80 mt-1">pérdida total estimada<br />(renta + legal + reforma)</p>
              </div>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-center">
                <p className="font-sans text-[0.65rem] font-bold uppercase tracking-wide text-green-600 mb-1.5">Con Renttia</p>
                <p className="font-serif text-2xl sm:text-3xl text-green-700 font-light">0 €</p>
                <p className="font-sans text-xs text-green-600/80 mt-1">riesgo de impago<br />somos nosotros tu inquilino</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6">
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-red-500 mb-3">📉 Alquiler tradicional</p>
              <ul className="space-y-3">
                {[
                  'El inquilino deja de pagar. Esperas, negocias, rezas.',
                  'El primer burofax tarda semanas en surtir efecto.',
                  'Contratas abogado. El proceso empieza: 3.000€ mínimo.',
                  'El juicio puede tardar 6 meses solo en señalarse.',
                  'Si no se va, lanzamiento judicial: otros 6 meses.',
                  'Total: hasta 18 meses sin cobrar + piso destrozado.',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2.5 font-sans text-sm text-gray-600">
                    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6">
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-green-600 mb-3">✅ Con Renttia</p>
              <ul className="space-y-3">
                {[
                  'Renttia te paga el día 1 de cada mes. Sin falta.',
                  'Da igual si nuestros residentes pagan o no: ese es nuestro problema.',
                  'Sin abogados. Sin juzgados. Sin esperas.',
                  'Sin pérdidas. Sin stress. Sin llamadas.',
                  'Renta garantizada por contrato de 3 a 7 años.',
                  'Si surge cualquier incidencia, la resolvemos nosotros.',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2.5 font-sans text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InlineCTA onForm={scrollToForm} texto="Elimina el riesgo de impago para siempre. Solicita tu valoración." />
        </div>
      </section>

      {/* ══ CAP 3: OCUPACIÓN ══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <ChapterHeader
            num="03"
            titulo="La ocupación ilegal: la pesadilla que ningún propietario quiere vivir"
            subtitulo="España es uno de los países de Europa donde más cuesta recuperar una vivienda ocupada ilegalmente. Los plazos son inhumanos."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatBox valor="1–3" etiqueta="Años en recuperar la vivienda" danger sub="si hay oposición judicial" />
            <StatBox valor="+15.000€" etiqueta="Coste legal mínimo" danger sub="abogado + procurador" />
            <StatBox valor="0€" etiqueta="Compensación del estado" danger sub="el propietario asume todo" />
            <StatBox valor="↑" etiqueta="Casos en España" danger sub="tendencia al alza" />
          </div>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-serif text-red-800 text-lg sm:text-xl font-light mb-3">
              ¿Qué ocurre cuando un piso queda vacío?
            </h3>
            <p className="font-serif font-light text-red-700/80 text-base leading-relaxed mb-4">
              Un piso vacío es un piso vulnerable. Las ocupaciones ocurren en muchos casos durante fines de semana o festivos, cuando nadie vigila. Una vez dentro, los ocupantes pueden alegar vulnerabilidad social y el proceso judicial se convierte en un camino largo e incierto.
            </p>
            <p className="font-serif font-light text-red-700/80 text-base leading-relaxed">
              La nueva Ley de Vivienda ha añadido más trabas al proceso de desahucio cuando existe vulnerabilidad social, lo que en la práctica alarga aún más los plazos para recuperar tu propiedad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <SolucionCard
              emoji="🔑"
              titulo="Acceso permanente a la vivienda"
              texto="Con Renttia, la vivienda nunca está vacía ni sin supervisión. Tenemos acceso permanente a las zonas comunes y realizamos visitas periódicas. Un piso con ocupante legítimo es imposible de ocupar ilegalmente."
            />
            <SolucionCard
              emoji="🏢"
              titulo="Empresa como inquilino: doble protección"
              texto="Al ser Renttia (empresa) tu inquilino y no una persona física, cualquier intento de ocupación ilegal queda completamente neutralizado. Nuestros residentes cuentan con contratos firmados y supervisados."
            />
            <SolucionCard
              emoji="📡"
              titulo="Supervisión continua del inmueble"
              texto="Realizamos inspecciones periódicas y gestionamos las incidencias del día a día. Tu piso nunca estará abandonado ni sin vigilancia durante el periodo de contrato."
            />
            <SolucionCard
              emoji="⚡"
              titulo="Respuesta inmediata ante cualquier incidencia"
              texto="Si ocurre cualquier problema relacionado con el inmueble, nuestro equipo actúa de inmediato. No hay que esperar semanas para que alguien se haga cargo."
            />
          </div>

          <InlineCTA onForm={scrollToForm} texto="Protege tu piso de la ocupación. Habla con nuestro equipo." />
        </div>
      </section>

      {/* ══ CAP 4: REFORMA INCLUIDA ═══════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <ChapterHeader
            num="04"
            titulo="La reforma del piso: nosotros la asumimos, sin coste para ti"
            subtitulo="No te pedimos que inviertas ni un euro antes de empezar. Si el piso necesita reforma o equipamiento, corremos con todo."
          />

          <div className="bg-white rounded-2xl border border-navy/10 p-6 sm:p-8 mb-8"
            style={{ boxShadow: '0 4px 24px rgba(18,52,98,0.08)' }}>
            <p className="font-serif font-light text-gray-600 text-base sm:text-lg leading-relaxed mb-5">
              Uno de los mayores frenos para poner un piso en alquiler es el estado en que se encuentra. Piso vacío, sin amueblar, con electrodomésticos viejos, muebles que no sabes qué hacer con ellos, quizás con alguna pared que pintar…
            </p>
            <p className="font-serif font-light text-gray-600 text-base sm:text-lg leading-relaxed mb-5">
              Con Renttia eso no es un obstáculo. <strong className="text-navy">Entréganos el piso tal como está.</strong> Nosotros evaluamos qué necesita y lo gestionamos a nuestro cargo, sin que tú tengas que preocuparte ni mover un dedo.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { e: '🛋️', t: 'Retiramos muebles viejos', s: 'O los trasladamos a donde nos indiques, sin coste adicional.' },
                { e: '🎨', t: 'Pintamos y renovamos', s: 'Pequeñas reformas estéticas para que el piso luzca impecable.' },
                { e: '🏠', t: 'Equipamos completamente', s: 'Camas, sillas, electrodomésticos, decoración. Todo a nuestro cargo.' },
              ].map(({ e, t, s }) => (
                <div key={t} className="bg-cream rounded-xl p-4 sm:p-5">
                  <div className="text-2xl mb-2">{e}</div>
                  <h4 className="font-serif text-navy text-sm sm:text-base font-normal mb-1.5">{t}</h4>
                  <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Antes/Después */}
      <AntesDespues />

      {/* ══ CAP 5: CÓMO FUNCIONA RENTTIA ═════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0f2d55] to-navy/90" />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block bg-white/10 border border-white/15 text-white/70 text-[0.6rem] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Capítulo 05</span>
            <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light mb-3">La solución completa: qué hace Renttia</h2>
            <p className="font-serif font-light text-white/75 text-base sm:text-lg max-w-2xl mx-auto">
              Somos literalmente tu inquilino. Firmamos el contrato, pagamos la renta y gestionamos el piso de principio a fin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {[
              { e: '💶', t: 'Renta garantizada el día 1',      s: 'Pagas tú o no pague nadie, tu renta llega siempre puntual.' },
              { e: '📋', t: 'Contrato corporativo blindado',    s: 'Amparado en la LAU, fuera de las restricciones de la nueva normativa.' },
              { e: '🔑', t: 'Acceso permanente',                s: 'Supervisamos el piso continuamente. La ocupación ilegal es imposible.' },
              { e: '🛠️', t: 'Mantenimiento incluido',           s: 'Averías, reparaciones, limpieza. Tu teléfono no volverá a sonar.' },
              { e: '🏠', t: 'Reforma y equipamiento gratis',    s: 'Invertimos en tu piso para revalorizarlo. Sin coste para ti.' },
              { e: '👥', t: 'Residentes seleccionados',         s: 'Sanitarios, militares, universitarios. Perfiles solventes y cualificados.' },
              { e: '🛡️', t: 'Seguros a nuestro cargo',          s: 'Contenido asegurado por Renttia. Tú solo mantienes el continente.' },
              { e: '0€', t: 'Sin comisiones ni tarifas',        s: 'Ni de entrada, ni mensuales, ni de salida. Cero costes para el propietario.' },
              { e: '📞', t: 'Un interlocutor único',            s: 'Nosotros, siempre. Sin inquilinos directos, sin llamadas inesperadas.' },
            ].map((b, i) => (
              <div key={b.t}
                className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex gap-4 items-start hover:-translate-y-1 transition-transform duration-300 ${i % 2 === 0 ? 'sm:-translate-y-1.5' : 'sm:translate-y-1.5'}`}
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)' }}>
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
              Quiero mi valoración gratuita →
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

      {/* ══ CAPÍTULO 6: FAQ ═══════════════════════════════════════════════ */}
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
        texto="Sin impagos, sin ocupación, sin reforma, sin burocracia. Todo eso es nuestro problema ahora."
        ctaLabel="Quiero mi valoración gratuita →"
        onForm={scrollToForm}
      />

      <LandingFooter />
    </div>
  )
}
