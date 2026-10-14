/**
 * PageView se dispara al entrar (app/layout.tsx).
 * CompleteRegistration solo aquí, y solo después de que el servidor
 * acepte el formulario. Ver la página no es un lead.
 * El mismo eventId viaja al servidor para que Meta no lo cuente dos veces.
 */

type FbqUserData = {
  em?: string
  ph?: string
  fn?: string
  ct?: string
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function prepareEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const CONVERSION_KEY = 'renttia-conversion-id'

export function guardarConversion(
  eventId: string,
  userData: { telefono?: string; nombre?: string; ciudad?: string } = {}
): void {
  try {
    sessionStorage.setItem(CONVERSION_KEY, JSON.stringify({ eventId, ...userData }))
  } catch { /* sin almacenamiento no hay píxel en /gracias */ }
}

export function leerConversion(): { eventId: string; telefono?: string; nombre?: string; ciudad?: string } | null {
  try {
    const raw = sessionStorage.getItem(CONVERSION_KEY)
    sessionStorage.removeItem(CONVERSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { eventId?: string; telefono?: string; nombre?: string; ciudad?: string }
    if (!data.eventId) return null
    return { eventId: data.eventId, telefono: data.telefono, nombre: data.nombre, ciudad: data.ciudad }
  } catch {
    return null
  }
}

export function firePixelConversion(
  eventId: string,
  userData: { email?: string; telefono?: string; nombre?: string; ciudad?: string } = {}
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return

  const user: FbqUserData = {
    ...(userData.email && { em: userData.email }),
    ...(userData.telefono && { ph: userData.telefono }),
    ...(userData.nombre && { fn: userData.nombre }),
    ...(userData.ciudad && { ct: userData.ciudad }),
  }
  window.fbq('track', 'CompleteRegistration', user, { eventID: eventId })
}
