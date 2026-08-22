'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  CallPopup, LandingHeader, StickyCTA, TickerStrip, Beneficios, AntesDespues,
  Proceso, QuienesSomos, Reviews, FAQSection, FinalCTA, LandingFooter,
  LeadForm, FormSection, faqsCompletas,
  type Beneficio, type Paso, type EstadoOpcion,
} from '@/components/landing/LandingSections'

const FUENTE = 'landing-reforma-incluida'

const beneficios: Beneficio[] = [
  { icon: '🔨', titulo: 'Ponemos el piso a punto nosotros', texto: 'Pintamos, amueblamos y acondicionamos la vivienda. Tú no pones un euro ni coordinas nada.' },
  { icon: '💶', titulo: 'Renta fija garantizada desde el día 1', texto: 'En cuanto firmamos, cobras tu renta mensual. Aunque la obra aún no haya terminado.' },
  { icon: '🚫', titulo: 'Sin presupuestos ni obras', texto: 'No tienes que buscar empresa, comparar precios ni supervisar trabajos. Eso lo hacemos nosotros.' },
  { icon: '🔒', titulo: 'Sin riesgo de impago', texto: 'Tu inquilino somos nosotros. Cobramos a las personas que viven ahí — tú no tratas con nadie.' },
  { icon: '📄', titulo: 'Un solo contrato largo y claro', texto: 'Firmamos un contrato de gestión estable. Sin sorpresas ni cláusulas raras.' },
  { icon: '🏠', titulo: 'Lo devolvemos como lo recibimos', texto: 'Al terminar el contrato, el piso te vuelve en perfectas condiciones.' },
]

const pasos: Paso[] = [
  { num: '01', titulo: 'Nos dejas tus datos', texto: 'Rellenas el formulario y te llamamos en menos de 24 horas.' },
  { num: '02', titulo: 'Visitamos y valoramos', texto: 'Vemos el estado del piso y te hacemos una propuesta concreta: renta mensual + reforma incluida.' },
  { num: '03', titulo: 'Firmamos y nosotros nos ponemos a ello', texto: 'Asumimos la puesta a punto. Tú no gestionas nada.' },
  { num: '04', titulo: 'Cobras cada mes', texto: 'Renta fija el día 1, aunque el piso esté en obras. Sin excusas.' },
]

const estadoOpciones: EstadoOpcion[] = [
  { value: 'necesita-reforma', label: 'Necesita reforma' },
  { value: 'vacio-cerrado', label: 'Vacío / Sin amueblar' },
  { value: 'heredado', label: 'Heredado' },
  { value: 'alquilado-cambio', label: 'Alquilado, quiero cambiar' },
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

/* ── Coste estimado por tipo de reforma ─────────────────────────────────── */
const COSTE_M2: Record<string, { label: string; precio: number }> = {
  pintura:  { label: 'Pintura y limpieza',        precio: 25  },
  parcial:  { label: 'Lavado de cara + muebles',  precio: 90  },
  integral: { label: 'Reforma integral',           precio: 500 },
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function ReformaIncluidaPage() {
  const [metros, setMetros] = useState(70)
  const [tipo, setTipo]     = useState<keyof typeof COSTE_M2>('parcial')
  const coste = metros * COSTE_M2[tipo].precio

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
      <StickyCTA show={showSticky} onForm={scrollToForm} onCall={() => setCallPopup(true)} ctaLabel="Quiero la reforma incluida →" />
      <LandingHeader onCall={() => setCallPopup(true)} />

      {/* ── HERO + CALCULADORA ───────────────────────────────────────── */}
      <section ref={heroRef} className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/despues-2.png" alt="" fill className="object-cover object-center opacity-25" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#0f2d55]/90" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-1">
              <span className="inline-block bg-white/10 border border-white/15 text-white/80 text-[0.6rem] font-sans font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Para propietarios · Zaragoza · Huesca
              </span>
              <h1 className="font-serif text-white text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-light leading-tight mb-4">
                Tu piso necesita reforma.<br />
                <span className="italic" style={{ color: '#C9A96E' }}>Nosotros la ponemos.</span>
              </h1>
              <p className="font-serif font-light text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                No tienes que invertir nada. Renttia asume la puesta a punto del piso a cambio de
                gestionar el alquiler por habitaciones. Tú cobras tu renta fija desde el primer mes.
              </p>
              <div className="mt-5 flex items-start gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 max-w-lg">
                <span className="text-xl mt-0.5">💡</span>
                <p className="font-sans text-white/80 text-sm leading-snug">
                  <strong className="text-white">0€ de tu bolsillo en obra o mobiliario.</strong>{' '}
                  Nosotros invertimos, tú cobras. Así de simple.
                </p>
              </div>
            </div>

            {/* ── CALCULADORA ─────────────────────────────────────────── */}
            <div className="order-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
              <h2 className="font-serif text-navy text-lg sm:text-2xl font-light mb-1">¿Cuánto te costaría reformarlo tú solo?</h2>
              <p className="font-sans text-gray-500 text-sm mb-5">Ajusta los datos. Así de real es el ahorro.</p>

              {/* Tipo de reforma */}
              <div className="mb-5">
                <p className="font-sans text-sm font-medium text-navy/70 mb-2">Tipo de intervención que necesitas</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(COSTE_M2).map(([key, { label }]) => (
                    <button
                      key={key}
                      onClick={() => setTipo(key as keyof typeof COSTE_M2)}
                      className={`text-xs font-sans font-semibold py-2.5 px-2 rounded-xl border transition-all text-center leading-tight ${
                        tipo === key
                          ? 'bg-navy text-white border-navy shadow-md'
                          : 'bg-white text-navy/60 border-navy/20 hover:border-navy/40'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Slider label="Metros cuadrados del piso" value={metros} min={30} max={150} step={5} unit="m²" onChange={setMetros} />

              {/* Resultado */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">Si lo haces tú</p>
                  <p className="font-serif text-2xl sm:text-3xl font-light text-red-600 tabular-nums">{fmt(coste)} €</p>
                  <p className="font-sans text-red-400/80 text-[10px] mt-1">+ tiempo, gestión y estrés</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-center">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">Con Renttia</p>
                  <p className="font-serif text-2xl sm:text-3xl font-light text-green-700 tabular-nums">0 €</p>
                  <p className="font-sans text-green-600/80 text-[10px] mt-1">Nosotros lo asumimos todo</p>
                </div>
              </div>

              <p className="font-sans text-gray-400 text-xs mt-3 text-center">
                Te ahorras <strong className="text-navy">{fmt(coste)} €</strong> y empiezas a cobrar renta fija desde el día 1.
              </p>

              <button onClick={scrollToForm} className="btn-cta w-full py-4 text-base mt-4">
                Quiero que lo gestione Renttia →
              </button>
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />
      <Beneficios
        label="Cómo funciona"
        titulo="Renttia pone el piso a punto. Tú cobras."
        subtitulo="Asumimos la inversión inicial para que tú no tengas que adelantar nada. Solo firmamos y cobras."
        items={beneficios}
      />
      <AntesDespues />
      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />

      <FormSection innerRef={formRef} titulo="Cuéntanos el estado de tu piso" texto="Te llamamos en menos de 24 horas con una propuesta real. Sin compromiso.">
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} />
      </FormSection>

      <FAQSection faqs={faqsCompletas} />
      <FinalCTA
        titulo="Tu piso necesita reforma. Nosotros la ponemos."
        texto="Sin inversión por tu parte. Sin gestión. Solo tu renta fija el día 1."
        ctaLabel="Quiero mi valoración gratuita →"
        onForm={scrollToForm}
        onCall={() => setCallPopup(true)}
      />
      <LandingFooter />
    </div>
  )
}
