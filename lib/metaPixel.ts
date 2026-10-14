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
