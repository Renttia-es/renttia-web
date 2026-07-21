'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, type FormEvent } from 'react'

const ciudades = [
  { label: 'Zaragoza', href: '/gestion-alquiler-zaragoza' },
  { label: 'Huesca',   href: '/gestion-alquiler-huesca'   },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [ciudadesOpen, setCiudadesOpen] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const handler = () => setModal(true)
    window.addEventListener('renttia:open-modal', handler)
    return () => window.removeEventListener('renttia:open-modal', handler)
  }, [])

  // Formulario del popup
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, ciudad, fuente: 'navbar-cta' }),
      })
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 pt-2">
          <div className={`max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-black/5 transition-all duration-300 ${open ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
            <div className="flex items-center h-16 px-4 sm:px-6 relative">

              <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Renttia — Alquiler de Habitaciones Premium">
                <Image
                  src="/logo.png"
                  alt="Renttia — Gestión Profesional de Inmuebles"
                  width={180}
                  height={54}
                  priority
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>

              {/* Nav centrada */}
              <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <button className="flex items-center gap-1 text-navy/60 hover:text-navy text-sm font-sans font-medium px-3.5 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                    Propietarios
                    <svg className="w-3.5 h-3.5 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 ring-1 ring-gray-100/80">
                    {ciudades.map(c => (
                      <Link key={c.href} href={c.href}
                        className="block px-4 py-2.5 text-sm text-navy/70 hover:text-navy hover:bg-navy/5 font-sans transition-colors">
                        Gestión en {c.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/#como-funciona"
                  className="text-navy/60 hover:text-navy text-sm font-sans font-medium px-3.5 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  Cómo funciona
                </Link>

                <Link href="/blog"
                  className="text-navy/60 hover:text-navy text-sm font-sans font-medium px-3.5 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  Blog
                </Link>
              </nav>

              {/* CTA derecha — abre popup */}
              <div className="hidden lg:flex items-center gap-3 ml-auto flex-shrink-0">
                <button onClick={() => setModal(true)} className="btn-cta text-sm px-5 py-2.5">
                  Soy propietario
                </button>
              </div>

              {/* Burger móvil */}
              <button
                className="lg:hidden ml-auto text-navy/60 p-2 hover:text-navy transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Menú"
              >
                {open ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          {open && (
            <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-b-2xl border border-t-0 border-white/60 shadow-xl shadow-black/5 px-5 pb-5">
              <div className="border-t border-gray-100/80 pt-4 space-y-1">

                <button
                  onClick={() => setCiudadesOpen(!ciudadesOpen)}
                  className="w-full flex items-center justify-between text-navy/70 hover:text-navy text-sm font-sans px-2 py-2 rounded-xl hover:bg-navy/5 transition-colors"
                >
                  <span>Propietarios</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${ciudadesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {ciudadesOpen && (
                  <div className="pl-4 space-y-1">
                    {ciudades.map(c => (
                      <Link key={c.href} href={c.href} onClick={() => { setOpen(false); setCiudadesOpen(false) }}
                        className="block text-navy/60 hover:text-navy text-sm font-sans px-2 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                        Gestión en {c.label}
                      </Link>
                    ))}
                  </div>
                )}

                <Link href="/#como-funciona" onClick={() => setOpen(false)}
                  className="block text-navy/70 hover:text-navy text-sm font-sans px-2 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  Cómo funciona
                </Link>

                <Link href="/blog" onClick={() => setOpen(false)}
                  className="block text-navy/70 hover:text-navy text-sm font-sans px-2 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  Blog
                </Link>

                <div className="pt-3">
                  <button onClick={() => { setOpen(false); setModal(true) }}
                    className="btn-cta w-full text-sm py-3">
                    Soy propietario →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── POPUP FORMULARIO ──────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fondo oscuro */}
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => { setModal(false); setSent(false) }} />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            {/* Cerrar */}
            <button
              onClick={() => { setModal(false); setSent(false) }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {sent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-navy text-xl font-light mb-2">¡Recibido!</h3>
                <p className="font-sans text-gray-500 text-sm">Te llamamos en menos de 24 horas. Sin compromiso.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-navy text-2xl font-light mb-1">Solicitar valoración</h3>
                <p className="font-sans text-gray-400 text-sm mb-6">Te llamamos en menos de 24 horas. Sin compromiso.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Nombre</label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-navy placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                      placeholder="600 000 000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-navy placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Ciudad del piso</label>
                    <select
                      value={ciudad}
                      onChange={e => setCiudad(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/30 transition bg-white"
                    >
                      <option value="">Selecciona ciudad...</option>
                      <option value="zaragoza">Zaragoza</option>
                      <option value="huesca">Huesca</option>
                      <option value="otra">Otra ciudad</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-cta w-full py-4 text-sm disabled:opacity-60"
                  >
                    {sending ? 'Enviando...' : 'Solicitar valoración gratuita →'}
                  </button>

                  <p className="text-center font-sans text-gray-400 text-xs">
                    🔒 Datos protegidos por RGPD · Sin compromiso
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
