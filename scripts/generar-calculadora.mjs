import ExcelJS from 'exceljs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../public/calculadora-r2r-renttia.xlsx')

/* ─── PALETA ─────────────────────────────────────────────────────────────── */
const NAVY      = 'FF123462'
const NAVY_L    = 'FF1a4a8a'
const NAVY_D    = 'FF0d2340'
const WHITE     = 'FFFFFFFF'
const CREAM     = 'FFFAFAF7'
const GRAY_BG   = 'FFF3F4F6'
const GREEN     = 'FF166534'
const GREEN_BG  = 'FFdcfce7'
const RED       = 'FF991B1B'
const RED_BG    = 'FFffe4e6'
const AMBER     = 'FF92400E'
const AMBER_BG  = 'FFfef3c7'
const GRAY      = 'FF374151'
const GRAY_L    = 'FF9CA3AF'
const INPUT_BG  = 'FFF0F5FF'
const INPUT_BD  = 'FFB8CCF0'
const FORMULA_BG  = 'FFFFFBEB'
const FORMULA_BD  = 'FFFBBF24'
const TOTAL_BG    = 'FFe0f2fe'
const TOTAL_BD    = 'FF38bdf8'
const VIOLET    = 'FF5B21B6'
const VIOLET_BG = 'FFF5F3FF'
const VIOLET_BD = 'FFC4B5FD'
const PLADUR_BG = 'FFfff1f2'
const PLADUR_BD = 'FFfda4af'

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const solid  = argb => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } })
const fnt    = opts => ({ name: 'Calibri', size: 10, ...opts })
const thin   = argb => ({ style: 'thin', color: { argb } })
const bdAll  = argb => ({ top: thin(argb), bottom: thin(argb), left: thin(argb), right: thin(argb) })
const bdBot  = argb => ({ bottom: { style: 'hair', color: { argb: argb || 'FFE5E7EB' } } })
const aln    = (h, v = 'middle', wrap = false) => ({ horizontal: h, vertical: v, wrapText: wrap })

/* ─── WORKBOOK ───────────────────────────────────────────────────────────── */
const wb = new ExcelJS.Workbook()
wb.creator = 'Renttia'

/* ══════════════════════════════════════════════════════════════════════════
   HOJA 1 — DASHBOARD KPIs
   Se crea ANTES que la calculadora para que aparezca como primera pestaña.
   Todas las fórmulas referencian 'Calculadora R2R'!Bxx
══════════════════════════════════════════════════════════════════════════ */
const CALC = "'Calculadora R2R'"   // alias para fórmulas cross-sheet

const dash = wb.addWorksheet('📊 Dashboard', {
  properties: { tabColor: { argb: 'FF16a34a' } },
  views: [{ showGridLines: false }],
})

dash.columns = [
  { width: 2  }, // A — margen izquierdo
  { width: 34 }, // B — label KPI
  { width: 20 }, // C — valor KPI
  { width: 4  }, // D — separador central
  { width: 34 }, // E — label KPI derecha
  { width: 20 }, // F — valor KPI derecha
  { width: 2  }, // G — margen derecho
]

/* helpers locales del dashboard */
const ds = (argb) => ({ type:'pattern', pattern:'solid', fgColor:{ argb } })
const df = (opts) => ({ name:'Calibri', size:11, ...opts })
const da = (h, v='middle', wrap=false) => ({ horizontal:h, vertical:v, wrapText:wrap })
const db = (argb) => ({ top:thin(argb), bottom:thin(argb), left:thin(argb), right:thin(argb) })

/* ─── HEADER ───────────────────────────────────────────────────────────── */
dash.mergeCells('A1:G1')
const dh1 = dash.getCell('A1')
dh1.value = 'RENTTIA  ·  Dashboard Rent to Rent'
dh1.fill  = ds(NAVY)
dh1.font  = df({ size:20, bold:true, color:{ argb:WHITE } })
dh1.alignment = da('center')
dash.getRow(1).height = 52

dash.mergeCells('A2:G2')
const dh2 = dash.getCell('A2')
dh2.value = { formula: `"📍 "& ${CALC}!B7 &"   —   "&TEXT(TODAY(),"DD/MM/YYYY")` }
dh2.fill  = ds(NAVY_L)
dh2.font  = df({ size:10, italic:true, color:{ argb:'FFB8CCF0' } })
dh2.alignment = da('center')
dash.getRow(2).height = 20

dash.getRow(3).height = 14

/* ─── Función helper para crear una tarjeta KPI ─────────────────────────
   startRow: fila donde empieza la tarjeta (ocupa 3 filas)
   col: columna inicial (B o E)
   icon, label: texto descriptivo
   formula: fórmula cross-sheet
   numFmt: formato numérico
   bg, valueFill, valueColor: colores
──────────────────────────────────────────────────────────────────────── */
function kpiCard(startRow, col, icon, label, formula, numFmt, bg, valueFill, valueColor) {
  const labelCol  = col           // B o E
  const valueCol  = col + 1       // C o F (offset +1)

  // Fila título (label)
  dash.getRow(startRow).height = 18
  dash.mergeCells(startRow, labelCol, startRow, valueCol)
  const lc = dash.getCell(startRow, labelCol)
  lc.value = `  ${icon}  ${label}`
  lc.fill  = ds(bg)
  lc.font  = df({ size:9, color:{ argb:'FF6B7280' } })
  lc.alignment = da('left', 'bottom')
  lc.border = { top: thin('FFE5E7EB'), left: thin('FFE5E7EB'), right: thin('FFE5E7EB') }

  // Fila valor (grande)
  dash.getRow(startRow + 1).height = 38
  dash.mergeCells(startRow + 1, labelCol, startRow + 1, valueCol)
  const vc = dash.getCell(startRow + 1, labelCol)
  vc.value  = { formula }
  vc.numFmt = numFmt
  vc.fill   = ds(valueFill || bg)
  vc.font   = df({ size:22, bold:true, color:{ argb: valueColor || NAVY } })
  vc.alignment = da('center', 'middle')
  vc.border = { left: thin('FFE5E7EB'), right: thin('FFE5E7EB') }

  // Fila inferior (cierre visual)
  dash.getRow(startRow + 2).height = 6
  dash.mergeCells(startRow + 2, labelCol, startRow + 2, valueCol)
  const bc = dash.getCell(startRow + 2, labelCol)
  bc.fill  = ds(valueFill || bg)
  bc.border = { bottom: thin('FFE5E7EB'), left: thin('FFE5E7EB'), right: thin('FFE5E7EB') }
}

/* ─── SECCIÓN 1 — RESULTADOS MENSUALES (filas 4–6) ─────────────────────── */
dash.mergeCells('A4:G4')
const s1Hdr = dash.getCell('A4')
s1Hdr.value = '  📊  RESULTADOS MENSUALES'
s1Hdr.fill  = ds(NAVY_D)
s1Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s1Hdr.alignment = da('left')
dash.getRow(4).height = 22

/* Fila A: Ingresos brutos / Alquiler propietario */
kpiCard(5, 2, '💵', 'Ingresos brutos estimados / mes',
  `${CALC}!B30`, '#,##0 "€/mes"', 'FFF0FDF4', GREEN_BG, GREEN)
kpiCard(5, 5, '💶', 'Alquiler neto al propietario / mes',
  `${CALC}!B8`,  '#,##0 "€/mes"', 'FFFFF7ED', AMBER_BG, AMBER)

dash.getRow(8).height = 10

/* Fila B: IVA / Suministros */
kpiCard(9, 2, '🧾', 'IVA 21% no deducible / mes',
  `${CALC}!B32`, '#,##0 "€/mes"', 'FFFEF2F2', RED_BG, RED)
kpiCard(9, 5, '💡', 'Gastos suministros totales / mes',
  `${CALC}!B31`, '#,##0 "€/mes"', 'FFFFF7ED', AMBER_BG, AMBER)

dash.getRow(12).height = 10

/* ─── SECCIÓN 2 — MARGEN Y GANANCIA (filas 13–17) ──────────────────────── */
dash.mergeCells('A13:G13')
const s2Hdr = dash.getCell('A13')
s2Hdr.value = '  🏆  MARGEN Y GANANCIA'
s2Hdr.fill  = ds(NAVY)
s2Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s2Hdr.alignment = da('left')
dash.getRow(13).height = 22

kpiCard(14, 2, '🏆', 'MARGEN NETO mensual real',
  `${CALC}!B37`, '#,##0 "€/mes"', 'FFF0FDF4', 'FF16a34a', WHITE)
kpiCard(14, 5, '👤', 'Ganancia neta por habitación / mes',
  `${CALC}!B38`, '#,##0 "€/hab"', 'FFF0FDF4', 'FF16a34a', WHITE)

dash.getRow(17).height = 10

/* ─── SECCIÓN 3 — HABITACIONES Y PRECIOS ──────────────────────────────── */
dash.mergeCells('A18:G18')
const s3Hdr = dash.getCell('A18')
s3Hdr.value = '  🚪  HABITACIONES Y PRECIOS'
s3Hdr.fill  = ds(NAVY_D)
s3Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s3Hdr.alignment = da('left')
dash.getRow(18).height = 22

kpiCard(19, 2, '🏠', 'Total habitaciones (originales + conversión)',
  `${CALC}!B11`, '0 "hab."', TOTAL_BG, TOTAL_BG, '007CAD')
kpiCard(19, 5, '📐', 'Precio medio por habitación',
  `${CALC}!B29`, '#,##0 "€/mes"', 'FFF0F5FF', 'FFdbeafe', NAVY)

dash.getRow(22).height = 10

/* ─── SECCIÓN 4 — INVERSIÓN (filas 23–27) ──────────────────────────────── */
dash.mergeCells('A23:G23')
const s4Hdr = dash.getCell('A23')
s4Hdr.value = '  💰  INVERSIÓN INICIAL'
s4Hdr.fill  = ds(NAVY)
s4Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s4Hdr.alignment = da('left')
dash.getRow(23).height = 22

kpiCard(24, 2, '🏗️', 'Inversión total en obra y mobiliario',
  `${CALC}!B26`, '#,##0 "€"', 'FFFFF7ED', AMBER_BG, AMBER)
kpiCard(24, 5, '🏦', 'Fianza al propietario (2 meses)',
  `${CALC}!B41`, '#,##0 "€"', 'FFFFF7ED', AMBER_BG, AMBER)

dash.getRow(27).height = 10

/* Desembolso total (fila destacada, ancho completo) */
dash.getRow(28).height = 18
dash.mergeCells('B28:F28')
const dtLbl = dash.getCell('B28')
dtLbl.value = '  💸  DESEMBOLSO INICIAL TOTAL  (inversión + fianza)'
dtLbl.fill  = ds('FFfef3c7')
dtLbl.font  = df({ size:10, color:{ argb:AMBER } })
dtLbl.alignment = da('left', 'bottom')
dtLbl.border = { top: thin(FORMULA_BD), left: thin(FORMULA_BD), right: thin(FORMULA_BD) }

dash.getRow(29).height = 42
dash.mergeCells('B29:F29')
const dtVal = dash.getCell('B29')
dtVal.value  = { formula: `${CALC}!B26+${CALC}!B41` }
dtVal.numFmt = '#,##0 "€"'
dtVal.fill   = ds(FORMULA_BG)
dtVal.font   = df({ size:28, bold:true, color:{ argb:NAVY } })
dtVal.alignment = da('center')
dtVal.border = { bottom: thin(FORMULA_BD), left: thin(FORMULA_BD), right: thin(FORMULA_BD) }

dash.getRow(30).height = 10

/* ─── SECCIÓN 5 — RETORNO (filas 31–35) ────────────────────────────────── */
dash.mergeCells('A31:G31')
const s5Hdr = dash.getCell('A31')
s5Hdr.value = '  📈  RETORNO'
s5Hdr.fill  = ds(NAVY_D)
s5Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s5Hdr.alignment = da('left')
dash.getRow(31).height = 22

kpiCard(32, 2, '🚀', 'Payback — meses para recuperar inversión',
  `${CALC}!B42`, '0.0 "meses"', 'FFF0FDF4', GREEN_BG, GREEN)
kpiCard(32, 5, '📊', 'ROI anual neto sobre inversión',
  `${CALC}!B43`, '0.00 "%"', 'FFF0FDF4', GREEN_BG, GREEN)

dash.getRow(35).height = 10

/* Ganancia anual (fila destacada, ancho completo) */
dash.getRow(36).height = 18
dash.mergeCells('B36:F36')
const gaLbl = dash.getCell('B36')
gaLbl.value = '  🏆  GANANCIA NETA ANUAL REAL'
gaLbl.fill  = ds(GREEN_BG)
gaLbl.font  = df({ size:10, color:{ argb:GREEN } })
gaLbl.alignment = da('left', 'bottom')
gaLbl.border = { top: thin('FF86efac'), left: thin('FF86efac'), right: thin('FF86efac') }

dash.getRow(37).height = 42
dash.mergeCells('B37:F37')
const gaVal = dash.getCell('B37')
gaVal.value  = { formula: `${CALC}!B37*12` }
gaVal.numFmt = '#,##0 "€/año"'
gaVal.fill   = ds('FFf0fdf4')
gaVal.font   = df({ size:28, bold:true, color:{ argb:GREEN } })
gaVal.alignment = da('center')
gaVal.border = { bottom: thin('FF86efac'), left: thin('FF86efac'), right: thin('FF86efac') }

dash.getRow(38).height = 16

/* ─── SECCIÓN 6 — VEREDICTO Y FILTROS ──────────────────────────────────── */
dash.mergeCells('A39:G39')
const s6Hdr = dash.getCell('A39')
s6Hdr.value = '  🎯  VEREDICTO — Regla de la Mentora'
s6Hdr.fill  = ds(NAVY)
s6Hdr.font  = df({ bold:true, color:{ argb:WHITE } })
s6Hdr.alignment = da('left')
dash.getRow(39).height = 22

/* Veredicto grande */
dash.getRow(40).height = 52
dash.mergeCells('B40:F40')
const vd = dash.getCell('B40')
vd.value = { formula: `IF(AND(${CALC}!B38>=100,${CALC}!B37>${CALC}!B14,IFERROR(${CALC}!B26/${CALC}!B37,99)<=15),"🟢  OPERACIÓN VIABLE — Los 3 filtros en verde","🔴  NO OPERAR — Revisa los filtros en rojo")` }
vd.font  = df({ size:16, bold:true, color:{ argb:WHITE } })
vd.alignment = da('center', 'middle')
vd.fill  = ds(NAVY_D)
vd.border = db('FF60A5FA')

dash.addConditionalFormatting({ ref:'B40:F40', rules:[
  { type:'containsText', operator:'containsText', text:'VIABLE',    style:{ fill:ds('FF16a34a'), font:df({ size:16, bold:true, color:{ argb:WHITE } }) } },
  { type:'containsText', operator:'containsText', text:'NO OPERAR', style:{ fill:ds('FFdc2626'), font:df({ size:16, bold:true, color:{ argb:WHITE } }) } },
]})

dash.getRow(41).height = 10

/* Los 3 filtros como tabla resumen */
const filtrosDash = [
  { row:42, icon:'1️⃣', label:'Filtro 1 — Beneficio / hab ≥ 100€',
    formula: `IF(${CALC}!B38>=100,"✅  APTO  ("&TEXT(${CALC}!B38,"#,##0")&" €/hab)","❌  NO APTO  ("&TEXT(${CALC}!B38,"#,##0")&" €/hab)")` },
  { row:43, icon:'2️⃣', label:'Filtro 2 — Caja resiste vacancia',
    formula: `IF(${CALC}!B37>${CALC}!B14,"✅  SEGURO  (margen "&TEXT(${CALC}!B37-${CALC}!B14,"#,##0")&" € sobre precio máx. hab)","❌  RIESGO  (vacancia = pérdidas)")` },
  { row:44, icon:'3️⃣', label:'Filtro 3 — Payback ≤ 15 meses',
    formula: `IF(IFERROR(${CALC}!B26/${CALC}!B37,99)<=15,"✅  EXCELENTE  (payback "&TEXT(IFERROR(${CALC}!B26/${CALC}!B37,0),"0.0")&" meses)","❌  LENTO  (payback "&TEXT(IFERROR(${CALC}!B26/${CALC}!B37,0),"0.0")&" meses)")` },
]

filtrosDash.forEach(({ row, icon, label, formula }) => {
  dash.getRow(row).height = 28
  const la = dash.getCell(row, 2)
  la.value = `   ${icon}  ${label}`
  la.fill  = ds(GRAY_BG)
  la.font  = df({ size:10, color:{ argb:GRAY } })
  la.alignment = da('left')
  la.border = { top: thin('FFE5E7EB'), bottom: thin('FFE5E7EB'), left: thin('FFE5E7EB') }

  dash.mergeCells(row, 3, row, 6)
  const va = dash.getCell(row, 3)
  va.value = { formula }
  va.fill  = ds(GRAY_BG)
  va.font  = df({ size:11, bold:true, color:{ argb:GRAY } })
  va.alignment = da('center')
  va.border = { top: thin('FFE5E7EB'), bottom: thin('FFE5E7EB'), right: thin('FFE5E7EB') }
})

dash.addConditionalFormatting({ ref:'B42:F44', rules:[
  { type:'containsText', operator:'containsText', text:'✅', style:{ fill:ds(GREEN_BG), font:df({ bold:true, color:{ argb:GREEN } }) } },
  { type:'containsText', operator:'containsText', text:'❌', style:{ fill:ds(RED_BG),   font:df({ bold:true, color:{ argb:RED   } }) } },
]})

dash.getRow(45).height = 10

/* Nota pie */
dash.mergeCells('A46:G46')
const dashFoot = dash.getCell('A46')
dashFoot.value = 'RENTTIA · renttia.es · Este dashboard se actualiza automáticamente al cambiar los datos en la hoja "Calculadora R2R"'
dashFoot.fill  = ds(NAVY)
dashFoot.font  = df({ size:8, italic:true, color:{ argb:'8899BB' } })
dashFoot.alignment = da('center')
dash.getRow(46).height = 18

/* ══════════════════════════════════════════════════════════════════════════
   HOJA 2 — CALCULADORA R2R (código existente a continuación)
══════════════════════════════════════════════════════════════════════════ */

const ws = wb.addWorksheet('Calculadora R2R', {
  properties: { tabColor: { argb: NAVY } },
  pageSetup:  { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 },
  views:      [{ state: 'frozen', ySplit: 3 }],
})

ws.columns = [
  { width: 46 }, // A — etiqueta
  { width: 16 }, // B — valor / Sí/No
  { width: 14 }, // C — €/hab referencia
  { width: 16 }, // D — subtotal componente
  { width: 30 }, // E — filtros texto
  { width: 2  }, // F — separador visual
  { width: 16 }, // G — filtros métrica
]

/* ══════════════════════════════════════════════════════════════════════════
   CABECERA  (filas 1–3)
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A1:G1')
const h1 = ws.getCell('A1')
h1.value = 'RENTTIA  ·  Calculadora Rent to Rent'
h1.fill  = solid(NAVY)
h1.font  = fnt({ size: 18, bold: true, color: { argb: WHITE } })
h1.alignment = aln('center')
ws.getRow(1).height = 44

ws.mergeCells('A2:G2')
const h2 = ws.getCell('A2')
h2.value = 'Regla de la Mentora  ·  IVA 21% integrado  ·  Conversión de salón en habitación'
h2.fill  = solid(NAVY_L)
h2.font  = fnt({ size: 9, italic: true, color: { argb: 'FFB8CCF0' } })
h2.alignment = aln('center')
ws.getRow(2).height = 18

ws.getRow(3).height = 6
for (let c = 1; c <= 7; c++) ws.getCell(3, c).fill = solid(INPUT_BG)

/* ─── CABECERAS BLOQUE — fila 4 ──────────────────────────────────────────── */
ws.mergeCells('A4:D4')
const lHdr = ws.getCell('A4')
lHdr.value = '  📋  DATOS DE ENTRADA'
lHdr.fill  = solid(NAVY)
lHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
lHdr.alignment = aln('left')
ws.getRow(4).height = 22

ws.mergeCells('E4:G4')
const rHdr = ws.getCell('E4')
rHdr.value = '  ✅  FILTROS — Regla de la Mentora'
rHdr.fill  = solid(NAVY)
rHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
rHdr.alignment = aln('left')

/* ─── SUB-CABECERAS — fila 5 ─────────────────────────────────────────────── */
ws.getRow(5).height = 16
;[
  [3, '€/hab'],
  [4, 'Subtotal'],
  [5, 'Evaluación automática'],
  [7, 'Métrica'],
].forEach(([col, txt]) => {
  const c = ws.getCell(5, col)
  c.value = txt
  c.font  = fnt({ size: 8, italic: true, color: { argb: GRAY_L } })
  c.alignment = aln('center')
})

ws.getRow(6).height = 4

/* ══════════════════════════════════════════════════════════════════════════
   INPUTS  (filas 7–15)

   Celda clave:
     B8  = alquiler mensual neto al propietario
     B9  = habitaciones ORIGINALES
     B10 = habitaciones EXTRA por conversión
     B11 = TOTAL HABITACIONES (fórmula = B9+B10) ← usado en todas las fórmulas
     B12 = ¿Requiere tabiquería/pladur? (Sí/No)
     B13 = precio mínimo hab
     B14 = precio máximo hab
     B15 = suministros por hab/mes
══════════════════════════════════════════════════════════════════════════ */

/* ─── Filas de input básico (usuario escribe) ───────────────────────────── */
const inputData = [
  { row: 7,  icon: '🏙️',  label: 'Ciudad / Zona',                            val: 'Zaragoza Centro', fmt: '@',            bg: GRAY_BG },
  { row: 8,  icon: '💶',  label: 'Alquiler mensual neto al propietario (€)',  val: 900,               fmt: '#,##0 "€"',    bg: WHITE   },
  { row: 13, icon: '📉',  label: 'Precio mínimo hab. en la zona (€/mes)',     val: 380,               fmt: '#,##0 "€"',    bg: GRAY_BG },
  { row: 14, icon: '📈',  label: 'Precio máximo hab. en la zona (€/mes)',     val: 450,               fmt: '#,##0 "€"',    bg: WHITE   },
  { row: 15, icon: '💡',  label: 'Gastos suministros por habitación (€/mes)', val: 35,                fmt: '#,##0 "€"',    bg: GRAY_BG },
]

inputData.forEach(({ row, icon, label, val, fmt, bg }) => {
  ws.getRow(row).height = 24
  const a = ws.getCell(row, 1)
  a.value = `   ${icon}  ${label}`
  a.fill  = solid(bg)
  a.font  = fnt({ color: { argb: GRAY } })
  a.alignment = aln('left')
  a.border    = bdBot()

  const b = ws.getCell(row, 2)
  b.value  = val
  b.fill   = solid(INPUT_BG)
  b.font   = fnt({ size: 11, color: { argb: GRAY } })
  b.alignment = aln('right')
  b.border = bdAll(INPUT_BD)
  b.numFmt = fmt
})

/* ─── Fila 9 — Habitaciones ORIGINALES ──────────────────────────────────── */
ws.getRow(9).height = 24
const r9a = ws.getCell(9, 1)
r9a.value = '   🚪  Habitaciones ORIGINALES del piso'
r9a.fill  = solid(WHITE)
r9a.font  = fnt({ color: { argb: GRAY } })
r9a.alignment = aln('left')
r9a.border    = bdBot()

const r9b = ws.getCell(9, 2)
r9b.value  = 4
r9b.fill   = solid(INPUT_BG)
r9b.font   = fnt({ size: 11, color: { argb: GRAY } })
r9b.numFmt = '0 "hab."'
r9b.alignment = aln('right')
r9b.border = bdAll(INPUT_BD)

/* ─── Fila 10 — Habitaciones EXTRA por conversión de salón ──────────────── */
ws.getRow(10).height = 26
const r10a = ws.getCell(10, 1)
r10a.value = '   🔄  Habitaciones EXTRA (conversión salón → 0, 1 o 2 hab.)'
r10a.fill  = solid(PLADUR_BG)
r10a.font  = fnt({ bold: true, color: { argb: RED } })
r10a.alignment = aln('left')
r10a.border    = bdBot(PLADUR_BD)

const r10b = ws.getCell(10, 2)
r10b.value  = 0
r10b.fill   = solid('FFFfecec')
r10b.font   = fnt({ size: 13, bold: true, color: { argb: RED } })
r10b.numFmt = '0 "hab."'
r10b.alignment = aln('center')
r10b.border    = bdAll(PLADUR_BD)
r10b.dataValidation = {
  type:             'whole',
  operator:         'between',
  showInputMessage: true,
  promptTitle:      '¿Cuántas habitaciones extra salen de la conversión?',
  prompt:           'Pon 0 si no hay conversión. Pon 1 si el salón da 1 hab. Pon 2 si el salón grande da 2 hab. con pladur.',
  formulae:         [0, 5],
}

ws.mergeCells('C10:D10')
const r10note = ws.getCell(10, 3)
r10note.value = '← cambia: 0, 1 o 2'
r10note.fill  = solid(PLADUR_BG)
r10note.font  = fnt({ size: 8, italic: true, color: { argb: 'FFb91c1c' } })
r10note.alignment = aln('center')

/* ─── Fila 11 — TOTAL HABITACIONES (fórmula automática) ─────────────────── */
ws.getRow(11).height = 30

const r11a = ws.getCell(11, 1)
r11a.value = '   🏠  TOTAL HABITACIONES  (originales + conversión) — AUTOMÁTICO'
r11a.fill  = solid(TOTAL_BG)
r11a.font  = fnt({ size: 11, bold: true, color: { argb: '007CAD' } })
r11a.alignment = aln('left')

// B11 = clave central de todo el modelo — usada en todas las fórmulas
const r11b = ws.getCell(11, 2)
r11b.value  = { formula: 'B9+B10' }
r11b.numFmt = '0 "hab."'
r11b.fill   = solid(TOTAL_BG)
r11b.font   = fnt({ size: 16, bold: true, color: { argb: '007CAD' } })
r11b.alignment = aln('center')
r11b.border    = bdAll(TOTAL_BD)

ws.mergeCells('C11:D11')
const r11cd = ws.getCell('C11')
r11cd.value = '= B9 + B10   ✓ automático'
r11cd.fill  = solid(TOTAL_BG)
r11cd.font  = fnt({ size: 8, italic: true, color: { argb: '007CAD' } })
r11cd.alignment = aln('center')

/* ─── Fila 12 — ¿Tabiquería/pladur para las hab. de conversión? ──────────── */
ws.getRow(12).height = 26

const r12a = ws.getCell(12, 1)
r12a.value = '   🧱  ¿Las hab. de conversión requieren tabiquería / pladur?'
r12a.fill  = solid(PLADUR_BG)
r12a.font  = fnt({ bold: true, color: { argb: RED } })
r12a.alignment = aln('left')
r12a.border    = bdBot(PLADUR_BD)

const r12b = ws.getCell(12, 2)
r12b.value  = 'No'
r12b.fill   = solid('FFFfecec')
r12b.font   = fnt({ size: 11, bold: true, color: { argb: AMBER } })
r12b.alignment = aln('center')
r12b.border    = bdAll(PLADUR_BD)
r12b.dataValidation = {
  type:             'list',
  allowBlank:       false,
  showInputMessage: true,
  promptTitle:      'Tabiquería / Pladur',
  prompt:           'Sí = hay que construir la pared para separar el salón. No = el espacio ya está delimitado o no necesita obra.',
  formulae:         ['"Sí,No"'],
}

ws.mergeCells('C12:D12')
const r12note = ws.getCell(12, 3)
r12note.value = '↑ Solo aplica si B10 > 0'
r12note.fill  = solid(PLADUR_BG)
r12note.font  = fnt({ size: 8, italic: true, color: { argb: 'FFb91c1c' } })
r12note.alignment = aln('center')

ws.getRow(16).height = 14

/* ══════════════════════════════════════════════════════════════════════════
   FILTROS  (columnas E y G, filas 8–13)

   Referencias clave (definidas más abajo):
     B26 = INVERSIÓN TOTAL
     B37 = MARGEN NETO MENSUAL
     B38 = BENEFICIO POR HAB
     B14 = precio máximo por hab. (para filtro vacancia)
══════════════════════════════════════════════════════════════════════════ */
const filtros = [
  {
    row:   8,
    texto: 'IF(B38>=100,"✅ APTO — Beneficio/hab >= 100€","❌ NO APTO — Beneficio/hab < 100€")',
    valor: 'B38',
    fmt:   '#,##0 "€"',
  },
  {
    row:   9,
    texto: 'IF(B37>B14,"✅ SEGURO — Caja > Precio máx. hab","🔴 RIESGO — Vacancia = pérdidas")',
    valor: 'B37-B14',
    fmt:   '#,##0 "€"',
  },
  {
    row:   10,
    texto: 'IF(IFERROR(B26/B37,99)<=15,"🚀 EXCELENTE — Payback < 15 meses","⏳ LENTO — Payback > 15 meses")',
    valor: 'IFERROR(B26/B37,0)',
    fmt:   '0.0 "meses"',
  },
]

filtros.forEach(({ row, texto, valor, fmt }) => {
  const e = ws.getCell(row, 5)
  e.value = { formula: texto }
  e.font  = fnt({ size: 10, bold: true, color: { argb: GRAY } })
  e.alignment = aln('center')
  e.border    = bdAll('FFD1D5DB')

  const g = ws.getCell(row, 7)
  g.value  = { formula: valor }
  g.fill   = solid(GRAY_BG)
  g.font   = fnt({ size: 11, bold: true, color: { argb: NAVY } })
  g.numFmt = fmt
  g.alignment = aln('right')
  g.border    = bdAll('FFD1D5DB')
})

/* ─── Veredicto final E11:G13 ───────────────────────────────────────────── */
ws.getRow(11).height = 30

ws.mergeCells('E11:G12')
const vLbl = ws.getCell('E11')
vLbl.value = 'VEREDICTO FINAL'
vLbl.fill  = solid('FF1e3a5f')
vLbl.font  = fnt({ size: 8, bold: true, italic: true, color: { argb: '93c5fd' } })
vLbl.alignment = aln('center')

ws.getRow(13).height = 46
ws.mergeCells('E13:G13')
const vCell = ws.getCell('E13')
vCell.value = { formula: 'IF(AND(B38>=100,B37>B14,IFERROR(B26/B37,99)<=15),"🟢  OPERACIÓN VIABLE — Los 3 filtros en verde","🔴  NO OPERAR — Revisa los filtros en rojo")' }
vCell.font  = fnt({ size: 11, bold: true, color: { argb: WHITE } })
vCell.alignment = aln('center', 'middle')
vCell.fill  = solid(NAVY_D)
vCell.border = bdAll('FF60A5FA')

/* ─── Formato condicional filtros y veredicto ───────────────────────────── */
ws.addConditionalFormatting({ ref: 'E8:G8', rules: [
  { type: 'containsText', operator: 'containsText', text: 'APTO',    style: { fill: solid(GREEN_BG), font: fnt({ bold: true, color: { argb: GREEN } }) } },
  { type: 'containsText', operator: 'containsText', text: 'NO APTO', style: { fill: solid(RED_BG),   font: fnt({ bold: true, color: { argb: RED   } }) } },
]})
ws.addConditionalFormatting({ ref: 'E9:G9', rules: [
  { type: 'containsText', operator: 'containsText', text: 'SEGURO', style: { fill: solid(GREEN_BG), font: fnt({ bold: true, color: { argb: GREEN } }) } },
  { type: 'containsText', operator: 'containsText', text: 'RIESGO', style: { fill: solid(RED_BG),   font: fnt({ bold: true, color: { argb: RED   } }) } },
]})
ws.addConditionalFormatting({ ref: 'E10:G10', rules: [
  { type: 'containsText', operator: 'containsText', text: 'EXCELENTE', style: { fill: solid(GREEN_BG), font: fnt({ bold: true, color: { argb: GREEN } }) } },
  { type: 'containsText', operator: 'containsText', text: 'LENTO',     style: { fill: solid(AMBER_BG), font: fnt({ bold: true, color: { argb: AMBER } }) } },
]})
ws.addConditionalFormatting({ ref: 'E13:G13', rules: [
  { type: 'containsText', operator: 'containsText', text: 'VIABLE',    style: { fill: solid('FF16a34a'), font: fnt({ size: 11, bold: true, color: { argb: WHITE } }) } },
  { type: 'containsText', operator: 'containsText', text: 'NO OPERAR', style: { fill: solid('FFdc2626'), font: fnt({ size: 11, bold: true, color: { argb: WHITE } }) } },
]})

/* ══════════════════════════════════════════════════════════════════════════
   SECCIÓN COMPONENTES DE INVERSIÓN  (filas 17–26)

   Todas las fórmulas de subtotal usan B11 (TOTAL habitaciones).
   La fila de pladur usa B10 (solo hab. de conversión) y B12 (Sí/No).

   Celdas de Sí/No están en columna B de la propia fila del componente.
   Subtotales en columna D.

   B26 = INVERSIÓN TOTAL = SUM(D18:D25)  ← clave para filtros
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A17:D17')
const compHdr = ws.getCell('A17')
compHdr.value = '  🏗️  COMPONENTES DE INVERSIÓN — Selecciona lo que necesita el piso'
compHdr.fill  = solid(NAVY_D)
compHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
compHdr.alignment = aln('left')
ws.getRow(17).height = 22

// default: 'Sí' = marcado por defecto al abrir el archivo (escenario típico R2R)
const componentes = [
  { row: 18, default: 'No',  label: '🎨  ¿Necesita pintura / saneamiento?',         coste: 200,  bg: WHITE,    nota: '~200€/hab: paredes, techos, sellado. Pintura plástica blanca.', formula: row => `IF(B${row}="Sí",B11*200,0)` },
  { row: 19, default: 'Sí',  label: '🪑  ¿Necesita mobiliario completo?',            coste: 650,  bg: GRAY_BG,  nota: '~650€/hab: cama+colchón+armario+escritorio+silla.', formula: row => `IF(B${row}="Sí",B11*650,0)` },
  { row: 20, default: 'Sí',  label: '🍽️  ¿Necesita menaje cocina y zonas comunes?', coste: 50,   bg: WHITE,    nota: '~50€/hab (repartido): vajilla, sartenes, decoración zonas comunes.', formula: row => `IF(B${row}="Sí",B11*50,0)` },
  { row: 21, default: 'Sí',  label: '🔒  ¿Necesita cerrojos individuales?',          coste: 80,   bg: GRAY_BG,  nota: '~80€/hab: cerrojo con llave por habitación. Obligatorio.', formula: row => `IF(B${row}="Sí",B11*80,0)` },
  { row: 22, default: 'No',  label: '🔦  ¿Necesita iluminación LED?',                coste: 75,   bg: WHITE,    nota: '~75€/hab: luminarias LED + base con USB por habitación.', formula: row => `IF(B${row}="Sí",B11*75,0)` },
  { row: 23, default: 'No',  label: '🔨  ¿Necesita reforma estructural?',            coste: 850,  bg: GRAY_BG,  nota: '~850€/hab: tabiques, baños, instalaciones. Pedir presupuesto a industrial.', formula: row => `IF(B${row}="Sí",B11*850,0)` },
]

componentes.forEach(({ row, default: def, label, coste, bg, nota, formula }) => {
  ws.getRow(row).height = 26

  const a = ws.getCell(row, 1)
  a.value = `   ${label}`
  a.fill  = solid(bg)
  a.font  = fnt({ color: { argb: GRAY } })
  a.alignment = aln('left')
  a.border    = bdBot()

  const isSi = def === 'Sí'
  const b = ws.getCell(row, 2)
  b.value  = def
  b.fill   = solid(isSi ? 'FFdcfce7' : 'FFFEF9C3')        // verde si Sí, amarillo si No
  b.font   = fnt({ size: 11, bold: true, color: { argb: isSi ? GREEN : AMBER } })
  b.alignment = aln('center')
  b.border    = bdAll(isSi ? 'FF86efac' : FORMULA_BD)
  b.dataValidation = {
    type: 'list', allowBlank: false,
    showInputMessage: true,
    promptTitle: 'Selecciona',
    prompt: nota,
    formulae: ['"Sí,No"'],
  }

  const c = ws.getCell(row, 3)
  c.value  = coste
  c.numFmt = '#,##0 "€/hab"'
  c.fill   = solid(GRAY_BG)
  c.font   = fnt({ color: { argb: GRAY_L } })
  c.alignment = aln('center')

  const d = ws.getCell(row, 4)
  d.value  = { formula: formula(row) }
  d.numFmt = '#,##0 "€"'
  d.fill   = solid(FORMULA_BG)
  d.font   = fnt({ bold: true, color: { argb: NAVY } })
  d.alignment = aln('right')
  d.border    = bdAll(FORMULA_BD)
})

/* ─── Fila 24 — PLADUR / TABIQUERÍA (solo para hab. de conversión) ───────── */
ws.getRow(24).height = 28

const p24a = ws.getCell(24, 1)
p24a.value = '   🧱  ¿Tabiquería/pladur para hab. de conversión?  (depende de B12)'
p24a.fill  = solid(PLADUR_BG)
p24a.font  = fnt({ bold: true, color: { argb: RED } })
p24a.alignment = aln('left')
p24a.border    = bdBot(PLADUR_BD)

// Sí/No se lee de B12 (ya definido arriba). Este componente no tiene su propio toggle.
// El subtotal es automático: IF(AND(B12="Sí",B10>0), B10*1200, 0)
const p24b = ws.getCell(24, 2)
p24b.value = '← ver B12'
p24b.fill  = solid(PLADUR_BG)
p24b.font  = fnt({ size: 9, italic: true, color: { argb: 'FFb91c1c' } })
p24b.alignment = aln('center')

const p24c = ws.getCell(24, 3)
p24c.value  = 1200
p24c.numFmt = '#,##0 "€/hab"'
p24c.fill   = solid(GRAY_BG)
p24c.font   = fnt({ size: 9, color: { argb: GRAY_L } })
p24c.alignment = aln('center')

const p24d = ws.getCell(24, 4)
p24d.value  = { formula: 'IF(AND(B12="Sí",B10>0),B10*1200,0)' }
p24d.numFmt = '#,##0 "€"'
p24d.fill   = solid(PLADUR_BG)
p24d.font   = fnt({ bold: true, color: { argb: RED } })
p24d.alignment = aln('right')
p24d.border    = bdAll(PLADUR_BD)

/* ─── Fila 25 — Fotografía profesional (siempre) ───────────────────────── */
ws.getRow(25).height = 22

const f25a = ws.getCell(25, 1)
f25a.value = '   📸  Fotografía profesional + home staging  (siempre incluida)'
f25a.fill  = solid(CREAM)
f25a.font  = fnt({ italic: true, color: { argb: GRAY_L } })
f25a.alignment = aln('left')

const f25c = ws.getCell(25, 3)
f25c.value  = 75
f25c.numFmt = '#,##0 "€/hab"'
f25c.fill   = solid(GRAY_BG)
f25c.font   = fnt({ color: { argb: GRAY_L } })
f25c.alignment = aln('center')

const f25d = ws.getCell(25, 4)
f25d.value  = { formula: 'B11*75' }
f25d.numFmt = '#,##0 "€"'
f25d.fill   = solid(FORMULA_BG)
f25d.font   = fnt({ bold: true, color: { argb: NAVY } })
f25d.alignment = aln('right')
f25d.border    = bdAll(FORMULA_BD)

/* ─── Fila 26 — INVERSIÓN TOTAL ─────────────────────────────────────────── */
ws.getRow(26).height = 30

const i26a = ws.getCell(26, 1)
i26a.value = '   💰  INVERSIÓN TOTAL ESTIMADA  (suma de todos los componentes marcados)'
i26a.fill  = solid(NAVY)
i26a.font  = fnt({ size: 11, bold: true, color: { argb: WHITE } })
i26a.alignment = aln('left')

// B26 = clave para los filtros de payback y ROI
const i26b = ws.getCell(26, 2)
i26b.value  = { formula: 'SUM(D18:D25)' }
i26b.numFmt = '#,##0 "€"'
i26b.fill   = solid(NAVY_L)
i26b.font   = fnt({ size: 13, bold: true, color: { argb: WHITE } })
i26b.alignment = aln('right')
i26b.border    = bdAll('FF60A5FA')

ws.mergeCells('C26:D26')
const i26cd = ws.getCell('C26')
i26cd.value = '← Cambia Sí/No en col. B'
i26cd.fill  = solid(NAVY_L)
i26cd.font  = fnt({ size: 8, italic: true, color: { argb: '93c5fd' } })
i26cd.alignment = aln('center')

ws.getRow(27).height = 10

/* ══════════════════════════════════════════════════════════════════════════
   ANÁLISIS FINANCIERO MENSUAL  (filas 28–38)

   B37 = MARGEN NETO MENSUAL REAL  ← referenciado por filtros
   B38 = BENEFICIO POR HAB         ← referenciado por filtros
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A28:G28')
const finHdr = ws.getCell('A28')
finHdr.value = '  📊  ANÁLISIS FINANCIERO MENSUAL'
finHdr.fill  = solid(NAVY)
finHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
finHdr.alignment = aln('left')
ws.getRow(28).height = 22

const finItems = [
  { row: 29, label: '📐  Precio medio por hab. (€/mes)',              formula: '(B13+B14)/2',         bg: WHITE   },
  { row: 30, label: '💵  Ingresos brutos estimados totales (€/mes)',  formula: 'B29*B11',              bg: GRAY_BG },
  { row: 31, label: '💡  Gastos suministros totales (€/mes)',         formula: 'B15*B11',              bg: WHITE   },
  { row: 32, label: '🧾  IVA 21% no deducible — gasto real mensual', formula: 'B8*0.21',              bg: GRAY_BG },
  { row: 33, label: '📋  Retención IRPF Mod.115 a ingresar (19%)',   formula: 'B8*0.19',              bg: WHITE   },
  { row: 34, label: '💸  Coste real mensual del alquiler con IVA',   formula: 'B8+(B8*0.21)',         bg: GRAY_BG },
]

finItems.forEach(({ row, label, formula, bg }) => {
  ws.getRow(row).height = 24
  const a = ws.getCell(row, 1)
  a.value = `   ${label}`
  a.fill  = solid(bg)
  a.font  = fnt({ color: { argb: GRAY } })
  a.alignment = aln('left')
  a.border    = bdBot()

  const b = ws.getCell(row, 2)
  b.value  = { formula }
  b.numFmt = '#,##0 "€"'
  b.fill   = solid(FORMULA_BG)
  b.font   = fnt({ size: 11, bold: true, color: { argb: NAVY } })
  b.alignment = aln('right')
  b.border    = bdAll(FORMULA_BD)
})

ws.getRow(35).height = 14
ws.getRow(36).height = 6

/* ─── Fila 37 — MARGEN NETO (B37 — referenciado por filtros) ────────────── */
ws.getRow(37).height = 32

const mn37a = ws.getCell(37, 1)
mn37a.value = '   🏆  MARGEN NETO MENSUAL REAL  (tras IVA 21% + suministros)'
mn37a.fill  = solid(NAVY)
mn37a.font  = fnt({ size: 11, bold: true, color: { argb: WHITE } })
mn37a.alignment = aln('left')

const mn37b = ws.getCell(37, 2)
mn37b.value  = { formula: 'B30-B8-(B8*0.21)-B31' }
mn37b.numFmt = '#,##0 "€"'
mn37b.fill   = solid(NAVY_L)
mn37b.font   = fnt({ size: 14, bold: true, color: { argb: WHITE } })
mn37b.alignment = aln('right')
mn37b.border    = bdAll('FF60A5FA')

/* ─── Fila 38 — BENEFICIO POR HAB (B38 — referenciado por filtros) ──────── */
ws.getRow(38).height = 24

const bph38a = ws.getCell(38, 1)
bph38a.value = '   👤  Beneficio neto real por habitación (€/mes)'
bph38a.fill  = solid(GRAY_BG)
bph38a.font  = fnt({ color: { argb: GRAY } })
bph38a.alignment = aln('left')
bph38a.border    = bdBot()

const bph38b = ws.getCell(38, 2)
bph38b.value  = { formula: 'B37/B11' }
bph38b.numFmt = '#,##0 "€"'
bph38b.fill   = solid(FORMULA_BG)
bph38b.font   = fnt({ size: 11, bold: true, color: { argb: NAVY } })
bph38b.alignment = aln('right')
bph38b.border    = bdAll(FORMULA_BD)

ws.getRow(39).height = 10

/* ══════════════════════════════════════════════════════════════════════════
   INVERSIÓN Y RETORNO  (filas 40–46)
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A40:G40')
const retHdr = ws.getCell('A40')
retHdr.value = '  📈  INVERSIÓN Y RETORNO'
retHdr.fill  = solid(NAVY_L)
retHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
retHdr.alignment = aln('left')
ws.getRow(40).height = 22

const retItems = [
  { row: 41, label: '🏦  Fianza al propietario (2 meses)',          formula: 'B8*2',                          fmt: '#,##0 "€"',    bg: WHITE   },
  { row: 42, label: '📅  Payback — Meses para recuperar inversión', formula: 'IFERROR(B26/B37,0)',            fmt: '0.0 "meses"',  bg: GRAY_BG },
  { row: 43, label: '📊  ROI anual sobre inversión inicial (%)',    formula: 'IFERROR((B37*12/B26)*100,0)',   fmt: '0.00 "%"',     bg: WHITE   },
  { row: 44, label: '💹  Ingresos brutos anuales estimados (€)',    formula: 'B30*12',                        fmt: '#,##0 "€"',    bg: GRAY_BG },
  { row: 45, label: '🏦  Beneficio neto anual real (€)',            formula: 'B37*12',                        fmt: '#,##0 "€"',    bg: WHITE   },
]

retItems.forEach(({ row, label, formula, fmt, bg }) => {
  ws.getRow(row).height = 24
  const a = ws.getCell(row, 1)
  a.value = `   ${label}`
  a.fill  = solid(bg)
  a.font  = fnt({ color: { argb: GRAY } })
  a.alignment = aln('left')
  a.border    = bdBot()

  const b = ws.getCell(row, 2)
  b.value  = { formula }
  b.numFmt = fmt
  b.fill   = solid(FORMULA_BG)
  b.font   = fnt({ size: 11, bold: true, color: { argb: NAVY } })
  b.alignment = aln('right')
  b.border    = bdAll(FORMULA_BD)
})

ws.getRow(46).height = 10

/* ══════════════════════════════════════════════════════════════════════════
   AVISO IVA  (filas 47–48)
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A47:G47')
const ivaHdr = ws.getCell('A47')
ivaHdr.value = '  🧾  RECUERDA — Impacto del IVA 21% en tu margen real'
ivaHdr.fill  = solid(VIOLET)
ivaHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
ivaHdr.alignment = aln('left')
ws.getRow(47).height = 22

ws.mergeCells('A48:G48')
const ivaBody = ws.getCell('A48')
ivaBody.value = '⚠️  El propietario te factura CON IVA 21% porque eres empresa (arrendamiento uso distinto de vivienda). Tú NO puedes repercutirlo a tus inquilinos (subarriendo residencial exento). Ese 21% es un GASTO DIRECTO que ya está descontado en el Margen Neto (B37). Ejemplo: alquiler 900€ → pagas realmente 900 + 189€ = 1.089€/mes al propietario.'
ivaBody.fill  = solid(VIOLET_BG)
ivaBody.font  = fnt({ size: 9, color: { argb: VIOLET } })
ivaBody.alignment = aln('left', 'middle', true)
ivaBody.border    = bdAll(VIOLET_BD)
ws.getRow(48).height = 52

ws.getRow(49).height = 10

/* ══════════════════════════════════════════════════════════════════════════
   NOTAS JURÍDICO-FISCALES  (fila 50+)
══════════════════════════════════════════════════════════════════════════ */
ws.mergeCells('A50:G50')
const notaHdr = ws.getCell('A50')
notaHdr.value = '  ℹ️  NOTAS CLAVE — Marco Jurídico-Fiscal España'
notaHdr.fill  = solid(GRAY)
notaHdr.font  = fnt({ bold: true, color: { argb: WHITE } })
notaHdr.alignment = aln('left')
ws.getRow(50).height = 22

const notas = [
  ['Regla de la Mentora',  'Filtro 1 ≥100€/hab · Filtro 2: caja > precio máx. hab · Filtro 3: payback ≤15 meses. Solo operar si los 3 están en verde.'],
  ['IVA 21%',              'El propietario factura con IVA 21%. Ese IVA no es deducible para ti. Destruye margen si no se calcula previamente.'],
  ['Modelo 115',           'Obligado a retener 19% de la renta bruta al propietario e ingresarlo en AEAT cada trimestre.'],
  ['Conversión de salón',  'Si el salón se convierte en hab. adicional, requiere autorización del propietario en el contrato. Si hay pladur → obra menor → posible licencia municipal.'],
  ['Contrato principal',   'Debe incluir autorización expresa de subarrendamiento, permiso de obras y cambio de titularidad de suministros.'],
  ['RD 1312/2024',         'Desde jul-2025: registro obligatorio ante el Registro de la Propiedad si comercializas por portales digitales.'],
]

notas.forEach(([titulo, desc], i) => {
  const row = 51 + i
  ws.getRow(row).height = 26

  const a = ws.getCell(row, 1)
  a.value = `   📌  ${titulo}`
  a.fill  = solid(i % 2 === 0 ? INPUT_BG : WHITE)
  a.font  = fnt({ bold: true, color: { argb: NAVY } })
  a.alignment = aln('left')

  ws.mergeCells(`B${row}:G${row}`)
  const b = ws.getCell(row, 2)
  b.value = desc
  b.fill  = solid(i % 2 === 0 ? INPUT_BG : WHITE)
  b.font  = fnt({ size: 9, color: { argb: GRAY } })
  b.alignment = aln('left', 'middle', true)
})

const footRow = 51 + notas.length + 1
ws.mergeCells(`A${footRow}:G${footRow}`)
const foot = ws.getCell(footRow, 1)
foot.value = 'RENTTIA  ·  renttia.es  ·  Documento orientativo. No sustituye asesoramiento legal ni fiscal.'
foot.fill  = solid(NAVY)
foot.font  = fnt({ size: 8, italic: true, color: { argb: '8899BB' } })
foot.alignment = aln('center')
ws.getRow(footRow).height = 18

/* ─── GUARDAR ────────────────────────────────────────────────────────────── */
await wb.xlsx.writeFile(OUTPUT)
console.log(`✅  Excel generado correctamente: ${OUTPUT}`)
console.log('    → http://localhost:3000/calculadora-r2r-renttia.xlsx')
