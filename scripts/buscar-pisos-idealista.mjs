/**
 * buscar-pisos-idealista.mjs
 *
 * Scraper de Idealista con filtro matemático R2R para Renttia.
 * Uso: node scripts/buscar-pisos-idealista.mjs
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { google } from 'googleapis'
import ExcelJS from 'exceljs'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env.local') })

// ─────────────────────────────────────────────────────────────────────────────
// ██  CONFIGURACIÓN R2R — EDITA AQUÍ ████████████████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────
const R2R = {
  // Precio al propietario
  precioMin: 500,
  precioMax: 1000,

  // Habitaciones mínimas (sin contar salón — Idealista filtra habitaciones reales)
  habitacionesMin: 3,

  // Precio de mercado por habitación en Zaragoza / Huesca
  precioHabConservador: 375,
  precioHabOptimista:   450,

  // Suministros estimados por habitación (luz, agua, wifi)
  gastosHab: 40,

  // Margen neto mínimo POR habitación
  margenMinPorHab: 100,

  // IVA sobre nuestra facturación (contrato uso distinto vivienda)
  tasaIVA: 0.21,

  // Inversión estimada por habitación para el cálculo de ROI
  // (lavado de cara ~1.500€/hab, reforma parcial ~3.000€/hab)
  inversionPorHab: 1500,

  // Máximo de meses para recuperar la inversión
  roiMaxMeses: 18,

  // Resultados a pedir a Idealista por ciudad
  resultadosPorCiudad: 150,
}

// URLs de búsqueda — pega aquí las URLs de Idealista con tus filtros aplicados
const URLS_IDEALISTA = [
  'https://www.idealista.com/alquiler-viviendas/zaragoza-zaragoza/con-precio-hasta_1000,tres-o-mas-habitaciones/',
  'https://www.idealista.com/alquiler-viviendas/huesca-huesca/con-precio-hasta_1000,tres-o-mas-habitaciones/',
]

const NOMBRE_HOJA = 'Pisos Idealista'
// ─────────────────────────────────────────────────────────────────────────────

const APIFY_TOKEN = process.env.APIFY_TOKEN
if (!APIFY_TOKEN) { console.error('❌ Falta APIFY_TOKEN en .env.local'); process.exit(1) }

// ─── Cálculo financiero R2R ──────────────────────────────────────────────
function calcular(alquiler, nHab, precioHab) {
  const facturacion  = nHab * precioHab
  const iva          = facturacion * R2R.tasaIVA
  const suministros  = nHab * R2R.gastosHab
  const margenNeto   = facturacion - iva - alquiler - suministros
  const margenPorHab = nHab > 0 ? margenNeto / nHab : 0
  return { facturacion, margenNeto, margenPorHab }
}

function calcularMedio(alquiler, nHab) {
  const precioMedio = (R2R.precioHabConservador + R2R.precioHabOptimista) / 2
  return calcular(alquiler, nHab, precioMedio)
}

// ─── Protección habitación vacía ────────────────────────────────────────────
// Con 1 habitación vacía, ¿seguimos sin perder dinero?
function pasaVacancia(alquiler, nHab, precioHab) {
  const ingresosConVacancia = (nHab - 1) * precioHab * (1 - R2R.tasaIVA)
  const costes              = alquiler + nHab * R2R.gastosHab
  return ingresosConVacancia >= costes
}

// ─── Evaluación de baños ────────────────────────────────────────────────────
function evaluarBanos(nHab, nBanos) {
  if (!nBanos || nBanos === 0) return '❓ Sin dato'
  const ratio = nHab / nBanos
  if (ratio <= 2) return '✅ Excelente'
  if (ratio <= 4) return '✅ Correcto'
  if (ratio <= 5) return '⚠️ Justo (revisar)'
  return '❌ Insuficiente'
}

// ─── Veredicto global ────────────────────────────────────────────────────────
function veredicto(alquiler, nHab, nBanos) {
  const medio = calcularMedio(alquiler, nHab)

  const pasaMargen   = medio.margenPorHab >= R2R.margenMinPorHab
  const pasaVac      = pasaVacancia(alquiler, nHab, (R2R.precioHabConservador + R2R.precioHabOptimista) / 2)
  const inversion    = nHab * R2R.inversionPorHab
  const roiMeses     = medio.margenNeto > 0 ? inversion / medio.margenNeto : 999
  const pasaROI      = roiMeses <= R2R.roiMaxMeses
  const banoOk       = !nBanos || (nHab / nBanos) <= 5

  if (pasaMargen && pasaVac && pasaROI && banoOk)  return '🟢 LLAMAR'
  if (pasaMargen && pasaVac && !pasaROI)            return '🟡 REVISAR (ROI largo)'
  if (pasaMargen && !pasaVac)                       return '🟡 REVISAR (vacancia)'
  if (!pasaMargen)                                  return '🔴 DESCARTAR'
  return '🟡 REVISAR'
}

function eur(n)  { return isNaN(n) || !isFinite(n) ? '—' : `${Math.round(n)} €` }
function meses(n){ return isNaN(n) || !isFinite(n) || n > 200 ? '>200 meses' : `${Math.round(n)} meses` }
function hoy()   { return new Date().toLocaleDateString('es-ES') }

// ─── 1. SCRAPE APIFY ─────────────────────────────────────────────────────
async function scrapeIdealista() {
  console.log('\n🕷️  Scrapeando Idealista via Apify...')
  const resp = await fetch(
    `https://api.apify.com/v2/acts/dz_omar~idealista-scraper-api/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=300`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        Property_urls: URLS_IDEALISTA.map(url => ({ url })),
        desiredResults: R2R.resultadosPorCiudad,
        detailMode: false,
      }),
      signal: AbortSignal.timeout(320_000),
    }
  )
  if (!resp.ok) throw new Error(`Apify ${resp.status}: ${await resp.text()}`)
  const datos = await resp.json()
  const ok    = datos.filter(p => p.status === 'success')
  console.log(`✅ Apify: ${datos.length} resultados brutos, ${ok.length} válidos.`)
  return ok
}

// ─── 2. FILTRO MATEMÁTICO ────────────────────────────────────────────────
function filtrar(propiedades) {
  console.log('\n🔢 Aplicando filtros R2R...')
  const pasan = []
  const descartes = { precio: 0, habitaciones: 0, margen: 0, vacancia: 0 }

  for (const p of propiedades) {
    const precio = p.price ?? p.priceInfo?.amount ?? 0
    const nHab   = p.moreCharacteristics?.roomNumber ?? 0

    if (precio < R2R.precioMin || precio > R2R.precioMax) { descartes.precio++; continue }
    if (nHab < R2R.habitacionesMin)                        { descartes.habitaciones++; continue }

    const medio = calcularMedio(precio, nHab)
    if (medio.margenPorHab < R2R.margenMinPorHab) { descartes.margen++; continue }

    // La vacancia es filtro suave (aparece en veredicto pero no descarta)
    pasan.push(p)
  }

  console.log(`  Descartados por precio:       ${descartes.precio}`)
  console.log(`  Descartados por habitaciones: ${descartes.habitaciones}`)
  console.log(`  Descartados por margen <100€: ${descartes.margen}`)
  console.log(`✅ ${pasan.length} de ${propiedades.length} pasan el filtro.`)
  return pasan
}

// ─── 3. PREPARAR FILAS ───────────────────────────────────────────────────
function prepararFilas(propiedades) {
  return propiedades
    .map(p => {
      const precio = p.price ?? p.priceInfo?.amount ?? 0
      const nHab   = p.moreCharacteristics?.roomNumber ?? 0
      const nBanos = p.moreCharacteristics?.bathNumber ?? 0
      const cons   = calcular(precio, nHab, R2R.precioHabConservador)
      const opt    = calcular(precio, nHab, R2R.precioHabOptimista)
      const medio  = calcularMedio(precio, nHab)
      const inversion = nHab * R2R.inversionPorHab
      const roiMeses  = medio.margenNeto > 0 ? inversion / medio.margenNeto : 999

      return {
        veredicto:  veredicto(precio, nHab, nBanos),
        id:         p.adid,
        titulo:     p.title ?? p.suggestedTexts?.title ?? '',
        direccion:  p.ubication?.title ?? '',
        ciudad:     p.ubication?.administrativeAreaLevel2 ?? p.ubication?.administrativeAreaLevel1 ?? '',
        precio,
        habitaciones: nHab,
        banos:      nBanos || '?',
        evalBanos:  evaluarBanos(nHab, nBanos),
        metros:     p.moreCharacteristics?.constructedArea ?? '',
        planta:     p.moreCharacteristics?.floor ?? '',
        ascensor:   p.moreCharacteristics?.lift ? 'Sí' : 'No',
        exterior:   p.moreCharacteristics?.exterior ? 'Sí' : 'No',
        estado:     p.moreCharacteristics?.status ?? '',
        anunciante: p.contactInfo?.userType ?? '',
        contacto:   p.contactInfo?.contactName ?? '',
        telefono:   p.contactInfo?.phone1?.formattedPhoneWithPrefix ?? '',
        facCons:    eur(cons.facturacion),
        facOpt:     eur(opt.facturacion),
        margenCons: eur(cons.margenNeto),
        margenOpt:  eur(opt.margenNeto),
        mHabCons:   eur(cons.margenPorHab),
        mHabOpt:    eur(opt.margenPorHab),
        vacancia:   pasaVacancia(precio, nHab, (R2R.precioHabConservador + R2R.precioHabOptimista) / 2) ? '✅ Sí' : '⚠️ No',
        inversion:  eur(inversion),
        roi:        meses(roiMeses),
        link:       p.detailWebLink ?? '',
        fecha:      hoy(),
        _margenMedioNum: medio.margenPorHab, // para ordenar
      }
    })
    // Ordenar: primero LLAMAR, luego REVISAR, luego DESCARTAR; dentro de cada grupo por margen desc
    .sort((a, b) => {
      const orden = { '🟢 LLAMAR': 0, '🟡 REVISAR (ROI largo)': 1, '🟡 REVISAR (vacancia)': 2, '🟡 REVISAR': 3, '🔴 DESCARTAR': 4 }
      const oa = orden[a.veredicto] ?? 5
      const ob = orden[b.veredicto] ?? 5
      if (oa !== ob) return oa - ob
      return b._margenMedioNum - a._margenMedioNum
    })
}

const CABECERAS = [
  '✅ Veredicto', 'ID', 'Título', 'Dirección', 'Ciudad',
  'Precio €/mes', 'Hab.', 'Baños', 'Ratio baños', 'm²',
  'Planta', 'Ascensor', 'Exterior', 'Estado',
  'Anunciante', 'Contacto', 'Teléfono',
  'Fac. conservadora', 'Fac. optimista',
  'Margen neto cons.', 'Margen neto opt.',
  'Margen/hab cons.', 'Margen/hab opt.',
  'Protección vacancia', 'Inversión estimada', 'ROI estimado',
  'Link', 'Fecha',
]

function filaArray(f) {
  return [
    f.veredicto, f.id, f.titulo, f.direccion, f.ciudad,
    f.precio, f.habitaciones, f.banos, f.evalBanos, f.metros,
    f.planta, f.ascensor, f.exterior, f.estado,
    f.anunciante, f.contacto, f.telefono,
    f.facCons, f.facOpt,
    f.margenCons, f.margenOpt,
    f.mHabCons, f.mHabOpt,
    f.vacancia, f.inversion, f.roi,
    f.link, f.fecha,
  ]
}

// ─── 4. GOOGLE SHEETS ────────────────────────────────────────────────────
async function exportarSheets(filas) {
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

  const meta  = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  const hojas = meta.data.sheets.map(s => s.properties.title)
  if (!hojas.includes(NOMBRE_HOJA)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: NOMBRE_HOJA, gridProperties: { frozenRowCount: 1 } } } }] }
    })
  }

  await sheets.spreadsheets.values.clear({ spreadsheetId: sheetId, range: `'${NOMBRE_HOJA}'!A:AE` })
  await sheets.spreadsheets.values.update({
    spreadsheetId:    sheetId,
    range:            `'${NOMBRE_HOJA}'!A1`,
    valueInputOption: 'RAW',
    requestBody:      { values: [CABECERAS, ...filas.map(filaArray)] },
  })

  const tabId = (await sheets.spreadsheets.get({ spreadsheetId: sheetId }))
    .data.sheets.find(s => s.properties.title === NOMBRE_HOJA)?.properties?.sheetId ?? 0

  // Colores de fila según veredicto
  const requests = [
    {
      repeatCell: {
        range: { sheetId: tabId, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { backgroundColor: { red: 0.07, green: 0.13, blue: 0.25 }, textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } } } },
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      }
    },
    { autoResizeDimensions: { dimensions: { sheetId: tabId, dimension: 'COLUMNS', startIndex: 0, endIndex: CABECERAS.length } } },
    { updateSheetProperties: { properties: { sheetId: tabId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
  ]

  filas.forEach((f, i) => {
    const rowIndex = i + 1
    const color =
      f.veredicto.startsWith('🟢') ? { red: 0.90, green: 0.96, blue: 0.90 } :
      f.veredicto.startsWith('🟡') ? { red: 1.00, green: 0.95, blue: 0.80 } :
                                     { red: 0.99, green: 0.91, blue: 0.91 }
    requests.push({
      repeatCell: {
        range: { sheetId: tabId, startRowIndex: rowIndex, endRowIndex: rowIndex + 1 },
        cell: { userEnteredFormat: { backgroundColor: color } },
        fields: 'userEnteredFormat(backgroundColor)',
      }
    })
  })

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: sheetId, requestBody: { requests } })
  console.log(`✅ ${filas.length} pisos en Google Sheets → pestaña "${NOMBRE_HOJA}"`)
}

// ─── 5. EXCEL ────────────────────────────────────────────────────────────
async function exportarExcel(filas) {
  console.log('\n📁 Generando Excel...')
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Pisos Idealista', { views: [{ state: 'frozen', ySplit: 1 }] })

  ws.columns = CABECERAS.map((h, i) => ({
    header: h, key: `c${i}`,
    width: [16,8,32,28,12,12,6,6,14,7,7,8,8,12,12,18,14,14,14,14,14,14,14,16,14,14,42,12][i] ?? 14,
  }))

  ws.getRow(1).eachCell(cell => {
    cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0D2240' } }
    cell.font      = { bold: true, color: { argb: 'FFFFFF' }, size: 9 }
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
  })
  ws.getRow(1).height = 36

  filas.forEach(f => {
    const row = ws.addRow(filaArray(f))
    const color =
      f.veredicto.startsWith('🟢') ? 'E6F4EA' :
      f.veredicto.startsWith('🟡') ? 'FFF8E1' : 'FDECEA'

    row.eachCell(cell => {
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } }
      cell.alignment = { vertical: 'top' }
      cell.font      = { size: 9 }
    })
    const linkCell = row.getCell(27)
    if (f.link) {
      linkCell.value = { text: 'Ver anuncio', hyperlink: f.link }
      linkCell.font  = { color: { argb: '1155CC' }, underline: true, size: 9 }
    }
    row.height = 18
  })

  ws.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + CABECERAS.length)}1` }

  const filename = join(__dirname, `../pisos-idealista-${new Date().toISOString().slice(0,10)}.xlsx`)
  await wb.xlsx.writeFile(filename)
  console.log(`✅ Excel: pisos-idealista-${new Date().toISOString().slice(0,10)}.xlsx`)
}

// ─── MAIN ────────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  🏠  RENTTIA — Buscador de pisos R2R en Idealista')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Precio:              ${R2R.precioMin}€ – ${R2R.precioMax}€/mes`)
  console.log(`  Habitaciones mín:    ${R2R.habitacionesMin}`)
  console.log(`  Margen mín/hab:      ${R2R.margenMinPorHab}€`)
  console.log(`  Inversión estimada:  ${R2R.inversionPorHab}€/hab`)
  console.log(`  ROI máximo:          ${R2R.roiMaxMeses} meses`)
  console.log('═══════════════════════════════════════════════════\n')

  try {
    const brutos   = await scrapeIdealista()
    const viables  = filtrar(brutos)

    if (!viables.length) {
      console.log('\n⚠️  Ningún piso pasa el filtro. Prueba a ampliar el rango de precio.')
      process.exit(0)
    }

    const filas = prepararFilas(viables)
    const llamar  = filas.filter(f => f.veredicto.startsWith('🟢')).length
    const revisar = filas.filter(f => f.veredicto.startsWith('🟡')).length

    await exportarSheets(filas)
    await exportarExcel(filas)

    console.log('\n══════════════════ RESUMEN ══════════════════════')
    console.log(`  Resultados brutos:    ${brutos.length}`)
    console.log(`  Pasan filtro:         ${viables.length}`)
    console.log(`  🟢 LLAMAR:            ${llamar}`)
    console.log(`  🟡 REVISAR:           ${revisar}`)
    console.log('═════════════════════════════════════════════════')
  } catch (err) {
    console.error('\n❌ Error:', err.message)
    process.exit(1)
  }
}

main()
