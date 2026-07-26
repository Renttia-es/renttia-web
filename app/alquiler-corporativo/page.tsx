'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  CallPopup, LandingHeader, StickyCTA, TickerStrip, Beneficios, AntesDespues,
  Proceso, QuienesSomos, Reviews, FAQSection, FinalCTA, LandingFooter,
  LeadForm, FormSection,
  type Beneficio, type Paso, type Faq, type EstadoOpcion,
} from '@/components/landing/LandingSections'

const FUENTE = 'landing-alquiler-corporativo'

const beneficios: Beneficio[] = [
  { icon: '🔒', titulo: 'Renta garantizada el día 1', texto: 'Cobras siempre, directamente de nosotros, esté el piso ocupado o no.' },
  { icon: '🚫', titulo: 'Sin riesgo de impago', texto: 'Si quien vive en el piso no paga, es problema nuestro. Tú cobras íntegro.' },
  { icon: '💡', titulo: 'Suministros a nuestro nombre', texto: 'Luz, agua, gas e internet pasan a nuestra cuenta desde la firma.' },
  { icon: '🏠', titulo: 'Piso revisado y cuidado', texto: 'Lo mantenemos en buen estado y te lo devolvemos igual o mejor.' },
  { icon: '📄', titulo: 'Un solo contrato', texto: 'Firmamos tú y Renttia. Sin inquilinos en tu contrato, sin sorpresas.' },
  { icon: '🔧', titulo: 'Cero gestión para ti', texto: 'Averías, incidencias y llamadas: de todo nos ocupamos nosotros.' },
]

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Valoramos tu piso', texto: 'Lo visitamos y te hacemos una propuesta concreta, sin compromiso.' },
  { num: '03', titulo: 'Firmamos', texto: 'Nosotros pasamos a ser tu inquilino y asumimos todo el riesgo.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1, garantizada, sin que gestiones nada.' },
]

const faqs: Faq[] = [
  { pregunta: '¿Cómo funciona que una empresa sea mi inquilino?', respuesta: 'Firmamos contigo y nos convertimos en tu inquilino. Te pagamos una renta fija cada mes y gestionamos el piso por completo.' },
  { pregunta: '¿Y si quien vive en el piso no paga?', respuesta: 'Es problema nuestro, no tuyo. Tu contrato es con Renttia, así que cobras tu renta íntegra el día 1 pase lo que pase.' },
  { pregunta: '¿Quién paga los suministros?', respuesta: 'Nosotros. La luz, el agua, el gas e internet pasan a nuestro nombre desde el día de la firma.' },
  { pregunta: '¿Qué pasa al terminar el contrato?', respuesta: 'Recuperas tu piso cuidado, igual o mejor que como lo entregaste, limpio y listo.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'vacio-cerrado', label: 'Vacío / Cerrado' },
  { value: 'alquilado-cambio', label: 'Alquilado, busco cambiar' },
  { value: 'necesita-reforma', label: 'Necesita reforma' },
  { value: 'heredado', label: 'Heredado' },
]

/* ─── SLIDER ─────────────────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step = 1, unit, onChange, accent = 'bg-cta' }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void; accent?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-baseline">
        <span className="font-sans text-sm font-medium text-navy/70">{label}</span>
        <span className="font-serif text-xl font-light text-navy">{value.toLocaleString('es-ES')} {unit}</span>
      </div>
      <div className="group relative h-2 rounded-full bg-navy/10 cursor-pointer">
        <div className={`absolute inset-y-0 left-0 rounded-full transition-all ${accent}`} style={{ width: `${pct}%` }} />
        <div
          className={`absolute top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 shadow-lg flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110 group-active:scale-95 ${accent === 'bg-amber-500' ? 'border-amber-500 ring-4 ring-amber-500/15' : 'border-cta ring-4 ring-cta/15'}`}
          style={{ left: `${pct}%` }}
        >
          <svg className={`w-4 h-4 ${accent === 'bg-amber-500' ? 'text-amber-500' : 'text-cta'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="absolute -inset-y-3 inset-x-0 w-full h-8 opacity-0 cursor-grab active:cursor-grabbing" />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function AlquilerCorporativoPage() {
  const [renta, setRenta] = useState(900)
  const [mesesImpago, setMesesImpago] = useState(3)
  const enRiesgo = renta * mesesImpago
  const rentaAnual = renta * 12

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
      <StickyCTA show={showSticky} onForm={scrollToForm} onCall={() => setCallPopup(true)} ctaLabel="Quiero cobrar sin riesgo →" />
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
                Alquila sin impagos · Zaragoza · Huesca
              </span>
              <h1 className="font-serif text-white text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-light leading-tight mb-4">
                Alquila sin miedo a los impagos.<br />
                <span className="italic" style={{ color: '#C9A96E' }}>Cobra los 12 meses.</span>
              </h1>
              <p className="font-serif font-light text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                Cuando una empresa es tu inquilino, tu renta llega el día 1 pase lo que pase.
                Calcula lo que te juegas cada año con el alquiler tradicional.
              </p>
            </div>

            <div className="order-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
              <h2 className="font-serif text-navy text-lg sm:text-2xl font-light mb-1">¿Cuánto te juegas con un impago?</h2>
              <p className="font-sans text-gray-500 text-sm mb-6">Ajusta tu renta y el tiempo que tardarías en resolverlo.</p>

              <div className="space-y-6">
                <Slider label="Renta mensual de tu piso" value={renta} min={400} max={2000} step={50} unit="€" onChange={setRenta} />
                <Slider label="Meses hasta resolver un impago" value={mesesImpago} min={1} max={6} unit={mesesImpago === 1 ? 'mes' : 'meses'} onChange={setMesesImpago} accent="bg-amber-500" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-amber-600 mb-1">Con un particular, podrías perder</p>
                  <p className="font-serif text-2xl sm:text-3xl font-light text-amber-700 tabular-nums">−{fmt(enRiesgo)} €</p>
                </div>
                <div className="p-4 rounded-2xl bg-cream border border-navy/10 text-center">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-navy/50 mb-1">Con Renttia cobras</p>
                  <p className="font-serif text-2xl sm:text-3xl font-light text-navy tabular-nums">{fmt(rentaAnual)} €</p>
                </div>
              </div>

              <p className="font-sans text-gray-500 text-xs mt-4 text-center">
                No prometemos que ganes más: te aseguramos que <strong className="text-navy">no pierdas</strong>. Cobras el día 1, siempre.
              </p>

              <button onClick={scrollToForm} className="btn-cta w-full py-4 text-base mt-4">
                Quiero cobrar sin riesgo →
              </button>
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />
      <Beneficios label="Por qué Renttia" titulo="Lo que cambia cuando una empresa es tu inquilino" subtitulo="Tu renta deja de depender de un particular y pasa a estar garantizada." items={beneficios} />
      <AntesDespues />
      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />

      <FormSection innerRef={formRef} titulo="Cobra tu renta sin riesgo de impago" texto="Déjanos tus datos y te llamamos en menos de 24 horas. Sin compromiso.">
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} />
      </FormSection>

      <FAQSection faqs={faqs} />
      <FinalCTA titulo="Alquila sin miedo a los impagos." texto="Cobra tu renta el día 1, los 12 meses del año. Te llamamos en menos de 24 horas." ctaLabel="Quiero mi valoración gratuita →" onForm={scrollToForm} onCall={() => setCallPopup(true)} />
      <LandingFooter />
    </div>
  )
}
