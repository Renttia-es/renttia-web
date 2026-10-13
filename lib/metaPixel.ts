/**
 * El píxel del navegador solo registra PageView (ver app/layout.tsx).
 * CompleteRegistration no se dispara aquí: ver una landing no es un lead.
 * La conversión la envía el servidor, y solo cuando Telegram confirma el aviso.
 */

/** Genera un identificador de evento único para la Conversions API. */
export function prepareEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}
