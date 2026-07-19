import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

/* ─── AUTENTICACIÓN GOOGLE SHEETS ─────────────────────────────────────────── */
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

async function getLeads(): Promise<string[][]> {
  const sheets  = await getSheetsClient()
  const sheetId = process.env.GOOGLE_SHEET_ID!

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "'Hoja 1'!A2:J500",
  })

  return (res.data.values ?? []) as string[][]
}

/* ─── RESPONDER A TELEGRAM ────────────────────────────────────────────────── */
async function reply(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

/* ─── HELPERS DE FECHA ────────────────────────────────────────────────────── */
function hoyStr(): string {
  return new Date().toLocaleDateString('es-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

/* ─── COMANDOS ────────────────────────────────────────────────────────────── */

// Col: A=0 Hora | B=1 Nombre | C=2 Tel | D=3 Email | E=4 Ciudad | F=5 Habs | G=6 Estado | H=7 FechaLimite | I=8 Intentos | J=9 Notas

async function cmdPendientes(chatId: number) {
  const leads = await getLeads()
  const pendientes = leads.filter(r => (r[6] ?? '').toLowerCase().includes('pendiente'))

  if (!pendientes.length) {
    return reply(chatId, '✅ No hay leads pendientes ahora mismo. ¡Buen trabajo!')
  }

  const lista = pendientes.map((r, i) =>
    `${i + 1}. <b>${r[1] ?? '—'}</b> · ${r[4] ?? '—'} · 📞 ${r[2] ?? '—'}\n   ⏱️ Límite: ${r[7] ?? '—'}`
  ).join('\n\n')

  return reply(chatId,
    `📋 <b>${pendientes.length} lead${pendientes.length > 1 ? 's' : ''} pendiente${pendientes.length > 1 ? 's' : ''} de llamar:</b>\n\n${lista}`
  )
}

async function cmdHoy(chatId: number) {
  const leads  = await getLeads()
  const hoy    = hoyStr()
  const deHoy  = leads.filter(r => (r[0] ?? '').startsWith(hoy))

  if (!deHoy.length) {
    return reply(chatId, `📭 No hay leads nuevos hoy (${hoy}).`)
  }

  const lista = deHoy.map((r, i) =>
    `${i + 1}. <b>${r[1] ?? '—'}</b> · ${r[4] ?? '—'} · 📞 ${r[2] ?? '—'}\n   Estado: ${r[6] ?? '—'}`
  ).join('\n\n')

  return reply(chatId,
    `📅 <b>Leads de hoy (${hoy}):</b>\n\n${lista}`
  )
}

async function cmdEstadisticas(chatId: number) {
  const leads      = await getLeads()
  const total      = leads.length
  const pendientes = leads.filter(r => (r[6] ?? '').toLowerCase().includes('pendiente')).length
  const hoy        = hoyStr()
  const deHoy      = leads.filter(r => (r[0] ?? '').startsWith(hoy)).length

  const ciudades: Record<string, number> = {}
  leads.forEach(r => {
    const c = r[4] ?? 'Desconocida'
    ciudades[c] = (ciudades[c] ?? 0) + 1
  })
  const ciudadStr = Object.entries(ciudades)
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `  • ${c}: ${n}`)
    .join('\n')

  return reply(chatId,
    `📊 <b>Estadísticas de Renttia</b>\n\n` +
    `📥 Total leads: <b>${total}</b>\n` +
    `⏳ Pendientes de llamar: <b>${pendientes}</b>\n` +
    `📅 Leads de hoy: <b>${deHoy}</b>\n\n` +
    `🏙️ Por ciudad:\n${ciudadStr || '  (sin datos)'}`
  )
}

async function cmdUltimos(chatId: number) {
  const leads   = await getLeads()
  const ultimos = leads.slice(-5).reverse()

  if (!ultimos.length) {
    return reply(chatId, '📭 Todavía no hay leads registrados.')
  }

  const lista = ultimos.map((r, i) =>
    `${i + 1}. <b>${r[1] ?? '—'}</b> · ${r[4] ?? '—'}\n   📞 ${r[2] ?? '—'} · ${r[0] ?? '—'}\n   Estado: ${r[6] ?? '—'}`
  ).join('\n\n')

  return reply(chatId, `🕐 <b>Últimos 5 leads:</b>\n\n${lista}`)
}

function cmdAyuda(chatId: number) {
  return reply(chatId,
    `🤖 <b>Comandos disponibles:</b>\n\n` +
    `/hoy — Leads recibidos hoy\n` +
    `/pendientes — Leads que aún no has llamado\n` +
    `/ultimos — Últimos 5 leads recibidos\n` +
    `/estadisticas — Resumen general\n` +
    `/ayuda — Este mensaje`
  )
}

/* ─── HANDLER PRINCIPAL ───────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body    = await req.json()
    const message = body?.message
    if (!message) return NextResponse.json({ ok: true })

    const chatId   = message.chat?.id as number
    const fromId   = message.from?.id as number
    const text     = (message.text ?? '').trim().toLowerCase()

    // Seguridad: solo responde a tu cuenta
    const autorizado = String(fromId) === process.env.TELEGRAM_CHAT_ID
    if (!autorizado) {
      await reply(chatId, '⛔ No tienes permiso para usar este bot.')
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/hoy')         || text === 'leads hoy')     await cmdHoy(chatId)
    else if (text.startsWith('/pendientes') || text === 'pendientes') await cmdPendientes(chatId)
    else if (text.startsWith('/ultimos')    || text === 'ultimos')    await cmdUltimos(chatId)
    else if (text.startsWith('/estadisticas') || text === 'estadisticas') await cmdEstadisticas(chatId)
    else if (text.startsWith('/start') || text.startsWith('/ayuda')) cmdAyuda(chatId)
    else {
      await reply(chatId,
        `No entiendo ese comando. Escribe /ayuda para ver qué puedo hacer.`
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Telegram webhook error:', err)
    return NextResponse.json({ ok: true }) // siempre 200 para Telegram
  }
}
