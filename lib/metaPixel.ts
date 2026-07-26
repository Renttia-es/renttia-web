/**
 * Helpers de Meta Pixel (lado navegador) para deduplicación con la Conversions API.
 *
 * El navegador y el servidor deben enviar el MISMO `eventID` para cada par
 * (nombre de evento + eventID). Así Meta entiende que Pixel y CAPI reportan la
 * misma conversión y no la cuenta dos veces.
 */

type FbqUserData = {
  em?: string // email
  ph?: string // teléfono
  fn?: string // nombre
  ct?: string // ciudad
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Genera un identificador de evento único, compartido entre Pixel y CAPI. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Dispara los eventos de conversión en el Pixel del navegador con un `eventID`.
 * Envía `Lead` y `Contact` para reflejar exactamente lo que manda la CAPI.
 * Devuelve el `eventId` para incluirlo en el POST a `/api/contacto`.
 */
export function trackLeadConversion(userData: {
  email?: string
  telefono?: string
  nombre?: string
  ciudad?: string
} = {}): string {
  const eventId = newEventId()

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    const user: FbqUserData = {
      ...(userData.email && { em: userData.email }),
      ...(userData.telefono && { ph: userData.telefono }),
      ...(userData.nombre && { fn: userData.nombre }),
      ...(userData.ciudad && { ct: userData.ciudad }),
    }
    window.fbq('track', 'Lead', user, { eventID: eventId })
    window.fbq('track', 'Contact', user, { eventID: eventId })
  }

  return eventId
}
