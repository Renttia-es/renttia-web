'use client'

import { useState, useEffect } from 'react'

export default function StickyCtaBar({ ciudad }: { ciudad: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/96 backdrop-blur-md border-t border-navy/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-serif text-navy text-base font-light leading-tight">
              ¿Tienes un piso en {ciudad}? Solicita valoración gratuita.
            </p>
            <p className="font-sans text-gray-400 text-xs mt-0.5">
              Te llamamos en menos de 24 horas. Sin compromiso.
            </p>
          </div>
          <a
            href="#contacto"
            onClick={e => {
              e.preventDefault()
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className="btn-cta flex-1 sm:flex-none text-sm py-3 px-7 whitespace-nowrap text-center"
          >
            Solicitar valoración →
          </a>
        </div>
      </div>
    </div>
  )
}
