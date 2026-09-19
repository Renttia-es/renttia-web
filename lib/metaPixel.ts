/**
 * Helpers de Meta Pixel (lado navegador) para deduplicación con la Conversions API.
 *
 * Flujo correcto para conversiones REALES:
 * 1. Generar eventId ANTES del fetch → prepareEventId()
 * 2. Enviar eventId al servidor en el body del POST
 * 3. Solo si el servidor responde OK → firePixelConversion() con el mismo eventId
 *
 * Así el pixel NUNCA dispara si el formulario no llega de verdad al servidor.
 * La CAPI (server-side) también dispara con el mismo eventId → Meta deduplica.
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
export function prepareEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Dispara `CompleteRegistration` en el Pixel del navegador.
 * Llamar SOLO después de confirmar que el servidor aceptó el lead (res.ok).
 * Usar el mismo eventId generado con prepareEventId() → Meta deduplica con CAPI.
 */
export function firePixelConversion(
  eventId: string,
  userData: { email?: string; telefono?: string; nombre?: string; ciudad?: string } = {}
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return

  const user: FbqUserData = {
    ...(userData.email    && { em: userData.email    }),
    ...(userData.telefono && { ph: userData.telefono }),
    ...(userData.nombre   && { fn: userData.nombre   }),
    ...(userData.ciudad   && { ct: userData.ciudad   }),
  }
  window.fbq('track', 'CompleteRegistration', user, { eventID: eventId })
}

/** @deprecated Usar prepareEventId() + firePixelConversion() por separado */
export function trackLeadConversion(userData: {
  email?: string; telefono?: string; nombre?: string; ciudad?: string
} = {}): string {
  const eventId = prepareEventId()
  firePixelConversion(eventId, userData)
  return eventId
}
