import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { google } from 'googleapis'
import { createHash, randomUUID } from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

/* ─── META CONVERSIONS API ────────────────────────────────────────────────── */

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

async function sendMetaEvent(
  eventName: string,
  userData: { email?: string; phone?: string; nombre?: string; ciudad?: string },
  req: NextRequest,
  eventId: string
): Promise<void> {
  const token   = process.env.META_CAPI_TOKEN
  const pixelId = process.env.META_PIXEL_ID

  if (!token || !pixelId) {
    console.warn('Meta CAPI: faltan variables de entorno')
    return
  }

  const ip        = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || ''
  const userAgent = req.headers.get('user-agent') || ''
  const pageUrl   = req.headers.get('referer') || 'https://renttia.es'

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: pageUrl,
      user_data: {
        client_ip_address: ip,
        client_user_agent: userAgent,
        ...(userData.email    && { em: sha256(userData.email)    }),
        ...(userData.phone    && { ph: sha256(userData.phone.replace(/\s/g, ''))    }),
        ...(userData.nombre   && { fn: sha256(userData.nombre)   }),
        ...(userData.ciudad   && { ct: sha256(userData.ciudad)   }),
      },
    }],
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('Meta CAPI error:', err)
  } else {
    console.log(`✅ Meta CAPI ${eventName} OK`)
  }
}

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */

function formatFechaMadrid(date: Date): string {
  return date.toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
  }).replace(',', '')
}

function horaLimite(date: Date): string {
  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  return tomorrow.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
}

/* ─── GOOGLE SHEETS ───────────────────────────────────────────────────────── */

async function appendToSheet(row: (string | number | null)[]): Promise<void> {
  const email   = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key     = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!email || !key || !sheetId) {
    console.warn('Google Sheets: faltan variables de entorno')
    return
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "'Hoja 1'!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

/* ─── TELEGRAM ────────────────────────────────────────────────────────────── */

async function sendTelegram(text: string): Promise<void> {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram: faltan variables de entorno')
    return
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram API error:', err)
  }
}

/* ─── HANDLER PRINCIPAL ───────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, telefono, email, ciudad, tipo, habitaciones, mensaje, fuente } = body

    if (!nombre || !telefono) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const ahora       = new Date()
    const fechaStr    = formatFechaMadrid(ahora)
    const ciudadLabel = ciudad ? ciudad.charAt(0).toUpperCase() + ciudad.slice(1) : 'No indicada'
    const habsLabel   = habitaciones || '—'
    const horaLim     = horaLimite(ahora)
    const fuenteLabel = fuente || 'web-general'

    /* 1 — Supabase ──────────────────────────────────────────────────────── */
    try {
      const { error: dbError } = await supabase.from('contactos').insert([
        { nombre, telefono, email, ciudad, tipo, habitaciones, mensaje },
      ])
      if (dbError) console.error('Supabase error:', dbError)
    } catch (e) {
      console.error('Supabase excepción:', e)
    }

    /* 2 — Google Sheets ─────────────────────────────────────────────────── */
    try {
      await appendToSheet([
        fechaStr,                      // A — Hora registro
        nombre,                        // B
        telefono,                      // C
        email,                         // D
        ciudadLabel,                   // E
        habsLabel,                     // F
        'Pendiente de llamada',        // G — Estado
        '=INDIRECT("A"&ROW())+1',     // H — Fecha límite (+24 h)
        null,                          // I — Intentos (manual)
        null,                          // J — Notas (manual)
        fuenteLabel,                   // K — Fuente (landing de origen)
      ])
      console.log('✅ Google Sheets OK')
    } catch (e) {
      console.error('Google Sheets error:', e)
    }

    /* 3 — Telegram ──────────────────────────────────────────────────────── */
    try {
      await sendTelegram(
        `🚨 <b>¡NUEVO LEAD EN RENTTIA!</b>\n\n` +
        `👤 <b>Nombre:</b> ${nombre}\n` +
        `📍 <b>Ciudad:</b> ${ciudadLabel} (${habsLabel} habs)\n` +
        `📞 <b>Teléfono:</b> ${telefono}\n` +
        `✉️ <b>Email:</b> ${email}\n` +
        `🌐 <b>Fuente:</b> ${fuenteLabel}\n` +
        `⏱️ Tienes hasta mañana a las <b>${horaLim}</b> para llamarle.`
      )
      console.log('✅ Telegram OK')
    } catch (e) {
      console.error('Telegram error:', e)
    }

    /* 4 — Email interno → tu bandeja ────────────────────────────────────── */
    try {
      await resend.emails.send({
        from: 'Renttia <hola@renttia.es>',
        to: process.env.RESEND_TO_EMAIL!,
        subject: `🏠 Nuevo lead — ${nombre} · ${ciudadLabel}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8eef8;">
            <div style="background:#123462;padding:28px 32px;">
              <p style="color:rgba(255,255,255,0.55);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin:0 0 6px;">Renttia · Nuevo lead</p>
              <h1 style="color:#fff;font-size:22px;font-weight:400;margin:0;">${nombre}</h1>
              <p style="color:rgba(255,255,255,0.45);font-size:13px;margin:4px 0 0;">${fechaStr}</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:12px;color:#8A9AB8;font-weight:600;text-transform:uppercase;width:40%;">Teléfono</td><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:14px;color:#123462;"><a href="tel:${telefono}" style="color:#123462;">${telefono}</a></td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:12px;color:#8A9AB8;font-weight:600;text-transform:uppercase;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:14px;color:#123462;"><a href="mailto:${email}" style="color:#123462;">${email}</a></td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:12px;color:#8A9AB8;font-weight:600;text-transform:uppercase;">Ciudad</td><td style="padding:10px 0;border-bottom:1px solid #e8eef8;font-size:14px;color:#123462;">${ciudadLabel}</td></tr>
                <tr><td style="padding:10px 0;font-size:12px;color:#8A9AB8;font-weight:600;text-transform:uppercase;">Habitaciones</td><td style="padding:10px 0;font-size:14px;color:#123462;">${habsLabel}</td></tr>
              </table>
            </div>
            <div style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #e8eef8;text-align:center;">
              <a href="tel:${telefono}" style="display:inline-block;background:#123462;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:500;margin-right:8px;">📞 Llamar ahora</a>
              <a href="mailto:${email}" style="display:inline-block;background:#fff;color:#123462;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:500;border:1px solid #e8eef8;">✉️ Responder por email</a>
            </div>
          </div>
        `,
      })
      console.log('✅ Email interno OK')
    } catch (e) {
      console.error('Resend interno error:', e)
    }

    /* 5 — Email confirmación → lead ─────────────────────────────────────── */
    try {
      const calendarLink = process.env.CALENDAR_LINK ?? 'https://calendar.google.com'

      await resend.emails.send({
        from: 'Renttia <hola@renttia.es>',
        to: email,
        subject: `Recibido, ${nombre}. ¿Hablamos mañana?`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8eef8;">
            <div style="background:#123462;padding:28px 32px;">
              <p style="color:rgba(255,255,255,0.55);font-size:12px;margin:0 0 8px;">RENTTIA · Tu inquilino perfecto</p>
              <h1 style="color:#fff;font-size:22px;font-weight:400;margin:0;">Hola, ${nombre} 👋</h1>
            </div>
            <div style="padding:32px;">
              <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
                He visto que has solicitado una valoración gratuita para tu piso en <strong>${ciudadLabel}</strong>. ¡Muchas gracias por confiar en <strong>RENTTIA</strong>!
              </p>
              <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px;">
                Como nuestro objetivo es que no pierdas tiempo, te dejamos por aquí el enlace directo a nuestro calendario para que elijas el día y la hora que mejor te vengan para que te llamemos:
              </p>
              <div style="text-align:center;margin:0 0 28px;">
                <a href="${calendarLink}" style="display:inline-block;background:#123462;color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:15px;font-weight:500;">
                  👉 Reservar mi llamada gratuita
                </a>
              </div>
              <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
                En esa breve llamada de <strong>10 minutos</strong> te explicaremos cuánto podemos ofrecerte por tu vivienda como renta garantizada.
              </p>
              <p style="font-size:15px;color:#374151;margin:0;">
                Un saludo,<br/>
                <strong>El equipo de RENTTIA</strong>
              </p>
            </div>
            <div style="padding:16px 32px;background:#FAFAF7;border-top:1px solid #e8eef8;text-align:center;">
              <p style="font-size:11px;color:#8A9AB8;margin:0;">Renttia · Tu inquilino perfecto en ${ciudadLabel}</p>
            </div>
          </div>
        `,
      })
      console.log('✅ Email lead OK')
    } catch (e) {
      console.error('Resend lead error:', e)
    }

    /* 6 — Meta Conversions API ──────────────────────────────────────────── */
    try {
      const eventId = randomUUID()
      const metaUserData = { email, phone: telefono, nombre, ciudad }
      await Promise.all([
        sendMetaEvent('Lead',    metaUserData, req, eventId),
        sendMetaEvent('Contact', metaUserData, req, eventId),
      ])
    } catch (e) {
      console.error('Meta CAPI error:', e)
    }

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (err) {
    console.error('Error inesperado:', err)
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 })
  }
}
