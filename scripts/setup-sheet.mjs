import { google } from 'googleapis'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf8')
const getVar = (name) => {
  const m = env.match(new RegExp(`^${name}=(.+)$`, 'm'))
  return m ? m[1].trim().replace(/^"|"$/g, '') : null
}

const saEmail = getVar('GOOGLE_SERVICE_ACCOUNT_EMAIL')
const rawKey  = getVar('GOOGLE_PRIVATE_KEY')
const sheetId = getVar('GOOGLE_SHEET_ID')
const privKey = rawKey.replace(/\\n/g, '\n')

const auth = new google.auth.GoogleAuth({
  credentials: { client_email: saEmail, private_key: privKey },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const sheets = google.sheets({ version: 'v4', auth })

// 1 — Obtener sheetId numérico de "Hoja 1"
const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
const sheet = meta.data.sheets.find(s => s.properties.title === 'Hoja 1')
if (!sheet) {
  console.error('No se encontró "Hoja 1". Pestañas disponibles:',
    meta.data.sheets.map(s => s.properties.title).join(', '))
  process.exit(1)
}
const numericId = sheet.properties.sheetId
console.log('✓ Pestaña encontrada, sheetId:', numericId)

// 2 — Limpiar
await sheets.spreadsheets.values.clear({ spreadsheetId: sheetId, range: "'Hoja 1'!A:Z" })
console.log('✓ Hoja limpiada')

// 3 — Insertar cabeceras
await sheets.spreadsheets.values.update({
  spreadsheetId: sheetId,
  range: "'Hoja 1'!A1:J1",
  valueInputOption: 'RAW',
  requestBody: {
    values: [['Hora registro','Nombre','Teléfono','Email','Ciudad','Habitaciones','Estado','Fecha límite 24h','Intentos','Notas','Fuente / Landing']]
  }
})
console.log('✓ Cabeceras insertadas')

// 4 — Formato visual
await sheets.spreadsheets.batchUpdate({
  spreadsheetId: sheetId,
  requestBody: { requests: [
    // Cabecera: fondo navy, texto blanco y negrita
    {
      repeatCell: {
        range: { sheetId: numericId, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: {
          backgroundColor: { red: 0.071, green: 0.204, blue: 0.384 },
          textFormat: { foregroundColor: { red:1, green:1, blue:1 }, bold: true, fontSize: 10 },
          horizontalAlignment: 'CENTER',
          verticalAlignment: 'MIDDLE',
        }},
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
      }
    },
    // Congelar fila 1
    {
      updateSheetProperties: {
        properties: { sheetId: numericId, gridProperties: { frozenRowCount: 1 } },
        fields: 'gridProperties.frozenRowCount'
      }
    },
    // Anchos de columna: Hora, Nombre, Tel, Email, Ciudad, Habs, Estado, F.Limite, Intentos, Notas, Fuente
    ...[150, 160, 120, 220, 100, 110, 160, 160, 90, 200, 180].map((px, col) => ({
      updateDimensionProperties: {
        range: { sheetId: numericId, dimension: 'COLUMNS', startIndex: col, endIndex: col + 1 },
        properties: { pixelSize: px },
        fields: 'pixelSize'
      }
    })),
    // Altura cabecera
    {
      updateDimensionProperties: {
        range: { sheetId: numericId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
        properties: { pixelSize: 36 },
        fields: 'pixelSize'
      }
    },
    // Filas alternas azul muy sutil
    {
      addConditionalFormatRule: {
        rule: {
          ranges: [{ sheetId: numericId, startRowIndex: 1, endRowIndex: 500 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=ISEVEN(ROW())' }] },
            format: { backgroundColor: { red: 0.94, green: 0.96, blue: 0.99 } }
          }
        },
        index: 0
      }
    },
    // Columna Estado centrada
    {
      repeatCell: {
        range: { sheetId: numericId, startRowIndex: 1, endRowIndex: 500, startColumnIndex: 6, endColumnIndex: 7 },
        cell: { userEnteredFormat: { horizontalAlignment: 'CENTER' } },
        fields: 'userEnteredFormat.horizontalAlignment'
      }
    },
  ]}
})
console.log('✓ Formato aplicado')
console.log('✅ Hoja lista. Ya puedes enviar leads.')
