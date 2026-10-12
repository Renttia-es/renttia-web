'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import {
  LandingHeader, StickyCTA, TickerStrip,
  AntesDespues, Proceso, QuienesSomos, Reviews,
  FAQSection, FinalCTA, LandingFooter,
  FormSection, LeadForm,
  type Paso, type EstadoOpcion, type Faq,
} from '@/components/landing/LandingSections'

/* ── CONFIG ─────────────────────────────────────────────────────────────── */
const FUENTE = 'guia-propietario'
const GOLD = '#F5C842'

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Valoramos tu piso', texto: 'Visita o videollamada. Te hacemos una propuesta concreta, sin compromiso.' },
  { num: '03', titulo: 'Firmamos', texto: 'Pasamos a ser tu inquilino. Equipamos el piso si hace falta, sin coste tuyo.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1. Sin gestionar, sin llamadas, sin riesgos.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'vacio-cerrado',         label: 'Vacío' },
  { value: 'heredado',              label: 'Heredado' },
  { value: 'necesita-reforma',      label: 'Necesita un lavado de cara' },
  { value: 'alquilado-tradicional', label: 'Ya está alquilado' },
]

const faqs: Faq[] = [
  {
    pregunta: '¿Cómo funciona el acuerdo con Renttia?',
    respuesta: 'Hacemos equipo. Tú cobras el día 1 de cada mes, aunque haya habitaciones vacías, y nosotros nos encargamos del 100% del trabajo: ponemos a punto el piso, seleccionamos a los residentes y gestionamos la convivencia y el mantenimiento.',
  },
  {
    pregunta: '¿Es legal alquilar mi piso a Renttia?',
    respuesta: 'Sí, totalmente. Tú firmas con Renttia y nosotros nos encargamos de todo lo demás. Nuestros contratos están revisados por abogados para que estés tranquilo desde el primer día.',
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
    pregunta: '¿Qué pasa si el piso tiene muebles antiguos o necesita ponerse al día?',
    respuesta: 'Lo actualizamos: retiramos muebles viejos, pintamos, decoramos y lo equipamos. Si quieres conservar algo, lo trasladamos nosotros. Sin coste para ti. Si el piso ya está listo, mejor: solo delegas y cobras. Si necesita un lavado de cara, lo hacemos nosotros.',
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
    titulo: '¿Y si el inquilino deja de pagar mañana?',
    texto: 'Proceso judicial, abogado, meses sin cobrar, piso en mal estado al recuperarlo. El alquiler tradicional tiene un riesgo que nadie te cuenta hasta que lo vives.',
  },
  {
    titulo: 'La nueva normativa no protege al propietario. Te ata.',
    texto: 'Prórrogas automáticas, preaviso de 6 meses, indemnizaciones por no renovar… Cada decreto nuevo añade una trampa más al alquiler tradicional.',
  },
  {
    titulo: 'Un piso anticuado pierde dinero cada mes que pasa vacío.',
    texto: 'Muchos propietarios tienen el piso parado porque se ha quedado anticuado y no quieren invertir para ponerlo al día. Mientras tanto, cada mes sin rentar es dinero que no vuelve.',
  },
  {
    titulo: 'Recuperar un piso okupado puede tardar años.',
    texto: 'Un piso vacío es un piso vulnerable. Una vez dentro, el proceso judicial es largo, caro e incierto. Y mientras tanto, el piso sigue sin rentar.',
  },
  {
    titulo: 'Tener un piso en alquiler debería ser una inversión. No un segundo trabajo.',
    texto: 'Llamadas a deshora, averías, conflictos, renovaciones… Tener un piso en alquiler consume más tiempo y energía de lo que debería.',
  },
]

/* ── COMPARATIVA: ALQUILER TRADICIONAL vs RENTTIA ───────────────────────── */
const comparativa = [
  {
    tema: 'Impagos',
    sin: 'Si el inquilino deja de pagar, dejas de cobrar. Y recuperar el piso puede llevar más de un año.',
    con: 'Cobras el día 1, siempre, sin importar si las habitaciones tienen inquilino o no. Ese riesgo lo asumimos nosotros.',
  },
  {
    tema: 'Normativa',
    sin: 'Prórrogas forzosas, preavisos largos e indemnizaciones si decides no renovar.',
    con: 'Tu acuerdo es con Renttia, no con un particular. Los cambios en la ley de vivienda no recaen sobre ti: de eso nos ocupamos nosotros.',
  },
  {
    tema: 'Puesta a punto',
    sin: 'Tienes que invertir tú en pintura, muebles y decoración antes de poder alquilar.',
    con: 'Lo acondicionamos a las tendencias actuales: retiramos muebles viejos, pintamos, decoramos y equipamos. Sin inversión por tu parte.',
  },
  {
    tema: 'Okupación',
    sin: 'Un piso vacío o alquilado completo es mucho más vulnerable a la okupación.',
    con: 'Reducimos el riesgo de okupación drásticamente. El perfil de los inquilinos que seleccionamos y la propia naturaleza temporal de los contratos hacen mucho más difícil que se okupe una habitación que un piso completo. Además, tenemos acceso permanente a las zonas comunes y realizamos limpiezas periódicas.',
  },
  {
    tema: 'Gestión',
    sin: 'Llamadas, averías, conflictos y renovaciones a cualquier hora.',
    con: 'Delegas la gestión del piso al 100% y te olvidas de cualquier problema del día a día.',
  },
]

/* ── PIEZAS DE UI ───────────────────────────────────────────────────────── */
const H2 = 'font-serif text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] [text-wrap:balance]'

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

function InlineCTA({ onForm, texto }: { onForm: () => void; texto: string }) {
  return (
    <div className="mt-12 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 justify-between bg-navy"
      style={{ backgroundImage: 'radial-gradient(ellipse at top right, rgba(245,200,66,0.14), transparent 60%)' }}>
      <p className="font-sans text-white text-lg sm:text-xl font-semibold text-center sm:text-left [text-wrap:balance]">{texto}</p>
      <button onClick={onForm} className="btn-cta-gold shrink-0 whitespace-nowrap">
        Solicitar valoración gratuita →
      </button>
    </div>
  )
}

function Notificacion({ icono, titulo, texto, className = '' }: { icono: ReactNode; titulo: string; texto: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 bg-white rounded-2xl px-5 py-4 w-full lg:w-[320px] ${className}`}
      style={{ boxShadow: '0 20px 50px -12px rgba(6,20,45,0.55)' }}>
      <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-navy/[0.06]">{icono}</div>
      <div>
        <p className="font-sans text-navy text-[15px] font-bold leading-tight">{titulo}</p>
        <p className="font-sans text-slate-500 text-sm mt-0.5">{texto}</p>
      </div>
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
    const hero = heroRef.current
    const form = formRef.current
    if (!hero || !form) return
    let heroGone = false
    let formVisible = false
    const update = () => setShowSticky(heroGone && !formVisible)
    const heroObs = new IntersectionObserver(([entry]) => { heroGone = !entry.isIntersecting; update() })
    const formObs = new IntersectionObserver(([entry]) => { formVisible = entry.isIntersecting; update() }, { threshold: 0.2 })
    heroObs.observe(hero)
    formObs.observe(form)
    return () => { heroObs.disconnect(); formObs.disconnect() }
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  const pct = ((rentaMensual - 300) / 1200) * 100

  return (
    <div className={`min-h-screen bg-white font-sans ${showSticky ? 'pb-24' : ''}`}>

      <StickyCTA show={showSticky} onForm={scrollToForm} ctaLabel="Solicitar valoración gratuita →" />
      <LandingHeader onForm={scrollToForm} />

      <main>
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
          <div>
            <p className="font-sans text-sm font-semibold text-white/90 mb-4">Zaragoza · Huesca · Logroño</p>
            <h1 className="font-serif text-white text-[2.3rem] sm:text-6xl lg:text-[4.1rem] font-semibold leading-[1.04] tracking-tight mb-6 [text-wrap:balance]">
              Un inquilino que paga el día 1,{' '}
              <span className="italic" style={{ color: GOLD }}>no protesta y deja el piso mejor de como lo encontró.</span>
            </h1>
            <p className="font-sans text-white/90 text-lg sm:text-xl leading-relaxed max-w-xl mb-9">
              Porque un piso debería darte ingresos, no trabajo.
            </p>
            <button onClick={scrollToForm} className="btn-cta-gold text-base">
              Quiero ese inquilino para mi piso →
            </button>
            <p className="font-sans text-white/75 text-sm mt-4">Te llamamos sin compromiso.</p>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {['Renta fija el día 1', '0 € de inversión', 'Cero gestión'].map(t => (
                <li key={t} className="flex items-center gap-2 font-sans text-white text-sm sm:text-[15px] font-semibold">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                    <CheckIcon className="w-3 h-3 text-navy" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjetas tipo notificación: cómo se vive siendo propietario con Renttia */}
          <div className="flex flex-col gap-3 lg:items-end">
            <Notificacion
              className="lg:mr-10"
              icono={<CheckIcon className="w-5 h-5 text-green-600" />}
              titulo="Renta ingresada"
              texto="Día 1 · Como cada mes"
            />
            <Notificacion
              icono={<span className="text-xl">🛠️</span>}
              titulo="Avería resuelta"
              texto="Grifo de la cocina · Lo gestionó Renttia"
            />
            <Notificacion
              className="lg:mr-16"
              icono={<span className="text-xl">🛏️</span>}
              titulo="Habitación libre este mes"
              texto="Tu renta, cobrada igualmente"
            />
          </div>
        </div>
      </section>

      <TickerStrip />

      {/* ══ LOS 5 DOLORES ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <h2 className={`${H2} text-navy mb-5`}>¿Te suena alguno de estos problemas?</h2>
            <p className="font-sans text-slate-700 text-lg leading-relaxed mb-8 max-w-md">
              Si has pensado alguna vez en cualquiera de estos, sigue leyendo.
            </p>
          </div>

          <ol className="space-y-4">
            {dolores.map((d, i) => (
              <li key={d.titulo} className="bg-white rounded-2xl p-6 sm:p-7 flex gap-5 sm:gap-6"
                style={{ boxShadow: '0 1px 2px rgba(18,52,98,0.06), 0 8px 24px -12px rgba(18,52,98,0.18)' }}>
                <span className="font-sans text-2xl sm:text-3xl font-bold text-red-500 tabular-nums leading-none pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-navy text-xl sm:text-2xl font-semibold leading-snug mb-2 [text-wrap:balance]">{d.titulo}</h3>
                  <p className="font-sans text-slate-600 text-base leading-relaxed">{d.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <InlineCTA onForm={scrollToForm} texto="¿Te identificas con alguno? Tenemos la solución para cada uno." />
        </div>
      </section>

      {/* ══ COMPARATIVA: RENTTIA RESUELVE CADA DOLOR ══════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <h2 className={`${H2} text-navy`}>
              Renttia resuelve cada problema, <span className="italic">uno a uno.</span>
            </h2>
          </div>

          <div className="hidden md:grid grid-cols-[170px_1fr_1.25fr] gap-4 mb-3 px-1">
            <span />
            <p className="font-sans text-sm font-bold uppercase tracking-wider text-red-600">Alquiler tradicional</p>
            <p className="font-sans text-sm font-bold uppercase tracking-wider text-navy">Con Renttia</p>
          </div>

          <div className="space-y-4">
            {comparativa.map(c => (
              <div key={c.tema} className="grid md:grid-cols-[170px_1fr_1.25fr] gap-3 md:gap-4">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:pt-5">
                  <span className="font-sans text-navy text-base font-bold">{c.tema}</span>
                </div>
                <div className="rounded-2xl bg-red-50 border border-red-100 p-5 flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <CrossIcon className="w-3.5 h-3.5 text-red-600" />
                  </span>
                  <div>
                    <p className="md:hidden font-sans text-xs font-bold uppercase tracking-wider text-red-600 mb-1">Alquiler tradicional</p>
                    <p className="font-sans text-red-950/80 text-[15px] sm:text-base leading-relaxed">{c.sin}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-navy p-5 flex gap-3"
                  style={{ boxShadow: '0 12px 30px -14px rgba(18,52,98,0.6)' }}>
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: GOLD }}>
                    <CheckIcon className="w-3.5 h-3.5 text-navy" />
                  </span>
                  <div>
                    <p className="md:hidden font-sans text-xs font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Con Renttia</p>
                    <p className="font-sans text-white text-[15px] sm:text-base font-medium leading-relaxed">{c.con}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CÓMO TRABAJAMOS (ESQUEMA) ═════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-navy relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(ellipse at 15% 0%, rgba(245,200,66,0.10), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(31,80,128,0.6), transparent 60%)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className={`${H2} text-white`}>
              Tres pasos. <span className="italic" style={{ color: GOLD }}>Tú solo dejas tus datos.</span>
            </h2>
          </div>

          <ol className="grid md:grid-cols-3 gap-6 md:gap-5 relative">
            {[
              { n: '01', t: 'Te alquilamos el piso', s: 'Firmamos contigo y pasamos a ser tu inquilino. Desde ese momento cobras una renta fija cada mes.' },
              { n: '02', t: 'Lo ponemos a punto', s: 'Pintamos, decoramos y equipamos el piso según las tendencias actuales. Todo a nuestro cargo.' },
              { n: '03', t: 'Lo alquilamos por habitaciones', s: 'Seleccionamos a cada inquilino con un filtro muy estricto y gestionamos el día a día del piso.' },
            ].map((p, i) => (
              <li key={p.n} className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full" style={{ boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)' }}>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl font-sans text-lg font-bold text-navy mb-5" style={{ backgroundColor: GOLD }}>
                    {p.n}
                  </span>
                  <h3 className="font-serif text-navy text-2xl font-semibold leading-snug mb-2">{p.t}</h3>
                  <p className="font-sans text-slate-600 text-base leading-relaxed">{p.s}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-[22px] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-12 sm:mt-16 rounded-2xl p-6 sm:p-10 border border-white/15 bg-white/[0.06]">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] mb-4" style={{ color: GOLD }}>¿Por qué es una buena opción para ti?</p>
            <p className="font-serif text-white text-2xl sm:text-3xl font-medium leading-snug mb-8 [text-wrap:balance]">
              Con Renttia, cobras el día 1, siempre, sin importar si las habitaciones tienen inquilino o no.{' '}
              <span className="italic" style={{ color: GOLD }}>Ese riesgo lo asumimos nosotros.</span>
            </p>
            <ul className="grid sm:grid-cols-3 gap-4">
              {[
                'Ideal si tienes un piso de 3 o más habitaciones',
                'Ideal si está vacío, heredado o necesita un lavado de cara',
                'Ideal si estás cansado de gestionar inquilinos',
              ].map(t => (
                <li key={t} className="flex items-start gap-3 font-sans text-white text-base font-medium leading-snug">
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: GOLD }}>
                    <CheckIcon className="w-3.5 h-3.5 text-navy" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ CALCULADORA IMPAGO ════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div>
            <h2 className={`${H2} text-navy mb-5`}>¿Cuánto puede costarte un impago?</h2>
            <p className="font-sans text-slate-700 text-lg leading-relaxed max-w-md">
              Ajusta la renta de tu piso. La cifra de la izquierda es una estimación: 12 meses sin cobrar, más 5.000 € de abogado y reparaciones. Con Renttia, ese dinero no sale de tu bolsillo.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8"
            style={{ boxShadow: '0 1px 2px rgba(18,52,98,0.06), 0 24px 50px -24px rgba(18,52,98,0.3)' }}>
            <div className="space-y-3 mb-7">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-base font-semibold text-navy">Tu renta mensual</span>
                <span className="font-sans text-3xl text-navy font-bold tabular-nums">{rentaMensual.toLocaleString('es-ES')} €</span>
              </div>
              <div className="relative h-2.5 rounded-full bg-navy/10 cursor-pointer focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-4">
                <div className="absolute inset-y-0 left-0 rounded-full bg-navy" style={{ width: `${pct}%` }} />
                <div className="absolute top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-navy shadow-lg pointer-events-none"
                  style={{ left: `${pct}%`, backgroundColor: GOLD }} />
                <input type="range" min={300} max={1500} step={50} value={rentaMensual}
                  aria-label="Renta mensual de tu piso"
                  onChange={e => setRentaMensual(Number(e.target.value))}
                  className="absolute -inset-y-3 inset-x-0 w-full h-8 opacity-0 cursor-grab active:cursor-grabbing" />
              </div>
              <div className="flex justify-between font-sans text-sm text-slate-500"><span>300 €</span><span>1.500 €</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-red-700 mb-2">Alquiler tradicional</p>
                <p className="font-sans text-3xl sm:text-4xl text-red-700 font-bold tabular-nums">{((rentaMensual * 12) + 5000).toLocaleString('es-ES')} €</p>
                <p className="font-sans text-sm font-medium text-red-900/80 mt-2">
                  {(rentaMensual * 12).toLocaleString('es-ES')} € de 12 meses sin cobrar + 5.000 € de estimación legal y reparaciones
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-navy">
                <p className="font-sans text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Con Renttia</p>
                <p className="font-sans text-3xl sm:text-4xl text-white font-bold">0 €</p>
                <p className="font-sans text-sm font-medium text-white mt-2">Cobras el día 1. El riesgo de impago es nuestro.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <InlineCTA onForm={scrollToForm} texto="Con Renttia ese riesgo desaparece el día que firmamos." />
        </div>
      </section>

      {/* ══ PUESTA A PUNTO (ANTES / DESPUÉS) ══════════════════════════════ */}
      <AntesDespues
        label=""
        titulo="Tu piso, al día con lo que hoy se busca"
        texto="Lo acondicionamos a las tendencias actuales: pintura, decoración y equipamiento, a nuestro cargo. Y si tu piso ya está listo, mejor todavía: solo tienes que delegar y cobrar."
      />

      {/* ══ LO QUE CONSIGUES ══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-navy relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(ellipse at 85% 0%, rgba(245,200,66,0.10), transparent 55%)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="max-w-3xl mb-12">
            <h2 className={`${H2} text-white mb-5`}>
              Tu piso trabaja para ti. <span className="italic" style={{ color: GOLD }}>Tú no trabajas para él.</span>
            </h2>
            <p className="font-sans text-white/90 text-lg leading-relaxed max-w-2xl">
              Esto es exactamente lo que cambia en tu vida el día que firmas con Renttia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
            {[
              { t: 'Renta fija el día 1',            s: 'Sin esperas, sin excusas. El dinero en tu cuenta cada mes, siempre.' },
              { t: 'Piso puesto al día sin coste',    s: 'Lo acondicionamos y decoramos según las tendencias actuales. Tú no inviertes nada.' },
              { t: 'Cero llamadas',                   s: 'Averías, incidencias, vecinos. Todo lo gestionamos nosotros. Tu teléfono, en silencio.' },
              { t: 'La normativa no es tu problema',  s: 'Tu acuerdo es con Renttia, no con un particular. Los cambios de la ley no recaen sobre ti.' },
              { t: 'Riesgo de okupación mínimo',      s: 'Habitaciones con inquilinos seleccionados y acceso a las zonas comunes.' },
              { t: 'Un solo interlocutor para todo',  s: 'Nosotros respondemos por todo. Tú no tienes que coordinarte con nadie más.' },
            ].map(b => (
              <div key={b.t} className="bg-white rounded-2xl p-6 flex gap-4 items-start"
                style={{ boxShadow: '0 20px 50px -24px rgba(0,0,0,0.55)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: GOLD }}>
                  <CheckIcon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-serif text-navy text-lg sm:text-xl font-semibold leading-snug mb-1">{b.t}</h3>
                  <p className="font-sans text-slate-600 text-[15px] leading-relaxed">{b.s}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button onClick={scrollToForm} className="btn-cta-gold text-base">
              Quiero esto para mi piso →
            </button>
            <p className="font-sans text-white/75 text-sm mt-3">Sin compromiso · Respuesta en menos de 24 h</p>
          </div>
        </div>
      </section>

      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />
      <FAQSection faqs={faqs} />

      <FormSection
        innerRef={formRef}
        titulo="Déjanos tus datos. Te llamamos nosotros."
        texto="Cobras el día 1 aunque haya una habitación vacía. Te llamamos en menos de 24 horas, sin compromiso. Funciona mejor con 3 habitaciones o más."
      >
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} ctaLabel="Solicitar valoración gratuita →" />
      </FormSection>

      <FinalCTA
        titulo="Cobra el día 1. Para siempre."
        texto="Sin impagos, sin gestión, sin preocuparte por la normativa. Todo eso es nuestro problema ahora."
        ctaLabel="Quiero mi valoración gratuita →"
        onForm={scrollToForm}
      />
      </main>

      <LandingFooter />
    </div>
  )
}
