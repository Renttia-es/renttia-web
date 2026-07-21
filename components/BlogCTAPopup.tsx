'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogCTAPopup() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', ciudad: '' })
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipo: 'blog-cta', habitaciones: '', mensaje: '' }),
      })
      if (!res.ok) throw new Error()
      setOpen(false)
      router.push('/gracias')
    } catch {
      alert('Ha ocurrido un error. Por favor llámanos directamente.')
      setLoading(false)
    }
  }

  return (
    <>
      {/* CTA inline al final del artículo */}
      <div className="my-12 bg-navy rounded-2xl sm:rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_-10%_-10%,rgba(29,78,216,0.4),transparent)]" />
        <div className="relative">
          <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-white/40 mb-3 block">
            Tu inquilino perfecto
          </span>
          <h2 className="font-serif text-white text-2xl sm:text-3xl font-light mb-3 leading-snug">
            ¿Tienes un piso en Zaragoza o Huesca?
          </h2>
          <p className="font-sans text-white/60 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            Cuéntanos tu caso y te decimos en menos de 24 horas si tu piso encaja con nuestro modelo. Sin compromiso y sin coste.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="btn-cta text-sm py-3.5 px-8"
          >
            Quiero que me llamen →
          </button>
        </div>
      </div>

      {/* Overlay + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            {/* Cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-serif text-navy text-xl sm:text-2xl font-light mb-1">
              Te llamamos nosotros
            </h3>
            <p className="font-sans text-gray-400 text-sm mb-6">
              Déjanos tus datos y un asesor de Renttia se pondrá en contacto contigo en menos de 24 horas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className="form-input"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="600 000 000"
                    className="form-input"
                    value={form.telefono}
                    onChange={e => setForm({ ...form, telefono: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="form-input"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Ciudad del piso</label>
                <select
                  className="form-input"
                  value={form.ciudad}
                  onChange={e => setForm({ ...form, ciudad: e.target.value })}
                >
                  <option value="">Selecciona...</option>
                  <option value="zaragoza">Zaragoza</option>
                  <option value="huesca">Huesca</option>
                </select>
              </div>

              <p className="text-xs text-gray-400">
                Al enviar aceptas nuestra{' '}
                <a href="/privacidad" className="underline text-navy">política de privacidad</a>.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full py-4 text-base disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : 'Solicitar llamada gratuita →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
