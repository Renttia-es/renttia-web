'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  CallPopup, LandingHeader, StickyCTA, TickerStrip, Beneficios, AntesDespues,
  Proceso, QuienesSomos, Reviews, FAQSection, FinalCTA, LandingFooter,
  LeadForm, FormSection, faqsCompletas,
  type Beneficio, type Paso, type EstadoOpcion,
} from '@/components/landing/LandingSections'

const FUENTE = 'landing-calculadora-gastos'

const beneficios: Beneficio[] = [
  { icon: '🔒', titulo: 'Renta garantizada el día 1', texto: 'Cobras siempre, esté el piso ocupado o vacío. Sin excepciones.' },
  { icon: '🚫', titulo: 'Sin impagos', texto: 'Somos nosotros tu inquilino. El riesgo de impago desaparece.' },
  { icon: '🔧', titulo: 'Cero gestión para ti', texto: 'Averías, incidencias y llamadas: de todo nos ocupamos nosotros.' },
  { icon: '🏠', titulo: 'Tu piso siempre cuidado', texto: 'Lo preparamos al entrar y lo devolvemos igual o mejor al salir.' },
  { icon: '💡', titulo: 'Suministros a nuestro cargo', texto: 'Luz, agua, gas e internet a nuestro nombre desde la firma.' },
  { icon: '📄', titulo: 'Un solo contrato', texto: 'Firmamos tú y Renttia. Sin inquilinos en tu contrato, sin líos.' },
]

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Valoramos tu piso', texto: 'Lo visitamos y te hacemos una propuesta concreta, sin compromiso.' },
  { num: '03', titulo: 'Firmamos', texto: 'Nosotros pasamos a ser tu inquilino y preparamos la vivienda.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1, para siempre, sin que gestiones nada.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'vacio-cerrado', label: 'Vacío / Cerrado' },
  { value: 'necesita-reforma', label: 'Necesita reforma' },
  { value: 'alquilado-cambio', label: 'Alquilado, busco cambiar' },
  { value: 'heredado', label: 'Heredado' },
]

/* ─── SLIDER ─────────────────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step = 1, unit, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-baseline">
        <span className="font-sans text-sm font-medium text-navy/70">{label}</span>
        <span className="font-serif text-xl font-light text-navy">{value.toLocaleString('es-ES')} {unit}</span>
      </div>
      <div className="group relative h-2 rounded-full bg-navy/10 cursor-pointer">
        <div className="absolute inset-y-0 left-0 rounded-full bg-cta transition-all" style={{ width: `${pct}%` }} />
        <div
          className="absolute top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-cta shadow-lg ring-4 ring-cta/15 flex flex-col items-center justify-center gap-[3px] pointer-events-none transition-transform group-hover:scale-110 group-active:scale-95"
          style={{ left: `${pct}%` }}
        >
          <span className="block w-3 h-[2px] rounded-full bg-cta" />
          <span className="block w-3 h-[2px] rounded-full bg-cta" />
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="absolute -inset-y-3 inset-x-0 w-full h-8 opacity-0 cursor-grab active:cursor-grabbing" />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function CalculadoraGastosPage() {
  const [renta, setRenta] = useState(800)
  const [meses, setMeses] = useState(6)
  const perdida = renta * meses

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
  const fmt = (n: number) => n.toLocaleString('es-ES')

  return (
    <div className="min-h-screen bg-white font-sans">

      {callPopup && <CallPopup onClose={() => setCallPopup(false)} />}
      <StickyCTA show={showSticky} onForm={scrollToForm} onCall={() => setCallPopup(true)} ctaLabel="Quiero cobrar renta fija →" />
      <LandingHeader onCall={() => setCallPopup(true)} />

      {/* ── HERO + CALCULADORA (above the fold) ────────────────────────── */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/despues-1.png" alt="" fill className="object-cover object-center opacity-25" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#0f2d55]/90" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-1">
              <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-[0.6rem] font-sans font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Calculadora para propietarios · Zaragoza · Huesca
              </span>
              <h1 className="font-serif text-white text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-light leading-tight mb-4">
                Tu piso cerrado te cuesta dinero.<br />
                <span className="italic" style={{ color: '#C9A96E' }}>Calcula cuánto.</span>
              </h1>
              <p className="font-serif font-light text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                Un piso vacío no descansa: cada mes que pasa cerrado es dinero que dejas de ingresar.
                Míralo tú mismo y descubre cómo convertirlo en una renta fija garantizada.
              </p>
            </div>

            <div className="order-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
              <h2 className="font-serif text-navy text-lg sm:text-2xl font-light mb-1">¿Cuánto pierdes con tu piso vacío?</h2>
              <p className="font-sans text-gray-500 text-sm mb-6">Mueve los dos controles. Sin registros ni datos.</p>

              <div className="space-y-6">
                <Slider label="Renta que podrías cobrar al mes" value={renta} min={300} max={2500} step={50} unit="€" onChange={setRenta} />
                <Slider label="Meses que lleva o llevará cerrado" value={meses} min={1} max={12} unit={meses === 1 ? 'mes' : 'meses'} onChange={setMeses} />
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-red-500/10 border border-red-400/40 text-center">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-red-500/70 mb-1">Dinero que dejas de ingresar</p>
                <p className="font-serif text-4xl sm:text-5xl font-light text-red-600 tabular-nums">{fmt(perdida)} €</p>
                <p className="font-sans text-red-700/70 text-xs mt-2">
                  Y mientras tanto sigues pagando comunidad, IBI y seguro aunque el piso esté vacío.
                </p>
              </div>

              <button onClick={scrollToForm} className="btn-cta w-full py-4 text-base mt-4">
                Quiero convertirlo en renta fija →
              </button>
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />
      <Beneficios label="La solución" titulo="De piso parado a renta garantizada" subtitulo="Un solo cambio en la firma elimina todos los problemas del alquiler." items={beneficios} />
      <AntesDespues />
      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />

      <FormSection innerRef={formRef} titulo="Deja de perder dinero con tu piso" texto="Déjanos tus datos y te llamamos en menos de 24 horas. Sin compromiso.">
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} />
      </FormSection>

      <FAQSection faqs={faqsCompletas} />
      <FinalCTA titulo="Deja de perder dinero con tu piso vacío." texto="Convierte esa pérdida en una renta fija garantizada. Te llamamos en menos de 24 horas." ctaLabel="Quiero mi valoración gratuita →" onForm={scrollToForm} onCall={() => setCallPopup(true)} />
      <LandingFooter />
    </div>
  )
}
