'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import Image from 'next/image'

/* ─── METADATA ─────────────────────────────────────────────────────────────
   Nota: como es 'use client', el SEO se gestiona en el layout o con
   una page server que wrappee este componente. Puedes añadirlo ahí.
──────────────────────────────────────────────────────────────────────────── */

/* ─── TIPOS ─────────────────────────────────────────────────────────────── */
type FormState = 'idle' | 'sending' | 'ok' | 'error'

/* ─── SLIDER ─────────────────────────────────────────────────────────────── */
function Slider({
  label, value, min, max, step = 1, unit, onChange,
}: {
  label: string; value: number; min: number; max: number
  step?: number; unit: string; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-base font-bold text-gray-900">
          {value.toLocaleString('es-ES')} {unit}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-200">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-navy transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min.toLocaleString('es-ES')} {unit}</span>
        <span>{max.toLocaleString('es-ES')} {unit}</span>
      </div>
    </div>
  )
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */
function FAQItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-sans text-gray-800 font-medium text-base leading-snug group-hover:text-navy transition-colors">
          {pregunta}
        </span>
        <span className={[
          'shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200',
          open ? 'rotate-45 bg-navy border-navy' : 'bg-white',
        ].join(' ')}>
          <svg className={`w-3 h-3 transition-colors ${open ? 'text-white' : 'text-gray-400'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-gray-600 text-base leading-relaxed pb-5 pr-8">
          {respuesta}
        </p>
      )}
    </div>
  )
}

/* ─── STEP ───────────────────────────────────────────────────────────────── */
function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-navy text-white font-bold text-sm flex items-center justify-center shrink-0 z-10">
          {n}
        </div>
        <div className="w-px flex-1 bg-navy/20 mt-2" />
      </div>
      <div className="pb-8 pt-1.5">
        <p className="font-sans font-semibold text-navy text-base mb-1">{title}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ─── FORMULARIO FINAL ───────────────────────────────────────────────────── */
function FormularioFinal({ fuente }: { fuente: string }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [estadoPiso, setEstadoPiso] = useState('')
  const [estado, setEstado] = useState<FormState>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEstado('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email, ciudad, fuente, tipo: estadoPiso }),
      })
      setEstado(res.ok ? 'ok' : 'error')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-sans font-bold text-gray-900 text-xl mb-2">¡Solicitud recibida!</h3>
        <p className="text-gray-600 text-base">
          Te llamamos en menos de 24 horas. Revisa también tu email, te enviamos confirmación.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Nombre completo *
          </label>
          <input
            type="text" required value={nombre} onChange={e => setNombre(e.target.value)}
            placeholder="María García"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-navy transition-colors bg-white placeholder-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Teléfono de contacto *
          </label>
          <input
            type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)}
            placeholder="600 000 000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-navy transition-colors bg-white placeholder-gray-300"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Correo electrónico *
          </label>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-navy transition-colors bg-white placeholder-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Ciudad del inmueble *
          </label>
          <input
            type="text" required value={ciudad} onChange={e => setCiudad(e.target.value)}
            placeholder="Zaragoza"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-navy transition-colors bg-white placeholder-gray-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          ¿Cómo se encuentra el piso actualmente?
        </label>
        <select
          value={estadoPiso} onChange={e => setEstadoPiso(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base focus:outline-none focus:border-navy transition-colors bg-white"
        >
          <option value="">Selecciona una opción...</option>
          <option value="vacio-cerrado">Vacío / Cerrado desde hace meses</option>
          <option value="necesita-reforma">Necesita reformas / Antiguo</option>
          <option value="alquilado-cambio">Alquilado actualmente pero buscando cambiar</option>
          <option value="heredado">Heredado recientemente</option>
        </select>
      </div>

      {estado === 'error' && (
        <p className="text-red-500 text-sm">
          Hubo un error al enviar. Llámanos directamente al +34 976 000 000.
        </p>
      )}

      <button
        type="submit" disabled={estado === 'sending'}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-base rounded-xl py-4 px-6 transition-colors shadow-lg shadow-red-200"
      >
        {estado === 'sending' ? 'Enviando...' : 'DETENER PÉRDIDAS Y SOLICITAR ESTUDIO'}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1">
        {['🔒 Datos protegidos por la RGPD', '⏳ Llamada de solo 5 minutos', 'Cero compromiso'].map(t => (
          <span key={t} className="text-xs text-gray-400">{t}</span>
        ))}
      </div>
    </form>
  )
}

/* ─── FORMULARIO RÁPIDO (en calculadora) ────────────────────────────────── */
function FormularioRapido({ fuente }: { fuente: string }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [estado, setEstado] = useState<FormState>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEstado('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email: '', ciudad: '', fuente, tipo: 'calculadora-rapida' }),
      })
      setEstado(res.ok ? 'ok' : 'error')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center">
        <p className="font-semibold text-green-700">✅ ¡Recibido! Te llamamos hoy.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text" required value={nombre} onChange={e => setNombre(e.target.value)}
        placeholder="Tu nombre"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-red-400 bg-white"
      />
      <input
        type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)}
        placeholder="Teléfono"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-red-400 bg-white"
      />
      <button
        type="submit" disabled={estado === 'sending'}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm whitespace-nowrap transition-colors"
      >
        {estado === 'sending' ? '...' : 'Detener Pérdidas'}
      </button>
    </form>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════════════════════════════════════ */
export default function PisoVacioPage() {
  /* ─── Calculadora ──────────────────────────────────────────────────────── */
  const [comunidad,   setComunidad]   = useState(70)
  const [ibi,         setIbi]         = useState(500)
  const [seguro,      setSeguro]      = useState(250)
  const [suministros, setSuministros] = useState(40)

  const gastoDirecto    = (comunidad * 12) + ibi + seguro + (suministros * 12)
  const costoOportunidad = 14700
  const perdidaTotal    = gastoDirecto + costoOportunidad

  /* ─── Sticky CTA ───────────────────────────────────────────────────────── */
  const [showSticky, setShowSticky] = useState(false)
  const [callPopup,  setCallPopup]  = useState(false)
  const heroRef     = useRef<HTMLDivElement>(null)
  const formRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0
      setShowSticky(heroBottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const fmt = (n: number) => n.toLocaleString('es-ES')
  const FUENTE = 'landing-calculadora-gastos'

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">

      {/* ──────────────────────────────────────────────────────────────────
          NAVBAR MINIMALISTA
      ────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="font-serif text-navy text-xl font-light tracking-tight">RENTTIA</span>
          </a>
          <button
            onClick={() => setCallPopup(true)}
            className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Llamar ahora
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────
          S1 — HERO
      ────────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="bg-gradient-to-br from-slate-50 to-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Chip */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-700 text-xs font-semibold uppercase tracking-wider">
                Calculadora de pérdidas patrimoniales
              </span>
            </div>

            <h1 className="font-serif font-light text-navy text-4xl sm:text-5xl leading-tight mb-6">
              ¿Cuánto te cuesta realmente<br className="hidden sm:block" />{' '}
              <span className="text-red-600">tener tu piso cerrado?</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
              Mantener una vivienda vacía o antigua por miedo a la Ley de Vivienda no es gratis.
              Calcula en 30 segundos el dinero real que tu patrimonio está perdiendo este año
              en costes fijos e impuestos.
            </p>

            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy/90 transition-colors text-base shadow-lg shadow-navy/20"
            >
              Ver mi pérdida real
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>

          {/* Imagen hero */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
            <Image
              src="/images/hero-piso.jpg"
              alt="Piso cerrado — Renttia"
              fill className="object-cover" priority
              sizes="(max-width:1024px) 100vw, 50vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Fallback si no hay imagen */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/40 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🏠</div>
                <p className="font-serif font-light text-2xl">Tu patrimonio,<br />activado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S2 — CALCULADORA INTERACTIVA
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
              Simulador de gasto oculto
            </p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl">
              Mueve los sliders y descubre cuánto pierdes
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 overflow-hidden">
            {/* Sliders */}
            <div className="p-8 sm:p-10 space-y-8">
              <Slider
                label="Comunidad de propietarios"
                value={comunidad} min={20} max={200} unit="€/mes"
                onChange={setComunidad}
              />
              <Slider
                label="IBI (Impuesto de Bienes Inmuebles) anual"
                value={ibi} min={200} max={1200} step={10} unit="€/año"
                onChange={setIbi}
              />
              <Slider
                label="Seguro de hogar anual"
                value={seguro} min={150} max={500} step={5} unit="€/año"
                onChange={setSeguro}
              />
              <Slider
                label="Mínimos de suministros (luz/agua sin consumo)"
                value={suministros} min={20} max={80} unit="€/mes"
                onChange={setSuministros}
              />
            </div>

            {/* Resultado */}
            <div className="bg-red-50 border-t border-red-100 p-8 sm:p-10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-red-200">
                <div>
                  <p className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-1">
                    🔴 Tu piso cerrado te cuesta actualmente
                  </p>
                  <p className="text-gray-500 text-sm">Gastos directos anuales contabilizados</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl sm:text-5xl font-black text-red-600 tabular-nums">
                    {fmt(gastoDirecto)} €
                  </p>
                  <p className="text-red-400 text-xs font-medium">al año en pérdidas directas</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-orange-200">
                <p className="text-orange-700 font-semibold text-sm mb-1">
                  ⚠️ Coste de oportunidad estimado
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Al no estar bajo el modelo de Alquiler Corporativo de Renttia, estimamos que estás
                  dejando de ingresar una media de{' '}
                  <strong className="text-orange-700">{fmt(costoOportunidad)} € anuales</strong>{' '}
                  en rentas garantizadas.
                </p>
              </div>

              <div className="p-5 bg-red-700 rounded-2xl text-white">
                <p className="font-semibold text-sm mb-2 text-red-200">
                  Pérdida patrimonial total acumulada este año
                </p>
                <p className="text-5xl sm:text-6xl font-black tabular-nums">
                  {fmt(perdidaTotal)} €
                </p>
              </div>

              {/* Mini form rápido */}
              <div className="pt-2">
                <p className="text-gray-600 text-sm font-medium mb-3">
                  ¿Quieres detener estas pérdidas? Déjanos tu contacto:
                </p>
                <FormularioRapido fuente={`${FUENTE}-calculadora`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S3 — PROPUESTA DE VALOR
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif font-light text-white text-3xl sm:text-4xl mb-4">
              Detén la fuga de capital.<br />Pásate al Alquiler Corporativo.
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
              En Renttia no somos un inquilino convencional, somos tu operador residencial.
              Firmamos un contrato de explotación comercial amparado en el Código Civil
              (Art. 3 LAU para uso distinto de vivienda), absorbiendo el 100% del riesgo operativo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: '🛡️',
                title: 'Renta Garantizada el Día 1',
                desc: 'Cobras siempre, directamente de nuestra empresa, esté el piso ocupado o no.',
              },
              {
                icon: '🔌',
                title: 'Suministros a Nuestro Nombre',
                desc: 'Realizamos un cambio de titularidad completo (CUPS). Si hay un impago de luz o agua, la responsabilidad jurídica es exclusivamente nuestra.',
              },
              {
                icon: '🧹',
                title: 'Control Semanal Obligatorio',
                desc: 'Implantamos limpieza semanal en zonas comunes y tecnología de acceso digital. Tu piso nunca es invisible.',
              },
              {
                icon: '🔨',
                title: 'Revalorización a Coste 0 €',
                desc: 'Adecuamos estéticamente tu inmueble e invertimos en mobiliario premium sin que tú desembolses un solo euro.',
              },
            ].map(b => (
              <div key={b.title} className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors">
                <span className="text-3xl block mb-4">{b.icon}</span>
                <h3 className="font-sans font-semibold text-white text-base mb-2">{b.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S4 — PROCESO (4 PASOS)
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">
              El proceso
            </p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl">
              Tu tranquilidad, construida en 4 pasos técnicos.
            </h2>
          </div>

          <div>
            <Step
              n="01"
              title="Estudio de Viabilidad Digital"
              desc="Rellenas el formulario y nuestro equipo analiza la tipología de tu inmueble y las directrices urbanísticas de tu zona."
            />
            <Step
              n="02"
              title="Inspección y Oferta en Firme"
              desc="Visitamos tu propiedad y te entregamos una propuesta económica cerrada con el contrato principal para tu total revisión jurídica."
            />
            <Step
              n="03"
              title="Blindaje Legal y Llaves"
              desc="Firmamos bajo el Código Civil, te entregamos las dos mensualidades de fianza legal y realizamos el cambio de titularidad de los suministros."
            />
            <Step
              n="04"
              title="Activación de Ingresos Pasivos"
              desc="Tramitamos el Registro Único de Arrendamientos (RD 1312/2024), ejecutamos el Home Staging y tú comienzas a recibir tu renta fija cada día 1."
            />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy/90 transition-colors text-base"
            >
              Quiero que analicéis mi piso gratis
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S5 — TESTIMONIOS
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">
              Prueba social
            </p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl">
              Lo que dicen otros propietarios<br />que vencieron el miedo.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                texto: 'Heredé el piso de mis padres en una zona universitaria pero me aterraba la nueva Ley de Vivienda y las historias de impagos. Llevaba 8 meses cerrado costándome dinero de comunidad e IBI. Con Renttia pasé de perder dinero a tener una renta fija ingresada religiosamente el día 1 de cada mes directamente desde su sociedad. Su abogado me explicó el contrato bajo el Código Civil y me dio una tranquilidad absoluta.',
                nombre: 'Carmen M.',
                cargo: 'Propietaria de un piso heredado',
              },
              {
                texto: 'Lo que me convenció de Renttia fue el cambio de titularidad de la luz y el agua. En mi anterior alquiler tradicional, el inquilino me dejó una deuda de suministros de más de 800€ a mi nombre. Con ellos, la empresa es la titular por contrato. Además, ver los renders de IA que hicieron de las habitaciones y comprobar que entran cada semana a limpiar las zonas comunes me asegura que mi piso está mejor cuidado que nunca.',
                nombre: 'Alejandro T.',
                cargo: 'Inversor Inmobiliario',
              },
            ].map(t => (
              <div key={t.nombre} className="bg-slate-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif font-light text-gray-700 text-base leading-relaxed mb-6">
                  "{t.texto}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <span className="text-navy font-bold text-sm">{t.nombre[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-navy text-sm">{t.nombre}</p>
                    <p className="text-gray-400 text-xs">{t.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy/90 transition-colors text-base"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Hablar con un asesor de Renttia
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S6 — FORMULARIO FINAL
      ────────────────────────────────────────────────────────────────── */}
      <section ref={formRef} id="formulario" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">
              Solicitar estudio gratuito
            </p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl mb-4">
              Transforma tus costes<br />en ingresos garantizados.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Solicita tu Estudio de Viabilidad Patrimonial gratuito y descarga
              nuestro Dossier Corporativo completo.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-8 sm:p-10">
            <FormularioFinal fuente={FUENTE} />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          S7 — FAQ ACORDEÓN
      ────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl mb-10 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
            <div className="px-6 sm:px-8">
              {[
                {
                  pregunta: '¿Es legal el subarriendo en España?',
                  respuesta: 'Sí, está plenamente respaldado por el artículo 3 de la Ley de Arrendamientos Urbanos (LAU) y los artículos 1542 y siguientes del Código Civil, siempre que se cuente con la autorización expresa por escrito que nosotros incluimos en el contrato principal.',
                },
                {
                  pregunta: '¿Qué pasa si un residente de una habitación no paga?',
                  respuesta: 'A usted no le afecta en absoluto. Su relación contractual de alquiler es directamente con nuestra empresa (Renttia), no con los ocupantes temporales. Nosotros asumimos el 100% del riesgo operativo y legal. Usted cobra su renta íntegra el día 1.',
                },
                {
                  pregunta: '¿Cumple Renttia con la nueva normativa digital?',
                  respuesta: 'Sí. Absorbemos toda la carga burocrática del Real Decreto 1312/2024. Nos encargamos de gestionar el Número de Registro Único ante el Registro de la Propiedad y de validar documentalmente la causa de temporalidad de cada perfil.',
                },
                {
                  pregunta: '¿Quién se hace cargo de los desperfectos?',
                  respuesta: 'Renttia asume por contrato la responsabilidad directa del estado del piso ante usted y cubre las reparaciones ordinarias derivadas del uso diario. Además, nuestro protocolo de limpieza semanal obligatoria actúa como una auditoría constante del estado de la finca.',
                },
              ].map(faq => (
                <FAQItem key={faq.pregunta} pregunta={faq.pregunta} respuesta={faq.respuesta} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          FOOTER MÍNIMO
      ────────────────────────────────────────────────────────────────── */}
      <footer className="py-8 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-white/70 text-sm">RENTTIA · Operador Residencial Corporativo</span>
          <div className="flex items-center gap-6">
            <a href="/privacidad" className="text-white/40 text-xs hover:text-white/70 transition-colors">Política de privacidad</a>
            <a href="/aviso-legal" className="text-white/40 text-xs hover:text-white/70 transition-colors">Aviso legal</a>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────
          STICKY CTA — visible tras pasar el hero, solo en móvil
      ────────────────────────────────────────────────────────────────── */}
      <div className={[
        'fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300',
        showSticky ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}>
        <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
          <button
            onClick={scrollToForm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            📞 Detener Pérdidas: Solicitar Llamada
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          POPUP TELÉFONO
      ────────────────────────────────────────────────────────────────── */}
      {callPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setCallPopup(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setCallPopup(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="font-serif text-navy text-xl font-light mb-2">Llámanos ahora</h3>
            <p className="text-gray-500 text-sm mb-6">Nuestro equipo te atiende de lunes a viernes de 9h a 19h.</p>
            <a href="tel:+34976000000" className="block w-full bg-navy text-white font-semibold py-4 rounded-xl text-base hover:bg-navy/90 transition-colors">
              +34 976 000 000
            </a>
            <p className="text-gray-300 text-xs mt-4">O rellena el formulario y te llamamos nosotros.</p>
          </div>
        </div>
      )}
    </div>
  )
}
