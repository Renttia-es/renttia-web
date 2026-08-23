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
  { icon: '💶', titulo: 'Renta fija garantizada el día 1', texto: 'En alquiler tradicional cobras si el inquilino paga. Con Renttia cobras siempre, pase lo que pase.' },
  { icon: '⚖️', titulo: 'Registros y burocracia, a nuestro cargo', texto: 'En alquiler tradicional los trámites son tuyos. Con Renttia, los contratos, registros y obligaciones legales los gestionamos nosotros.' },
  { icon: '🔒', titulo: 'Sin procesos de reclamación', texto: 'En alquiler tradicional un impago puede costarte entre 6 y 12 meses de trámites. Con Renttia ese riesgo desaparece: somos nosotros tu inquilino.' },
  { icon: '🙅', titulo: 'Cero trato con inquilinos', texto: 'En alquiler tradicional tú coordinas visitas, cobros e incidencias. Con Renttia solo hablas con nosotros.' },
  { icon: '📋', titulo: 'Un contrato claro y estable', texto: 'Firmas con Renttia, no con desconocidos. Sin renovaciones inciertas, sin sorpresas al final del contrato.' },
  { icon: '🏠', titulo: 'Tu piso siempre cuidado', texto: 'Lo preparamos al entrar y lo devolvemos igual o mejor. Sin disputas sobre fianza ni desperfectos.' },
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
                Alternativa al alquiler tradicional · Zaragoza · Huesca
              </span>
              <h1 className="font-serif text-white text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-light leading-tight mb-4">
                El alquiler tradicional<br />
                <span className="italic" style={{ color: '#C9A96E' }}>ya no es lo que era.</span>
              </h1>
              <p className="font-serif font-light text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
                Nuevos registros, mediación obligatoria antes de poder reclamar, procesos
                judiciales que se alargan meses... La normativa ha hecho el alquiler tradicional
                más complicado y arriesgado que nunca. Existe una alternativa: delegar a Renttia
                y cobrar una renta fija garantizada sin ninguno de esos problemas.
              </p>
              <div className="mt-5 flex items-start gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 max-w-lg">
                <span className="text-xl mt-0.5">💡</span>
                <p className="font-sans text-white/80 text-sm leading-snug">
                  <strong className="text-white">Con Renttia no alquilas tú — alquilamos nosotros.</strong>{' '}
                  Tú cobras tu renta fija el día 1. Registros, incidencias y reclamaciones son nuestro problema.
                </p>
              </div>
            </div>

            <div className="order-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
              <h2 className="font-serif text-navy text-lg sm:text-2xl font-light mb-1">¿Cuántas horas pierdes cumpliendo con la normativa?</h2>
              <p className="font-sans text-gray-500 text-sm mb-6">Elige cuántas habitaciones gestionas tú ahora mismo.</p>

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
                Con Renttia: <strong className="text-navy">0 horas tuyas</strong> y <strong className="text-navy">cumplimiento normativo garantizado</strong>. Tú solo cobras.
              </p>

              <button onClick={scrollToForm} className="btn-cta w-full py-4 text-base mt-4">
                Quiero que Renttia lo gestione →
              </button>
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />
      <Beneficios label="Alquiler tradicional vs. Renttia" titulo="Una alternativa sin los riesgos del alquiler tradicional." subtitulo="Misma vivienda, mismo propietario. Pero sin inquilinos directos, sin incidencias y con renta garantizada el día 1." items={beneficios} />
      <AntesDespues />
      <Proceso pasos={pasos} />
      <QuienesSomos />
      <Reviews />

      <FormSection innerRef={formRef} titulo="Deja la normativa en nuestras manos" texto="Te explicamos cómo funciona y qué renta podrías cobrar. Sin compromiso.">
        <LeadForm fuente={FUENTE} estadoOpciones={estadoOpciones} />
      </FormSection>

      <FAQSection faqs={faqsCompletas} />
      <FinalCTA titulo="Deja el alquiler tradicional atrás." texto="Con Renttia cobras una renta fija garantizada el día 1. Sin inquilinos, sin trámites, sin riesgos. Te llamamos en menos de 24 horas." ctaLabel="Quiero mi valoración gratuita →" onForm={scrollToForm} onCall={() => setCallPopup(true)} />
      <LandingFooter />
    </div>
  )
}
