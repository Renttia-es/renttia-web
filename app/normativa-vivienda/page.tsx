'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'

type FormState = 'idle' | 'sending' | 'ok' | 'error'
const FUENTE = 'landing-normativa-vivienda'

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
function FAQItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="font-sans text-gray-800 font-medium text-base leading-snug group-hover:text-navy transition-colors">
          {pregunta}
        </span>
        <span className={['shrink-0 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200',
          open ? 'rotate-45 bg-navy border-navy' : 'bg-white'].join(' ')}>
          <svg className={`w-3 h-3 transition-colors ${open ? 'text-white' : 'text-gray-400'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      {open && <p className="text-gray-600 text-base leading-relaxed pb-5 pr-8">{respuesta}</p>}
    </div>
  )
}

/* ─── STEP ───────────────────────────────────────────────────────────────── */
function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-navy text-white font-bold text-sm flex items-center justify-center shrink-0 z-10">{n}</div>
        <div className="w-px flex-1 bg-navy/20 mt-2" />
      </div>
      <div className="pb-8 pt-1.5">
        <p className="font-sans font-semibold text-navy text-base mb-1">{title}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ─── FORM RÁPIDO ────────────────────────────────────────────────────────── */
function FormRapido({ fuente }: { fuente: string }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [estado, setEstado] = useState<FormState>('idle')
  async function submit(e: FormEvent) {
    e.preventDefault(); setEstado('sending')
    try {
      const r = await fetch('/api/contacto', { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email: '', ciudad: '', fuente, tipo: 'burocracia-rapida' }) })
      setEstado(r.ok ? 'ok' : 'error')
    } catch { setEstado('error') }
  }
  if (estado === 'ok') return <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center"><p className="font-semibold text-green-700">✅ ¡Recibido! Te contactamos hoy.</p></div>
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)}
        placeholder="Tu nombre"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-navy bg-white" />
      <input type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)}
        placeholder="Teléfono"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-navy bg-white" />
      <button type="submit" disabled={estado === 'sending'}
        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap transition-colors">
        {estado === 'sending' ? '...' : 'Delegar Trámites y Blindar Piso'}
      </button>
    </form>
  )
}

/* ─── FORM FINAL ─────────────────────────────────────────────────────────── */
function FormFinal() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [estadoPiso, setEstadoPiso] = useState('')
  const [estado, setEstado] = useState<FormState>('idle')
  async function submit(e: FormEvent) {
    e.preventDefault(); setEstado('sending')
    try {
      const r = await fetch('/api/contacto', { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email, ciudad, fuente: FUENTE, tipo: estadoPiso }) })
      setEstado(r.ok ? 'ok' : 'error')
    } catch { setEstado('error') }
  }
  if (estado === 'ok') return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="font-sans font-bold text-gray-900 text-xl mb-2">¡Solicitud recibida!</h3>
      <p className="text-gray-600">Te llamamos en menos de 24 horas.</p>
    </div>
  )
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre completo *</label>
          <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="María García"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-navy bg-white placeholder-gray-300" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Teléfono *</label>
          <input type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="600 000 000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-navy bg-white placeholder-gray-300" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-navy bg-white placeholder-gray-300" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ciudad del inmueble *</label>
          <input type="text" required value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="Zaragoza"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-navy bg-white placeholder-gray-300" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Situación actual del alquiler</label>
        <select value={estadoPiso} onChange={e => setEstadoPiso(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-navy bg-white">
          <option value="">Selecciona una opción...</option>
          <option value="alquilado-habitaciones">Alquilado por habitaciones sin registro</option>
          <option value="alquilado-temporal">Alquiler temporal en Idealista/Fotocasa</option>
          <option value="alquilado-tradicional">Alquiler tradicional buscando cambiar</option>
          <option value="vacio-cerrado">Vacío / Cerrado esperando regularización</option>
        </select>
      </div>
      {estado === 'error' && <p className="text-red-500 text-sm">Error al enviar. Llámanos al +34 976 000 000.</p>}
      <button type="submit" disabled={estado === 'sending'}
        className="w-full bg-navy hover:bg-navy/90 disabled:opacity-50 text-white font-bold text-base rounded-xl py-4 px-6 transition-colors shadow-lg shadow-navy/20">
        {estado === 'sending' ? 'Enviando...' : 'BLINDAR MI ALQUILER — DELEGACIÓN GRATUITA'}
      </button>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1">
        {['🔒 Datos protegidos por la RGPD', '⏳ Consulta de 5 minutos', 'Cero compromiso'].map(t => (
          <span key={t} className="text-xs text-gray-400">{t}</span>
        ))}
      </div>
    </form>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════════════════════════════════════ */
export default function Normativa2024Page() {
  const [habitaciones, setHabitaciones] = useState(4)
  const [conocimiento, setConocimiento] = useState(20)

  /* Lógica calculadora */
  const horasGestion    = habitaciones * 4
  const riesgoAlto      = conocimiento < 40
  const riesgoMedio     = conocimiento >= 40 && conocimiento < 70
  const nivelRiesgo     = riesgoAlto ? 'ALTO' : riesgoMedio ? 'MEDIO' : 'BAJO'
  const colorRiesgo     = riesgoAlto ? 'text-red-600' : riesgoMedio ? 'text-amber-600' : 'text-green-600'
  const bgRiesgo        = riesgoAlto ? 'bg-red-50 border-red-200' : riesgoMedio ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
  const iconRiesgo      = riesgoAlto ? '🔴' : riesgoMedio ? '🟡' : '🟢'

  /* Sticky + refs */
  const [showSticky, setShowSticky] = useState(false)
  const [callPopup,  setCallPopup]  = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setShowSticky((heroRef.current?.getBoundingClientRect().bottom ?? 0) < 0)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-serif text-navy text-xl font-light tracking-tight">RENTTIA</a>
          <button onClick={() => setCallPopup(true)}
            className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Llamar ahora
          </button>
        </div>
      </header>

      {/* ── S1: HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-navy py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            {/* Alerta normativa */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-8">
              <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
                Real Decreto 1312/2024 · En vigor desde jul-2025
              </span>
            </div>

            <h1 className="font-serif font-light text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              ¿Tu alquiler por habitaciones<br />
              <span className="text-amber-300">cumple con el</span><br />
              Real Decreto 1312/2024?
            </h1>

            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
              Evita sanciones registrales y la expulsión inmediata de tus anuncios
              en Idealista y Fotocasa. En Renttia asumimos la gestión del Número de
              Registro Único y la validación jurídica de la temporalidad de los residentes.
            </p>

            {/* 3 alertas legales */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
              {[
                { icon: '⚠️', text: 'Multas por anuncios sin Número de Registro' },
                { icon: '🚫', text: 'Desactivación en portales si no sincronizas con la Ventanilla Única Digital' },
                { icon: '📋', text: 'Validación obligatoria de causa de temporalidad de cada inquilino' },
              ].map(a => (
                <div key={a.text} className="bg-white/8 border border-white/15 rounded-2xl p-4 text-left">
                  <span className="text-2xl block mb-2">{a.icon}</span>
                  <p className="text-white/75 text-sm leading-snug">{a.text}</p>
                </div>
              ))}
            </div>

            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-10 py-5 rounded-2xl text-base transition-colors shadow-2xl shadow-black/20">
              Comprobar mi cumplimiento normativo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── S2: CALCULADORA DE CARGA BUROCRÁTICA ───────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">
              Diagnóstico de cumplimiento
            </p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl mb-3">
              ¿Cuánta carga normativa estás asumiendo?
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Ajusta los sliders y descubre tu nivel de riesgo ante la nueva Ventanilla Única Digital.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 overflow-hidden">
            {/* Sliders */}
            <div className="p-8 sm:p-10 space-y-10">
              {/* Habitaciones */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-semibold text-gray-600">
                    Número de habitaciones en gestión propia
                  </label>
                  <span className="text-xl font-black text-navy">{habitaciones} hab.</span>
                </div>
                <div className="relative h-2 rounded-full bg-gray-200">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-navy transition-all"
                    style={{ width: `${((habitaciones - 3) / 3) * 100}%` }} />
                  <input type="range" min={3} max={6} step={1} value={habitaciones}
                    onChange={e => setHabitaciones(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>3 hab.</span><span>6 hab.</span>
                </div>
              </div>

              {/* Conocimiento normativa */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-semibold text-gray-600">
                    Tu nivel de conocimiento de la nueva normativa digital
                  </label>
                  <span className={`text-xl font-black ${colorRiesgo}`}>{conocimiento}%</span>
                </div>
                <div className="relative h-2 rounded-full bg-gray-200">
                  <div className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                    riesgoAlto ? 'bg-red-500' : riesgoMedio ? 'bg-amber-500' : 'bg-green-500'
                  }`} style={{ width: `${conocimiento}%` }} />
                  <input type="range" min={0} max={100} step={5} value={conocimiento}
                    onChange={e => setConocimiento(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0% — Lo desconozco todo</span>
                  <span>100% — Experto</span>
                </div>
              </div>
            </div>

            {/* Diagnóstico dinámico */}
            <div className="border-t border-gray-100 divide-y divide-gray-100">

              {/* Horas gestión */}
              <div className="flex items-center justify-between px-8 sm:px-10 py-5 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Horas de gestión administrativa estimadas / mes</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Tramitación de códigos, validación de matrículas/contratos de trabajo, renovaciones registrales
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-3xl font-black text-navy">{horasGestion}h</p>
                  <p className="text-xs text-gray-400">al mes</p>
                </div>
              </div>

              {/* Riesgo de penalización */}
              <div className={`px-8 sm:px-10 py-5 border-l-4 ${riesgoAlto ? 'border-red-500' : riesgoMedio ? 'border-amber-500' : 'border-green-500'} ${bgRiesgo}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">{iconRiesgo}</span>
                  <div>
                    <p className={`font-bold text-base mb-1 ${colorRiesgo}`}>
                      RIESGO {nivelRiesgo}: Exposición ante portales y Registro de la Propiedad
                    </p>
                    {riesgoAlto && (
                      <p className="text-red-700 text-sm leading-relaxed">
                        Con un {conocimiento}% de conocimiento normativo, tu exposición es crítica.
                        Idealista y Fotocasa están ya sincronizando con la Ventanilla Única Digital y
                        <strong> pueden desactivar tus anuncios sin previo aviso</strong> si el Número de
                        Registro no está activo y verificado.
                      </p>
                    )}
                    {riesgoMedio && (
                      <p className="text-amber-700 text-sm leading-relaxed">
                        Conoces algo de la normativa, pero los plazos de renovación registral y la
                        validación de temporalidad por perfil requieren un seguimiento mensual que
                        escala exponencialmente con cada habitación en gestión.
                      </p>
                    )}
                    {!riesgoAlto && !riesgoMedio && (
                      <p className="text-green-700 text-sm leading-relaxed">
                        Buen nivel de conocimiento. Aún así, la carga operativa de {horasGestion}h/mes
                        seguirá creciendo. ¿Por qué no delegarla completamente a coste 0?
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Solución Renttia */}
              <div className="px-8 sm:px-10 py-6 bg-gradient-to-r from-navy/5 to-blue-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">La solución Renttia</p>
                    </div>
                    <p className="font-sans font-semibold text-navy text-base mb-1">
                      Coste de delegación jurídica en Renttia: <span className="text-green-600">0 €</span>
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Nosotros asumimos el trámite registral, la validación documental obligatoria
                      ante el Registro de la Propiedad y la responsabilidad legal completa de la actividad.
                      Tú recibes tu renta el día 1, libre de cualquier gestión.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {['✅ Número de Registro Único', '✅ Ventanilla Única Digital', '✅ Validación de temporalidad'].map(t => (
                        <span key={t} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-center">
                    <p className="text-5xl font-black text-green-600">0 €</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">coste de delegación</p>
                  </div>
                </div>
              </div>

              {/* Mini form */}
              <div className="px-8 sm:px-10 py-6">
                <p className="text-gray-700 font-semibold text-sm mb-4">
                  ¿Quieres que Renttia asuma toda la carga normativa de tu piso?
                </p>
                <FormRapido fuente={`${FUENTE}-calculadora`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S3: PROPUESTA LEGAL ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif font-light text-white text-3xl sm:text-4xl mb-4">
              Renttia como escudo legal.<br />Tú cobras, nosotros gestionamos.
            </h2>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              Somos el operador que absorbe el 100% de la burocracia del RD 1312/2024,
              firmamos bajo el Código Civil y asumimos la responsabilidad operativa completa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏛️', title: 'Número de Registro Único', desc: 'Tramitamos y mantenemos el Número de Registro ante el Registro de la Propiedad de tu comunidad autónoma.' },
              { icon: '🔗', title: 'Sincronización Ventanilla Única', desc: 'Conectamos tu inmueble con la Ventanilla Única Digital. Tus anuncios en Idealista y Fotocasa permanecen activos.' },
              { icon: '📄', title: 'Validación de Temporalidad', desc: 'Verificamos documentalmente cada causa de temporalidad (contrato laboral, matrícula) según exige la normativa.' },
              { icon: '🛡️', title: 'Responsabilidad Legal Asumida', desc: 'Si hay una inspección o sanción derivada de la actividad, la responsabilidad jurídica es exclusivamente de Renttia.' },
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

      {/* ── S4: PROCESO ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">El proceso</p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl">
              Tu tranquilidad, construida en 4 pasos técnicos.
            </h2>
          </div>
          <div>
            <Step n="01" title="Estudio de Viabilidad Digital"
              desc="Rellenas el formulario y nuestro equipo analiza la tipología de tu inmueble y las directrices urbanísticas de tu zona." />
            <Step n="02" title="Inspección y Oferta en Firme"
              desc="Visitamos tu propiedad y te entregamos una propuesta económica cerrada con el contrato principal para tu total revisión jurídica." />
            <Step n="03" title="Blindaje Legal y Llaves"
              desc="Firmamos bajo el Código Civil, te entregamos las dos mensualidades de fianza legal y realizamos el cambio de titularidad de los suministros." />
            <Step n="04" title="Activación de Ingresos Pasivos"
              desc="Tramitamos el Registro Único de Arrendamientos (RD 1312/2024), ejecutamos el Home Staging y tú comienzas a recibir tu renta fija cada día 1." />
          </div>
          <div className="text-center mt-8">
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy/90 transition-colors text-base">
              Quiero que analicéis mi piso gratis
            </button>
          </div>
        </div>
      </section>

      {/* ── S5: TESTIMONIOS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">Prueba social</p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl">
              Lo que dicen otros propietarios<br />que vencieron el miedo.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { texto: 'Heredé el piso de mis padres en una zona universitaria pero me aterraba la nueva Ley de Vivienda y las historias de impagos. Llevaba 8 meses cerrado costándome dinero de comunidad e IBI. Con Renttia pasé de perder dinero a tener una renta fija ingresada religiosamente el día 1 de cada mes directamente desde su sociedad. Su abogado me explicó el contrato bajo el Código Civil y me dio una tranquilidad absoluta.', nombre: 'Carmen M.', cargo: 'Propietaria de un piso heredado' },
              { texto: 'Lo que me convenció de Renttia fue el cambio de titularidad de la luz y el agua. En mi anterior alquiler tradicional, el inquilino me dejó una deuda de suministros de más de 800€ a mi nombre. Con ellos, la empresa es la titular por contrato. Además, ver los renders de IA que hicieron de las habitaciones y comprobar que entran cada semana a limpiar las zonas comunes me asegura que mi piso está mejor cuidado que nunca.', nombre: 'Alejandro T.', cargo: 'Inversor Inmobiliario' },
            ].map(t => (
              <div key={t.nombre} className="bg-slate-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif font-light text-gray-700 text-base leading-relaxed mb-6">"{t.texto}"</p>
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
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy/90 transition-colors text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Hablar con un asesor de Renttia
            </button>
          </div>
        </div>
      </section>

      {/* ── S6: FORMULARIO ─────────────────────────────────────────────────── */}
      <section ref={formRef} id="formulario" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50 mb-3">Delegación jurídica gratuita</p>
            <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl mb-4">
              Transforma tus costes<br />en ingresos garantizados.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Solicita tu Estudio de Viabilidad Patrimonial gratuito. Nos encargamos
              de todo el proceso de registro y tú cobras sin preocupaciones.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-8 sm:p-10">
            <FormFinal />
          </div>
        </div>
      </section>

      {/* ── S7: FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-light text-navy text-3xl sm:text-4xl mb-10 text-center">Preguntas Frecuentes</h2>
          <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
            <div className="px-6 sm:px-8">
              {[
                { pregunta: '¿Es legal el subarriendo en España?', respuesta: 'Sí, está plenamente respaldado por el artículo 3 de la Ley de Arrendamientos Urbanos (LAU) y los artículos 1542 y siguientes del Código Civil, siempre que se cuente con la autorización expresa por escrito que nosotros incluimos en el contrato principal.' },
                { pregunta: '¿Qué pasa si un residente de una habitación no paga?', respuesta: 'A usted no le afecta en absoluto. Su relación contractual de alquiler es directamente con nuestra empresa (Renttia), no con los ocupantes temporales. Nosotros asumimos el 100% del riesgo operativo y legal. Usted cobra su renta íntegra el día 1.' },
                { pregunta: '¿Cumple Renttia con la nueva normativa digital?', respuesta: 'Sí. Absorbemos toda la carga burocrática del Real Decreto 1312/2024. Nos encargamos de gestionar el Número de Registro Único ante el Registro de la Propiedad y de validar documentalmente la causa de temporalidad de cada perfil.' },
                { pregunta: '¿Quién se hace cargo de los desperfectos?', respuesta: 'Renttia asume por contrato la responsabilidad directa del estado del piso ante usted y cubre las reparaciones ordinarias derivadas del uso diario. Además, nuestro protocolo de limpieza semanal obligatoria actúa como una auditoría constante del estado de la finca.' },
              ].map(faq => <FAQItem key={faq.pregunta} pregunta={faq.pregunta} respuesta={faq.respuesta} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-8 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-white/70 text-sm">RENTTIA · Operador Residencial Corporativo</span>
          <div className="flex items-center gap-6">
            <a href="/privacidad" className="text-white/40 text-xs hover:text-white/70 transition-colors">Política de privacidad</a>
            <a href="/aviso-legal" className="text-white/40 text-xs hover:text-white/70 transition-colors">Aviso legal</a>
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA MÓVIL ───────────────────────────────────────────────── */}
      <div className={['fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300',
        showSticky ? 'translate-y-0' : 'translate-y-full'].join(' ')}>
        <div className="bg-white/96 backdrop-blur-md border-t border-gray-200 shadow-2xl px-4 py-3">
          <button onClick={scrollToForm}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-sm transition-colors">
            📞 Blindar mi Alquiler Gratis
          </button>
        </div>
      </div>

      {/* ── POPUP TELÉFONO ──────────────────────────────────────────────────── */}
      {callPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setCallPopup(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setCallPopup(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
