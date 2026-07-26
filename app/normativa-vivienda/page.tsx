'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  CallPopup, LandingHeader, StickyCTA, TickerStrip, Beneficios, AntesDespues,
  Proceso, QuienesSomos, Reviews, FAQSection, FinalCTA, LandingFooter,
  LeadForm, FormSection, faqsCompletas,
  type Beneficio, type Paso, type EstadoOpcion,
} from '@/components/landing/LandingSections'

const FUENTE = 'landing-normativa-vivienda'

const beneficios: Beneficio[] = [
  { icon: '💶', titulo: 'Una sola renta fija', texto: 'Cobras un único importe por todo el piso, el día 1, sin importar las habitaciones.' },
  { icon: '🙅', titulo: 'Cero trato con inquilinos', texto: 'No vuelves a coordinar visitas, cobros ni conflictos. Solo hablas con nosotros.' },
  { icon: '🔍', titulo: 'Nosotros seleccionamos', texto: 'Elegimos con filtros estrictos a las personas que viven en tu vivienda.' },
  { icon: '🧹', titulo: 'Mantenimiento incluido', texto: 'Incidencias, averías y limpieza de zonas comunes, todo de nuestra cuenta.' },
  { icon: '🛡️', titulo: 'Papeleo y registros, resueltos', texto: 'Cada vez se exige más burocracia y registros para alquilar por habitaciones. Lo gestionamos nosotros y te evitas errores, sustos y sanciones.' },
  { icon: '🏠', titulo: 'Tu piso siempre cuidado', texto: 'Lo devolvemos igual o mejor que como lo entregaste al terminar.' },
]

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Valoramos tu piso', texto: 'Lo visitamos y te hacemos una propuesta concreta, sin compromiso.' },
  { num: '03', titulo: 'Firmamos', texto: 'Nosotros pasamos a ser tu inquilino y nos ocupamos de todo.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1, sin gestionar ni una sola habitación.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'alquilado-habitaciones', label: 'Alquilado por habitaciones' },
  { value: 'alquilado-tradicional', label: 'Alquiler tradicional' },
  { value: 'vacio-cerrado', label: 'Vacío / Cerrado' },
  { value: 'heredado', label: 'Heredado' },
]

/* ══════════════════════════════════════════════════════════════════════════ */
export default function GestionHabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState(4)
  const horas = habitaciones * 4

  const [callPopup, setCallPopup] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setShowSticky((heroRef.current?.getBoundingClientRect().bottom ?? 0) < 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <div className="min-h-screen bg-white font-sans">

      {callPopup && <CallPopup onClose={() => setCallPopup(false)} />}
      <StickyCTA show={showSticky} onForm={scrollToForm} onCall={() => setCallPopup(true)} ctaLabel="Quiero delegar la gestión →" />
      <LandingHeader onCall={() => setCallPopup(true)} />

      {/* ── HERO + CALCULADORA (above the fold) ────────────────────────── */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/despues-2.png" alt="" fill className="object-cover object-center opacity-25" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#0f2d55]/90" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-1">
              <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-[0.6rem] font-sans font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Alquiler por habitaciones · Zaragoza · Huesca
              </span>
              <h1 className="font-serif text-white text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-light leading-tight mb-4">
                Alquilar por habitaciones da mucho trabajo.<br />
                <span className="italic" style={{ color: '#C9A96E' }}>Nosotros te lo quitamos.</span>
              </h1>
              <p className="font-serif font-light text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                Anuncios, visitas, cobros a cada inquilino, incidencias a cualquier hora...
                y ahora, encima, más papeleo y registros obligatorios para poder alquilar.
                Calcula el tiempo que te consume y descubre cómo pasar a una única renta fija sin gestionar nada.
              </p>
            </div>

            <div className="order-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
              <h2 className="font-serif text-navy text-lg sm:text-2xl font-light mb-1">¿Cuánto tiempo te come tu piso?</h2>
              <p className="font-sans text-gray-500 text-sm mb-6">Elige cuántas habitaciones alquilas.</p>

              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm font-medium text-navy/70">Habitaciones que alquilas</span>
                  <span className="font-serif text-xl font-light text-navy">{habitaciones}</span>
                </div>
                <div className="group relative h-2 rounded-full bg-navy/10 cursor-pointer">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-cta transition-all" style={{ width: `${((habitaciones - 2) / 4) * 100}%` }} />
                  <div
                    className="absolute top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-cta shadow-lg ring-4 ring-cta/15 flex flex-col items-center justify-center gap-[3px] pointer-events-none transition-transform group-hover:scale-110 group-active:scale-95"
                    style={{ left: `${((habitaciones - 2) / 4) * 100}%` }}
                  >
                    <span className="block w-3 h-[2px] rounded-full bg-cta" />
                    <span className="block w-3 h-[2px] rounded-full bg-cta" />
                  </div>
                  <input type="range" min={2} max={6} step={1} value={habitaciones} onChange={e => setHabitaciones(Number(e.target.value))} className="absolute -inset-y-3 inset-x-0 w-full h-8 opacity-0 cursor-grab active:cursor-grabbing" />
                </div>
                <div className="flex justify-between text-xs text-gray-400"><span>2</span><span>6</span></div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-cream border border-navy/10 text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-light text-navy tabular-nums">{horas}h</p>
                  <p className="font-sans text-xs text-navy/50 mt-1">al mes gestionando</p>
                </div>
                <div className="p-4 rounded-2xl bg-cream border border-navy/10 text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-light text-navy tabular-nums">{habitaciones}</p>
                  <p className="font-sans text-xs text-navy/50 mt-1">inquilinos que coordinas</p>
                </div>
              </div>

              <p className="font-sans text-gray-500 text-xs mt-4 text-center">
                Con Renttia: <strong className="text-navy">0 horas</strong> y <strong className="text-navy">un solo interlocutor</strong>. Cobras una renta fija por todo el piso.
              </p>

              <button onClick={scrollToForm} className="btn-cta w-full py-4 text-base mt-4">
                Quiero delegarlo todo →
              </button>
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />
      <Beneficios label="Lo que cambia" titulo="Una renta fija, cero quebraderos de cabeza" subtitulo="Dejas de gestionar habitaciones y pasas a cobrar un único importe estable." items={beneficios} />
      <AntesDespues />
      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />

      <FormSection innerRef={formRef} titulo="Deja de gestionar. Empieza a cobrar tranquilo" texto="Déjanos tus datos y te llamamos en menos de 24 horas. Sin compromiso.">
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} />
      </FormSection>

      <FAQSection faqs={faqsCompletas} />
      <FinalCTA titulo="Deja de gestionar habitaciones una a una." texto="Pasa a una única renta fija sin trato con inquilinos. Te llamamos en menos de 24 horas." ctaLabel="Quiero mi valoración gratuita →" onForm={scrollToForm} onCall={() => setCallPopup(true)} />
      <LandingFooter />
    </div>
  )
}
