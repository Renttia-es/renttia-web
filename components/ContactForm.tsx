'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface ContactFormProps {
  ciudad?: string
  dark?: boolean
}

export default function ContactForm({ ciudad = '', dark = false }: ContactFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: ciudad,
    tipo: 'piso-completo',
    habitaciones: '3',
    mensaje: '',
  })

  const inputClass = `form-input ${dark ? 'bg-navy-lighter border-white/20 text-white placeholder-white/40 focus:ring-white/50' : ''}`
  const labelClass = `form-label ${dark ? 'text-white' : ''}`

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      router.push('/gracias')
    } catch {
      alert('Ha ocurrido un error. Por favor llámanos directamente.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input
            type="text"
            required
            placeholder="Tu nombre"
            className={inputClass}
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Teléfono *</label>
          <input
            type="tel"
            required
            placeholder="600 000 000"
            className={inputClass}
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          required
          placeholder="tu@email.com"
          className={inputClass}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ciudad</label>
          <select
            className={inputClass}
            value={form.ciudad}
            onChange={e => setForm({ ...form, ciudad: e.target.value })}
          >
            <option value="">Selecciona...</option>
            <option value="zaragoza">Zaragoza</option>
            <option value="huesca">Huesca</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Nº habitaciones</label>
          <select
            className={inputClass}
            value={form.habitaciones}
            onChange={e => setForm({ ...form, habitaciones: e.target.value })}
          >
            <option value="3">3 habitaciones</option>
            <option value="4">4 habitaciones</option>
            <option value="5+">5 o más</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tipo de inmueble</label>
        <select
          className={inputClass}
          value={form.tipo}
          onChange={e => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="piso-completo">Piso completo</option>
          <option value="chalet">Chalet / Casa</option>
          <option value="duplex">Dúplex / Ático</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Mensaje (opcional)</label>
        <textarea
          rows={3}
          placeholder="Cuéntanos algo sobre tu piso..."
          className={`${inputClass} resize-none`}
          value={form.mensaje}
          onChange={e => setForm({ ...form, mensaje: e.target.value })}
        />
      </div>

      <p className={`text-xs ${dark ? 'text-white/40' : 'text-gray-400'}`}>
        Al enviar aceptas nuestra{' '}
        <a href="/privacidad" className={`underline ${dark ? 'text-white/60' : 'text-navy'}`}>
          política de privacidad
        </a>.
        Nunca spam, solo te contactamos para gestionar tu piso.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="btn-cta w-full py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          'Consulta si mi piso encaja →'
        )}
      </button>
    </form>
  )
}
