'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'


const ciudades = [
  { label: 'Zaragoza', href: '/gestion-alquiler-zaragoza' },
  { label: 'Logroño',  href: '/gestion-alquiler-logrono'  },
  { label: 'Huesca',   href: '/gestion-alquiler-huesca'   },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [ciudadesOpen, setCiudadesOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-2">
        <div className={`max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-black/5 transition-all duration-300 ${open ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
          <div className="flex items-center h-16 px-4 sm:px-6 relative">

            {/* Logo — imagen transparente, se muestra directamente sobre el cristal */}
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

            {/* Nav centrada — solo en lg para evitar solapamiento con logo y CTA */}
            <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">

              {/* Propietarios dropdown */}
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

            {/* CTA derecha */}
            <div className="hidden lg:flex items-center gap-3 ml-auto flex-shrink-0">
              <Link href="/gestion-alquiler-zaragoza#contacto" className="btn-cta text-sm px-5 py-2.5">
                Soy propietario
              </Link>
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

        {/* Menú móvil — continúa la pastilla hacia abajo */}
        {open && (
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-b-2xl border border-t-0 border-white/60 shadow-xl shadow-black/5 px-5 pb-5">
            <div className="border-t border-gray-100/80 pt-4 space-y-1">

              {/* Propietarios — submenú colapsable */}
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
                <Link href="/gestion-alquiler-zaragoza#contacto" onClick={() => setOpen(false)}
                  className="btn-cta w-full text-sm py-3">
                  Solicitar valoración gratuita →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
