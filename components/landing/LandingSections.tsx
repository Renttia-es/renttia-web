'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import Image from 'next/image'
import { trackLeadConversion } from '@/lib/metaPixel'

/* ══════════════════════════════════════════════════════════════════════════
   Secciones compartidas que replican la estructura de la landing /propietario.
   Se usan en calculadora-gastos, normativa-vivienda y alquiler-corporativo
   para que todas tengan exactamente el mismo look & feel.
   ══════════════════════════════════════════════════════════════════════════ */

/* ─── TIPOS ───────────────────────────────────────────────────────────────── */
export type Beneficio = { icon: string; titulo: string; texto: string }
export type Paso = { num: string; titulo: string; texto: string }
export type Faq = { pregunta: string; respuesta: string }
export type EstadoOpcion = { value: string; label: string }

/* ─── ICONO TELÉFONO (reutilizable) ───────────────────────────────────────── */
function PhoneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

/* ─── STAR ─────────────────────────────────────────────────────────────────── */
function Star({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} text-amber-400`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

/* ─── POPUP TELÉFONO ──────────────────────────────────────────────────────── */
export function CallPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="w-14 h-14 rounded-2xl bg-cta/10 flex items-center justify-center mx-auto mb-5">
          <PhoneIcon className="w-7 h-7 text-cta" />
        </div>
        <h3 className="font-serif text-navy text-xl font-light mb-2">Llámanos ahora</h3>
        <p className="font-sans text-gray-500 text-sm mb-6">Nuestro equipo te atiende de lunes a viernes de 9h a 19h.</p>
        <a href="tel:+34692876136" className="btn-cta w-full py-4 text-base flex items-center justify-center gap-2 rounded-xl">
          <PhoneIcon className="w-5 h-5" />
          692 87 61 36
        </a>
        <p className="font-sans text-gray-300 text-xs mt-4">O rellena el formulario y te llamamos nosotros.</p>
      </div>
    </div>
  )
}

/* ─── HEADER (logo oficial + llamar) ──────────────────────────────────────── */
export function LandingHeader({ onCall }: { onCall: () => void }) {
  return (
    <header className="bg-white border-b border-navy/10 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Image src="/logo.png" alt="Renttia" width={140} height={42} className="h-8 sm:h-10 w-auto" priority />
        <button onClick={onCall}
          className="flex items-center gap-2 bg-cta text-white font-sans text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-cta/90 transition-colors shadow-md shadow-cta/20">
          <PhoneIcon />
          <span className="hidden xs:inline">Llamar ahora</span>
          <span className="xs:hidden">Llamar</span>
        </button>
      </div>
    </header>
  )
}

/* ─── BARRA CTA STICKY ────────────────────────────────────────────────────── */
export function StickyCTA({ show, onForm, onCall, ctaLabel }: { show: boolean; onForm: () => void; onCall: () => void; ctaLabel: string }) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-white border-t border-navy/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-serif text-navy text-base font-light leading-tight">¿Te interesa? Solicita tu valoración gratuita.</p>
            <p className="font-sans text-gray-400 text-xs mt-0.5">Te llamamos en menos de 24 horas. Sin compromiso.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={onForm} className="btn-cta flex-1 sm:flex-none text-sm py-3 px-6 whitespace-nowrap">{ctaLabel}</button>
            <button onClick={onCall}
              className="flex items-center gap-2 border-2 border-navy text-navy font-sans text-sm font-semibold py-3 px-4 sm:px-5 rounded-xl hover:bg-navy hover:text-white transition-colors whitespace-nowrap">
              <PhoneIcon />
              <span className="hidden sm:inline">Llamar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── FRANJA AUTORIDAD (ticker) ───────────────────────────────────────────── */
const tickerItems = [
  { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', text: 'Contrato LAU revisado por abogado' },
  { icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z', text: 'Zaragoza · Huesca' },
  { icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z', text: '0€ de comisión al propietario' },
  { icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Respuesta en menos de 24 h' },
  { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', text: 'Acceso permanente a tu vivienda' },
  { icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z', text: 'Un solo contrato, sin sorpresas' },
  { icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', text: 'Contratos de 3 a 7 años' },
  { icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25', text: 'Tu piso siempre cuidado' },
]

export function TickerStrip() {
  return (
    <section className="bg-white border-b border-navy/8 py-4 overflow-hidden">
      <div className="ticker-track">
        {[...Array(2)].map((_, rep) => (
          <div key={rep} className="flex items-center">
            {tickerItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 px-6 sm:px-8 py-1 shrink-0">
                <svg className="w-4 h-4 text-cta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="font-sans text-navy text-sm font-medium whitespace-nowrap">{item.text}</span>
                <span className="ml-6 w-1 h-1 rounded-full bg-navy/20 shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── BENEFICIOS (azul, tarjetas flotantes) ───────────────────────────────── */
export function Beneficios({ label, titulo, subtitulo, items }: { label: string; titulo: string; subtitulo?: string; items: Beneficio[] }) {
  return (
    <section className="bg-navy relative overflow-hidden py-14 sm:py-24">
      <div className="absolute inset-0">
        <Image src="/despues-1.png" alt="" fill className="object-cover opacity-[0.08]" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/90" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">{label}</span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light">{titulo}</h2>
          {subtitulo && <p className="font-serif font-light text-white/80 mt-3 max-w-xl mx-auto text-base sm:text-lg">{subtitulo}</p>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((b, i) => (
            <div
              key={b.titulo}
              className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex gap-4 items-start hover:-translate-y-1 transition-transform duration-300 ${i % 2 === 0 ? 'sm:-translate-y-1.5' : 'sm:translate-y-1.5'}`}
              style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)' }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-navy/8 flex items-center justify-center shrink-0 text-lg sm:text-xl">{b.icon}</div>
              <div>
                <h3 className="font-serif text-navy text-base font-normal mb-1">{b.titulo}</h3>
                <p className="font-sans font-normal text-gray-500 text-sm leading-relaxed">{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ANTES / DESPUÉS ─────────────────────────────────────────────────────── */
export function AntesDespues() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-cta text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">La transformación</span>
          <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">Así transformamos tu piso</h2>
          <p className="font-serif font-light text-gray-500 mt-3 text-base sm:text-lg max-w-xl mx-auto">
            Recibimos el piso tal como está y lo equipamos completamente. Si necesita reforma, la asumimos nosotros, sin coste para ti.
          </p>
        </div>
        <div className="relative grid sm:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Panel ANTES */}
          <div className="relative min-h-[300px] sm:min-h-[460px]">
            <Image src="/antes-1.png" alt="Habitación antes de Renttia" fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-gray-900/80" />
            <div className="relative p-6 sm:p-10 flex flex-col justify-end h-full">
              <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 w-fit">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                Antes
              </span>
              <h3 className="font-serif text-white text-lg sm:text-2xl font-light mb-3">El piso tal como nos lo entregan</h3>
              <ul className="space-y-2">
                {['Piso vacío, sin ingresos', 'Sin amueblar, sin preparar', 'Estrés de buscar inquilino', 'Riesgo total para el propietario'].map(t => (
                  <li key={t} className="flex items-center gap-2 font-sans text-white/75 text-sm">
                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl items-center justify-center">
            <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          {/* Panel DESPUÉS */}
          <div className="relative min-h-[300px] sm:min-h-[460px]">
            <Image src="/despues-1.png" alt="Habitación equipada por Renttia" fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/75 to-[#0f2d55]/85" />
            <div className="relative p-6 sm:p-10 flex flex-col justify-end h-full">
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 w-fit">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Después
              </span>
              <h3 className="font-serif text-white text-lg sm:text-2xl font-light mb-3">Equipado, listo y generando renta</h3>
              <ul className="space-y-2">
                {['Renta garantizada desde el día 1', 'Equipado por Renttia, sin coste tuyo', 'Tú no gestionas nada, jamás', 'Contrato estable de 3 a 7 años'].map(t => (
                  <li key={t} className="flex items-center gap-2 font-sans text-white/85 text-sm">
                    <svg className="w-3.5 h-3.5 text-white shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
          <div className="relative h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden">
            <Image src="/antes-2.png" alt="Habitación vacía antes" fill className="object-cover" sizes="(max-width:640px) 50vw, 33vw" />
          </div>
          <div className="relative h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden">
            <Image src="/despues-2.png" alt="Habitación amueblada después" fill className="object-cover" sizes="(max-width:640px) 50vw, 33vw" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PROCESO (azul, tarjetas flotantes) ──────────────────────────────────── */
export function Proceso({ pasos }: { pasos: Paso[] }) {
  return (
    <section className="bg-navy relative overflow-hidden py-14 sm:py-24">
      <div className="absolute inset-0">
        <Image src="/antes-2.png" alt="" fill className="object-cover opacity-[0.06]" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/93" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">El proceso</span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light">Simple, rápido y sin sorpresas</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pasos.map((p, i) => (
            <div
              key={p.num}
              className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center hover:-translate-y-1 transition-transform duration-300 ${i % 2 === 0 ? 'lg:-translate-y-2' : 'lg:translate-y-2'}`}
              style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)' }}
            >
              <span className="font-serif text-cta text-4xl sm:text-5xl font-light leading-none block mb-3">{p.num}</span>
              <h3 className="font-serif text-navy text-sm sm:text-base font-normal mb-1.5">{p.titulo}</h3>
              <p className="font-sans font-normal text-gray-500 text-xs sm:text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── QUIÉNES SOMOS ───────────────────────────────────────────────────────── */
export function QuienesSomos() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-navy/6 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        </div>
        <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light mb-5">Un equipo aragonés, con raíces en Jaca</h2>
        <p className="font-serif font-light text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-4">
          Renttia nació en Jaca con un propósito claro: ofrecer a los propietarios la tranquilidad que el alquiler tradicional nunca ha dado. En nuestros 2 años de experiencia hemos llegado a conocer Zaragoza y Huesca, sus barrios y su mercado.
        </p>
        <p className="font-serif font-light text-gray-500 text-base sm:text-lg lg:text-xl leading-relaxed">
          No somos una gran corporación. Somos un equipo pequeño y comprometido que trata cada piso como si fuera el nuestro, porque en cierto sentido, lo es.
        </p>
      </div>
    </section>
  )
}

/* ─── REVIEWS (cream, carrusel) ───────────────────────────────────────────── */
const reviews = [
  { nombre: 'Carmen R.', ciudad: 'Zaragoza', texto: 'Llevo dos años cobrando puntualmente el día 1. No he tenido que llamar ni una sola vez. Ojalá lo hubiera conocido antes.', estrellas: 5 },
  { nombre: 'Javier M.', ciudad: 'Huesca', texto: 'Tenía miedo de alquilar mi piso por los impagos. Con Renttia firmé y me olvidé. La renta llega siempre.', estrellas: 5 },
  { nombre: 'Patricia G.', ciudad: 'Huesca', texto: 'El piso lo dejaron impecable, mejor que como lo entregué. El trato es muy profesional.', estrellas: 5 },
  { nombre: 'Antonio L.', ciudad: 'Zaragoza', texto: 'Muy serios y transparentes desde el primer contacto. El contrato es claro y sin letra pequeña.', estrellas: 5 },
  { nombre: 'Marta S.', ciudad: 'Zaragoza', texto: 'Mi piso llevaba meses vacío. En tres semanas desde que contacté con Renttia ya estaba todo firmado.', estrellas: 5 },
  { nombre: 'Luis F.', ciudad: 'Zaragoza', texto: 'Me explicaron todo desde el primer momento. Cero sorpresas, cero preocupaciones. Totalmente recomendable.', estrellas: 5 },
  { nombre: 'Elena V.', ciudad: 'Huesca', texto: 'Tenía un piso heredado que no sabía qué hacer con él. Renttia lo gestionó todo y ahora genera renta sin que yo haga nada.', estrellas: 5 },
  { nombre: 'Roberto C.', ciudad: 'Zaragoza', texto: 'La tranquilidad de saber que cobras siempre no tiene precio. Muy recomendable para propietarios que no quieren complicaciones.', estrellas: 5 },
  { nombre: 'Isabel P.', ciudad: 'Huesca', texto: 'Proceso rapidísimo. En menos de un mes tenía el contrato firmado y el piso listo. Equipo muy atento.', estrellas: 5 },
  { nombre: 'David N.', ciudad: 'Zaragoza', texto: 'Antes tenía problemas con inquilinos. Ahora solo recibo una transferencia mensual. La diferencia es brutal.', estrellas: 5 },
  { nombre: 'Sofía T.', ciudad: 'Huesca', texto: 'Quedé muy satisfecha con la atención recibida. Me resolvieron todas las dudas antes de firmar.', estrellas: 5 },
  { nombre: 'Miguel Á.', ciudad: 'Zaragoza', texto: 'Renttia cumple exactamente lo que promete. Renta garantizada, sin llamadas, sin gestiones. Perfecto.', estrellas: 5 },
  { nombre: 'Ana B.', ciudad: 'Zaragoza', texto: 'Me preocupaba dejar el piso en manos de una empresa, pero la confianza que transmiten es total. Muy profesionales.', estrellas: 5 },
  { nombre: 'Fernando O.', ciudad: 'Zaragoza', texto: 'Cobro puntual cada mes y el piso está mejor cuidado que cuando lo alquilaba yo directamente. Nada que objetar.', estrellas: 5 },
  { nombre: 'Rosa M.', ciudad: 'Huesca', texto: 'Soy propietaria de dos pisos con Renttia. La gestión es excelente y la comunicación muy fluida.', estrellas: 5 },
  { nombre: 'Carlos E.', ciudad: 'Zaragoza', texto: 'Me ahorraron el dolor de cabeza de buscar inquilinos y gestionar incidencias. Merece cada euro.', estrellas: 5 },
  { nombre: 'Laura Q.', ciudad: 'Huesca', texto: 'El contrato es muy claro. Sin comisiones ocultas, sin sorpresas. Justo lo que necesitaba.', estrellas: 5 },
  { nombre: 'Tomás H.', ciudad: 'Zaragoza', texto: 'Tuve una pequeña avería y ni me enteré. Lo gestionaron ellos sin molestarme. Así da gusto.', estrellas: 5 },
  { nombre: 'Cristina J.', ciudad: 'Huesca', texto: 'Después de años con inquilinos problemáticos, Renttia ha sido un soplo de aire fresco. Muy recomendable.', estrellas: 5 },
  { nombre: 'Pablo R.', ciudad: 'Zaragoza', texto: 'La valoración fue rápida y honesta. Me ofrecieron exactamente el precio que pedía. Sin negociaciones.', estrellas: 5 },
  { nombre: 'Nuria D.', ciudad: 'Zaragoza', texto: 'Todo lo que dijeron que harían, lo han cumplido. Seria, puntual y profesional. Muy satisfecha.', estrellas: 5 },
  { nombre: 'Álvaro K.', ciudad: 'Zaragoza', texto: 'El piso quedó amueblado y equipado sin coste para mí. Eso marcó la diferencia para decidirme.', estrellas: 5 },
  { nombre: 'Pilar W.', ciudad: 'Huesca', texto: 'Desde la primera llamada hasta la firma, todo fue fluido y transparente. Gran experiencia.', estrellas: 5 },
  { nombre: 'Sergio A.', ciudad: 'Zaragoza', texto: 'Llevo un año sin preocupaciones. Renttia gestiona, yo cobro. Simple y efectivo.', estrellas: 5 },
]

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="w-64 sm:w-72 shrink-0 bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(18,52,98,0.08)', boxShadow: '0 2px 12px rgba(18,52,98,0.06)' }}>
      <div className="flex items-center gap-1 mb-3">{[...Array(r.estrellas)].map((_, s) => <Star key={s} />)}</div>
      <p className="font-serif font-light text-navy text-sm leading-relaxed mb-3">&quot;{r.texto}&quot;</p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
          <span className="font-sans text-navy text-xs font-semibold">{r.nombre[0]}</span>
        </div>
        <div>
          <p className="font-sans text-navy text-xs font-semibold leading-none">{r.nombre}</p>
          <p className="font-sans text-navy/40 text-[0.65rem] mt-0.5">Propietario · {r.ciudad}</p>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  return (
    <section className="py-14 sm:py-24 bg-cream overflow-hidden">
      <div className="text-center mb-8 sm:mb-10 px-4">
        <span className="inline-block text-cta text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">Opiniones reales</span>
        <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">Lo que dicen nuestros propietarios</h2>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" />)}
          <span className="font-sans text-navy/60 text-sm ml-1.5">5.0 · 24 reseñas verificadas</span>
        </div>
      </div>
      <div className="mb-3 sm:mb-4">
        <div className="reviews-left">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {reviews.slice(0, 12).map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="reviews-right">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {reviews.slice(12).map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ (azul) ──────────────────────────────────────────────────────────── */
function FAQItem({ pregunta, respuesta }: Faq) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/15 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 py-5 text-left group">
        <span className="font-serif text-white text-base sm:text-lg font-light group-hover:text-white/80 transition-colors">{pregunta}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full border border-white/25 flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-45 bg-white/10' : ''}`}>
          <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      {open && <p className="font-serif font-light text-white/80 text-base sm:text-lg leading-relaxed pb-5 pr-4 sm:pr-10">{respuesta}</p>}
    </div>
  )
}

/** Set completo de 8 FAQs (el mismo de las landings de ciudad, más completo). */
export const faqsCompletas: Faq[] = [
  { pregunta: '¿Cómo funciona Renttia exactamente?', respuesta: 'Renttia se convierte en tu único inquilino. Firmamos un contrato contigo como empresa, te pagamos el alquiler cada mes directamente y gestionamos el piso por completo, eliminando todos tus riesgos.' },
  { pregunta: '¿Cómo me garantizáis que cobraré mi alquiler todos los meses?', respuesta: 'Tu contrato es con Renttia, no con un particular. Te pagamos el día estipulado, esté el piso ocupado o vacío. Si surge cualquier problema de impago con los residentes, lo asumimos nosotros. Tu renta está 100% garantizada.' },
  { pregunta: '¿Qué pasa si un residente no paga?', respuesta: 'Ese es un problema exclusivamente nuestro. Tú sigues recibiendo tu renta íntegra cada mes según lo pactado.' },
  { pregunta: '¿Quién se encarga del mantenimiento y los desperfectos diarios?', respuesta: 'Nosotros nos ocupamos del mantenimiento ordinario, las reparaciones por uso y la limpieza periódica del piso. Nos interesa que la vivienda esté siempre en perfecto estado, por lo que mantendrá o mejorará su valor.' },
  { pregunta: '¿Tengo que pagar alguna comisión por vuestra gestión?', respuesta: 'No. No cobramos comisiones de gestión, ni mensualidades, ni tarifas ocultas al propietario. El importe de la renta pactado en el contrato es el que recibirás íntegro en tu cuenta cada mes.' },
  { pregunta: '¿Cómo seleccionáis a las personas que van a vivir en mi piso?', respuesta: 'Filtramos de forma muy estricta a los residentes potenciales. Buscamos exclusivamente perfiles cualificados, solventes y con estancia temporal, como jóvenes profesionales, sanitarios o estudiantes.' },
  { pregunta: '¿Qué pasa si un residente causa problemas en la vivienda o con la comunidad de vecinos?', respuesta: 'Nosotros nos encargamos de la gestión, la sustitución del residente y cualquier inconveniente de forma rápida y sin que tú tengas que hacer nada.' },
  { pregunta: '¿Cómo recupero mi vivienda al finalizar el contrato?', respuesta: 'Al terminar el periodo acordado, te devolvemos las llaves con el piso en el mismo estado —o mejor— en el que nos lo entregaste, completamente limpio y listo.' },
]

export function FAQSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="bg-navy relative overflow-hidden py-14 sm:py-24">
      <div className="absolute inset-0">
        <Image src="/despues-2.png" alt="" fill className="object-cover opacity-[0.07]" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/92" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-white/50 text-[0.65rem] font-sans font-semibold uppercase tracking-widest mb-3">Preguntas frecuentes</span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-light">Resolvemos tus dudas</h2>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-2 backdrop-blur-sm">
          {faqs.map(f => <FAQItem key={f.pregunta} pregunta={f.pregunta} respuesta={f.respuesta} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA FINAL (blanco) ──────────────────────────────────────────────────── */
export function FinalCTA({ titulo, texto, ctaLabel, onForm, onCall }: { titulo: string; texto: string; ctaLabel: string; onForm: () => void; onCall: () => void }) {
  return (
    <section className="bg-white py-14 sm:py-20 border-t border-navy/8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light mb-4">{titulo}</h2>
        <p className="font-serif font-light text-gray-500 text-base sm:text-lg lg:text-xl mb-8 max-w-md mx-auto">{texto}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onForm} className="btn-cta text-sm py-4 px-8">{ctaLabel}</button>
          <button onClick={onCall}
            className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-sans text-sm font-semibold py-4 px-7 rounded-xl hover:bg-navy hover:text-white transition-colors">
            <PhoneIcon />
            Prefiero llamar
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
export function LandingFooter() {
  return (
    <div className="bg-navy border-t border-white/10 py-5 px-4 text-center">
      <p className="font-sans text-xs text-white/40">
        © {new Date().getFullYear()} Renttia S.L. ·{' '}
        <a href="/privacidad" className="hover:text-white/70 transition-colors">Política de Privacidad</a>
        {' · '}
        <a href="/aviso-legal" className="hover:text-white/70 transition-colors">Aviso Legal</a>
      </p>
    </div>
  )
}

/* ─── FORMULARIO DE CONTACTO ──────────────────────────────────────────────── */
type FormState = 'idle' | 'sending' | 'ok' | 'error'

export function LeadForm({ fuente, estadoOpciones, ctaLabel = 'Solicitar valoración gratuita →' }: {
  fuente: string
  estadoOpciones: EstadoOpcion[]
  ctaLabel?: string
}) {
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
      const eventId = trackLeadConversion({ email, telefono, nombre, ciudad })
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email, ciudad, fuente, tipo: estadoPiso, eventId }),
      })
      setEstado(res.ok ? 'ok' : 'error')
    } catch { setEstado('error') }
  }

  if (estado === 'ok') return (
    <div className="text-center py-6">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="font-serif text-navy text-xl font-light mb-2">¡Recibido!</h3>
      <p className="font-sans text-gray-500 text-sm">Te llamamos en menos de 24 horas. Sin compromiso.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Nombre *</label>
          <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" className="form-input" />
        </div>
        <div>
          <label className="form-label">Teléfono *</label>
          <input type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="600 000 000" className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Email *</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className="form-input" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Ciudad del piso</label>
          <select value={ciudad} onChange={e => setCiudad(e.target.value)} className="form-input">
            <option value="">Selecciona...</option>
            <option value="zaragoza">Zaragoza</option>
            <option value="huesca">Huesca</option>
            <option value="otra">Otra</option>
          </select>
        </div>
        <div>
          <label className="form-label">¿Cómo está el piso?</label>
          <select value={estadoPiso} onChange={e => setEstadoPiso(e.target.value)} className="form-input">
            <option value="">Selecciona...</option>
            {estadoOpciones.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      {estado === 'error' && <p className="text-red-500 text-sm">Hubo un error. Llámanos al +34 976 000 000.</p>}
      <button type="submit" disabled={estado === 'sending'} className="btn-cta w-full py-4 text-base disabled:opacity-70">
        {estado === 'sending' ? 'Enviando...' : ctaLabel}
      </button>
      <p className="text-center text-xs text-gray-400">
        Al enviar aceptas nuestra <a href="/privacidad" className="underline hover:text-navy">política de privacidad</a>.
      </p>
    </form>
  )
}

/* ─── WRAPPER SECCIÓN FORMULARIO ──────────────────────────────────────────── */
export function FormSection({ titulo, texto, children, innerRef }: { titulo: string; texto: string; children: ReactNode; innerRef?: React.Ref<HTMLDivElement> }) {
  return (
    <section ref={innerRef} className="bg-white py-14 sm:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="section-label">Valoración gratuita</span>
          <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light mb-3">{titulo}</h2>
          <p className="font-serif font-light text-gray-500 text-base sm:text-lg">{texto}</p>
        </div>
        <div className="bg-cream rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-navy/10">
          {children}
        </div>
      </div>
    </section>
  )
}
