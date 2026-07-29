/**
 * buscar-pisos-idealista.mjs
 *
 * Scraper de Idealista con capa de filtrado IA para Renttia.
 * Uso: node scripts/buscar-pisos-idealista.mjs
 *
 * Variables de entorno necesarias en .env.local:
 *   APIFY_TOKEN              → token de tu cuenta Apify
 *   OPENAI_API_KEY           → clave de OpenAI
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_SHEET_ID          → ID de la hoja de cálculo (ya configurado)
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { google } from 'googleapis'
import ExcelJS from 'exceljs'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env.local') })

// ─────────────────────────────────────────────────────────────────────────────
// ██████  CONFIGURACIÓN R2R — EDITA AQUÍ TUS CRITERIOS ██████████████████████
// ─────────────────────────────────────────────────────────────────────────────
const R2R = {
  // Precio que pide el propietario (rango aceptable)
  precioMin: 500,
  precioMax: 1000,

  // Habitaciones mínimas (ya contando salón convertible)
  habitacionesMin: 3,

  // Precio de mercado por habitación en Zaragoza / Huesca
  precioHabConservador: 375,   // €/mes (escenario pesimista)
  precioHabOptimista:   450,   // €/mes (escenario optimista)

  // Gastos suministros por habitación (luz, agua, wifi)
  gastosHab: 40,               // €/mes por hab

  // Margen mínimo neto que necesitamos por habitación
  margenMinPorHab: 100,        // €/mes

  // IVA que aplicamos sobre nuestra facturación (uso distinto a vivienda)
  tasaIVA: 0.21,

  // Cuántos resultados pedir a Idealista por ciudad
  resultadosPorCiudad: 150,
}

// URLs de búsqueda en Idealista (cópialas directamente del navegador con tus filtros)
const URLS_IDEALISTA = [
  'https://www.idealista.com/alquiler-viviendas/zaragoza-zaragoza/con-precio-hasta_1000,tres-o-mas-habitaciones/',
  'https://www.idealista.com/alquiler-viviendas/huesca-huesca/con-precio-hasta_1000,tres-o-mas-habitaciones/',
]

// Nombre de la pestaña en Google Sheets donde se guardarán los resultados
const NOMBRE_HOJA = 'Pisos Idealista'
// ─────────────────────────────────────────────────────────────────────────────

// ─── Clientes ──────────────────────────────────────────────────────────────
const APIFY_TOKEN   = process.env.APIFY_TOKEN
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!APIFY_TOKEN)    { console.error('❌ Falta APIFY_TOKEN en .env.local'); process.exit(1) }
if (!GEMINI_API_KEY) { console.error('❌ Falta GEMINI_API_KEY en .env.local'); process.exit(1) }

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
const modelo = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// ─── Cabeceras de la hoja ──────────────────────────────────────────────────
const CABECERAS = [
  'ID Idealista', 'Título', 'Dirección', 'Ciudad', 'Precio (€/mes)',
  'Habitaciones', 'Hab + Salón Conv.', 'm² const.', 'Planta', 'Exterior',
  'Ascensor', 'Estado', 'Tipo anunciante', 'Nombre contacto', 'Teléfono',
  'Facturación conservadora', 'Facturación optimista',
  'Margen neto conservador', 'Margen neto optimista',
  'Margen/hab conservador', 'Margen/hab optimista',
  '¿Viable?', 'AI Puntuación (1-10)', 'AI Recomendación',
  'AI Pros', 'AI Contras', 'AI Estado estimado', 'AI Salón convertible',
  'Banderas rojas', 'Link', 'Fecha extracción',
]

// ─── Utilidades ────────────────────────────────────────────────────────────

function calcularMargen(alquiler, nHab, precioHab) {
  const facturacion  = nHab * precioHab
  const iva          = facturacion * R2R.tasaIVA
  const suministros  = nHab * R2R.gastosHab
  const margenNeto   = facturacion - iva - alquiler - suministros
  const margenPorHab = nHab > 0 ? margenNeto / nHab : 0
  return { facturacion, iva, margenNeto, margenPorHab }
}

function esViable(alquiler, nHab) {
  // Pasa el filtro si con el precio medio hay ≥ 100€ netos por hab
  const precioMedio  = (R2R.precioHabConservador + R2R.precioHabOptimista) / 2
  const { margenPorHab } = calcularMargen(alquiler, nHab, precioMedio)
  return margenPorHab >= R2R.margenMinPorHab
}

function formatEur(n) { return isNaN(n) ? '—' : `${Math.round(n)} €` }
function hoy() { return new Date().toLocaleDateString('es-ES') }

// ─── 1. SCRAPER APIFY ─────────────────────────────────────────────────────

async function scrapeIdealista() {
  console.log('\n🕷️  Iniciando scraper de Idealista via Apify...')

  const inputPayload = {
    Property_urls: URLS_IDEALISTA.map(url => ({ url })),
    desiredResults: R2R.resultadosPorCiudad,
    detailMode: false,
  }

  const resp = await fetch(
    `https://api.apify.com/v2/acts/dz_omar~idealista-scraper-api/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=300`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(inputPayload),
      signal:  AbortSignal.timeout(320_000),
    }
  )

  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`Apify error ${resp.status}: ${err}`)
  }

  const propiedades = await resp.json()
  console.log(`✅ Apify devolvió ${propiedades.length} propiedades brutas.`)
  return propiedades.filter(p => p.status === 'success')
}

// ─── 2. FILTRO MATEMÁTICO ──────────────────────────────────────────────────

function filtrarMatemáticamente(propiedades) {
  console.log('\n🔢 Aplicando filtro matemático R2R...')
  const viables = []

  for (const p of propiedades) {
    const precio = p.price ?? p.priceInfo?.amount ?? 0
    const nHab   = p.moreCharacteristics?.roomNumber ?? 0

    if (precio < R2R.precioMin || precio > R2R.precioMax) continue
    if (nHab < R2R.habitacionesMin) continue
    if (!esViable(precio, nHab)) continue

    viables.push(p)
  }

  console.log(`✅ ${viables.length} de ${propiedades.length} pasan el filtro matemático.`)
  return viables
}

// ─── 3. EVALUACIÓN IA ─────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Eres un evaluador experto en el modelo Rent-to-Rent (R2R) para la empresa Renttia en España.
Renttia alquila pisos enteros a propietarios y subarrienda las habitaciones individualmente a jóvenes profesionales y estudiantes.
Tu misión es evaluar si un piso de Idealista es una buena oportunidad R2R basándote en la descripción y datos disponibles.

CRITERIOS CLAVE R2R:
- Mínimo 3 habitaciones reales (o posibilidad de convertir salón con pladur)
- Precio de alquiler que deje ≥100€ netos por habitación tras IVA (21%) y suministros (40€/hab)
- Estado que no requiera reforma completa (o si la requiere, que esté reflejado en el precio)
- Mejor propietario particular que agencia (más margen de negociación)
- Bien ubicado en zona demandada por estudiantes/profesionales

Responde SIEMPRE en JSON con esta estructura exacta:
{
  "score": <número 1-10>,
  "recomendacion": "<PRIORITARIO | INTERESANTE | BORDERLINE | DESCARTAR>",
  "pros": "<pros separados por ; máx 3>",
  "contras": "<contras separados por ; máx 3>",
  "estado_estimado": "<Buen estado | Lavado de cara | Reforma parcial | Reforma completa | Desconocido>",
  "salon_convertible": "<Sí | No | Probable | Desconocido>",
  "banderas_rojas": "<lista de red flags o vacío si no hay ninguna>"
}`

async function evaluarConIA(propiedad) {
  const precio  = propiedad.price ?? propiedad.priceInfo?.amount ?? 0
  const nHab    = propiedad.moreCharacteristics?.roomNumber ?? '?'
  const metros  = propiedad.moreCharacteristics?.constructedArea ?? '?'
  const titulo  = propiedad.title ?? propiedad.suggestedTexts?.title ?? 'Sin título'
  const desc    = propiedad.description ?? propiedad.suggestedTexts?.subtitle ?? 'Sin descripción'
  const dir     = propiedad.ubication?.title ?? 'Dirección no disponible'
  const estado  = propiedad.moreCharacteristics?.status ?? 'Desconocido'
  const exterior= propiedad.moreCharacteristics?.exterior ? 'Sí' : 'No'
  const lift    = propiedad.moreCharacteristics?.lift ? 'Sí' : 'No'
  const planta  = propiedad.moreCharacteristics?.floor ?? '?'
  const tipo    = propiedad.contactInfo?.userType ?? 'Desconocido'
  const banos   = propiedad.moreCharacteristics?.bathNumber ?? '?'

  const margenCons = calcularMargen(precio, typeof nHab === 'number' ? nHab : 0, R2R.precioHabConservador)
  const margenOpt  = calcularMargen(precio, typeof nHab === 'number' ? nHab : 0, R2R.precioHabOptimista)

  const userContent = `
DATOS DEL PISO:
- Título: ${titulo}
- Dirección: ${dir}
- Precio: ${precio}€/mes
- Habitaciones: ${nHab} | Baños: ${banos} | m²: ${metros}
- Planta: ${planta} | Exterior: ${exterior} | Ascensor: ${lift}
- Estado declarado: ${estado}
- Tipo anunciante: ${tipo}

DESCRIPCIÓN:
${desc.slice(0, 800)}

CÁLCULO FINANCIERO PRE-CALCULADO:
- Margen neto conservador (${R2R.precioHabConservador}€/hab): ${Math.round(margenCons.margenNeto)}€/mes | ${Math.round(margenCons.margenPorHab)}€/hab
- Margen neto optimista (${R2R.precioHabOptimista}€/hab): ${Math.round(margenOpt.margenNeto)}€/mes | ${Math.round(margenOpt.margenPorHab)}€/hab
`

  try {
    const result = await modelo.generateContent(SYSTEM_PROMPT + '\n\n' + userContent)
    const raw    = result.response.text() ?? '{}'
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    return jsonMatch ? JSON.parse(jsonMatch[0]) : {}
  } catch (e) {
    console.warn(`  ⚠️  Error IA para ${propiedad.adid}: ${e.message}`)
    return {}
  }
}

// ─── 4. PROCESAR LISTA ────────────────────────────────────────────────────

async function procesarPropiedades(propiedades) {
  console.log(`\n🤖 Evaluando ${propiedades.length} propiedades con IA (gpt-4o-mini)...`)
  const resultados = []

  for (let i = 0; i < propiedades.length; i++) {
    const p = propiedades[i]
    process.stdout.write(`  [${i + 1}/${propiedades.length}] ID ${p.adid} ... `)

    const precio = p.price ?? p.priceInfo?.amount ?? 0
    const nHab   = p.moreCharacteristics?.roomNumber ?? 0
    const ciudad = p.ubication?.administrativeAreaLevel2 ??
                   p.ubication?.administrativeAreaLevel1 ?? 'Desconocida'

    const margenCons = calcularMargen(precio, nHab, R2R.precioHabConservador)
    const margenOpt  = calcularMargen(precio, nHab, R2R.precioHabOptimista)
    const viable     = esViable(precio, nHab) ? '✅ Sí' : '⚠️ Borderline'

    const ia = await evaluarConIA(p)
    process.stdout.write(`score ${ia.score ?? '?'} | ${ia.recomendacion ?? '?'}\n`)

    resultados.push({
      id:          p.adid,
      titulo:      p.title ?? p.suggestedTexts?.title ?? '',
      direccion:   p.ubication?.title ?? '',
      ciudad,
      precio,
      habitaciones: nHab,
      habConSalon:  nHab + (ia.salon_convertible === 'Sí' || ia.salon_convertible === 'Probable' ? 1 : 0),
      metros:       p.moreCharacteristics?.constructedArea ?? '',
      planta:       p.moreCharacteristics?.floor ?? '',
      exterior:     p.moreCharacteristics?.exterior ? 'Sí' : 'No',
      ascensor:     p.moreCharacteristics?.lift ? 'Sí' : 'No',
      estado:       p.moreCharacteristics?.status ?? '',
      tipoAnunciante: p.contactInfo?.userType ?? '',
      nombreContacto: p.contactInfo?.contactName ?? '',
      telefono:     p.contactInfo?.phone1?.formattedPhoneWithPrefix ?? '',
      facturacionCons: formatEur(margenCons.facturacion),
      facturacionOpt:  formatEur(margenOpt.facturacion),
      margenCons:      formatEur(margenCons.margenNeto),
      margenOpt:       formatEur(margenOpt.margenNeto),
      margenHabCons:   formatEur(margenCons.margenPorHab),
      margenHabOpt:    formatEur(margenOpt.margenPorHab),
      viable,
      iaScore:         ia.score ?? '',
      iaRecomendacion: ia.recomendacion ?? '',
      iaPros:          ia.pros ?? '',
      iaContras:       ia.contras ?? '',
      iaEstado:        ia.estado_estimado ?? '',
      iaSalon:         ia.salon_convertible ?? '',
      iaRedFlags:      ia.banderas_rojas ?? '',
      link:            p.detailWebLink ?? '',
      fecha:           hoy(),
    })

    // Pequeña pausa para no saturar la API de OpenAI
    if (i < propiedades.length - 1) await new Promise(r => setTimeout(r, 300))
  }

  // Ordenar: PRIORITARIO primero, luego INTERESANTE, etc.
  const orden = { PRIORITARIO: 0, INTERESANTE: 1, BORDERLINE: 2, DESCARTAR: 3 }
  resultados.sort((a, b) => (orden[a.iaRecomendacion] ?? 4) - (orden[b.iaRecomendacion] ?? 4))

  return resultados
}

// ─── 5. EXPORTAR A GOOGLE SHEETS ─────────────────────────────────────────

async function exportarGoogleSheets(filas) {
  console.log('\n📊 Exportando a Google Sheets...')

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets  = google.sheets({ version: 'v4', auth })
  const sheetId = process.env.GOOGLE_SHEET_ID

  // Verificar si la pestaña ya existe
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  const hojas = meta.data.sheets.map(s => s.properties.title)

  if (!hojas.includes(NOMBRE_HOJA)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: NOMBRE_HOJA, gridProperties: { frozenRowCount: 1 } }
          }
        }]
      }
    })
    console.log(`  Pestaña "${NOMBRE_HOJA}" creada.`)
  }

  // Limpiar hoja y escribir desde cero
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: `'${NOMBRE_HOJA}'!A:AE`,
  })

  const datos = [
    CABECERAS,
    ...filas.map(f => [
      f.id, f.titulo, f.direccion, f.ciudad, f.precio,
      f.habitaciones, f.habConSalon, f.metros, f.planta,
      f.exterior, f.ascensor, f.estado, f.tipoAnunciante,
      f.nombreContacto, f.telefono,
      f.facturacionCons, f.facturacionOpt,
      f.margenCons, f.margenOpt,
      f.margenHabCons, f.margenHabOpt,
      f.viable, f.iaScore, f.iaRecomendacion,
      f.iaPros, f.iaContras, f.iaEstado, f.iaSalon,
      f.iaRedFlags, f.link, f.fecha,
    ])
  ]

  await sheets.spreadsheets.values.update({
    spreadsheetId:     sheetId,
    range:             `'${NOMBRE_HOJA}'!A1`,
    valueInputOption:  'RAW',
    requestBody:       { values: datos },
  })

  // Formato visual: cabecera en negrita + fondo
  const sheetMeta = (await sheets.spreadsheets.get({ spreadsheetId: sheetId }))
    .data.sheets.find(s => s.properties.title === NOMBRE_HOJA)
  const tabId = sheetMeta?.properties?.sheetId ?? 0

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        // Cabecera en negrita + fondo azul marino
        {
          repeatCell: {
            range: { sheetId: tabId, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.07, green: 0.13, blue: 0.25 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          }
        },
        // Anclar primera fila
        {
          updateSheetProperties: {
            properties: { sheetId: tabId, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          }
        },
        // Autoajuste columnas
        {
          autoResizeDimensions: {
            dimensions: { sheetId: tabId, dimension: 'COLUMNS', startIndex: 0, endIndex: CABECERAS.length }
          }
        }
      ]
    }
  })

  console.log(`✅ ${filas.length} filas escritas en Google Sheets → pestaña "${NOMBRE_HOJA}"`)
}

// ─── 6. EXPORTAR A EXCEL ─────────────────────────────────────────────────

async function exportarExcel(filas) {
  console.log('\n📁 Generando archivo Excel...')

  const wb   = new ExcelJS.Workbook()
  const ws   = wb.addWorksheet('Pisos Idealista', { views: [{ state: 'frozen', ySplit: 1 }] })

  // Colores
  const NAVY   = '0D2240'
  const BLANCO = 'FFFFFF'
  const VERDE  = 'E6F4EA'
  const ROJO   = 'FDECEA'
  const NARANJA= 'FFF3E0'

  ws.columns = CABECERAS.map((h, i) => ({
    header: h,
    key: `col${i}`,
    width: [6, 30, 25, 12, 12, 10, 12, 8, 7, 8, 8, 14, 14, 18, 16,
            16, 16, 16, 16, 16, 16, 10, 12, 14, 30, 30, 16, 16, 30, 40, 12][i] ?? 14,
  }))

  // Estilo cabecera
  ws.getRow(1).eachCell(cell => {
    cell.fill   = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } }
    cell.font   = { bold: true, color: { argb: BLANCO }, size: 10 }
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
  })
  ws.getRow(1).height = 40

  // Filas de datos
  filas.forEach((f, idx) => {
    const row = ws.addRow([
      f.id, f.titulo, f.direccion, f.ciudad, f.precio,
      f.habitaciones, f.habConSalon, f.metros, f.planta,
      f.exterior, f.ascensor, f.estado, f.tipoAnunciante,
      f.nombreContacto, f.telefono,
      f.facturacionCons, f.facturacionOpt,
      f.margenCons, f.margenOpt,
      f.margenHabCons, f.margenHabOpt,
      f.viable, f.iaScore, f.iaRecomendacion,
      f.iaPros, f.iaContras, f.iaEstado, f.iaSalon,
      f.iaRedFlags, f.link, f.fecha,
    ])

    // Color de fila según recomendación IA
    const color = {
      PRIORITARIO: VERDE,
      INTERESANTE: 'EDF2FF',
      BORDERLINE:  NARANJA,
      DESCARTAR:   ROJO,
    }[f.iaRecomendacion] ?? BLANCO

    row.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } }
      cell.alignment = { vertical: 'top', wrapText: false }
      cell.font = { size: 9 }
    })

    // Link clicable
    const linkCell = row.getCell(30)
    if (f.link) {
      linkCell.value = { text: 'Ver anuncio', hyperlink: f.link }
      linkCell.font  = { color: { argb: '1155CC' }, underline: true, size: 9 }
    }

    row.height = 18
  })

  // Autofiltro
  ws.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + CABECERAS.length)}1` }

  const fechaStr  = new Date().toISOString().slice(0, 10)
  const filename  = join(__dirname, `../pisos-idealista-${fechaStr}.xlsx`)
  await wb.xlsx.writeFile(filename)
  console.log(`✅ Excel guardado: pisos-idealista-${fechaStr}.xlsx`)
  return filename
}

// ─── MAIN ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════')
  console.log('  🏠  RENTTIA — Buscador de pisos R2R en Idealista')
  console.log('═══════════════════════════════════════════════════════')
  console.log(`  Ciudades:    Zaragoza + Huesca`)
  console.log(`  Precio:      ${R2R.precioMin}€ - ${R2R.precioMax}€/mes`)
  console.log(`  Habitaciones mínimas: ${R2R.habitacionesMin}`)
  console.log(`  Margen mínimo/hab:    ${R2R.margenMinPorHab}€`)
  console.log(`  Precio hab mercado:   ${R2R.precioHabConservador}€ - ${R2R.precioHabOptimista}€`)
  console.log('═══════════════════════════════════════════════════════\n')

  try {
    // 1. Scrape
    const brutos   = await scrapeIdealista()

    // 2. Filtro matemático
    const viables  = filtrarMatemáticamente(brutos)

    if (viables.length === 0) {
      console.log('\n⚠️  No se encontraron propiedades que pasen el filtro matemático.')
      console.log('   Prueba a ampliar el rango de precio o reducir habitacionesMin.')
      process.exit(0)
    }

    // 3. Evaluación IA
    const resultados = await procesarPropiedades(viables)

    // 4. Exportar
    await exportarGoogleSheets(resultados)
    await exportarExcel(resultados)

    // 5. Resumen
    const prioritarios = resultados.filter(r => r.iaRecomendacion === 'PRIORITARIO').length
    const interesantes = resultados.filter(r => r.iaRecomendacion === 'INTERESANTE').length
    console.log('\n══════════════════════ RESUMEN ══════════════════════')
    console.log(`  📋 Propiedades brutas:    ${brutos.length}`)
    console.log(`  🔢 Pasan filtro matemático: ${viables.length}`)
    console.log(`  🤖 Evaluadas con IA:      ${resultados.length}`)
    console.log(`  ⭐ PRIORITARIO:           ${prioritarios}`)
    console.log(`  👍 INTERESANTE:           ${interesantes}`)
    console.log('═══════════════════════════════════════════════════════')

  } catch (err) {
    console.error('\n❌ Error:', err.message)
    if (err.cause) console.error('   Causa:', err.cause)
    process.exit(1)
  }
}

main()
